import GameView from "../components/GameView";


function Home() {
    return (
        <div className="flex w-screen h-screen">
            <div className="bg-green-600 w-[70%] flex justify-center items-center">
                <GameView />
            </div>
            <div className="bg-red-600 w-[30%] flex flex-col justify-center items-center space-y-10 text-white">
                <div className="w-[8rem] h-[8rem] rounded-[50%] overflow-hidden">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Alireza_Firouzja_in_2024_%28cropped%29.jpg/250px-Alireza_Firouzja_in_2024_%28cropped%29.jpg" alt="" />
                </div>
                <div className="flex gap-3">
                    <button className="w-20 rounded-lg bg-zinc-500 py-0.5 px-2">White</button>
                    <button className="w-20 rounded-lg bg-zinc-500 py-0.5 px-2">Black</button>
                </div>
                <div>
                    <button className="rounded-lg bg-stone-800 py-1 px-20">Start</button>
                </div>
            </div>
        </div>
    );
}
export default Home;
  