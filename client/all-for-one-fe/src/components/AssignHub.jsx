import {React, useEffect, useContext, useState} from 'react';
import { UserContext } from '../contexts/AuthProvider';
import { HubContext } from '../contexts/HubProvider';

export default function AssignHub() {
    

    const [formData, setFormData] = useState();

    const handleSubmit = () => {

    }

    const updateFormData = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => {return {...prevData, [id]: value }});
      };

  return (
    <>
      <form className="log-reg-form" onSubmit={handleSubmit}>
          <label aria-label="hub-code">
          <input
            className="form-control"
            id="hub-code"
            value={formData.email}
            placeholder="Enter hubcode"
            onChange={updateFormData}
          />
        </label>
        <label aria-label="password">
          <input
            type="password"
            className="form-control"
            id="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={updateFormData}
          />
        </label>
        <button className="log-reg-btn">Sign In</button>
        <Link className="log-reg-link-home" to="/register">
          Not a member? <span>Register</span>
        </Link>
      </form>
    </>
  )
}
