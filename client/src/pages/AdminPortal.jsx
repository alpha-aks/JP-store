import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails, logout } from "../store/userSlice";
import { 
    FaBox, 
    FaFileUpload, 
    FaLock, 
    FaArrowRight, 
    FaSignOutAlt,
    FaShieldAlt
} from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline, IoMailOutline } from "react-icons/io5";

function AdminPortal() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const isAdmin = user?._id && user?.role?.toUpperCase() === "ADMIN";

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAdminLogin = async (e) => {
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
                localStorage.setItem("accessToken", response.data.data.accessToken);
                localStorage.setItem("refreshToken", response.data.data.refreshToken);
                const userDetails = await fetchUserDetails();
                
                if (userDetails?.data?.role?.toUpperCase() === "ADMIN") {
                    dispatch(setUserDetails(userDetails.data));
                    toast.success("Welcome, Administrator!");
                    navigate("/dashboard/all-orders");
                } else {
                    dispatch(setUserDetails(userDetails.data));
                    toast.error("Logged in account is not an Administrator.");
                }
            }
        } catch (error) {
            if (error?.response?.data?.needVerification) {
                toast.error("Please verify your email with the OTP before logging in.");
            } else {
                AxiosToastError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await Axios(summaryApi.logout);
            if (response.data.success) {
                dispatch(logout());
                localStorage.clear();
                toast.success("Logged out successfully.");
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    // If User is already an Administrator: Show Admin Control Hub
    if (isAdmin) {
        return (
            <div className="min-h-[80vh] py-12 px-4 bg-gradient-to-b from-[#faf5ee] to-[#ffffff] flex flex-col items-center">
                <div className="w-full max-w-4xl">
                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-[#0c286e] via-[#10368c] to-[#0c286e] text-white rounded-3xl p-8 shadow-xl border-2 border-amber-300/60 mb-8 relative overflow-hidden">
                        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                            <FaShieldAlt size={220} />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-amber-400 text-sm">✦</span>
                                    <span className="text-xs font-serif uppercase tracking-widest text-amber-200">
                                        એડમિન પોર્ટલ • ADMIN PORTAL
                                    </span>
                                    <span className="text-amber-400 text-sm">✦</span>
                                </div>
                                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                                    Administrator Dashboard
                                </h1>
                                <p className="text-xs md:text-sm text-amber-100/90 mt-1">
                                    Logged in as <strong className="text-amber-300">{user.name}</strong> ({user.email})
                                </p>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
                            >
                                <FaSignOutAlt />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>

                    {/* Quick Action Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* All Orders Card */}
                        <Link
                            to="/dashboard/all-orders"
                            className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm hover:shadow-lg hover:border-[#f37023] transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#f37023] flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                                    <FaBox />
                                </div>
                                <h3 className="text-lg font-bold text-[#0c286e] group-hover:text-[#f37023] transition-colors">
                                    Orders & Delivery OTP
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    View all customer orders, update statuses, and verify Delivery OTPs before delivery.
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#f37023] mt-5">
                                <span>Manage Orders</span>
                                <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* Products Card */}
                        <Link
                            to="/dashboard/products"
                            className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm hover:shadow-lg hover:border-[#f37023] transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                                    <AiFillProduct />
                                </div>
                                <h3 className="text-lg font-bold text-[#0c286e] group-hover:text-[#f37023] transition-colors">
                                    Manage Products
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    Edit existing items, prices, inventory stocks, and unit descriptions.
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 mt-5">
                                <span>View Products</span>
                                <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* Upload Product Card */}
                        <Link
                            to="/dashboard/upload-product"
                            className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm hover:shadow-lg hover:border-[#f37023] transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                                    <FaFileUpload />
                                </div>
                                <h3 className="text-lg font-bold text-[#0c286e] group-hover:text-[#f37023] transition-colors">
                                    Upload Product
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    Publish new accessories, upload Cloudinary product photos, set discounts.
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-green-700 mt-5">
                                <span>Add New Product</span>
                                <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* Categories Card */}
                        <Link
                            to="/dashboard/category"
                            className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm hover:shadow-lg hover:border-[#f37023] transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                                    <TbCategory />
                                </div>
                                <h3 className="text-lg font-bold text-[#0c286e] group-hover:text-[#f37023] transition-colors">
                                    Categories
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    Manage root categories (Phone Cases, Chargers, Earphones, Cables, etc.).
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 mt-5">
                                <span>Manage Categories</span>
                                <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* Sub-Categories Card */}
                        <Link
                            to="/dashboard/sub-category"
                            className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm hover:shadow-lg hover:border-[#f37023] transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                                    <MdCategory />
                                </div>
                                <h3 className="text-lg font-bold text-[#0c286e] group-hover:text-[#f37023] transition-colors">
                                    Sub-Categories
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    Organize model-specific sub-categories (iPhone, Samsung, Type-C, etc.).
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 mt-5">
                                <span>Manage Sub-Categories</span>
                                <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* My Profile */}
                        <Link
                            to="/dashboard/profile"
                            className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm hover:shadow-lg hover:border-[#f37023] transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                                    <FaShieldAlt />
                                </div>
                                <h3 className="text-lg font-bold text-[#0c286e] group-hover:text-[#f37023] transition-colors">
                                    Admin Profile
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                    Update your administrator details, avatar, and contact settings.
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mt-5">
                                <span>Admin Profile</span>
                                <FaArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // If User is logged in as a normal USER (not ADMIN)
    if (user?._id && user?.role?.toUpperCase() !== "ADMIN") {
        return (
            <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
                <div className="relative w-full max-w-md bg-gradient-to-b from-[#fffbf4] to-[#fff7ed] rounded-3xl border-2 border-red-300 shadow-xl p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                        <FaLock />
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#0c286e] mb-2">
                        Administrator Access Required
                    </h2>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                        You are currently logged in as <strong>{user.name}</strong> (<span className="text-gray-800">{user.email}</span>), which has standard user permissions.
                    </p>

                    <div className="space-y-3">
                        <button
                            onClick={handleLogout}
                            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#f37023] to-[#ff8c42] text-white font-bold text-sm shadow-md hover:from-[#e05e13] hover:to-[#f37023] transition-all cursor-pointer"
                        >
                            Log Out & Sign In as Admin
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="w-full py-2 px-4 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            Return to Store Homepage
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Default: Dedicated Admin Login Form
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-[#faf5ee] to-[#ffffff]">
            {/* Traditional Royal Jharokha Window Frame */}
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#fffbf4] via-[#ffffff] to-[#fff7ed] rounded-t-[44px] rounded-b-2xl border-2 border-amber-300 shadow-[0_20px_50px_rgba(12,40,110,0.3)] overflow-hidden">
                
                {/* Decorative Arch Crest */}
                <div className="pt-7 pb-3 px-6 text-center relative z-10">
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
                        <span>એડમિનિસ્ટ્રેટર લૉગિન • ADMIN PORTAL</span>
                        <span className="text-[#f37023]">✦</span>
                    </p>
                    <h2 className="text-2xl font-extrabold text-[#0c286e] tracking-tight">
                        JP Store Administration
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                        Sign in with administrator credentials to manage orders and inventory.
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleAdminLogin} className="px-6 pb-6 pt-2 space-y-4 relative z-10">
                    {/* Email Input */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                            Admin Email Address
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                placeholder="admin@example.com"
                                required
                                className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#fffdfa] border border-amber-200 rounded-xl focus:outline-none focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/60 transition-all text-gray-800"
                            />
                            <IoMailOutline className="absolute left-3 top-3 text-gray-400" size={17} />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                placeholder="••••••••"
                                required
                                className="w-full pl-9 pr-10 py-2.5 text-sm bg-[#fffdfa] border border-amber-200 rounded-xl focus:outline-none focus:border-[#f37023] focus:ring-2 focus:ring-orange-200/60 transition-all text-gray-800"
                            />
                            <FaLock className="absolute left-3 top-3 text-gray-400" size={14} />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !loginData.email || !loginData.password}
                        className={`w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${
                            loading || !loginData.email || !loginData.password
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                                : "bg-gradient-to-r from-[#0c286e] via-[#10368c] to-[#0c286e] hover:from-[#f37023] hover:to-[#ff8c42] text-white cursor-pointer hover:shadow-orange-500/30 active:scale-[0.99]"
                        }`}
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Authenticating...</span>
                            </>
                        ) : (
                            "Sign In to Admin Portal"
                        )}
                    </button>
                </form>

                {/* Footer Sill */}
                <div className="w-full py-3 px-6 bg-gradient-to-r from-amber-100/70 via-orange-100/70 to-amber-100/70 border-t border-amber-200/90 text-center relative z-10">
                    <p className="text-xs text-gray-700">
                        Need regular shopping?{" "}
                        <button
                            type="button"
                            className="text-[#f37023] font-bold hover:underline cursor-pointer ml-1"
                            onClick={() => navigate("/")}
                        >
                            Go to Store
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminPortal;
