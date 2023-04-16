import { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';

const Timer = (props) =>{
  const [seconds, setSeconds] = useState(60);
  const history = useHistory();
  const start = props.start;
  const stage = props.stage;
  const resetTimer = () => {
    setSeconds(60);
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (start && seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if(stage==="drawing"){
          history.push('/guessingStage');
          window.location.reload();
        }else if(stage==="guessing"){
          history.push('/ranking');
          window.location.reload();
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [stage,seconds]);

  return (
    <div>
      left time: {seconds > 9 ? seconds : `0${seconds}`}s
    </div>
  );
}

export default Timer;