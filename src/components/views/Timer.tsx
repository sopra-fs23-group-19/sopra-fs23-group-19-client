import { useState, useRef, useEffect } from 'react';

interface ViewTime {
	mss: number;
}
type Fnc = () => void;
const noop = () => {};

const Timer = (props: Partial<ViewTime>)=>{
	const { mss } = props;
	const [time, setTime] = useState(mss || 0);
	const tickRef = useRef<Fnc>(noop);
	const tick = () => {
		if (time > 0) {
		  setTime(time - 1);
		}
	};
	useEffect(() => {
		tickRef.current = tick;
	});
	useEffect(() => {
		const timer = setInterval(() => tickRef.current(), 1000);
		console.log("tick", timer);
		return () => clearInterval(timer);
	}, []);
	return [time];
};
export default Timer;