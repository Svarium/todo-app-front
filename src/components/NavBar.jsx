import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-400">
        TODO APP
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm hidden sm:block">
              Bienvenido, <strong>{user.username}</strong>
            </span>
            <Link
              to="/forgot-password"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
            >
              Reset Password
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded text-sm"
            >
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
