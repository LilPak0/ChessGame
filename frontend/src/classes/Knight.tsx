import Piece from "./Pieces";

export default class Knight extends Piece {

    possibleMoves(board: (null | Knight)[][], row: number, col: number): { row: number; col: number; capture?: boolean }[] {
        const moves: { row: number; col: number; capture?: boolean }[] = [];
        const directions = [
            { row: 2, col: 1 }, { row: 2, col: -1 },
            { row: -2, col: 1 }, { row: -2, col: -1 },
            { row: 1, col: 2 }, { row: 1, col: -2 },
            { row: -1, col: 2 }, { row: -1, col: -2 },
        ];

        for (const { row: dRow, col: dCol } of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            if (newRow < 0 || newRow >= board.length || newCol < 0 || newCol >= board[0].length) continue;

            const target = board[newRow][newCol];
            if (target === null) {
                moves.push({ row: newRow, col: newCol });
            } else if (target instanceof Piece && target.color !== this.color) {
                moves.push({ row: newRow, col: newCol, capture: true });
            }
        }
        return moves;
    }
}