import { DataSource } from "typeorm";

const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  port: process.env.DATABASE_PORT as unknown as number,
  username: "root", // ! entah mengapa tidak bisa pakai env
  password: process.env.PASSWORD,
  database: "cat_adoption",
  entities: [__dirname + "/../entity/*.ts"],
  migrations: [__dirname + "/../migration/*.ts"],
  // synchronize: process.env.NODE_ENV === "development" ? true : false,
  // logging: process.env.NODE_ENV === "development" ? true : false,
  subscribers: [],
});

export default myDataSource;
