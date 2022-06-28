import { Link } from "react-router-dom";
import Header from "../components/Header";
const Home = () => {
  return (
    <>
      <Header />
      <h1 className="page-msg">
        Welcome to all for one, a social hub for sufferers of dementia and their
        carers
      </h1>
      <div id="onboarding-links">
        <Link className="link onboarding-link" to="/register">
          Register
        </Link>
        <Link className="link onboarding-link" to="/login">
          Login
        </Link>
      </div>
    </>
  );
};

export default Home;
