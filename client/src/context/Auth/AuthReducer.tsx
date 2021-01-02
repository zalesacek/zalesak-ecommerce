import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOAD_USER,
} from "./AuthTypes";

const AuthReducer = (state: any, action: any) => {
    switch (action.type) {

        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token.token);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload.data,
                token: action.payload.token.token,
            };

        case LOAD_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload.data,
                token: action.payload.token,
            };

        case LOGIN_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: {
                    isAdmin: false,
                    name: null,
                    email: null,
                    password: null,
                    date: null,
                },
                error: action.payload,
            };

        case LOGOUT:
            localStorage.removeItem("token");            
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: {
                    isAdmin: false,
                    name: null,
                    email: null,
                    password: null,
                    date: null,
                },
            }

        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token.token);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload.data,
                token: action.payload.token.token,
            };

        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: {
                    isAdmin: false,
                    name: null,
                    email: null,
                    password: null,
                    date: null,
                },
                error: action.payload,
            };

        default:
            return state;
    }
};

export default AuthReducer;