import { useContext } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/AuthProvider";
import DailyLog from "../components/DailyLog";
import { Navigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  return user ? (
    <>
      <Header />
      <Navbar />
      <h1>Dashboard</h1>
      <img className="avatar" src={user.avatar_url} alt="" />
      <p>Hello, {user.user.name}!</p>
      <DailyLog />
      <button>Log Out</button>
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default Dashboard;
