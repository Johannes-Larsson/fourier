var terms = null;
var T = 2*3.1415962;
var t = 0;
var A = 1;
var points = [];
var speed = 1;

function setup() {
    createCanvas(window.innerWidth, 300);
    terms = makeTerms();
    T = getInput("period");
    A = getInput("amp");
    speed = parseFloat(getInput("speed"));
}

/**
 * returns an array of amplitudes corresponding to the term with the same index
 */
function makeTerms() {
    var ret = [];
    for (var i = 0; i < getInput("no_terms"); i++) {
       if (i % 2 == 0) ret.push(0);
       else ret.push(A / i); 
    }
    return ret;
}

function draw() {
    background(255);
    
    // draw terms 
    var v  = {x: height / 2, y: height / 2};
    for (var i = 0; i < terms.length; i++) {
       v = drawTerm(terms[i], i, v); 
    }

    // misc ui
    stroke(100);
    line(v.x, v.y, height, v.y);
    line(height, 0, height, height);

    // trail stuff
    points.push({ x:height, y: v.y });

    t += .1;//parseFloat(getInput("dt"));

    fill(0);
    stroke(0);
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        p.x += speed;
        point(p.x, p.y);
        if (p.x > width) {
            points.splice(i, 1);
        }
    }

    //text(t, 0, height - 10);
}

/**
 * 
 * @param {*} a 
 * @param {*} k 
 * @param {*} v 
 */
function drawTerm(a, k, v) {
   var vn = { 
        x: v.x + a * cos(t * TAU * k / T),
        y: v.y + a * sin(t * TAU * k / T)
    }; 
    stroke(0);
    line(v.x, v.y, vn.x, vn.y);
    return vn;
}

function getInput(id) {
    return document.getElementById(id).value;
}