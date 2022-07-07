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
  hubCode,
}: {
  email: string;
  name: string;
  username: string;
  password: string;
  isAdmin: boolean;
  isPrincipal: boolean;
  hubCode: string;
}) => {
  return allForOneApi
    .post("/users", {
      email,
      name,
      username,
      password,
      isAdmin,
      isPrincipal,
      hubCode,
    })
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
      return loggedInUser.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createDailyLogEntry = ({
  user,
  name,
  avatarUrl,

  title,
  body,
  categories,
}: {
  user: string;
  name: string;
  avatarUrl: string;

  title: string;
  body: string;
  categories: string;
}) => {
  return allForOneApi
    .post("/dailyLog", {
      user,
      name,
      avatarUrl,
      title,
      body,
      categories,
    })
    .then((newLogEntry) => {
      return newLogEntry.data;
    });
};

export const getDailyLog = () => {
  return allForOneApi.get("/dailyLog").then((dailyLog) => {
    return dailyLog.data;
  });
};

export const deleteDailyLog = (logEntry_id: string) => {
  return allForOneApi.delete(`/dailyLog/${logEntry_id}`);
};

//lifeStory

export const getLifeStory = (category: String) => {
  return allForOneApi
    .get("/lifeStory", { params: { category } })
    .then((lifeStory) => {
      return lifeStory.data;
    });
};

export const deleteLifeStory = (lifeStory_id: string) => {
  return allForOneApi.delete(`/lifeStory/${lifeStory_id}`);
};

export const editLifeStory = (_id: string, answer: string) => {
  return allForOneApi
    .put(`/lifeStory/${_id}`, { _id, answer })
    .then((updatedLifeStoryAnswer) => {
      return updatedLifeStoryAnswer.data;
    });
};

//Hub admin functions

export const checkValidHubName = (hubName: string) => {
  return allForOneApi.post("/hub/hubnames", { hubName }).then((hubWithName) => {
    // returns true if hub name is ok to use
    return hubWithName.data ? false : true;
  });
};

export const createHub = ({
  hubName,
  adminUser,
  hubPrincipal,
}: {
  hubName: string;
  adminUser: string;
  hubPrincipal: string;
}) => {
  return allForOneApi
    .post("/hub", { hubName, adminUser, hubPrincipal })
    .then((newHub) => {
      return newHub.data;
    });
};
