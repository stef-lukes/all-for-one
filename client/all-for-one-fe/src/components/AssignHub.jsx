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
    const [hubPrincipal, setHubPrincipal] = useState("")  
    
    const handleSubmit = (event) => {
      event.preventDefault();
      createHub({hubName, adminUser: user.user.email, hubPrincipal})
      .then((hubData) => {
      setHub(hubData)
      localStorage.setItem("all-for-one-hub", JSON.stringify(hubData));
      }).catch((err) => {
        if (err) {
          setHubNameCheck(`Hub creation failed. Please try again`)
        console.log(err)}
      })
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
    <section className="post-form-wrapper">
    <h2 className="white post-form-heading">Create a new hub</h2>
      <form className="post-form" onSubmit={handleSubmit}>
          <label aria-label="hub-name" className="white"> What do you want to call your hub?
          <input
            className="form-control"
            id="hub-name"
            value={hubName}
            placeholder="Enter hub name"
            onChange={updateHubName}
          />
          <p>{hubNameCheck}</p>
        </label>
        <label aria-label="hub-principal" className="white"> Who is the subject of care for this hub?
          <input
            className="form-control"
            id="hub-principal"
            value={hubPrincipal}
            placeholder="Who're we building this hub around?"
            onChange={event => setHubPrincipal(event.target.value)}
          />
        </label>
        <button disabled={Boolean(hubNameCheck)} className="log-reg-btn post-form-btn">Register Hub</button>
      </form>
    </section>
  )
}
