import dotenv from "dotenv";
import connectDB from "./startup/db";
import app from "./app";

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;

async function startServer() {
  await connectDB();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
