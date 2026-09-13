/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductViewByCategory from "../components/ProductViewByCategory";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { setAllCategory, setAllSubCategory } from "../store/productSlice";

function Home() {
    const dispatch = useDispatch();
    const loadingCategory = useSelector(state => state.product.loadingCategory);
    const allCategory = useSelector(state => state.product.allCategory);
    const allSubCategory = useSelector(state => state.product.allSubCategory);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoriesAndSub = async () => {
            try {
                const [catRes, subCatRes] = await Promise.all([
                    Axios(summaryApi.getCategory),
                    Axios(summaryApi.getSubCategory)
                ]);
                if (catRes.data.success) dispatch(setAllCategory(catRes.data.data));
                if (subCatRes.data.success) dispatch(setAllSubCategory(subCatRes.data.data));
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategoriesAndSub();
    }, [dispatch]);

    const handleRedirectToProductList = (categoryId, categoryName) => {
        const filteredSubCategories = allSubCategory?.filter(subCategory =>
            subCategory.category?.some(cat => cat._id === categoryId)
        );
        let subCategoryId = filteredSubCategories?.[0]?._id;
        if (subCategoryId) {
            navigate(`/products-list/${categoryId}/${subCategoryId}`, { state: { categoryId, subCategoryId } });
        } else {
            navigate(`/all-products-by-category/${categoryId}`, { state: { categoryId } });
        }
    };

    return (
        <div className="w-full">
            {/* Hero Promo Banner - Edge to Edge of the white page canvas */}
            <div className="w-full overflow-hidden border-b border-gray-100 shadow-sm">
                <img
                    src="/banner.png"
                    alt="Kem Cho, Ahmedabad! Premium Mobile & Electronic Accessories - JP Store"
                    className="w-full h-auto min-h-[180px] object-cover object-center block cursor-pointer hover:opacity-98 transition-opacity"
                />
            </div>

            <section className="px-4 sm:px-6 w-full mx-auto pb-8">
                {/* Category Section */}
                <div className="w-full max-w-[1320px] mx-auto my-6">
                    {/* Traditional Section Header */}
                    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
                        <div className="h-[2px] flex-1 max-w-[80px] sm:max-w-[160px] bg-gradient-to-r from-transparent via-amber-400 to-[#f37023]"></div>
                        <div className="flex items-center gap-2 px-3 sm:px-5 py-1.5 bg-gradient-to-r from-amber-50 via-white to-orange-50 rounded-full border border-amber-300 shadow-sm">
                            <span className="text-[#f37023] text-xs sm:text-sm">✦</span>
                            <h2 className="text-sm sm:text-base md:text-lg font-bold text-[#0c286e] flex items-center gap-1.5 sm:gap-2">
                                <span className="font-serif text-amber-800 hidden sm:inline">શ્રેણીઓ અનુસાર ખરીદી</span>
                                <span className="text-amber-400 font-normal hidden sm:inline">|</span>
                                <span className="text-[#f37023] tracking-wide">Shop By Category</span>
                            </h2>
                            <span className="text-[#f37023] text-xs sm:text-sm">✦</span>
                        </div>
                        <div className="h-[2px] flex-1 max-w-[80px] sm:max-w-[160px] bg-gradient-to-l from-transparent via-amber-400 to-[#f37023]"></div>
                    </div>

                    {/* Jharokha / Royal Window Category Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2.5 sm:gap-3 md:gap-4 justify-center">
                        {loadingCategory ? (
                            new Array(10).fill(null).map((_, index) => (
                                <div
                                    key={index}
                                    className="w-full aspect-[4/5] sm:aspect-[3/4] rounded-t-[28px] sm:rounded-t-[38px] rounded-b-xl border border-amber-200/70 bg-gradient-to-b from-amber-50/40 via-white to-orange-50/30 p-2 flex flex-col justify-between animate-pulse shadow-sm"
                                >
                                    <div className="w-8 h-2 mx-auto bg-amber-200/70 rounded-full mb-1"></div>
                                    <div className="flex-1 w-full bg-amber-100/50 rounded-lg mx-auto my-1"></div>
                                    <div className="h-4 w-full bg-amber-200/60 rounded"></div>
                                </div>
                            ))
                        ) : (
                            allCategory.map((category, index) => (
                                <div
                                    key={category._id || index}
                                    className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
                                    onClick={() => handleRedirectToProductList(category._id, category.name)}
                                >
                                    {/* Traditional Jharokha / Royal Arched Window Frame */}
                                    <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] flex flex-col items-center justify-between rounded-t-[30px] sm:rounded-t-[38px] rounded-b-xl border-2 border-amber-300/80 bg-gradient-to-b from-[#fffbf4] via-[#ffffff] to-[#fff6ec] shadow-sm group-hover:shadow-[0_10px_22px_-4px_rgba(243,112,35,0.28)] group-hover:border-[#f37023] transition-all duration-300 overflow-hidden p-1.5 sm:p-2">
                                        
                                        {/* Subtle inner decorative arch border */}
                                        <div className="absolute inset-[3px] rounded-t-[26px] sm:rounded-t-[34px] rounded-b-lg border border-amber-200/40 pointer-events-none group-hover:border-[#f37023]/25 transition-colors"></div>

                                        {/* Traditional Jharokha Arch Crest / Finial */}
                                        <div className="w-full flex flex-col items-center pt-0.5 z-10">
                                            <svg className="w-7 sm:w-9 h-2.5 sm:h-3 text-amber-500 group-hover:text-[#f37023] transition-colors duration-300" viewBox="0 0 40 12" fill="none">
                                                <path d="M20 1 C21 3, 23 4.5, 27 5 C32 5.5, 37 8, 40 12 L0 12 C3 8, 8 5.5, 13 5 C17 4.5, 19 3, 20 1 Z" fill="currentColor" fillOpacity="0.85"/>
                                                <circle cx="20" cy="2.5" r="1.2" fill="#f37023" />
                                            </svg>
                                        </div>

                                        {/* Palace Window Alcove with Category Image */}
                                        <div className="relative flex-1 w-full flex items-center justify-center my-0.5 overflow-hidden z-10">
                                            {/* Soft radial glow in alcove */}
                                            <div className="absolute inset-1 rounded-full bg-gradient-to-b from-amber-100/50 via-orange-50/20 to-transparent scale-90 group-hover:scale-110 transition-transform duration-300"></div>
                                            <img
                                                src={category.image}
                                                alt={category.name || `Category ${index}`}
                                                className="relative z-10 w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_3px_5px_rgba(0,0,0,0.08)]"
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Traditional Window Sill / Pedestal Base */}
                                        <div className="w-full mt-auto py-1 px-1 rounded-b-lg bg-gradient-to-r from-amber-100/70 via-orange-100/70 to-amber-100/70 border-t border-amber-200/90 group-hover:from-[#f37023] group-hover:to-[#ff8c42] group-hover:border-[#f37023] transition-all duration-300 flex items-center justify-center z-10">
                                            <span className="text-[10px] sm:text-xs font-bold text-[#0c286e] group-hover:text-white text-center leading-tight truncate px-1 transition-colors duration-300 tracking-tight">
                                                {category.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            {/* Display Category Products */}
            <div className="w-full max-w-[1320px] mx-auto my-4">
                <div className="mx-auto flex justify-between">
                </div>
                <div className="hidden lg:block">
                    {allCategory.slice(0, 7).map((category, index) => (
                        <ProductViewByCategory
                            key={index}
                            id={category?._id}
                            name={category?.name}
                        />
                    ))}
                </div>
            </div>


            </section>
        </div>
    );
}

export default Home;
