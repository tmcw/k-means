var Canvas = require('canvas'),
    kmeans = require('../'),
    fs = require('fs');

var w = 640 * 2, h = 100 * 2;
var m = 50;
var c = new Canvas(w, h);
var ctx = c.getContext('2d');

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, w, h);

ctx.font = '28px Futura';
ctx.textAlign = 'center';

function sx(x) {
    return (x / 10) * (w - (m * 2)) + m;
}

function axis(y) {
    ctx.fillStyle = '#ccc';
    ctx.fillRect(m - 1, y - 3, w - m * 2 + 2, 4);
    ctx.fillStyle = '#e2e2e2';
    ctx.fillRect(m, y - 2, w - m * 2, 2);
}

function dot(x, y, t, c) {
    ctx.fillStyle = c || '#f20c23';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText(t, x, y + 10);
}

function connect(x0, y0, x1, y1, c) {
    console.log(c);
    ctx.strokeStyle = c || '#f20c23';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.closePath();
    ctx.stroke();
}

axis(50);
axis(150);

var data = [0, 1, 4, 5, 7, 9, 10];
var output = [5.1];

data.forEach(function(d) {
    connect(sx(d), 50, sx(output[0]), 150, '#F07B87');
});

data.forEach(function(d) {
    dot(sx(d), 50, d, '#F07B87');
});

output.forEach(function(d) {
    dot(sx(d), 150, d);
});

c.toBuffer(function(err, buf) {
    fs.writeFileSync('one.png', buf);
});
