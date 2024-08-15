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
  scope: ["profile", "email"],
};

const googleOauth2Strategy = (passport: PassportStatic) => {
  passport.use(
    new GoogleOauth2Strategy(
      options,
      async (_accessToken, _refreshToken, profile, cb) => {
        try {
          console.log(profile);
          const userRepository = myDataSource.getRepository(User);
          let user = await userRepository.findOne({
            where: { oauthId: profile.id },
          });

          if (!user) {
            user = userRepository.create({
              oauthId: profile.id,
              username: `${profile._json.given_name}_${crypto.randomUUID()}`,
              email: profile._json.email,
              isOauth: true,
            });
            await userRepository.save(user);
          }

          cb(null, user);
        } catch (error) {
          cb(error, false);
        }
      }
    )
  );
};

export default googleOauth2Strategy;
