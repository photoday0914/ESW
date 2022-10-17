import { Sequelize } from "sequelize-typescript";
import { Company } from "../models/company.model";
import * as dotenv from "dotenv";
dotenv.config();

export const connect = () => {
    const hostName = process.env.HOST!;
    const userName = process.env.USER!;
    const password = process.env.PASSWORD !== undefined ? process.env.PASSWORD : "";
    const database = process.env.DATABASE!;
    const dialect: any = process.env.DIALECT;

    const operatorsAliases: any = false;

    const sequelize: Sequelize = new Sequelize(database, userName, password, {
        host: hostName,
        dialect,
        operatorsAliases,
        repositoryMode: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000,
        },
    });

    sequelize.addModels([Company]);

    const db: any = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    return db;
};
