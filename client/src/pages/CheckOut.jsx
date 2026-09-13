import { useState } from "react";
import { useAddress } from "../provider/AddressContext";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import toast from "react-hot-toast"
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { userCart } from "../provider/CartContext";

function CheckOut() {

    const user = useSelector(state => state.user);
    const { addresses, setIsAddressMenuOpen, setOpenAddNewAddressMenu } = useAddress()
    const { clearTheCart } = userCart()
    const navigate = useNavigate();
    const location = useLocation();

    const { grandTotal, totalItems, totalPriceWithOutDiscount, otherCharge } = location.state || {};
    // console.log("otherCharge: ", otherCharge);

    const cartItem = useSelector((state) => state.cartItem.cart);
    // console.log("cartItem", cartItem);

    const defaultAddress = addresses.find((address) => address.defaultAddress === true) || addresses[0];
    // console.log("defaultAddress: ", defaultAddress)

    const [optionOpen, setOptionOpen] = useState("")
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
    const [isConfirmationScreenActive, setIsConfirmationScreenActive] = useState("")
    const [loading, setLoading] = useState(false)

    const handleCashOnDeliveryOrder = async () => {
        if (!defaultAddress?._id) {
            toast.error("Please add or select a delivery address first.");
            if (setOpenAddNewAddressMenu) setOpenAddNewAddressMenu(true);
            return;
        }
        try {
            const response = await Axios({
                ...summaryApi.createCODOrder,
                data: {
                    itemList: cartItem,
                    totalAmt: grandTotal,
                    otherCharge: otherCharge,
                    subTotalAmt: totalPriceWithOutDiscount,
                    delivery_address_id: defaultAddress._id,
                }
            })

            if (response.data.success) {
                toast.success(response.data.message)
                clearTheCart()
                navigate("/dashboard/my-orders")
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            // console.log(error);
            toast.error(error)
        } finally {
            setIsConfirmationScreenActive(false)
            setLoading(false)
        }
    }


    const handleRazorpayPayment = async () => {
        if (!defaultAddress?._id) {
            toast.error("Please add or select a delivery address first.");
            if (setOpenAddNewAddressMenu) setOpenAddNewAddressMenu(true);
            return;
        }
        try {
            const response = await Axios({
                ...summaryApi.addRazorpayPaymentOrder,
                data: {
                    itemList: cartItem,
                    totalAmt: grandTotal,
                    otherCharge: otherCharge,
                    subTotalAmt: totalPriceWithOutDiscount,
                    delivery_address_id: defaultAddress._id,
                }
            });

            // console.log(response);
            let orderData = response.data.order
            const razorpayKey = response.data.keyId || import.meta.env.VITE_RAZORPAY_ID_KEY;
            const options = {
                key: razorpayKey,
                amount: response.data.order.amount,
                currency: 'INR',
                name: "Jp Store",
                description: 'Purchasing with Razorpay',
                order_id: response.data.order.id,
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.mobile,
                },
                theme: { color: '#FFC602' },
                handler: function (paymentResponse) {
                    // Send payment details to backend for verification
                    Axios({
                        ...summaryApi.verifyRazorPaymentOrder,
                        data: {
                            paymentResponse,
                            orderData
                        },
                        headers: { "Content-Type": "application/json" }
                    })
                        .then(res => {
                            // Redirect based on backend response
                            if (res.data.success) {
                                navigate("/success");
                                clearTheCart()
                            } else {
                                navigate("/cancel");
                            }
                        })
                        .catch(err => {
                            console.error("Verification Error:", err);
                            navigate("/cancel");
                        });
                }

            };

            const RazorpayConstructor = window.Razorpay || (typeof Razorpay !== "undefined" ? Razorpay : null);
            if (!RazorpayConstructor) {
                toast.error("Razorpay SDK not loaded. Please refresh the page.");
                return;
            }

            const rzp = new RazorpayConstructor(options);
            rzp.on('payment.failed', function (resp) {
                toast.error(resp.error?.description || "Payment failed");
            });
            rzp.open();

        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong with Razorpay");
        }
    };

    const handlePayNow = async () => {
        try {
            setLoading(true)
            if (selectedPaymentMethod === "cash") {
                await handleCashOnDeliveryOrder()
            } else if (selectedPaymentMethod === "razorpay") {
                await handleRazorpayPayment()
            }
            setIsConfirmationScreenActive(false)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-between min-h-[90vh] w-screen lg:w-full xl:w-full lg:max-w-[1100px] xl:max-w-[1100px] mx-auto select-none  py-8 lg:p-8 xl:p-8 ">
                {/* Left Section - Payment Methods */}
                <div className="w-screen lg:w-2/3 xl:w-2/3 p-6 rounded-lg bg-white">
                    {/* Delivery Address Banner for Mobile & Quick Verification */}
                    <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50/60 to-orange-50/40">
                        <div className="flex justify-between items-start gap-2">
                            <div className="flex items-start gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-[#f37023] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                                    <CiLocationOn size={20} />
                                </div>
                                <div>
                                    <span className="text-[11px] font-bold text-[#f37023] uppercase tracking-wider block">
                                        Delivering To
                                    </span>
                                    {defaultAddress ? (
                                        <>
                                            <h4 className="text-sm font-bold text-gray-800 capitalize">
                                                {defaultAddress.saveAs}
                                                {defaultAddress.name ? ` (${defaultAddress.name})` : ""}
                                            </h4>
                                            <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                                                {[defaultAddress.flatHouseNumber, defaultAddress.floor, defaultAddress.street, defaultAddress.area, defaultAddress.landmark, `${defaultAddress.city}-${defaultAddress.pincode}`].filter(Boolean).join(", ")}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-xs text-red-600 font-medium mt-0.5">
                                            No address selected. Please add or detect your delivery location.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="shrink-0 flex flex-col sm:flex-row gap-1.5">
                                {defaultAddress && (
                                    <button
                                        type="button"
                                        onClick={() => setIsAddressMenuOpen && setIsAddressMenuOpen(true)}
                                        className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
                                    >
                                        Change
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setOpenAddNewAddressMenu && setOpenAddNewAddressMenu(true)}
                                    className="px-3 py-1.5 bg-[#0c831f] hover:bg-[#0a6c1a] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                                >
                                    <BiCurrentLocation size={13} />
                                    <span>{defaultAddress ? "+ Add / GPS" : "Detect GPS"}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-lg lg:text-2xl xl:text-2xl font-semibold mb-4">Select Payment Method</h2>
                    <div>
                        {/* COD Method */}
                        <div className="py-5 px-6 rounded-t-lg overflow-y-auto border border-gray-200">
                            <div className="flex justify-between cursor-pointer"
                                onClick={() => {
                                    setOptionOpen(optionOpen === "cash" ? "" : "cash");
                                    setSelectedPaymentMethod(optionOpen === "cash" ? "" : "cash");
                                }}
                            >
                                <p className="text-2xl text-[#1C1C1C]">Cash</p>
                                <button>
                                    {optionOpen === "cash" ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
                                </button>
                            </div>
                            {/* Open COD section */}
                            {optionOpen === "cash" && (
                                <div className="mt-10 font-semibold text-gray-600">
                                    Please keep exact change handy to help us serve you better.
                                </div>
                            )}
                        </div>

                        {/* Razorpay Method */}
                        <div className="py-5 px-6 rounded-b-lg overflow-y-auto border border-t-0 border-gray-200">
                            <div className="flex justify-between cursor-pointer"
                                onClick={() => {
                                    setOptionOpen(optionOpen === "razorpay" ? "" : "razorpay");
                                    setSelectedPaymentMethod(optionOpen === "razorpay" ? "" : "razorpay");
                                }}
                            >
                                <p className="text-2xl text-[#1C1C1C]">Razorpay</p>
                                <button>
                                    {optionOpen === "razorpay" ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
                                </button>
                            </div>
                            {/* Open Razorpay section */}
                            {optionOpen === "razorpay" && (
                                <div className="mt-10 font-semibold text-gray-600">
                                    Pay instantly with Razorpay&#39;s seamless checkout experience.
                                </div>
                            )}
                        </div>
                    </div>

                </div>


                {/* Right Section - Cart Summary */}
                <div className="hidden lg:block xl:block w-1/3 bg-white h-[80vh] py-5 border border-gray-200">
                    {/* address */}
                    <div className="px-6 pb-4 border-b border-gray-100">
                        <div className="flex justify-between items-center mb-1.5">
                            <h3 className="text-sm uppercase tracking-wider font-bold text-gray-500 flex items-center gap-1.5">
                                <CiLocationOn className="text-[#f37023]" size={18} />
                                Delivery Address
                            </h3>
                            {addresses.length > 0 && (
                                <button
                                    type="button"
                                    className="text-xs font-semibold text-[#f37023] hover:underline cursor-pointer"
                                    onClick={() => setIsAddressMenuOpen && setIsAddressMenuOpen(true)}
                                >
                                    Change
                                </button>
                            )}
                        </div>
                        {defaultAddress ? (
                            <div className="text-xs text-gray-600 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <span className="font-bold text-[#0c286e] capitalize bg-white px-2 py-0.5 rounded border border-gray-200 text-[11px]">
                                        {defaultAddress?.saveAs || "Address"}
                                    </span>
                                    {defaultAddress?.mobileNumber && (
                                        <span className="text-gray-400 text-[11px]">• {defaultAddress.mobileNumber}</span>
                                    )}
                                </div>
                                <p className="line-clamp-2 leading-relaxed text-gray-700">
                                    {[defaultAddress?.flatHouseNumber, defaultAddress?.floor, defaultAddress?.street, defaultAddress?.area, defaultAddress?.landmark, `${defaultAddress?.city}-${defaultAddress?.pincode}`].filter(Boolean).join(", ")}
                                </p>
                            </div>
                        ) : (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 space-y-2">
                                <p className="font-semibold">⚠️ No delivery address found</p>
                                <button
                                    type="button"
                                    onClick={() => setOpenAddNewAddressMenu && setOpenAddNewAddressMenu(true)}
                                    className="w-full py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                                >
                                    <BiCurrentLocation size={14} />
                                    <span>Fetch Current Location (Free GPS)</span>
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Items */}
                    <div className="bg-[#FBFBFB] flex justify-between px-6 py-5 border border-gray-200">
                        <p className="text-[#676767] font-bold text-sm">My Chart</p>
                        <p className="text-[#676767] font-semibold text-sm">{totalItems} Items</p>
                    </div>
                    <div className="h-[50vh] overflow-y-auto">
                        {
                            cartItem.map((item, index) => (
                                <div key={index} className="px-7 py-5 border border-gray-200 flex items-center gap-5">
                                    <p>{item.quantity}</p>
                                    <img src={item.productId.image[0]} alt="" className="w-15 h-15" />
                                    <div className="text-xs flex flex-col gap-1">
                                        <p className="line-clamp-1">{item.productId.name}</p>
                                        <div>
                                            <p>{item.productId.unit}</p>
                                            {
                                                item?.productId.discount > 0 ? (
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-[11px] font-bold line-through text-gray-500">
                                                            &#8377;{item?.productId.price}
                                                        </span>
                                                        <span className="text-[11px] font-bold text-gray-700">
                                                            &#8377;{(item?.productId.price - (item?.productId.price * item?.productId.discount / 100)).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-[11px] font-bold text-gray-700">&#8377;{item?.productId.price}</span>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <button
                        className={`w-full text-white py-3 text-lg font-bold rounded-lg ${selectedPaymentMethod === ""
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#4A842C] cursor-pointer"
                            }`}
                        disabled={selectedPaymentMethod === ""}
                        onClick={() => setIsConfirmationScreenActive(true)}
                    >
                        Pay Now
                    </button>
                </div>
            </div>
            <button
                className={`w-full fixed lg:hidden xl:hidden bottom-0 text-white py-3 text-lg font-bold ${selectedPaymentMethod === ""
                    ? "bg-[#CCCCCC] cursor-not-allowed"
                    : "bg-[#4A842C] cursor-pointer"
                    }`}
                disabled={selectedPaymentMethod === ""}
                onClick={() => setIsConfirmationScreenActive(true)}
            >
                Pay Now
            </button>

            {isConfirmationScreenActive && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
                    {loading ? (
                        // Loader
                        <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow-lg w-40 h-28">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-500"></div>
                        </div>
                    ) : (
                        // Confirmation Modal
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
                            <h2 className="text-lg font-semibold mb-3 text-gray-800">
                                Confirm Your Order
                            </h2>
                            <p className="text-gray-600 mb-5">
                                Ready to place your order?
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setIsConfirmationScreenActive(false)}
                                    className="px-5 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePayNow}
                                    className="px-5 py-2 bg-[#4A842C] text-white rounded-md hover:bg-[#415c34] transition-all"
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

        </>
    );
}

export default CheckOut;
