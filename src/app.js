import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.get('/', () => {
    res.json({message: "Welcome to Real Prime"});
})

export default app;