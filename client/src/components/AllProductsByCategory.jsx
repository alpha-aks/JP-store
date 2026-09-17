import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { setAllCategory } from "../store/productSlice";
import { FaAngleDown } from "react-icons/fa6";
import ProductCardForProductListPage from "./ProductCardForProductListPage";

function AllProductsByCategory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const allCategory = useSelector((state) => state.product.allCategory) || [];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const fetchProductsByCategory = async () => {
        if (!categoryId) return;

        try {
            setLoading(true);
            const response = await Axios({
                ...summaryApi.getProductByCategory,
                data: { id: categoryId },
            });

            if (response.data.success) {
                setProductData(response.data.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductsByCategory();
        scrollToTop();
    }, [categoryId]);

    useEffect(() => {
        if (!allCategory || allCategory.length === 0) {
            Axios(summaryApi.getCategory).then(res => {
                if (res.data?.success && res.data?.data) {
                    dispatch(setAllCategory(res.data.data));
                }
            }).catch(console.error);
        }
    }, [dispatch]);

    return (
        <section className="w-full mx-auto h-full">
            {/* Sticky Category Section - Desktop & Mobile */}
            <div className="sticky top-28 lg:top-22 w-full bg-white z-20 shadow-sm border-b overflow-x-auto scrollbar-none py-1.5 px-3">
                <div className="w-full max-w-screen-xl mx-auto flex items-center justify-start lg:justify-center text-[#666666] gap-1.5 sm:gap-2">
                    {allCategory.map((category, idx) => {
                        const isSelected = categoryId === category._id;
                        const isHiddenOnDesktop = idx >= 6;

                        return (
                            <div
                                key={category._id}
                                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-all shrink-0 ${
                                    isHiddenOnDesktop ? "lg:hidden" : ""
                                } ${
                                    isSelected 
                                        ? "bg-[#f37023] text-white shadow-sm" 
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                }`}
                                onClick={() => {
                                    navigate(`/all-products-by-category/${category._id}`);
                                    scrollToTop();
                                }}
                            >
                                {category.name}
                            </div>
                        );
                    })}

                    {allCategory.length > 6 && (
                        <div className="relative hidden lg:block">
                            <button
                                className={`px-3 py-1.5 flex items-center justify-center gap-1 text-sm font-semibold rounded-full ${
                                    isDropdownOpen ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200"
                                } text-gray-700 transition duration-200 cursor-pointer`}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                            >
                                More <FaAngleDown />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute top-full right-0 bg-white shadow-lg border rounded-xl mt-1 w-48 overflow-y-auto max-h-[60vh] z-30">
                                    {allCategory.slice(6).map((category) => (
                                        <button
                                            key={category._id}
                                            className="block px-4 py-2 w-full text-left text-sm hover:bg-amber-50 hover:text-[#f37023] transition-colors"
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                navigate(`/all-products-by-category/${category._id}`);
                                                scrollToTop();
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            
            {/* Category header for all screens */}
            <div className="px-3 py-2.5 sm:py-3 bg-white border-b border-gray-200 flex items-center justify-between">
                <h1 className="text-sm sm:text-base md:text-lg font-bold text-[#0c286e] flex items-center gap-1.5 sm:gap-2">
                    <span className="text-[#f37023]">✦</span>
                    <span>{allCategory.find((cat) => cat._id === categoryId)?.name || "All Products"}</span>
                </h1>
                <span className="text-xs text-gray-500 font-medium">
                    {productData.length} {productData.length === 1 ? 'Product' : 'Products'}
                </span>
            </div>

            {/* Product List */}
            {
                loading ? (
                    <div className="flex justify-center items-center py-20">
                        <span className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-[#f37023] rounded-full"></span>
                    </div>
                ) : (
                    <div className="border-t border-gray-100 bg-[#F4F6FB] min-h-[60vh]">
                        <div className="p-2 sm:p-3 md:p-4 max-w-screen-xl mx-auto">
                            {productData.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                                    {[...productData]
                                        .sort((a, b) => (a.stock === 0) - (b.stock === 0)) // Moves out-of-stock items to the end
                                        .map((product) => (
                                            <div
                                                key={product._id}
                                                className="w-full min-w-0"
                                            >
                                                <ProductCardForProductListPage data={product} />
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 text-sm sm:text-base my-16">
                                    No products available in this category.
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </section>
    );
}

export default AllProductsByCategory;
