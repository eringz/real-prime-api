// app.js
import express from "express";
import authRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// 405 handler (Method Not Allowed)
app.use((req, res, next) => {
  if (req.method !== "POST" && req.originalUrl.startsWith("/auth")) {
    return res.status(405).json({
      title: "405 Method Not Allowed",
      message: "The method is not allowed for the requested URL."
    });
  }
  next();
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    title: "500 Internal Server Error",
    message: err.message || "Something went wrong!"
  });
});

export default app;
