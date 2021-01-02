import React, { useReducer, useEffect, useContext } from "react";
import axios from "axios";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import {
  ADD_CART,
  SUBMIT_ORDER
} from "./CartTypes";
import AuthContext from "../Auth/AuthContext";

const CartState = (props: any) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const initialState = {
    items: [],
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {

    // eslint-disable-next-line
  }, []);

  const addToCart = async (id: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("http://localhost:3000/api/shop/add-cart", { productId: id }, config);
      dispatch({ type: ADD_CART, payload: res.data.data });
    } catch (err) {
      
    }
  }

  const submitOrder = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("http://localhost:3000/api/shop/create-order", { user: user, items: state.items }, config);
      dispatch({ type: SUBMIT_ORDER, payload: res.data.data });
    } catch (err) {
      
    }
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        submitOrder
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
