import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { CiStopwatch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight, FaCaretDown, FaCaretRight, FaCaretUp } from "react-icons/fa";
import minute_delivery from "../assets/minute_delivery.png";
import Best_Prices_Offers from "../assets/Best_Prices_Offers.png"
import Wide_Assortment from "../assets/Wide_Assortment.png"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import AddToCartButton from "../components/AddToCartButton";

function ProductDetails() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    useEffect(() => {
        scrollToTop();
    }, []);


    const params = useParams();
    let productId = params?.product.split("-").pop();

    const navigate = useNavigate();

    const containerRef = useRef(null);

    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showMoreDetails, setShowMoreDetails] = useState(false);

    const formattedUnit = /^\d+$/.test(productData?.unit) ? `${productData?.unit} Unit` : productData?.unit;

    const firstDetail = productData?.more_details
        ? Object.entries(productData.more_details)[0]
        : null;

    // Scroll Left Function
    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -100, behavior: "smooth" });
        }
    };

    // Scroll Right Function
    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 100, behavior: "smooth" });
        }
    };

    const fetchProductData = async () => {
        try {
            const response = await Axios({
                ...summaryApi.getProductById,
                data: { id: productId },
            });
            // console.log("response: ", response);

            if (response.data.success) {
                setProductData(response.data.data);
                setImages(response.data.data.image);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRedirectToProductList = (categoryId, subCategoryId) => {
        navigate(`/products-list/${categoryId}/${subCategoryId}`, { state: { categoryId, subCategoryId } });

    }

    // Set selectedImage once images array is updated
    useEffect(() => {
        if (images.length > 0) {
            setSelectedImage(images[0]);
        }
    }, [images]);

    useEffect(() => {
        fetchProductData();
        // console.log(productData);
    }, []);

    return (
        <div className="w-full bg-white">
            {/* lg and above screen */}
            <div className="hidden lg:grid lg:grid-cols-2 w-full max-w-7xl lg:px-8 mb-8 mx-auto gap-8">
                {/* Left Section: Image & Description */}
                <div className="flex flex-col border-r border-gray-100 pr-6">
                    <div className="min-h-[70vh] flex flex-col gap-4 justify-center items-center bg-white p-4">
                        {loading ? (
                            <div className="w-96 h-96 flex justify-center items-center">
                                <span className="animate-spin w-10 h-10 border-4 border-gray-200 border-t-[#f37023] rounded-full"></span>
                            </div>
                        ) : (
                            selectedImage && (
                                <div className="w-full h-[420px] flex items-center justify-center bg-gray-50/40 rounded-2xl p-4 border border-gray-100 overflow-hidden">
                                    <img
                                        src={selectedImage}
                                        alt={productData?.name || "Product"}
                                        className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                            )
                        )}
                        {/* Other images / Thumbnails */}
                        {images.length > 1 && (
                            <div className="relative w-full flex items-center justify-center mt-2">
                                <div className="flex items-center gap-3 w-full max-w-md justify-center">
                                    {/* Left Arrow */}
                                    {images.length > 4 && (
                                        <button
                                            onClick={scrollLeft}
                                            className="bg-white hover:bg-orange-50 text-gray-700 hover:text-[#f37023] p-2 rounded-full shadow-md border border-gray-200 hover:border-[#f37023]/50 transition-all active:scale-95 cursor-pointer shrink-0"
                                            aria-label="Previous images"
                                        >
                                            <FaAngleLeft size={14} />
                                        </button>
                                    )}

                                    {/* Thumbnails */}
                                    <div
                                        ref={containerRef}
                                        className="flex gap-2.5 p-1 overflow-x-auto scroll-smooth no-scrollbar"
                                    >
                                        {images.map((image, index) => (
                                            <div
                                                key={index}
                                                className={`w-18 h-18 rounded-xl cursor-pointer p-1 transition-all duration-200 shrink-0 bg-white ${
                                                    selectedImage === image 
                                                        ? "border-2 border-[#f37023] ring-2 ring-[#f37023]/25 shadow-xs scale-105" 
                                                        : "border border-gray-200 hover:border-[#f37023]/50 opacity-70 hover:opacity-100"
                                                }`}
                                                onClick={() => setSelectedImage(image)}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Right Arrow */}
                                    {images.length > 4 && (
                                        <button
                                            onClick={scrollRight}
                                            className="bg-white hover:bg-orange-50 text-gray-700 hover:text-[#f37023] p-2 rounded-full shadow-md border border-gray-200 hover:border-[#f37023]/50 transition-all active:scale-95 cursor-pointer shrink-0"
                                            aria-label="Next images"
                                        >
                                            <FaAngleRight size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description (Desktop) - Always prominently shown */}
                    {productData?.description && (
                        <div className="mt-6 p-5 bg-white rounded-2xl border border-gray-200/90 shadow-2xs">
                            <h2 className="text-base font-bold text-[#0c286e] flex items-center gap-2 mb-3">
                                <span className="text-[#f37023]">✦</span>
                                <span>Product Description</span>
                            </h2>
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                {productData.description}
                            </p>
                        </div>
                    )}

                    {/* Specifications / More Details (Desktop) */}
                    {productData?.more_details && Object.keys(productData.more_details).length > 0 && (
                        <div className="mt-4 p-5 bg-white rounded-2xl border border-gray-200/90 shadow-2xs">
                            <h2 className="text-base font-bold text-[#0c286e] flex items-center gap-2 mb-3">
                                <span className="text-[#f37023]">✦</span>
                                <span>Key Specifications</span>
                            </h2>
                            <div className="grid grid-cols-1 gap-2.5">
                                {Object.entries(productData.more_details).map(([key, value], index) => (
                                    <div key={index} className="flex justify-between items-center py-2 px-3 rounded-lg bg-gray-50/70 border border-gray-100 text-xs sm:text-sm">
                                        <span className="font-semibold text-gray-600 capitalize">{key}</span>
                                        <span className="font-medium text-gray-900 text-right">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Section: Purchase Details (Sticky) */}
                <div className="flex flex-col w-full h-full bg-white">
                    <div className="sticky top-24 pt-6 pb-12 bg-white px-4 lg:px-6">
                        {/* Breadcrumb & Title */}
                        <div className="border-b border-gray-100 pb-5">
                            {/* Breadcrumb */}
                            <div className="text-xs text-gray-500 line-clamp-1 mb-2">
                                <Link to={"/"} className="hover:text-[#f37023] font-medium transition-colors">Home</Link>
                                <span className="mx-1.5">/</span>
                                {productData?.category?.[0] && (
                                    <>
                                        <span
                                            className="hover:text-[#f37023] font-medium cursor-pointer transition-colors"
                                            onClick={() => handleRedirectToProductList(productData?.category[0]._id, productData?.subCategory?.[0]?._id)}
                                        >
                                            {productData?.category[0].name}
                                        </span>
                                        <span className="mx-1.5">/</span>
                                    </>
                                )}
                                <span className="text-gray-800 font-medium">{productData?.name}</span>
                            </div>

                            {/* Product Title */}
                            <h1 className="text-2xl xl:text-3xl font-bold text-[#0c286e] leading-snug">
                                {productData?.name}
                            </h1>

                            {/* Delivery Time & Similar Category */}
                            <div className="flex items-center gap-3 mt-3 flex-wrap">
                                <div className="px-3 py-1 rounded-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-[#0c286e] font-semibold text-xs shadow-2xs">
                                    <CiStopwatch size={14} className="text-[#f37023]" /> 
                                    <span>8 MINS DELIVERY</span>
                                </div>

                                {productData?.category?.[0] && (
                                    <div
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-[#f37023] bg-orange-50/80 hover:bg-[#f37023] hover:text-white border border-orange-200/70 transition-all duration-200 cursor-pointer group shadow-2xs"
                                        onClick={() => handleRedirectToProductList(productData?.category[0]._id, productData?.subCategory?.[0]?._id)}
                                    >
                                        <span>View similar products</span>
                                        <FaCaretRight className="transition-transform group-hover:translate-x-0.5" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Price & Action Section */}
                        <div className="my-6 p-5 rounded-2xl bg-gradient-to-b from-orange-50/20 via-white to-white border border-orange-100 shadow-xs">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex flex-col">
                                    <span className="text-xs font-semibold text-gray-500 mb-1">{formattedUnit}</span>
                                    {productData?.stock === 0 ? (
                                        <span className="text-lg font-bold text-red-500">Out of Stock</span>
                                    ) : productData?.discount > 0 ? (
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl xl:text-3xl font-black text-gray-900">
                                                &#8377;{(productData?.price - (productData?.price * productData?.discount / 100)).toFixed(2)}
                                            </span>
                                            <span className="text-sm font-semibold line-through text-gray-400">
                                                &#8377;{productData?.price}
                                            </span>
                                            <span className="text-white px-2 py-0.5 rounded-md bg-gradient-to-r from-[#f37023] to-[#ff8c42] font-bold text-xs shadow-2xs">
                                                {`${productData?.discount}% OFF`}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-sm text-gray-500 font-medium">MRP</span>
                                            <span className="text-2xl xl:text-3xl font-black text-gray-900">&#8377;{productData?.price}</span>
                                        </div>
                                    )}
                                    <span className="text-[11px] text-gray-400 mt-0.5">(Inclusive of all taxes)</span>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="shrink-0">
                                    <AddToCartButton data={productData || ""} />
                                </div>
                            </div>
                        </div>

                        {/* Why Shop from JP Store */}
                        <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
                            <h3 className="font-bold text-sm text-[#0c286e] mb-3 flex items-center gap-1.5">
                                <span className="text-[#f37023]">✦</span>
                                <span>Why shop from JP Store?</span>
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-orange-50/40 border border-orange-100">
                                    <img src={minute_delivery} alt="Fast Delivery" className="w-10 h-10 object-contain shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-800">Superfast Local Delivery</span>
                                        <span className="text-[11px] text-gray-500">Delivered within minutes in Gundala, Jasdan & nearby</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/40 border border-amber-100">
                                    <img src={Best_Prices_Offers} alt="Best Prices" className="w-10 h-10 object-contain shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-800">100% Genuine Sealed Products</span>
                                        <span className="text-[11px] text-gray-500">Directly sourced brand items with warranty support</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-50/40 border border-blue-100">
                                    <img src={Wide_Assortment} alt="Secure Delivery" className="w-10 h-10 object-contain shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-800">Verified OTP Handover</span>
                                        <span className="text-[11px] text-gray-500">Secure contactless doorstep delivery confirmation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile / Tablet Screen (< lg) */}
            <div className="w-full mx-auto block lg:hidden pb-10">
                {/* Image Section */}
                <div className="w-full bg-white flex justify-center border-b border-gray-100">
                    {loading ? (
                        <div className="w-full h-80 flex justify-center items-center">
                            <span className="animate-spin w-10 h-10 border-4 border-gray-200 border-t-[#f37023] rounded-full"></span>
                        </div>
                    ) : (
                        <Swiper
                            modules={[Pagination]}
                            pagination={{ clickable: true }}
                            loop={images?.length > 1}
                            className="w-full h-80 sm:h-96 bg-white flex justify-center items-center"
                        >
                            {images?.map((img, index) => (
                                <SwiperSlide key={index} className="flex justify-center items-center p-4 bg-white">
                                    <img 
                                        src={img} 
                                        alt={`Slide ${index + 1}`} 
                                        className="w-full h-full object-contain max-h-72" 
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>

                {/* Product Details Section */}
                <div className="px-4 pt-4">
                    {/* Title */}
                    <h1 className="text-xl sm:text-2xl font-bold text-[#0c286e] leading-snug">
                        {productData?.name}
                    </h1>

                    {/* Time & View similar */}
                    <div className="flex items-center gap-2.5 mt-2.5 flex-wrap">
                        <div className="px-2.5 py-0.5 rounded-full flex items-center justify-center gap-1 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-[#0c286e] font-semibold text-[11px] shadow-2xs">
                            <CiStopwatch size={12} className="text-[#f37023]" /> 
                            <span>8 MINS</span>
                        </div>

                        {productData?.category?.[0] && (
                            <div
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#f37023] bg-orange-50/80 hover:bg-[#f37023] hover:text-white border border-orange-200/70 transition-all cursor-pointer group shadow-2xs"
                                onClick={() => handleRedirectToProductList(productData?.category[0]._id, productData?.subCategory?.[0]?._id)}
                            >
                                <span>View similar</span>
                                <FaCaretRight size={10} />
                            </div>
                        )}
                    </div>

                    {/* Price and Add Button Card */}
                    <div className="my-4 p-4 rounded-xl bg-white border border-gray-200 shadow-2xs flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                            <span className="text-[11px] font-semibold text-gray-500 leading-tight mb-0.5">{formattedUnit}</span>
                            {productData?.stock === 0 ? (
                                <span className="text-sm font-bold text-red-500">Out of Stock</span>
                            ) : productData?.discount > 0 ? (
                                <div className="flex flex-col">
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-lg sm:text-xl font-black text-gray-900">
                                            &#8377;{(productData?.price - (productData?.price * productData?.discount / 100)).toFixed(2)}
                                        </span>
                                        <span className="text-xs font-semibold line-through text-gray-400">
                                            &#8377;{productData?.price}
                                        </span>
                                    </div>
                                    <span className="w-fit mt-0.5 text-white px-1.5 py-0.2 rounded bg-gradient-to-r from-[#f37023] to-[#ff8c42] font-bold text-[10px]">
                                        {`${productData?.discount}% OFF`}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-lg sm:text-xl font-black text-gray-900">&#8377;{productData?.price}</span>
                            )}
                            <span className="text-[10px] text-gray-400 mt-0.5">(Inclusive of all taxes)</span>
                        </div>

                        {/* Add Button */}
                        <div className="shrink-0">
                            <AddToCartButton data={productData || ""} />
                        </div>
                    </div>

                    {/* Description (Mobile) - Prominently Displayed */}
                    {productData?.description && (
                        <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-2xs">
                            <h2 className="text-sm sm:text-base font-bold text-[#0c286e] flex items-center gap-1.5 mb-2">
                                <span className="text-[#f37023]">✦</span>
                                <span>Product Description</span>
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                {productData.description}
                            </p>
                        </div>
                    )}

                    {/* Specifications (Mobile) */}
                    {productData?.more_details && Object.keys(productData.more_details).length > 0 && (
                        <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4 shadow-2xs mb-5">
                            <h2 className="text-sm sm:text-base font-bold text-[#0c286e] flex items-center gap-1.5 mb-3">
                                <span className="text-[#f37023]">✦</span>
                                <span>Product Specifications</span>
                            </h2>

                            <div className="flex flex-col gap-2">
                                {/* First Detail always shown */}
                                {firstDetail && (
                                    <div className="flex justify-between items-center py-1.5 px-2.5 rounded-lg bg-gray-50 text-xs">
                                        <span className="font-semibold text-gray-600 capitalize">{firstDetail[0]}</span>
                                        <span className="font-medium text-gray-900 text-right">{firstDetail[1]}</span>
                                    </div>
                                )}

                                {!showMoreDetails ? (
                                    Object.keys(productData.more_details).length > 1 && (
                                        <button
                                            className="mt-2 py-1.5 px-3 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-200/80 text-[#f37023] font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-2xs cursor-pointer"
                                            onClick={() => setShowMoreDetails(true)}
                                        >
                                            <span>View More Specifications ({Object.keys(productData.more_details).length - 1} more)</span>
                                            <FaCaretDown />
                                        </button>
                                    )
                                ) : (
                                    <>
                                        {Object.entries(productData.more_details)
                                            .slice(1)
                                            .map(([key, value], index) => (
                                                <div key={index} className="flex justify-between items-center py-1.5 px-2.5 rounded-lg bg-gray-50 text-xs">
                                                    <span className="font-semibold text-gray-600 capitalize">{key}</span>
                                                    <span className="font-medium text-gray-900 text-right">{value}</span>
                                                </div>
                                            ))
                                        }
                                        <button
                                            className="mt-2 py-1.5 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                                            onClick={() => setShowMoreDetails(false)}
                                        >
                                            <span>View Less</span>
                                            <FaCaretUp />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Why shop from JP Store (Mobile) */}
                    <div className="mt-4 p-4 rounded-xl bg-white border border-gray-200 shadow-2xs mb-6">
                        <h3 className="font-bold text-xs sm:text-sm text-[#0c286e] mb-2.5 flex items-center gap-1.5">
                            <span className="text-[#f37023]">✦</span>
                            <span>Why shop from JP Store?</span>
                        </h3>
                        <div className="space-y-2.5">
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-orange-50/40 border border-orange-100">
                                <img src={minute_delivery} alt="Delivery" className="w-8 h-8 object-contain shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-gray-800">Superfast Local Delivery</span>
                                    <span className="text-[10px] text-gray-500">Delivered within minutes in Gundala & Jasdan</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-amber-50/40 border border-amber-100">
                                <img src={Best_Prices_Offers} alt="Authentic" className="w-8 h-8 object-contain shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-gray-800">100% Genuine Sealed Items</span>
                                    <span className="text-[10px] text-gray-500">Original brand warranty support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
