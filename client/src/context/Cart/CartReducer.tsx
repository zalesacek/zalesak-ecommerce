import {
    ADD_CART,
    SUBMIT_ORDER,
} from "./CartTypes";

const CartReducer = (state: any, action: any) => {
    switch (action.type) {

        case ADD_CART:
            return {
                ...state,
                items: [...state.items, action.payload] 
            };

        case SUBMIT_ORDER:
            return {
                ...state,
                items: [] 
            };

        default:
            return state;
    }
};

export default CartReducer;