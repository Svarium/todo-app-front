import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true); // nuevo estado


  const getToken = () => localStorage.getItem("token");

  const register = async (userData) => {
  return await authService.register(userData);
};

  const login = async (credentials) => {
    const { token, user } = await authService.login(credentials);
    console.log("✅ Login OK - token:", token);
    localStorage.setItem("token", token);
    setUser(user);
    await getProfile(); // <- carga imagen y perfil actualizado
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    setProfileImage(null);
    await fetch("http://localhost:3002/api/v1/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  };

 const getProfile = async () => {
  const token = getToken();
  if (!token) {
    console.log("⚠️ No hay token en getProfile");
    return;
  }

  const res = await fetch("http://localhost:3002/api/v1/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("❌ Token inválido al pedir perfil");
    throw new Error("Token inválido");
  }

  const data = await res.json();
  setUser(data);

  // Si hay imagen, armar URL absoluta
  if (data.profileImage) {
    setProfileImage(`http://localhost:3002${data.profileImage}`);
  }
};


  // Este useEffect solo se ejecuta si hay un token ya guardado
useEffect(() => {
  const token = getToken();
  console.log("🧪 Token al iniciar:", token);

  if (!token) {
    setLoading(false);
    return;
  }

  const init = async () => {
    try {
      const valid = await authService.verifyToken();
      console.log("✅ Token válido:", valid);
      if (valid) {
        await getProfile();
      } else {
        logout();
      }
    } catch (err) {
      console.error("Error al verificar token:", err);
      logout();
    } finally {
      setLoading(false); // siempre termina la carga
    }
  };

  init();
}, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        profileImage,
        getProfile,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
