import { Redirect, Route } from "react-router-dom";
import Game from "components/views/Game";
import PropTypes from "prop-types";
import WaitingView from "components/views/WaitingView";
import SelectWord  from "components/views/SelectWord";
import DrawingStage from "components/views/DrawingStage";
import GuessingStage from "components/views/GuessingStage";
import Ranking from "components/views/Ranking";


const GameRouter = (props) => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Route exact path={`${props.base}/dashboard`}>
        <Game />
      </Route>
      <Route exact path={`${props.base}`}>
        <Redirect to={`${props.base}/dashboard`} />
      </Route>
      <Route path={`${props.base}/wait/:gameId`}>
        <WaitingView />
      </Route>
      <Route path={`${props.base}/game/:gameId`}>
        <Game />
      </Route>
      <Route path={`${props.base}/selectWord/:gameId`}>
         <SelectWord />
      </Route>
      <Route path={`${props.base}/drawingStage/:gameId`}>
        <DrawingStage />
      </Route>
      <Route path={`${props.base}/GuessingStage/:gameId`}>
        <GuessingStage />
      </Route>
      <Route path={`${props.base}/Ranking/:gameId`}>
         <Ranking />
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
