import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import "reflect-metadata";
import myDataSource from "./data-source";
import { userRouter } from "./routes/user.route";
import { catRouter } from "./routes/cat.route";
import { catRaceRouter } from "./routes/catRace.route";

const app = express();
const PORT = process.env.PORT || 5000;

// * Middleware
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));

// * Routes
app.use("/users", userRouter);
app.use("/cats", catRouter);
app.use("/cat-race", catRaceRouter);

// * Server
myDataSource
  .initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  });

export default app;
