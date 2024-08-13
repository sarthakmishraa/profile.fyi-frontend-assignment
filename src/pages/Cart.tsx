import { useContext } from "react";
import { cartContext } from "../App";

export const Cart = () => {
    const cart = useContext(cartContext);

    if(!cart) {
        throw new Error("cartContext must be used within a cartContext.Provider");
    }

    const { products, subTotal, totalAmount } = cart;

    return(
        <div className="bg-gray-300">
            <div>
                {products ? (
                    products?.map((product) => (
                        <div className="space-y-4" key={ product.id }>
                            <div className="flex flex-row items-center justify-between gap-4 font-semibold text-xl">
                                <div>
                                    <img src={ product.image } className="w-[200px] rounded-md shadow-md border-2 border-gray-600" />
                                </div>
                                <div className="flex flex-row gap-4">
                                    <p>{ product.name }</p>
                                    <p>₹{ product.price }</p>
                                </div>
                            </div>
                            <div className="pb-4">
                                <button
                                    className="w-8 px-2 pb-1 border-2 border-gray-700 rounded-lg text-xl font-semibold text-gray-300 bg-black hover:text-black hover:bg-gray-300"
                                    // onClick={() => removeOneItem(product)}
                                >-</button>
                                <button disabled className="mx-4 text-xl">{ product.quantityInCart }</button>
                                <button
                                    className="w-8 px-2 pb-1 border-2 border-gray-700 rounded-lg text-xl font-semibold text-gray-300 bg-black hover:text-black hover:bg-gray-300"
                                    // onClick={() => addOneItem(product)}
                                >+</button>
                                <button
                                    className="ml-12 font-semibold p-1 border-2 rounded-md border-gray-800 text-gray-300 bg-black hover:text-black hover:bg-gray-300"
                                    // onClick={() => removeItem(product)}
                                >Remove</button>
                            </div>
                        </div>
                    ))
                ):(
                    <p className="text-center font-semibold text-2xl">Your cart is empty</p>
                )}
            </div>
            <div>
                <p>Sub Total: { subTotal }</p>
                <input placeholder="Enter promo" />
                <button>Apply</button>
                <p>Total: {totalAmount}</p>
            </div>
        </div>
    )
}