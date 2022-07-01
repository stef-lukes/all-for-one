import Header from "../components/Header";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../utils/api";
import { UserContext } from "../contexts/AuthProvider";

const Register = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const initalValues = {
    email: "",
    name: "",
    username: "",
    password: "",
    passwordConfirm: "",
    isAdmin: true,
    isPrincipal: false,
  };

  const [formData, setFormData] = useState(initalValues);
  const [formErrors, setFormErrors] = useState({ initalValues });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => Object.assign({}, prevData, { [id]: value }));
  };

  const handleBlur = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => Object.assign({}, prevData, { [id]: value }));
    setFormErrors(validate(formData));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      createUser(formData).then((newUser) => {
        if (newUser) {
          setUser(newUser);
          navigate("/dashboard");
        }
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    const regexEmail =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const regexName = /^[a-zA-Z\s]*$/;
    if (!values.email) {
      errors.email = "Your email is required.";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Not a valid email address.";
    }
    if (!values.name) {
      errors.name = "Your name is required.";
    } else if (!regexName.test(values.name)) {
      errors.name = "Name cannot contain any numbers or special characters.";
    }
    if (!values.username) {
      errors.name = "Username is required.";
    }
    if (!values.password) {
      errors.password = "Your password is required.";
    }
    if (!values.passwordConfirm) {
      errors.passwordConfirm = "Please confirm your password.";
    } else if (values.passwordConfirm !== values.password) {
      errors.passwordConfirm = "Your password does not match!";
    }
    return errors;
  };

  return (
    <>
      <Header />
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label aria-label="Email">
          <input
            id="email"
            value={formData.email}
            placeholder="Enter your Email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>{formErrors.email}</p>
        </label>
        <label aria-label="Password">
          <input
            type="name"
            id="name"
            value={formData.name}
            placeholder="Enter your Name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>{formErrors.name}</p>
        </label>
        <label aria-label="Password">
          <input
            type="username"
            id="username"
            value={formData.username}
            placeholder="Enter your Username"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>{formErrors.username}</p>
        </label>
        <label aria-label="password">
          <input
            type="password"
            id="password"
            value={formData.password}
            placeholder="Enter your Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>{formErrors.password}</p>
        </label>
        <label aria-label="Confirm password">
          <input
            type="password"
            id="passwordConfirm"
            value={formData.passwordConfirm}
            placeholder="Confirm your Password"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>{formErrors.passwordConfirm}</p>
        </label>

        <button>Create My Account</button>
      </form>
    </>
  );
};

export default Register;
