import React from "react";

function Player({player, socket, gamePhase}) {

    const deleteGuess = (guessObject) => {
        //console.log("delete guess:", guessObject.guess);
        var payload = {
            name: player.name,
            guess: guessObject.guess
        }
        socket.emit('delete-guess', payload);
    };

    const tickGuess = (guessObject) => {
        //console.log("tick guess:", guessObject.guess);
        var payload = {
            name: player.name,
            guess: guessObject.guess
        }
        socket.emit('tick-guess', payload);
    }

    return (
        <div className="flex flex-col justify-center items-center bg-green-200 m-4 rounded-lg w-56 p-2">
            <div className="">
                <div className={`text-${player?.color}-600`}>{player?.name}</div>
            </div>
            <div>
                <p>Guesses</p>
                {player?.guesses.map((guessObject, idx) => (
                    <div className={`p-2 rounded w-full ${guessObject.ticked ? 'bg-green-400' : 'bg-red-200'}`}>
                        <div className="flex items-center justify-center space-x-2">
                            <button onClick={() => tickGuess(guessObject)} key={idx}>{guessObject.guess}</button>
                            <button className="bg-red-500 text-white py-1 px-1 rounded text-xs" onClick={() => deleteGuess(guessObject)}>x</button>
                        </div>
                    </div>
                ))}
            </div>
            <p>vote status: {player.vote_status ? "Ready" : "Not ready"}</p>
        </div>
    );
}

export default Player;