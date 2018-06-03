var y = 100;

var iteration = 0;
var solution = {};

function setup() {
    createCanvas(1424, 600);  // Size must be the first statement
    stroke(255);     // Set line drawing color to white
    frameRate(30);

    solution = numeric.dopri(0, 100, w0, springs(p));
}
function draw() {
    background(5);   // Set the background to black

    iteration++;

    if (iteration >= 400) {
        iteration = 0;
    }

    let scale = 75;
    
    leftBlockWidth = 2 * scale;
    rightBlockWidth = 1.5 * scale;

    leftBlockHeight = 1 * scale;
    rightBlockHeight = 1 * scale;

    let transitionY = 300;
    let transitionX = L1 * scale;
    let transitionX2 = (L1 + L2) * scale + leftBlockWidth;

    let x1 = Math.round(solution.y[iteration][0] * scale) + transitionX;
    let x2 = Math.round(solution.y[iteration][2] * scale) + transitionX2 + leftBlockWidth;

    // Draw left spring
    stroke(153);
    line(0, transitionY + leftBlockHeight / 2, x1, transitionY + leftBlockHeight / 2);

    // Draw right spring
    stroke(153);
    line(x1 + rightBlockWidth / 2, transitionY + rightBlockHeight / 2, x2, transitionY + rightBlockHeight / 2);

    // Draw left block
    fill(255, 204, 0);
    rect(x1, transitionY, leftBlockWidth, leftBlockHeight);

    // Draw right block
    fill(204, 0, 255);
    rect(x2, transitionY, rightBlockWidth, rightBlockHeight);
}