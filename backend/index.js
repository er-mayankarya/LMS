import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { adminRouter } from "./routes/admin.js";
import { courseRouter } from "./routes/courses.js";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

app.get("/", (req, res) => {
  res.send("API Working");
}); 

async function main() {
  mongoose.connect(process.env.MONGO_URI);
  console.log("Database Connected");

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

main();
