import Header from "../components/Header";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthProvider";

const Login = () => {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();
  const initalValues = {
    email: "",
    password: "",
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
    console.log(formData);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0) {
      navigate("/dashboard");
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regexEmail =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!values.email) {
      errors.email = "Your email is required.";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Not a valid email address.";
    } else if (values.email !== auth.email) {
      errors.badLogin = "Invalid username or password";
    }
    if (!values.password) {
      errors.password = "Your password is required.";
    } else if (values.password !== auth.password) {
      errors.badLogin = "Invalid username or password";
    }
    return errors;
  };

  return (
    <>
      <Header />
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <p>{formErrors.badLogin}</p>
        <label aria-label="email">
          <input
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            onBlur={handleChange}
          />
          <p>{formErrors.email}</p>
        </label>
        <label aria-label="password">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
            onBlur={handleChange}
          />
          <p>{formErrors.password}</p>
        </label>

        <button>Go</button>
      </form>
    </>
  );
};

export default Login;
