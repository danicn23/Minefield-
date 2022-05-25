'use strict'
// sanity check console.log('Hello');
//global data
//gMine
//gFlag
var gMineField;
var gcell = '.'
var gTimer;
const FIELD_SIZE = 4;
const MINE = null;
var gElSelectedGround = null;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    clearInterval(gTimer);

    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';

    var elspan = document.querySelector('.timer');
    elspan.innerText = '0.000'

    var elspan = document.querySelector('.score');
    elspan.innerText = '0'

    gGame = false;

    createfield();
}

//build the minefiled - later on expend to other level of difficulty

function createMineField() {
    var field = [];

    for (var i = 0; i < FIELD_SIZE; i++) {
        field[i] = [];
        for (var j = 0; j < FIELD_SIZE; j++) {
            field[i][j] = gcell;
        }
    }
    return field
}
var gMineField = createMineField();
console.table(gMineField);

//Render the mindfield as a <table> to the page 

function renderMineField() {
    var strHTML = '';
    for (var i = 0; i < gMineField.length; i++) {
        strHTML += `<tr class="field-row" >\n`
        for (var j = 0; j < gMineField[0].length; j++) {
            var cell = gMineField[i][j];
            var className = (cell === 'S') ? 'safe' : ''
            var title = (cell === 'S') ? `safe: ${i}, ${j}` : '';

            strHTML += `\t<td class="cell ${className}" title="${title}"
                            onclick="cellClicked(this, ${i}, ${j})" >
                        </td>\n`;
        }
        strHTML = + `</tr>\n`
    }
    var elNewGround = document.querySelector('new-ground');
    elNewGround.innerHTML = strHTML;

}

//Count mines around each cell and set the cell's minesAroundCount.

function setMinesNegsCount(board) {
    var countMines = 0;

    for (var i = rowIdx - 1; i <= rowIdx; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue

            if (i === rowIdx && j === colIdx) continue
            console.log('mat[i][j]:', mat[i][j]);
            if (mat === MINE) count++
        }
    }
    return count
}

//Call when cell <td> is clicked 

function cellClicked(elCell, i, j) {
    //TO DO - if cell === bomb - return
    var cell = gMineField[i][j];
    concole.log('cell clicked:', elCell, i, j);
    elCell.classList.toggle('open');

    if (gElSelectedGround) {
        gElSelectedGround.classList.remove('open');

        gElSelectedGround = elCell;
    }
}

//Adding a flag icon on presumed dangerous ground

function flaggedArea(elBtn, elCell, i, j) {
    console.log('Better to be carful then sorry, button:', elBtn);
    if (cell === cellClicked) return

    var cell = gMineField[i][j];
    concole.log('cell clicked:', elCell, i, j);
    elCell.classList.toggle('flagged');

    if (gElSelectedGround) {
        gElSelectedGround.classList.remove('flagged');
    }
}


//Game ends when all mines are marked, and all the other cells are shown. 
//Or player steeped on a mine

function checkGameOver() {

}

//BONUS :
//expandShown(board, elCell, i, j)

