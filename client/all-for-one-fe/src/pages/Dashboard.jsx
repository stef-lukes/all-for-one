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
      <main>
        <Navbar />

        <div className="intro-msg">
          <h1>{`Hi ${user.user.name}!`}</h1>
          <p>
            Welcome to your <span>all for one</span> dashboard! From here you
            can add users to your hub, edit your profile and that of the person
            you care for.
          </p>
          <p>
            Below you can see your daily log, where you can post daily notes and
            activities to help keep track of the day.
          </p>
        </div>

        <DailyLog />
      </main>
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default Dashboard;
