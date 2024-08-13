import { useContext, useState } from "react";
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
    const [quantity, setQuantity] = useState<number>(product.quantityInCart);

    const cart = useContext<cartContextType | undefined>(cartContext);
    if (!cart) {
        throw new Error("cartContext must be used within a cartContext.Provider");
    }

    const { products, setSubTotal, setProducts } = cart;

    const addToCart = () => {
        try {
            setProducts(prev => [...prev || [], product]);
            setSubTotal((prev) => prev + product.price);
            setQuantity(prev => prev + 1);

            product.addedToCart = true;
            product.quantityInCart += 1;
        }
        catch(error) {
            console.log(error);
        }
    };

    const addOneItem = () => {
        product.quantityInCart += 1;
        setQuantity(prev => prev + 1);
        setSubTotal((prev) => prev + product.price);
    };

    const removeOneItem = async() => {
        if(product.quantityInCart == 1) {
            await setSubTotal(prev => prev - product.price * product.quantityInCart);
            product.addedToCart = false;
            const remainingProd = products?.filter((prod) => prod.id !== product.id)
            setProducts(remainingProd);
        }
        product.quantityInCart -= 1;
        setQuantity(prev => prev - 1);
    };

    const removeItem = async() => {
        await setSubTotal(prev => prev - product.price * product.quantityInCart);
        product.quantityInCart = 0;
        product.addedToCart = false;
        setQuantity(0);
        const remainingProd = products?.filter((prod) => prod.id !== product.id)
        setProducts(remainingProd);
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
                product?.addedToCart ? (
                    <div className="my-1">
                        <button
                            className="w-8 px-2 pb-1 border-2 border-gray-700 rounded-lg text-xl font-semibold text-gray-300 bg-black hover:text-black hover:bg-gray-300"
                            onClick={removeOneItem}
                        >-</button>
                        <button disabled className="mx-4 text-xl">{ quantity }</button>
                        <button
                            className="w-8 px-2 pb-1 border-2 border-gray-700 rounded-lg text-xl font-semibold text-gray-300 bg-black hover:text-black hover:bg-gray-300"
                            onClick={addOneItem}
                        >+</button>
                        <button
                            className="ml-5 font-semibold p-1 border-2 rounded-md border-gray-800 text-gray-300 bg-black hover:text-black hover:bg-gray-300"
                            onClick={removeItem}
                        >Remove</button>
                    </div>
                ):(
                    <button
                        className="w-[50%] my-1 font-semibold p-1 border-2 rounded-md border-gray-800 text-gray-300 bg-black hover:text-black hover:bg-gray-300"
                        onClick={addToCart}
                    >
                        Add to cart
                    </button>
                )
            }
        </div>
    )
};