import { useState } from "react";
import Pawn from "../classes/Pawn";
import Rook from "../classes/Rook";
import Bishop from "../classes/Bishop";
import Knight from "../classes/Knight";
import King from "../classes/King";
import Queen from "../classes/Queen";

type BoardCell = Rook | Knight | Bishop | Queen | King | null;
type BoardType = BoardCell[][];

export function useGame() {
    const initialBoard: BoardType = [
        [new Rook("black"), new Knight("black"), new Bishop("black"), new Queen("black"), new King("black"), new Bishop("black"), new Knight("black"), new Rook("black")],
        [new Pawn("black", { row: 1, col: 0 }), new Pawn("black", { row: 1, col: 1 }), new Pawn("black", { row: 1, col: 2 }), new Pawn("black", { row: 1, col: 3 }), new Pawn("black", { row: 1, col: 4 }), new Pawn("black", { row: 1, col: 5 }), new Pawn("black", { row: 1, col: 6 }), new Pawn("black", { row: 1, col: 7 })],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [new Pawn("white", { row: 6, col: 0 }), new Pawn("white", { row: 6, col: 1 }), new Pawn("white", { row: 6, col: 2 }), new Pawn("white", { row: 6, col: 3 }), new Pawn("white", { row: 6, col: 4 }), new Pawn("white", { row: 6, col: 5 }), new Pawn("white", { row: 6, col: 6 }), new Pawn("white", { row: 6, col: 7 })],
        [new Rook("white"), new Knight("white"), new Bishop("white"), new Queen("white"), new King("white"), new Bishop("white"), new Knight("white"), new Rook("white")],
    ]

    const [board, setBoard] = useState(initialBoard);
    const [currentTurn, setCurrentTurn] = useState<"white" | "black">("white");
    const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);

    const movePiece = (from: { row: number; col: number }, to: { row: number; col: number }) => {
        setBoard(prevBoard => {
            const newBoard = prevBoard.map(row => [...row]);
            newBoard[to.row][to.col] = newBoard[from.row][from.col];
            newBoard[from.row][from.col] = null;
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

    const setPlayerColor = (color: 'white' | 'black') => {
        const newBoard = initialBoard.map(row => row.map(cell => {
            if (cell instanceof Pawn) {
                // Place pawns on the correct side
                const newRow = (color === "white")
                    ? (cell.color === "white" ? 6 : 1)
                    : (cell.color === "white" ? 1 : 6);
                return new Pawn(cell.color, { row: newRow, col: cell.initPos.col });
            }
            return cell;
    }));
    // Reverse the board if black is chosen, otherwise keep as is
    setBoard(color === "white" ? newBoard : newBoard.slice().reverse());
    setCurrentTurn("white");
    setSelectedPiece(null);
};

return { board, currentTurn, selectedPiece, resetGame, setPlayerColor, setCurrentTurn, setSelectedPiece, movePiece }; // Return the state and functions
}