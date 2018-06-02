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

    let scale = 50;
    let transitionY = 300;
    let x = Math.round(solution.x[iteration] * scale);
    let y0 = Math.round(solution.y[iteration][0] * scale) + transitionY;
    let y1 = Math.round(solution.y[iteration][1] * scale) + transitionY;
    let y2 = Math.round(solution.y[iteration][2] * scale) + transitionY;
    let y3 = Math.round(solution.y[iteration][3] * scale) + transitionY;


    fill(200);
    line(0, transitionY, 1424, transitionY);

    fill(255, 204, 0);
    rect(x, y0, 10, 10);
    fill(0, 204, 255);
    rect(x, y1, 10, 10);
    fill(204, 0, 255);
    rect(x, y2, 10, 10);
    fill(100, 35, 212);
    rect(x, y3, 10, 10);
}