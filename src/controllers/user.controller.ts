import { Request, Response } from "express";
import bcrypt from "bcrypt";
import myDataSource from "../config/data-source";
import getErrorMessage from "../utils/getErrorMessage";
import { User, UserRole } from "../entity/User.entity";
import { Profile } from "../entity/Profile.entity";
import { RequestHandler } from "express-serve-static-core";
import BaseReqQuery from "../helpers/base.req.query.type";
import paginatedResponse from "../utils/paginatedResponse";
import path from "path";
import fs from "fs";
import deleteFile from "../utils/deleteFile";

interface UserQuery extends BaseReqQuery {
  role?: UserRole;
  isOauth?: boolean;
  isVerified?: boolean;
}

class UserController {
  private userRepository = myDataSource.getRepository(User);
  private profileRepository = myDataSource.getRepository(Profile);

  public createUser = async (req: Request, res: Response) => {
    try {
      const { password, ...rest }: Partial<User> = req.body;

      const usersCount = await this.userRepository.count();

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password!, salt);

      const newUser = this.userRepository.create({
        ...rest,
        password: hashedPassword,
        profile: {},
        cart: {},
      });

      if (usersCount === 0) {
        // ! ini isi objek bukan perbandingan inget itu
        newUser.role = UserRole.ADMIN;
      }

      const savedUser = await this.userRepository.save(newUser);

      res
        .status(201)
        .json({ message: "User created successfully", data: savedUser });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getUsers = async (req: Request, res: Response) => {
    try {
      const {
        page = "1",
        limit = "10",
        order = "desc",
        role,
        isOauth,
        isVerified,
      } = req.query as unknown as UserQuery;
      const skip = (+page - 1) * +limit;

      const totalData = await this.userRepository.count();
      const users = await this.userRepository.find({
        where: { role, isOauth, isVerified },
        take: +limit,
        skip: skip,
        relations: { profile: true },
        order: { createdAt: order },
      });
      const response = paginatedResponse(users, +page, +limit, totalData);

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: { profile: true },
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
      const { id, profile } = req.user!;
      const {
        username,
        email,
        firstname,
        lastname,
        gender,
        age,
        phoneNumber,
        bio,
      }: Partial<User> & Partial<Profile> = req.body;
      const file = req.file;

      const user = await this.userRepository.findOne({
        where: { id },
        relations: { profile: true },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.profile && file && file.fileUrl && user.profile.profilePicture) {
        deleteFile(user.profile.profilePicture);
      }

      await this.userRepository.update(id, { username, email });

      await this.profileRepository.update(profile.id, {
        firstname,
        lastname,
        ...(file && file.fileUrl && { profilePicture: file.fileUrl }),
        gender,
        age,
        phoneNumber,
        bio,
      });

      const updatedUser = await this.userRepository.findOne({
        where: { id },
        relations: { profile: true },
      });

      res.json({ message: "User and profile updated", data: updatedUser });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public updateUserRole: RequestHandler = async (req, res) => {
    try {
      const { userId } = req.params;
      const { role }: Pick<User, "role"> = req.body;

      await this.userRepository.update(userId, { role });

      const user = await this.userRepository.findOne({ where: { id: userId } });

      res.json({ message: "User role updated", data: user });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  public verifiedUser: RequestHandler = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (user?.isVerified) {
        await this.userRepository.update(userId, { isVerified: false });
      } else {
        await this.userRepository.update(userId, { isVerified: true });
      }

      const updatedUser = await this.userRepository.findOne({
        where: { id: userId },
      });

      res.json({ message: "User verify updated", data: updatedUser });
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

      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: { profile: true },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.profile.profilePicture) {
        await deleteFile(user.profile.profilePicture);
      }

      const deletedUser = await this.userRepository.delete(userId);

      res.json({ message: "User deleted", data: deletedUser });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };
}

export default new UserController();
