import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import { 
    createCashOnDeliveryOrderController, 
    getAllOrdersController, 
    getOrderDetailsByIdCOntroller, 
    getOrdersController,
    razorpayPaymentOrderController,
    razorpayPaymentVerification,
    updateOrderStatusController,
    sendDeliveryOtpController,
    verifyDeliveryOtpController
} from "../controllers/order.controller.js";

const orderRouters = Router()

orderRouters.post("/add-cash-on-delivery-order", authMiddleware, createCashOnDeliveryOrderController)
orderRouters.get("/get-orders", authMiddleware, getOrdersController)
orderRouters.get("/get-all-orders", authMiddleware, getAllOrdersController)
orderRouters.put("/update-order-status-admin", authMiddleware, updateOrderStatusController)
orderRouters.post("/add-razor-payment-checkout", authMiddleware, razorpayPaymentOrderController)
orderRouters.post("/razorpay-payment-verification", razorpayPaymentVerification);
orderRouters.post("/get-order-details-by-id", authMiddleware, getOrderDetailsByIdCOntroller)
orderRouters.post("/send-delivery-otp", authMiddleware, sendDeliveryOtpController)
orderRouters.post("/verify-delivery-otp", authMiddleware, verifyDeliveryOtpController)

export default orderRouters