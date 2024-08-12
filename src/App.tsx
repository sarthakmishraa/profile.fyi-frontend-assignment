import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="px-20 pt-5 pb-10 bg-gray-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<h2 className="font-bold text-center text-2xl m-10">404 - Page Not Found</h2>} />
        </Routes>  
      </div>
    </Router>
  )
}

export default App;