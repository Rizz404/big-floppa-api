import {
  Strategy as GoogleOauth2Strategy,
  StrategyOptions,
} from "passport-google-oauth20";
import { PassportStatic } from "passport";
import { User } from "@/entity/User.entity";
import myDataSource from "@/data-source";
import jwt from "jsonwebtoken";

const options: StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  authorizationURL: process.env.AUTHORIZATION_URL!,
  tokenURL: process.env.TOKEN_URL!,
  callbackURL: process.env.CALLBACK_URL!,
};

const googleOauth2Strategy = (passport: PassportStatic) => {
  passport.use(
    new GoogleOauth2Strategy(
      options,
      async (accessToken, refreshToken, profile, cb) => {
        try {
          console.log(profile);
          const userRepository = myDataSource.getRepository(User);
          let user = await userRepository.findOne({
            where: { oauthId: profile.id },
          });

          if (!user) {
            user = userRepository.create({
              oauthId: profile.id,
              username: profile.username,
              email: profile.emails?.values.name,
            });
            await userRepository.save(user);
          }

          // ! belum taro token
          const token = jwt.sign(
            { id: user.id },
            process.env.ACCESS_TOKEN || "secret",
            {
              expiresIn: "1h",
            }
          );

          cb(null, user);
        } catch (error) {
          cb(error, false);
        }
      }
    )
  );
};

export default googleOauth2Strategy;
