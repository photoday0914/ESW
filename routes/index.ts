import { Router } from "express";
import { CompanyInstance } from "../controllers/index.controller";

const router: Router = Router();

//This is for initailzing data with Bezos related companies
router.get("/init", CompanyInstance.insertCompanyInfo);

router.get("/transactions", CompanyInstance.getTransactions);
router.post("/mark", CompanyInstance.markCompany);
router.post("/unmark", CompanyInstance.unmarkCompany);

export default router;
