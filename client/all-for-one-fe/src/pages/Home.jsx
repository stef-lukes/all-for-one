import { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import AuthContext from "../contexts/AuthProvider";
import bgImg from "../assets/bg-img.jpg";

const Home = () => {
  return (
    <main className="bg-overlay">
      <img className="bg-img" src={bgImg} alt="" />
      <section className="welcome-container">
        <Header />
        <h1 className="page-msg">
          Welcome to all for one, a social hub for sufferers of dementia and
          their carers
        </h1>
        <div id="onboarding-links">
          <Link className="link onboarding-link" to="/register">
            Register
          </Link>
          <Link className="link onboarding-link" to="/login">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
