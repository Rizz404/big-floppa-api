import { Request, Response } from "express";
import myDataSource from "@/data-source";
import { User } from "@/entity/User.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  private userRepository = myDataSource.getRepository(User);

  public async register(req: Request, res: Response) {
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
      return res.status(500).json({ message: "Error registering user", error });
    }
  }

  public async login(req: Request, res: Response) {
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

      const token = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN || "secret",
        { expiresIn: "1h" }
      );

      res.json({ message: "User log-in successfully", data: user, token });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new AuthController();
