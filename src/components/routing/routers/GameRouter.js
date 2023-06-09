import { Redirect, Route } from "react-router-dom";
import Game from "components/views/Game";
import PropTypes from "prop-types";
import WaitingView from "components/views/WaitingView";
const GameRouter = (props) => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Route exact path={`${props.base}/lobby`}>
        <Game />
      </Route>
      <Route exact path={`${props.base}`}>
        <Redirect to={`${props.base}/lobby`} />
      </Route>
      <Route path={`${props.base}/wait/:gameId`}>
        <WaitingView />
      </Route>
      <Route path={`${props.base}/game/:gameId`}>
        <Game />
      </Route>
    </div>
  );
};
/*
 * Don't forget to export your component!
 */

GameRouter.propTypes = {
  base: PropTypes.string,
};

export default GameRouter;
