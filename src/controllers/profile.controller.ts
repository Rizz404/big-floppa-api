import { Request, Response } from "express";

import myDataSource from "@/data-source";
import getErrorMessage from "@/utils/getErrorMessage";
import { User } from "@/entity/User.entity";
import { Profile } from "@/entity/Profile.entity";

class ProfileController {
  private userRepostory = myDataSource.getRepository(User);
  private profileRepostory = myDataSource.getRepository(Profile);

  public createProfile = async (req: Request, res: Response) => {
    try {
      const profileData: Partial<Profile> = req.body;

      const newProfile = this.profileRepostory.create(profileData);

      await this.profileRepostory.save(newProfile);

      res.status(201).json({ message: "Profile created", data: newProfile });
    } catch (error) {
      res.status(500).json({ message: getErrorMessage(error) });
    }
  };

  // todo: Buat middleware auth
  public getProfile = async (req: Request, res: Response) => {
    try {
      const { id } = req.user!;
      const user = await this.userRepostory.findOne({
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

  public updateProfile = async (req: Request, res: Response) => {
    try {
      const { id } = req.user!;
      const userData: User = req.body;

      await this.userRepostory.update(id, userData);

      const updatedProfile = await this.userRepostory.findOne({
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
}

export default new ProfileController();
