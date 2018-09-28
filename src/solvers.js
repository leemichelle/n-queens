/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  
  //initialize a board like this: new Board({n: n}) 
  var nBoard = new Board({n: n})
  var solution = nBoard.rows(); //fixme
  console.log(nBoard)
  
  for (var rowIndex = 0; rowIndex < n; rowIndex++) {
    for (var colIndex = 0; colIndex < n; colIndex++) {
      if (!nBoard.hasRowConflictAt(rowIndex) && !nBoard.hasColConflictAt(colIndex)) {
        nBoard.togglePiece(rowIndex, colIndex);
        rowIndex++;
      }
    }
  }
  //create for loop for row index
   //create a for loop for column index
    // check if board has conflict at row index and column index
      // if no conflict
       // toggle with row index and column index
      
  console.log('after iteration', nBoard)
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  let nBoard = new Board({n: n});
  let count = 0;
  let helpFunc = function(row) {
    if (row === n) {
      count++;
      return;
    }
    for (let i = 0; i < n; i++) { // column index
      nBoard.togglePiece(row, i);
      if (!nBoard.hasAnyRooksConflicts()) {
        helpFunc(row + 1);
      }
      nBoard.togglePiece(row, i)
    }
  }
  helpFunc(0);

  let solutionCount = count

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var nBoard = new Board({n: n}); 
  var solution = nBoard.rows().map(rows => rows.slice()) || nBoard.rows();  

  if(n===2 || n===3) {
    return 0; 
  }

  let queens = function(row) {
    if (row === n) {
      return; 
    }
    for (let i = 0; i < n; i++) {
      nBoard.togglePiece(row, i); 
      nBoard.rows().map(row => row.slice());
      if (!nBoard.hasAnyQueensConflicts()) {
        queens(row + 1); 
      } 

      nBoard.togglePiece(row, i)
    }
  }
  queens(0); 

  
  // rowFunc(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.map(row => row.slice());
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  let nBoard = new Board({n: n});
  let count = 0;
  
  if (n === 2 || n === 3) {
    return 0;
  }
  
  let helpFunc = function(row) {
    if (row === n) {
      count++;
      return;
    }
    for (let i = 0; i < n; i++) { // column index
      nBoard.togglePiece(row, i);
      if (!nBoard.hasAnyQueensConflicts()) {
        helpFunc(row + 1);
      }
      nBoard.togglePiece(row, i)
    }
  }

  helpFunc(0);
  
  let solutionCount = count;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
