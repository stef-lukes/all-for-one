import {React, useEffect, useContext} from 'react';
import { UserContext } from '../contexts/AuthProvider';
import { HubContext } from '../contexts/HubProvider';
import AssignHub from "../components/AssignHub"
import InviteUsers from '../components/InviteUsers';
import UserManagement from '../components/UserManagement';
import Header from '../components/Header';
import Navbar from '../components/Navbar';



export default function HubAdmin() {
    const {user, setUser} = useContext(UserContext) 
    const {hub, setHub} = useContext(HubContext)

    useEffect(() => {
        const stringUserFromStorage = localStorage.getItem("all-for-one-user")
        if (!user && stringUserFromStorage) {
          const storedUser = JSON.parse(stringUserFromStorage);
          setUser(storedUser)
        }
        const stringHubFromStorage = localStorage.getItem("all-for-one-hub")
            if (!hub && stringHubFromStorage) {
              const storedHub = JSON.parse(stringHubFromStorage);
              setHub(storedHub)
            }
      }, [user, hub, setUser, setHub])

  return (
    <>
    <Header />
      <main>
        <Navbar />
        {!hub ? <AssignHub/> : <h1>{hub.hubPrincipal}'s Hub: {hub.hubName}</h1> }
        <InviteUsers/>
        {/* <UserManagement/> */}
    </main>
    </>
  )
}
