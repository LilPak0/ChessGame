import Piece from "./Pieces";

export default class Pawn extends Piece {
    initPos: { row: number; col: number };
    constructor(color: "white" | "black", initPos: { row: number; col: number }) {
        super(color);
        this.initPos = initPos;
    }

    possibleMoves(board: (null | Pawn)[][], row: number, col: number): { row: number; col: number; capture?: boolean }[] {
        const moves: { row: number; col: number; capture?: boolean }[] = [];
        const direction = this.initPos.row === 6 ? -1 : 1;

        // One square forward
        const nextRow = row + direction;
        if (
            nextRow >= 0 &&
            nextRow < board.length &&
            board[nextRow][col] === null
        ) {
            moves.push({ row: nextRow, col });

            // Two squares forward from initial position
            const isAtInitial = row === this.initPos.row && col === this.initPos.col;
            const twoAhead = row + direction * 2;
            if (
                isAtInitial &&
                twoAhead >= 0 &&
                twoAhead < board.length &&
                board[twoAhead][col] === null &&
                board[nextRow][col] === null
            ) {
                moves.push({ row: twoAhead, col });
            }
        }

        // Diagonal captures
        for (const dCol of [-1, 1]) {
            const diagRow = row + direction;
            const diagCol = col + dCol;
            if (
                diagRow >= 0 && diagRow < board.length &&
                diagCol >= 0 && diagCol < board[0].length
            ) {
                const target = board[diagRow][diagCol];
                if (
                    target instanceof Piece &&
                    target.color !== this.color
                ) {
                    moves.push({ row: diagRow, col: diagCol, capture: true });
                }
            }
        }

        return moves;
    }
}