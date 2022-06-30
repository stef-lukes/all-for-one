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

export const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return allForOneApi
    .post("/users/login", { email, password })
    .then((loggedInUser) => {
      console.log(loggedInUser, "in api");
      return loggedInUser.data.user;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createDailyLogEntry = ({
  user,
  activityName,
  bodyText,
  categories,
  colour,
  order,
  isRecurring,
}: {
  user: string;
  activityName: string;
  bodyText: string;
  categories: string;
  colour: string;
  order: number;
  isRecurring: boolean;
}) => {
  return allForOneApi
    .post("/dailyLog", {
      user,
      activityName,
      bodyText,
      categories,
      colour,
      order,
      isRecurring,
    })
    .then((newLogEntry) => {
      return newLogEntry.data;
    });
};
