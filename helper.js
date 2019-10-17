var instructions =  [
    `<strong>Step 1</strong>: Creating the Game of Life
    <br>For this tutorial, we'll be making edits to the <i>index.js</i> file. 
    <br>Inside of <i>index.js</i>, there is already have a <i>Grid</i> class with a draw function. 
    Now, we want to give the <i>Grid</i>  class a constructor parameter <i>cellSize</i>
    so that it can automatically calculate how many columns and rows
    it should have based on the canvas <i>width</i> and <i>height</i>.
    
    <br><br><i><strong>Check:</strong></i> When you are done, uncomment/re-enable the other lines of code
    in <i>setup</i> and <i>draw</i> (remove the <i>//</i> in front of the code) and confirm that
    you now see a grid of 20x20 cells in your canvas. 

    <br><img src="imgs/Step-One-1.png" alt="Step One Image" width="400">

    <br>Also try changing the number you pass to <code>new Grid()</code> - a smaller number means the 
    <code>cellSize</code> is smaller and <code>numberOfRows</code> and <code>numberOfColumns</code> should be bigger.
    So new <code>Grid(10)</code> should make a 40 x 40 grid (cells are half as big):
    
    <br><img src="imgs/Step-One-2.png" alt="Step Two Image" width="400">
    `,

    `<strong>Step 2</strong>: Now we need to add a way to keep track of the contents of each cell in the grid. 
    At the bottom of the constructor, we need to create and assign a 2D array to <i>cells</i>. First 
    assign <i>cells</i> to a new array with length equal to <i>numberOfColumns</i>. Then, for each position 
    in the array, assign it to another new array with length equal to <i>numberOfRows</i>. 
    <br>Here's one way to create a 2D array: 
    <pre class="code-block">
        <code>
    var x = 2; // how big the first array should be 
    var y = 2; // how big each array inside of the first array should be 
    var twoDArray = new Array(x); 
    for (var i = 0; i < twoDArray.length; i ++) { 
        twoDArray[i] = new Array(y); 
    } print(twoDArray); // prints [[null, null],[null, null]] in the console 
        </code>
    </pre>
    <br><i><strong>Check:</strong></i> Add <code>print(this.cells)</code> at the end of the constructor. 
    Check that the console prints out <i>Array(20)</i>
    (you should also be able to expand it and see that each position also holds an empty array).
    
    <br><img src="imgs/Step-Two-1.png" alt="Step Two Image" width="600">
    `,

    
    `<strong>Step 3</strong>: Right now our grid has an array of arrays to keep track of cells, 
    but we need some cells to put in it. Let's start by creating a basic <code>Cell</code> class. 
    Each cell should have a <code>column</code>, <code>row</code>, and <code>size</code> - ensure the constructor takes these as parameters. 

    <br>Additionally, each cell can be either alive or dead, so let's add a boolean property 
    to keep track of it called <code>isAlive</code>. 
    
    <br><br>Inside the constructor, have every cell start off dead (<code>isAlive</code> should be <code>false</code>). 

    <br>Once you have the basic <code>Cell</code> class added, paste the following code just above 
    <code>print(this.cells)</code> from the last step: 
    <pre>
        <code>
        for (var column = 0; column < this.numberOfColumns; column ++) { 
            for (var row = 0; row < this.numberOfRows; row++) {
                this.cells[column][row] = new Cell(column, row, cellSize)}} 
        </code>
    </pre>
    The above code will go into each position in the 2D array and create a new <code>Cell</code>. 

    <br><br><i><strong>Check:</strong></i> Refresh the page and check that the console now shows
    a <code>Cell</code> and it's values instead of empty arrays.`,

    `<strong>Step 4</strong>: Now that our grid can keep track of all of it's cells, 
    let's start adding more functionality to the cell. To start, let's give <code>Cell</code>
    it's own <code>draw</code> function, so that it will be responsible
    for it's own appearance based on whether it is dead or alive. 

    <br><br>Inside of <code>Grid.draw</code>, remove everything inside of the nested
    for loop and paste it inside of the new <code>Cell.draw</code> function. 
    Be sure to update the variables from the copied code to use <code>this</code> 
    and to match the property names within the cell class (<code>column</code> -> <code>this.column</code>, etc). 

    <br><br>Back in the <code>Grid.draw</code> for loop, instead, get the cell from
    <code>this.cells</code> and call <code>draw</code> on it. 
    When you re-run your program everything should look exactly the same but now each cell is drawing itself. 

    <br><br><i>If you get errors, use them to help guide you to where you still need to make
    changes, as they will often give you a line number and indicate which variable it 
    couldn't find.</i> 

    <br><br>Finally, replace <code>fill(240);</code> with an <code>if else</code> statement
    to change the <code>fill</code> color depending on if the cell is alive or dead. 
    You may choose any colors you like, but this tutorial will use <code>color(240)</code>
    for dead cells, and <code>color(200,0,200)</code> for alive cells. 

    <br><br><i><strong>Check:</strong></i> Temporarily change <code>this.isAlive = false;</code>
    to <code>this.isAlive = true;</code> inside of the cell constructor and confirm
    that your <code>if</code> statement is correctly assigning colors depending
    on the cell's value.<br>

    <br>All cells dead:
    <br><img src="imgs/Step-Four-1.png" alt="Step Four Image" width="420">

    <br>All cells alive:
    <br><img src="imgs/Step-Four-2.png" alt="Step Four Image" width="420">
    `,

    `<strong>Step 5</strong>: Starting all the cells as all dead or all alive isn't 
    very exciting. First let's add a function to <code>Cell</code> that we can
    call to set the value of <code>isAlive</code> directly. Add a new function 
    to <code>Cell</code> called <code>setIsAlive</code>, that takes a paramenter
    <code>value</code>. If <code>value</code> is true, assign <code>isAlive</code>
    to true, otherwise set it to <code>false</code>.
    
    <br><br>Now we want to add a new function <code>randomize</code> to <code>Grid</code>. 
    It should loop over all of it's cells just like the <code>draw</code> function. 
    But instead of calling <code>draw</code> on the cell, we want to call <code>setIsAlive</code> and pass
    it a value that will evaluate to <code>true</code> or <code>false</code>. 


    <br><br>We can use <code>random</code> to help us. Since '0' is treated as <code>false</code>
    and '1' is treated as <code>true</code>, we can do <code>floor(random(2))</code> 
    and pass the result to <code>setIsAlive</code>. <code>random(2)</code> will
    create random decimals between '0' and '2', and <code>floor</code> turns it into
    an integer by dropping everything after the decimal.

    <br><br>You can try <code>print(random(2));</code> and <code>print(floor(random(2)));</code> to
    see the results in the console. 
    
    <br><img src="imgs/Step-Five-1.png" alt="Step Five Image" width="600">
    
    <br>Finally, add <code>grid.randomize();</code> to the bottom of the <code>setup</code> function. 
    <em><strong>Check:</strong></em> Each time you run the program, you should now be seeing a 
    different mix of dead and alive cells.
    
    <br><img src="imgs/Step-Five-2.png" alt="Step Five Image" width="500">
    `,

    
    `<strong>Step 6</strong>: Let's add the <code>mousePressed()</code> function 
    (remember that it's a global function, don't put it inside one of
    the classes by accident!) - this will help us check our code in
    the future steps. Put <code>grid.randomize()</code> in it and check 
    that each time you click the grid re-randomizes the cells. 

    <br><br>Now we are ready to start adding the advanced logic for how the
    population will change over time. Let's review the logic we need to
    implement: 
    <ul>
    <li>
    Any live cell with fewer than two live neighbours dies, as if caused by underpopulation. 
    </li>
    <li>
    Any live cell with two or three live neighbours lives on to the next generation. 
    </li>
    <li>
    Any live cell with more than three live neighbours dies, as if by overpopulation. 
    </li>
    <li>
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction. 
    </li>
    </ul>

    <br>So, what pieces of information will we need? Notice that each line 
    expresses some conditional logic based on two properties: whether the
    cell is currently dead or alive, and how many of the neighboring cells 
    are alive. We already have the ability to check if a cell is dead or 
    alive, but now we need to add some code that will tell us the number of 
    living neighbors the cell has. 

    <br><br>Add a new property to <code>Cell</code> to store <code>liveNeighborCount</code> 
    and initialize it as 0 on creation. 

    <br><br>Great, now we have the two pieces of information, so we can add a 
    function to the Cell class that uses them to implement the 4 conditions above. 

    <br><br>Make <code>liveOrDie</code> as a function in the <code>Cell</code> class. 
    Here is where you now need to add some conditional logic for the cell to 
    look at it's values for <code>isAlive</code> and <code>neighborCount</code> 
    and determine what to change <code>isAlive</code> to. 

    <br><br>Now we need a place to call <code>liveOrDie</code> on each cell. 

    <br><br>Add an <code>updatePopulation</code> function to <code>Grid</code> 
    Inside the method, loop over each cell and call <code>liveOrDie</code> on it. 

    <br><br><i><strong>Check</strong></i> Inside of <code>mousePressed</code> replace 
    <code>grid.randomize</code> with <code>grid.updatePopulation</code>. 

    <br><br>When you start the program you should see the grid with a random population 
    of cells just like before. And when you click... they should all die! 

    <br><br>This is because right now all of the cells think they have 0 neighbors 
    because that's how we initialized them. We'll add logic to update their 
    information correctly in the next steps.`,

    `<strong>Step 7:</strong> Now we need to write some code that will 
    be able to correctly update the value of <code>liveNeighborCount</code> on each of our cells. 
    
    <br><br>To do this, we need to be able to get all of the neighboring grid locations 
    around each cell and then count how many of them are living cells. 

    <br><br>Let's break the logic into two parts, first let's focus on just getting 
    all of the neighbors for a cell. 
    
    <br><br>Create a new function on the <code>Grid</code> class called <code>getNeighbors</code> 
    that takes an argument called <code>currentCell</code>. We want this 
    function to <code>return</code> all of the neighbor cells in an array: 
    <pre>
        <code>
    getNeighbors(currentCell) { 
        var neighbors = []; 
        // add logic to get neighbors and add them to the array 
        return neighbors; 
    } 
        </code>
    </pre>
    <br>One of the hardest parts of this function will be answering the question: 
    how do we get a cell's neighbors? 

    <br><br>Let's look at an example with a much smaller grid. If a cell is at 
    position 1,1 in the grid, it's neighbor cells will be the 8 surrounding 
    cells in the grid:

    <br><img src="imgs/Step-Seven-1.png" alt="Step Seven Image" width="500">

    <br>You can see that the x-values for neighbor cells are either 1 less, the 
    same, or 1 more than the current cell's x position. The same is true for 
    the y-values.

    <br><br>So, given <code>currentCell</code> the way to get the <code>neighborColumn</code> 
    and <code>neighborRow</code> for all 9 positions around and including the 
    cell, the code would look like this:

    <br>
    <pre>
        <code>
            for (var xOffset = -1; xOffset <= 1; xOffset++) {
                for (var yOffset = -1; yOffset <= 1; yOffset++) {
                    var neighborColumn = currentCell.column + xOffset;
                    var neighborRow = currentCell.row + yOffset;
                
                    // do something with neighborColumn and neighborRow
                }
                }
        </code>
    </pre>
    
    <br><i><strong>Check</strong></i> 
    Replace the contents of <code>mousePressed</code> with the following: 
    <br>
    <pre>
        <code>
        var randomColumn = floor(random(grid.numberOfColumns));
        var randomRow = floor(random(grid.numberOfRows));
    
        var randomCell = grid.cells[randomColumn][randomRow];
        var neighborCount = grid.getNeighbors(randomCell).length;
    
        print("cell at " + randomCell.column + ", " + randomCell.row + " has " 
        + neighborCount + " neighbors");
        </code>
    </pre>

    <br>Each time you click it will get a random cell from the grid 
    and use the <code>getNeighbors</code> function and print the size 
    of the array that it gets. 

    <br><br>You should see that almost every cell has 9 neighbors, 
    and every now and then you will see an error like:

    <br>
    <pre>
        <code>
        Uncaught TypeError: Cannot read property '0' of undefined
        </code>
    </pre>
    `,

    `<strong>Step 8</strong>: Our function in the last step <i>mostly</i> works, 
    but now it's time to correctly handle the edge cases for 'getNeighbors'. 

    <br><br>We have that error about <code>Cannot read property '0' of undefined</code> 
    Generate a few of the errors and see if you can spot the pattern of 
    when it happens. 

    <br><br><img src="imgs/Step-Eight-1.png" alt="Step Eight Image" width="500">
    
    <br>Take a look at this example from our 3x3 grid again. 
    What happens when you call getNeighbors on a cell that is along an edge? 
    Does it have 8 neighbors? 

    <br><br>To ensure that your code doesn't try to access any non-existant neighbors 
    outside the bounds of the grid, let's add a helper function we can use. 

    <br><br>In the <code>Grid</code> class, add: 
    <pre>
        <code>
        isValidPosition (column, row) {
            // add logic that checks if the column and row exist in the grid 
            // return true if they are valid and false if they are not 
           } 
        </code>
    </pre>

    <br><i><strong>Check</strong></i> You can check your <code>isValidPosition</code> 
    function by adding some calls at the end of <code>setup</code> or <code>mousePressed</code> 
    functions to try some column and rows that you know should be true and 
    trying some that you know should be 'false'. 
    <br>
    <pre>
        <code>
        print(grid.isValidPosition(0, 0)); // should be true 
        print(grid.isValidPosition(-1, -1)); // should be false 
        // Add an example for all of the possible ways that it should return 
        false
        </code>
    </pre> `,

    `<strong>Step 9:</strong> Now that you can use the helper to check 
    which grid locations are valid, update the <code>getNeighbors</code> 
    function to use <code>isValidPosition</code> so that it will stop throwing 
    errors when it tries to access bad locations. 

    <br><br>There's still another issue to fix. We saw it said each cell had 9 
    neighbors - but that's one more than it should have! 
    That means it was counting the <code>currentCell</code> as a neighbor. 

    <br><br>Add some logic inside <code>getNeighbors</code> to prevent the cell that is the current 
    cell from being added to the array. 
    
    <br><br><i><strong>Check</strong></i> 
    After making your fixes, your print statements in the console
    should now stop throwing errors. 

    <br><br>You should also see that now most cells have 8 neighbors but 
    some have 3 (corners) or 5 (edges).`,
    
    `<strong>Step 10:</strong> Now that we are able to correctly get an array of 
    any cell's neighbor cells, let's add a new function called 
    <code>updateNeighborCounts</code> to the <code>Grid</code> class.

    <br><br>We want this function to loop over all of the cells, count how many 
    of it's neighbors are alive and then update <code>liveNeighborCount</code> 
    for each one. Here's an outline of what the function needs to do: 
    <br>
    <pre>
        <code>
        updateNeighborCounts () { 
            // for each cell in the grid 
            // reset it's neighbor count to 0 
            // get the cell's neighbors 
            // increase liveNeighborCount by 1 for each neighbor that is alive 
        }     
        </code>
    </pre>

    <br><i><strong>Check</strong></i>
    Call <code>updateNeighborCounts</code> and then <code>print(grid.cells)</code> 
    inside of <code>mousePressed</code> (You can remove or comment out the 
    previous contents to keep the console more clean.). 
    
    <br><br>Compare the values on the cells with what you see in the canvas. 
    For example if the first cell at 0, 0 has 2 living neighbors that you can 
    see, confirm that it's properties in the console also say that it has 
    2 neighbors. 
    
    <br><br>Inspect several cell locations, especially ones in the corners or edges, 
    until you are convinced that neighbor count values are all working as expected.`,

    `<strong>Step 11:</strong> We're finally ready to put it all together! 
    You should still have <code>grid.updateNeighborCounts();</code> inside 
    of <code>mousePressed</code> so now that cells know their correct neighbor 
    counts, you can re-add <code>grid.updatePopulation();</code> below that. 
    (Order matters! If all your cells die instantly, be sure you are updating 
    the counts before updating the population.) 
    
    <br><br>When you click the mouse you should now see the population update correctly 
    on the canvas. Before each click, pick a cell on the canvas to focus on, 
    and manually count it's neighbors and think about the logic for whether it 
    should live or die. Make a prediction for if that cell should be 
    living or dead when you click next. Were you right? 
    
    <br><br>If you find your predictions are often wrong, go back and double check 
    the logic inside of the <code>liveOrDie function</code>. 
    
    <br><br>Once you feel like things are working correctly, it's time to make the 
    final change. We want the population to update itself automatically without 
    having to click each time. Move the 2 methods from the <code>mousePressed</code> 
    function up into the <code>draw function</code>, right before <code>grid.draw</code>. 
    
    <br><br><i><strong>Check</strong></i> Your game should be fully functional now! 
    Try decreasing the cell size when you create the grid to see a larger 
    population of cells on the screen at once to confirm that the population changes 
    as expected. 
    
    <br><br>At a certain point you will probably notice that most cells have died but 
    you see some static patterns that aren't moving and some dynamic ones that 
    move in a predictable pattern. 
    
    <br><br>Look at the list of patterns on the wikipedia page and compare them to your 
    program as a final check to confirm your logic is working correctly 
    <a href ="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns">Conways Game of Life: Example of Patterns</a>
    
    <br><br>If your cells form static patterns that aren't listed on the wikipedia 
    page, review your logic, there's probably a small error somewhere.`,

    `<strong>Next Steps...:</strong> 
    First, congrats! Building the game of life is no easy task. 
    I mean, you just CREATED LIFE right? :D 
    
    <br><br><i><strong>Keep your code here limited to the GOL basics, no added functionality.</strong></i> 
    In the next assignment, you'll copy over your GOL code so far and add some new features.`,
];

// Keeps track of the steps we are taking through the instructions
currentStep = -1;

// Moves a step forward in the instructions
function next() {
    if (currentStep < instructions.length -1){
        document.getElementById("instructions").innerHTML = instructions[currentStep += 1]
    }
}

// Moves a step backwards in the instructions
function prev() {
    if (currentStep > 0) {
        document.getElementById("instructions").innerHTML = instructions[currentStep -= 1]

    }
}

// Logic to go through the progress bar
function toStep(chosenStep) {

    for(i=1; i<=11 ; i++){
        let stepper = document.getElementById("Step" + (i));
        if (i <= chosenStep) {
            // add active
            stepper.classList.add('active');
        } else {
            //remove active
            stepper.classList.remove('active');
        }
    }

    document.getElementById("instructions").innerHTML = instructions[chosenStep - 1]
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
       // left arrow
       prev()
    }
    if (e.keyCode == '39') {
       // right arrow
       next()
    }

}