import React, { useState, useEffect } from "react";
import { api, handleError } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Header.scss";
import "styles/views/Leaderboard.scss";
import PropTypes from "prop-types";
import cats from "styles/images/cats2.png";
import catGold from "styles/images/cat-gold.png";
import catSilver from "styles/images/cat-silver.png";
import catCopper from "styles/images/cat-copper.png";
import Header from "components/views/Header";
import { Spinner } from "components/ui/Spinner";
import useSound from "use-sound";
import btClick from "styles/sounds/click_button.mp3";
import { Bounce, ToastContainer, toast } from "react-toastify";
import BgmPlayer from "components/ui/BgmPlayer";

const Scores = ({ user }) => {
  const history = useHistory();
  return (
    <div className="leaderboard score-container">
      <div
        className="leaderboard content"
        style={{
          fontFamily: '"Joti One", cursive',
          width: "50%",
        }}
      >
        {user.username}
      </div>
      <div className="leaderboard content" style={{ width: "50%" }}>
        {user.totalScore}
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const history = useHistory();
  const [users, setUsers] = useState(null);
  const [top1, setTop1] = useState("");
  const [top2, setTop2] = useState("");
  const [top3, setTop3] = useState("");
  const notify = (message) => {
    toast.error(message);
  };

  const fetchUsers = async () => {
    try {
      const response = await api().get("/leaderboard");
      setUsers(response.data);
      const num = response.data.length;
      if (num == 1) {
        setTop1(response.data[0].username);
      } else if (num == 2) {
        setTop1(response.data[0].username);
        setTop2(response.data[1].username);
      } else {
        setTop1(response.data[0].username);
        setTop2(response.data[1].username);
        setTop3(response.data[2].username);
      }
    } catch (error) {
      const error_str = handleError(error);

      if (error_str["message"].match(/Network Error/)) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("gameId");
        localStorage.removeItem("intialTurnId");
        history.push(`/information`);
      } else if (
        error_str["status"] == 401 &&
        error_str["message"].includes("log in with correct credentials")
      ) {
        notify(
          "Please register a new account or log in with correct credentials."
        );
        localStorage.removeItem("token");
      } else {
        notify(error_str["message"]);
      }
    }
  };

  const handleClick = () => {
    fetchUsers().catch((error) => {
      const error_str = handleError(error);
      if (error_str["message"].match(/Network Error/)) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("gameId");
        localStorage.removeItem("intialTurnId");
        history.push(`/information`);
      }
    });
    history.push(`/leaderboard`);
  };

  useEffect(() => {
    fetchUsers().catch((error) => {
      const error_str = handleError(error);
      if (error_str["message"].match(/Network Error/)) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("username");
        localStorage.removeItem("gameId");
        localStorage.removeItem("intialTurnId");
        history.push(`/information`);
      }
    });
  }, []);

  // define the format of the table
  let content = <Spinner />;
  if (users) {
    content = (
      <div className="leaderboard container">
        <div className="leaderboard score-container" style={{ width: "100%" }}>
          <div className="leaderboard title">Username</div>
          <div className="leaderboard title">Total score</div>
        </div>
        <div className="leaderboard line"></div>
        <div className="leaderboard score-list">
          {users.map((user) => (
            <Scores user={user} key={user.id} />
          ))}
        </div>
      </div>
    );
  } else {
    content = (
      <div className="leaderboard container">
        <div className="leaderboard score-container" style={{ width: "100%" }}>
          <div className="leaderboard title">Username</div>
          <div className="leaderboard title">Total score</div>
        </div>
        <div className="leaderboard line"></div>
      </div>
    );
  }

  const podium = (top1, top2, top3) => (
    <div className="leaderboard cats-container">
      <div className="leaderboard cat1">
        <div className="leaderboard text">{top2}</div>
        <img
          src={catSilver}
          alt="2nd 1"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <img
          src={catSilver}
          alt="2nd 2"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </div>
      <div className="leaderboard cat1">
        <div className="leaderboard text">{top1}</div>
        <img
          src={catGold}
          alt="1st 1"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <img
          src={catGold}
          alt="1st 2"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <img
          src={catGold}
          alt="1st 3"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </div>
      <div className="leaderboard cat1">
        <div className="leaderboard text">{top3}</div>
        <img
          src={catCopper}
          alt="3rd 1"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <ToastContainer
        toastClassName="toast-style"
        position="top-center"
        transition={Bounce}
        autoClose={5000}
        closeButton={false}
        hideProgressBar={true}
        draggable={false}
      />
      <BgmPlayer />
      <div className="leaderboard content-container">
        {podium(top1, top2, top3)}
        <div className="leaderboard pic">
          <img
            src={cats}
            alt="leaderboard background cats"
            style={{ width: "447px", height: "559px", opacity: "20%" }}
          />
        </div>
        {content}
        <div className="leaderboard button-container">
          <Button
            style={{
              "background-color": "#FFFFFF",
              border: "2px solid #000000",
            }}
            onClick={() => handleClick()}
          >
            Refresh this page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
