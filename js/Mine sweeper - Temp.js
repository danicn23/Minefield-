'use strict'
// sanity check console.log('Hello');
//global data
//gMine
//gFlag

// global variables
var gMineField;
var gTimer;
const FIELD_SIZE = 4;
const OPEND_CELL = '#F8F8FF'
var gGameOver;
var gGame = {

    isOn: false, // when true let user play 
    shownCount: 0, // how many cells are shown
    flagCount: 0, //  how many cells with a flag    
    secsPassed: 0, // sec passed
}
var gLevel = {

    SIZE: 4,
    MINES: 2,
};


// visual variables
const MINE = '<img src="icons/mine.png" />'
const LIVES = '<img src="icons/heart.png" />'
const FLAG = '<img src="icons/flag.png" />'


function init() {
    clearInterval(gTimer);

    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';

    var elspan = document.querySelector('.timer');
    elspan.innerText = '0.000'

    var elspan = document.querySelector('.score');
    elspan.innerText = '0'

    gMineField = createMineField();
    renderMineField(gMineField);
    gGame = false;

}

//build the minefiled - later on expend to other level of difficulty

function createMineField() {
    var field = [];

    for (var i = 0; i < FIELD_SIZE; i++) {
        field[i] = [];
        for (var j = 0; j < FIELD_SIZE; j++) {

            var gcell = '';
            field[i][j] = gcell;
        }
    }
    field[0][0] = field[0][2] = MINE;
    console.table(field);
    addMines();
    return field
}
var gMineField = createMineField();
// console.table(gMineField);

//Render the minefield as a <table> to the page 

function renderMineField(field) {
    var strHTML = '';
    var row = field[i];
    for (var i = 0; i < field.length; i++) {

        strHTML += '<tr>';
        for (var j = 0; j < field[0].length; j++) {
            var cell = row[j];
            var className = 'open cell';
            var tdId = 'cell-' + i + '-' + j;
            strHTML += '<td id="' + tdId + '"onclick="cellclicked(this)" class="' + className + '">' + cell + '</td\n';

        }
        strHTML += '</tr>';
        console.log(strHTML);

        var elfield = document.querySelector('.field');
        elfield.innerHTML = strHTML;
    }

}

//Add mines

function addMines(gMineField) {
    var pos = getRandEmptyCell();
    if (!pos) return;

    gMineField[pos.i][pos.j] = MINE;

    renderCell(pos, MINE);
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


//Steepd on mine

// if (gcell === MINE) (gGameOver);

//Call when cell <td> is clicked 

function cellClicked(elCell, clickedCell) {
    if (currCell === MINE) {
        LIVES === -'❤'
        playAudio('/sound/explosion.mp3');

    } else {
        LIVES === '';
        gGameOver()
    }

    var currCell
    currCell = gMineField[i][j];

    if (clickedCell === open)

        if (clickedCell === currCell) startTimer()
    elCell.style.backgroundcolor = OPEND_CELL

    console.log('cell clicked:', elCell, clickedCell);
    elCell.classList.toggle('open');

}

//Adding a flag icon on presumed dangerous ground

function addAFlag(elBtn, elCell, i, j) {
    if (cell === cellClicked) return

    console.log('Better to be carful then sorry, button:', elBtn);
    var cell = gMineField[i][j];
    concole.log('cell clicked:', elCell, i, j);
    elCell.classList.toggle('flagged');

    if (gElSelectedGround) {
        gElSelectedGround.classList.remove('flagged');
        console.log('Are you sure?');
    }
}

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

