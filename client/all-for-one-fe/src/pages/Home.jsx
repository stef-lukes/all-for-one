import { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import AuthContext, { UserContext } from "../contexts/AuthProvider";
import bgImg from "../assets/bg-img.jpg";
import logo from "../assets/logo-dark-portrait.svg";
import Login from "./Login";

const Home = () => {

  const {user, setUser} = useContext(UserContext);

  useEffect(() => {
    const stringFromStorage = localStorage.getItem("all-for-one-user")
    if (!user && stringFromStorage) {
      const storedUser = JSON.parse(stringFromStorage);
      console.log(storedUser, "<<<<< user from local storage")
      setUser(storedUser)
    }
  }, [])

  return (
    <main className="home-screen">
      <section className="welcome-container">
        <img id="logo-portrait" src={logo} alt="" />
        <h1 className="page-msg">
          Welcome to <span>all for one</span>, a social hub for sufferers of
          dementia and their carers
        </h1>
        <Login />
      </section>
    </main>
  );
};

export default Home;
