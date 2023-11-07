import React, { createContext, useContext, useState, useEffect } from "react";

interface UseContextProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  user: boolean | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
});

function UseContext({ children }: UseContextProps) {
  const [user, setUser] = useState<boolean | null>(null);

  useEffect(() => {
    // check local storage to see if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      setUser(true);
    }
  }, []);

  // handles login and sets user login status to true
  const login = () => {
    setUser(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  // handles logout and clears local storage of user login status
  const logout = () => {
    setUser(false);
    localStorage.removeItem("isLoggedIn");
  };

  // sets up the AuthContext component for site wide access to user variable and login and logout functions
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// wraps useContext component with accompanied AuthContext component as a function parameter with the function useAuth
function useAuth() {
  return useContext(AuthContext);
}

export default UseContext;
export { useAuth };
