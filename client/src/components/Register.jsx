/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import summaryApi from "../common/summaryApi";
import { FaArrowLeft } from "react-icons/fa6";

const Register = ({ setIsLoginOpen, setIsRegister }) => {
    // Step state: "form" | "otp"
    const [step, setStep] = useState("form");

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
    });

    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    // OTP State
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const inputRefs = useRef([]);

    // Countdown timer for Resend OTP
    useEffect(() => {
        let interval;
        if (step === "otp" && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const handleChangeRegister = (e) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "password" || name === "confirmPassword") {
            const currentPassword = name === "password" ? value : registerData.password;
            const currentConfirm = name === "confirmPassword" ? value : registerData.confirmPassword;
            setPasswordError(currentPassword && currentConfirm && currentPassword !== currentConfirm ? "Passwords do not match" : "");
        }
    };

    const isRegisterDisabled =
        !registerData.name ||
        !registerData.email ||
        !registerData.password ||
        !registerData.confirmPassword ||
        passwordError !== "" ||
        !registerData.mobile ||
        loading;

    // Step 1: Submit details and send OTP
    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (isRegisterDisabled) return;

        try {
            setLoading(true);
            const response = await Axios({
                ...summaryApi.register,
                data: {
                    name: registerData.name,
                    email: registerData.email.toLowerCase().trim(),
                    password: registerData.password,
                    mobile: registerData.mobile,
                }
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }
            if (response.data.success) {
                toast.success(response.data.message || "Verification code sent to your email!");
                setStep("otp");
                setTimer(60);
                setCanResend(false);
                setOtp(["", "", "", "", "", ""]);
                // Auto focus first OTP input after switching step
                setTimeout(() => {
                    inputRefs.current[0]?.focus();
                }, 100);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle OTP input change
    const handleOtpChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Auto-advance to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle Backspace in OTP
    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle Paste in OTP
    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split("");
            setOtp(digits);
            inputRefs.current[5]?.focus();
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const otpValue = otp.join("");

        if (otpValue.length !== 6) {
            toast.error("Please enter the complete 6-digit OTP.");
            return;
        }

        try {
            setLoading(true);
            const response = await Axios({
                ...summaryApi.verifyRegisterOtp,
                data: {
                    email: registerData.email.toLowerCase().trim(),
                    otp: otpValue
                }
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }
            if (response.data.success) {
                toast.success("Registration successful! Please log in.");
                setIsRegister(false); // Switch to Login modal
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP
    const handleResendOTP = async () => {
        if (!canResend || resendLoading) return;

        try {
            setResendLoading(true);
            const response = await Axios({
                ...summaryApi.resendRegisterOtp,
                data: {
                    email: registerData.email.toLowerCase().trim()
                }
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }
            if (response.data.success) {
                toast.success("A new verification code has been sent to your email.");
                setTimer(60);
                setCanResend(false);
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0]?.focus();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-[#0c286e]/55 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200 overflow-y-auto"
            onClick={(e) => {
                if (e.target === e.currentTarget) setIsLoginOpen(false);
            }}
        >
            {/* Traditional Royal Jharokha Window Frame */}
            <div className="relative w-full max-w-[430px] my-auto bg-gradient-to-b from-[#fffbf4] via-[#ffffff] to-[#fff7ed] rounded-t-[44px] rounded-b-2xl border-2 border-amber-300 shadow-[0_20px_50px_rgba(12,40,110,0.35)] overflow-hidden transition-all duration-300">
                
                {/* Subtle Inner Decorative Arch Line */}
                <div className="absolute inset-[4px] rounded-t-[40px] rounded-b-xl border border-amber-200/50 pointer-events-none"></div>

                {/* Back button when on OTP step */}
                {step === "otp" && (
                    <button
                        type="button"
                        className="cursor-pointer absolute top-4 left-4 w-8 h-8 rounded-full bg-amber-100/70 hover:bg-[#f37023] text-amber-900 hover:text-white border border-amber-300/80 flex items-center justify-center transition-all duration-200 shadow-sm z-20"
                        onClick={() => setStep("form")}
                        aria-label="Back to registration"
                        title="Back to details"
                    >
                        <FaArrowLeft size={13} />
                    </button>
                )}

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
                        <span>
                            {step === "form" ? "નવું ખાતું બનાવો • NEW MEMBER" : "ઇમેઇલ ચકાસણી • VERIFY EMAIL"}
                        </span>
                        <span className="text-[#f37023]">✦</span>
                    </p>
                    <h2 className="text-xl font-extrabold text-[#0c286e] tracking-tight">
                        {step === "form" ? "Create an Account" : "Enter Verification Code"}
                    </h2>
                    {step === "otp" && (
                        <p className="text-xs text-gray-600 mt-1 max-w-[320px] mx-auto leading-relaxed">
                            We sent a 6-digit verification code to <br/>
                            <strong className="text-amber-900 font-bold">{registerData.email}</strong>
                        </p>
                    )}
                </div>

                {/* STEP 1: Registration Form */}
                {step === "form" ? (
                    <form onSubmit={handleSendOTP} className="px-6 pb-4 pt-1 space-y-2.5 relative z-10">
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
                            className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${
                                isRegisterDisabled
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                                    : "bg-gradient-to-r from-[#f37023] to-[#ff8c42] hover:from-[#e05e13] hover:to-[#f37023] text-white cursor-pointer hover:shadow-orange-500/30 active:scale-[0.99]"
                            }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Sending OTP...</span>
                                </>
                            ) : (
                                "Send Verification OTP"
                            )}
                        </button>
                    </form>
                ) : (
                    /* STEP 2: OTP Verification */
                    <form onSubmit={handleVerifyOTP} className="px-6 pb-4 pt-1 space-y-4 relative z-10">
                        {/* 6 Digit Input Boxes */}
                        <div className="flex justify-center gap-2 my-2" onPaste={handleOtpPaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    className="w-11 h-12 text-center text-xl font-extrabold text-[#0c286e] bg-[#fffdfa] border-2 border-amber-300 rounded-xl focus:outline-none focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/70 shadow-sm transition-all"
                                />
                            ))}
                        </div>

                        {/* Timer & Resend */}
                        <div className="flex items-center justify-between text-xs px-1">
                            <span className="text-gray-500">
                                {timer > 0 ? (
                                    <span className="text-amber-800 font-medium">
                                        Resend code in <strong>{timer}s</strong>
                                    </span>
                                ) : (
                                    <span className="text-gray-400">Didn&apos;t receive code?</span>
                                )}
                            </span>
                            <button
                                type="button"
                                disabled={!canResend || resendLoading}
                                onClick={handleResendOTP}
                                className={`font-bold transition-colors cursor-pointer ${
                                    canResend && !resendLoading
                                        ? "text-[#f37023] hover:text-[#d45811] underline"
                                        : "text-gray-300 cursor-not-allowed"
                                }`}
                            >
                                {resendLoading ? "Sending..." : "Resend OTP"}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit"
                            disabled={otp.join("").length !== 6 || loading}
                            className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${
                                otp.join("").length !== 6 || loading
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                                    : "bg-gradient-to-r from-[#038C1F] to-[#04aa26] hover:from-[#027018] hover:to-[#038C1F] text-white cursor-pointer hover:shadow-green-500/30 active:scale-[0.99]"
                            }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Verifying OTP...</span>
                                </>
                            ) : (
                                "Verify & Complete Registration"
                            )}
                        </button>
                    </form>
                )}

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
