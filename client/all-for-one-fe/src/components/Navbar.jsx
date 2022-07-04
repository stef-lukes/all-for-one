import { Link } from "react-router-dom";
import home from "../assets/home.svg";
import story from "../assets/story.svg";
import family from "../assets/family.svg";
import logout from "../assets/logout.svg";

const Navbar = () => {
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
        <img className="nav-icon" src={logout} alt="" />
        logout
      </Link>
    </nav>
  );
};
export default Navbar;
