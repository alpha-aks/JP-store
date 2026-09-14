import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaRegUser, FaFileUpload, FaUserCircle, FaBox } from "react-icons/fa";
import { MdOutlineListAlt, MdCategory } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";;
import { logout } from "../store/userSlice";
import { setAllCategory } from "../store/productSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { AiFillProduct } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";

function UserMenuForMobileUser() {
    const user = useSelector((state) => state.user);
    const allCategory = useSelector((state) => state.product.allCategory) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (allCategory.length === 0) {
            Axios(summaryApi.getCategory).then(res => {
                if (res.data?.success && res.data?.data) {
                    dispatch(setAllCategory(res.data.data));
                }
            }).catch(console.error);
        }
    }, [dispatch]);

    const handleLogout = async () => {
        try {
            const response = await Axios(summaryApi.logout);
            if (response.data.success) {
                dispatch(logout());
                localStorage.clear();
                toast.success(response.data.message);
                navigate("/");
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <div className="bg-white px-6 py-1">

            {/* Back Button */}
            <button 
                className="mt-10 flex items-center space-x-2 text-gray-700 text-lg hover:text-black transition duration-200 hover:bg-gray-200 p-2 rounded-lg"
                onClick={() => navigate("/")}
            >
                <IoArrowBack size={24} /> <span>Go Back</span>
            </button>
            {/* User Info */}
            <Link to={"/dashboard/profile"}>
                <div className="mt-1 text-gray-700 flex items-center space-x-4 hover:text-black transition duration-200 hover:bg-gray-200 py-1 rounded-xl">
                    {user?.avatar && user.avatar !== "" ? (
                        <img 
                            src={user.avatar} 
                            alt="User Avatar" 
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <FaUserCircle size={48} className="text-black" />
                    )}
                    <div>
                        <p className="text-lg font-medium">{user?.name} <span className="text-sm text-[#878787]">{user.role === "ADMIN" ? "(admin)" : ""}</span></p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                </div>
            </Link>
            {/* Menu Items */}
            <div className="mt-2 space-y-1">
                {
                    user.role === "ADMIN" 
                        && (
                            <>
                                <Link 
                                    to="/dashboard/category" 
                                    className="flex items-center space-x-3 text-gray-700 text-lg hover:text-black transition duration-200 hover:bg-gray-200 p-2 rounded-lg"
                                >
                                    <TbCategory size={20} /> <span>Category</span>
                                </Link>
                                <Link 
                                    to="/dashboard/sub-category" 
                                    className="flex items-center space-x-3 text-gray-700 text-lg hover:text-black transition duration-200 hover:bg-gray-200 p-2 rounded-lg"
                                >
                                    <MdCategory size={20} /> <span>Sub Category</span>
                                </Link>
                                <Link 
                                    to="/dashboard/products" 
                                    className="flex items-center space-x-3 text-gray-700 text-lg hover:text-black transition duration-200 hover:bg-gray-200 p-2 rounded-lg"
                                >
                                    <AiFillProduct size={20} /> <span>Products</span>
                                </Link>
                                <Link 
                                    to="/dashboard/upload-product" 
                                    className="flex items-center space-x-3 text-gray-700 text-lg hover:text-black transition duration-200 hover:bg-gray-200 p-2 rounded-lg"
                                >
                                    <FaFileUpload size={18} /> <span>Upload Product</span>
                                </Link>
                                <Link 
                                    to="/dashboard/all-orders" 
                                    className="flex items-center space-x-3 text-gray-700 text-lg hover:text-black transition duration-200 hover:bg-gray-200 p-2 rounded-lg"
                                >
                                    <FaBox size={18} /> <span>All Orders</span>
                                </Link>
                            </>
                        )
                }
                <Link 
                    to="/dashboard/my-orders" 
                    className="flex items-center space-x-3 text-gray-700 text-lg hover:text-black transition duration-200 hover:bg-gray-200 p-2 rounded-lg"
                >
                    <MdOutlineListAlt size={20} /> <span>My Orders</span>
                </Link>
                <Link 
                    to="/dashboard/addresses" 
                    className="flex items-center space-x-3 text-gray-700 text-lg hover:text-black transition duration-200 hover:bg-gray-200 p-2 rounded-lg"
                >
                    <FaHome size={20} /> <span>Saved Addresses</span>
                </Link>
                {user?._id && (
                    <button 
                        className="flex items-center space-x-3 text-red-500 text-lg hover:text-red-700 transition duration-200 hover:bg-red-100 p-2 rounded-lg w-full"
                        onClick={handleLogout}
                    >
                        <FaRegUser size={20} /> <span>Logout</span>
                    </button>
                )}
            </div>

            {/* Public Category Browser for Mobile */}
            <div className="mt-6 border-t pt-4 pb-12">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0c286e] mb-3 flex items-center gap-2">
                    <span className="text-[#f37023]">✦</span>
                    <span>Browse Categories</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {allCategory.map((cat) => (
                        <div
                            key={cat._id}
                            onClick={() => navigate(`/all-products-by-category/${cat._id}`)}
                            className="flex items-center gap-2.5 p-2 bg-amber-50/50 hover:bg-amber-100/60 border border-amber-200/60 rounded-xl cursor-pointer transition-colors"
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-8 h-8 object-contain shrink-0"
                            />
                            <span className="text-xs font-semibold text-gray-800 truncate">
                                {cat.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserMenuForMobileUser;
