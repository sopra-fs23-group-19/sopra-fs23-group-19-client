import React from "react";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import cats from "styles/images/cats3.png";
/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */

const HeaderInGame = (props) => {
  return (
    <div className="header container">
      <div className="header title-container">
        <div className="header title-content">Drawing & Guessing</div>
        <div className="header title-content" style={{textAlign:"right"}}>
          <img src={cats} alt="" style={{width:"270px",height:"35px"}}/>
        </div>
      </div>
      <div className="header instruction-container" style={{"wordWrap":"break-word", width:"90%"}}>
        {localStorage.getItem("username") ? (
          <div className="header title-content" style={{"fontSize":"20px", textAlign:"right"}}>
            {"welcome, " + localStorage.getItem("username")}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

HeaderInGame.propTypes = {
  height: PropTypes.string,
};

/**
 * Don't forget to export your component!
 */
export default HeaderInGame;
