import { useGame } from '../hooks/useGame';

function GameView({ }) {
    const {board, currentTurn, selectedPiece, resetGame} = useGame();

    return (
        <div>
            {board.map((row, rowIndex) => (
                <div className='flex'>
                    {row.map((cell, cellIndex) => (
                        <div key={`${rowIndex}-${cellIndex}`} className={`w-20 h-20 flex items-center justify-center ${(cellIndex - rowIndex)
                            % 2 === 0 ? "bg-white" : "bg-[#7C787E]"}`}>
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default GameView;