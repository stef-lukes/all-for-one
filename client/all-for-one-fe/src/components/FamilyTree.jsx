import { useContext, useEffect } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { UserContext } from "../contexts/AuthProvider";
const FamilyTree = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const stringFromStorage = localStorage.getItem("all-for-one-user")
    if (!user && stringFromStorage) {
      const storedUser = JSON.parse(stringFromStorage);
      console.log(storedUser, "<<<<< user from local storage")
      setUser(storedUser)
    }
  }, [])
  console.log({ user });
  return (
    <>
      <Header />
      <Navbar />
      <h1>Family Tree</h1>
    </>
  );
};
export default FamilyTree;
