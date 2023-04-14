import React from "react";
import { useEffect, useState } from "react";
import BaseContainer from "components/ui/BaseContainer";
import { Spinner } from "components/ui/Spinner";
import { withRouter } from "react-router-dom";
import { api, handleError } from "../../helpers/api";
import DrawingStage from "components/views/DrawingStage";
import GuessingStage from "components/views/GuessingStage";
import { useHistory, useParams } from "react-router-dom";

const Game = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [gameModel, setGameModel] = useState(null);
  const roomId = useParams().gameId;
  // const leave = () => {
  //   localStorage.removeItem("token");
  //   history.push("/login");
  // };

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const response = await api.get(`/gameRounds/${roomId}`);

        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setGameModel(response.data);

        // This is just some data for you to see what is available.
        // Feel free to remove it.
        console.log("request to:", response.request.responseURL);
        console.log("status code:", response.status);
        console.log("status text:", response.statusText);
        console.log("requested data:", response.data);

        // See here to get more data.
        console.log(response);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the game: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          "Something went wrong while fetching the game! See the console for details."
        );
      }
    }

    fetchData();
  }, []);

  let content = <Spinner />;
  content =
    gameModel.role === "drawing" ? (
      <>
        <DrawingStage
        // stored={neededresult}
        // editCompleteCallback={handleEditComplete}
        />
      </>
    ) : (
      <>
        <GuessingStage
        // stored={neededresult}
        // editCompleteCallback={handleEditComplete}
        />
      </>
    );

  return <BaseContainer className="game container">{content}</BaseContainer>;
};

export default Game;
