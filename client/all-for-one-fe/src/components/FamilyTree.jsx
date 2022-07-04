import { useContext } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { UserContext } from "../contexts/AuthProvider";
const FamilyTree = () => {
  const { user } = useContext(UserContext);
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
