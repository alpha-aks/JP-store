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
        <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full mx-auto mt-3 top-28 lg:top-22">
            {/* Category Section */}
            <div className="w-full max-w-[1200px] mx-auto my-4">
                <h2 className="font-bold text-lg mb-3 text-center lg:hidden">Shop By Category</h2>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-3 md:gap-4 justify-center">
                    {loadingCategory ? (
                        new Array(20).fill(null).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                            >
                                <div className="bg-blue-100 min-h-24 rounded"></div>
                                <div className="bg-blue-100 h-8 rounded"></div>
                            </div>
                        ))
                    ) : (
                        allCategory.map((category, index) => (
                            <div
                                key={category._id || index}
                                className="flex flex-col items-center justify-center bg-white rounded-lg transition-transform transform hover:scale-105 p-2 shadow-sm hover:shadow cursor-pointer"
                                onClick={() => handleRedirectToProductList(category._id, category.name)}
                            >
                                <img
                                    src={category.image}
                                    alt={category.name || `Category ${index}`}
                                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
                                />
                                <span className="text-xs sm:text-sm font-medium text-gray-800 text-center mt-1 truncate max-w-full">
                                    {category.name}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Display Category Products */}
            <div className="w-full max-w-[1200px] mx-auto my-4">
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
    );
}

export default Home;
