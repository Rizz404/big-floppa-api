import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";
import { PassportStatic } from "passport";
import { User as UserModel } from "@/entity/User.entity";
import myDataSource from "@/data-source";

declare global {
  namespace Express {
    interface User extends UserModel {}
  }
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN || "secret",
};

const jwtStrategy = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const userRepository = myDataSource.getRepository(UserModel);
        const user = await userRepository.findOne({
          where: { id: payload.id },
          relations: { profile: true },
        });

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};

export default jwtStrategy;
