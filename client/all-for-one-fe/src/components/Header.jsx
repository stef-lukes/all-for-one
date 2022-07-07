import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/AuthProvider";
import logo from "../assets/logo-dark-landscape.svg";
import profileIcon from "../assets/profile-icon-default.svg";

const Header = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const stringFromStorage = localStorage.getItem("all-for-one-user");
    if (!user && stringFromStorage) {
      const storedUser = JSON.parse(stringFromStorage);
      setUser(storedUser);
    }
  }, [user, setUser]);

  return (
    <header>
      <section id="header-info">
        <img id="header-logo" src={logo} alt="" />
        <div id="user">
          <p>{user ? user.user.name : ""}</p>
          <img
            className="avatar"
            src={
              user && user.user.avatarUrl ? user.user.avatarUrl : profileIcon
            }
            alt=""
          />
        </div>
      </section>
    </header>
  );
};

export default Header;
