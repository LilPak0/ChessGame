// src/classes/Pawn.ts
import Piece from "./Pieces";

export default class Rook extends Piece {
    initPos: { row: number; col: number };
    constructor(color: "white" | "black", initPos: { row: number; col: number }) {
        super(color);
        this.initPos = initPos;
    }

    possibleMoves(board: (string | Rook)[][], row: number, col: number): { row: number; col: number; capture?: boolean }[] {
        const moves: { row: number; col: number; capture?: boolean }[] = [];
        const directions = [
            { row: 1, col: 0 },  // Down
            { row: -1, col: 0 }, // Up
            { row: 0, col: 1 },  // Right
            { row: 0, col: -1 }, // Left
        ];

        for (const { row: dRow, col: dCol } of directions) {
            for (let i = 1; i < 8; i++) {
                const newRow = row + dRow * i;
                const newCol = col + dCol * i;
                if (newRow < 0 || newRow >= board.length || newCol < 0 || newCol >= board[0].length) break;

                const target = board[newRow][newCol];
                if (target === "") {
                    moves.push({ row: newRow, col: newCol });
                } else if (target instanceof Piece && target.color !== this.color) {
                    moves.push({ row: newRow, col: newCol, capture: true });
                    break;
                } else {
                    break;
                }
            }
        }

        return moves;
    }
}