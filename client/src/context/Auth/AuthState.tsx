import React, { useReducer, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
} from "./AuthTypes";

const AuthState = (props: any) => {

  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    user: {
      isAdmin: false,
      name: null,
      email: null,
      password: null,
      date: null,
    },
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  
  useEffect(() => {
    if(!initialState.isAuthenticated || localStorage.getItem("token") === undefined){
      const storageToken = localStorage.getItem("token");
      if (storageToken) {
        loadUser(storageToken);      
      }
    }
    // eslint-disable-next-line
  }, []);

  const loadUser = async (token: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("http://localhost:3000/api/auth/user", { token: token }, config);
      dispatch({ type: LOAD_USER, payload: res.data });
    } catch (err) {
      //dispatch({ type: LOAD_FAIL, payload: err.response.data.msg });
    }
  }

  const register = async (formData: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  const login = async (formData: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  const logout = () => {    
    dispatch({ type: LOGOUT });    
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        login,
        logout,
        loadUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
