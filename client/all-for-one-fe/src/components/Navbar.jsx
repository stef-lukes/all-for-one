import { Link } from "react-router-dom";
import home from "../assets/home.svg";
import story from "../assets/story.svg";
import hub from "../assets/hub-icon.svg";
import logout from "../assets/logout.svg";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/AuthProvider";
import { HubContext } from "../contexts/HubProvider";

const Navbar = () => {
  const { setUser } = useContext(UserContext);
  const { setHub } = useContext(HubContext);

  const handleClick = () => {
    localStorage.removeItem("all-for-one-user");
    localStorage.removeItem("all-for-one-hub");
    setUser(null);
    setHub(null);
    Navigate("/");
  };

  return (
    <nav>
      <Link className="nav-link" to="/dashboard">
        <img className="nav-icon" src={home} alt="" />
        home
      </Link>
      <Link className="nav-link" to="/lifestory">
        <img className="nav-icon" src={story} alt="" />
        story
      </Link>
      <Link className="nav-link" to="/hub">
        <img className="nav-icon" src={hub} alt="" />
        hub
      </Link>
      <Link className="nav-link" to="/">
        <img className="nav-icon" src={logout} alt="" onClick={handleClick} />
        logout
      </Link>
    </nav>
  );
};
export default Navbar;
