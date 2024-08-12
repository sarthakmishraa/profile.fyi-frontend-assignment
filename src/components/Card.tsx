import { useContext } from "react";
import { cartContext } from "../App";
import { cartContextType } from "../App";

interface Props {
    product: productType
}

export interface productType {
    id: number,
    image: string,
    name: string,
    price: number,
    addedToCart: boolean,
    quantityInCart: number
}

export const Card = (props: Props) => {
    const product: productType = props.product;

    const cart = useContext<cartContextType | undefined>(cartContext);
    if (!cart) {
        throw new Error("cartContext must be used within a cartContext.Provider");
    }

    const { setSubTotal, setProducts, setAddedToCart, setQuantityInCart } = cart;

    const addToCart = () => {
        try {
            setProducts(prev => [...prev || [], product]);
            setSubTotal((prev) => prev + product.price);
            setAddedToCart(true);
            setQuantityInCart(prev => prev + 1);
        }
        catch(error) {
            console.log(error);
        }
    };

    return(
        <div className="flex flex-col justify-between p-2">
            <div>
                <img
                    src={product.image}
                    className="rounded-md shadow-md border-2 border-gray-600"
                    alt="product"
                />
                <p>Name: {product.name}</p>
                <p>Price: ₹ {product.price}</p>
            </div>
            {
                product.addedToCart ? (
                    <button
                        className="w-[50%] my-1 font-semibold p-1 border-2 rounded-md border-gray-800 text-gray-300 bg-black hover:text-black hover:bg-gray-300"
                        onClick={addToCart}
                    >
                        Add to cart
                    </button>
                ):(
                    <p>Added</p>
                )
            }
        </div>
    )
};