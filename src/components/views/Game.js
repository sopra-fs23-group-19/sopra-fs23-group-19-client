import React from "react";
import { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from "components/ui/Spinner";
import { withRouter } from "react-router-dom";
import { api, handleNotLogInError } from "../../helpers/api";
import DrawingStage from "components/views/DrawingStage";
import Ranking from "components/views/Ranking";
import SelectWord from "components/views/SelectWord";
import GuessingStage from "components/views/GuessingStage";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useInterval } from "helpers/hooks";
const Game = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();
  const location = useLocation();
  const { gameId } = useParams();
  // const gameId = useParams().id;

  const InitialTurnId = location.state.turnId;
  const curUserId = localStorage.getItem("id");
  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  // const [drawingPlayerId, setDrawingPlayerId] = useState(null);
  const [gameStatus, setGameStatus] = useState(true);
  const [turnId, setTurnId] = useState(InitialTurnId);
  const [turnStatus, setTurnStatus] = useState(null);
  const [currentGameTurn, setCurrentGameTurn] = useState(null);

  // const leave = () => {
  //   history.push("/lobby");
  // };

  const handleChooseWord = async (word) => {
    console.log("handle choose Word");
    const requestBody = JSON.stringify({
      id: turnId,
      targetWord: word,
    });

    console.log(requestBody);
    try {
      await api().put(`/gameRounds/words`, requestBody);
    } catch (error) {
      // alert(
      //   `Something went wrong during choosing one word: \n${handleError(error)}`
      // );
      handleNotLogInError(history, error, "handle choose words", true);
    }

    // setTurnStatus("PAINTING");
  };

  const handleSubmitPainting = async (painting) => {
    console.log("handle submit painting");
    const requestBody = JSON.stringify({
      id: turnId,
      image: painting,
    });
    // console.log(requestBody);
    try {
      await api().post(`/gameRounds/finalDrawings`, requestBody);
    } catch (error) {
      // alert(
      //   `Something went wrong during submitting Painting: \n${handleError(
      //     error
      //   )}`
      // );
      handleNotLogInError(history, error, "handle submitting Painting", true);
    }
  };

  const handleSubmitAnswer = async (word) => {
    console.log("handle submit answer");
    const requestBody = JSON.stringify({
      id: curUserId,
      guessingWord: word,
      currentGameId: gameId,
    });
    // console.log(requestBody);
    try {
      await api().put(`/gameRounds/answers/${turnId}`, requestBody);
    } catch (error) {
      // alert(
      //   `Something went wrong during submitting Answer: \n${handleError(error)}`
      // );
      handleNotLogInError(history, error, "handle submitting answer", true);
    }
  };

  // const handleQuitGame = async () => {
  //   console.log("handle quit game");
  //   const requestBody = JSON.stringify({
  //     id: turnId,
  //     guessingWord: word,
  //   });
  //   console.log(requestBody);
  //   try {
  //     await api().put(`/gameRounds/answers/${turnId}`, requestBody);
  //   } catch (error) {
  //     alert(
  //       `Something went wrong during submitting Answer: \n${handleError(error)}`
  //     );
  //   }
  // };

  const fetchData = async () => {
    try {
      const response0 = await api().get(`/games/${gameId}`);
      // // delays continuous execution of an async operation for 1 second.

      // // Get the returned users and update the state.

      const response = response0.data;

      ///for test
      // const response = {
      //   id: 1,
      //   drawingPlayerIds: [1, 2],
      //   allPlayersIds: [1, 2],
      //   gameTurnList: [1, 2],
      //   // gameTurnStatus: "CHOOSE_WORD",
      //   gameTurnStatus: "PAINTING",
      //   currentGameTurn: 2,
      //   gameStatus: true,
      // };

      // Get the returned users and update the state.
      // setGameModel(response.data);
      var arr = response.drawingPlayerIds;
      // var currentDrawingId = arr[arr.length - 1];
      // setDrawingPlayerId(currentDrawingId);
      setGameStatus(response.gameStatus);
      var arrTurnIds = response.gameTurnList;
      var currentTurnId = arrTurnIds[arrTurnIds.length - 1];
      setTurnId(currentTurnId);
      setTurnStatus(response.gameTurnStatus);
      setCurrentGameTurn(response.currentGameTurn);
      // console.log(response.gameTurnList);
      // console.log("current turn status is");
      // console.log(turnStatus);
      // console.log("current game status is");
      // console.log(gameStatus);
      // console.log("current turn id is");
      // console.log(turnId);
    } catch (error) {
      // console.error(
      //   `Something went wrong while fetching the game: \n${handleError(error)}`
      // );
      // console.error("Details:", error);
      // alert(
      //   "Something went wrong while fetching the game! See the console for details."
      // );
      handleNotLogInError(history, error, "get game");
      history.push("/lobby");
    }
  };
  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    // async function fetchData() {
    //   try {
    //     const response0 = await api().get(`/games/${gameId}`);
    //     // // delays continuous execution of an async operation for 1 second.
    //     await new Promise((resolve) => setTimeout(resolve, 1000));

    //     // // Get the returned users and update the state.

    //     const response = response0.data;

    //     ///for test
    //     // const response = {
    //     //   id: 1,
    //     //   drawingPlayerIds: [1, 2],
    //     //   allPlayersIds: [1, 2],
    //     //   gameTurnList: [1, 2],
    //     //   // gameTurnStatus: "CHOOSE_WORD",
    //     //   gameTurnStatus: "PAINTING",
    //     //   currentGameTurn: 2,
    //     //   gameStatus: true,
    //     // };

    //     // Get the returned users and update the state.
    //     // setGameModel(response.data);
    //     var arr = response.drawingPlayerIds;
    //     var currentDrawingId = arr[arr.length - 1];
    //     setDrawingPlayerId(currentDrawingId);
    //     setGameStatus(response.gameStatus);
    //     setTurnStatus(response.gameTurnStatus);
    //     setCurrentGameTurn(response.currentGameTurn);
    //     console.log(currentDrawingId);
    //     var arrTurnIds = response.gameTurnList;
    //     var currentTurnId = arrTurnIds[arrTurnIds.length - 1];
    //     setTurnId(currentTurnId);
    // } catch (error) {
    //   console.error(
    //     `Something went wrong while fetching the game: \n${handleError(
    //       error
    //     )}`
    //   );
    //   console.error("Details:", error);
    //   alert(
    //     "Something went wrong while fetching the game! See the console for details."
    //   );
    // }
    // }

    fetchData();
  }, []);
  useInterval(
    async () => {
      fetchData();
    },
    1000
    // status == "PLAYING" ? null : 1000
  );

  // useInterval(
  //   async () => {
  //     fetchRoomInfo();
  //   },
  //   gameStatus == false ? null : 1000
  // );

  const switchPages = () => {
    let content = <Spinner />;
    if (gameStatus) {
      if (turnStatus === "CHOOSE_WORD") {
        content = (
          <SelectWord
            gameId={gameId}
            turnId={turnId}
            handleChooseWord={handleChooseWord}
          />
        );
      }
      // else if (turnStatus === "PAINTING" && curUserId == drawingPlayerId)
      else if (turnStatus === "PAINITING") {
        content = (
          <DrawingStage
            gameId={gameId}
            turnId={turnId}
            handleSubmitPainting={handleSubmitPainting}
          />
        );
      } else if (turnStatus === "GUESSING") {
        content = (
          <GuessingStage
            gameId={gameId}
            turnId={turnId}
            handleSubmitAnswer={handleSubmitAnswer}
          />
        );
      } else {
        content = <Ranking gameId={gameId} turnId={turnId} />;
      }
    } else {
      content = <Ranking gameId={gameId} turnId={turnId} />;
    }

    return content;
  };
  // let content = <Spinner />;
  // if (gameStatus) {
  //   if (turnStatus === "CHOOSE_WORD" && curUserId == drawingPlayerId) {
  //     content = (
  //       <SelectWord
  //         gameId={gameId}
  //         turnId={turnId}
  //         handleChooseWord={handleChooseWord}
  //       />
  //     );
  //   }
  //   // else if (turnStatus === "PAINTING" && curUserId == drawingPlayerId)
  //   else if (turnStatus === "PAINTING") {
  //     content = (
  //       <DrawingStage
  //         gameId={gameId}
  //         turnId={turnId}
  //         handleSubmitPainting={handleSubmitPainting}
  //       />
  //     );
  //   } else if (turnStatus === "GUESSING") {
  //     content = (
  //       <GuessingStage
  //         gameId={gameId}
  //         turnId={turnId}
  //         handleSubmitAnswer={handleSubmitAnswer}
  //       />
  //     );
  //   } else {
  //     content = <Ranking gameId={gameId} turnId={turnId} />;
  //   }
  // } else {
  //   content = <Ranking gameId={gameId} turnId={turnId} />;
  // }
  return (
    <BaseContainer className="game container">{switchPages()}</BaseContainer>
  );
  // return <BaseContainer className="game container">{content}</BaseContainer>;
};

export default Game;
