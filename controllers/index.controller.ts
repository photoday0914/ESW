import { CompanyController } from "./company.controller";
import { connect } from "../db/db";

const db = connect();
// For Development: force: true causes database to reset with each run
//using `force: true` will drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

export const CompanyInstance = new CompanyController();
