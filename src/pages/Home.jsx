import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {user?.username} 👋</h1>
      <p className="mb-2">Email: {user?.email}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Cerrar sesión
      </button>
      <button onClick={navigate('/forgot-password')}
       className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
          Reset Password
      </button>
    </div>
  );
};

export default Home;
