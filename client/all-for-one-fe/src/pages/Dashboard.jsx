import { useContext } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { UserContext } from "../contexts/AuthProvider";
import DailyLog from "../components/DailyLog";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <>
      <Header />
      <Navbar />
      <h1>Dashboard</h1>
      <img className="avatar" src={user.avatar_url} alt="" />
      <p>Hello, {user.user.name}!</p>
      <DailyLog />
      <button>Log Out</button>
    </>
  );
};

export default Dashboard;
