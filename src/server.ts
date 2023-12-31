import { Request, Response } from "express";
import express from "express";
import router from "./Router/router";
import cors from 'cors';
require('dotenv').config();

const app = express();

// const allowedOrigins = ['http://localhost:5173', '*'];
// const options: cors.CorsOptions = {
//     origin: allowedOrigins
// }

app.use(cors());

// app.use(function(req: Request, res: Response, next) {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Credentials", 'true');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
// });

app.use(express.json());

app.use(router);

const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
