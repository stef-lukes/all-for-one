import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    passwordConfirm: "",
    avatar_url:
      "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
