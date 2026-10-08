class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.character = undefined;
    }

    addCharacter(character) {
        this.character = character;
    }

    removeCharacter() {
        this.character = undefined;
    }
}

export default Cell;