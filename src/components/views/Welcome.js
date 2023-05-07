import React from "react";
import "styles/views/Header.scss";
import "styles/views/Rules.scss";
import "styles/views/Welcome.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
import { Modal } from "components/views/Modal";
import { useState } from "react";
import { Button } from "components/ui/Button";
import useSound from "use-sound";
import btClick from "styles/sounds/click_button.mp3";
/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
import react from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const FunctionDisplay = (props) => {
  return (
    <div className="welcome stepContainer">
      <div className="welcome functionNameWrapper">
        {/* <Link to={props.path}> */}
        <div>
          <h3 className={props.classname}>{props.name}</h3>
          <p> {props.detail}</p>
        </div>
        {/* </Link> */}
      </div>
    </div>
  );
};
FunctionDisplay.propTypes = {
  // path: PropTypes.string,
  name: PropTypes.string,
  detail: PropTypes.string,
  classname: PropTypes.string,
};
const Welcome = (props) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    playOn();
    setShowModal((showModal) => !showModal);
  };
  const userName = localStorage.getItem("username") || "";
  const [playOn] = useSound(btClick);

  return (
    <BaseContainer>
      <Header />
      <div className="welcome title1">{"welcome, " + userName}</div>
      <div
        className="rules pic"
        style={{ opacity: "20%", left: "1000px", top: "280px" }}
      >
        <img src={cats} alt="" />
      </div>
      <div className="welcome displayWrapper">
        <FunctionDisplay
          // path="/lobby"
          classname="welcome functionName1"
          name="Prepare"
          detail="System randomly decides the order of becoming drawing player."
        />
        <FunctionDisplay
          // path="/profile"
          classname="welcome functionName2"
          name="Drawing Stage"
          detail="Drawing player chooses a word, then has 60s to draw a picture describing that word."
        />
        <FunctionDisplay
          // path="/friend"
          classname="welcome functionName3"
          name="Guessing Stage"
          detail="Guessing players have 60s to submit
          answers guessing the word for once."
        />
        <FunctionDisplay
          // path="/notification"
          name="View Result"
          classname="welcome functionName3"
          detail="The game ends if all the players have done the drawing once. "
        />
      </div>
      <div className="welcome container">
        <button
          className="welecome button_style1"
          width="100%"
          onClick={() => openModal()}
        >
          Explore now!
        </button>
      </div>
      <div className="welcome modalContainer">
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Welcome;
