import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

const Timer = ({ start, stage, sendTimeInfo }) => {
  // const history = useHistory();
  const countDownTimer = useRef();
  // const start = props.start;
  // const stage = props.stage;
  const [seconds, setSeconds] = useState(null);
  const countDown = () => {
    const nowTime = +new Date();
    let times = 6 - parseInt(`${(nowTime - start) / 1000}`);
    // setS(parseInt(`${times%60}`));
    if (stage === "drawing") {
      times = 2 - parseInt(`${(nowTime - start) / 1000}`);
    }
    setSeconds(times);
    if (times <= 0) {
      sendTimeInfo(0);
      clearTimeout(countDownTimer.current);
      // if (stage === "drawing") {
      //   const startGuessing = +new Date();
      //   history.push({
      //     pathname: "/guessingStage",
      //     state: { startGuessing: startGuessing },
      //   });
      // } else if (stage === "guessing") {
      //   history.push("/ranking");
      // }
    } else {
      countDownTimer.current = setTimeout(() => {
        countDown();
      }, 1000);
    }
  };

  useEffect(() => {
    // if (props.start)
    if (start) {
      countDown();
    }
    return () => {
      clearTimeout(countDownTimer.current);
    };
  }, []);

  // useEffect(() => {
  //   let myInterval = setInterval(() => {
  //     if (start && seconds > 0) {
  //       setSeconds(seconds - 1);
  //     }
  //     if (seconds === 0) {
  //       if(stage==="drawing"){
  //         history.push('/guessingStage');
  //         window.location.reload();
  //       }else if(stage==="guessing"){
  //         history.push('/ranking');
  //         window.location.reload();
  //       }
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(myInterval);
  //   };
  // }, [stage,seconds]);

  return (
    <div>
      {/* left time: {seconds > 9 ? seconds : `0${seconds}`}s */}
      {/* left time: {s > 9 ? s : `0${s}`}s */}
      left time: {seconds}s
    </div>
  );
};

export default Timer;
