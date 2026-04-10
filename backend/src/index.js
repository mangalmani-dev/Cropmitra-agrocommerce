import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import { connectDB } from "./libs/db.js";
import authRoutes from "./routes/auth.route.js";
import cropsRoutes from "./routes/crops.route.js";
import orderRoutes from "./routes/orders.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import farmerRoutes from "./routes/farmer.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import addressRoutes from "./routes/address.routes.js";
import chatRoutes from "./routes/chatRoutes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS
 app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

// health check route
// health route
app.get("/", (req, res) => {
  res.send("Crop Mitra backend is running 🚀");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/crops", cropsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api", chatRoutes);

// razorpay key route
app.get("/api/getkey", (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_KEY_ID,
  });
});

// db connection
connectDB();

// socket server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  },
});


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinOrderRoom", (orderId) => {
    socket.join(orderId);
    console.log("Joined room:", orderId);
  });

  socket.on("updateLocation", ({ orderId, lat, lng }) => {
    io.to(orderId).emit("locationUpdated", { lat, lng });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});