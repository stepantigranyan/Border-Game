class Movement {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.moves = 0;
    }

    moveUp({ x, y }) {
        if ( x > 0 ) {
            this.moves++;
            return { x: x - 1, y };
        }

        return { x, y };
    }

    moveDown({ x, y }) {
        const boardSize = this.boardSize;
        if ( x < boardSize - 1 ) {
            this.moves++;
            return { x: x + 1, y };
        }

        return { x, y };
    }

    moveLeft({ x, y }) {
        if ( y > 0 ) {
            this.moves++;
            return { x, y: y - 1 };
        }

        return { x, y };
    }

    moveRight({ x, y }) {
        const boardSize = this.boardSize;
        if ( y < boardSize - 1 ) {
            this.moves++;
            return { x, y: y + 1 };
        }

        return { x, y };
    }

    getMoves() {
        return this.moves;
    }
}

export default Movement;