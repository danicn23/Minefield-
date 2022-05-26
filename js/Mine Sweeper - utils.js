'use stirct'

function getRandEmptyCell() {
    var emptyCells = [];
    for (var i = 1; i < gMineField.length - 1; i++) {
        for (var j = 1; j < gMineField[i].length - 1; j++) {
            if (gMineField[i][j] === ' ') emptyCells.push({ i, j });
        }
    }
    var emptyCellIdx = getRandomIntInc(0, emptyCells.length - 1);
    return emptyCells[emptyCellIdx];
}

function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
