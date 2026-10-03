import {createContext,useContext,useState} from "react";

const CardContext = createContext();

export const CardProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    
}