/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { MdOutlineDesktopAccessDisabled } from "react-icons/md";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles }) => {
    const user = useSelector((state) => state.user);
    const userRole = user?.role;
    const hasToken = typeof window !== "undefined" && Boolean(localStorage.getItem("accessToken"));

    // If user has token but details haven't finished loading in Redux yet, show smooth loading spinner
    if (hasToken && !user?._id) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
                <div className="w-10 h-10 border-4 border-amber-300 border-t-[#f37023] rounded-full animate-spin"></div>
                <p className="text-xs text-gray-500 font-semibold">Verifying administrator permissions...</p>
            </div>
        );
    }

    const isAuthorized = allowedRoles.some(
        (role) => role.toUpperCase() === userRole?.toUpperCase()
    );

    if (!isAuthorized) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
                <div className="w-20 h-20 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-4">
                    <MdOutlineDesktopAccessDisabled size={42} />
                </div>
                <h2 className="text-2xl font-bold text-[#0c286e] mb-1">
                    Access Denied
                </h2>
                <p className="text-sm text-gray-600 max-w-md mb-5 leading-relaxed">
                    You do not have permission to view this administrator section. Please sign in with an account that has Administrator privileges.
                </p>
                <div className="flex gap-3">
                    <Link
                        to="/admin"
                        className="px-4 py-2 bg-[#0c286e] hover:bg-[#f37023] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                    >
                        Sign In as Admin
                    </Link>
                    <Link
                        to="/"
                        className="px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-xl transition-colors"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    return element;
};

export default ProtectedRoute;
