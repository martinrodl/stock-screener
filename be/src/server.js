import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";

const app = express();

if (!process.env.MONGO_URI) {
  throw new Error("Mongo URI must be defined");
}

try {
  await mongoose.connect("mongodb://localhost/stockDB");
  console.log("Connected to mongoDB", process.env.MONGO_URI);
} catch (err) {
  console.log(err);
}

app.use(
  cors({
    origin: "*",
  })
);

app.use(helmet());
app.use(morgan("combined"));

app.use(express.json());
app.use("/api", router);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Not found handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
});
