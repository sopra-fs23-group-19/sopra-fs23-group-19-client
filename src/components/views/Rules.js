import React from "react";
import "styles/views/Header.scss";
import "styles/views/Rules.scss";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import BgmPlayer from "components/ui/BgmPlayer"
/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const Rules = (props) => {
  return (
    <div>
      <Header />
      <BgmPlayer/>
      <div className="rules content-container">
        <div className="rules pic-container">
          <img
            src={cats}
            alt="background cats"
            style={{ width: "447px", height: "559px", opacity: "20%" }}
          />
        </div>

        <div className="rules container">
          <div className="rules form">
            <div className="rules title">Description</div>
            <div className="rules divider-custom">
              <div className="rules divider-custom-line"></div>
              <div className="rules divider-custom-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="rules divider-custom-line"></div>
            </div>
            <div className="rules content">
              This is a social drawing application where players take turns
              drawing a picture of a given word, and other players compete to
              guess the word from the drawing.
            </div>
            <div className="rules title">Game process</div>
            <div className="rules divider-custom">
              <div className="rules divider-custom-line"></div>
              <div className="rules divider-custom-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="rules divider-custom-line"></div>
            </div>
            <div className="rules content">
              1. The system randomly decides the order of drawing.
              <br />
              2. The drawing player have 20 seconds to choose a word from three given words.
              <br />
              3. Then the drawing player has 60 seconds to draw a picture describing that word. 
              When he/she is drawing, all the guessing players can see the painting.
              <br/>
              4. After the drawing stage completes, all guessing players have another 60 seconds to
              submit answers guessing the word for once only.
              <br />
              5. After each turn, players will see their score and rank. The rules of scoring is listed below.
              <br />
              5. The game ends if all the players have done the drawing once.
              And it will show the final point of each player.
            </div>
            <div className="rules title">Rules for scoring</div>
            <div className="rules divider-custom">
              <div className="rules divider-custom-line"></div>
              <div className="rules divider-custom-icon">
                <FontAwesomeIcon icon={faStar} />
              </div>
              <div className="rules divider-custom-line"></div>
            </div>
            <div className="rules content">
              If you are a guessing player:
              <br />
              You will get 12 points for a correct answer, 6 points for a similar answer and 0 points for a wrong answer.
              <br />
              If you are a drawing player:
              <br />
              1. In two-player mode, your score will be the same as the guessing player. For example, if the guessing player answers correctly, you will get 12 points.
              <br />
              2. In four-player mode, you will get 4 points for each guessing player who answers correctly. 
              You will get 2 points for each guessing player who submits a similar answer. 
              For example, if two guessing players get the correct answer and one gets the similar answer, you will get 4 + 4 + 2 = 10 points.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Rules;
