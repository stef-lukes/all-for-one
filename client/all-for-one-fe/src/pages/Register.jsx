import Header from "../components/Header";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  const { email, name, password, passwordConfirm } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Header />
      <h1>Register</h1>
      <form>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={email}
          placeholder="Enter your Email"
          onChange={onChange}
        />
        <input
          type="name"
          className="form-control"
          id="name"
          name="name"
          value={name}
          placeholder="Enter your Name"
          onChange={onChange}
        />
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={password}
          placeholder="Enter your Password"
          onChange={onChange}
        />
        <input
          type="password"
          className="form-control"
          id="passwordConfirm"
          name="passwordConfirm"
          value={passwordConfirm}
          placeholder="Confirm your Password"
          onChange={onChange}
        />
        <button>Create My Account</button>
      </form>
    </>
  );
};

export default Register;
