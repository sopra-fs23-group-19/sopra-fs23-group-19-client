import React from "react";
import { ReactLogo } from "components/ui/ReactLogo";
import PropTypes from "prop-types";
import "styles/views/Header.scss";
import {Button} from 'components/ui/Button';
import cats from "styles/picture/cats3.png"

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Header = (props) => (
  <div style = {{"background": "rgba(213, 209, 200, 0.6)", "left":"0px", "top": "0px"}}>
    {/* <div className="header container"> */}
    <div className="header instruction-container">
      <h1 className="header title">Drawing & Guessing</h1>
      <div style={{"margin-left": "500px", "margin-top": "30px"}}>
         <img src={cats} style={{width: 270, height: 35}}/>
      </div>
    </div>
      <div className="header instruction-container">
        <div className="header instruction" style={{"margin-left": "360px", "color": "#E0B406"}}>
          Lobby      
        </div>
        <div className="header instruction" style={{"margin-left": "40px", "color": "#C18A2D"}}>
          Profile    
        </div>
        <div className="header instruction" style={{"margin-left": "40px", "color": "#B59978"}}>
          Friends     
        </div>
        <div className="header instruction" style={{"margin-left": "40px", "color": "#83692C"}}>
          Notification     
        </div>
        <div className="header instruction" style={{"margin-left": "40px", "color": "#000000"}}>
          Rules    
        </div>
        <Button style={{"margin-left": "40px", "background-color": "#FFFFFF", "margin-bottom": "5px", "border": "2px solid #000000"}}>
          Log out
        </Button>
      </div>
    {/* </div> */}
  </div>
);

Header.propTypes = {
  height: PropTypes.string,
};

/**
 * Don't forget to export your component!
 */
export default Header;
