import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import summaryApi from "../common/summaryApi";;

const VerifyForgotPasswordOTP = () => {
    const location = useLocation();
    // console.log("location",location)
    const navigate = useNavigate();
    const email = location.state?.email || "";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    // Handle OTP input change
    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return; // Allow only numbers

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1); // Only keep the last digit
        setOtp(newOtp);

        // Move to next input if a number is entered
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle Backspace Key
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const otpValue = otp.join(""); // Convert array to string

        if (otpValue.length !== 6) {
            toast.error("Please enter a 6-digit OTP.");
            return;
        }

        try {
            const response = await Axios({
                ...summaryApi.verifyForgotPasswordOTP,
                data: { email, otp: otpValue },
            });

            // console.log("OTP Verification response: ", response);
            if (response.data.error) {
                toast.error(response.data.message);
            }
            if (response.data.success) {
                toast.success("OTP verified successfully!");
                navigate(
                    "/reset-password", 
                    { state: { 
                        email, 
                        data: response.data 
                    } }
                );
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12">
            {/* Traditional Royal Jharokha Window Frame */}
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#fffbf4] via-[#ffffff] to-[#fff7ed] rounded-t-[44px] rounded-b-2xl border-2 border-amber-300 shadow-[0_20px_50px_rgba(12,40,110,0.25)] overflow-hidden transition-all duration-300">
                
                {/* Subtle Inner Decorative Arch Line */}
                <div className="absolute inset-[4px] rounded-t-[40px] rounded-b-xl border border-amber-200/50 pointer-events-none"></div>

                {/* Arch Header */}
                <div className="pt-6 pb-3 px-6 text-center relative z-10">
                    <div className="w-full flex justify-center mb-1">
                        <svg className="w-12 h-4 text-amber-500" viewBox="0 0 50 14" fill="none">
                            <path d="M25 1 C26 4, 29 5.5, 34 6 C40 7, 46 9, 50 14 L0 14 C4 9, 10 7, 16 6 C21 5.5, 24 4, 25 1 Z" fill="currentColor" fillOpacity="0.85"/>
                            <circle cx="25" cy="3" r="1.5" fill="#f37023" />
                        </svg>
                    </div>

                    <div className="mx-auto w-14 h-14 rounded-full bg-white border-2 border-amber-300 shadow-sm flex items-center justify-center p-1.5 mb-2">
                        <img 
                            src="/Jp store logo.png" 
                            alt="JP Store" 
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <p className="text-[11px] font-serif font-bold text-amber-800 tracking-wider flex items-center justify-center gap-1.5 mb-0.5">
                        <span className="text-[#f37023]">✦</span>
                        <span>ચકાસણી કોડ • OTP VERIFICATION</span>
                        <span className="text-[#f37023]">✦</span>
                    </p>
                    <h1 className="text-xl font-extrabold text-[#0c286e] tracking-tight">
                        Enter Security Code
                    </h1>
                    <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
                        We have sent a 6-digit verification code to <b className="text-gray-800">{email}</b>.
                    </p>
                </div>

                <form onSubmit={handleVerifyOTP} className="px-6 pb-5 pt-2 space-y-4 relative z-10">
                    {/* OTP Input Fields */}
                    <div className="flex justify-center gap-2 sm:gap-2.5">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(index, e)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                maxLength={1}
                                className="w-10 h-12 sm:w-11 sm:h-12 text-center text-xl font-bold border-2 border-amber-200 bg-[#fffdfa] rounded-xl focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/60 outline-none text-[#0c286e] transition-all"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-[#f37023] to-[#ff8c42] hover:from-[#e05e13] hover:to-[#f37023] text-white cursor-pointer shadow-md hover:shadow-orange-500/30 transition-all duration-200 active:scale-[0.99]"
                    >
                        Verify & Continue
                    </button>
                </form>

                {/* Pedestal Base */}
                <div className="w-full py-3 px-6 bg-gradient-to-r from-amber-100/70 via-orange-100/70 to-amber-100/70 border-t border-amber-200/90 text-center relative z-10">
                    <button
                        type="button"
                        className="text-xs text-gray-700 hover:text-[#f37023] font-semibold cursor-pointer transition-colors"
                        onClick={() => navigate("/forgot-password")}
                    >
                        ← Return to Forgot Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyForgotPasswordOTP;
