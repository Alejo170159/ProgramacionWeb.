import { config } from "dotenv";
import { DataSource } from "typeorm";

const env = process.env.NODE_ENV || 'development';

config({
    override: true,
    path: `.env.${env}`,
    debug: true // para validar que se está modificando
});

export default new DataSource({
    type: 'postgres',
    host: process.env.HOST || 'localhost',
    port: +(process.env.PORT_DB || 5434),
    username: process.env.USERNAME || 'postgres',
    password: process.env.PASSWORD || '1701',
    database: process.env.DATABASE || 'back_nest_angular',
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts']
});