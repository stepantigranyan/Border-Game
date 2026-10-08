import { LEVELS } from "./consts/index.js";

import Board from './core/board/board.js'
import Movement from './core/movement/index.js';

const mainSection = document.getElementById('main-section');
const optionsSection = document.getElementById('options-section');
const victorySection = document.getElementById('victory-section');

const boardContainer = document.getElementById('board-container');
const movesContainer = document.getElementById('moves-container');
const timeContainer = document.getElementById('time-container');
const spentTimeContainer = document.getElementById('spent-time-container');

let level = undefined;
let timer = undefined;
let time = 0;

// Main functions
function chooseLevel(rows, columns) {
    level = { rows, columns };
}

function startGame() {
    if (level.rows !== undefined && level.columns !== undefined) {
        optionsSection.classList.remove('flex');
        optionsSection.classList.add('hidden');

        mainSection.classList.remove('hidden');

        drawMainSection(level);
        mainSection.classList.add('flex');
    }
}

function start() {
    drawOptionsSection(chooseLevel, startGame);
}

function setTimer() {
    drawTimer(time);
    timer = setInterval(() => {
        drawTimer(++time);
    }, 1000)
}

function removeTimer() {
    time = 0;
    clearInterval(timer);
}

// Draw functions
function drawTimer(time) {
    let timeMessage = '';

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (minutes > 0) {
        timeMessage += `0${minutes}`;
    } else {
        timeMessage += '00';
    }

    timeMessage += ' : ';

    if (seconds >= 10) {
        timeMessage += seconds;
    } else {
        timeMessage += `0${seconds}`;
    }

    timeContainer.innerText =  timeMessage;
}

function drawOptionsSection(onClickForLevel, onClickForStart) {
    optionsSection.innerHTML = '';

    const startButton = document.createElement('button');
    startButton.setAttribute('disabled', 'true');
    startButton.classList.add(
        'cursor-pointer',
        'text-xl', 'border',
        'border-black',
        'border-solid',
        'px-10',
        'py-3',
        'rounded-2xl',
        'disabled:bg-gray-300',
        'disabled:cursor-not-allowed'
    );

    startButton.innerText = 'Start';

    startButton.addEventListener('click', (event) => {
        onClickForStart(event.target);
    });

    const optionsLevelButtonsContainer = document.createElement('div');
    optionsLevelButtonsContainer.classList.add('flex', 'items-center', 'gap-x-10');

    LEVELS.forEach(({ id, name, rows, columns }) => {
        const label = document.createElement('label');
        label.setAttribute('for', id);

        label.classList.add(
            'cursor-pointer',
            'flex',
            'justify-center',
            'items-center',
            'px-10',
            'py-3',
            'border',
            'border-black',
            'border-solid',
            'rounded-2xl',
            'has-checked:bg-red-400',
            'has-checked:text-white'
        );

        const span = document.createElement('span');

        span.innerText = `${rows} X ${columns}`;
        const radioInput = document.createElement('input');
        radioInput.setAttribute('type', 'radio');
        radioInput.setAttribute('id', id);
        radioInput.setAttribute('name', name);

        radioInput.classList.add('hidden');

        radioInput.addEventListener('click', () => {
            onClickForLevel(rows, columns);
            startButton.disabled = false;
        });

        label.append(span, radioInput);
        optionsLevelButtonsContainer.append(label);
    });

    optionsSection.append(optionsLevelButtonsContainer);
    optionsSection.append(startButton);
}

function drawCell({ x, y, character }) {
    const cell = document.createElement('div');
    const img = document.createElement('img');

    cell.setAttribute('data-x', x);
    cell.setAttribute('data-y', y);
    cell.classList.add('size-15', 'bg-red-400', 'border', 'border-black', 'border-solid');

    if (character !== undefined) {
        cell.classList.add('flex', 'justify-center', 'items-center');

        img.setAttribute('draggable', 'false');
        img.classList.add('size-4/5');

        if (character === 'Knight') {
            img.setAttribute('src', './src/imgs/knight.png');
            img.setAttribute('alt', 'Knight');
        } else if (character === 'Elephant') {
            img.setAttribute('src', './src/imgs/elephant.png');
            img.setAttribute('alt', 'Elephant');

        }

        cell.append(img);
    }

    return cell;
}

function drawBoard(board) {
    boardContainer.innerHTML = '';
    const boardDiv = document.createElement('div');
    boardDiv.classList.add('p-1', 'border', 'border-black', 'border-solid');

    boardDiv.style.display = 'grid';
    boardDiv.style.gridTemplateColumns = `repeat(${board.length}, 1fr)`;
    boardDiv.style.gap = '5px';

    board.forEach((row) => {
        row.forEach((cell) => {
            boardDiv.append(drawCell(cell));
        });
    });

    boardContainer.append(boardDiv);
}

function drawMoves(moves) {
    movesContainer.innerText = moves;
}

function drawMainSection({ rows, columns }) {
    const boardService = new Board({ rows, columns });
    const movement = new Movement(rows);

    boardService.createBoard();
    boardService.addKnight();
    boardService.addElephants();

    const board = boardService.getBoard();
    drawMoves(0);
    drawBoard(board);
    setTimer();

    function move(event) {
        let currentCell, nextCell;

        if (event.key === 'ArrowUp') {
            currentCell = boardService.knightCords;
            nextCell = movement.moveUp(currentCell);
        } else if (event.key === 'ArrowDown') {
            currentCell = boardService.knightCords;
            nextCell = movement.moveDown(currentCell);
        } else if (event.key === 'ArrowLeft') {
            currentCell = boardService.knightCords;
            nextCell = movement.moveLeft(currentCell);
        } else if (event.key === 'ArrowRight') {
            currentCell = boardService.knightCords;
            nextCell = movement.moveRight(currentCell);
        }

        if (nextCell === undefined) {
            return;
        }

        boardService.moveKnight(nextCell);

        const defeatedElephantCount = boardService.getDefeatedElephantsCount();
        const moves = movement.getMoves();

        drawMoves(moves);

        if(defeatedElephantCount === rows) {
            console.log('victory');
            window.removeEventListener('keyup', move);
            removeBoard();
            removeTimer();
        }

        drawBoard(board);
    }

    window.addEventListener('keyup', move);
}

function removeBoard() {
    mainSection.classList.remove('flex');
    mainSection.classList.add('hidden');

    victorySection.classList.remove('hidden');
    victorySection.classList.add('flex');

    level = undefined;
    drawVictorySection(time);
}

function drawVictorySection(time) {
    spentTimeContainer.innerText = time + ' seconds';

    setTimeout(() => {
        victorySection.classList.remove('flex');
        victorySection.classList.add('hidden');

        optionsSection.classList.remove('hidden');
        optionsSection.classList.add('flex');

        drawOptionsSection(chooseLevel, startGame);
    }, 2000)
}


// Start
start();