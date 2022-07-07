import { useEffect, useState, useContext } from "react";
import { getUsers } from "../utils/api";
import DeleteDailyLogCard from "./DeleteDailyLogCard";
import cardAccent from "../assets/card-accent.svg";
import smiley from "../assets/smiley.svg";

const UserManagement = (props) => {
  const [currentUsers, setCurrentUsers] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    getUsers(props.hubName)
      .then((hubUsers) => {
        console.log(hubUsers)
        setCurrentUsers(hubUsers);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.response.data);
      });
  }, [props.hubName]);

  if (isError) {
    return <p>{isError.msg}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <ul className="daily-card-list">
        {currentUsers.map((hubUser) => {
          return (
            <li key={hubUser._id} className="card-wrapper relative">
              <img src={hubUser.avatarUrl} alt="" className="smiley" />
              <img src={cardAccent} alt="" className="card-accent" />
              <article className="post-card">

                <div className="log-post-info flex">
                  <h3 className="blue right-m10">{hubUser.name}: </h3>
                  <h4 className="red no-margin">{hubUser.email}</h4>
                </div>

                <p className="dark-grey no-margin">{hubUser.createdAt}</p>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default UserManagement;
