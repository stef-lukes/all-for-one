import Header from "../components/Header";
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/AuthProvider";
import { loginUser } from "../utils/api";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };

  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setFormErrors({
        ...formErrors,
        required: "Please fill in all form fields!",
      });
    }
    if (Object.keys(formErrors).length === 0) {
      loginUser(formData).then((loggedInUser) => {
        setUser(loggedInUser);
        navigate("/dashboard");
      });
    }
  };

  const validate = (values) => {
    const errors = {};
    const regexEmail =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!regexEmail.test(values.email)) {
      errors.email = "Not a valid email address.";
    }
    return errors;
  };

  return (
    <>
      <form className="log-reg-form" onSubmit={handleSubmit}>
        <p>{formErrors.required}</p>
        <label aria-label="email">
          <input
            className="form-control"
            id="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={updateFormData}
            onBlur={handleValidation}
          />
          <p>{formErrors.email}</p>
        </label>
        <label aria-label="password">
          <input
            type="password"
            className="form-control"
            id="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={updateFormData}
            onBlur={handleValidation}
          />
        </label>
        <button className="log-reg-btn">Sign In</button>
        <Link className="log-reg-link-home" to="/register">
          Not a member? <span>Register</span>
        </Link>
      </form>
    </>
  );
};

export default Login;
