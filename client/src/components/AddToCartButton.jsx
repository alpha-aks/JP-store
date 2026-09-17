/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { userCart } from '../provider/CartContext';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import summaryApi from '../common/summaryApi';
import { Minus, Plus } from "lucide-react";
function AddToCartButton({ data }) {

    const { fetchCartItem, updateCartItem, deleteCartItem } = userCart();
    const cartItem = useSelector(state => state.cartItem.cart);
    const user = useSelector(state => state?.user);

    const [isItemAvailableInCart, setIsItemAvailableInCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemsDetails] = useState()

    //checking this item in cart or not
    useEffect(() => {
        const checkItemInCart = cartItem.some(item => item?.productId?._id === data?._id)
        setIsItemAvailableInCart(checkItemInCart)

        const product = cartItem.find(item => item?.productId?._id === data?._id)
        setQty(product?.quantity || 0)
        setCartItemsDetails(product)
    }, [data, cartItem])

    const handleAddToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        // Friendly login check: Inform user cleanly without technical error terms
        if (!user?._id) {
            toast.error("You need to login before adding product to cart", {
                icon: "🔒",
                id: "auth-login-cart-toast",
                duration: 3500
            });
            return;
        }

        try {
            const resposnse = await Axios({
                ...summaryApi.addToCart,
                data: {
                    productId: data?._id,
                },
            })

            if (resposnse.data.success) {
                toast.success(resposnse.data.message)
                fetchCartItem()
            } else {
                toast.error(resposnse.data.message)
            }
        } catch (error) {
            AxiosToastError(error);
        }
    }

    const increaseQuantity = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        updateCartItem(cartItemDetails?._id, cartItemDetails?.quantity + 1);
    }

    const decreaseQty = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        if(qty === 1){
            deleteCartItem(cartItemDetails?._id)
        }else{
            await updateCartItem(cartItemDetails?._id,qty-1)
        }
    }

    return (
        <>
            {isItemAvailableInCart ? (
                <div className={`flex items-center font-bold text-xs sm:text-sm text-white 
                    ${data?.stock === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-[#f37023] via-[#ff7324] to-[#f37023] shadow-xs hover:shadow-sm"} 
                    rounded-md sm:rounded-lg overflow-hidden shrink-0 border border-orange-400/40 transition-all`}>
                    <button
                        className="px-1.5 py-0.5 sm:py-1 text-center cursor-pointer hover:bg-black/15 active:bg-black/25 transition-colors flex items-center justify-center"
                        onClick={(e) => decreaseQty(e)}
                        disabled={data?.stock === 0}
                        aria-label="Decrease quantity"
                    >
                        <Minus size={13} />
                    </button>
                    <span className="px-1.5 text-center text-xs sm:text-sm min-w-[20px] font-extrabold tracking-tight">
                        {cartItemDetails?.quantity}
                    </span>
                    <button
                        className="px-1.5 py-0.5 sm:py-1 text-center cursor-pointer hover:bg-black/15 active:bg-black/25 transition-colors flex items-center justify-center"
                        onClick={(e) => increaseQuantity(e)}
                        disabled={data?.stock === 0}
                        aria-label="Increase quantity"
                    >
                        <Plus size={13} />
                    </button>
                </div>
            ) : (
                <div className="shrink-0">
                    <button
                        className={`px-3 sm:px-4 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 
                            ${data?.stock === 0 
                            ? "border border-gray-300 text-gray-400 cursor-not-allowed bg-gray-100" 
                            : "text-[#f37023] bg-orange-50/80 border border-[#f37023]/80 hover:bg-gradient-to-r hover:from-[#f37023] hover:to-[#ff833b] hover:text-white hover:border-[#f37023] active:scale-95 cursor-pointer shadow-2xs hover:shadow-xs"}`}
                        onClick={(e) => handleAddToCart(e)}
                        disabled={data?.stock === 0}
                    >
                        ADD
                    </button>
                </div>
            )}
        </>
    );
}

export default AddToCartButton