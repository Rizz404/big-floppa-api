import { DataSource } from "typeorm";

const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: process.env.DATABASE_PORT as unknown as number,
  username: "root", // ! entah mengapa tidak bisa pakai env
  password: process.env.PASSWORD,
  database: "cat_adoption",
  entities: ["src/entity/*.js"],
  synchronize: process.env.NODE_ENV === "development" ? true : false,
  logging: process.env.NODE_ENV === "development" ? true : false,
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});

export default myDataSource;
