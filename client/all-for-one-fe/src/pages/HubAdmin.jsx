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
        const stringFromStorage = localStorage.getItem("all-for-one-user")
        if (!user && stringFromStorage) {
          const storedUser = JSON.parse(stringFromStorage);
          setUser(storedUser)
        }
      }, [user, setUser])

      useEffect(() => {
        const stringFromStorage = localStorage.getItem("all-for-one-hub")
            if (!hub && stringFromStorage) {
              const storedHub = JSON.parse(stringFromStorage);
              setHub(storedHub)
            }
          }, [hub, setHub])

  return (
    <>
      <main>
        <Navbar />
        {!hub ? <AssignHub/> : null }
        <InviteUsers/>
        <UserManagement/>
    </main>
    </>
  )
}
