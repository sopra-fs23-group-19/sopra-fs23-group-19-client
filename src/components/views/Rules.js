import React from "react";
import "styles/views/Header.scss";
import "styles/views/Rules.scss";
import cats from "styles/images/cats2.png";
import Header from "components/views/Header";

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
      <div className="rules content-container">
        <div className="rules pic-container">
          <img src={cats} alt="background cats" style={{width: "447px", height: "559px", opacity: "20%"}}/>
        </div>
        <div className="rules container">
          <div className="rules form">
            <div className="rules title">Description:</div>
            <div className="rules content">
              This is a social drawing application where players take turns 
              drawing a picture of a given word, and other players compete to
              guess the word from the drawing.
            </div>
            <div className="rules title">The game process:</div>
            <div className="rules content">
              1. The system randomly decides the order of drawing.
              <br />
              2. The drawing player chooses a word from three words given. Then
              he/she has 60s to draw a picture describing that word.
              <br />
              3. The painting is shown to all guessing players. After the drawing
              stage completes, all guessing players have another 60s to submit
              answers guessing the word for once only.
              <br />
              4. After each round, the guessing players will get one point if they
              answer it correctly, otherwise they will not get any point.
              <br />
              5. The game ends if all the players have done the drawing once. And
              it will show the final point of each player.
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
