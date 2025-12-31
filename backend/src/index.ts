import express from "express";
import http from "http";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.ts";
import authRoutes from "./routes/auth.routes.ts";
import { initializeSocket } from "./socket/socket.ts";

const app = express();
const PORT = process.env.PORT || 4002;
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  return res.json({ msg: "hello from chai aur code" });
});

const server = http.createServer(app);
initializeSocket(server);
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server is listing at PORT ${PORT}`);
    });
  })
  .catch(() => {
    process.exit(1);
  });
