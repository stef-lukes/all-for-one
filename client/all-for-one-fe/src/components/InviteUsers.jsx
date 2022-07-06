import {React, useContext, useState} from 'react'
import { UserContext } from '../contexts/AuthProvider'
import { HubContext } from '../contexts/HubProvider'
import Expandible from './Expandible'

export default function InviteUsers() {
  const {hub} = useContext(HubContext)
  const {user} = useContext(UserContext)
  const [inviteeName, setInviteeName] = useState("")
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [isPrincipal, setIsPrincipal] = useState(false);
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = {
      hubAdmin: user.user.name,
      hubInvitedTo: hub.name,
      inviteeName: inviteeName,
      emailToInvite: inviteeEmail,
      additionalMessage: additionalMessage,
    };
   
  };

  return (
    <>
    <h2>InviteUsers</h2>
    <Expandible>
    <form onSubmit={handleSubmit}>
        <label aria-label="invitee name">Who are you inviting to this hub?
          <input
            id="invitee-name"
            type="text"
            value={inviteeName}
            placeholder="Enter invitee's name"
            onChange={event => setInviteeName(event.target.value)}
          />
        </label>
        <label aria-label="invitee email">What is their email address?
          <textarea
            id="invitee-email"
            name="invitee-email"
            type="email"
            value={inviteeEmail}
            placeholder="Enter invitee's email address"
            onChange={event => setInviteeEmail(event.target.value)}
          />
        </label>
        <label aria-label="additional invite message">Add any additional message to your invite here: 
          <input
            id="additional-invite-message"
            name="additional-invite-message"
            type="text"
            value={additionalMessage}
            placeholder="Write your additional message here ..."
            onChange={event => setAdditionalMessage(event.target.value)}
          />
        </label>
        <button>Invite new user</button>
      </form>
    </Expandible>
    </>
  )
}
