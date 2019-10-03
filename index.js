var grid;
var gameNotPaused = true;

function setup () {
  var canvas = createCanvas(400, 400);
  canvas.parent('canvas')
  grid = new Grid(20);
  grid.randomize
}

function draw () {
  background(250);
  // grid.updateNeighborCounts();
  // grid.updatePopulation();
  grid.draw();
  
  if (gameNotPaused) {
    grid.updateNeighborCounts();
    grid.updatePopulation();
   }

}

function keyPressed() {

  if (keyCode === ENTER ) {
  gameNotPaused = !gameNotPaused;
  print(gameNotPaused);
  }
  if (keyCode === BACKSPACE ) {
    grid.randomize();
  }
}

/* Step 6a - Added a mousePressed function and added the randomize function from grid*/
function mousePressed(){
  grid.updateNeighborCounts();
  grid.randomize();
}

class Grid {
  constructor (cellSize) {
    // update the contructor to take cellSize as a parameter
    // use cellSize to calculate and assign values for numberOfColumns and numberOfRows
    
    /*STEP 1 - created cellSize constructor and calculated the rows and colums*/
    this.cellSize = cellSize;
    this.numberOfColumns = floor(width / this.cellSize);
    this.numberOfRows = floor(height / this.cellSize);
    
    /*STEP 2 - 
    - Assigned cells to a new array with the value of the numberOfColumns
    - Iterated through the amount of cells and for every new cell we created another Array that had the numberOfRows
    - Print this.cells for the result
    note: this will help us keep track of the cells so we can put them in later
    */
    this.cells = new Array(this.numberOfColumns);
    
    for(var i = 0; i < this.cells.length; i++) {
      this.cells[i] = new Array(this.numberOfRows);
    }
    
    /* Step 3b - Pasted in the code to populate the grid with cells */
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row] = new Cell(column, row, cellSize)
      }
    }
    
    print(this.cells)
    
  }
  
  /* Step 4b
  - Took the contents of the for-loop out and put it in the draw function
  for the cell.
  */
  draw () {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].draw();
      }
    }
  }
  /* Step 5b
  - Added a randomize function that iterates through all the cells
  - Set the cells to alive 
  - Created a random int for the floor
  */
  randomize() {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var value = floor(random(2));
        this.cells[column][row].setIsAlive(value);
      }
    }
  }
  
  /* Step 6d - Iterate through the cells and call liveOrDie on them */
  updatePopulation () {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].liveOrDie();
      }
    }
  }
  /* Step 7 
  - Created a getNeighbors function 
  - Added logic
  */
  getNeighbors(currentCell) {
  var neighbors = [];

  // add logic to get neighbors and add them to the array
  for (var xOffset = -1; xOffset <= 1; xOffset++) {
  for (var yOffset = -1; yOffset <= 1; yOffset++) {
    var neighborColumn = currentCell.column + xOffset;
    var neighborRow = currentCell.row + yOffset;

    // do something with neighborColumn and neighborRow
    /* Step 9
    - updated it with isValidPosition
    - Checks to prevent the cell that is the currentCell to be added to the array
    */
    if(this.isValidPosition(neighborColumn, neighborRow)){
      var neighborCell = this.cells[neighborColumn][neighborRow];
      
      if(neighborCell != currentCell){
        neighbors.push(neighborCell);
      }
    }
  }
}

  return neighbors;
}

  /* Handles the edge case of the cells accessing non-existan neighbors */
  isValidPosition (column, row) {
  // add logic that checks if the column and row exist in the grid
  // return true if they are valid and false if they are not
    var validColumn = column >= 0 && column < this.numberOfColumns;
    var validRow = row >= 0 && row < this.numberOfRows;

    return  validColumn && validRow;
  
}
  /* STEP 10 */
  updateNeighborCounts (grid, x, y) {
  // for each cell in the grid
    // reset it's neighbor count to 0
    // get the cell's neighbors
    // increase liveNeighborCount by 1 for each neighbor that is alive
    
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var currentCell = this.cells[column][row];
        currentCell.liveNeighborCount = 0;

        var neighborsArray = this.getNeighbors(currentCell);

        for (var position in neighborsArray) {
          if (neighborsArray[position].isAlive) {
            currentCell.liveNeighborCount += 1;
          }
        }
      }
    }
}
}


/* Step 3a - Created a cell class with the necessary constructors  */
class Cell {
  constructor(column, row, size) {
    this.column = column;
    this.row = row;
    this.size = size;
    this.isAlive = false;
    /* Step 6b - Create a new property */
    this.liveNeighborCount = 0;
  }
  
  /* Step 4a
  - Created a draw function and put in the contents of the nested
    for-loop inside and out the if conditional for the alived cells
  */
  draw() {
    if (this.isAlive) {
      fill(color(200, 0, 200));
    } else {
      fill(color(240));
    }
    noStroke();
    rect(this.column * this.size + 1, this.row * this.size + 1, this.size - 1, this.size - 1);
  }
  
  /* Step 5a
  - Created a setIsAlive function to help determine the conditional
  */
  setIsAlive(value) {
    if (value){
      this.isAlive = true;
    } else {
      this.isAlive = false;
    }
  }
  
  /* Step 6c - Create the logic for the cells */
  liveOrDie() { 
    if (this.isAlive && this.liveNeighborCount < 2){
      this.isAlive = false; //underpopulation
    } else if (this.isAlive && this.liveNeighborCount > 3){
      this.isAlive = false; //overpopulation
    } else if (!this.isAlive && this.liveNeighborCount === 3){
      this.isAlive = true; //reproduction
    } else if (this.isAlive && this.liveNeighborCount === 2 || this.liveNeighborCount === 3) {
      this.isAlive = true; //lives on the next generation
    }
  }
}