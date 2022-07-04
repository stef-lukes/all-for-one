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
    <page>
      <Header />
      <h1>Dashboard</h1>
      <main>
        <Navbar />
        <DailyLog className="content" />
      </main>
    </page>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default Dashboard;
