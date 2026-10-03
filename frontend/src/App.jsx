import ProductList from "./pages/ProductList.jsx";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<ProductList />} />

                <Route
                    path="/product/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/cart"
                    element={<CartPage />}
                />

                <Route
                    path="/checkout" 
                    element={<CheckoutPage/>}
                />
            </Routes>
        </>
    );
}

export default App;