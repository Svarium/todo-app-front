import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (userData) => {
    const res = await axios.post(
      "http://localhost:3002/api/v1/register",
      userData,
      { withCredentials: true }
    );
    setUser(res.data);
    return res.data;
  };

  const login = async (userData) => {
    const res = await axios.post(
      "http://localhost:3002/api/v1/login",
      userData,
      { withCredentials: true }
    );
    setUser(res.data);
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
