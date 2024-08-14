import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Navbar } from "./components/Navbar";
import { productType } from "./components/Card";

export interface cartContextType {
  products: productType[] | undefined;
  setProducts: React.Dispatch<React.SetStateAction<productType[] | undefined>>;
  subTotal: number;
  setSubTotal: React.Dispatch<React.SetStateAction<number>>;
  promoCode: string | undefined;
  setPromoCode: React.Dispatch<React.SetStateAction<string | undefined>>;
  totalAmount: number;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  addedToCart: boolean | undefined;
  setAddedToCart: React.Dispatch<React.SetStateAction<boolean | undefined>> ;
  quantityInCart: number;
  setQuantityInCart: React.Dispatch<React.SetStateAction<number>>
}

export const cartContext = createContext<cartContextType | undefined>(undefined);

function App() {
  const [products, setProducts] = useState<productType[] | undefined>();
  const [subTotal, setSubTotal] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string | undefined>();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [addedToCart, setAddedToCart] = useState<boolean | undefined>();
  const [quantityInCart, setQuantityInCart] = useState<number>(0);

  const defaultCartValue = {
    products,
    setProducts,
    subTotal,
    setSubTotal,
    promoCode,
    setPromoCode,
    totalAmount,
    setTotalAmount,
    addedToCart,
    setAddedToCart,
    quantityInCart,
    setQuantityInCart
  };

  return (
    <Router>
      <cartContext.Provider value={defaultCartValue}>
        <div className="px-20 pt-5 pb-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<h2 className="font-bold text-center text-2xl m-10">404 - Page Not Found</h2>} />
          </Routes>  
        </div>
      </cartContext.Provider>
    </Router>
  )
}

export default App;