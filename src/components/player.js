import React from "react";

function Player({player, socket, gamePhase}) {

    const deleteGuess = (guess) => {
        console.log("delete guess:", guess);
        var payload = {
            name: player.name,
            guess: guess
        }
        socket.emit('delete-guess', payload);
    };

    return (
        <div className="bg-green-200 m-4 rounded-lg w-56">
            <div className="">
                <div className={`text-${player?.color}-600`}>{player?.name}</div>
            </div>
            <p>Player guesses</p>
            {player?.guesses.map((guess, idx) => (
                <div className="flex items-center justify-center space-x-2">
                    <div key={idx}>{guess}</div>
                    <button className="bg-red-500 text-white py-1 px-1 rounded text-xs" onClick={() => deleteGuess(guess)}>x</button>
                </div>
            ))}
            <p>vote status: {player.vote_status ? "Ready" : "Not ready"}</p>
        </div>
    );
}

export default Player;