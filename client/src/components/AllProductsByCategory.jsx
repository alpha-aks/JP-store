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
        <section className="lg:px-35 w-full mx-auto mt-3 h-full">
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
            
            {/* Empty Space */}
            <div className="border border-gray-300 h-17"></div>

            {/* Category name for md and sm screen */}
            <div className="fixed lg:hidden flex top-30 left-0 w-full bg-white z-10 shadow-md p-2">
                <span>
                    {allCategory.find((cat) => cat._id === categoryId)?.name || "Select a Category"}
                </span>
            </div>

            {/* Product List */}
            {
                loading ? (
                    <div className="flex justify-center items-center">
                                <span className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-green-500 rounded-full"></span>
                            </div>
                ) : (
                    <div className="border-1 border-gray-200 bg-[#F2F4FA]">
                        {loading ? (
                            <div className="flex justify-center items-center h-screen">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div className="p-3">
                                {productData.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                        {[...productData]
                                            .sort((a, b) => (a.stock === 0) - (b.stock === 0)) // Moves out-of-stock items to the end
                                            .map((product) => (
                                                <div
                                                    key={product._id}
                                                    className="relative hover:shadow-2xl hover:scale-105 transition duration-200"
                                                >
                                                    <ProductCardForProductListPage data={product} />
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 text-lg my-10">
                                        No products available in this category.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )
            }
        </section>
    );
}

export default AllProductsByCategory;
