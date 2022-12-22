import "reflect-metadata"
import { DataSource } from "typeorm";
import "dotenv/config"
import path from "path";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT),
    database: process.env.PGDATABASE,    
    username: process.env.PGUSERNAME,
    password: process.env.PGPASSWORD,
    synchronize: false,
    logging: true,
    entities: [path.join(__dirname, "./entities/**.{js,ts}")],
    migrations: [path.join(__dirname, "./migrations/**.{js,ts}")]
})