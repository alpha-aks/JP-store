/* eslint-disable no-unused-vars */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { setAllCategory, setAllSubCategory } from "../store/productSlice";
import ProductCardForProductListPage from "../components/ProductCardForProductListPage";
import nothing_here_yet from "../assets/nothing_here_yet.webp";

function ProductList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categoryId, subCategoryId } = useParams();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    scrollToTop();

    // Redux store selectors
    const allCategory = useSelector((state) => state.product.allCategory) || [];
    const allSubCategory = useSelector((state) => state.product.allSubCategory) || [];

    // State
    const [filteredSubCategories, setFilteredSubCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProductsByCategory = async () => {
        setLoading(true);
        try {
            const response = await Axios({
                ...summaryApi.getProductByCategory,
                data: { id: categoryId },
            });

            const allProducts = response.data.data;

            // Filter products by subCategoryId
            const filteredProducts = allProducts.filter(product =>
                product.subCategory.some(subCat => subCat._id === subCategoryId)
            );

            setProducts(filteredProducts);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Ensure categories & subcategories are populated if user lands directly on this route
    useEffect(() => {
        if (!allCategory || allCategory.length === 0) {
            Axios(summaryApi.getCategory).then(res => {
                if (res.data?.success && res.data?.data) {
                    dispatch(setAllCategory(res.data.data));
                }
            }).catch(console.error);
        }
        if (!allSubCategory || allSubCategory.length === 0) {
            Axios(summaryApi.getSubCategory).then(res => {
                if (res.data?.success && res.data?.data) {
                    dispatch(setAllSubCategory(res.data.data));
                }
            }).catch(console.error);
        }
    }, [dispatch]);


    // Fetch subcategories when category changes
    useEffect(() => {
        if (categoryId && allSubCategory.length > 0) {
            const filtered = allSubCategory.filter((subCategory) =>
                subCategory.category.some((category) => category._id === categoryId)
            );
            setFilteredSubCategories(filtered);

            // Navigate only if subCategoryId is not present in the URL
            if (filtered.length > 0 && !subCategoryId) {
                navigate(`/products-list/${categoryId}/${filtered[0]._id}`);
            }
        }
    }, [categoryId, allSubCategory, subCategoryId]);


    // Fetch products when subcategory changes
    useEffect(() => {
        if (subCategoryId) {
            fetchProductsByCategory();
        }
    }, [subCategoryId, categoryId]);

    // const fetchProductsByCategory = async () => {
    //     try {
    //         const response = await Axios({
    //             ...summaryApi.getProductByCategory,
    //             data: { id: categoryId },
    //         });
    //         setProducts(response.data.data);
    //     } catch (error) {
    //         console.log(error);

    //     }
    // };

    return (
        <section className="w-full mx-auto h-full">
            {/* Sticky Category Section - Desktop & Mobile */}
            <div className="sticky top-28 lg:top-22 w-full bg-white z-20 shadow-sm border-b overflow-x-auto scrollbar-none py-1.5 px-3">
                <div className="w-full max-w-screen-xl mx-auto flex items-center justify-start lg:justify-center text-[#666666] gap-1.5 sm:gap-2">
                    {/* On mobile show all categories horizontally, on desktop show first 6 with More dropdown */}
                    {allCategory.map((category, idx) => {
                        const firstSubCategory = allSubCategory.find(subCategory =>
                            subCategory.category.some(cat => cat._id === category._id)
                        );
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
                                    navigate(`/products-list/${category._id}/${firstSubCategory?._id || ""}`);
                                    scrollToTop();
                                }}
                            >
                                {category.name}
                            </div>
                        );
                    })}

                    {/* Desktop More Dropdown */}
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
                                    {allCategory.slice(6).map((category) => {
                                        const firstSubCategory = allSubCategory.find(subCategory =>
                                            subCategory.category.some(cat => cat._id === category._id)
                                        );
                                        return (
                                            <button
                                                key={category._id}
                                                className="block px-4 py-2 w-full text-left text-sm hover:bg-amber-50 hover:text-[#f37023] transition-colors"
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    navigate(`/products-list/${category._id}/${firstSubCategory?._id || ""}`);
                                                    scrollToTop();
                                                    setIsDropdownOpen(false);
                                                }}
                                            >
                                                {category.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="h-screen mt-1 grid grid-cols-[90px_1fr] sm:grid-cols-[120px_1fr] md:grid-cols-[162px_1fr] lg:grid-cols-[240px_1fr]">
                {/* Left (SubCategory) */}
                <div className="h-[80vh] overflow-y-auto flex flex-col rounded-l border-r border-t border-b border-gray-200 bg-white no-scrollbar">
                    {filteredSubCategories.map((subCategory, index) => (
                        <div
                            key={subCategory._id}
                            className={`flex flex-col py-2.5 px-1 lg:py-3 lg:px-4 items-center justify-center cursor-pointer transition-colors ${
                                subCategoryId === subCategory._id
                                    ? "bg-amber-50/70 border-r-4 border-[#f37023] text-[#f37023]"
                                    : "hover:bg-gray-50 text-gray-600 border-r-4 border-transparent"
                            }`}
                            onClick={() => {
                                navigate(`/products-list/${categoryId}/${subCategory._id}`);
                                scrollToTop();
                            }}
                        >
                            <img
                                src={subCategory.image}
                                alt={subCategory.name}
                                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain"
                            />
                            <span
                                className={`text-[10px] sm:text-xs text-center w-full mt-1 line-clamp-2 leading-tight ${
                                    subCategoryId === subCategory._id ? "font-bold text-[#f37023]" : "font-medium"
                                }`}
                            >
                                {subCategory.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Right (Products By SubCategory) */}
                {
                    loading ? (
                        <div className="flex justify-center items-center h-[80vh] bg-[#F4F6FB]">
                            <span className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-[#f37023] rounded-full"></span>
                        </div>
                    ) : (
                        <div className="p-2 sm:p-3 overflow-y-scroll h-[80vh] bg-[#F4F6FB] no-scrollbar">
                            <div className="py-2 px-3 text-xs sm:text-sm w-full bg-white rounded-lg shadow-2xs flex items-center justify-between mb-2.5 border border-gray-100">
                                <h2 className="font-bold text-gray-800 truncate">
                                    Buy{" "}
                                    <span className="text-[#f37023]">
                                        {filteredSubCategories.find((sub) => sub._id === subCategoryId)?.name || "Products"}
                                    </span>{" "}
                                    online
                                </h2>
                                <span className="text-[11px] text-gray-500 font-medium shrink-0 ml-2">
                                    {products.length} {products.length === 1 ? 'item' : 'items'}
                                </span>
                            </div>
                            {products.length === 0 ? (
                                <div className="flex flex-col justify-center items-center py-16 text-center">
                                    <img src={nothing_here_yet} alt="No products available" className="w-48 h-48 object-contain" />
                                    <p className="text-lg font-bold text-gray-600 mt-2">No Products in this Category</p>
                                    <p className="text-xs text-gray-400">Please check other categories or subcategories.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5">
                                    {products
                                        .sort((a, b) => (a.stock === 0) - (b.stock === 0))
                                        .map((product, index) => (
                                            <div key={product._id || index} className="w-full min-w-0">
                                                <ProductCardForProductListPage data={product} />
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    )
                }
            </div>
        </section>
    );
}

export default ProductList;
