import React, { useEffect , useState} from "react";
import PropTypes from "prop-types";
import "styles/views/DrawingBoard.scss";
import { useRef } from "react";
import {Button} from 'components/ui/Button';
import BaseContainer from "components/ui/BaseContainer";
import {useHistory} from 'react-router-dom';

const DrawingBoard = (props) => {

    const history = useHistory();
    const role = props.role;
    const start = props.start;
    const setConvasRef = useOnDraw(onDraw);
    let lineColor = "#000000";
    let lineWidth = 5;

    const [seconds, setSeconds]=useState(null);
    const Timer = useRef();

    // const check = () => {
    //     const nowTime = +new Date();
    //     const times = 60-parseInt(`${(nowTime - start)/1000}`); //是剩余时间
    //         setSeconds(times);
    //         console.log(times);
    //     if(times <= 0){
    //      //如果到时间了
    //      doSubmit();
    //      clearTimeout(Timer.current);
    //      //push到下一个页面之类的
    //     }else{
    //      //没到时间
    //      Timer.current = setTimeout(()=>{
    //       check();
    //      },1000); //这里可以设置时间间隔，1000是1s，0.5s就是500等等
    //     }
    //    };
    const nowTime = +new Date();
    let times = 60-parseInt(`${(nowTime - start)/1000}`);
    // Timer.current = setTimeout(()=>{
    //     times = times - 1;
    //     console.log(times);
    // },1000);

    useEffect(() => {
        let ignore = false;
        if (!ignore) {clear();}
        return () => { ignore = true; }
        },[]);

    useEffect(() => {
        const timer = setInterval(() => {
            times = times - 1;
            console.log(times);
            if(times <= 0){
                doSubmit();
            }
        }, 1000);
        return () => clearInterval(timer);
    },[])
    
    // useEffect(()=>{
    //     if(start){check();}
    //     return()=>{
    //      clearTimeout(Timer.current);
    //     };
    //    },[]);

    // useEffect(()=>{
    //     if(times<=10){
    //         const canvas = document.getElementById('board');
    //         const url = canvas.toDataURL();
    //         console.log(url);
    //         const startGuessing = +new Date();
    //         history.push({pathname:'/guessingStage',state:{url:url, startGuessing:startGuessing}}); 
    //     }
    //     return()=>{
    //      clearTimeout(Timer.current);
    //     };
    // },[]);

    function onDraw(canvasObject, point, previousPoint) {
        drawLine(previousPoint, point, canvasObject, lineColor, lineWidth)
    }

    function drawLine(start,end,canvasObject,color,width) {

        start = start ?? end;
        canvasObject.beginPath();
        canvasObject.lineWidth = width;
        canvasObject.strokeStyle = color;
        canvasObject.moveTo(start.x, start.y);
        canvasObject.lineTo(end.x, end.y);
        canvasObject.stroke();

        canvasObject.fillStyle = color;
        canvasObject.beginPath();
        canvasObject.arc(start.x, start.y, width*0.45, 0, width * Math.PI);
        canvasObject.fill();
    }

    // function doGetDrawing(){
    //     const myCanvas = document.getElementById('showingBoard'); 
    //     const myContext = myCanvas.getContext('2d');
    //     const drawingCanvas = document.getElementById('board');
    //     const img = new Image();        
    //     img.src = drawingCanvas.toDataURL();
    //     console.log(img.src);
    //     img.onload = () => {myContext.drawImage(img, 0, 0);};
    // }

    function download(selector) {

        const canvas = document.querySelector(selector);
        const img = document.createElement('a');
        
        img.href = canvas.toDataURL();
        img.download = 'your drawing';
        
        const event = new MouseEvent('click');
        img.dispatchEvent(event);
    }

    function clear() {
        const canvas = document.querySelector('#board');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function doSubmit() {
        const canvas = document.getElementById('board');
        const url = canvas.toDataURL();
        const startGuessing = +new Date();
        history.push({pathname:'/guessingStage',state:{url:url, startGuessing:startGuessing}});  
    }

    // function clearShowing() {
    //     const canvas = document.querySelector('#showingBoard');
    //     const ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.fillStyle = "#ffffff";
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);
    // }
  

    const redPen = async() => {
        lineColor = '#FF0000';
    }

    const orangePen = async() => {
        lineColor = '#FF7B00';
    }

    const yellowPen = async() => {
        lineColor = '#FFFF00';
    }

    const greenPen = async() => {
        lineColor = '#00FF00';
    }

    const bluePen = async() => {
        lineColor = '#0000FF';
    }

    const purplePen = async() => {
        lineColor = '#FF00ff';
    }

    const blackPen = async() => {
        lineColor = '#000000';
    }

    const eraser = async() =>{
        lineColor = '#FFFFFF'
    }

    const lineBold = async() => {
        lineWidth = lineWidth + 1;
    }

    const lineThinner = async() => {
        if(lineWidth <= 1){
            lineWidth = lineWidth;
        }else{
            lineWidth = lineWidth - 1;
        }
    }

    return(
        <BaseContainer>
        <div className="drawingBoard board">
            {(role==="drawingPlayer") ? (
                <canvas
                id="board"
                width="500px"
                height="600px"
                style={{ "border": "2px solid #000000", "backgroundColor": "#FFFFFF", "cursor":"pointer"}}
                ref={setConvasRef}
            >
            </canvas>
            ):(
                <canvas
                id="showingBoard"
                width="500px"
                height="600px"
                style={{ "border": "2px solid #000000", "backgroundColor": "#FFFFFF" }}
                // ref={setConvasRef}
            >
            </canvas>)
            }
            
        </div>
        <div className="drawingBoard container">
            <div className="drawingBoard circle" style={{"backgroundColor": "#FF0000" }}
            onClick={()=> redPen()}>
            </div>
            <div className="drawingBoard circle" style={{"backgroundColor": "#FF7B00" }}
            onClick={()=> orangePen()}>
            </div>
            <div className="drawingBoard circle" style={{"backgroundColor": "#FFFF00" }}
            onClick={()=> yellowPen()}>
            </div>
            <div className="drawingBoard circle" style={{"backgroundColor": "#00FF00" }}
            onClick={()=> greenPen()}>
            </div>
            <div className="drawingBoard circle" style={{"backgroundColor": "#0000FF" }}
            onClick={()=> bluePen()}>
            </div>
            <div className="drawingBoard circle" style={{"backgroundColor": "#FF00FF" }}
            onClick={()=> purplePen()}>
            </div>
            <div className="drawingBoard circle" style={{"backgroundColor": "#000000" }}
            onClick={()=> blackPen()}>
            </div>
        </div>
        <div className="drawingBoard container" style={{"margin-top":"40px"}}>
            {(role==="drawingPlayer") ? (
            <>
                    <Button onClick={() => download('#board')} style={{ "border": "2px solid #000000" }}>
                            download
                    </Button>
                    <Button onClick={() => clear()} style={{ "border": "2px solid #000000", "margin-left": "15px" }}>
                            clear
                    </Button>
                    <Button onClick={() => eraser()} style={{ "border": "2px solid #000000", "margin-left": "15px" }}>
                            eraser
                    </Button>
                    <Button onClick={() => doSubmit()} style={{ "border": "2px solid #000000", "margin-left": "15px" }}>
                            submit
                    </Button>
                    <Button onClick={() => lineBold()} style={{ "border": "2px solid #000000", "margin-left": "15px", "width": "40px" }}>
                            +
                    </Button>
                    <Button onClick={() => lineThinner()} style={{ "border": "2px solid #000000", "margin-left": "15px", "width": "40px" }}>
                            -
                    </Button></>
            )
            :(<></>)
        }
        </div>
        </BaseContainer>
    );
};

