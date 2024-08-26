import http from "http";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import "dotenv/config";
import "reflect-metadata";
import myDataSource from "./config/data-source";
import { userRouter } from "./routes/user.route";
import { catRouter } from "./routes/cat.route";
import { catBreedRouter } from "./routes/catBreed.route";
import jwtStrategy from "./strategies/jwt.strategy";
import { authRouter } from "./routes/auth.route";
import localStrategy from "./strategies/local.strategy";
import googleOauth2Strategy from "./strategies/google.oauth2.strategy";
import allowedOrigins from "./config/allowedOrigins";
import { Server } from "socket.io";
import socketConfig from "./sockets";
import { catBreedsFollowedRouter } from "./routes/catBreedFollowed.route";
import { paymentMethodRouter } from "./routes/paymentMethod.route";
import { shippingServiceRouter } from "./routes/shippingService.route";

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// * Middleware
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60000 * 60 },
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());
jwtStrategy(passport);
googleOauth2Strategy(passport);
localStrategy(passport);

// * Socket io setup
// ! harus dideklarasikan sebelum routes karena ini pake middleware
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
  },
});

app.use((req: Request, res: Response, next: NextFunction) => {
  req.io = io;
  next();
});

// * Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/cats", catRouter);
app.use("/cat-breeds", catBreedRouter);
app.use("/cat-breeds-followed", catBreedsFollowedRouter);
app.use("/payment-methods", paymentMethodRouter);
app.use("/shipping-services", shippingServiceRouter);

// * Socket io config
socketConfig(io);

// * Server
myDataSource
  .initialize()
  .then(async () => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  });

export default app;
