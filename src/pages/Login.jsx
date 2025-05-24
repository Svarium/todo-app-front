import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(form); // 👈 Si hay error real, va al catch
      navigate("/");     // 👈 redirige al home al loguear correctamente
    } catch (err) {
      console.error("Login error:", err);
      setError("Error al iniciar sesión"); // solo si login() lanza un error real
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded p-2 mb-3"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="w-full border rounded p-2 mb-4"
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white rounded py-2">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
