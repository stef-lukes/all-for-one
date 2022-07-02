import Header from "../components/Header";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../utils/api";
import { UserContext } from "../contexts/AuthProvider";
import bgImg from "../assets/bg-img.jpg";
import logo from "../assets/logo-dark-portrait.svg";

const Register = () => {
  const { setUser } = useContext(UserContext);
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

  // FROM STEF:
  // On change we update the formData values with the input values
  const updateFormData = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  // FROM STEF:
  // On blur we check if the inputs are valid ie: is valid email, name has no nums or special chars and both password fields match
  const handleValidation = (event) => {
    setFormErrors(validate(formData));
  };

  // FROM STEF:
  // On submit we check that all required fields are filled and that there are no other errors
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !formData.email ||
      !formData.name ||
      !formData.username ||
      !formData.password
    ) {
      setFormErrors({
        ...formErrors,
        required: "Please fill in all form fields!",
      });
    } else if (!formData.passwordConfirm) {
      setFormErrors({
        ...formErrors,
        passwordConfirm: "Please confirm your password.",
      });
    }

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
    if (!regexEmail.test(values.email)) {
      errors.email = "Not a valid email address.";
    }
    if (!regexName.test(values.name)) {
      errors.name = "Name cannot contain any numbers or special characters.";
    }
    if (values.passwordConfirm !== values.password) {
      errors.passwordConfirm = "Your password does not match!";
    }
    return errors;
  };

  return (
    <main className="bg-overlay">
      <img className="bg-img" src={bgImg} alt="" />
      <section className="welcome-container">
        <img id="logo-portrait" src={logo} alt="" />
        <h1 className="page-msg">
          Register below to begin saving and sharing memories together!
        </h1>
        <form className="log-reg-form" onSubmit={handleSubmit}>
          <label aria-label="Email">
            <input
              id="email"
              value={formData.email}
              placeholder="Enter your Email"
              onChange={updateFormData}
              onBlur={handleValidation}
            />
            <p>{formErrors.email}</p>
          </label>
          <label aria-label="Password">
            <input
              type="name"
              id="name"
              value={formData.name}
              placeholder="Enter your Name"
              onChange={updateFormData}
              onBlur={handleValidation}
            />
            <p>{formErrors.name}</p>
          </label>
          <label aria-label="Password">
            <input
              type="username"
              id="username"
              value={formData.username}
              placeholder="Enter your Username"
              onChange={updateFormData}
              onBlur={handleValidation}
            />
            <p>{formErrors.username}</p>
          </label>
          <label aria-label="password">
            <input
              type="password"
              id="password"
              value={formData.password}
              placeholder="Enter your Password"
              onChange={updateFormData}
              onBlur={handleValidation}
            />
            <p>{formErrors.password}</p>
          </label>
          <label aria-label="Confirm password">
            <input
              type="password"
              id="passwordConfirm"
              value={formData.passwordConfirm}
              placeholder="Confirm your Password"
              onChange={updateFormData}
              onBlur={handleValidation}
            />
            <p>{formErrors.passwordConfirm}</p>
          </label>
          <p>{formErrors.required}</p>
          <button className="log-reg-btn">Create My Account</button>
          <Link className="log-reg-link-home" to="/">
            Already a member? <span>Sign In</span>
          </Link>
        </form>
      </section>
    </main>
  );
};

export default Register;
