let iteration = 0;
let solution = {};
let play = true;
let cnv;

let cnvWidth = 1424;
let cnvHeight = 600;
let p = [];


let m1 = 0;
let m2 = 0;
let k1 = 0;
let k2 = 0;
let L1 = 0;
let L2 = 0;
let b1 = 0;
let b2 = 0;

let myFont;

function preload() {
    myFont = loadFont('assets/SourceSansPro-It.otf');
}


function setup() {
    submitData();
    textFont(myFont);
    cnv = createCanvas(cnvWidth, cnvHeight);  // Size must be the first statement
    cnv.parent('sketch-holder');

    stroke(255);     // Set line drawing color to white
    frameRate(30);
}

function draw() {
    if (!play) {
        return
    }
    background(5);   // Set the background to black

    iteration++;

    if (iteration >= 600) {
        iteration = 0;
    }

    let scale = 75;

    leftBlockWidth = m1 * scale;
    rightBlockWidth = m2 * scale;

    leftBlockHeight = scale;
    rightBlockHeight = scale;

    let transitionY = 300;
    let transitionX = L1 * scale;
    let transitionX2 = (L1 + L2) * scale + leftBlockWidth;

    let x1 = Math.round(solution.y[iteration][0] * scale) + transitionX;
    let x2 = Math.round(solution.y[iteration][2] * scale) + transitionX2 + leftBlockWidth;

    // Draw left spring
    drawSpring(8, 0, transitionY + leftBlockHeight / 2, x1, transitionY + leftBlockHeight / 2);
    // Draw right spring
    drawSpring(14, (x1) + leftBlockWidth, transitionY + rightBlockHeight / 2, x2, transitionY + rightBlockHeight / 2);


    // Draw left block
    fill(255, 204, 0);
    rect(x1, transitionY, leftBlockWidth, leftBlockHeight);

    // Draw right block
    fill(204, 0, 255);
    rect(x2, transitionY, rightBlockWidth, rightBlockHeight);

    //draw ground
    fill(160, 82, 45)
    rect(0, transitionY + leftBlockHeight, cnvWidth, cnvHeight);

    text("time: " + (iteration / 10) + " s \n" +
        "position of 1st " + parseFloat(solution.y[iteration][0]).toFixed(2) + " m\n" +
        "position of 2nd " + parseFloat(solution.y[iteration][2]).toFixed(2) + " m\n"
        , 10, 30)

}

function drawSpring(bend, x1, y1, x2, y2) {

    let partSize = (x2 - x1) / bend;

    for (i = 0; i < bend; i++) {

        let y11 = 0;
        let y22 = 0;

        if ((i % 2 === 0)) {
            y11 = 20;
            y22 = -20;
        } else {
            y11 = -20;
            y22 = 20;
        }

        if (i === 0) {
            y11 = 0;
        }
        if (i === (bend - 1)) {
            y22 = 0;
        }

        drawLine(x1 + partSize * i, y1 + y11, x1 + partSize * (i + 1), y2 + y22);
    }
}

function drawLine(x1, y1, x2, y2) {
    stroke(153);
    line(x1, y1, x2, y2);
}

function start() {
    play = true;
}

function stop() {
    play = false
}

function restart() {
    play = true;
    iteration = 0
}

function submitData() {

    m1 = Number(document.getElementById('mass1').value);
    m2 = Number(document.getElementById('mass2').value);
    k1 = Number(document.getElementById('constant1').value);
    k2 = Number(document.getElementById('constant2').value);
    L1 = Number(document.getElementById('length1').value);
    L2 = Number(document.getElementById('length2').value);
    b1 = Number(document.getElementById('friction1').value);
    b2 = Number(document.getElementById('friction2').value);

    let x1 = Number(document.getElementById('position1').value);
    let x2 = Number(document.getElementById('position2').value);

    let y1 = 0.0;
    let y2 = 0.0;
    let w0 = [x1, y1, x2, y2];

    p = [m1, m2, k1, k2, L1, L2, b1, b2];

    solution = numeric.dopri(0, 100, w0, springs(p));

    restart();
    return false;
}