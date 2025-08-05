import Piece from '../classes/Pieces';
import { useState } from 'react';

type GameViewProps = {
    board: (null | Piece)[][];
    currentTurn: "white" | "black";
    setCurrentTurn: (turn: "white" | "black") => void;
    selectedPiece: { row: number; col: number } | null;
    setSelectedPiece: (pos: { row: number; col: number } | null) => void;
    movePiece: (from: { row: number; col: number }, to: { row: number; col: number }) => void;
};

function GameView({ board, currentTurn, setCurrentTurn,setSelectedPiece, movePiece }: GameViewProps) {
    const [localSelectedPiece, setLocalSelectedPiece] = useState<{ row: number; col: number } | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<{ row: number; col: number; capture?: boolean }[]>([]);

    const handleCellClick = (cell: any, rowIndex: number, cellIndex: number) => {
        if (cell instanceof Piece && cell.color === currentTurn) {
            setLocalSelectedPiece({ row: rowIndex, col: cellIndex });
            setSelectedPiece({ row: rowIndex, col: cellIndex });
            const moves = cell.possibleMoves(board, rowIndex, cellIndex);
            setPossibleMoves(moves);
        } else if (localSelectedPiece) {
            // If clicked cell is a possible move, move the piece
            if (possibleMoves.some(move => move.row === rowIndex && move.col === cellIndex)) {
                movePiece(localSelectedPiece, { row: rowIndex, col: cellIndex });
                setCurrentTurn(currentTurn === "white" ? "black" : "white");
            }
            setLocalSelectedPiece(null);
            setSelectedPiece(null);
            setPossibleMoves([]);
        }
    };

    const isSelected = (row: number, col: number) =>
        localSelectedPiece && localSelectedPiece.row === row && localSelectedPiece.col === col;
    const isPossibleMove = (row: number, col: number) =>
        possibleMoves.some(move => move.row === row && move.col === col);
    const isPossibleEat = (row: number, col: number) =>
        possibleMoves.some(move => move.row === row && move.col === col && move.capture);

    return (
        <div>
            {board.map((row, rowIndex) => (
                <div className='flex' key={rowIndex}>
                    {row.map((cell, cellIndex) => {
                        const selected = isSelected(rowIndex, cellIndex);
                        const possible = isPossibleMove(rowIndex, cellIndex);
                        const possibleEat = isPossibleEat(rowIndex, cellIndex);
                        return (
                            <div
                                key={`${rowIndex}-${cellIndex}`}
                                className={`w-20 h-20 flex items-center justify-center relative cursor-pointer
                                            ${selected ? "bg-blue-200" : (cellIndex - rowIndex) % 2 === 0 ? "bg-white" : "bg-[#7C787E]"}
                                        `}
                                onClick={() => handleCellClick(cell, rowIndex, cellIndex)}
                            >
                                {cell instanceof Piece ? (
                                    <div className="w-[4rem] overflow-hidden">
                                        {cell.constructor.name === "Pawn" && (
                                            <img src={cell.color === "white" ? '/Icons/Wpawn.png' : '/Icons/Bpawn.png'} alt="" />
                                        )}
                                        {cell.constructor.name === "Rook" && (
                                            <img src={cell.color === "white" ? '/Icons/Wrook.png' : '/Icons/Brook.png'} alt="" />
                                        )}
                                        {cell.constructor.name === "Bishop" && (
                                            <img src={cell.color === "white" ? '/Icons/Wbishop.png' : '/Icons/Bbishop.png'} alt="" />
                                        )}
                                        {cell.constructor.name === "Knight" && (
                                            <img src={cell.color === "white" ? '/Icons/Wknight.png' : '/Icons/Bknight.png'} alt="" />
                                        )}
                                        {cell.constructor.name === "King" && (
                                            <img src={cell.color === "white" ? '/Icons/Wking.png' : '/Icons/Bking.png'} alt="" />
                                        )}
                                        {cell.constructor.name === "Queen" && (
                                            <img src={cell.color === "white" ? '/Icons/Wqueen.png' : '/Icons/Bqueen.png'} alt="" />
                                        )}
                                    </div>
                                ) : null}
                                {possible && (
                                    <span className="absolute w-6 h-6 rounded-full bg-blue-400 opacity-60 pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
                                )}
                                {possibleEat && (
                                    <span className="absolute w-6 h-6 rounded-full bg-red-400 opacity-60 pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default GameView;