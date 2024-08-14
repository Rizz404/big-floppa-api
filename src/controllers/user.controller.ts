import { Request, Response } from "express";
import bcrypt from "bcrypt";

import myDataSource from "@/data-source";
import { User } from "@/entity/User.entity";

class UserController {
  private userRepostory = myDataSource.getRepository(User);

  public async createUser(req: Request, res: Response) {
    try {
      const { password, ...userData }: Partial<User> = req.body;
      const salt = await bcrypt.genSalt();
      let hashedPassword: string | undefined;

      if (password) {
        hashedPassword = await bcrypt.hash(password, salt);
      }

      const newUser = this.userRepostory.create({
        password: hashedPassword,
        profile: { firstname: userData.username },
        ...userData,
      });

      await this.userRepostory.save(newUser);

      res.status(201).json({ message: "User created", data: newUser });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: error });
    }
  }

  public async getUsers(req: Request, res: Response) {
    try {
      const users = await this.userRepostory.find({ relations: ["profile"] });

      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const user = await this.userRepostory.findOne({
        where: { id: userId },
        relations: ["profile"],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async updateUserById(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const userData: User = req.body;

      await this.userRepostory.update(userId, userData);

      const updatedUser = await this.userRepostory.findOne({
        where: { id: userId },
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User updated", data: updatedUser });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async updateUserPassword(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { oldPassword, newPassword } = req.body;
      const user = await this.userRepostory.findOne({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.isOauth) {
        return res
          .status(404)
          .json({ message: "Oauth doesn't include password" });
      }

      const isPasswordMatch = await bcrypt.compare(oldPassword, user.password!);

      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Password not match" });
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await this.userRepostory.update(userId, { password: hashedPassword });

      const updatedUser = await this.userRepostory.findOne({
        where: { id: userId },
      });

      res.json({ message: "User updated", data: updatedUser });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async deleteUserById(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const deletedUser = await this.userRepostory.delete(userId);

      res.json({ message: "User deleted", data: deletedUser });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default new UserController();
