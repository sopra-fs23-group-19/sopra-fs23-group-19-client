import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
import "styles/views/Profile.scss";
import User from "models/User";
import { useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from "components/ui/Spinner";
import cat_left from "styles/images/cat_left.png";
import showPwdIcon from "styles/images/svg/show-password.svg";
import hidePwdIcon from "styles/images/svg/hide-password.svg";
import PropTypes from "prop-types";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import { Button } from "components/ui/Button";
import BgmPlayer from "components/ui/BgmPlayer"

const FormField = (props) => {
  return (
    <div className="profile field">
      <label className="profile label">{props.label}</label>
      <input
        className="profile input"
        // className={props.className}
        // type={props.type}
        // className={props.className}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        disabled={props.disabled}
      />
    </div>
  );
};

FormField.propTypes = {
  // className: PropTypes.string,
  // type: PropTypes.string,
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
  // const [count, setCount] = useState(0);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const visitIdStr = useParams();
  const [notification, setNotification] = useState("");
  // console.log("visitIdStr");
  // console.log(visitIdStr);
  const visitId = parseInt(visitIdStr["id"]);
  // console.log(visitId);
  const editable = localStorage.getItem("id") === visitIdStr["id"];

  useEffect(() => {
    const fetchProfile1 = async () => {
      try {
        const response = await api().get(`/users/${visitId}`);
        const userProfile1 = new User(response.data);
        // const userProfile1 = new User(response);
        setUserProfile(userProfile1);
      } catch (error) {
        const error_str = handleError(error);
        if (error_str["message"].match(/Network Error/)) {
          history.push(`/information`);
        } else if (error_str["status"] == 409) {
          setNotification(
            "There exists a user with the username you have entered. Please enter another one."
          );
        } else {
          setNotification(error_str["message"]);
        }
      }
    };
    fetchProfile1().then(() => {});
  }, [
    visitId,
    isEditing,
    userProfile.username,
    userProfile.status,
    userProfile.bestScore,
    userProfile.totalScore,
    userProfile.id,
  ]);
  // }, []);

  const handleUpdateProfile = async () => {
    // console.log("handle update");
    const newUsername = username || "";
    const newPassword = password || ""; // if didn't update password

    // console.log(newUsername);
    // console.log(newPassword);
    const requestBody = JSON.stringify({
      id: visitId,
      username: newUsername,
      password: newPassword,
    });
    // console.log(requestBody);
    try {
      // console.log(visitId);
      await api().put(`/users/${visitId}`, requestBody);
      localStorage.setItem("username", newUsername);
    } catch (error) {
      // alert(
      //   `Something went wrong during updating profile: \n${handleError(error)}`
      // );
      // handleNotLogInError(history, error, "updating profile", true);
      const error_str = handleError(error);
      if (error_str["message"].match(/Network Error/)) {
        history.push(`/information`);
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
          className="password input"
          type={isShowPwd ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setNotification("");
          }}
          // onChange={(e) => setPwd(e.target.value)}
        />
        <img
          className="password icon"
          alt=""
          // title={isShowPwd ? "Hide password" : "Show password"}
          src={isShowPwd ? showPwdIcon : hidePwdIcon}
          onClick={() => setIsShowPwd((prevState) => !prevState)}
        />
      </div>
    );
  };
  const goToFriends = () => {
    history.push(`/friend`);
  };

  const guestProfile = () => {
    // console.log("guest profile");
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
            // value={userProfile.status === true ? "ONLINE" : "OFFLINE"}
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
    // console.log("own profile");
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
            // value={userProfile.status === true ? "ONLINE" : "OFFLINE"}
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
    // console.log("own edit profile");
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
          {/* <button */}
          <div className="profile button-container">
            <img className="profile img_cat_left" src={cat_left} alt="" />
            <div>
              <Button
                // disabled={!username || !password}
                onClick={() => handleUpdateProfile()}
                className="profile button_style1"
              >
                Update
                {/* </button> */}
              </Button>
              <Button
                // disabled={!username || !password}
                onClick={() => cancelEdit()}
                className="profile button_style1"
              >
                Back
                {/* </button> */}
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
      <BgmPlayer/>
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
