'use strict'
// sanity check console.log('Hello');
//global data
//gCell
//gMine
//gFlag
//Const EMPTY = ' '
var gMineField;
var cell = '.'

var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gMineField = buildTheField();
    console.table(gMineField);
    renderField(gMineField, '.board-container')
    gGame.isOn = true
}
//build the minefiled - later on expend to other level of difficulty

function buildTheField() {
    const SIZE = 4;
    var field = [];

    for (var i = 0; i < SIZE; i++) {
        field.push([]);
        for (var j = 0; j < SIZE; j++) {
            field[i][j] = cell;
        }
    }
    return field
}

//Count mines around each cell and set the cell's minesAroundCount.

function setMinesNegsCount(board) {

}

//Render the mindfield as a <table> to the page 

function renderField(field, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < field.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < field[0].length; j++) {
            var cell = field[i][j];
            var className = 'cell cell-' + i + '-' + j;
            strHTML += '<td class="' + className + '"><' + cell + ' </td>'

        }
        strHTML += '<tr>'
    }
    strHTML += '</tbody><table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

//Call when cell <td> is clicked 

function cellClicked(elCell, i, j) {

}

//Call on right click to mark a cell(suspected to be a mine) - might work as a toggel
//Check yaron's video on selecting & unselecting seat on cinema 

function cellMarked(elCell) {

}

//Game ends when all mines are marked, and all the other cells are shown. 
//Or player steeped on a mine

function checkGameOver() {

}

//BONUS :
//expandShown(board, elCell, i, j)
