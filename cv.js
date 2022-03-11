// Code pris sur https://betterprogramming.pub/how-to-create-the-matrix-text-effect-with-javascript


// Taille des lettres
const tileSize = 17;

// Diminution de l'effet de traînée
const fadeFactor = 0.05;

//variables
let canvas;
let ctx;

// Variable globale
const columns = [];
let maxStackHeight;

// La variable 
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    initMatrix();

    // start the main loop
    tick();
}

function initMatrix() {
    maxStackHeight = Math.ceil(canvas.height / tileSize);

    // divide the canvas into columns
    for (let i = 0; i < canvas.width / tileSize; ++i) {
        let column = {};
        // save the x position of the column
        column.x = i * tileSize;
        // create a random stack height for the column
        column.stackHeight = 10 + Math.random() * maxStackHeight;
        // add a counter to count the stack height
        column.stackCounter = 0;
        // add the column to the list
        columns.push(column);
    }
}

function draw() {
    // draw a semi transparent black rectangle on top of the scene to slowly fade older characters
    ctx.fillStyle = "rgba( 0 , 0 , 0 , " + fadeFactor + " )";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // pick a font slightly smaller than the tile size
    ctx.font = (tileSize - 2) + "px monospace";
    ctx.fillStyle = "rgb( 150 , 255 , 175 )";
    for (let i = 0; i < columns.length; ++i) {
        // pick a random ascii character (change the 94 to a higher number to include more characters)
        let randomCharacter = String.fromCharCode(33 + Math.floor(Math.random() * 94));
        ctx.fillText(randomCharacter, columns[i].x, columns[i].stackCounter * tileSize + tileSize);

        // if the stack is at its height limit, pick a new random height and reset the counter
        if (++columns[i].stackCounter >= columns[i].stackHeight) {
            columns[i].stackHeight = 10 + Math.random() * maxStackHeight;
            columns[i].stackCounter = 0;
        }
    }
}

// MAIN LOOP
function tick() {
    draw();
    setTimeout(tick, 40);
}