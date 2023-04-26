import React from "react";
import { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from "components/ui/Spinner";
import { withRouter } from "react-router-dom";
import { api, handleNotLogInError } from "../../helpers/api";
import DrawingStage from "components/views/DrawingStage";
import Ranking from "components/views/Ranking";
import GameLoading from "components/views/GameLoading";
import GameModel from "models/GameModel";
import SelectWord from "components/views/SelectWord";
import GuessingStage from "components/views/GuessingStage";
import TurnRanking from "components/views/TurnRanking";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useInterval } from "helpers/hooks";
import TurnRankModel from "models/TurnRankModel";
import GameRankModel from "models/GameRankModel";

const Game = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();
  const location = useLocation();
  const { gameId } = useParams();
  const InitialTurnId = location.state.turnId;
  const curUserId = localStorage.getItem("id");
  const [gameStatus, setGameStatus] = useState(true);
  const [turnId, setTurnId] = useState(InitialTurnId);
  const [turnStatus, setTurnStatus] = useState(null);
  const [isUpdating, setIsUpdating] = useState(true);
  const [isUpdatingPainting, setIsUpdatingPainting] = useState(true);
  const [currentGame, setCurrentGame] = useState(null);
  // let currentGame = {};
  let currentImage = "";
  const [currentTurnRank, setCurrentTurnRank] = useState(null);
  const [currentGameRank, setCurrentGameRank] = useState(null);
  // let currentTurnRank = {};
  // let currentGameRank = {};

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
  };

  const handleConfirmRanking = async () => {
    console.log("handle confirm ranking");

    // console.log(requestBody);
    try {
      await api().get(`/gameRounds/rankConfirmation/${turnId}/${curUserId}`);
    } catch (error) {
      handleNotLogInError(history, error, "confirm ranking", true);
    }
  };

  const handleSubmitPainting = async (painting) => {
    console.log("handle submit painting");
    const requestBody = JSON.stringify({
      id: turnId,
      image: painting,
    });
    try {
      await api().post(`/gameRounds/finalDrawings`, requestBody);
    } catch (error) {
      handleNotLogInError(history, error, "handle submitting Painting", true);
    }
  };
  const handleUpdatePainting = async (painting) => {
    console.log("handle update painting");
    if (isUpdatingPainting) {
      const requestBody = JSON.stringify({
        id: turnId,
        image: painting,
      });
      try {
        await api().put(`/gameRounds/drawings`, requestBody);
      } catch (error) {
        handleNotLogInError(history, error, "handle updating Painting", true);
        setIsUpdatingPainting(false);
      }
    }
  };

  const handleSubmitAnswer = async (word) => {
    console.log("handle submit answer");
    const requestBody = JSON.stringify({
      id: curUserId,
      guessingWord: word,
      currentGameId: gameId,
    });
    try {
      await api().put(`/gameRounds/answers/${turnId}`, requestBody);
    } catch (error) {
      handleNotLogInError(history, error, "handle submitting answer", true);
    }
  };

  const handleQuitGame = async () => {
    console.log("handle quit game");
    try {
      await api().put(`/games/ending/${gameId}`);
    } catch (error) {
      handleNotLogInError(history, error, "leaving game", true);
    }
    history.push("/lobby");
  };

  const fetchData = async () => {
    try {
      const response0 = await api().get(`/games/waitingArea/${gameId}`);

      const response = response0.data;

      setGameStatus(response.status);

      setTurnId(response.currentTurnId);
      setTurnStatus(response.currentTurnStatus);
    } catch (error) {
      handleNotLogInError(history, error, "get game");
      setIsUpdating(false);
      handleGameError();
      history.push("/lobby");
    }
  };

  //force quit game
  const handleGameError = async () => {
    console.log("handle game error");

    try {
      await api().get(`/games/ending/${gameId}`);
    } catch (error) {
      // alert(
      //   `Something went wrong during submitting Answer: \n${handleError(error)}`
      // );
      history.push("/lobby");
    }
  };
  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    fetchData();
  }, []);

  //fetch game Turn information
  const IntializeTurn = async () => {
    try {
      const response0 = await api().get(
        `/gameRounds/information/${turnId}/${curUserId}`
      );
      const response = response0.data;
      currentGame.playerNum = response.players.length;
      currentGame.drawingPlayerId = response.drawingPlayerId;
      if (parseInt(curUserId) == parseInt(currentGame.drawingPlayerId)) {
        currentGame.role = "drawingPlayer";
      } else if (parseInt(curUserId) != parseInt(currentGame.drawingPlayerId)) {
        currentGame.role = "guessingPlayer";
      }
      //   console.log(word);
      var allPlayers = response.players;
      const updatedPlayer = allPlayers.filter(
        (item) =>
          item.id !== currentGame.drawingPlayerId && item.id !== curUserId
      );

      const updatedPlayer0 = allPlayers.filter((item) => item.id == curUserId);
      const updatedPlayer1 = allPlayers.filter(
        (item) => item.id !== currentGame.drawingPlayerId
      );

      if (currentGame.playerNum == 4) {
        // setUsername1(response1.players[0].username);
        currentGame.username1 = response.drawingPlayerName; //left, all drawing players
        if (currentGame.role == "drawingPlayer") {
          currentGame.username2 = updatedPlayer[0].username;
          currentGame.username3 = updatedPlayer[1].username;
          currentGame.username4 = updatedPlayer[3].username;
        } else {
          currentGame.username2 = updatedPlayer0[0].username; ///right, first one is current user name
          currentGame.username3 = updatedPlayer[1].username;
          currentGame.username4 = updatedPlayer[2].username;
        }
      }

      if (currentGame.playerNum == 2) {
        currentGame.username1 = response.drawingPlayerName;
        currentGame.username2 = updatedPlayer1[0].username;
      }
      currentImage = response.image;
      //   setRole("drawingPlayer");
    } catch (error) {
      //   alert(
      //     `Something went wrong during get game Turn information: \n${handleError(
      //       error
      //     )}`
      //   );
      handleNotLogInError(
        history,
        error,
        "fetching turn information in drawing phase"
      );
      history.push("/lobby"); // redirect back to lobby
    }
  };
  useEffect(() => {
    IntializeTurn();
  }, []);
  useInterval(
    async () => {
      fetchData();
    },
    isUpdating ? 1000 : null
    // status == "PLAYING" ? null : 1000
  );
  const fetchWord = async () => {
    try {
      // const response0 = await api().get(`/gameRounds/words/${turnId}`);
      // const response = response0.data;
      const response = {
        id: 1,
        drawingPlayerId: 1,
        players: [
          {
            id: 1,
            username: "test1",
          },
          {
            id: 2,
            username: "test",
          },
        ],
        image: null,
        wordsToBeChosen: ["feet", "bench", "line"],
        gameId: 1,
        submittedAnswerIds: [],
        status: "CHOOSE_WORD",
      }; //word get api return

      console.log(response.wordsToBeChosen);
      // let currentGame = {};
      if (response.wordsToBeChosen.length == 3) {
        //correct response
        currentGame.word0 = response.wordsToBeChosen[0];
        currentGame.word1 = response.wordsToBeChosen[1];
        currentGame.word2 = response.wordsToBeChosen[2];
      }
    } catch (error) {
      //   alert(`Something went wrong during get words: \n${handleError(error)}`);
      //   history.push("/lobby"); // redirect back to lobby
      handleNotLogInError(history, error, "fetching words for drawing Player");
    }
  };
  const fetchRankInfo = async () => {
    try {
      const response0 = await api().get(`/games/ranks/${gameId}`);
      const response1 = response0.data;

      currentGameRank.playerNum = response1.length;
      //   var allPlayers = response1;
      //   const updatedPlayer = allPlayers.filter(
      //     (item) => item.id !== response1.drawingPlayerId
      //   );

      if (currentGameRank.playerNum == 4) {
        // setUsername1(response1.players[0].username);
        currentGameRank.username1 = response1[0].username;
        currentGameRank.username2 = response1[1].username;
        currentGameRank.username3 = response1[2].username;
        currentGameRank.username4 = response1[3].username;
        currentGameRank.score1 = response1[0].score1;
        currentGameRank.score2 = response1[0].score2;
        currentGameRank.score3 = response1[0].score3;
        currentGameRank.score4 = response1[0].score4;
      }

      if (currentGameRank.playerNum == 2) {
        currentGameRank.username1 = response1[0].username;
        currentGameRank.username2 = response1[1].username;
        currentGameRank.score1 = response1[0].score1;
        currentGameRank.score2 = response1[0].score2;
      }
    } catch (error) {
      handleNotLogInError(history, error, "fetching ranking information");
      history.push("/lobby"); // redirect back to lobby
    }
  };
  //fetch game Turn information
  const fetchTurnInfo = async () => {
    try {
      const response0 = await api().get(
        `/gameRounds/information/${turnId}/${curUserId}`
      );
      const response = response0.data;
      console.log("fetch turn info");

      //   const response1 = {
      //     id: 1,
      //     drawingPlayerId: 1,
      //     drawingPlayerName: "test1",
      //     players: [
      //       {
      //         id: 1,
      //         username: "test1",
      //       },
      //       {
      //         id: 2,
      //         username: "test",
      //       },
      //     ],
      //     image: null,
      //     wordsToBeChosen: ["feet", "bench", "line"],
      //     targetWord: "line",
      //     gameId: 1,
      //     submittedAnswerIds: [],
      //     status: "PAINTING",
      //   };
      //   const playerNum = response1.players.length;
      // const game0 = new GameModel(response0.data);
      // let currentGame = {};
      currentGame.playerNum = response.players.length;
      currentGame.drawingPlayerId = response.drawingPlayerId;
      if (parseInt(curUserId) == parseInt(currentGame.drawingPlayerId)) {
        currentGame.role = "drawingPlayer";
      } else if (parseInt(curUserId) != parseInt(currentGame.drawingPlayerId)) {
        currentGame.role = "guessingPlayer";
      }
      //   console.log(word);
      var allPlayers = response.players;
      const updatedPlayer = allPlayers.filter(
        (item) =>
          item.id !== currentGame.drawingPlayerId && item.id !== curUserId
      );

      const updatedPlayer0 = allPlayers.filter((item) => item.id == curUserId);
      const updatedPlayer1 = allPlayers.filter(
        (item) => item.id !== currentGame.drawingPlayerId
      );

      if (currentGame.playerNum == 4) {
        // setUsername1(response1.players[0].username);
        currentGame.username1 = response.drawingPlayerName; //left, all drawing players
        if (currentGame.role == "drawingPlayer") {
          currentGame.username2 = updatedPlayer[0].username;
          currentGame.username3 = updatedPlayer[1].username;
          currentGame.username4 = updatedPlayer[3].username;
        } else {
          currentGame.username2 = updatedPlayer0[0].username; ///right, first one is current user name
          currentGame.username3 = updatedPlayer[1].username;
          currentGame.username4 = updatedPlayer[2].username;
        }
      }

      if (currentGame.playerNum == 2) {
        currentGame.username1 = response.drawingPlayerName;
        currentGame.username2 = updatedPlayer1[0].username;
      }
      currentImage = response.image;
      console.log(currentGame);
      console.log("currentGame after fetch");
      //   setRole("drawingPlayer");
    } catch (error) {
      //   alert(
      //     `Something went wrong during get game Turn information: \n${handleError(
      //       error
      //     )}`
      //   );
      handleNotLogInError(
        history,
        error,
        "fetching turn information in drawing phase"
      );
      history.push("/lobby"); // redirect back to lobby
    }
  };
  useEffect(() => {
    fetchTurnInfo();
  }, [turnStatus]);
  useEffect(() => {
    if (turnStatus == "RANKING") fetchTurnScore();
  }, [turnStatus]);
  useEffect(() => {
    if (turnStatus == "CHOOSE_WORD") fetchWord();
  }, [turnStatus]);
  useEffect(() => {
    if (gameStatus == "END_GAME") fetchRankInfo();
  }, [gameStatus]);
  const fetchTurnScore = async () => {
    try {
      const response0 = await api().get(`/gameRounds/ranks/${turnId}`);
      const response = response0.data;
      //response=
      //   [
      //     {
      //         "id": 2,
      //         "username": "test",
      //         "token": "30e578e3-4329-41aa-8a16-d51f5d5294c2",
      //         "status": "ISPLAYING",
      //         "creationDate": "2023-04-24T07:51:30.741+00:00",
      //         "bestScore": 0,
      //         "totalScore": 0,
      //         "currentScore": 0,
      //         "guessingWord": null,
      //         "currentGameScore": 0
      //     },
      //     {
      //         "id": 1,
      //         "username": "test1",
      //         "token": "815bbb7e-eec9-466f-9132-a7c933f201d3",
      //         "status": "ISPLAYING",
      //         "creationDate": "2023-04-24T07:51:24.545+00:00",
      //         "bestScore": 0,
      //         "totalScore": 0,
      //         "currentScore": 0,
      //         "guessingWord": null,
      //         "currentGameScore": 0
      //     }
      // ]

      const updatedPlayer = response.filter((item) => item.id == curUserId);
      currentTurnRank.userScore = parseInt(updatedPlayer[0].currentScore);
      currentTurnRank.playerNum = response.length;
      if (currentTurnRank.playerNum == 4) {
        currentTurnRank.username1 = response[0].username;
        currentTurnRank.username2 = response[1].username;
        currentTurnRank.username3 = response[2].username;
        currentTurnRank.username4 = response[3].username;
        currentTurnRank.score1 = response[0].currentScore;
        currentTurnRank.score2 = response[1].currentScore;
        currentTurnRank.score3 = response[2].currentScore;
        currentTurnRank.score4 = response[3].currentScore;
      }

      if (currentTurnRank.playerNum == 2) {
        currentTurnRank.username1 = response[0].username;
        currentTurnRank.username2 = response[1].username;
        currentTurnRank.score1 = response[0].currentScore;
        currentTurnRank.score2 = response[1].currentScore;
      }
    } catch (error) {
      handleNotLogInError(history, error, "fetching turn ranking information");
      history.push("/lobby"); // redirect back to lobby
    }
  };

  const switchPages = () => {
    let content = <GameLoading />;
    if (gameStatus == "PLAYING") {
      if (turnStatus === "CHOOSE_WORD") {
        console.log("currentGame");
        console.log(currentGame);
        content = (
          <SelectWord
            gameInfo={currentGame}
            turnId={turnId}
            handleChooseWord={handleChooseWord}
          />
        );
      }
      // else if (turnStatus === "PAINTING" && curUserId == drawingPlayerId)
      else if (turnStatus === "PAINTING") {
        content = (
          <DrawingStage
            gameInfo={currentGame}
            turnId={turnId}
            // painting = {imag}
            painting={currentImage}
            handleUpdatePainting={handleUpdatePainting}
            handleSubmitPainting={handleSubmitPainting}
          />
        );
      } else if (turnStatus === "GUESSING") {
        content = (
          <GuessingStage
            gameInfo={currentGame}
            turnId={turnId}
            painting={currentImage}
            handleSubmitAnswer={handleSubmitAnswer}
          />
        );
      } else if (turnStatus === "RANKING") {
        content = (
          <TurnRanking
            turnRankInfo={currentTurnRank}
            turnId={turnId}
            role={currentGame.role}
            handleConfirmRanking={handleConfirmRanking}
          />
        );
      } else {
        content = <GameLoading />;
      }
    } else {
      // console.log(gameId);
      console.log(gameStatus);

      content = (
        <Ranking
          gameId={gameId}
          gameRankInfo={currentGameRank}
          handleQuitGame={handleQuitGame}
        />
      );
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
