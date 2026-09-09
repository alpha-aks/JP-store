/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { validURLConvertor } from "../utils/validURLConvertor";
import ProductViewByCategory from "../components/ProductViewByCategory";

function Home() {

    const loadingCategory = useSelector(state => state.product.loadingCategory);
    const allCategory = useSelector(state => state.product.allCategory);
    const allSubCategory = useSelector(state => state.product.allSubCategory);

    const navigate = useNavigate();

    const handleRedirectToProductList = (categoryId, categoryName) => {
        const filteredSubCategories = allSubCategory?.filter(subCategory =>
            subCategory.category?.some(cat => cat._id === categoryId)
        );
        // console.log("filteredSubCategories: ", filteredSubCategories);

        // const url = `/${validURLConvertor(categoryName)}-${categoryId}/${validURLConvertor(filteredSubCategories[0].name)}-${filteredSubCategories[0]._id}`

        // navigate(url);
        let subCategoryId = filteredSubCategories[0]?._id;
        navigate(`/products-list/${categoryId}/${subCategoryId}`, { state: { categoryId, subCategoryId } });

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
                                key={index}
                                className="flex flex-col items-center justify-center bg-white rounded-lg transition-transform transform hover:scale-110 relative"
                                onClick={() => handleRedirectToProductList(category._id, category.name)}
                            >
                                <img
                                    src={category.image}
                                    alt={`Category ${index}`}
                                    className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain"
                                />
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
