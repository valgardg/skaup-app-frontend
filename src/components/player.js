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
        <div className="flex flex-col justify-center items-center bg-blue-100 m-4 rounded-lg border-2 border-white w-56 p-2">
            <div className="">
                <div className={`text-${player?.color}-600 text-xl font-bold`}>{player?.name}</div>
            </div>
            <div className="w-full text-left">
                <p className="">Guesses</p>
                <div className="space-y-2">
                    {player?.guesses.map((guessObject, idx) => (
                        <div key={idx} className={`p-2 rounded w-full ${guessObject.ticked ? 'bg-green-400' : 'bg-red-200'}`}>
                            <div className="flex justify-between space-x-2">
                                <button onClick={() => tickGuess(guessObject)} key={idx} className="w-full text-left">{guessObject.guess}</button>
                                <button className="bg-red-500 h-5 text-white px-1 rounded text-xs" onClick={() => deleteGuess(guessObject)}>x</button>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-lg font-bold">{player.vote_status ? "Ready" : "Not ready"}</p>
            </div>
        </div>
    );
}

export default Player;