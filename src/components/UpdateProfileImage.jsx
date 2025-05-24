import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const UpdateProfileImage = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const { getProfile } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("iconProfile", file);

    try {
      const res = await fetch("http://localhost:3002/api/v1/upload-profile-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir la imagen");

      setStatus("✅ Imagen actualizada con éxito");
      await getProfile(); // refresca imagen
    } catch (err) {
      console.error(err);
      setStatus("❌ Error al actualizar la imagen");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center gap-2">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Subir Imagen
      </button>
      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
};

export default UpdateProfileImage;
