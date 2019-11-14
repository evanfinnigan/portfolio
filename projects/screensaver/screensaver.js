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

let c1 = '#faa4bd';
let c2 = '#533b4d';
let c3 = '#470024';

function drawBackground() {
    //let color1 = getComputedStyle(document.documentElement).getPropertyValue('--color1');
    //let color2 = getComputedStyle(document.documentElement).getPropertyValue('--color2');

    let a = colorLerp(c1, c2, time);
    let b = colorLerp(c2, c3, time);
    let c = colorLerp(c3, c1, time);

    switch (phase) {
        case 0:
            document.documentElement.style.setProperty('--color1', a);
            document.documentElement.style.setProperty('--color2', b);
            break;
        case 1:
            document.documentElement.style.setProperty('--color1', b);
            document.documentElement.style.setProperty('--color2', c);
            break;
        case 2:
            document.documentElement.style.setProperty('--color1', c);
            document.documentElement.style.setProperty('--color2', a);
            break;
        default:
            break;
    }

    time += timestep;
    if (time >= 1) {
        time = 0;
        phase++;
        if (phase == 3) {
            phase = 0;
        }
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