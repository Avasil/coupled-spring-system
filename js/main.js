/**
 *
 * @param w vector of the state variables:
 *          w = [x1, y1, x2, y2]
 * @param t time
 * @param p vector of the parameters:
 *          p = [m1, m2, k1, k2, L1, L2, b1, b2]
 * @returns {*[]}
 */

let springs = function (p) {
    // masses of objects
    let m1 = p[0];
    let m2 = p[1];
    // spring constants
    let k1 = p[2];
    let k2 = p[3];
    // lengths of the springs
    let L1 = p[4];
    let L2 = p[5];
    // friction coefficients
    let b1 = p[6];
    let b2 = p[6];
    return function (t, w) {
        let x1 = w[0];
        let y1 = w[1];
        let x2 = w[2];
        let y2 = w[3];

        let x1_prime = y1;
        let y1_prime = (-b1 * y1 - k1 * (x1 - L1) + k2 * (x2 - x1 - L2)) / m1;
        let x2_prime = y2;
        let y2_prime = (-b2 * y2 - k2 * (x2 - x1 - L2)) / m2;

        return [x1_prime, y1_prime, x2_prime, y2_prime]
    };
};

let m1 = 1.0;
let m2 = 1.5;

let k1 = 8.0;
let k2 = 40.0;

let L1 = 0.5;
let L2 = 1.0;

let b1 = 0.8;
let b2 = 0.5;

let x1 = 0.5;
let y1 = 0.0;
let x2 = 2.25;
let y2 = 0.0;

let p = [m1, m2, k1, k2, L1, L2, b1, b2];
let w0 = [x1, y1, x2, y2];