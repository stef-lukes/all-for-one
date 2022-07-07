import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import DateTime from "../components/DateTime";
import { UserContext } from "../contexts/AuthProvider";
import DailyLog from "../components/DailyLog";
import { Navigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [hasLocalUser, setHasLocalUser] = useState();

  useEffect(() => {
    const stringFromStorage = localStorage.getItem("all-for-one-user");
    if (!user && stringFromStorage) {
      const storedUser = JSON.parse(stringFromStorage);
      console.log(storedUser, "<<<<< user from local storage");
      setUser(storedUser);
    }
  }, []);

  return user ? (
    <>
      <Header />

      <main>
        <Navbar />

        <article className="intro-msg">
          <h1>{`Hi ${user.user.name}!`}</h1>
          <p>
            Welcome to your <span className="bold blue">all for one</span>{" "}
            <span className="red bold">dashboard</span>! From here you can add
            users to your hub, edit your profile and that of the person you care
            for.
          </p>
          <p>
            Below you can see your daily log, where you can post daily notes and
            activities to help keep track of the day.
          </p>
        </article>

        <DailyLog />
      </main>
    </>
  ) : null;
};

export default Dashboard;
