/* eslint-disable react/prop-types */
import { CiStopwatch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { validURLConvertor } from "../utils/validURLConvertor";
import disscountBannerSVG from "../assets/disscountBanner.svg";
import AddToCartButton from "./AddToCartButton";
import { ensureHttps } from "../utils/imageUrl";

function ProductCardForProductListPage({ data }) {

    const formattedUnit = /^\d+$/.test(data?.unit) ? `${data.unit} Unit` : data.unit;
    const url = `/products-list/${validURLConvertor(data?.name || "product")}-${data?._id}`;
    const productImg = ensureHttps(data?.image?.[0]);

    return (
        <Link 
            to={url} 
            className="border p-2 sm:p-2.5 md:p-3 flex flex-col justify-between h-full w-full min-w-0 rounded-xl cursor-pointer bg-white border-gray-200 relative shadow-2xs hover:shadow-md transition-shadow overflow-hidden text-xs"
        >
            {data.stock === 0 && (
                <div className="z-30 absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px] text-white text-[11px] font-bold rounded-xl">
                    <span className="bg-gray-700/90 px-2 py-0.5 rounded-full text-xs font-semibold shadow">Out of Stock</span>
                </div>
            )}
            {data.discount > 0 && (
                <div className="absolute left-1.5 top-1.5 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center z-10">
                    <img src={disscountBannerSVG} alt="discount" className="w-full h-full absolute" />
                    <div className="absolute flex flex-col items-center justify-center text-white text-[8px] sm:text-[9px] font-bold leading-none">
                        <span>{data.discount}%</span>
                        <span>OFF</span>
                    </div>
                </div>
            )}

            {/* Product Image */}
            <div className="w-full h-24 sm:h-28 md:h-36 lg:h-40 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50/60 relative">
                <img 
                    src={productImg} 
                    alt={data.name} 
                    className="w-full h-full object-contain p-1.5 transition-transform duration-200 hover:scale-105" 
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/favicon.png";
                    }}
                />
            </div>

            {/* Delivery Time Badge */}
            <div className="px-1.5 py-0.5 rounded w-fit flex bg-[#F8F8F8] items-center justify-center gap-1 mt-1.5">
                <CiStopwatch size={12} className="text-gray-600" /> 
                <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700">8 MINS</span>
            </div>

            {/* Product Name */}
            <div className="line-clamp-2 font-semibold text-xs sm:text-sm text-gray-900 break-words leading-tight min-w-0 my-1">
                {data.name}
            </div>

            {/* Unit Info */}
            <div className="text-[10px] sm:text-[11px] text-[#6B6666] truncate mb-1.5">
                {formattedUnit}
            </div>

            {/* Price and Add to Cart Button */}
            <div className="flex items-end justify-between gap-1 w-full min-w-0 mt-auto pt-1.5 border-t border-gray-100">
                <div className="flex flex-col min-w-0 shrink">
                    {data.discount > 0 ? (
                        <div className="flex flex-col leading-none">
                            <span className="text-[9px] sm:text-[10px] font-medium line-through text-gray-400">
                                &#8377;{data.price}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-gray-900 truncate mt-0.5">
                                &#8377;{Number((data.price - (data.price * data.discount / 100)).toFixed(2))}
                            </span>
                        </div>
                    ) : (
                        <span className="text-xs sm:text-sm font-bold text-gray-900 truncate leading-tight">&#8377;{data.price}</span>
                    )}
                </div>

                {data.stock !== 0 && (
                    <div className="shrink-0">
                        <AddToCartButton data={data} />
                    </div>
                )}
            </div>
        </Link>
    );
}

export default ProductCardForProductListPage;
