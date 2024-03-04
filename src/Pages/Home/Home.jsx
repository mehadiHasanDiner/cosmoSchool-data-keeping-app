import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Login from "../Login/Login";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="h-screen bg-gradient-to-r from-violet-400 to-fuchsia-400 flex justify-center items-center">
      <Login></Login>
    </div>
  );
};

export default Home;
