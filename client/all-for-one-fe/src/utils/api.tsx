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
  hubCode
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
    .post("/users", { email, name, username, password, isAdmin, isPrincipal, hubCode })
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
  title,
  body,
  categories,
}: {
  user: string;
  title: string;
  body: string;
  categories: string;
}) => {
  return allForOneApi
    .post("/dailyLog", {
      user,
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
export const postLifeStory = ({
  user,
  heading,
  bodyText,
  categories,
}: {
  user: string;
  heading: string;
  bodyText: string;
  categories: string;
}) => {
  return allForOneApi
    .post("/lifeStory", {
      user,
      heading,
      bodyText,
      categories,
    })
    .then((lifeStoryEntry) => {
      return lifeStoryEntry.data;
    });
};

export const getLifeStory = () => {
  return allForOneApi.get("/lifeStory").then((lifeStory) => {
    return lifeStory.data;
  });
};

export const deleteLifeStory = (lifeStory_id: string) => {
  return allForOneApi.delete(`/lifeStory/${lifeStory_id}`);
};

export const editLifeStory = (
  lifeStory_id: string,
  {
    user,
    heading,
    bodyText,
    categories,
  }: {
    user: string;
    heading: string;
    bodyText: string;
    categories: string;
  }
) => {
  return allForOneApi
    .put(`/lifeStory/${lifeStory_id}`, { user, heading, bodyText, categories })
    .then((updatedLifeStory) => {
      return updatedLifeStory.data;
    });
};
