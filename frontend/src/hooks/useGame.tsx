import { useState } from "react";

export function useGame() {
    // const getPiece = (piece: string, color: "white" | "black") => {
    //     const unicodePieces: { [key: string]: { white: string; black: string } } = {
    //         king: { white: '\u2654', black: '\u265A' },
    //         queen: { white: '\u2655', black: '\u265B' },
    //         rook: { white: '\u2656', black: '\u265C' },
    //         bishop: { white: '\u2657', black: '\u265D' },
    //         knight: { white: '\u2658', black: '\u265E' },
    //         pawn: { white: '\u2659', black: '\u265F' },
    //     };
    //     return (
    //         <span className='text-[4rem]'>
    //             {unicodePieces[piece][color]}
    //         </span>
    //     );
    // };

    const initialBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "king", "", "", ""]
    ]

    const [board, setBoard] = useState(initialBoard);
    const [currentTurn, setCurrentTurn] = useState<"white" | "black">("white");
    const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);


    const resetGame = () => {
        setBoard(initialBoard);
        setCurrentTurn("white");
        setSelectedPiece(null);
    };

    return {board, currentTurn, selectedPiece, resetGame}; // Return the state and functions
}