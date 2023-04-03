import React from 'react';
import {api, handleError} from 'helpers/api';
import Room from 'models/Room';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Header.scss';
import 'styles/views/Lobby.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import cats from "styles/images/cats2.png"
import Header from "components/views/Header";
import {Spinner} from 'components/ui/Spinner';
import {useEffect, useState} from 'react';

const Rooms = ({room}) => (
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

const Lobby = props => {
  const history = useHistory();
  const [rooms, setRooms] = useState(null);
  // useEffect(() => {
  //   async function fetchRooms() {
  //     try {
  //       //const repsonse = await api.get('/rooms');
  //       //just to test
  //       const response = {
  //         id: 1,
  //         name: "first room",
  //         players: 3,
  //       };
  //       const testRoom = new Room(response);
  //       setRooms(testRoom);
  //       console.log(testRoom);
  //       console.log(rooms);
  //       console.log(Array.from(testRoom));
  //     } catch (error) {
  //       console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
  //       console.error("Details:", error);
  //       alert("Something went wrong while fetching the users! See the console for details.");
  //     }
  //   }
  //   fetchRooms();
  // }, []);
  // const fetchRooms = async () => {
  //   try {
  //     // const repsonse = await api.get('/rooms');
  //     // just to test
  //     const response = {
  //       id: 1,
  //       name: "first room",
  //       players: 3,
  //     };
  //     const testRoom = new Room(response);
  //     setRooms(testRoom);
  //     console.log(rooms);
  //   }catch (error) {
  //     console.error(`Something went wrong while fetching the rooms: \n${handleError(error)}`);
  //     console.error("Details:", error);
  //     alert("Something went wrong while fetching the rooms! See the console for details.");
  //   }
  // }
  // fetchRooms();
  let content = <Spinner/>;
  if (rooms) {
    content = (
      <div>
        <div className='lobby room-list'>
          <div className='lobby player-container'>
            <div className="lobby id">id</div>
            <div className="lobby name">name</div>
            <div className="lobby player">players</div>
          </div>
        </div>
        <div className='lobby line'></div>
        <ul className="lobby room-list">
          {rooms.map(room => (
              <Rooms room={room} key={room.id}/>
          ))}
        </ul>
      </div>
    );
  }else{
    content = (
      <div>
        <div className='lobby room-list'>
          <div className='lobby room-container'>
            <div className="lobby title" style={{"margin-left": "80px"}}>id</div>
            <div className="lobby title">name</div>
            <div className="lobby title">players</div>
          </div>
          <div className='lobby line'></div>
          <div className='lobby room-container'>
            <div className="lobby content" style={{"margin-left": "80px"}}>1</div>
            <div className="lobby content">long room</div>
            <div className="lobby content">3/4</div>
            <Button style={{"margin-right": "30px", "background-color": "#FFFFFF", "margin-bottom": "5px", "border": "2px solid #000000"}}>
              Join
            </Button>
          </div>
          <div className='lobby line' style={{"border":"2px solid #ad9a66"}}></div>
          <div className='lobby room-container'>
            <div className="lobby content" style={{"margin-left": "80px"}}>a very very very very very long id</div>
            <div className="lobby content">a very very very very very long room</div>
            <div className="lobby content">1/4</div>
            <Button style={{"margin-right": "30px", "background-color": "#FFFFFF", "margin-bottom": "5px", "border": "2px solid #000000"}}>
              Join
            </Button>
          </div>
          <div className='lobby line' style={{"border":"2px solid #ad9a66"}}></div>
        </div>
      </div>
    )
  }
  return (
    <BaseContainer>
      <Header/>
      <div className = "lobby pic" style={{"opacity":"20%", "left":"1000px", "top":"280px"}}>
        <img src={cats}/>
      </div>
      <h2 style={{"left": "420px","top": "180px","color":"black","position":"absolute"}}>Want to create a new game? Click here:</h2>
      <Button style={{"position":"absolute","left": "900px","top": "200px","background-color": "#FFFFFF", "border": "2px solid #000000"}}>
        Create a new room
      </Button>
      {content}
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Lobby;