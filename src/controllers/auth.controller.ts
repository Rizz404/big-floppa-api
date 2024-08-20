import { Request, RequestHandler, Response } from "express";
import myDataSource from "@/data-source";
import getErrorMessage from "@/utils/getErrorMessage";
import { User, UserRole } from "@/entity/User.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Profile } from "@/entity/Profile.entity";

class AuthController {
  private userRepository = myDataSource.getRepository(User);
  private profileRepository = myDataSource.getRepository(Profile);

  private createAccessToken = (user: User) => {
    return jwt.sign({ ...user }, process.env.ACCESS_TOKEN || "secret", {
      expiresIn: "7d",
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
      const { password, ...rest }: Partial<User> = req.body;

      const usersCount = await this.userRepository.count();

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password!, salt);

      const newUser = this.userRepository.create({
        ...rest,
        password: hashedPassword,
      });

      if (usersCount === 0) {
        // ! ini isi objek bukan perbandingan inget itu
        newUser.role = UserRole.ADMIN;
      }

      const savedUser = await this.userRepository.save(newUser);

      const newProfile = this.profileRepository.create({ user: savedUser });

      await this.profileRepository.save(newProfile);
      res
        .status(201)
        .json({ message: "User registered successfully", data: newUser });
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

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN || "secret"
      ) as { id: string };

      if (!decoded || !decoded.id) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const user = await this.userRepository.findOne({
        where: { id: decoded.id },
      });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const newAccessToken = jwt.sign(
        { ...user },
        process.env.ACCESS_TOKEN || "secret",
        { expiresIn: "7d" }
      );

      res.json({ message: "Refresh token successful", token: newAccessToken });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public logout: RequestHandler = async (req, res) => {
    try {
      const { refreshToken } = req.cookies;
      const { isOauth } = req.user!;

      if (!refreshToken) return res.status(204).json({ message: "No content" });
      if (!isOauth) {
        res.clearCookie("refreshToken", {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
        res.json({ message: "Logout Successfully" });
      } else {
        const googleLogoutUrl = `https://accounts.google.com/logout`;
        res.clearCookie("refreshToken", {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
        res.redirect(googleLogoutUrl);
      }
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new AuthController();
