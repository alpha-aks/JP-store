import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet";
import connectDB from "./config/connectDB.js"
import userRoutes from "./routes/user.route.js"
import categoryRoutes from "./routes/category.route.js"
import imageRoutes from "./routes/image.route.js"
import subCategoryRoutes from "./routes/subCetegory.route.js"
import productRouters from "./routes/product.route.js"
import cartRoutes from "./routes/cart.route.js"
import addressRoutes from "./routes/address.route.js"
import orderRouters from "./routes/order.route.js"

dotenv.config()

const app = express()

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://nishant.one",
    "https://www.nishant.one"
].filter(Boolean).flatMap(url => [url.replace(/\/$/, ""), url]);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        const cleanOrigin = origin.replace(/\/$/, "");

        const isAllowed =
            allowedOrigins.includes(cleanOrigin) ||
            process.env.CLIENT_URL?.split(",").map(u => u.trim().replace(/\/$/, "")).includes(cleanOrigin) ||
            /\.vercel\.app$/.test(cleanOrigin) ||
            /\.netlify\.app$/.test(cleanOrigin) ||
            /nishant\.one$/.test(cleanOrigin) ||
            process.env.NODE_ENV !== "production";

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("dev")); // Logs requests in a readable format
app.use(helmet({ crossOriginResourcePolicy: false }));

// Ensure DB is connected for serverless invocations
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    //Server to Client
    res.json({
        message: "Server is running at " + PORT
    })
})

app.use("/api/user", userRoutes)
app.use("/api/file", imageRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/sub-category", subCategoryRoutes)
app.use("/api/product", productRouters)
app.use("/api/cart", cartRoutes)
app.use("/api/address", addressRoutes)
app.use("/api/order", orderRouters)

connectDB().then(() => {
    if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        })
    }
})

export default app;

