import axios from "axios";

export const allForOneApi = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const createUser = ({
  email,
  name,
  username,
  password,
  isAdmin,
  isPrincipal,
}: {
  email: string;
  name: string;
  username: string;
  password: string;
  isAdmin: boolean;
  isPrincipal: boolean;
}) => {
  return allForOneApi
    .post("/users", { email, name, username, password, isAdmin, isPrincipal })
    .then((newUser) => {
      return newUser.data;
    });
};
