import express from "express";
import cors from "cors";
import salesRoute from "./routes/sales.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: "32kb"}));
app.use(express.urlencoded({limit: "16kb"}));

app.use("/api/v1/sales", salesRoute);
export default app;