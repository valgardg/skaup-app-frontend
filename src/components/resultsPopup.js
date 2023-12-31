import React, { useEffect, useState } from "react";

function ResultsPopup({ socket, username, players, gamePhase }) {
    const [display, setDisplay] = useState(false);
    const [finalResult, setFinalResult] = useState({});

    useEffect(() => {
        if(gamePhase === "ResultPhase") {
            console.log("displaying results");
            setDisplay(true);
            console.log("players: ", players);
            var results = calculateResults();
            console.log("results: ", results);
            setFinalResult(results);
        }else{
            setDisplay(false);
        }
    }, [players]);

    const calculateResults = () => {
        var results = {};
        console.log("players: ", players);
        players.forEach(player => {
            var guesses = player.guesses;
            results[player.name] = 0;
            guesses.forEach(guess => {
                if(guess.accepted) {
                    results[player.name] += 1;
                }
            });
        });
        // order the results with highest first
        const sortedResults = Object.entries(results);
        sortedResults.sort((a, b) => b[1] - a[1]);
        return sortedResults;
    };

    if(!display) {return;}

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="bg-blue-200 rounded border-2 border-black p-4 space-y-1">
                <p className="font-bold text-2xl">The results are in!</p>
                {/* map finalResults */}
                {finalResult?.map((result, idx) => (
                    <div key={idx}>
                        <p className="text-lg font-bold">{idx+1}. {result[0]} {idx == 0 ? "👑" : ""}</p>
                        <p className="text-sm">with {result[1]} point{result[1] > 1 ? "s" : ""}</p>
                    </div>
                ))}
                <p>Sponsored by Apple™, Microsoft™, and Amazon™</p>
            </div>
        </div>
    );
}

export default ResultsPopup;