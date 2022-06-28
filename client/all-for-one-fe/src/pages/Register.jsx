import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
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

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <>
      <Header />
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={email}
          placeholder="Enter your Email"
          onChange={onChange}
          required
        />
        <input
          type="name"
          className="form-control"
          id="name"
          name="name"
          value={name}
          placeholder="Enter your Name"
          onChange={onChange}
          required
        />
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={password}
          placeholder="Enter your Password"
          onChange={onChange}
          required
        />
        <input
          type="password"
          className="form-control"
          id="passwordConfirm"
          name="passwordConfirm"
          value={passwordConfirm}
          placeholder="Confirm your Password"
          onChange={onChange}
          required
        />
        <button>Create My Account</button>
      </form>
    </>
  );
};

export default Register;
