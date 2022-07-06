import {React, useContext, useEffect, useState} from 'react';
import { UserContext } from '../contexts/AuthProvider';
import { HubContext } from '../contexts/HubProvider';
import { checkValidHubName, createHub } from '../utils/api';

export default function AssignHub() {
    const {user} = useContext(UserContext);
    const {setHub} = useContext(HubContext);
    const [isValidHub,setIsValidHub] = useState(false);
    const [hubName, setHubName] = useState("");
    const [hubNameCheck, setHubNameCheck] = useState("")
  
    
    const handleSubmit = (event) => {
      event.preventDefault();
      createHub({hubName, adminUser: user.user.email})
      .then((hubData) => {
      setHub(hubData)
      localStorage.setItem("all-for-one-hub", JSON.stringify(hubData));
      });
    }

    const updateHubName = (event) => {
        setHubNameCheck("")
        setHubName(event.target.value);
        checkValidHubName(hubName).then((isHubNameValid) => {
          setIsValidHub(isHubNameValid);
          if(!isValidHub){
            setHubNameCheck("Sorry, that name is in use")
          }
        })
      };

  return (
    <>
      <form className="log-reg-form" onSubmit={handleSubmit}>
          <label aria-label="hub-name"> What do you want to call your hub?
          <input
            className="form-control"
            id="hub-name"
            value={hubName}
            placeholder="Enter hubcode"
            onChange={updateHubName}
          />
          <p>{hubNameCheck}</p>
        </label>
        <button className="log-reg-btn">Register Hub</button>
      </form>
    </>
  )
}
