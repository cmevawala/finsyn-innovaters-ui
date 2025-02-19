import React, { createContext, useReducer, useContext } from "react";

function transformObjectToArray(obj) {
  return Object.entries(obj).map(([key, value]) => {
    let formattedName = key.replace(/([a-z])([A-Z])/g, '$1 $2'); // Insert space before capital letters
    formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1); // Capitalize first letter

    return {
      name: key,
      label: formattedName,
      ...value
    };
  });
}


// Initial state
const initialState = {
    schema: [],
    syntheticData: [],
    showReport: false
};


// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "SCHEMA_RECEIVED": {
            const transformedSchema = transformObjectToArray(action.payload)
            return { ...state, schema: transformedSchema };
        }

        case "SYNTHETIC_DATA_FROM_METADATA":
            return { ...state, syntheticData: action.payload };

        case "SHOW_REPORT":
                return { ...state, showReport: action.payload };

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
