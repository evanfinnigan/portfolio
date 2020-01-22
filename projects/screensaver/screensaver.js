function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function colorLerp(hexA, hexB, t) {
    let rgbA = hexToRgb(hexA);
    let rgbB = hexToRgb(hexB);

    if (rgbA == null || rgbB == null) {
        return '#000000';
    } else {
        let c =  {
            r: lerp(rgbA.r, rgbB.r, t),
            g: lerp(rgbA.g, rgbB.g, t),
            b: lerp(rgbA.b, rgbB.b, t)
        }
        return rgbToHex(c.r, c.g, c.b);
    }
}

function lerp(a, b, t) {
    return Math.round(((1-t) * a) + (t * b));
}

let time = 0.0;
let timestep = 0.001;
let phase = 0;

let colorQueue = ['#621055', '#b52b65', '#ed6663', '#ffa372'];

let enqueue = function(element) {
    colorQueue.push(element);
}

let dequeue = function() {
    return colorQueue.shift();
}

let rotateColors = function() {
    enqueue(dequeue());
}

function drawBackground() {

    let a = colorLerp(colorQueue[0], colorQueue[1], time);
    let b = colorLerp(colorQueue[1], colorQueue[2], time);

    document.documentElement.style.setProperty('--color1', a);
    document.documentElement.style.setProperty('--color2', b);

    time += timestep;
    if (time >= 1) {
        time = 0;
        rotateColors();
    } 
}

function drawClock() {
    var now = new Date(Date.now());
    var am = now.getHours() <= 12;

    var hours = am ? now.getHours() : now.getHours() - 12;
    if (now.getHours() == 0)
    {
        hours = "24";
    }

    var clock = hours + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes() + (am ? "am" : "pm");
    document.getElementById("clock").innerText = clock;
    var seconds = (now.getSeconds() < 10 ? "0" : "") + now.getSeconds();
    document.getElementById("seconds").innerText = seconds;
}

function render() {
    drawBackground();
    drawClock();
}

function step() {
    render();
    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);