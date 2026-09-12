/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import summaryApi from ".././common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { IoClose, IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = ({ setIsLoginOpen, setIsRegister }) => {
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({ 
        email: "", 
        password: "" 
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleForgotPassword = () => {
        setIsLoginOpen(false); // Close Login Popup
        navigate("/forgot-password"); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!loginData.email || !loginData.password) return;

        try {
            setLoading(true);
            const response = await Axios({
                ...summaryApi.login,
                data: loginData
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem("accessToken", response.data.data.accessToken);
                localStorage.setItem("refreshToken", response.data.data.refreshToken);
                const userDetails = await fetchUserDetails();
                dispatch(setUserDetails(userDetails.data));

                setLoginData({
                    email: "",
                    password: "",
                });
                setIsLoginOpen(false); // Close modal
                navigate("/");
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-[#0c286e]/55 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200"
            onClick={(e) => {
                if (e.target === e.currentTarget) setIsLoginOpen(false);
            }}
        >
            {/* Traditional Royal Jharokha Window Frame */}
            <div className="relative w-full max-w-[400px] bg-gradient-to-b from-[#fffbf4] via-[#ffffff] to-[#fff7ed] rounded-t-[44px] rounded-b-2xl border-2 border-amber-300 shadow-[0_20px_50px_rgba(12,40,110,0.35)] overflow-hidden transition-all duration-300">
                
                {/* Subtle Inner Decorative Arch Line */}
                <div className="absolute inset-[4px] rounded-t-[40px] rounded-b-xl border border-amber-200/50 pointer-events-none"></div>

                {/* Close Button */}
                <button 
                    className="cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-100/70 hover:bg-[#f37023] text-amber-900 hover:text-white border border-amber-300/80 flex items-center justify-center transition-all duration-200 shadow-sm z-20"
                    onClick={() => setIsLoginOpen(false)}
                    aria-label="Close"
                >
                    <IoClose className="text-xl" />
                </button>

                {/* Arch Header & Traditional Ornamentation */}
                <div className="pt-5 pb-3 px-6 text-center relative z-10">
                    {/* Jharokha Arch Crest SVG */}
                    <div className="w-full flex justify-center mb-1">
                        <svg className="w-12 h-4 text-amber-500" viewBox="0 0 50 14" fill="none">
                            <path d="M25 1 C26 4, 29 5.5, 34 6 C40 7, 46 9, 50 14 L0 14 C4 9, 10 7, 16 6 C21 5.5, 24 4, 25 1 Z" fill="currentColor" fillOpacity="0.85"/>
                            <circle cx="25" cy="3" r="1.5" fill="#f37023" />
                        </svg>
                    </div>

                    {/* Logo Emblem inside Ornamental Medallion */}
                    <div className="mx-auto w-14 h-14 rounded-full bg-white border-2 border-amber-300 shadow-sm flex items-center justify-center p-1.5 mb-2">
                        <img 
                            src="/Jp store logo.png" 
                            alt="JP Store" 
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Traditional Greeting */}
                    <p className="text-[11px] font-serif font-bold text-amber-800 tracking-wider flex items-center justify-center gap-1.5 mb-0.5">
                        <span className="text-[#f37023]">✦</span>
                        <span>શુભ સ્વાગતમ્ • WELCOME BACK</span>
                        <span className="text-[#f37023]">✦</span>
                    </p>
                    <h2 className="text-xl font-extrabold text-[#0c286e] tracking-tight">
                        Login to Your Account
                    </h2>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="px-6 pb-5 pt-1 space-y-3.5 relative z-10">
                    {/* Email Input */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 text-left">
                            Email Address
                        </label>
                        <div className="relative flex items-center">
                            <IoMailOutline className="absolute left-3 text-gray-400 text-lg pointer-events-none" />
                            <input
                                value={loginData.email}
                                name="email"
                                type="email"
                                required
                                placeholder="name@example.com"
                                className="w-full pl-9 pr-3 py-2 text-sm bg-[#fffdfa] border border-amber-200 rounded-xl focus:outline-none focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/60 transition-all text-gray-800 placeholder-gray-400"
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 text-left">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <IoLockClosedOutline className="absolute left-3 text-gray-400 text-lg pointer-events-none" />
                            <input
                                value={loginData.password}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                className="w-full pl-9 pr-10 py-2 text-sm bg-[#fffdfa] border border-amber-200 rounded-xl focus:outline-none focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/60 transition-all text-gray-800 placeholder-gray-400"
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <IoEyeOffOutline className="text-lg" /> : <IoEyeOutline className="text-lg" />}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex justify-end pt-0.5">
                        <button
                            type="button"
                            className="text-xs font-semibold text-[#f37023] hover:text-[#d45811] hover:underline cursor-pointer transition-colors"
                            onClick={handleForgotPassword}
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Login CTA Button */}
                    <button 
                        type="submit"
                        disabled={!loginData.email || !loginData.password || loading}
                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shadow-md ${
                            !loginData.email || !loginData.password || loading
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                                : "bg-gradient-to-r from-[#f37023] to-[#ff8c42] hover:from-[#e05e13] hover:to-[#f37023] text-white cursor-pointer hover:shadow-orange-500/30 active:scale-[0.99]"
                        }`}
                    >
                        {loading ? "Logging in..." : "Login to Account"}
                    </button>
                </form>

                {/* Traditional Window Sill / Pedestal Base for Switching to Register */}
                <div className="w-full py-3 px-6 bg-gradient-to-r from-amber-100/70 via-orange-100/70 to-amber-100/70 border-t border-amber-200/90 text-center relative z-10">
                    <p className="text-xs text-gray-700">
                        Don&apos;t have an account?{" "}
                        <button
                            type="button"
                            className="text-[#f37023] font-bold hover:text-[#d45811] hover:underline cursor-pointer ml-1 transition-colors"
                            onClick={() => {
                                if (setIsRegister) setIsRegister(true);
                            }}
                        >
                            Register Here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
