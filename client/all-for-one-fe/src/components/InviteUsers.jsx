import {React, useContext, useState} from 'react'
import { UserContext } from '../contexts/AuthProvider'
import { HubContext } from '../contexts/HubProvider'
import Expandible from './Expandible'
import { sendInviteEmail } from '../utils/api'

export default function InviteUsers() {
  const {hub} = useContext(HubContext)
  const {user} = useContext(UserContext)
  const [inviteeName, setInviteeName] = useState("")
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [emailSuccessMessage, setEmailSuccessMessage] = useState(null)
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = {
      hubAdmin: user.user.name,
      hubInvitedTo: hub.name,
      hubPrincipal: hub.hubPrincipal,
      inviteeName: inviteeName,
      emailToInvite: inviteeEmail,
      additionalMessage: additionalMessage,
    };
    sendInviteEmail(dataToSend).then((emailSent) => {
      setInviteeEmail("")
      setAdditionalMessage("")
      setInviteeName("")
      setEmailSuccessMessage("Invite email sent successfully")
      setTimeout(() => {
        setEmailSuccessMessage(null)
      }, 3000)
      console.log(emailSent)
    }).catch(err => {console.log(err)})
   
  };

  return (
    <section className="post-form-wrapper">
    <h2 className="white post-form-heading">InviteUsers</h2>
    <Expandible>
    <form onSubmit={handleSubmit}>
        <label aria-label="invitee name" className="white">Who are you inviting to this hub?
          <input
            id="invitee-name"
            type="text"
            value={inviteeName}
            placeholder="Enter invitee's name"
            onChange={event => setInviteeName(event.target.value)}
          />
        </label>
        <label aria-label="invitee email" className="white">What is their email address?
          <textarea
            id="invitee-email"
            name="invitee-email"
            type="email"
            value={inviteeEmail}
            placeholder="Enter invitee's email address"
            onChange={event => setInviteeEmail(event.target.value)}
          />
        </label>
        <label aria-label="additional invite message" className="white">Add any additional message to your invite here: 
          <input
            id="additional-invite-message"
            name="additional-invite-message"
            type="text"
            value={additionalMessage}
            placeholder="Write your additional message here ..."
            onChange={event => setAdditionalMessage(event.target.value)}
          />
        </label>
        <button className="log-reg-btn post-form-btn">Invite new user</button>
      </form>
      {emailSuccessMessage ? <h2 className="white post-form-heading">{emailSuccessMessage}</h2> : null }
    </Expandible>
    </section>
  )
}
