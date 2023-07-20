import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const { setUser } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    try {
      //the response has a field name data
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      // console.log(data);
      setUser(data);
      setLoggedIn(true);
      alert("login successful");
    } catch (err) {
      console.log({ error: err });
      alert("login unsuccessful. Please try again");
    }
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mt-32">
        <h1 className="text-4xl font-extrabold text-center">Login</h1>
        <form className="max-w-md mx-auto my-5" onSubmit={login}>
          <input
            type="email"
            placeholder="yourmail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="underline text-black">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
