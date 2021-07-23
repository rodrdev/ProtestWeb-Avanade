import "../style/login.css";
import { useState } from "react";
import { VscGithubAlt } from "react-icons/vsc";
import Logo from "../img/Logo.png";
import { Link, Redirect } from "react-router-dom";
const axios = require("axios");

function Login() {
  const [github, setGithub] = useState();

  const gitName = () => {
    axios.get(`https://api.github.com/users/${github}`).then((res) => {
      const user = {
        name: res.data.name,
        avatar: res.data.avatar_url,
      };

      localStorage.setItem("user", JSON.stringify(user));
    });
  };

  return (
    <>
      <div className="centered">
        <div className="container">
          <div className="logo">
            <img src={Logo} alt="Dio" />
          </div>
          <form>
            <div className="inputContainer">
              <input
                onChange={(e) => setGithub(e.target.value)}
                className="inputLogin"
                type="text"
                placeholder="Digite seu Github"
              />

              <VscGithubAlt className="github"></VscGithubAlt>
            </div>
            <div onClick={gitName}>
              <Link to="/timeline">
                <button className="btn">Entrar</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
