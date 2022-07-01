import Header from "../components/Header";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {UserContext} from "../contexts/AuthProvider";
import { loginUser } from "../utils/api";

const Login = () => {
  const { user , setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const initialValues= {email:"", password:""}

  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);

  const handleChange = (event) => {
    const {id, value} = event.target;
    setFormData((prevData) => Object.assign({}, prevData, {[id]: value }));
  };

  const handleBlur = (event) => {
    const {id, value} = event.target;
    setFormData((prevData) => Object.assign({}, prevData, {[id]: value }))
    setFormErrors(validate(formData));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
      if (Object.keys(formErrors).length === 0) {
        loginUser(formData).then((loggedInUser) => {
          setUser(loggedInUser);
        })
    }
  };
  
  useEffect(() => {
    console.log(user)
    if(user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);


  const validate = (values) => {
    const errors = {};
    const regexEmail =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!values.email) {
      errors.email = "Your email is required.";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Not a valid email address.";
    } else if (values.email !== formData.email) {
      errors.badLogin = "Invalid username or password";
    }
    if (!values.password) {
      errors.password = "Your password is required.";
    } else if (values.password !== formData.password) {
      errors.badLogin = "Invalid username or password";
    }
    return errors;
  };

  return (
    <>
      <Header />
      <h1>Login</h1>

      <form>
        <p>{formErrors.badLogin}</p>
        <label aria-label="email">
          <input
            className="form-control"
            id="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            onBlur={handleBlur}
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
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p>{formErrors.password}</p>
        </label>
        <button onClick={(e) => {handleSubmit(e)}}>Go</button>
      </form>
    </>
  );
};

export default Login;
