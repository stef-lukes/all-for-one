import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    email: "jacknicholson@theoverlook.com",
    password: "heresjohnny",
    name: "Jack",
    avatar_url:
      "https://i.pinimg.com/originals/f5/2b/dc/f52bdc278c800b500bc42d5d8f63af93.jpg",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
