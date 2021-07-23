import "../style/timeline.css";
import "../style/index.css";
import Logo from "../img/Logo.png";
import { IoChatboxOutline } from "react-icons/io5";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import { useState, useEffect } from "react";
const axios = require("axios");

function Timeline() {
  const [protest, setProtest] = useState("");
  const [totalProtest, setTotalProtest] = useState([]);

  const inputSubmit = (e) => {
    e.preventDefault();
    const postData = {
      user: JSON.parse(localStorage.getItem("user")),
      message: protest,
    };
    console.log(postData.user);
    postProtest(postData);
  };

  const postProtest = (postData) =>
    axios.post("http://localhost:4000/protest", postData).then((res) => {
      setProtest("");
      setTotalProtest(res.data.result.reverse());
    });

  const getProtest = () => {
    axios.get("http://localhost:4000/protest").then((res) => {
      setTotalProtest(res.data.result.reverse());
    });
  };

  const putLike = (id) => {
    axios.put(`http://localhost:4000/protest/like/${id}`).then((res) => {
      console.log(res.data.result);
      getProtest();
    });
  };

  const putDislike = (id) => {
    axios.put(`http://localhost:4000/protest/dislike/${id}`).then((res) => {
      console.log(res.data.result);
      getProtest();
    });
  };
  useEffect(() => {
    getProtest();
  }, []);
  return (
    <div className="timeline">
      <img className="logo" src={Logo} alt="Dio" />
      <div className="inputContainer">
        <IoChatboxOutline className="chatbox"></IoChatboxOutline>
        <form onSubmit={inputSubmit}>
          <input
            onChange={(e) => setProtest(e.target.value)}
            className="inputProtest"
            placeholder="Digite seu protesto!!!!"
            type="text"
            value={protest}
          />
        </form>
      </div>
      {totalProtest.map((protest, i) => (
        <div key={i} className="protest">
          <div className="row">
            <div className="user">
              <img className="avatar" src={protest.user.avatar} alt="" />
              <div classNam="col">{protest.user.name}</div>
            </div>

            <div className="col">
              <p className="protestText">{protest.message}</p>
            </div>
            <div className="col-2">
              <div onClick={() => putLike(protest.id)} className="like">
                <p>
                  <VscTriangleUp className="icon"></VscTriangleUp>
                  <div>{protest.like}</div>
                </p>
              </div>
              <div onClick={() => putDislike(protest.id)} className="dislike">
                <p>
                  <VscTriangleDown className="icon"></VscTriangleDown>
                  <div>{protest.dislike}</div>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
