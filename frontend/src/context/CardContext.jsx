import { createContext, useContext, useState, useEffect } from "react";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Fetch cart items
    const fetchCartItems = async () => {
        try {
            const res = await fetch(`${BASEURL}/api/cart/`);

            if (!res.ok) {
                throw new Error("Failed to fetch cart items");
            }

            const data = await res.json();
            console.log("CART API RESPONSE:", data);
            setCartItems(data.items || []);
            setTotalPrice(data.total || 0);

        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    // Add item to cart
    const addToCart = async (product) => {
        console.log("Product:", product);
        console.log("Product ID:", product.id);

        try {
            const res = await fetch(`${BASEURL}/api/cart/add/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: 1,
                }),
            });

            const data = await res.json();

            console.log("Add cart response:", res.status, data);

            if (!res.ok) {
                throw new Error(
                    data.error ||
                    data.detail ||
                    "Failed to add item to cart"
                );
            }

            await fetchCartItems();

        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId) => {
        try {
            const res = await fetch(`${BASEURL}/api/cart/remove/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    item_id: itemId,
                }),
            });

            const data = await res.json();

            console.log("Remove cart response:", res.status, data);

            if (!res.ok) {
                throw new Error(
                    data.error || "Failed to remove item from cart"
                );
            }

            await fetchCartItems();

        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    // Update item quantity
    const updateCartItemQuantity = async (itemId, quantity) => {

        // Quantity 0 hone par item remove hoga
        if (quantity < 1) {
            await removeFromCart(itemId);
            return;
        }

        try {
            const res = await fetch(`${BASEURL}/api/cart/update/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    item_id: itemId,
                    quantity: quantity,
                }),
            });

            const data = await res.json();

            console.log("Update cart response:", res.status, data);

            if (!res.ok) {
                throw new Error(
                    data.error || "Failed to update cart item"
                );
            }

            await fetchCartItems();

        } catch (error) {
            console.error(
                "Error updating cart item quantity:",
                error
            );
        }
    };

//CLEAR_CART    

    const clearCart = () => {
        setCartItems([]);
        setTotalPrice(0);
    }


    return (
        <CardContext.Provider
            value={{
                cartItems,
                totalPrice,
                addToCart,
                removeFromCart,
                updateCartItemQuantity,
                clearCart,
            }}
        >
            {children}
        </CardContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CardContext);
};