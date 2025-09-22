import express from "express";
import cors from "cors";
import app from "./App.js";
import type { Server } from "http";
import config from "../config/index.js";

app.use(express.json());
app.use(cors());

let server: Server;

const port = config.port_number

const main=async()=>{
  server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main();
