import { createContext, useState, useContext } from "react";

const AppContext = createContext();
/**
 * useAppContext is a custom hook that provides access to the AppContext.
 * It allows components to access and manipulate the application's global state,
 * including active tags, current page, user data, search query, and results.
 * This hook simplifies the process of consuming context in functional components.
 */
export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [activeTag, setActiveTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("loginuser")) || {}
  );

  const updateUserData = (newData) => {
    const updatedUserData = { ...userData, ...newData };
    setUserData(updatedUserData);
    localStorage.setItem("loginuser", JSON.stringify(updatedUserData));
  };
  return (
    <AppContext.Provider
      value={{
        activeTag,
        setActiveTag,
        currentPage,
        setCurrentPage,
        userData,
        updateUserData,
        searchQuery,
        setSearchQuery,
        results,
        setResults,
      }}>
      {children}
    </AppContext.Provider>
  );
};
