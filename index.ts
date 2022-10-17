import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

dotenv.config();
const app: Express = express();
app.use(express.urlencoded());
app.use(cors());
app.use(routes);

const port: string | undefined = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.send("Typescript + Node.js + Express Server");
});

app.listen(port, () => {
    console.log(`[server]: Server is running at <https://localhost>:${port}`);
});
