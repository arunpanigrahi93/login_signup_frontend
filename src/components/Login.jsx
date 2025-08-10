import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("arun@gmail.com");
  const [password, setPassword] = useState("Arun@123");
  const [isLoginForm, setIsloginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9999/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res?.data));
      navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res?.data);
      dispatch(addUser(res?.data));
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center my-25">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "LogIn" : "SignUp"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">FirstName</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">LastName</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <span className="text-red-500">{error}</span>
          </div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary rounded-lg my-5"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "LogIn" : "SignUp"}
            </button>
          </div>
          <div>
            <span>
              {!isLoginForm ? "Not registered? " : "Already registered? "}
            </span>
            <span
              onClick={() => setIsloginForm(!isLoginForm)}
              className="cursor-pointer text-blue-300"
            >
              {!isLoginForm ? "LogIn" : "SignUp"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
