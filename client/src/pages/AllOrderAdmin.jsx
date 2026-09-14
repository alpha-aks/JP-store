import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { useEffect, useState, useRef } from "react";
import order_photo from "../assets/order_photo.webp";
import { format } from "date-fns";
import rightTick from "../assets/rightTick.avif"
import { GoArrowRight } from "react-icons/go";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import { IoClose } from "react-icons/io5";

function AllOrderAdmin() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Delivery OTP Modal State
    const [isDeliveryOtpModalOpen, setIsDeliveryOtpModalOpen] = useState(false);
    const [selectedDeliveryOrder, setSelectedDeliveryOrder] = useState(null);
    const [deliveryCustomerInfo, setDeliveryCustomerInfo] = useState({ name: "", email: "", orderId: "" });
    const [deliveryOtp, setDeliveryOtp] = useState(["", "", "", "", "", ""]);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [otpTimer, setOtpTimer] = useState(60);
    const [canResendOtp, setCanResendOtp] = useState(false);
    const otpInputRefs = useRef([]);

    // Delivery OTP Timer
    useEffect(() => {
        let interval;
        if (isDeliveryOtpModalOpen && otpTimer > 0) {
            interval = setInterval(() => {
                setOtpTimer((prev) => prev - 1);
            }, 1000);
        } else if (otpTimer === 0) {
            setCanResendOtp(true);
        }
        return () => clearInterval(interval);
    }, [isDeliveryOtpModalOpen, otpTimer]);

    const changeDateFormat = (timestamp) => {
        return format(new Date(timestamp), "eee, dd MMM''yy, h:mm a");
    };

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await Axios(summaryApi.getAllOrdersAdmin);
            if (response.data.success) {
                setOrders(response.data.orders || []);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message || "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    // Generic status updater (for statuses other than Delivered)
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await Axios({
                ...summaryApi.updateOrderStatusAdmin,
                data: {
                    orderId,
                    order_status: newStatus,
                }
            });

            if (response.data.success) {
                toast.success("Order status updated!");
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, order_status: newStatus } : order
                    )
                );
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message || "Failed to update order status");
        }
    };

    // Intercept status change: if "Delivered", require OTP verification
    const handleStatusChange = (order, newStatus) => {
        if (newStatus === "Delivered") {
            initiateDeliveryOtpFlow(order);
        } else {
            updateOrderStatus(order._id, newStatus);
        }
    };

    // Step 1: Trigger delivery OTP to customer and open modal
    const initiateDeliveryOtpFlow = async (order) => {
        setSelectedDeliveryOrder(order);
        setDeliveryOtp(["", "", "", "", "", ""]);
        setDeliveryCustomerInfo({
            name: order.userId?.name || "Customer",
            email: "Sending...",
            orderId: order.orderId
        });
        setIsDeliveryOtpModalOpen(true);
        setOtpTimer(60);
        setCanResendOtp(false);

        try {
            setSendingOtp(true);
            const response = await Axios({
                ...summaryApi.sendDeliveryOtp,
                data: { orderId: order._id }
            });

            if (response.data.success) {
                toast.success(response.data.message || "Delivery OTP sent to customer!");
                setDeliveryCustomerInfo({
                    name: response.data.customerName || order.userId?.name || "Customer",
                    email: response.data.customerEmail || "",
                    orderId: response.data.orderId || order.orderId
                });
                setTimeout(() => {
                    otpInputRefs.current[0]?.focus();
                }, 150);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setSendingOtp(false);
        }
    };

    // Handle OTP digits input
    const handleOtpChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...deliveryOtp];
        newOtp[index] = value.substring(value.length - 1);
        setDeliveryOtp(newOtp);

        if (value && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !deliveryOtp[index] && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();
        if (/^\d{6}$/.test(pastedData)) {
            setDeliveryOtp(pastedData.split(""));
            otpInputRefs.current[5]?.focus();
        }
    };

    // Step 2: Verify Delivery OTP and mark as Delivered
    const handleVerifyDeliveryOtp = async (e) => {
        e.preventDefault();
        const otpValue = deliveryOtp.join("");

        if (otpValue.length !== 6) {
            toast.error("Please enter the complete 6-digit delivery OTP.");
            return;
        }

        try {
            setVerifyingOtp(true);
            const response = await Axios({
                ...summaryApi.verifyDeliveryOtp,
                data: {
                    orderId: selectedDeliveryOrder._id,
                    otp: otpValue
                }
            });

            if (response.data.success) {
                toast.success("Delivery OTP verified! Order marked as Delivered.");
                setOrders((prevOrders) =>
                    prevOrders.map((o) =>
                        o._id === selectedDeliveryOrder._id ? { ...o, order_status: "Delivered" } : o
                    )
                );
                setIsDeliveryOtpModalOpen(false);
                setSelectedDeliveryOrder(null);
                setDeliveryOtp(["", "", "", "", "", ""]);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setVerifyingOtp(false);
        }
    };

    // Resend Delivery OTP
    const handleResendDeliveryOtp = async () => {
        if (!canResendOtp || sendingOtp || !selectedDeliveryOrder) return;

        try {
            setSendingOtp(true);
            const response = await Axios({
                ...summaryApi.sendDeliveryOtp,
                data: { orderId: selectedDeliveryOrder._id }
            });

            if (response.data.success) {
                toast.success("New delivery OTP sent to customer's email!");
                setOtpTimer(60);
                setCanResendOtp(false);
                setDeliveryOtp(["", "", "", "", "", ""]);
                otpInputRefs.current[0]?.focus();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setSendingOtp(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            {/* Desktop View */}
            <div className="hidden lg:block xl:block space-y-4 mt-10 pl-5 pr-15">
                {
                    loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="w-8 h-8 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        orders.length > 0 ? (
                            orders.map((order, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between gap-2 pb-5 border-b border-gray-300 transform transition-transform duration-200 ease-in-out hover:scale-[1.01]"
                                >
                                    {/* Order details */}
                                    <div className="flex gap-2 items-center">
                                        <img src={order_photo} alt="" className="w-16 h-16 object-contain" />
                                        <div className="flex flex-col">
                                            <p className="text-sm font-bold">
                                                {order.orderId} &nbsp;·&nbsp; &#8377;{order.totalAmt}
                                            </p>
                                            <p className="text-sm font-semibold text-gray-600">
                                                Ordered by: <strong>{order.userId?.name || "Customer"}</strong>
                                            </p>
                                            <p className="text-xs text-[#666666]">Placed on {changeDateFormat(order.createdAt)}</p>
                                        </div>
                                        {/* Order status dropdown */}
                                        <select
                                            value={order.order_status}
                                            onChange={(e) => handleStatusChange(order, e.target.value)}
                                            className={`text-[0.7rem] text-white px-2.5 py-1 rounded-2xl cursor-pointer font-semibold shadow-sm focus:outline-none ${
                                                order.order_status === "Pending"
                                                    ? "bg-yellow-500"
                                                    : order.order_status === "Processing"
                                                        ? "bg-blue-500"
                                                        : order.order_status === "Shipped"
                                                            ? "bg-purple-500"
                                                            : order.order_status === "Delivered"
                                                                ? "bg-green-500"
                                                                : order.order_status === "Cancelled"
                                                                    ? "bg-red-500"
                                                                    : order.order_status === "Returned"
                                                                        ? "bg-gray-500"
                                                                        : "bg-gray-600"
                                            }`}
                                        >
                                            {["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"].map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center">
                                        <button 
                                            className="py-2 px-3 rounded-lg border border-gray-300 text-[#038C1F] text-xs font-semibold cursor-pointer hover:bg-green-50 transition-colors"
                                            onClick={() => navigate(`/dashboard/order-details/${order.orderId}`)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No orders found.</p>
                        )
                    )
                }
            </div>

            {/* Mobile View */}
            <div className="lg:hidden xl:hidden space-y-4 pt-10 px-3 bg-[#F4F6FB] min-h-screen">
                {
                    loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="w-8 h-8 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        orders.length > 0 ? (
                            orders.map((order, index) => (
                                <div key={index} className="flex flex-col justify-between gap-2 border border-gray-300 bg-white px-3 py-3 rounded-xl shadow-sm">
                                    <div className="flex flex-col gap-2">
                                        {/* Top Section */}
                                        <div className="flex justify-between border-b border-gray-300 pb-3 items-center">
                                            <div className="flex gap-3 items-center">
                                                {["Pending", "Processing", "Shipped"].includes(order.order_status) && (
                                                    <div className="bg-[#f9fbc2] p-2.5 rounded-lg">
                                                        <FaRegClock className="text-[#b3b906]" size={18} />
                                                    </div>
                                                )}
                                                {order.order_status === "Delivered" && (
                                                    <img src={rightTick} alt="" className="w-9 h-9" />
                                                )}
                                                {order.order_status === "Cancelled" && (
                                                    <div className="bg-[#fbc2c2] p-2.5 rounded-lg">
                                                        <MdOutlineCancel size={18} className="text-[#b90606]" />
                                                    </div>
                                                )}
                                                {order.order_status === "Returned" && (
                                                    <div className="bg-[#d9c2fb] p-2.5 rounded-lg">
                                                        <TbTruckReturn size={20} className="text-[#6806b9]" />
                                                    </div>
                                                )}
                                                <div className="flex flex-col">
                                                    <p className="text-sm font-bold">
                                                        {order.orderId} &nbsp;·&nbsp; &#8377;{order.totalAmt}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        Ordered by: <strong>{order.userId?.name || "Customer"}</strong>
                                                    </p>
                                                    <p className="text-xs text-[#666666]">
                                                        {changeDateFormat(order.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => navigate(`/dashboard/order-details/${order.orderId}`)}
                                                className="text-gray-600 p-1 hover:text-[#0c286e]"
                                                aria-label="View Details"
                                            >
                                                <GoArrowRight size={18} />
                                            </button>
                                        </div>

                                        {/* Status dropdown */}
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-xs text-gray-500 font-medium">Update Status:</span>
                                            <select
                                                value={order.order_status}
                                                onChange={(e) => handleStatusChange(order, e.target.value)}
                                                className={`text-[0.7rem] text-white px-2.5 py-1 rounded-2xl cursor-pointer font-semibold shadow-sm focus:outline-none ${
                                                    order.order_status === "Pending"
                                                        ? "bg-yellow-500"
                                                        : order.order_status === "Processing"
                                                            ? "bg-blue-500"
                                                            : order.order_status === "Shipped"
                                                                ? "bg-purple-500"
                                                                : order.order_status === "Delivered"
                                                                    ? "bg-green-500"
                                                                    : order.order_status === "Cancelled"
                                                                        ? "bg-red-500"
                                                                        : order.order_status === "Returned"
                                                                            ? "bg-gray-500"
                                                                            : "bg-gray-600"
                                                }`}
                                            >
                                                {["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"].map((status) => (
                                                    <option key={status} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Bottom Section - Items */}
                                        <div className="flex gap-2 overflow-x-scroll pt-1">
                                            {
                                                order.itemList?.map((item, idx) => (
                                                    <img
                                                        src={item?.productId?.image?.[0] || order_photo}
                                                        alt={item?.productId?.name || "Product"}
                                                        key={idx}
                                                        className="w-16 h-16 px-1 py-1 border border-gray-200 rounded-lg object-contain bg-white shrink-0"
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No orders found.</p>
                        )
                    )
                }
            </div>

            {/* Royal Palace Jharokha Delivery OTP Verification Modal */}
            {isDeliveryOtpModalOpen && (
                <div 
                    className="fixed inset-0 bg-[#0c286e]/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200 overflow-y-auto"
                    onClick={(e) => {
                        if (e.target === e.currentTarget && !verifyingOtp) {
                            setIsDeliveryOtpModalOpen(false);
                            setSelectedDeliveryOrder(null);
                        }
                    }}
                >
                    <div className="relative w-full max-w-[430px] my-auto bg-gradient-to-b from-[#fffbf4] via-[#ffffff] to-[#fff7ed] rounded-t-[44px] rounded-b-2xl border-2 border-amber-300 shadow-[0_20px_50px_rgba(12,40,110,0.35)] overflow-hidden transition-all duration-300">
                        
                        {/* Subtle Inner Decorative Arch Line */}
                        <div className="absolute inset-[4px] rounded-t-[40px] rounded-b-xl border border-amber-200/50 pointer-events-none"></div>

                        {/* Close Button */}
                        <button 
                            className="cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-100/70 hover:bg-[#f37023] text-amber-900 hover:text-white border border-amber-300/80 flex items-center justify-center transition-all duration-200 shadow-sm z-20"
                            onClick={() => {
                                setIsDeliveryOtpModalOpen(false);
                                setSelectedDeliveryOrder(null);
                            }}
                            aria-label="Close"
                        >
                            <IoClose size={20} />
                        </button>

                        {/* Arch Header & Crest */}
                        <div className="pt-6 pb-2 px-6 text-center relative z-10">
                            <div className="w-full flex justify-center mb-1">
                                <svg className="w-12 h-4 text-amber-500" viewBox="0 0 50 14" fill="none">
                                    <path d="M25 1 C26 4, 29 5.5, 34 6 C40 7, 46 9, 50 14 L0 14 C4 9, 10 7, 16 6 C21 5.5, 24 4, 25 1 Z" fill="currentColor" fillOpacity="0.85"/>
                                    <circle cx="25" cy="3" r="1.5" fill="#038C1F" />
                                </svg>
                            </div>

                            <div className="mx-auto w-12 h-12 rounded-full bg-white border-2 border-green-400 shadow-sm flex items-center justify-center p-1 mb-1.5">
                                <img 
                                    src="/Jp store logo.png" 
                                    alt="JP Store" 
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            <p className="text-[11px] font-serif font-bold text-green-800 tracking-wider flex items-center justify-center gap-1.5 mb-0.5">
                                <span className="text-[#038C1F]">✦</span>
                                <span>ડિલિવરી ચકાસણી કોડ • DELIVERY OTP</span>
                                <span className="text-[#038C1F]">✦</span>
                            </p>
                            <h2 className="text-xl font-extrabold text-[#0c286e] tracking-tight">
                                Verify Customer Delivery
                            </h2>

                            {/* Order & Customer Badge */}
                            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 mt-3 text-left">
                                <p className="text-xs text-gray-700 font-semibold">
                                    Order ID: <strong className="text-[#0c286e]">{deliveryCustomerInfo.orderId}</strong>
                                </p>
                                <p className="text-xs text-gray-700 mt-0.5">
                                    Customer: <strong>{deliveryCustomerInfo.name}</strong>
                                </p>
                                <p className="text-[11px] text-gray-500 mt-0.5">
                                    OTP Sent to: <span className="font-mono font-medium text-amber-900">{deliveryCustomerInfo.email}</span>
                                </p>
                            </div>

                            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                                Enter the 6-digit security code provided by the customer upon delivery:
                            </p>
                        </div>

                        {/* Verification Form */}
                        <form onSubmit={handleVerifyDeliveryOtp} className="px-6 pb-5 pt-1 space-y-4 relative z-10">
                            {/* 6 Digit Input Boxes */}
                            <div className="flex justify-center gap-2 my-2" onPaste={handleOtpPaste}>
                                {deliveryOtp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (otpInputRefs.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        className="w-11 h-12 text-center text-xl font-extrabold text-[#0c286e] bg-[#fffdfa] border-2 border-green-500/80 rounded-xl focus:outline-none focus:border-[#038C1F] focus:ring-2 focus:ring-green-200 shadow-sm transition-all"
                                    />
                                ))}
                            </div>

                            {/* Timer & Resend */}
                            <div className="flex items-center justify-between text-xs px-1">
                                <span className="text-gray-500">
                                    {otpTimer > 0 ? (
                                        <span className="text-amber-900 font-medium">
                                            Resend OTP in <strong>{otpTimer}s</strong>
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">Customer didn&apos;t receive it?</span>
                                    )}
                                </span>
                                <button
                                    type="button"
                                    disabled={!canResendOtp || sendingOtp}
                                    onClick={handleResendDeliveryOtp}
                                    className={`font-bold transition-colors cursor-pointer ${
                                        canResendOtp && !sendingOtp
                                            ? "text-[#038C1F] hover:text-green-800 underline"
                                            : "text-gray-300 cursor-not-allowed"
                                    }`}
                                >
                                    {sendingOtp ? "Sending..." : "Resend OTP"}
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-2 pt-1">
                                <button 
                                    type="submit"
                                    disabled={deliveryOtp.join("").length !== 6 || verifyingOtp}
                                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${
                                        deliveryOtp.join("").length !== 6 || verifyingOtp
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                                            : "bg-gradient-to-r from-[#038C1F] to-[#04aa26] hover:from-[#027018] hover:to-[#038C1F] text-white cursor-pointer hover:shadow-green-500/30 active:scale-[0.99]"
                                    }`}
                                >
                                    {verifyingOtp ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Verifying & Delivering...</span>
                                        </>
                                    ) : (
                                        "Verify OTP & Confirm Delivery"
                                    )}
                                </button>

                                <button
                                    type="button"
                                    disabled={verifyingOtp}
                                    onClick={() => {
                                        setIsDeliveryOtpModalOpen(false);
                                        setSelectedDeliveryOrder(null);
                                    }}
                                    className="w-full py-2 px-4 rounded-xl font-semibold text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    Cancel (Keep Current Status)
                                </button>
                            </div>
                        </form>

                        {/* Pedestal Base */}
                        <div className="w-full py-2.5 px-6 bg-gradient-to-r from-amber-100/70 via-orange-100/70 to-amber-100/70 border-t border-amber-200/90 text-center relative z-10">
                            <p className="text-[11px] text-gray-600">
                                🛡️ Delivery confirmation ensures verified customer handover.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AllOrderAdmin;