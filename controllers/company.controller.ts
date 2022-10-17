import { Request, Response } from "express";
import axios from "axios";
import { Company } from "../models/company.model";
import * as dotenv from "dotenv";
dotenv.config();

interface Transaction {
    ismarked?: boolean;
    amount: number;
    category: string[];
    date: string;
    merchant_name: string;
    id: number;
}

interface CalcResult {
    total: number;
    spentRelated: number;
    percentage: number;
}

interface CompanyInfo {
    name: string;
    ismarked: boolean;
}

export class CompanyController {
    private transactions: Transaction[] = [];
    private companyInfo: any = {};

    //This is for initailzing data with Bezos related companies
    insertCompanyInfo = (req: Request, res: Response) => {
        Company.bulkCreate([
            { name: "Amazon", ismarked: true },
            { name: "Washington Post", ismarked: true },
            { name: "Whole Foods", ismarked: true },
            { name: "Blue Origin", ismarked: true },
        ])
            .then(() => {
                res.status(200).send("Successfully Initialized");
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send("Internal Server Error");
            });
    };

    getTransactions = async (req: Request, res: Response) => {
        try {
            await this.loadTransactions();
            await this.getRelatedCompany();
            const calcResult: CalcResult = await this.calculate(this.transactions);
            res.status(200).send({
                Transactions: this.transactions,
                CalcResult: calcResult,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    };

    getRelatedCompany = async () => {
        const companies: CompanyInfo[] = await Company.findAll({
            attributes: ["name", "ismarked"],
        });
        companies.forEach((company) => {
            this.companyInfo[company.name] = company.ismarked;
        });
    };

    markCompany = async (req: Request, res: Response) => {
        try {
            await this.loadTransactions();
            console.log(req.body.name);
            await Company.update(
                { ismarked: true },
                { where: { name: req.body.name } }
            );
            await this.getRelatedCompany();
            const calcResult: CalcResult = await this.calculate(this.transactions);
            res.status(200).send({
                Transactions: this.transactions,
                CalcResult: calcResult,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        }
    };

    unmarkCompany = async (req: Request, res: Response) => {
        try {
            await this.loadTransactions();
            await Company.update(
                { ismarked: false },
                { where: { name: req.body.name } }
            );
            await this.getRelatedCompany();
            const calcResult: CalcResult = await this.calculate(this.transactions);
            res.status(200).send({
                Transactions: this.transactions,
                CalcResult: calcResult,
            });
        } catch (err) {
            console.log(err);
            res.status(500).send("internal server error");
        }
    };

    private loadTransactions = async () => {
        this.transactions = [];
        const transactionData = await axios.get(process.env.DATA_URL!);
        (transactionData.data as Transaction[]).forEach((transaction) => {
            this.transactions.push(transaction);
        });
    };

    private calculate = (transactions: Transaction[]): CalcResult => {
        let result: CalcResult = { total: 1, spentRelated: 1, percentage: 100 };
        transactions.forEach((transaction) => {
            result.total += transaction.amount;
            if (this.companyInfo[transaction.merchant_name] === true) {
                result.spentRelated += transaction.amount;
                transaction.ismarked = true;
            } else {
                transaction.ismarked = false;
                if (this.companyInfo[transaction.merchant_name] === undefined) {
                    // console.log(transaction.merchant_name);
                    this.companyInfo[transaction.merchant_name] = false;
                    Company.create({
                        name: transaction.merchant_name,
                        ismarked: false,
                    });
                }
            }
        });
        result.percentage = (result.spentRelated / result.total) * 100;
        return result;
    };
}
