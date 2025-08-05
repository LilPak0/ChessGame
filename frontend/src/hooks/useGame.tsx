import { useState } from "react";
import Pawn from "../classes/Pawn";
import Rook from "../classes/Rook";

export function useGame() {
    const initialBoard = [
        ["", "", "", "", "", "", "", ""],
        ["", "", new Pawn("black", { row: 1, col: 2 }), "", "", "", "", new Pawn("black", { row: 1, col: 7 })],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", new Pawn("white", { row: 6, col: 1 }), new Pawn("white", { row: 6, col: 2 }), "", new Pawn("white", { row: 6, col: 4 }), "", "", ""],
        ["", "", "", "", "", "", new Rook("white", { row: 7, col: 0 }), ""],
    ]

    const [board, setBoard] = useState(initialBoard);
    const [currentTurn, setCurrentTurn] = useState<"white" | "black">("white");
    const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);

    const movePiece = (from: { row: number; col: number }, to: { row: number; col: number }) => {
        setBoard(prevBoard => {
            const newBoard = prevBoard.map(row => [...row]);
            newBoard[to.row][to.col] = newBoard[from.row][from.col];
            newBoard[from.row][from.col] = "";
            return newBoard;
        });
        setSelectedPiece(null);
        setCurrentTurn(currentTurn === "white" ? "black" : "white");
    };

    const resetGame = () => {
        setBoard(initialBoard);
        setCurrentTurn("white");
        setSelectedPiece(null);
    };

    return {board, currentTurn, selectedPiece, resetGame, setCurrentTurn, setSelectedPiece, movePiece}; // Return the state and functions
}