function useOnDraw(onDraw) {
    const canvasRef = useRef(null);

    const isDrawingRef = useRef(false);

    const mouseMoveListenerRef = useRef(null);
    const mouseDownListenerRef = useRef(null);
    const mouseUpListenerRef = useRef(null); 

    const previousPointRef = useRef(null);

    useEffect(()=>{
        return () => {
            if(mouseMoveListenerRef.current) {
                window.removeEventListener("mousemove", mouseMoveListenerRef.current);
            }
            if(mouseUpListenerRef.current) {
                window.removeEventListener("mouseup", mouseUpListenerRef.current);
            }
        }
    }, []);

    function setConvasRef(ref) {
        if(!ref) return;
        if(mouseMoveListenerRef.current){
            canvasRef.current.removeEventListener("mousedown", mouseMoveListenerRef.current);
        }
        canvasRef.current = ref;
        initMouseMoveListener();
        initMouseDownListener();
        initMouseUpListener()
    }

    function initMouseMoveListener(){
        const mouseMoveListener = (e) =>{
            if(isDrawingRef.current) {
                console.log({x: e.clientX, y: e.clientY});
                const point = computePointInCanvas(e.clientX, e.clientY);
                console.log(point);//receive the point in the board
                const canvasObject = canvasRef.current.getContext('2d');
                if(onDraw){
                    onDraw(canvasObject, point, previousPointRef.current);
                }
                previousPointRef.current = point;
            }
        }
        mouseMoveListenerRef.current = mouseMoveListener;
        window.addEventListener("mousemove", mouseMoveListener);//relative to the top/left of the window
    }

    function initMouseDownListener() {
        if(!canvasRef.current) return;
        const mouseDownListener = () => {
            isDrawingRef.current = true;
        }
        mouseDownListenerRef.current = mouseDownListener;
        window.addEventListener("mousedown", mouseDownListener);
    }

    function initMouseUpListener() {
        const mouseUpListener = () => {
            isDrawingRef.current = false;
            previousPointRef.current = null;
        }
        mouseUpListenerRef.current = mouseUpListener;
        window.addEventListener("mouseup", mouseUpListener);
    }

    function computePointInCanvas(clientX, clientY){
        if(canvasRef.current){
            const boundingRect = canvasRef.current.getBoundingClientRect();
            return {
                x: clientX - boundingRect.left,
                y: clientY - boundingRect.top
            }
        }
        
    }
    return setConvasRef;
}

DrawingBoard.propTypes = {
    height: PropTypes.string,
};
  
  /**
   * Don't forget to export your component!
   */
export default DrawingBoard;