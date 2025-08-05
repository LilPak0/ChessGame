
import GameView from "../components/GameView";
import { useGame } from "../hooks/useGame";
import { useState } from 'react';

function Home() {
    const game = useGame(); // Only call useGame here!
    const [selectedColor, setSelectedColor] = useState<'white' | 'black'>('white');
    const files = selectedColor === 'white'
        ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        : ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
    const ranks = selectedColor === 'white'
        ? [8, 7, 6, 5, 4, 3, 2, 1]
        : [1, 2, 3, 4, 5, 6, 7, 8];


    return (
        <div className="flex w-screen h-screen">
            <div className="bg-green-600 w-[70%] flex justify-center items-center">
                <div className="inline-block">
                    <div className="flex">
                        <div className="flex flex-col">
                            {ranks.map((rank, i) => (
                                <div key={rank} className="h-20 flex items-center justify-center text-lg font-bold">{rank}</div>
                            ))}
                        </div>
                        <GameView {...game} />
                    </div>
                    {/* Bottom file labels */}
                    <div className="flex justify-center">
                        <div className='invisible'>1</div>
                        {files.map((file, i) => (
                            <div key={file} className="w-20 flex items-center justify-center text-lg font-bold">{file}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bg-red-600 w-[30%] flex flex-col justify-center items-center space-y-10 text-white">
                <div className="w-[8rem] h-[8rem] rounded-[50%] overflow-hidden">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Alireza_Firouzja_in_2024_%28cropped%29.jpg/250px-Alireza_Firouzja_in_2024_%28cropped%29.jpg" alt="" />
                </div>
                <div className="flex gap-3">
                    <button
                        className={`w-20 rounded-lg py-0.5 px-2 ${selectedColor === 'white' ? "bg-blue-600" : "bg-zinc-500"}`}
                        onClick={() => setSelectedColor('white')}
                    >
                        White
                    </button>
                    <button
                        className={`w-20 rounded-lg py-0.5 px-2 ${selectedColor === 'black' ? "bg-blue-600" : "bg-zinc-500"}`}
                        onClick={() => setSelectedColor('black')}
                    >
                        Black
                    </button>
                </div>
                <div className="flex gap-5">
                    <button className="w-40 rounded-lg bg-stone-800 py-1 px-10">Start</button>
                    <button className="w-40 rounded-lg bg-stone-800 py-1 px-10" onClick={game.resetGame}>Reset</button>
                </div>
            </div>
        </div>
    );
}
export default Home;
