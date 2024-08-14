import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../App";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { productType } from "../components/Card";
import { MdDeleteForever } from "react-icons/md";

export const Cart = () => {
    const cart = useContext(cartContext);
    const [promo, setPromo] = useState<string>();
    const [promoApplied, setPromoApplied] = useState<boolean>(false);
    const [cartEmpty, setCartEmpty] = useState<boolean | undefined>();

    const promoRef = useRef<any>();

    const navigate = useNavigate();

    if(!cart) {
        throw new Error("cartContext must be used within a cartContext.Provider");
    }

    const { products, subTotal, totalAmount, setTotalAmount, setSubTotal, setProducts } = cart;

    const applyPromoCode = () => {
        if(promoApplied) {
            toast.error("Only one promo code can be used. Visit cart again to reset promo code");
        }
        else{
            if(!promo) {
                toast.error("No promo code entered");
            }
            else if(promo === "PROFILE20") {
                const discount = subTotal/5;
                const temp: number = parseFloat((subTotal - discount).toFixed(2));
                setTotalAmount(temp);
                setPromoApplied(true);
                toast.success("Promo applied!");
            }
            else if(promo === "PROFILE4000") {
                const discount = 4000;
                const temp: number = subTotal - discount;
                setTotalAmount(temp);
                setPromoApplied(true);
                toast.success("Promo applied!");
            }
            else {
                toast.error("Promo code not applicable");
            }
        }
    };

    const copyPromoCode = (promoCode: string) => {
        toast.success(`${promoCode} copied`);
        navigator.clipboard.writeText(promoCode);
    };

    const handlePay = () => {
        alert("Payment was successful");
        navigate("/");
        window.location.reload();
    };

    const removeItem = (product: productType) => {
        const prod = products?.find((item) => item.id === product.id);

        if(!prod) {
            throw new Error("Product cannot be removed");
        }

        const amountToDeduct = prod.price * prod.quantityInCart;
        setSubTotal((prev) => prev - amountToDeduct);
        prod.quantityInCart = 0;
        prod.addedToCart = false;
        // setQuantity(0);
        const remainingProd = products?.filter((item) => item.id !== prod.id)
        setProducts(remainingProd);
        if(remainingProd?.length === 0) {
            setCartEmpty(true);
        }
    };

    useEffect(() => {
        if(subTotal !== 0)
        setCartEmpty(false);
        else
        setCartEmpty(true);

    }, []);

    useEffect(() => {
        setTotalAmount(subTotal);
        setPromo(undefined);
        
        if(promoApplied) {
            toast.info("Cart updated, apply promo again");
            promoRef.current.value = "";
        }
        setPromoApplied(false);
    }, [products]);

    return(
        <div className="md:px-8 lg:px-36 xl:px-64 2xl:px-108">
            <div>
                {subTotal !== 0 ? (
                    products?.map((product) => (
                        <div className="space-y-4 py-4" key={ product.id }>
                            <div className="flex flex-row items-center justify-between gap-4 font-semibold text-xl">
                                <div>
                                    <img src={ product.image } className="w-[200px] lg:w-[250px] rounded-md shadow-md border-2 border-gray-600" />
                                </div>
                                <div className="flex flex-row gap-4">
                                    <p>{ product.name }</p>
                                    <p>₹{ product.price } x { product.quantityInCart }</p>
                                    <p>₹{ product.price*product.quantityInCart }</p>
                                </div>
                            </div>
                            <div className="text-center pb-4">
                                <button
                                    className="font-semibold p-1 border-2 rounded-md border-gray-800 text-gray-300 bg-black hover:text-black hover:bg-gray-300"
                                    onClick={() => removeItem(product)}
                                ><MdDeleteForever size={23} /></button>
                            </div>
                            <hr />
                        </div>
                    ))
                ):(
                    <p className="text-center font-semibold text-2xl">Your cart is empty</p>
                )}
            </div>
            {products && !cartEmpty &&
                <div className="text-right space-y-2">
                    <p className="font-semibold text-xl">Sub Total: ₹{ subTotal }</p>
                    <p className="flex flex-row">Use PROFILE20 for a 20% off<FaCopy className="mx-2 cursor-pointer" onClick={() => copyPromoCode("PROFILE20")} size={20} /></p>
                    <p className="flex flex-row">Use PROFILE4000 for a ₹4000 off<FaCopy className="mx-2 cursor-pointer" onClick={() => copyPromoCode("PROFILE4000")} size={20} /></p>
                    <input
                        className="p-1 bg-black rounded-md text-gray-300"
                        placeholder="Enter promo code"
                        onChange={(event) => setPromo(event.target.value)}
                        ref={promoRef}
                    />
                    <button
                        className="ml-2 font-semibold p-1 border-2 rounded-md border-gray-800 text-gray-300 bg-black hover:text-black hover:bg-gray-300"
                        onClick={applyPromoCode}
                    >Apply</button>
                    {promoApplied && <p className="font-bold text-lg text-green-500">Promo applied!</p>}
                    <p className="font-semibold text-xl">Amount to pay: ₹{ totalAmount }</p>
                    <button
                        className="w-[80px] ml-2 font-semibold p-1 border-2 rounded-md border-gray-800 text-gray-300 bg-black hover:text-black hover:bg-gray-300"
                        onClick={handlePay}
                    >Pay</button>
                </div>
            }
            
            <ToastContainer />
        </div>
    )
}