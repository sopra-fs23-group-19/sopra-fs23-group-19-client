import React from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Header.scss';
import 'styles/views/Lobby.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import cats from "styles/picture/cats2.png"
import Header from "components/views/Header";
import {Spinner} from 'components/ui/Spinner';
import {useEffect, useState} from 'react';

const Room = ({room}) => (
  <div className="lobby container">
    <div className="lobby id">{room.id}</div>
    <div className="lobby name">{room.name}</div>
    <div className="lobby players">id: {room.players}</div>
    <Button>
      Join
    </Button>
  </div>
);

Room.propTypes = {
  room: PropTypes.object
};

const FormField = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

const Lobby = props => {
  // const history = useHistory();
  // const [rooms, setRooms] = useState(null);
  // useEffect(() => {
  //   // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
  //   async function fetchData() {
  //     try {
  //       const response = await api.get('/rooms');

  //       // delays continuous execution of an async operation for 1 second.
  //       // This is just a fake async call, so that the spinner can be displayed
  //       // feel free to remove it :)
  //       await new Promise(resolve => setTimeout(resolve, 1000));

  //       // Get the returned users and update the state.
  //       setRooms(response.data);

  //       // This is just some data for you to see what is available.
  //       // Feel free to remove it.
  //       console.log('request to:', response.request.responseURL);
  //       console.log('status code:', response.status);
  //       console.log('status text:', response.statusText);
  //       console.log('requested data:', response.data);

  //       // See here to get more data.
  //       console.log(response);
  //     } catch (error) {
  //       console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
  //       console.error("Details:", error);
  //       alert("Something went wrong while fetching the users! See the console for details.");
  //     }
  //   }

  //   fetchData();
  // }, []);
  // let content = <Spinner/>;
  // if (rooms) {
  //   content = (
  //     <div>
  //       <ul className="lobby room-list">
  //         {rooms.map(room => (
  //           <Room room={room} key={room.id}/>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // }
  return (
    <BaseContainer>
      <Header/>
      <div className = "lobby pic" style={{"opacity":"20%", "left":"1000px", "top":"280px"}}>
        <img src={cats}/>
      </div>
      {/* {content} */}
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Lobby;
