import { Request, Response } from "express";

import myDataSource from "@/data-source";
import { Profile } from "@/entity/Profile.entity";

class ProfileController {
  private profileRepostory = myDataSource.getRepository(Profile);

  public async createProfile(req: Request, res: Response) {
    try {
      const profileData: Partial<Profile> = req.body;

      const newProfile = this.profileRepostory.create(profileData);

      await this.profileRepostory.save(newProfile);

      res.status(201).json({ message: "Profile created", data: newProfile });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  // todo: Buat middleware auth
  public async getProfile(req: Request, res: Response) {
    try {
      const { profileId } = req.params;
      const profile = await this.profileRepostory.findOne({
        where: { id: profileId },
      });

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  public async updateProfile(req: Request, res: Response) {
    try {
      const { profileId } = req.params;
      const profileData: Profile = req.body;

      await this.profileRepostory.update(profileId, profileData);

      const updatedProfile = await this.profileRepostory.findOne({
        where: { id: profileId },
      });

      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.json({ message: "Profile updated", data: updatedProfile });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default new ProfileController();
