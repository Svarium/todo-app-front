import { useAuth } from "../context/AuthContext";
import UpdateProfileImage from "../components/UpdateProfileImage";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Bienvenido, {user?.username} 👋</h1>
     

     
    </div>
  );
};

export default Home;
