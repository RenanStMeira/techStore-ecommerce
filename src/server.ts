import express from "express";
import router from "./Router/router";
import cors from 'cors';

const app = express();

const allowedOrigins = ['http://localhost:5173', '*'];
const options: cors.CorsOptions = {
    origin: allowedOrigins
}

app.use(cors(options));

app.use(express.json());

app.use(router);


app.listen(3000, () => {
    console.log('Server running on port 3000')
})
