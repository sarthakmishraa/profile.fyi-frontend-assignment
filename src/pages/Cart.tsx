import { useContext } from "react";
import { cartContext } from "../App";

export const Cart = () => {
    const cart = useContext(cartContext);

    if(!cart) {
        throw new Error("cartContext must be used within a cartContext.Provider");
    }

    const { products } = cart;

    return(
        <div className="bg-gray-300">
            <div>
                {products ? (
                    products?.map((product) => (
                        <div key={product.id}>
                            <div>
                            <img src={product.image} className="w-[100px]" />
                            </div>
                            <div>
                                <p>{ product.name }</p>
                                <p>{ product.price }</p>
                            </div>
                            <div>Quantity</div>
                            <div>Remove</div>
                        </div>
                    ))
                ):(
                    <p className="text-center font-semibold text-2xl">Your cart is empty</p>
                )}
            </div>
        </div>
    )
}