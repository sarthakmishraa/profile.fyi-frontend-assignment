import products from "../products.json";
import { Card } from "../components/Card";

export const Home = () => {
    return(
        <div>
            <div className="flex flex-col">
                <div className="text-center mb-5">
                    <p className="font-semibold text-xl">Profile fyi frontend assignment</p>
                    <p className="font-semibold text-2xl">Mintra - E Commerce</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {
                        products.map((product) => <Card product={product} />)
                    }
                </div>
            </div>
        </div>
    )
}