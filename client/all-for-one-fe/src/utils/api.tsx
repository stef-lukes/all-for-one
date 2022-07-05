import axios from "axios";

export const allForOneApi = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { Authenticatin: "Bearer $accessToken}" },
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

export const getLifeStory = (category: String) => {
  return allForOneApi
    .get("/lifeStory", { params: { category } })
    .then((lifeStory) => {
      console.log(lifeStory.data, "lifeStory.data");
      return lifeStory.data;
    });
};

export const deleteLifeStory = (lifeStory_id: string) => {
  return allForOneApi.delete(`/lifeStory/${lifeStory_id}`);
};

export const editLifeStory = (
  qaID: string,
  {
    answer,
  }: {
    answer: string;
  }
) => {
  return allForOneApi
    .put(`/lifeStory/${qaID}`, { answer })
    .then((updatedLifeStoryAnswer) => {
      return updatedLifeStoryAnswer.data;
    });
};
