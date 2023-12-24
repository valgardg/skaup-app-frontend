import React from "react";

function DevTools({socket}) {

    return (
        <div className="bg-blue-100 rounded-lg p-6 m-8">
            <div className="flex justify-center justify-around">
                <button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={() => socket.emit('reset-game')}>Reset Game</button>
                <button className='bg-orange-500 text-white py-2 px-4 rounded' onClick={() => socket.emit('end-watch-phase')}>Review Phase</button>
                <button className='bg-yellow-500 text-white py-2 px-4 rounded' onClick={() => socket.emit('fetch-review-info')}>Fetch Review Info</button>
            </div>
        </div>
    );
}

export default DevTools;