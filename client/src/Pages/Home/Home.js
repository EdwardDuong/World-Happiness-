import React, { useState, useEffect } from "react";
import Register from "../Register/Register";
import Ranking from "../../Components/Ranking";
import Search from "../../Components/Search";
import Factor from "../../Components/Factor";
import "./Home.css";
import Login from "../Login/Login.js";
import { Switch, Route, useHistory } from "react-router";
import video from "../../Images/mainpage.mp4";
const Home = () => {
  const [token, setToken] = useState(null);
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [, reset] = useState();

  //Set into non after user log out
  const handleLogOut = () => {
    setToken(null);
    setUsername(null);
    history.push("/");
  };

  console.log(history);

  //Checking token when user want to use the factor
  const changeLocation = (location, token) => {
    if (token) {
      window.alert("You need to log out first");
      return;
    }
    history.push(`${location}`);
    reset({});
  };

  return (
    <div className="view">
      <div className="view-container">
        <div className="Navigation-bar">
          <h5 onClick={() => changeLocation("/ranking")}>Ranking</h5>
          <h5 onClick={() => changeLocation("/search")}>Search</h5>
          <h5 onClick={() => changeLocation("/factors")}>Factors</h5>
          <h5 onClick={() => changeLocation("/login", token)}>Login</h5>
          <h5 onClick={() => changeLocation("/register", token)}> Register</h5>
        </div>
        <div className="center-items">
          <h2> The World Happiness Ranking</h2>
          {history.location.pathname === "/" && (
            <div>
              <h2> Start navigating to use this application</h2>
              <video
                width="1000"
                height="550"
                autoplay="true"
                loop="true"
                controls="true"
              >
                <source src={video} />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
        <div className="userInfo">
          {username && <h5>{username}</h5>}
          {token && <button onClick={handleLogOut}>LOG OUT</button>}
        </div>
        <Switch>
          <Route path="/ranking">
            <Ranking />
          </Route>
          <Route path="/login">
            {" "}
            <Login tokenSetter={setToken} setUsername={setUsername} />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/factors">
            <Factor token={token} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </div>
  );
};
export default Home;
