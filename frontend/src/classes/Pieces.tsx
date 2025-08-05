export default class Piece {
    color: "white" | "black";
    constructor(color: "white" | "black") {
        this.color = color;
    }

    possibleMoves(board: (string | Piece)[][], row: number, col: number): { row: number; col: number }[] {
        return []; // Default implementation, should be overridden by subclasses
    }
}