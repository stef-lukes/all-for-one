import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link className="link" to="/dashboard">
        Home
      </Link>
      <Link className="link" to="/lifestory">
        My Story
      </Link>
      <Link className="link" to="/familytree">
        Family Tree
      </Link>
    </nav>
  );
};
export default Navbar;
