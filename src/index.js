module.exports = function solveSudoku(matrix) {

  function findEmpty(matrix) {
    for (let rownum = 0; rownum < 9; rownum++) {
      for (let colnum = 0; colnum < 9; colnum++) {
        if (matrix[rownum][colnum] === 0) {
          return [rownum, colnum];
        }
      }
    }
    return [];
  }
  
  function presentInRow(matrix, candidatNumber, currentCell) {
    for (let i = 0; i < 9; i++) {
      if (candidatNumber === matrix[currentCell[0]][i]) return true;
    }
    return false;
  }

  function presentInCol(matrix, candidatNumber, currentCell) {
    for (let i = 0; i < 9; i++) {
      if (candidatNumber === matrix[i][currentCell[1]]) return true;
    }
    return false;
  }
  
  function presentInBlock(matrix, candidatNumber, currentCell) {
    row = Math.floor(currentCell[0] - currentCell[0] % 3);
    col = Math.floor(currentCell[1] - currentCell[1] % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (candidatNumber === matrix[row + i][col + i]) return true;
      }
    }
    return false;
  }
  
  function isAllowed(matrix, candidatNumber, currentCell) {
    if (!presentInRow(matrix, candidatNumber, currentCell) && !presentInCol(matrix, candidatNumber, currentCell) && !presentInBlock(matrix, candidatNumber, currentCell)) {
      return true;
    }
    return false;
  }


  function solving(matrix) {
    let currentCell = findEmpty(matrix);
    
    if (currentCell.length === 0) return true;
    
    for (let number = 1; number <= 9; number++) {
      if (isAllowed(matrix, number, currentCell)) {
        matrix[currentCell[0]][currentCell[1]] = number;
        
        if (solving(matrix)) return true; 
        
        matrix[currentCell[0]][currentCell[1]] = 0;
      }
    }
    return false;
  }

  if (solving(matrix)) {
    return matrix;
  }
}
