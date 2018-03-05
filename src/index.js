module.exports = function solveSudoku(matrix) {
 let veryStrangeResult = matrix.map(r => [...r.map(i => i === 0 ? [] : i)]);
 return veryStrangeResult;
}
