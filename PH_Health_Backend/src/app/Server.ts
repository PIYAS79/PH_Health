import express from "express";
import cors from "cors";
import app from "./App.js";
import type { Server } from "http";

app.use(express.json());
app.use(cors());

const port = 5656;
let server: Server;

const main=async()=>{
  server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main();
