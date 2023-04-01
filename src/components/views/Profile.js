import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { api, handleError } from "helpers/api";
import "styles/views/Profile.scss";
import User from "models/User";
import { useParams } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from "components/ui/Spinner";
import cat_left from "styles/images/cat_left.png";
import cat_gif from "styles/images/gif/cat_paint.gif";
import showPwdIcon from "styles/images/svg/show-password.svg";
import hidePwdIcon from "styles/images/svg/hide-password.svg";
import PropTypes from "prop-types";

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
    id: null,
    username: null,
    status: null,
    bestScore: null,
    totalScore: null,
  });
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const visitId = useParams();
  const editable = localStorage.getItem("id") === visitId;
  // const [isShown, setIsSHown] = useState(false); //password shown or hidden
  console.log("editable");
  console.log(editable);
  // const currentUserId = localStorage.getItem("userId"); //save userId

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const response = await api.get(`/users/${visitId}`);
        //for test reason
        const response = {
          id: 1,
          username: "r1",
          status: "online",
          bestScore: 10,
          totalScore: 10,
        };
        // const userProfile1 = new User(response.data);
        const userProfile1 = new User(response);
        setUserProfile(userProfile1);
        console.log(userProfile);
      } catch (error) {
        alert(
          `Something went wrong during get user profile: \n${handleError(
            error
          )}`
        );
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    console.log("handle update");
    const newUsername = username || userProfile.username;
    const newPassword = password || null; // if didn't update password, the password is still null

    console.log(newUsername);
    console.log(newPassword);
    const requestBody = JSON.stringify({
      username: newUsername,
      birthday: newPassword,
    });
    try {
      await api.put(`/users/${visitId}`, requestBody);
    } catch (error) {
      alert(
        `Something went wrong during updating profile: \n${handleError(error)}`
      );
    }
    history.push(`/users/${visitId}`);
    setIsEditing(false);
    setUsername("");
    setPassword(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setUsername("");
    setPassword(null);
  };

  const ShowAndHidePassword = () => {
    return (
      <div className="wrapper">
        <label className="profile label">{"Password"}</label>
        <input
          className="input"
          type={isShowPwd ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // onChange={(e) => setPwd(e.target.value)}
        />
        <img
          className="icon"
          // title={isShowPwd ? "Hide password" : "Show password"}
          src={isShowPwd ? hidePwdIcon : showPwdIcon}
          onClick={() => setIsShowPwd((prevState) => !prevState)}
        />
      </div>
    );
  };

  const guestProfile = () => {
    console.log("guest profile");
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
            {"Best Score:" + userProfile.bestScore}
          </label>
          <label className="profile label">{}</label>
          <label className="profile label">
            {"Total Score:" + userProfile.totalScore}
          </label>
          <img className="profile img_cat_left" src={cat_left} />
          <img className="profile img_cat_right" src={cat_left} />
          <img
            className="profile img_cat_middle"
            src={cat_left}
            alt="cat image"
          />
          <img
            className="profile img_cat_middle1"
            src={cat_left}
            alt="cat image"
          />
          {/* <img
            className="profile img_cat_middle"
            src={cat_gif}
            alt="cat image"
          /> */}
        </div>
      </div>
    );

    return content;
  };

  const ownProfile = () => {
    console.log("own profile");
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
            {"Best Score:" + userProfile.bestScore}
          </label>
          <label className="profile label">{}</label>
          <label className="profile label">
            {"Total Score:" + userProfile.totalScore}
          </label>
          <img className="profile img_cat_left" src={cat_left} />
          <img className="profile img_cat_right" src={cat_left} />
          <button
            onClick={() => handleEdit()}
            className="profile button_style1"
          >
            Edit
          </button>
        </div>
      </div>
    );
    return content;
  };

  const Profile = () => {
    return <div>{isEditing ? ownProfileEdit() : ownProfile()}</div>;
  };

  const ownProfileEdit = () => {
    console.log("own edit profile");
    return (
      <div className="profile container">
        <div className="profile form">
          <FormField
            label="Username"
            value={username}
            onChange={(un) => setUsername(un)}
          />
          {ShowAndHidePassword()}

          <button
            // disabled={!username || !password}
            width="100%"
            onClick={() => handleUpdateProfile()}
            className="profile button_style1"
          >
            Update
          </button>

          <img className="profile img_cat_left" src={cat_left} />
          <img className="profile img_cat_right" src={cat_left} />
        </div>
      </div>
    );
  };

  return (
    <BaseContainer>
      {/* <h2> Profile </h2> */}
      {!userProfile ? (
        <Spinner />
      ) : (
        <div>
          {/* <div>{editable ? Profile() : guestProfile()}</div> */}
          <div>{editable ? guestProfile() : Profile()}</div>
        </div>
      )}
    </BaseContainer>
  );
};
export default Profile;
