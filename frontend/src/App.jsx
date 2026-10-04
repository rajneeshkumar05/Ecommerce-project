
import ProductList from "./pages/ProductList.jsx";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import PrivateRouter from "./components/PrivateRouter.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

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

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route element={<PrivateRouter />}>
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
