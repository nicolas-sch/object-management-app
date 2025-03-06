import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import {
  appReducer,
  initialState,
  AppState,
  Action,
} from "../reducers/appReducer";

interface AppProviderProps {
  children: ReactNode;
}

// Function to load the application state from localStorage
const loadStateFromStorage = (): AppState => {
  try {
    // Attempts to get the saved state from localStorage
    const savedState = localStorage.getItem("appState");
    // If there is a saved state, return it. Otherwise, return the initial state
    return savedState ? JSON.parse(savedState) : initialState;
  } catch (error) {
    // If there's an error loading the state, log the error and return the initial state
    console.error("Failed to load state:", error);
    return initialState;
  }
};

// Create the app context to share the state and dispatch function
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Component that provides the application state and dispatch function to its children
const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Use the useReducer hook to manage the app state and dispatch function
  const [state, dispatch] = useReducer(appReducer, loadStateFromStorage());

  // Side effect that saves the state to localStorage whenever the state changes
  useEffect(() => {
    try {
      // Attempts to save the state to localStorage
      localStorage.setItem("appState", JSON.stringify(state));
    } catch (error) {
      // If there's an error saving the state, log the error
      console.error("Failed to save state:", error);
    }
  }, [state]); // The effect depends on the state, so it runs every time the state changes

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
