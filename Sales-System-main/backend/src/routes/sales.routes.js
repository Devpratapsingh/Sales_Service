import { Router } from "express";
import { getItems, getSearchItems, getStatistics } from "../controllers/sales.controller.js";

const salesRoute = Router();

salesRoute.get("/get-items", getItems);
salesRoute.get("/get-search-items", getSearchItems);
salesRoute.get("/get-stats", getStatistics)
export default salesRoute;