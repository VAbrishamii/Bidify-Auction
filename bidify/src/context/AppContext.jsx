// src/context/AppContext.js

import { createContext, useState, useContext } from "react";

// Create context
const AppContext = createContext();

// Custom hook for accessing context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Provider component
export const AppProvider = ({ children }) => {
  const [activeTag, setActiveTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <AppContext.Provider value={{ activeTag, setActiveTag, currentPage, setCurrentPage }}>
      {children}
    </AppContext.Provider>
  );
};
