import React, { Component } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import audio from 'global';

class BgmPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: localStorage.getItem('isPlaying'),
        };
        this.stopOrPlay = this.stopOrPlay.bind(this);
    }

    stopOrPlay() {
        const isPlaying = this.state.isPlaying;
        if(isPlaying){
            audio.pause();
        }else{
            audio.play();
        }
        this.setState({ isPlaying: !isPlaying });
        window.sessionStorage.setItem('isPlaying', !isPlaying);
    }

    componentDidMount() {
        const isPlaying = localStorage.getItem('isPlaying') === 'true';
        if(isPlaying){
            audio.play()
        }
        this.setState({ isPlaying: isPlaying });
        localStorage.removeItem('isPlaying')
    }
    componentWillUnmount() {
        audio.pause();
        localStorage.setItem('isPlaying', this.state.isPlaying);
    }


    render() {
        return (
        <div>
            <button onClick={this.stopOrPlay}>
                {this.state.isPlaying ? <FaPause /> : <FaPlay />}
            </button>
        </div>
        );
    }
}

export default BgmPlayer;