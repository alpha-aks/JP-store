import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";;
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const outletContext = useOutletContext(); // Get Outlet context

    const navigate = useNavigate()

    // console.log("Outlet Context:", outletContext); // Debugging


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...summaryApi.forgotPassword,
                data: {email}
            })
            // console.log("response: ", response);
            if(response.data.error) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/verify-forgot-password-otp", { state: { email } });
                setEmail("");
            }

        } catch (error) {
            AxiosToastError(error)
        }
    };

    return (
        <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12">
            {/* Traditional Royal Jharokha Window Frame */}
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#fffbf4] via-[#ffffff] to-[#fff7ed] rounded-t-[44px] rounded-b-2xl border-2 border-amber-300 shadow-[0_20px_50px_rgba(12,40,110,0.25)] overflow-hidden transition-all duration-300">
                
                {/* Subtle Inner Decorative Arch Line */}
                <div className="absolute inset-[4px] rounded-t-[40px] rounded-b-xl border border-amber-200/50 pointer-events-none"></div>

                {/* Arch Header & Traditional Ornamentation */}
                <div className="pt-6 pb-3 px-6 text-center relative z-10">
                    {/* Jharokha Arch Crest SVG */}
                    <div className="w-full flex justify-center mb-1">
                        <svg className="w-12 h-4 text-amber-500" viewBox="0 0 50 14" fill="none">
                            <path d="M25 1 C26 4, 29 5.5, 34 6 C40 7, 46 9, 50 14 L0 14 C4 9, 10 7, 16 6 C21 5.5, 24 4, 25 1 Z" fill="currentColor" fillOpacity="0.85"/>
                            <circle cx="25" cy="3" r="1.5" fill="#f37023" />
                        </svg>
                    </div>

                    {/* Logo Emblem */}
                    <div className="mx-auto w-14 h-14 rounded-full bg-white border-2 border-amber-300 shadow-sm flex items-center justify-center p-1.5 mb-2">
                        <img 
                            src="/Jp store logo.png" 
                            alt="JP Store" 
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <p className="text-[11px] font-serif font-bold text-amber-800 tracking-wider flex items-center justify-center gap-1.5 mb-0.5">
                        <span className="text-[#f37023]">✦</span>
                        <span>પાસવર્ડ પુનઃપ્રાપ્તિ • PASSWORD RECOVERY</span>
                        <span className="text-[#f37023]">✦</span>
                    </p>
                    <h1 className="text-xl font-extrabold text-[#0c286e] tracking-tight">
                        Forgot Your Password?
                    </h1>
                    <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
                        Enter your registered email address to receive your password reset verification code.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="px-6 pb-5 pt-2 space-y-3.5 relative z-10">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 text-left">
                            Registered Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            className="w-full px-3.5 py-2.5 text-sm bg-[#fffdfa] border border-amber-200 rounded-xl focus:outline-none focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/60 transition-all text-gray-800 placeholder-gray-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 px-4 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-[#f37023] to-[#ff8c42] hover:from-[#e05e13] hover:to-[#f37023] text-white cursor-pointer shadow-md hover:shadow-orange-500/30 transition-all duration-200 active:scale-[0.99]"
                    >
                        Send Reset Instructions
                    </button>
                </form>

                {/* Pedestal Base */}
                <div className="w-full py-3 px-6 bg-gradient-to-r from-amber-100/70 via-orange-100/70 to-amber-100/70 border-t border-amber-200/90 text-center relative z-10">
                    <p className="text-xs text-gray-700">
                        Remembered your password?{" "}
                        <button
                            type="button"
                            className="text-[#f37023] font-bold hover:text-[#d45811] hover:underline cursor-pointer ml-1 transition-colors"
                            onClick={() => {
                                if (outletContext?.setIsLoginOpen) {
                                    navigate("/");
                                    outletContext.setIsLoginOpen(true);
                                } else {
                                    navigate("/");
                                }
                            }}
                        >
                            Log In Here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
