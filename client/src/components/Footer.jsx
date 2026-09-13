import { FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaGithub, FaXTwitter, FaTruckFast, FaShieldHalved } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdOutlineVerifiedUser, MdSupportAgent } from "react-icons/md";

function Footer() {
    const allCategory = useSelector((state) => state.product.allCategory) || [];
    const navigate = useNavigate();
    const [showCategories, setShowCategories] = useState(false);

    // Split categories into 2 neat columns for the footer
    const halfLength = Math.ceil(allCategory.length / 2);
    const col1 = allCategory.slice(0, halfLength);
    const col2 = allCategory.slice(halfLength);

    return (
        <footer className="w-full relative overflow-hidden bg-gradient-to-b from-[#091b42] via-[#071534] to-[#040d22] text-white">
            {/* Royal Top Border Pattern inspired by the Gundala banner */}
            <div className="w-full h-3 bg-gradient-to-r from-[#d97706] via-[#f37023] to-[#d97706] relative">
                <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px]"></div>
            </div>

            {/* Decorative Gold Keyline */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#fbbf24]/50 to-transparent"></div>

            {/* Royal Trust Badges Bar */}
            <div className="w-full border-b border-white/10 bg-white/[0.02]">
                <div className="container mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Badge 1 */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#f37023]/40 transition-all duration-300">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#f37023] to-[#d97706] flex items-center justify-center text-white shadow-lg shrink-0">
                            <FaTruckFast size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white tracking-wide">ઝડપી ડિલિવરી</h4>
                            <p className="text-[11px] text-amber-200/80">Delivered in 8-15 mins</p>
                        </div>
                    </div>

                    {/* Badge 2 */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#f37023]/40 transition-all duration-300">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#f37023] to-[#d97706] flex items-center justify-center text-white shadow-lg shrink-0">
                            <MdOutlineVerifiedUser size={22} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white tracking-wide">શ્રેષ્ઠ ગુણવત્તા</h4>
                            <p className="text-[11px] text-amber-200/80">100% Original & Genuine</p>
                        </div>
                    </div>

                    {/* Badge 3 */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#f37023]/40 transition-all duration-300">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#f37023] to-[#d97706] flex items-center justify-center text-white shadow-lg shrink-0">
                            <FaShieldHalved size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white tracking-wide">સુરક્ષિત પેમેન્ટ</h4>
                            <p className="text-[11px] text-amber-200/80">100% Razorpay Secured</p>
                        </div>
                    </div>

                    {/* Badge 4 */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#f37023]/40 transition-all duration-300">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#f37023] to-[#d97706] flex items-center justify-center text-white shadow-lg shrink-0">
                            <MdSupportAgent size={22} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white tracking-wide">ગ્રાહક સેવા</h4>
                            <p className="text-[11px] text-amber-200/80">Dedicated Daily Support</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Links & Info */}
            <div className="container mx-auto px-4 py-10 lg:py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
                    
                    {/* Brand Column (5 cols) */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-white p-1 shadow-[0_0_20px_rgba(243,112,35,0.4)] border-2 border-[#f37023] flex items-center justify-center shrink-0">
                                <img
                                    src="/Jp store logo.png"
                                    alt="JP Store"
                                    className="w-14 h-14 object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-amber-100 to-[#f37023] bg-clip-text text-transparent">
                                    JP Store
                                </h3>
                                <p className="text-xs font-semibold text-[#f37023] uppercase tracking-wider">
                                    ઝડપી ઘર ડિલિવરી
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-300/90 leading-relaxed">
                            <span className="text-[#fbbf24] font-semibold">Kem Cho, Gundala!</span> Your trusted quick-commerce partner delivering premium phone cases, fast chargers, cables, audio gadgets, and electronic accessories straight to your doorstep with royal care.
                        </p>

                        <div className="pt-2">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-3">
                                Connect With Us
                            </span>
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#f37023] border border-white/10 hover:border-[#f37023] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200"
                                >
                                    <FaInstagram size={17} />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#f37023] border border-white/10 hover:border-[#f37023] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200"
                                >
                                    <FaLinkedinIn size={17} />
                                </a>
                                <a
                                    href="https://x.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#f37023] border border-white/10 hover:border-[#f37023] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200"
                                >
                                    <FaXTwitter size={17} />
                                </a>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#f37023] border border-white/10 hover:border-[#f37023] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200"
                                >
                                    <FaGithub size={17} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Categories Column (3 cols) */}
                    <div className="lg:col-span-3">
                        <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#f37023]"></span>
                            All Categories
                        </h4>

                        {/* Mobile Toggle */}
                        <div className="block md:hidden mb-3">
                            <button
                                onClick={() => setShowCategories(!showCategories)}
                                className="text-xs text-[#fbbf24] underline cursor-pointer"
                            >
                                {showCategories ? "Hide Categories" : "View All Categories"}
                            </button>
                        </div>

                        <div className={`${showCategories ? "block" : "hidden"} md:block`}>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                                <div className="space-y-2">
                                    {col1.map((cat, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => navigate(`/all-products-by-category/${cat._id}`)}
                                            className="text-xs text-gray-300 hover:text-[#fbbf24] hover:translate-x-1 cursor-pointer transition-all duration-200 truncate"
                                        >
                                            {cat.name}
                                        </div>
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    {col2.map((cat, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => navigate(`/all-products-by-category/${cat._id}`)}
                                            className="text-xs text-gray-300 hover:text-[#fbbf24] hover:translate-x-1 cursor-pointer transition-all duration-200 truncate"
                                        >
                                            {cat.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links (2 cols) */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#f37023]"></span>
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5 text-xs text-gray-300">
                            <li>
                                <span
                                    onClick={() => navigate("/")}
                                    className="hover:text-[#fbbf24] cursor-pointer transition-colors"
                                >
                                    Home
                                </span>
                            </li>
                            <li>
                                <span
                                    onClick={() => navigate("/cart")}
                                    className="hover:text-[#fbbf24] cursor-pointer transition-colors"
                                >
                                    My Cart
                                </span>
                            </li>
                            <li>
                                <span
                                    onClick={() => navigate("/dashboard/myorders")}
                                    className="hover:text-[#fbbf24] cursor-pointer transition-colors"
                                >
                                    Orders History
                                </span>
                            </li>
                            <li>
                                <span
                                    onClick={() => navigate("/dashboard/profile")}
                                    className="hover:text-[#fbbf24] cursor-pointer transition-colors"
                                >
                                    My Account
                                </span>
                            </li>
                            <li>
                                <span
                                    onClick={() => navigate("/dashboard/addresses")}
                                    className="hover:text-[#fbbf24] cursor-pointer transition-colors"
                                >
                                    Saved Addresses
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Gundala Shop Address & Contact (3 cols) */}
                    <div className="lg:col-span-3 space-y-3">
                        <h4 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#f37023]"></span>
                            Shop Address (Gundala)
                        </h4>
                        
                        <div className="space-y-3 text-xs text-gray-300">
                            <div className="flex items-start gap-2.5">
                                <FaMapMarkerAlt className="text-[#f37023] mt-0.5 shrink-0" size={14} />
                                <span>Gundala (jas), Taluka Vinchhiya, District Rajkot, Gujarat - 360055</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <FaPhoneAlt className="text-[#f37023] shrink-0" size={13} />
                                <span>+91 98765 43210 (7 AM - 11 PM)</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <FaEnvelope className="text-[#f37023] shrink-0" size={13} />
                                <span>support@jpstore.in</span>
                            </div>
                        </div>

                        {/* Royal Slogan Stamp */}
                        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-white/5 to-[#f37023]/10 border border-[#f37023]/20">
                            <p className="text-[11px] text-amber-200 font-medium leading-snug">
                                &ldquo;ગુજરાતનું પોતાનું મોબાઇલ અને ઇલેક્ટ્રોનિક્સ એસેસરીઝ સ્ટોર&rdquo;
                            </p>
                            <span className="text-[10px] text-gray-400 block mt-1">
                                Gujarat&apos;s very own mobile &amp; electronic accessories store
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="w-full border-t border-white/10 bg-black/30 py-5">
                <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
                    <p>© {new Date().getFullYear()} JP Store. All rights reserved. Crafted with pride for Gundala.</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="text-amber-200/90 font-medium">Safe & Secure Ordering</span>
                        <span>•</span>
                        <span>Razorpay Trusted</span>
                        <span>•</span>
                        <span>Instant Refund Guarantee</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
