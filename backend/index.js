import express from "express";
import router from "./routes/route.js";
import { dbconnect } from "./database/dbconnection.js";
import cors from "cors"


const app = express();

app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.use("/uploads", express.static("uploads"));

app.use("/api",router)

dbconnect("crud","postgres","Password");

app.listen(8080, () => {
    console.log("server is start")
});