import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
const app = express();

dotenv.config();
app.get("/health", (req: Request, res: Response)=>{
    res.send("OK")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})