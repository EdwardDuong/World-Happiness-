import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import img from "../../Images/HomeImage.jpg";
import { Switch, Route, useHistory } from "react-router";
const URL = "http://131.181.190.87:3000/user/login";

//Initialize a function for rendering the login form
const Login = ({ tokenSetter, setUsername }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [formDisplay, setFormDisplay] = useState(true);
  const history = useHistory();
  const [logedIn, setLogin] = useState(true);
  const onLogin = async (e) => {
    try {
      setFormDisplay(false);
      setLogin(false);
      const token = await axios.post(URL, {
        email: form.email,
        password: form.password,
      });
      history.push("/");
      tokenSetter(token.data.token);
      setUsername(form.email);
    } catch (e) {
      window.alert(e.response.data.message);
    }
  };
  const handleValueChange = (e, field) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    logedIn &&
    formDisplay && (
      <div>
        <form className="Login">
          Email:{" "}
          <input
            type="text"
            name="gmail"
            onChange={(e) => handleValueChange(e, "email")}
            value={form.email}
          />
          Password:{" "}
          <input
            type="password"
            name="password"
            onChange={(e) => handleValueChange(e, "password")}
            value={form.password}
          />
          <input type="button" onClick={onLogin} value="Login" />
        </form>
        <img
          src={img}
          width="1200"
          height="600"
          style={{ marginTop: "30px" }}
        ></img>
      </div>
    )
  );
};

export default Login;
