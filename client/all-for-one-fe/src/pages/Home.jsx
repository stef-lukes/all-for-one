import { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import AuthContext from "../contexts/AuthProvider";
import bgImg from "../assets/bg-img.jpg";
import logo from "../assets/logo-dark-portrait.svg";
import Login from "./Login";

const Home = () => {
  return (
    <main className="bg-overlay">
      <img className="bg-img" src={bgImg} alt="" />
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
