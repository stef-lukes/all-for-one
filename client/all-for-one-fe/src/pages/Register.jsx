import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../utils/api";

const Register = () => {
  const navigate = useNavigate();
  // const NAME_REGEX = /^[A-Za-z]+$/;

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
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formData));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      createUser(formData).then((newUser) => {
        console.log(newUser);
      });
      navigate("/dashboard");
    }
  }, [formErrors]);

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
            name="email"
            value={formData.email}
            placeholder="Enter your Email"
            onChange={handleChange}
            onBlur={handleChange}
          />
          <p>{formErrors.email}</p>
        </label>
        <label aria-label="Password">
          <input
            type="name"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Enter your Name"
            onChange={handleChange}
            onBlur={handleChange}
          />
          <p>{formErrors.name}</p>
        </label>
        <label aria-label="Password">
          <input
            type="username"
            id="username"
            name="username"
            value={formData.username}
            placeholder="Enter your Username"
            onChange={handleChange}
            onBlur={handleChange}
          />
          <p>{formErrors.username}</p>
        </label>
        <label aria-label="password">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Enter your Password"
            onChange={handleChange}
            onBlur={handleChange}
          />
          <p>{formErrors.password}</p>
        </label>
        <label aria-label="Confirm password">
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={formData.passwordConfirm}
            placeholder="Confirm your Password"
            onChange={handleChange}
            onBlur={handleChange}
          />
          <p>{formErrors.passwordConfirm}</p>
        </label>

        <button>Create My Account</button>
      </form>
    </>
  );
};

export default Register;
