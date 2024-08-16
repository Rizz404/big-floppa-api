import { Request, Response } from "express";
import bcrypt from "bcrypt";

import myDataSource from "@/data-source";
import getErrorMessage from "@/utils/getErrorMessage";
import { User, UserRole } from "@/entity/User.entity";
import { Profile } from "@/entity/Profile.entity";

class UserController {
  private userRepository = myDataSource.getRepository(User);
  private profileRepository = myDataSource.getRepository(Profile);

  public createUser = async (req: Request, res: Response) => {
    try {
      const { password, ...rest }: Partial<User> = req.body;
      const usersCount = await this.userRepository.count();

      const salt = await bcrypt.genSalt();
      let hashedPassword: string | undefined;

      if (password) {
        hashedPassword = await bcrypt.hash(password, salt);
      }

      const newUser = this.userRepository.create({
        password: hashedPassword,
        ...rest,
      });

      if (usersCount === 0) {
        newUser.role === UserRole.ADMIN;
      }

      const newProfile = this.profileRepository.create();

      await this.profileRepository.save(newProfile);
      newUser.profile = newProfile;

      await this.userRepository.save(newUser);

      res.status(201).json({ message: "User created", data: newUser });
    } catch (error) {
      // todo: Buat type error
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userRepository.find({ relations: ["profile"] });

      res.json(users);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getUserProfile = async (req: Request, res: Response) => {
    try {
      const { id } = req.user!;
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ["profile"],
      });

      if (!user) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ["profile"],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateUserProfile = async (req: Request, res: Response) => {
    try {
      const { id } = req.user!;
      const rest: User = req.body;

      await this.userRepository.update(id, rest);

      const updatedProfile = await this.userRepository.findOne({
        where: { id },
      });

      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.json({ message: "Profile updated", data: updatedProfile });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateUserById = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const rest: User = req.body;

      await this.userRepository.update(userId, rest);

      const updatedUser = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User updated", data: updatedUser });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateUserPassword = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { oldPassword, newPassword } = req.body;
      const user = await this.userRepository.findOne({
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

      await this.userRepository.update(userId, { password: hashedPassword });

      const updatedUser = await this.userRepository.findOne({
        where: { id: userId },
      });

      res.json({ message: "User updated", data: updatedUser });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public deleteUserById = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const deletedUser = await this.userRepository.delete(userId);

      res.json({ message: "User deleted", data: deletedUser });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new UserController();
