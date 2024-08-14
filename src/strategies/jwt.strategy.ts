import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";
import { PassportStatic } from "passport";
import { User } from "@/entity/User.entity";
import myDataSource from "@/data-source";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

const jwtStrategy = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const userRepository = myDataSource.getRepository(User);
        const user = await userRepository.findOne({
          where: { id: payload.id },
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
