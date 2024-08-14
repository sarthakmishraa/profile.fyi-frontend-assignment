import products from "../products.json";
import { Card } from "../components/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Home = () => {
    return(
        <div>
            <div className="flex flex-col">
                <div className="text-center mb-5">
                    <p className="text-xl">Profile fyi frontend assignment</p>
                    <p className="font-semibold text-2xl">Mintra - E Commerce</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        products.map((product) => <Card key={product.id} toast={toast} product={product} />)
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}