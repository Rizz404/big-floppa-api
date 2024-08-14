import passport, { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "@/entity/User.entity";
import myDataSource from "@/data-source";
import bcrypt from "bcrypt";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const userRepository = myDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const localStrategy = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const userRepository = myDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { username } });

        if (!user) {
          throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password!);

        if (!passwordMatch) {
          throw new Error("Password not match");
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    })
  );
};

export default localStrategy;
