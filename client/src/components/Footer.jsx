import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Footer() {
    const allCategory = useSelector(state => state.product.allCategory);
    const navigate = useNavigate()
    // State to toggle category visibility
    const [showCategories, setShowCategories] = useState(false);

    // Split categories into 3 columns
    const columnCount = 3;
    const categoriesPerColumn = Math.ceil(allCategory.length / columnCount);
    const categoryColumns = Array.from({ length: columnCount }, (_, i) =>
        allCategory.slice(i * categoriesPerColumn, (i + 1) * categoriesPerColumn)
    );

    return (
        <footer className="border-t w-full">
            <div className="container mx-auto p-4">

                {/* Collapsible Section for sm, md, xs */}
                <div className="block md:hidden">
                    <div className="flex justify-between items-center py-2 border-b">
                        <p>Jp Store</p>
                        <button
                            className="text-xl font-bold"
                            onClick={() => setShowCategories(!showCategories)}
                        >
                            {showCategories ? "−" : "+"}
                        </button>
                    </div>

                    {showCategories && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            <p className="text-lg font-bold">All categories</p>
                            {categoryColumns.map((column, index) => (
                                <div key={index} className="space-y-2">
                                    {column.map((category, idx) => (
                                        <div
                                            key={idx}
                                            className="text-sm text-gray-600 hover:text-gray-900"
                                            onClick={() => navigate(`/all-products-by-category/${category._id}`)}
                                        >
                                            {category.name}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Desktop Categories */}
                <div className="hidden md:block">
                    <div className="flex flex-wrap gap-4">
                        <h2 className="font-bold text-lg w-full mt-5">All Categories</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                            {categoryColumns.map((column, index) => (
                                <div key={index} className="space-y-2">
                                    {column.map((category, idx) => (
                                        <div
                                            key={idx}
                                            className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                                            onClick={() => navigate(`/all-products-by-category/${category._id}`)}
                                        >
                                            {category.name}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-gray-200 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
                    <p>© {new Date().getFullYear()} Jp Store. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
