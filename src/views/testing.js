// App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import DevTools from '../components/devTools';
import Player from '../components/player';
import ResultsPopup from '../components/resultsPopup';
import ReviewPopup from '../components/reviewPopup';

const socket = io('https://skaup-backend-098add53aa0f.herokuapp.com/', { transports: ['websocket']});
// const socket = io('http://localhost:5012');
// const socket = io('http://192.168.1.15:3001'); // for local network testing

// tetsing view
function Testing() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [guess, setGuess] = useState('');
    const [players, setPlayers] = useState(null);
    const [gamePhase, setGamePhase] = useState("Join a game!");
    const [joined, setJoined] = useState(false); 
    const [lobbyName, setLobbyName] = useState('');

    const [ready, setReady] = useState(false);

    useEffect(() => {
        socket.on('game-state', (data) => {
            console.log("game state emitted ,data: ", data);
            console.log("data.players:", data.players);
            setPlayers(data.players);
            setGamePhase(data.phase);
            setLobbyName(data.lobbyName);
            var player = data.players.find(player => player.name === name);
            if(player){
              setReady(player.vote_status);
            }
        });
  
        // Cleanup listener on unmount
        return () => {
          socket.off('update-game');
        };
    }, [name]);

    const handleJoin = () => {
      if(joined) {
        window.alert("You have already joined the game as " + username);
        return;
      }
      if(name === '') {
        window.alert("Please enter your name");
        return;
      }

      let lobbyName = prompt("Enter the name of the game you would like to join", "lobby name");

      var payload = {
          name: name,
          color: "red",
          lobbyName: lobbyName
      }
      socket.emit('join-game', payload);
      setUsername(name);
      setJoined(true);
    }
  
    const handleSubmitGuess = () => {
      if(!joined) {
        window.alert("Please join the game first");
        return;
      }
      var payload = {
          name: username,
          guess: guess
      };
      socket.emit('submit-guess', payload);
      setGuess('');  // Clear the input field
    };

    const toggleReady = () => {
      if(!joined) {
        window.alert("Please join the game first");
        return;
      }
      var payload = {
        name: username
      };
      if(ready) {
        socket.emit('player-unready', payload);
      }else{
        socket.emit('player-ready', payload);
      }
    }
  
    return (
      <div className="App space-y-2">
        <p className='font-mono text-8xl'>Skaup Appið!</p>
        <div className='flex flex-col items-center justify-center bg-blue-100 p-4 rounded'>
          <div className='grid grid-cols-2'>
            <input className='rounded p-2' value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter player name"/>
            <button className='bg-green-500 text-white py-2 px-2 m-2 rounded' onClick={handleJoin}>Join Game</button>
          </div>
          <div className='grid grid-cols-2'>
            <input className='rounded p-2' value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Enter your guess"/>
            <button className='bg-yellow-500 text-white py-2 px-2 m-2 rounded' onClick={handleSubmitGuess}>Submit Guess</button>
          </div>
          <div>
            <p className='bg-black rounded p-2 text-lg text-white font-bold text-gray'>{gamePhase}</p>
          </div>
        </div>
        <div className='flex items-start justify-center'>
        {
          players?.map((player, idx) => 
            player.name === username ? (
              <div key={idx}>
                <Player player={player} socket={socket} gamePhase={gamePhase}/>
              </div>
            ) : null
          )
        }
        </div>
        <button className={`text-white py-2 px-4 rounded ${ready ? 'bg-green-500' : 'bg-red-500'}`} onClick={() => toggleReady()}>{ready ? 'Ready' : 'Not ready'}</button>  
        <DevTools socket={socket} />
        <ReviewPopup socket={socket} username={username}/>
        <ResultsPopup socket={socket} username={username} players={players} gamePhase={gamePhase}/>
      </div>
      );
}
  

export default Testing;
