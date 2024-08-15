import { Request, RequestHandler, Response } from "express";
import myDataSource from "@/data-source";
import getErrorMessage from "@/utils/getErrorMessage";
import { User } from "@/entity/User.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  private userRepository = myDataSource.getRepository(User);

  private createAccessToken = (user: User) => {
    return jwt.sign({ ...user }, process.env.ACCESS_TOKEN || "secret", {
      expiresIn: "1h",
    });
  };

  private createRefreshTokenAndSetCookie = (res: Response, userId: string) => {
    const refreshToken = jwt.sign(
      { id: userId },
      process.env.REFRESH_TOKEN || "secret",
      {
        expiresIn: "30d",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // * 30 hari
    });
  };

  public register = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.userRepository.create({
        username,
        email,
        password: hashedPassword,
      });

      await this.userRepository.save(user);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const user = await this.userRepository.findOne({
        where: [{ username }, { email }],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password!);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Password not match" });
      }

      const accessToken = this.createAccessToken(user);

      this.createRefreshTokenAndSetCookie(res, user.id);
      res.json({
        message: "User log-in successfully",
        data: user,
        accessToken,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public googleOauthLogin: RequestHandler = async (req, res) => {
    try {
      const user = req.user!;

      const accessToken = this.createAccessToken(user);

      this.createRefreshTokenAndSetCookie(res, user.id);
      res.json({
        message: "OAuth2 login with google successful",
        data: req.user,
        accessToken,
      });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public refresh: RequestHandler = async (req, res) => {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        return res.status(401).json({ message: "Unautorized" });
      }

      const decodedUserId = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN || "secret"
      );

      if (!decodedUserId) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const user = await this.userRepository.findOne({
        where: { id: decodedUserId as string },
      });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const newAccessToken = jwt.sign(
        user,
        process.env.ACCESS_TOKEN || "secret",
        { expiresIn: "1h" }
      );

      res.json({ message: "Refresh token successful", token: newAccessToken });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public logout: RequestHandler = async (req, res) => {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) return res.status(204).json({ message: "No content" });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      res.json({ message: "Logout Successfully" });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new AuthController();
