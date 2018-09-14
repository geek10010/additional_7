module.exports = function solveSudoku(matrix) {
  const sudoku = matrix;

  function findEmptyCell(grid) {
    for (let rownum = 0; rownum < 9; rownum += 1) {
      for (let colnum = 0; colnum < 9; colnum += 1) {
        if (grid[rownum][colnum] === 0) {
          return [rownum, colnum];
        }
      }
    }
    return [];
  }


  function isPresentInRow(candidatNumber, rownum) {
    return sudoku[rownum].includes(candidatNumber);
  }


  function isPresentInCol(candidatNumber, colnum) {
    for (let i = 0; i < 9; i += 1) {
      if (candidatNumber === sudoku[i][colnum]) {
        return true;
      }
    }

    return false;
  }


  function isPresentInBlock(candidatNumber, cell) {
    const [rownum, colnum] = cell;
    const row = Math.floor(rownum - (rownum % 3));
    const col = Math.floor(colnum - (colnum % 3));
    let blockRow;

    for (let i = 0; i < 3; i += 1) {
      blockRow = sudoku[row + i].slice(col, col + 3);
      if (blockRow.includes(candidatNumber)) {
        return true;
      }
    }

    return false;
  }


  function isAllowed(candidatNumber, cell) {
    const [rownum, colnum] = cell;
    if (!isPresentInRow(candidatNumber, rownum)
      && !isPresentInCol(candidatNumber, colnum)
      && !isPresentInBlock(candidatNumber, cell)) {
      return true;
    }
    return false;
  }


  function solving(grid) {
    const currentCell = findEmptyCell(sudoku);
    const [rownum, colnum] = currentCell;

    if (currentCell.length === 0) {
      return true;
    }

    for (let number = 1; number <= 9; number += 1) {
      if (isAllowed(number, currentCell)) {
        sudoku[rownum][colnum] = number;

        if (solving(grid)) {
          return true;
        }

        sudoku[rownum][colnum] = 0;
      }
    }

    return false;
  }

  solving(sudoku);

  return sudoku;
};
