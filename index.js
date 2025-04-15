import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./src/db/index.js";
import router from "./src/app/routes/user.routes.js";

const app = express();

app.use(
  cors({
    origin: "https://crud-application-using-mern-stack.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
dotenv.config();

//* Routes
app.get("/", (req, res) => {
  res.send("✅ Backend server is running successfully!");
});

app.use("/api/users",router)

//* Database connection and server start done here
const port = process.env.PORT || 5000;
dbConnection().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}).catch((error) => console.log(error));
