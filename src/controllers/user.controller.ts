import { Request, Response } from "express";
import bcrypt from "bcrypt";

import myDataSource from "@/data-source";
import { User } from "@/entity/User.entity";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { username, email, password, role } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();

    user.username = username;
    user.email = email;
    user.password = hashedPassword;
    user.role = role;
    user.isOauth = false;
    user.isVerified = false;
    user.lastLogin = new Date();

    const userRepostory = myDataSource.getRepository(User);
    await userRepostory.save(user);

    return res.status(201).json({ message: "User created", data: user });
  }
}
