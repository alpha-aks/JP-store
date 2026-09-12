import { useState, useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";;
import toast from "react-hot-toast";

const ResetPassword = () => {
    const outletContext = useOutletContext();
    const location = useLocation();
    const navigate = useNavigate();
    const success = location.state?.data?.success
    // console.log("success: ", success);
    const email = location.state?.email || "";
    
    // Redirect if accessed directly
    useEffect(() => {
        if (!email && !success) {
            toast.error("Unauthorized access! Redirecting...");
            navigate("/forgot-password", { replace: true }); // Redirect to forgot password
        }
    }, [email, navigate, success]);

    const [data, setData] = useState({
        email: email,
        newPassword: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const isDisabled = !data.newPassword || !data.confirmPassword || data.newPassword !== data.confirmPassword;

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await Axios({
                ...summaryApi.resetPassword,
                data
            });
            // console.log("Reset Password response: ", response);
            
            if (response.data.error) {
                toast.error(response.data.message);
            } else {
                toast.success("Password reset successfully! You can now log in.");
                navigate("/");

                if (outletContext?.setIsLoginOpen) {
                    outletContext.setIsLoginOpen(true);
                }
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
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
                        <span>નવો પાસવર્ડ બનાવો • RESET PASSWORD</span>
                        <span className="text-[#f37023]">✦</span>
                    </p>
                    <h1 className="text-xl font-extrabold text-[#0c286e] tracking-tight">
                        Reset Your Password
                    </h1>
                    <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
                        Create a secure new password for <b className="text-gray-800">{email}</b>.
                    </p>
                </div>

                <form onSubmit={handleResetPassword} className="px-6 pb-5 pt-2 space-y-3.5 relative z-10">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 text-left">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            value={data.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            className="w-full px-3.5 py-2.5 text-sm bg-[#fffdfa] border border-amber-200 rounded-xl focus:outline-none focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/60 transition-all text-gray-800 placeholder-gray-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1 text-left">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={data.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your new password"
                            className="w-full px-3.5 py-2.5 text-sm bg-[#fffdfa] border border-amber-200 rounded-xl focus:outline-none focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/60 transition-all text-gray-800 placeholder-gray-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isDisabled || loading}
                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shadow-md ${
                            isDisabled || loading
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                                : "bg-gradient-to-r from-[#f37023] to-[#ff8c42] hover:from-[#e05e13] hover:to-[#f37023] text-white cursor-pointer hover:shadow-orange-500/30 active:scale-[0.99]"
                        }`}
                    >
                        {loading ? "Resetting Password..." : "Update Password & Login"}
                    </button>
                </form>

                {/* Pedestal Base */}
                <div className="w-full py-3 px-6 bg-gradient-to-r from-amber-100/70 via-orange-100/70 to-amber-100/70 border-t border-amber-200/90 text-center relative z-10">
                    <button
                        type="button"
                        className="text-xs text-[#f37023] font-bold hover:underline cursor-pointer transition-colors"
                        onClick={() => navigate("/")}
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
