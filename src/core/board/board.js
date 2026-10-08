import Cell from "./cell.js";

class Board {
    constructor({ rows, columns }) {
        this.rows = rows;
        this.columns = columns;
        this.board = this.createBoard();
        this.knightCords = { x: undefined, y: undefined };
        this.defeatedElephantCount = 0;
    }

    createBoard() {
        const board = [];

        for (let row = 0; row < this.rows; row++) {
            const boardRow = [];

            for (let col = 0; col < this.columns; col++) {
                boardRow.push(new Cell(row, col));
            }

            board.push(boardRow);
        }

        return board;
    }

    addKnight() {
        const board = this.board;
        const knightCords = this.knightCords;

        const randomRow = Math.floor(Math.random() * this.rows);
        const randomCol = Math.floor(Math.random() * this.columns);

        const knightCell = board[randomRow][randomCol];

        knightCell.addCharacter('Knight');

        knightCords.x = randomRow;
        knightCords.y = randomCol;
    }

    addElephants() {
        const elephantCount = this.rows;
        const board = this.board;

        let count = 0;

        while (count < elephantCount) {
            const randomRow = Math.floor(Math.random() * this.rows);
            const randomCol = Math.floor(Math.random() * this.columns);

            const elephantCell = board[randomRow][randomCol];

            if (elephantCell.character === undefined) {
                elephantCell.addCharacter('Elephant');
                count++;
            }
        }
    }

    moveKnight({ x, y }) {
        const knightCords = this.knightCords;
        const board = this.board;

        const currentCell = board[knightCords.x][knightCords.y];
        const nextCell = board[x][y];

        if (nextCell.character === 'Elephant') {
            this.defeatedElephantCount += 1;
        }

        currentCell.removeCharacter();
        nextCell.addCharacter('Knight');

        knightCords.x = x;
        knightCords.y = y;
    }

    getBoard() {
        return this.board;
    }

    getDefeatedElephantsCount() {
        return this.defeatedElephantCount;
    }
}

export default Board;