/* eslint-disable react/prop-types */
import { CiStopwatch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { validURLConvertor } from "../utils/validURLConvertor";
import disscountBannerSVG from "../assets/disscountBanner.svg";
import AddToCartButton from "./AddToCartButton";

function ProductCard({data}) {

    const formattedUnit = /^\d+$/.test(data?.unit) ? `${data.unit} Unit` : data.unit;
    const url = `products-list/${validURLConvertor(data.name)}-${data._id}`;

    return (
        <Link 
            to={url} 
            className='border p-2 sm:p-3 lg:p-4 flex flex-col justify-between min-w-[135px] max-w-[170px] sm:min-w-44 sm:max-w-52 lg:min-w-56 rounded-xl cursor-pointer bg-white border-gray-200 relative shadow-2xs hover:shadow-md transition-shadow shrink-0 overflow-hidden min-w-0'
        >
            {
                data.discount > 0 && (
                    <div className="absolute left-1.5 top-1.5 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center z-10">
                        <img src={disscountBannerSVG} alt="discount" className="w-full h-full absolute"/>
                        <div className="absolute flex flex-col items-center justify-center text-white text-[8px] sm:text-[9px] font-bold leading-none">
                            <span>{data.discount}%</span>
                            <span>OFF</span>
                        </div>
                    </div>
                )
            }

            <div className='h-24 sm:h-28 md:h-32 lg:h-36 w-full rounded-lg overflow-hidden flex items-center justify-center bg-gray-50/50 relative'>
                <img 
                    src={data.image[0]} 
                    alt={data.name}
                    className="w-full h-full object-contain p-1.5 transition-transform duration-200 hover:scale-105"
                    loading="lazy"
                />
            </div>

            <div className='px-1.5 py-0.5 rounded w-fit flex bg-[#F8F8F8] items-center justify-center gap-1 mt-1.5'>
                <CiStopwatch size={12} className="text-gray-600"/> 
                <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700">8 MINS</span>
            </div>

            <div className='line-clamp-2 font-semibold text-xs sm:text-sm text-gray-900 break-words leading-tight min-w-0 my-1'>
                {data.name}
            </div>

            <div className='text-[10px] sm:text-[11px] text-[#6B6666] truncate mb-1'>
                {formattedUnit}
            </div>

            <div className='flex items-end justify-between gap-1 w-full min-w-0 mt-auto pt-1.5 border-t border-gray-100'>
                <div className="flex flex-col min-w-0 shrink">
                    {
                        data.discount > 0 ? (
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
                        )
                    }
                </div>
                <div className="shrink-0">
                    <AddToCartButton data={data}/>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard