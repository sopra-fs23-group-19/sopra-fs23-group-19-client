import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Header.scss';
import 'styles/views/Rules.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import cats from "styles/picture/cats2.png"
import Header from "components/views/Header";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
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

const Rules = props => {
  
  return (
    <BaseContainer>
       <Header/>
       <div className = "rules pic" style={{"opacity":"20%", "left":"1000px", "top":"280px"}}>
        <img src={cats}/>
      </div>
      <div className='rules container'>
        <div className='rules form'>
            <div className='rules title'>
                Description:
            </div>
            <div className='rules content'>
This is a social drawing application where players take turns drawing a picture of a given word, and other players compete to guess the word from the drawing.
            </div>
            <div className='rules title'>
                The game process:
            </div>
            <div className='rules content'>
            1. The system randomly decides the order of drawing.<br />
2. The drawing player chooses a word from three words given. Then he/she has 60s to draw a picture describing that word.<br />
3. Once the drawing player finishes the painting and submits it to the system, the painting is shown to the guessing player. After that, all guessing players have another 60s to submit answers guessing the word for once only.<br />
4. After each round, the guessing players will get one point if they answer it correctly otherwise they will not get any point.<br />
5. The game ends if all the players have done the drawing once. And it will shows the final point of each player.
            </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Rules;
