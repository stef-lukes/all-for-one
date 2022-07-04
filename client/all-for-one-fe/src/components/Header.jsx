import { useContext } from "react";
import { UserContext } from "../contexts/AuthProvider";
import logo from "../assets/logo-dark-landscape.svg";
import profileIcon from "../assets/profile-icon-default.svg";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header>
      <section id="header-info">
        <img id="header-logo" src={logo} alt="" />
        <div id="user">
          <p>{user.user.name}</p>
          <img
            className="avatar"
            src={user.user.avatar_url ? user.user.avatar_url : profileIcon}
            alt=""
          />
        </div>
      </section>
    </header>
  );
};

export default Header;
