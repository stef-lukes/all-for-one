import {React, useEffect, useContext, useState} from 'react';
import { UserContext } from '../contexts/AuthProvider';
import { Navigate } from 'react-router-dom';
import { HubContext } from '../contexts/HubProvider';
import AssignHub from "../components/AssignHub"
import InviteUsers from '../components/InviteUsers';
import UserManagement from '../components/UserManagement';



export default function HubAdmin() {
    const {user, setUser} = useContext(UserContext) 
    const {hub, setHub} = useContext(HubContext)

    useEffect(() => {
        const stringFromStorage = localStorage.getItem("all-for-one-user")
        if (!user && stringFromStorage) {
          const storedUser = JSON.parse(stringFromStorage);
          console.log(storedUser, "<<<<< user from local storage")
          setUser(storedUser)
        }
      }, [])

      if (!hub) {
        return (<AssignHub/>)
      }


  return (
    <>
    <InviteUsers/>
    <UserManagement/>
    </>
  )
}
