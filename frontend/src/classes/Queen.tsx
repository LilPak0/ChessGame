import Piece from "./Pieces";

export default class Queen extends Piece {
    initPos: { row: number; col: number };
    constructor(color: "white" | "black", initPos: { row: number; col: number }) {
        super(color);
        this.initPos = initPos;
    }

    possibleMoves(board: (string | Queen)[][], row: number, col: number): { row: number; col: number; capture?: boolean }[] {
        const moves: { row: number; col: number; capture?: boolean }[] = [];

        return moves;
    }
}