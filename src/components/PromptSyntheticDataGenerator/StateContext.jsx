import React, { createContext, useReducer, useContext } from "react";


// Initial state
const initialState = {
    schema: "",
};


// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "SCHEMA_RECEIVED": 
            return { ...state, schema: action.payload };
        default:
            return state;
    }
};

// Create Context
const StateContext = createContext();

// Provider Component
export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
};


// Custom Hook to use the context
export const useStateContext = () => useContext(StateContext);
