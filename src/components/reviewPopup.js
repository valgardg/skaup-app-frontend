import React, { useEffect, useState } from "react";

function ReviewPopup({ socket, username }) {
    const [guesses, setGuesses] = useState();
    const [guessDict, setGuessDict] = useState({});
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        socket.on('review-info', (data) => {
            console.log(data);
            setGuessDict(data);
        });
    }, [socket]);

    useEffect(() => {
        console.log("username: ", username);
        var guesses = guessDict[username];
        console.log("guesses: ", guesses?.guesses);
        if(guesses?.guesses.length > 0) {
            setGuesses(guesses.guesses);
            setDisplay(true);
        }
    }, [guessDict]);

    const toggleAccepted = (guessObject) => {
        guessObject.accepted = !guessObject.accepted;
        var payload = {
            guess : guessObject
        };
        socket.emit('accept-guess', payload);
    };
    
    const submitReview = () => {
        console.log("submitting review for: ", guesses[0].owner);
        var payload = {
            name: guesses[0].owner,
        }
        console.log(payload);
        socket.emit('player-reviewed', payload);
        setDisplay(false);
    };

    if(!display) {return;}

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-blue-200 rounded border-2 border-black p-4 space-y-1">
                <p className="font-bold text-2xl">Review these guesses!</p>
                <p className="text-xs">Click on the guesses you think appeared..</p>
                <div className="rounded space-y-1">
                    {guesses?.map((guessObject, idx) => (
                        <div key={idx}>
                            <button onClick={() => toggleAccepted(guessObject)} className={`p-2 rounded w-full font-bold ${guessObject.accepted ? 'bg-green-400' : 'bg-red-200'}`}>
                                {guessObject.guess}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="">
                    <button className="mt-4 bg-blue-300 rounded border-2 border-black p-1 font-bold" onClick={() => submitReview()}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default ReviewPopup;