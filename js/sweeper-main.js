
'use strict'
// sanity check console.log('Hello');
//global data
//gMine
//gFlag

// global variables

const DEFAULT_SIZE = 4;
const DEFAULT_MINES = 2;
var gTimer;
var gBoard = null;
const OPEND_CELL = '#F8F8FF'
var gGameOver;

var gGame = {
    isOn: false, // when true let user play 
    prevContent: null, // how last content of the clickedcell 
    shownCount: 0, // how many cells are shown
    flagCount: 0, //  how many cells with a flag    
    secsPassed: 0, // sec passed
    lives: 3,// number of user lives
    hints: 3,// number of hints user can use 

}

var gLevel = {
    SIZE: DEFAULT_SIZE,
    MINES: DEFAULT_MINES,
};

// visual variables
const HTML_MINE = '<img src="icons/mine.png" height="40px" width="40px" />'
const HTML_LIVES = '<img src="icons/heart.png" height="40px" width="40px" />'
const HTML_FLAG = '<img src="icons/flag.png" height="40px" width="40px" />'

const CELL_MINE = (1 << 0);
const CELL_OPENED = (1 << 1);
const CELL_FLAGD = (1 << 2);

function newGame(level) {
    clearInterval(gTimer);

    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';

    var elspan = document.querySelector('.timer');
    elspan.innerText = '00:00:00'
    var elspan = document.querySelector('.score');
    elspan.innerText = '0'

    gBoard = createMineField();
    renderMineField(gBoard);

    gGame.isOn = false;
}

function init() {
    // on load create a new game with default settings
    newGame();
}

//build the minefiled - later on expend to other level of difficulty

function createMineField() {
    var field = [];

    for (var i = 0; i < gLevel.SIZE; i++) {
        field[i] = [];

        for (var j = 0; j < gLevel.SIZE; j++) {
            field[i][j] = ~(CELL_OPENED | CELL_MINE);
        }
    }

    addMines(field);

    return field;
}
// gMineField = createMineField();
// console.table(gMineField);

//Render the minefield as a <table> to the page 

function renderMineField(field) {
    var strHTML = '<table>';

    for (var i = 0; i < field.length; i++) {
        strHTML += '<tr>';

        for (var j = 0; j < field[0].length; j++) {
            var tdId = 'cell-' + i + '-' + j;

            strHTML += '\t<td id="' + tdId + '" onclick="cellClicked(this)" class="cell"></td>\n';
        }

        strHTML += '</tr>';
        // console.log(strHTML);
    }

    strHTML += '</table>';

    var elfield = document.querySelector('.minefield');

    elfield.innerHTML = strHTML;
}

//Add mines

function addMines(field) {
    var mines_loc = getRandEmptyCell(gLevel.SIZE, gLevel.MINES);

    for (var i = 0; i < mines_loc.length; i++) {
        var loc = mines_loc[i];
        var x = loc[0];
        var y = loc[1];

        field[x][y] = CELL_MINE;
    }
}



//Count mines around each cell and set the cell's minesAroundCount.

function countMinesAround(mat, rowIdx, colIdx) {
    var countedMines = 0;

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++)
            if (j < 0 || j >= mat[i].length) continue

        if (i === rowIdx && j === colIdx) continue
        console.log('mat [i][j]:', mat[i][j]);
        if (mat[i][j] === MINE) countedMines++
    }
    return countedMines
}



function cellClicked(elCell) {
    var idAttr = elCell.getAttribute('id');

    // extract i,j from id string
    var tokens = idAttr.split('-');

    // if cell is opened:
    //    do nothing
    // else if cell is empty:
    //    set as opened (in gBoard)
    //    show as opened (on html)
    //    (disable td?)
    // else if cell is mine:
    //    set as opened (in gBoard)
    //    show mine (on html)
    //    decrease lives
    //    show lives (on html)
    //
    //    if no lives left:
    //       game over (Show something?)

    //  when we know game is over successfully?

    var i = +tokens[1];
    var j = +tokens[2];

    var currCell = gBoard[i][j];

    if (currCell & CELL_OPENED) {
        // clicked an opened cell: do nothing
    } else {
        // clicked a closed cell; what should we do?

        // set as opened
        gBoard[i][j] |= CELL_OPENED;

        // document.getElementById(elCell).classList.add('td.opened');

        // did the user step on a mine?
        if (currCell & CELL_MINE) {
            // boom!
            playAudio('/sound/explosion.mp3');

            // show mine
            // document.getElementById(elCell).classList.add('td.openedmine');
            elCell.innerHTML = `<img src="icons/mine2.png"></img>`;

            gGame.lives--;
            // TODO: show correct amount of lives

            if (!gGame.lives) {
                // game over
            }
        } else {
            // not a mine

            // TODO: if all empty cells were opened, user won
        }
    }
}

function levelClicked(size) {
    var mines = 0;

    if (size == 4) {
        mines = 2;
    } else if (size == 8) {
        mines = 12;
    } else if (size == 12) {
        mines = 30;
    }

    gLevel.SIZE = size;
    gLevel.MINES = mines;

    newGame();
}

//Adding a flag icon on presumed dangerous ground
function addFlag(value, i, j) {
    gGame.flagCount++;
    gBoard[i][j].prevContent = value;
    gBoard[i][j].isMarked = true;

    renderCell(i, j, /* ?? */ CELL_FLAG);
}

// Reamove flag and unmarked the cell in board.
function removeFlag(value, i, j) {

    var prevValue = gBoard[i][j].prevContent;
    var value = gBoard[i][j].minesAroundCount;
    gBoard[i][j].isMarked = false;

    if (prevValue === MINE) {
        value = CELL_MINE;
    } else if (prevValue === ' ') {
        value = ' ';
    } else value = prevValue;

    renderCell(i, j, value);
}


// right click on the cell.
function handelRightClick(value, i, j) {
    if (value === FLAG) {
        removeFlag(value, i, j)
    } else {
        addFlag(value, i, j);
    }
}

// function addAFlag(elBtn, elCell, i, j) {
//     if (cell === cellClicked) return

//     console.log('Better to be carful then sorry, button:', elBtn);
//     var cell = gMineField[i][j];
//     concole.log('cell clicked:', elCell, i, j);
//     elCell.classList.toggle('flagged');

//     if (gElSelectedGround) {
//         gElSelectedGround.classList.remove('flagged');
//         console.log('Are you sure?');
//     }
// }

//Game ends when all mines are marked, and all the other cells are shown. 
//Or player steeped on a mine

function checkGameOver() {

    clearInterval(gTimerInterval);
    gGameOver = true

    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
}

//BONUS :
//expandShown(board, elCell, i, j)

////


function getRandEmptyCell(size, mines) {
    var mines_loc = [];

    while (mines_loc.length < mines) {
        var x = getRandomInt(0, size);
        var y = getRandomInt(0, size);

        var loc = [x, y];

        if (mines_loc.indexOf(loc) === (-1)) {
            mines_loc.push(loc);
        }
    }

    return mines_loc;
}

function renderCell(x, y, html_style) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${x}-${y}`);

    elCell.innerHTML = html_style;
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


function startTimer() {

    var startTime = Date.now()

    gTimerInterval = setInterval(() => {
        var seconds = ((Date.now() - startTime) / 1000).toFixed(3)
        var elSpan = document.querySelector('.timer')
        elSpan.innerText = seconds
    }, 59)
}

function playAudio(url) {
    new Audio(url).play();
}
