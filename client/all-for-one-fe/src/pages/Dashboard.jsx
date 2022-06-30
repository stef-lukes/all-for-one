import { useContext } from "react";
import Header from "../components/Header";
import {UserContext} from "../contexts/AuthProvider";
import DailyLogEntry from "./DailyLogEntry";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <>
      <Header />
      <h1>Dashboard</h1>
      <img className="avatar" src={user.avatar_url} alt="" />
      <p>Hello, {user.user.name}!</p>
      <DailyLogEntry />
    </>
  );
};

export default Dashboard;
