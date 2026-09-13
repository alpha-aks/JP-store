import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

const rawKeyId = process.env.RAZORPAY_ID_KEY || "";
const key_id = rawKeyId.split(",")[0].trim();
const key_secret = (process.env.RAZORPAY_SECRET_KEY || "").trim();

const razorpayInstance = new Razorpay({
    key_id,
    key_secret
});

export default razorpayInstance;
