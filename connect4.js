const boardHeight = 6;
const boardWidth = 7;
let currPlayer = 1;
let boardArr = [];

function makeBoard() {
    for(let y= 0; y < boardHeight; y++) {
        boardArr.push(Array.from({length: boardWidth}))
    }
}

function makeHtmlBoard(){
  const board = document.getElementById('board')
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top')
  top.addEventListener('click', handleClick)
  for(let x =0; x < boardWidth; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell)
  }
  board.append(top);

  for(let y = 0; y < boardHeight; y++) {
    const row = document.createElement('tr');
    for(let x = 0; x < boardWidth; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id',`${y}-${x}`)
      row.append(cell)
    }
    // td.append(cell)
    board.append(row);
  }
}

function findSpotForCol(x) {
  for(let y = boardHeight -1 ; y>=0; y--) {
    if(!boardArr[y][x]) {
      return y
    }
  }
  return null;

}

function placeInTable(y,x){
  const piece = document.createElement('div');
  piece.classList.add('piece') 
  piece.classList.add(`p${currPlayer}`)
  piece.style.top= -50 *(y+2);

  const spot = document.getElementById(`${y}-${x}`)
  spot.append(piece);
}

function endGame(msg) {
  alert(msg)
}

function handleClick(evt) {
  let x = evt.target.id;
  let y = findSpotForCol(x);
  if( y === null) {
    return;
  }
  boardArr[y][x] = currPlayer
  placeInTable(y,x)


  if(checkForWin()) {
    return endGame( `${currPlayer} won`) 
  }
  for(let i = 0; i < boardArr.length; i++) {
    for(let j = 0; j < boardArr[i].length; j++) {
    }
  }


  if (boardArr.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  
  currPlayer = currPlayer === 1 ? 2: 1;
}

function checkForWin() {
  function _win(cells){
    return cells.every(
      ([y,x]) =>
      y >= 0 &&
      y < boardHeight &&
      x >= 0 &&
      x < boardWidth &&
      boardArr[y][x] === currPlayer
    )
  }

  for(let y = 0; y < boardHeight; y++) {
    for(let x = 0; x < boardWidth; x++) {
      let horiz = [[y,x], [y,x +1], [y,x+2], [y, x+3]];
      let vert = [[y,x], [y+1, x], [y+2, x], [y+3, x]];
      let diagR = [ [y,x], [y+1, x+1], [y+2, x+2], [y+3, x+3] ];
      let diagL = [ [y,x], [y+1, x-1], [y+2, x-2], [y+3, x-3]]
      if(_win(horiz) || _win(vert) || _win(diagR) || _win(diagL)) {
        return true;
      }
    }
  }
}

makeBoard()
makeHtmlBoard()