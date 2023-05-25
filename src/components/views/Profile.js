import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
import "styles/views/Profile.scss";
import User from "models/User";
import { useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from "components/ui/Spinner";
import cat_left from "styles/images/cat_left.png";
// import showPwdIcon from "styles/images/svg/show-password.svg";
// import hidePwdIcon from "styles/images/svg/hide-password.svg";
import hidePwdIcon from "styles/images/hide-password.png";
import showPwdIcon from "styles/images/show-password.png";
import PropTypes from "prop-types";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import { Button } from "components/ui/Button";
import BgmPlayer from "components/ui/BgmPlayer";
import { Bounce, ToastContainer, toast } from "react-toastify";

const FormField = (props) => {
  return (
    <div className="profile field">
      <label className="profile label">{props.label}</label>
      <input
        maxLength="30"
        className="profile input"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        disabled={props.disabled}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

const Profile = () => {
  const history = useHistory();
  const [userProfile, setUserProfile] = useState({
    id: "",
    username: "",
    status: "",
    bestScore: "",
    totalScore: "",
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const visitIdStr = useParams();
  const [notification, setNotification] = useState("");

  const visitId = parseInt(visitIdStr["id"]);
  const editable = localStorage.getItem("id") === visitIdStr["id"];

  useEffect(() => {
    const fetchProfile1 = async () => {
      try {
        const response = await api().get(`/users/${visitId}`);
        const userProfile1 = new User(response.data);
        setUserProfile(userProfile1);
      } catch (error) {
        const error_str = handleError(error);
        if (error_str["message"].match(/Network Error/)) {
          localStorage.removeItem("token");
          localStorage.removeItem("id");
          localStorage.removeItem("username");
          localStorage.removeItem("gameId");
          localStorage.removeItem("intialTurnId");
          history.push(`/information`);
        } else if (error_str["status"] == 409) {
          setNotification(
            "There exists a user with the username you have entered. Please enter another one."
          );
        } else if (
          error_str["status"] == 401 &&
          error_str["message"].includes("log in with correct credentials")
        ) {
          notify(
            "Please register a new account or log in with correct credentials."
          );
          localStorage.removeItem("token");
        } else {
          setNotification(error_str["message"]);
        }
      }
    };
    fetchProfile1().catch((error) => {
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
  }, [
    visitId,
    isEditing,
    userProfile.username,
    userProfile.status,
    userProfile.bestScore,
    userProfile.totalScore,
    userProfile.id,
  ]);
  const notify = (message) => {
    toast.error(message);
  };
  const handleUpdateProfile = async () => {
    const newUsername = username || "";
    const newPassword = password || ""; // if didn't update password

    const requestBody = JSON.stringify({
      id: visitId,
      username: newUsername,
      password: newPassword,
    });
    try {
      await api().put(`/users/${visitId}`, requestBody);
      localStorage.setItem("username", newUsername);
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
        error_str["status"] == 409 &&
        error_str["message"].includes("Password")
      ) {
        setNotification(
          "Password is the same as before, please enter a different one."
        );
      } else if (error_str["status"] == 409) {
        setNotification(
          "There exists a user with the username you have entered. Please enter another one."
        );
      } else {
        setNotification(error_str["message"]);
      }
    }
    history.push(`/profile/${visitId}`);
    setIsEditing(false);
    setUsername("");
    setPassword("");
  };
  const cancelEdit = () => {
    setIsEditing(false);
    setUsername("");
    setPassword("");
    setNotification("");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setUsername("");
    setPassword("");
    setNotification("");
  };

  const ShowAndHidePassword = () => {
    return (
      <div className="password wrapper">
        <label className="profile label">{"Password"}</label>
        <input
          maxLength="30"
          className="password input"
          type={isShowPwd ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setNotification("");
          }}
        />
        <img
          className="password icon"
          alt=""
          src={isShowPwd ? hidePwdIcon : showPwdIcon}
          onClick={() => setIsShowPwd((prevState) => !prevState)}
        />
      </div>
    );
  };
  const goToFriends = () => {
    history.push(`/friend`);
  };

  const guestProfile = () => {
    const content = (
      <div className="profile container">
        <div className="profile form">
          <FormField
            label="Username"
            value={userProfile.username}
            disabled={true}
          />
          <FormField
            label="Status"
            value={userProfile.status}
            disabled={true}
          />
          <label className="profile label">
            {"Best Score: " + userProfile.bestScore}
          </label>
          <label className="profile label">{}</label>
          <label className="profile label">
            {"Total Score: " + userProfile.totalScore}
          </label>
          <label style={{ color: "red" }}>{notification}</label>
          <div className="profile button-container">
            <img className="profile img_cat_left" src={cat_left} />

            <Button
              onClick={() => goToFriends()}
              className="profile button_style1"
            >
              Back
            </Button>
            <img className="profile img_cat_right" src={cat_left} />
          </div>
        </div>
      </div>
    );

    return content;
  };

  const ownProfile = () => {
    const content = (
      <div className="profile container">
        <div className="profile form">
          <FormField
            label="Username"
            value={userProfile.username}
            disabled={true}
          />
          <FormField
            label="Status"
            value={userProfile.status}
            disabled={true}
          />
          <label className="profile label">
            {"Best Score: " + userProfile.bestScore}
          </label>
          <label className="profile label">{}</label>
          <label className="profile label">
            {"Total Score: " + userProfile.totalScore}
          </label>
          <label style={{ color: "red" }}>{notification}</label>
          <div className="profile button-container">
            <img className="profile img_cat_left" src={cat_left} />

            <Button
              onClick={() => handleEdit()}
              className="profile button_style1"
            >
              Edit
            </Button>
            <img className="profile img_cat_right" src={cat_left} />
          </div>
        </div>
      </div>
    );
    return content;
  };

  const Profile = () => {
    return <div>{isEditing ? ownProfileEdit() : ownProfile()}</div>;
  };

  const ownProfileEdit = () => {
    return (
      <div className="profile container">
        <div className="profile form">
          <FormField
            label="Username"
            value={username}
            onChange={(un) => {
              setUsername(un);
              setNotification("");
            }}
          />
          {ShowAndHidePassword()}
          <label style={{ color: "red" }}>{notification}</label>
          <div className="profile button-container">
            <img className="profile img_cat_left" src={cat_left} alt="" />
            <div>
              <Button
                onClick={() => handleUpdateProfile()}
                className="profile button_style1"
              >
                Update
              </Button>
              <Button
                onClick={() => cancelEdit()}
                className="profile button_style1"
              >
                Back
              </Button>
            </div>

            <img className="profile img_cat_right" src={cat_left} alt="" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <BgmPlayer />
      <ToastContainer
        toastClassName="toast-style"
        position="top-center"
        transition={Bounce}
        autoClose={5000}
        closeButton={false}
        hideProgressBar={true}
        draggable={false}
      />
      <div className="profile content-container">
        <div className="profile pic">
          <img
            src={cats}
            alt="welcome background cats"
            style={{ width: "447px", height: "559px", opacity: "20%" }}
          />
        </div>
        {!userProfile ? (
          <Spinner />
        ) : (
          <div>{editable ? Profile() : guestProfile()}</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
