import axios from 'axios';

export const allForOneApi = axios.create({
    baseURL : "http://localhost:5000/api"
})

export const createUser = (
    {email, username, password, isAdmin, isPrincipal} : 
    {email : string; username: string, password:string, isAdmin:boolean, isPrincipal: boolean}
    ) => {
 
        return allForOneApi.post("/users", {email, username, password, isAdmin, isPrincipal}).then((newUser) => {
            return newUser;
        })
}
