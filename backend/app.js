import express from "express";
import cors from "cors";
import atmRoute from "./routes/Atm.routes.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());


const connectionInstance = mongoose.connect(
  "mongodb+srv://1101:1101@cluster0.5vpq94n.mongodb.net/noteApp"
);
console.log(
  `\n MongoDB connected: ${connectionInstance?.connection?.host}`
);

app.use(cors());
app.use("/api/v1", atmRoute);

app.listen(7878, () => {
  console.log("Port is running");
});
