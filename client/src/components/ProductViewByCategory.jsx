/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { useEffect, useState, useRef } from "react";
import CardLoadingSkeleton from "./CardLoadingSkeleton";
import ProductCard from "./ProductCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function ProductViewByCategory({ id, name }) {

    // console.log(id);

    const [data, setData] = useState(() => {
        if (!id) return [];
        try {
            const cached = localStorage.getItem(`jp_cached_products_${id}`);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.warn("Error reading cached products:", e);
        }
        return [];
    });
    const [loading, setLoading] = useState(false);

    const containerRef = useRef(null); // Reference for scrolling container

    const loadingCardNumber = new Array(5).fill(null);

    const fetchProductsByCategory = async (retryCount = 0) => {
        try {
            // Only show loading spinner/skeleton if we don't already have cached data
            if (!data || data.length === 0) {
                setLoading(true);
            }
            const response = await Axios({
                ...summaryApi.getProductByCategory,
                data: {
                    id,
                },
            });
            const products = response.data?.data || [];
            setData(products);
            try {
                localStorage.setItem(`jp_cached_products_${id}`, JSON.stringify(products));
            } catch (e) {
                console.warn("Could not cache products to localStorage:", e);
            }
        } catch (error) {
            console.error("Error fetching category products:", error);
            // Standalone PWA / WebAPK retry mechanism
            if (retryCount < 2) {
                setTimeout(() => {
                    fetchProductsByCategory(retryCount + 1);
                }, 1500);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProductsByCategory();
        }
    }, [id]);

    // Scroll Left Function
    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -600, behavior: "smooth" });
        }
    };

    // Scroll Right Function
    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 600, behavior: "smooth" });
        }
    };

    const inStockProducts = (data || []).filter(product => product.stock !== 0);

    // Hide entire category section if there are no in-stock products and not loading
    if (!loading && inStockProducts.length === 0) {
        return null;
    }

    return (
        <div className="w-full">
            <div className="mx-auto flex justify-between items-center mb-3">
                <h2 className="font-bold text-lg text-[#0c286e] flex items-center gap-2">
                    <span className="text-[#f37023]">✦</span>
                    <span>{name}</span>
                </h2>
                <Link 
                    to={`/all-products-by-category/${id}`} 
                    state={{ categoryId: id }} 
                    className="text-[#f37023] hover:text-[#d45811] text-sm sm:text-base font-bold flex items-center gap-1 transition-colors group"
                >
                    <span>See All</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
            </div>

            <div className="relative w-full group/carousel">
                {/* Left Arrow Button (Desktop only) */}
                <button 
                    onClick={scrollLeft} 
                    className="hidden md:flex absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-amber-50 text-gray-700 hover:text-[#f37023] z-10 border border-gray-200 cursor-pointer transition-all duration-200 hover:scale-105"
                    aria-label="Scroll left"
                >
                    <FaAngleLeft size={16} />
                </button>

                {/* Product List - Touch scrollable on mobile */}
                <div 
                    ref={containerRef} 
                    className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-3 sm:py-4 overflow-x-auto scrollbar-none scroll-smooth w-full px-1"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    {loading &&
                        loadingCardNumber.map((_, index) => (
                            <CardLoadingSkeleton key={index} />
                        ))
                    }
                    {data
                        .filter(product => product.stock !== 0) // Exclude out-of-stock products
                        .slice(0, 15)
                        .map((product, index) => (
                            <ProductCard data={product} key={index} />
                        ))
                    }
                </div>

                {/* Right Arrow Button (Desktop only) */}
                <button 
                    onClick={scrollRight} 
                    className="hidden md:flex absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-amber-50 text-gray-700 hover:text-[#f37023] z-10 border border-gray-200 cursor-pointer transition-all duration-200 hover:scale-105"
                    aria-label="Scroll right"
                >
                    <FaAngleRight size={16} />
                </button>
            </div>
        </div>
    );
}

export default ProductViewByCategory;
