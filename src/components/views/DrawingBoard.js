import React, { useEffect , useState} from "react";
import PropTypes from "prop-types";
import "styles/views/DrawingBoard.scss";
import { useRef } from "react";
import {Button} from 'components/ui/Button';
import BaseContainer from "components/ui/BaseContainer";
import {useHistory} from 'react-router-dom';

const DrawingBoard = () => {

    const history = useHistory();
    const role = "drawingPlayer";
    const setConvasRef = useOnDraw(onDraw);
    let lineColor = "#000000";
    let lineWidth = 5;

    const [time, setTime] = useState(new Date());

    // window.onload = function(){
    //     const canvas = document.querySelector('#board');
    //     const ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.fillStyle = "#ffffff";
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);
    // };

    useEffect(() => {
        let ignore = false;
        if (!ignore) {clear();}
        return () => { ignore = true; }
        },[]);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         doGetDrawing();
    //     }, 500);
    //     return () => clearInterval(timer);
    // },[])
    
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
        history.push({pathname:'/guessingStage',state:{url:url}});  
    }

    // function clearShowing() {
    //     const canvas = document.querySelector('#showingBoard');
    //     const ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     ctx.fillStyle = "#ffffff";
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);
    // }
  

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
                id="board"
                width="500px"
                height="600px"
                style={{ "border": "2px solid #000000", "backgroundColor": "#FFFFFF" }}
                // ref={setConvasRef}
            >
            </canvas>)
            }
            
        </div>
        {/* <div className="drawingBoard board" style={{"left": "600px", "top": "330px"}}>
        <canvas
                id="showingBoard"
                width="500px"
                height="600px"
                style={{ "border": "2px solid #000000", "backgroundColor": "#FFFFFF" }}
                // ref={setConvasRef}
            >
        </canvas>
        </div> */}
        <div className="drawingBoard container">
            <div className="drawingBoard circle" style={{"backgroundColor": "#FF0000" }}
            onClick={()=> lineColor='#FF0000'}>
            </div>
            <div className="drawingBoard circle" style={{"backgroundColor": "#FF7B00" }}
            onClick={()=> lineColor='#FF7B00'}>
            </div>
            <div className="drawingBoard circle" style={{"backgroundColor": "#FFFF00" }}
            onClick={()=> lineColor='#FFFF00'}>
            </div>
            <div className="drawingBoard circle" style={{"backgroundColor": "#00FF00" }}
            onClick={()=> lineColor='#00FF00'}>
            </div>
            <div className="drawingBoard circle" style={{"backgroundColor": "#0000FF" }}
            onClick={()=> lineColor='#0000FF'}>
            </div>
            <div className="drawingBoard circle" style={{"backgroundColor": "#FF00FF" }}
            onClick={()=> lineColor='#FF00FF'}>
            </div>
            <div className="drawingBoard circle" style={{"backgroundColor": "#000000" }}
            onClick={()=> lineColor='#000000'}>
            </div>
        </div>
        <div className="drawingBoard container" style={{"margin-top":"40px"}}>
            <Button onClick={()=> download('#board')} style={{ "border": "2px solid #000000"}}>
                download
            </Button>
            <Button onClick={()=> clear()} style={{ "border": "2px solid #000000", "margin-left":"15px"}}>
                clear
            </Button>
            <Button onClick={()=> lineColor='#FFFFFF'} style={{ "border": "2px solid #000000", "margin-left":"15px"}}>
                eraser
            </Button>
            <Button onClick={()=> doSubmit()} style={{ "border": "2px solid #000000","margin-left":"15px"}}>
                submit
            </Button>
            <Button onClick={()=> lineBold()} style={{ "border": "2px solid #000000","margin-left":"15px", "width":"40px"}}>
                 + 
            </Button>
            <Button onClick={()=> lineThinner()} style={{ "border": "2px solid #000000","margin-left":"15px", "width":"40px"}}>
                 -  
            </Button>
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