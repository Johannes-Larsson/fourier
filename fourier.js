var terms = null;
var T = 2*3.1415962;
var t = 0;
var A = 1;
var points = [];
var speed = 1;
var nzterms = 0; // non-zero terms

function setup() {
    var canvas = createCanvas(window.innerWidth - 30, 300);
    canvas.parent('canvas-container');
    terms = makeTerms();
    T = getInput("period");
    A = getInput("amp");
    speed = parseFloat(getInput("speed"));
}

/**
 * returns an array of amplitudes corresponding to the term with the same index
 * should use the function written by the user
 */
function makeTerms() {
    nzterms = 0;
    var ret = [];
    for (var i = 0; i < getInput("no_terms"); i++) {
        if (i == 0) {
            ret.push(2/PI);
            continue;
        }
        if (i == 1) {
            ret.push(0);
            continue;
        }
       /*if (i % 2 == 0) ret.push(0);
       else {
            ret.push(4*A / (PI * i)); 
            nzterms ++;
        }*/
        //ret.push(-2*A/(PI*i)*pow(-1,i));
        ret.push(2*A/((1-i*i))*(pow(-1,i)+1));
        /*if (i % 2 == 0) ret.push(0);
        ret.push(4*A*(1 - pow(-1, i))/pow(PI*i,2));*/
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
    //text(points.length + ' points', 0, height - 10);
    text('y = ' + round(height / 2 - v.y), 0, height - 10);
    text(nzterms + " non-zero terms", 100, height - 10);
}

/**
 * 
 * @param {*} a 
 * @param {*} k 
 * @param {*} v 
 */
function drawTerm(a, k, v) {
    var phase = -PI / 2;
   var vn = { 
        x: v.x + a * cos(phase + t * TAU * k / T),
        y: v.y + a * sin(phase + t * TAU * k / T)
    }; 
    stroke(0);
    line(v.x, v.y, vn.x, vn.y);
    return vn;
}

function getInput(id) {
    return document.getElementById(id).value;
}

function windowResized() {
    resizeCanvas(windowWidth - 30, windowHeight / 2);
}