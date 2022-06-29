import { useContext } from "react";
import Header from "../components/Header";
import AuthContext from "../contexts/AuthProvider";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <Header />
      <h1>Dashboard</h1>
      <img className="avatar" src={auth.avatar_url} alt="" />
      <p>Logged in as {auth.name}</p>
    </>
  );
};

export default Dashboard;
