import React from "react";
import { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from "components/ui/Spinner";
import { withRouter } from "react-router-dom";
import { api, handleError } from "../../helpers/api";
import DrawingStage from "components/views/DrawingStage";
import GuessingStage from "components/views/GuessingStage";
import { useHistory, useParams } from "react-router-dom";
import Turn from "models/Turn";
import SelectWord from "./SelectWord";

const Game = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [gameModel, setGameModel] = useState(null);
  const { gameId } = useParams();
  const [gameTurnId, setGameTurnId] = useState(1);
  const [drawingPlayerId, setDrawingPlayerId] = useState(null);
  const currentId = localStorage.getItem("id");
  const [currentRole, setCurrentRole] = useState(null);
  const [currentStage, setCurrentStage] = useState(null);
  const [gameStatus, setGameStatus] = useState(null);
  const [gameTurnStatus, setGameTurnStatus]=useState(null);
  const [players, setPlayers] = useState(null);
  // const leave = () => {
  //   localStorage.removeItem("token");
  //   history.push("/login");
  // };
  const fetchRoom = async () =>{
    try{
      const response = await api().get(`/gameRounds/${gameId}`);
    }catch (error) {
      alert(
        `Something went wrong during get room information: \n${handleError(
          error
        )}`
      );
      //history.push("/lobby"); // redirect back to lobby
    }
  };
  const fetchTurnInfo = async () => {
    try {
      const response = await api().get(`/gameRounds/information/${gameTurnId}`);
      console.log(response);
      const turn = new Turn(response.data);
      console.log(turn);
      setPlayers(turn.players);
      // setDrawingPlayerId(turn.drawingPlayerId);
      // if(drawingPlayerId==currentId){
      //   setCurrentRole("drawingPlayer");
      // }else{
      //   setCurrentRole("guessingPlayer");
      // }
      if(turn.gameStatus){
        if(turn.gameTurnStatus){
          setDrawingPlayerId(turn.drawingPlayerId);
          if(drawingPlayerId==currentId){
            setCurrentRole("drawingPlayer");
          }else{
            setCurrentRole("guessingPlayer");
          }
        }else{
          if(gameTurnId<4){
            setGameTurnId(gameTurnId+1);
            const response1 = await api().post(`/games/gameRounds/${gameId}`);
          }
        }
      }else{
        const response2 = await api().get(`/games/ranks/${gameId}`);
        history.push({pathname:'/ranking', state: {data:response2.data}});
      }
    } catch (error) {
      alert(
        `Something went wrong during get game information: \n${handleError(
          error
        )}`
      );
      //history.push("/lobby"); // redirect back to lobby
    }
  };

  useEffect(()=>{
    fetchTurnInfo();
  }, []);

  useInterval(
    async () => {
      fetchTurnInfo();
    },
    (!gameStatus || !gameTurnStatus) ? null : 1000
  );

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  // useEffect(() => {
  //   // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
  //   async function fetchData() {
  //     try {
  //       const response = await api.get(`/gameRounds/${roomId}`);

  //       // delays continuous execution of an async operation for 1 second.
  //       // This is just a fake async call, so that the spinner can be displayed
  //       // feel free to remove it :)
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       // Get the returned users and update the state.
  //       setGameModel(response.data);

  //       // This is just some data for you to see what is available.
  //       // Feel free to remove it.
  //       console.log("request to:", response.request.responseURL);
  //       console.log("status code:", response.status);
  //       console.log("status text:", response.statusText);
  //       console.log("requested data:", response.data);

  //       // See here to get more data.
  //       console.log(response);
  //     } catch (error) {
  //       console.error(
  //         `Something went wrong while fetching the game: \n${handleError(
  //           error
  //         )}`
  //       );
  //       console.error("Details:", error);
  //       alert(
  //         "Something went wrong while fetching the game! See the console for details."
  //       );
  //     }
  //   }

  //   fetchData();
  // }, []);

  let content = <Spinner />;
  content =
    (currentRole === "drawingPlayer" && gameStatus) ? (
        <SelectWord role={"drawingPlayer"}/>
    ) : (
        <SelectWord role={"guessingPlayer"}/>
    );

  return <BaseContainer className="game container">{content}</BaseContainer>;
};

export default Game;
