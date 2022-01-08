import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { userRouter } from "./routes/users.js";
import { authRouter } from "./routes/auth.js";
import { postRouter } from "./routes/posts.js";
import { conversationRouter } from "./routes/conversations.js";
import { messageRouter } from "./routes/messages.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors());

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);

app.listen(PORT, () => console.log("App Started in", PORT));
