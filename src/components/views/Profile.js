import React from 'react';
import {api, handleError} from 'helpers/api';
import Room from 'models/Room';
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
import { ProfileGuard } from 'components/routing/routeProtectors/ProfileGuard';

Room.propTypes = {
  room: PropTypes.object
};

const Profile = props => {
  return (
    <BaseContainer>
      <Header/>
      <div className = "lobby pic" style={{"opacity":"20%", "left":"1000px", "top":"280px"}}>
        <img src={cats}/>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Profile;
