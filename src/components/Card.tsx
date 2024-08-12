interface Props {
    product: productType
}

interface productType {
    image: string,
    name: string,
    price: number
}

export const Card = (props: Props) => {
    const product: productType = props.product;

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
            <button
                className="w-[50%] my-1 font-semibold p-1 border-2 rounded-md border-gray-800 text-gray-300 bg-black hover:text-black hover:bg-gray-300"
            >
                Add to cart
            </button>
        </div>
    )
};