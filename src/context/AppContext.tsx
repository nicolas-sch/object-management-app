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

const loadStateFromStorage = (): AppState => {
  try {
    const savedState = localStorage.getItem("appState");
    return savedState ? JSON.parse(savedState) : initialState;
  } catch (error) {
    console.error("Failed to load state:", error);
    return initialState;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, loadStateFromStorage());


  useEffect(() => {
    try {
      localStorage.setItem("appState", JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save state:", error);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
