import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const initalValues = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initalValues);
  const [formErrors, setFormErrors] = useState({ initalValues });
  const [isSubmit, setIsSubmit] = useState(false);

  // const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
    setFormErrors(validate(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formData);
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
    }
    if (!values.password) {
      errors.password = "Your password is required.";
    }
    return errors;
  };

  return (
    <>
      <Header />
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label aria-label="email">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
            //required
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
            //required
          />
          <p>{formErrors.password}</p>
        </label>

        <button>Go</button>
      </form>
    </>
  );
};

export default Login;
