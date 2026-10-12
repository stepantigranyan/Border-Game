class Movement {
    constructor(rowSize, columnSize) {
        this.rowSize = rowSize;
        this.columnSize = columnSize;
        this.moves = 0;
    }

    moveUp({ x, y }) {
        if (x > 0) {
            this.moves++;
            return { x: x - 1, y };
        }
    }

    moveDown({ x, y }) {
        const rowSize = this.rowSize;
        if (x < rowSize - 1) {
            this.moves++;
            return { x: x + 1, y };
        }
    }

    moveLeft({ x, y }) {
        if (y > 0) {
            this.moves++;
            return { x, y: y - 1 };
        }
    }

    moveRight({ x, y }) {
        const columnSize = this.columnSize;
        if (y < columnSize - 1) {
            this.moves++;
            return { x, y: y + 1 };
        }
    }

    getMoves() {
        return this.moves;
    }
}

export default Movement;