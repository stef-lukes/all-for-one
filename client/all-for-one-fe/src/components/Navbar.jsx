import { Link } from "react-router-dom";
import home from "../assets/home.svg";
import story from "../assets/story.svg";
import family from "../assets/family.svg";
import logout from "../assets/logout.svg";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/AuthProvider";

const Navbar = () => {
  const {user, setUser} = useContext(UserContext);

  const handleClick = () => {
    localStorage.removeItem("all-for-one-user");
    setUser(null);
    Navigate("/")
  }

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
      <Link className="nav-link" to="/familytree">
        <img className="nav-icon" src={family} alt="" />
        family
      </Link>
      <Link className="nav-link" to="/">
        <img className="nav-icon" src={logout} alt="" onClick={handleClick}/>
        logout
      </Link>
    </nav>
  );
};
export default Navbar;
