import React,{useState,useEffect,useRef} from 'react';
import './style.css';

function Game() {
    const [text ,setText] = useState("");
    const [timeleft ,setTimeLeft] = useState(0);
    const [isTimeRunning,setIsTimeRunning] = useState(false)
    const [word,setWord] = useState(0)
    const textBoxRef = useRef(null)

    function handleChange(e){
        setText(e.target.value);
    }
    function startGame(e){
        setIsTimeRunning(true)
        setTimeLeft(5)
        setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }
    function endGame(){
        setIsTimeRunning(false)
        setWord(countWord(text));
    }
    function countWord(text){
        const wordArr =  text.trim().split(" ");
        return wordArr.filter(word => word !== "").length
    }

    useEffect(()=>{
        if(isTimeRunning && timeleft>0 ){
            setTimeout(()=>{
                setTimeLeft(prvs => prvs -1)
            },1000)
        }else if(timeleft === 0) {
            endGame()
    }},[isTimeRunning,timeleft])
    
  return (
    <div className="Game">
        <h1>How fast do you type ? </h1>
        <textarea
            ref={textBoxRef}
            onChange={handleChange} 
            value={text}
            disabled={!isTimeRunning}

        />
        <h4> Time remaining: {timeleft}
         </h4>
        <button onClick={startGame} disabled={isTimeRunning}>Start</button>
        <h3>Word count: {word}</h3>
    </div>
  );
}

export default Game;
