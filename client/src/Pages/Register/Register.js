import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import "../Home/Home.js";
import { Switch, Route, useHistory } from "react-router";
import video from "../../Images/search.mp4";
const URL = "http://131.181.190.87:3000/user/register";

//Initialize a function for rendering the register
const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [formDisplay, setFormDisplay] = useState(true);
  const history = useHistory();
  //Request registering user
  const handleSubmit = async () => {
    try {
      const res = await axios.post(URL, {
        email: form.email,
        password: form.password,
      });
      setFormDisplay(false);
      window.alert("Register successful, please navigate to login");
      history.push("/login");
    } catch (e) {
      window.alert(e.response.data.message);
    }
  };

  //Handle value
  const handleValueChange = (e, field) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      {formDisplay && (
        <>
          <form className="" id="RegisterForm">
            Email:{" "}
            <input
              type="text"
              name="fname"
              onChange={(e) => handleValueChange(e, "email")}
              value={form.email}
            />
            Password:{" "}
            <input
              type="password"
              name="lname"
              onChange={(e) => handleValueChange(e, "password")}
              value={form.password}
            />
            <input type="button" onClick={handleSubmit} value="Submit" />
          </form>
          <video width="1000" height="600" autoplay="true" loop="true">
            <source src={video} />
            Your browser does not support the video tag.
          </video>
        </>
      )}
    </div>
  );
};

export default Register;
