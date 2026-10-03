import ProductList from "./pages/ProductList.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx"; 

function App() {
    return (
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
    );
}

export default App;