import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";

export const Navbar = () => {
    return(
        <div className="flex flex-row justify-around gap-4 text-xl my-5">
            <div className="">
                <Link to="/" className="flex flex-row items-center" >
                    <AiFillHome size={25} />
                    <button
                        className="font-semibold p-1 hover:underline"
                    >
                        
                        Home
                    </button>
                </Link>
            </div>
            <div>
                <Link to="/cart" className="flex flex-row items-center" >
                    <FaShoppingCart size={25} />
                    <button
                        className="font-semibold p-1 hover:underline"
                    >
                        Cart
                    </button>
                </Link>
            </div>
        </div>
    )
}