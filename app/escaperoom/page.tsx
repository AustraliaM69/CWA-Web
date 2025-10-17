'use client';
import { useState } from 'react';
import Timer from '../components/Timer';

type Stage = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default function EscapeRoom() {
  const [gameStarted, setGameStarted] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(10);
  const [currentStage, setCurrentStage] = useState<Stage>(1);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  
  const [stage1Answer, setStage1Answer] = useState('');
  const [stage2Answer, setStage2Answer] = useState('');
  const [stage3Code, setStage3Code] = useState('');
  const [stage4Answer, setStage4Answer] = useState('');
  const [stage5Answer, setStage5Answer] = useState('');
  const [stage6Answer, setStage6Answer] = useState('');
  const [stage7Code, setStage7Code] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [saved, setSaved] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleTimeUp = () => {
    setGameOver(true);
    setWon(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setWon(false);
    setCurrentStage(1);
    setStage1Answer('');
    setStage2Answer('');
    setStage3Code('');
    setStage4Answer('');
    setStage5Answer('');
    setStage6Answer('');
    setStage7Code('');
    setCorrectAnswers(0);
  };

const skipStage=()=>{
  if(currentStage<7){
    setCurrentStage((currentStage+1) as Stage);
  }else{
    setGameOver(true);
    setWon(true);
  }
};

  const checkStage1 = () => {
    if (stage1Answer.trim() === '6') {
      alert('correct!');
      setCorrectAnswers(correctAnswers + 1);
      setCurrentStage(2);
    } else {
      alert('wrong answer try again');
    }
  };

  const checkStage2 = () => {
    if (stage2Answer.toLowerCase().trim() === 'semicolon') {
      alert('nice! next stage');
      setCorrectAnswers(correctAnswers + 1);
      setCurrentStage(3);
    } else {
      alert('nope');
    }
  };

  const checkStage3 = () => {
    try {
      const func = new Function('return ' + stage3Code)();
      const result = func();
      
      if (Array.isArray(result) && result.length === 11 && 
          result[0] === 0 && result[10] === 10) {
        alert('good job!');
        setCorrectAnswers(correctAnswers + 1);
        setCurrentStage(4);
      } else {
        alert('not quite');
      }
    } catch (error) {
      alert('error: ' + error);
    }
  };

  const checkStage4 = () => {
    if (stage4Answer.trim() === 'JSON.stringify(data)') {
      alert('correct');
      setCorrectAnswers(correctAnswers + 1);
      setCurrentStage(5);
    } else {
      alert('wrong');
    }
  };

const checkStage5 = () => {
  if(stage5Answer.toLowerCase().includes('for') || stage5Answer.toLowerCase().includes('while')){
    alert('yes!');
    setCorrectAnswers(correctAnswers + 1);
    setCurrentStage(6);
  }else{
    alert('no');
  }
};

  const checkStage6 = () => {
    if (stage6Answer.trim() === 'string') {
      alert('right!');
      setCorrectAnswers(correctAnswers + 1);
      setCurrentStage(7);
    } else {
      alert('nope');
    }
  };

  const checkStage7=()=>{
    try{
      const f = new Function(stage7Code + '\nreturn reverseString("hello");')();
      if(f === 'olleh'){
        setCorrectAnswers(correctAnswers + 1);
        setGameOver(true);
        setWon(true);
      }else{
        alert('doesnt work');
      }
    }catch(e){
      alert('code error');
    }
  };

  if (!gameStarted) {
    return (
      <main className="min-h-screen bg-gray-800 p-6">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-white">
            Escape Room - Code Your Way Out!
          </h1>
          <p className="text-white mb-6">
            solve all the questions before time runs out
          </p>

          <div className="bg-gray-700 p-6 mb-4" style={{border: '2px solid #555'}}>
            <h2 className="text-xl mb-3 text-white">
              Set Timer (minutes)
            </h2>
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setTimerMinutes(Math.max(1, timerMinutes - 1))}
                className="px-3 py-1 bg-red-600 text-white"
                style={{fontSize: '20px'}}
              >
                -
              </button>
              <div className="text-2xl text-white" style={{padding: '5px 15px', background: '#444'}}>
                {timerMinutes} min
              </div>
              <button
                onClick={() => setTimerMinutes(timerMinutes + 1)}
                className="px-3 py-1 bg-green-600 text-white"
                style={{fontSize: '20px'}}
              >
                +
              </button>
            </div>
            
            <div className="text-white mb-4" style={{fontSize: '14px'}}>
              <p>- Stage 1: basic math</p>
              <p>- Stage 2: find missing syntax</p>
              <p>- Stage 3: generate numbers</p>
              <p>- Stage 4: data conversion</p>
              <p>- Stage 5: loop question</p>
              <p>- Stage 6: data types</p>
              <p>- Stage 7: string reversal</p>
            </div>

            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-2 bg-gray-600 text-white mb-3"
              style={{border: '1px solid #444'}}
              placeholder="enter your name (optional)"
            />

            <button
              onClick={() => {
                setGameStarted(true);
                setStartTime(Date.now());
              }}
              className="px-6 py-3 bg-blue-600 text-white"
              style={{fontSize: '18px', marginTop: '10px'}}
            >
              START
            </button>
          </div>
        </div>
      </main>
    );
  }

  const saveGame = async () => {
    try {
      const timeUsed = Math.floor((Date.now() - startTime) / 1000);
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: playerName || 'Anonymous',
          completed: won,
          timeUsed,
          stagesCompleted: correctAnswers,
          score: won ? Math.max(1000 - timeUsed, 100) : correctAnswers * 100
        })
      });
      
      if (response.ok) {
        setSaved(true);
        alert('game saved!');
      } else {
        alert('failed to save');
      }
    } catch (error) {
      alert('error saving');
    }
  };

  if (gameOver) {
    return (
      <main className="min-h-screen bg-gray-800 p-8 flex items-center justify-center">
        <div className="max-w-lg bg-gray-700 p-8" style={{border: '3px solid ' + (won ? 'green' : 'red')}}>
          <h1 className="text-4xl font-bold mb-4" style={{color: won ? '#4ade80' : '#ef4444'}}>
            {won ? 'YOU ESCAPED!' : 'TIMES UP'}
          </h1>
          <p className="text-xl mb-6 text-white">
            {won ? 'nice job you solved everything' : 'you didnt make it out'}
          </p>
          <p className="text-gray-300 mb-4">
            Correct Answers: {correctAnswers}/7
          </p>
          
          <div style={{display:'flex',gap:'10px'}}>
            <button
              onClick={resetGame}
              className="px-5 py-2 bg-blue-600 text-white"
              style={{fontSize: '16px'}}
            >
              play again
            </button>
            {!saved && (
              <button
                onClick={saveGame}
                className="px-5 py-2 bg-green-600 text-white"
                style={{fontSize: '16px'}}
              >
                save score
              </button>
            )}
          </div>
          {saved && <p className="text-green-400 mt-2">saved!</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-800 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-800 p-3 mb-4" style={{border: '2px solid darkred'}}>
          <Timer 
            initialTime={timerMinutes * 60} 
            onTimeUp={handleTimeUp} 
            isRunning={!gameOver} 
          />
        </div>

        <div className="bg-gray-700 p-3 mb-4" style={{border: '1px solid #555'}}>
          <span className="text-white">Stage {currentStage}/7</span>
        </div>

        <div className="bg-gray-700 p-6" style={{border: '2px solid #555'}}>
          {currentStage === 1 && (
            <div>
              <h2 className="text-2xl mb-3 text-white">
                Stage 1 - Basic Math
              </h2>
              <p className="text-white mb-3">
                What is 2 + 4?
              </p>
              <input
                type="text"
                value={stage1Answer}
                onChange={(e) => setStage1Answer(e.target.value)}
                className="w-full p-2 bg-gray-600 text-white mb-3"
                style={{border: '1px solid #444'}}
                placeholder="type answer here"
              />
              <button
                onClick={checkStage1}
                className="px-4 py-2 bg-green-700 text-white"
              >
                submit
              </button>
            </div>
          )}

          {currentStage === 2 && (
            <div>
              <h2 className="text-2xl mb-3 text-white">
                Stage 2 - Find Missing Syntax
              </h2>
              <p className="text-white mb-3">
                This code has an error. What punctuation is missing at the end?
              </p>
              <div className="bg-gray-900 p-3 mb-3" style={{border: '1px solid black'}}>
                <pre className="text-green-400">
{`let x = 5
console.log(x)`}
                </pre>
              </div>
              <p className="text-gray-300 mb-2 text-sm">hint: its needed after the first line</p>
              <input
                type="text"
                value={stage2Answer}
                onChange={(e) => setStage2Answer(e.target.value)}
                className="w-full p-2 bg-gray-600 text-white mb-3"
                style={{border: '1px solid #444'}}
              />
              <button
                onClick={checkStage2}
                className="px-4 py-2 bg-green-700 text-white"
              >
                submit
              </button>
            </div>
          )}

          {currentStage === 3 && (
            <div>
              <h2 className="text-2xl mb-3 text-white">
                Stage 3 - Generate Numbers
              </h2>
              <p className="text-white mb-3">
                Write code that returns array with numbers 0 to 10
              </p>
              <div className="bg-gray-900 p-2 mb-2">
                <code className="text-gray-400 text-sm">
                  example: function() {'{ return [0,1,2,...,10] }'}
                </code>
              </div>
              <textarea
                value={stage3Code}
                onChange={(e) => setStage3Code(e.target.value)}
                className="w-full h-32 p-2 bg-gray-900 text-green-400 font-mono mb-3"
                style={{border: '1px solid black'}}
              />
              <button
                onClick={checkStage3}
                className="px-4 py-2 bg-green-700 text-white"
              >
                submit
              </button>
            </div>
          )}

          {currentStage === 4 && (
            <div>
              <h2 className="text-2xl mb-3 text-white">
                Stage 4 - Convert Data
              </h2>
              <p className="text-white mb-3">
                How do you convert a javascript object to JSON string?
              </p>
              <p className="text-gray-300 mb-2 text-sm">
                write the function name with parameter: functionName(data)
              </p>
              <input
                type="text"
                value={stage4Answer}
                onChange={(e) => setStage4Answer(e.target.value)}
                className="w-full p-2 bg-gray-600 text-white mb-3"
                style={{border: '1px solid #444'}}
              />
              <button
                onClick={checkStage4}
                className="px-4 py-2 bg-green-700 text-white"
              >
                submit
              </button>
            </div>
          )}

{currentStage===5&&<div>
<h2 className="text-2xl mb-3 text-white">Stage 5 - Loops</h2>
<p className="text-white mb-3">what type of loop can you use to iterate through an array?</p>
<p className="text-gray-300 text-sm mb-2">(just type the keyword)</p>
<input type="text" value={stage5Answer} onChange={(e)=>setStage5Answer(e.target.value)} 
className="w-full p-2 bg-gray-600 text-white mb-3" style={{border:'1px solid #444'}}/>
<button onClick={checkStage5} className="px-4 py-2 bg-green-700 text-white">submit</button>
</div>}

          {currentStage === 6 && (
            <div>
              <h2 className="text-2xl mb-3 text-white">
                Stage 6 - Data Types
              </h2>
              <p className="text-white mb-3">
                what data type is this: "hello world"
              </p>
              <input
                type="text"
                value={stage6Answer}
                onChange={(e) => setStage6Answer(e.target.value)}
                className="w-full p-2 bg-gray-600 text-white mb-3"
                style={{border: '1px solid #444'}}
              />
              <button
                onClick={checkStage6}
                className="px-4 py-2 bg-green-700 text-white"
              >
                submit
              </button>
            </div>
          )}

{currentStage===7&&<div>
<h2 className="text-2xl mb-3 text-white">Stage 7 - FINAL CHALLENGE</h2>
<p className="text-white mb-3">write a function called reverseString that takes a string and returns it reversed</p>
<div className="bg-gray-900 p-2 mb-2"><code className="text-gray-400 text-sm">example: reverseString("abc") should return "cba"</code></div>
<textarea value={stage7Code} onChange={(e)=>setStage7Code(e.target.value)} 
className="w-full h-32 p-2 bg-gray-900 text-green-400 font-mono mb-3" style={{border:'1px solid black'}}
placeholder="function reverseString(str){...}"/>
<button onClick={checkStage7} className="px-5 py-3 bg-green-700 text-white" style={{fontWeight:'bold'}}>
ESCAPE NOW!!!</button>
</div>}

          <br/>
          <div style={{display:'flex',gap:'10px',marginTop:'5px'}}>
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-red-700 text-white"
          >
            give up
          </button>
          <button onClick={skipStage} className="px-4 py-2 bg-yellow-600 text-white">skip this</button>
          </div>
        </div>
      </div>
    </main>
  );
}
