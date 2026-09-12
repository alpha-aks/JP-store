/* eslint-disable react/prop-types */
import { useState } from "react";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import summaryApi from "../common/summaryApi";;
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Register = ({ setIsLoginOpen, setIsRegister }) => {
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
    });
    const navigate = useNavigate(); 

    const [passwordError, setPasswordError] = useState("");

    const dispatch = useDispatch();

    const handleChangeRegister = (e) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "password" || name === "confirmPassword") {
            setPasswordError(value !== registerData.password && name === "confirmPassword" ? "Passwords do not match" : "");
        }
    };

    const isRegisterDisabled =
        !registerData.name ||
        !registerData.email ||
        !registerData.password ||
        !registerData.confirmPassword ||
        passwordError !== "" ||
        !registerData.mobile;

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await Axios({
                ...summaryApi.register,
                data: registerData
            })
            // console.log("response: ", response);
            if (response.data.error){
                toast.error(response.data.message)
            }
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUserDetails(response.data.user));
                setRegisterData({
                    name: "",
                    email: "",
                    password: "",
                    mobile: "",
                });
                navigate("/")
                setIsLoginOpen(false); // This will close the register pop-up

                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            
        } catch (error) {
            // console.log(error);
            AxiosToastError(error);
        }
    }

    return (
        <div 
            className="fixed inset-0 bg-[#0c286e]/55 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200 overflow-y-auto"
            onClick={(e) => {
                if (e.target === e.currentTarget) setIsLoginOpen(false);
            }}
        >
            {/* Traditional Royal Jharokha Window Frame */}
            <div className="relative w-full max-w-[420px] my-auto bg-gradient-to-b from-[#fffbf4] via-[#ffffff] to-[#fff7ed] rounded-t-[44px] rounded-b-2xl border-2 border-amber-300 shadow-[0_20px_50px_rgba(12,40,110,0.35)] overflow-hidden transition-all duration-300">
                
                {/* Subtle Inner Decorative Arch Line */}
                <div className="absolute inset-[4px] rounded-t-[40px] rounded-b-xl border border-amber-200/50 pointer-events-none"></div>

                {/* Close Button */}
                <button 
                    className="cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-100/70 hover:bg-[#f37023] text-amber-900 hover:text-white border border-amber-300/80 flex items-center justify-center transition-all duration-200 shadow-sm z-20"
                    onClick={() => setIsLoginOpen(false)}
                    aria-label="Close"
                >
                    <span className="text-lg font-bold leading-none">&times;</span>
                </button>

                {/* Arch Header & Traditional Ornamentation */}
                <div className="pt-5 pb-2 px-6 text-center relative z-10">
                    {/* Jharokha Arch Crest SVG */}
                    <div className="w-full flex justify-center mb-1">
                        <svg className="w-12 h-4 text-amber-500" viewBox="0 0 50 14" fill="none">
                            <path d="M25 1 C26 4, 29 5.5, 34 6 C40 7, 46 9, 50 14 L0 14 C4 9, 10 7, 16 6 C21 5.5, 24 4, 25 1 Z" fill="currentColor" fillOpacity="0.85"/>
                            <circle cx="25" cy="3" r="1.5" fill="#f37023" />
                        </svg>
                    </div>

                    {/* Logo Emblem */}
                    <div className="mx-auto w-12 h-12 rounded-full bg-white border-2 border-amber-300 shadow-sm flex items-center justify-center p-1 mb-1.5">
                        <img 
                            src="/Jp store logo.png" 
                            alt="JP Store" 
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <p className="text-[11px] font-serif font-bold text-amber-800 tracking-wider flex items-center justify-center gap-1.5 mb-0.5">
                        <span className="text-[#f37023]">✦</span>
                        <span>નવું ખાતું બનાવો • NEW MEMBER</span>
                        <span className="text-[#f37023]">✦</span>
                    </p>
                    <h2 className="text-xl font-extrabold text-[#0c286e] tracking-tight">
                        Create an Account
                    </h2>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="px-6 pb-4 pt-1 space-y-2.5 relative z-10">
                    <div>
                        <input
                            value={registerData.name}
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-3 py-2 text-sm bg-[#fffdfa] border border-amber-200 rounded-xl focus:outline-none focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/60 transition-all text-gray-800 placeholder-gray-400"
                            onChange={handleChangeRegister}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div>
                        <input
                            value={registerData.email}
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-3 py-2 text-sm bg-[#fffdfa] border border-amber-200 rounded-xl focus:outline-none focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/60 transition-all text-gray-800 placeholder-gray-400"
                            onChange={handleChangeRegister}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            value={registerData.password}
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="w-full px-3 py-2 text-sm bg-[#fffdfa] border border-amber-200 rounded-xl focus:outline-none focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/60 transition-all text-gray-800 placeholder-gray-400"
                            onChange={handleChangeRegister}
                            autoComplete="off"
                            required
                        />
                        <input
                            value={registerData.confirmPassword}
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm"
                            className="w-full px-3 py-2 text-sm bg-[#fffdfa] border border-amber-200 rounded-xl focus:outline-none focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/60 transition-all text-gray-800 placeholder-gray-400"
                            onChange={handleChangeRegister}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div>
                        <input
                            value={registerData.mobile}
                            name="mobile"
                            type="tel"
                            placeholder="Mobile Number (e.g. 9876543210)"
                            className="w-full px-3 py-2 text-sm bg-[#fffdfa] border border-amber-200 rounded-xl focus:outline-none focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/60 transition-all text-gray-800 placeholder-gray-400"
                            onChange={handleChangeRegister}
                            autoComplete="off"
                            required
                        />
                    </div>

                    {passwordError && (
                        <p className="text-red-500 text-xs font-semibold text-center">{passwordError}</p>
                    )}

                    <button 
                        type="submit"
                        disabled={isRegisterDisabled}
                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shadow-md ${
                            isRegisterDisabled
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                                : "bg-gradient-to-r from-[#f37023] to-[#ff8c42] hover:from-[#e05e13] hover:to-[#f37023] text-white cursor-pointer hover:shadow-orange-500/30 active:scale-[0.99]"
                        }`}
                    >
                        Create Account
                    </button>
                </form>

                {/* Traditional Window Sill / Pedestal Base */}
                <div className="w-full py-3 px-6 bg-gradient-to-r from-amber-100/70 via-orange-100/70 to-amber-100/70 border-t border-amber-200/90 text-center relative z-10">
                    <p className="text-xs text-gray-700">
                        Already have an account?{" "}
                        <button
                            type="button"
                            className="text-[#f37023] font-bold hover:text-[#d45811] hover:underline cursor-pointer ml-1 transition-colors"
                            onClick={() => setIsRegister(false)}
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
