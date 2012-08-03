var width = document.body.offsetWidth, height = document.body.offsetHeight;
var d = [];
var vis = d3.select("#chart")
.append("svg")
.attr("width", width)
.attr("height", height);

var x = d3.scale.linear()
.domain([0, width])
.range([0, width]);

var y = d3.scale.linear()
.domain([0, height])
.range([0, height]);

var dotsg = vis.append('g');
var clustersg = vis.append('g');

var clear = vis.append('g')
    .attr('class', 'clear-box');

clear.append('rect')
    .attr('width', 50)
    .attr('height', 50)
    .attr('x', width - 70)
    .attr('y', 0);

var draw_cheer = vis.append('text')
    .attr('class', 'draw-cheer')
    .attr('x', width / 2)
    .attr('y', height / 2);

clear.append('text')
    .attr('x', width - 55)
    .attr('width', 5)
    .attr('y', 35)
    .text('X');

clear.on('click', function() { d = []; draw(); });

function draw() {
    var clusters = kmeans(d, 8,
        function(a, b) {
            return Math.sqrt(
                Math.pow(a[0] - b[0], 2) +
                Math.pow(a[1] - b[1], 2));
        },
        function(pts) {
            return [
                ss.mean(pts.map(function(x) { return x[0]; })),
                ss.mean(pts.map(function(x) { return x[1]; }))];
        });

    var clusterdots = clustersg.selectAll('circle.clusterdot')
        .data(clusters.map(function(x) { return x.val; }));

    var dots = dotsg.selectAll('circle.dot')
        .data(d);

    dots.enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', 4)
        .attr('cx', function(d) { return d[0]; })
        .attr('cy', function(d) { return d[1]; });

    dots.exit().remove();

    clusterdots.enter()
        .append('circle')
        .attr('class', 'clusterdot')
        .attr('r', 4)
        .attr('cx', function(d) { return d[0]; })
        .attr('cy', function(d) { return d[1]; });
    clusterdots
        .attr('cx', function(d) { return d[0]; })
        .attr('cy', function(d) { return d[1]; });

    clusterdots.exit().remove();

    if (!d.length) {
        draw_cheer.text('click to draw data!');
    } else {
        draw_cheer.text('');
    }
}

var drawI;

d3.select(document.body).on('mousedown', function(e) {
    d.push(d3.mouse(vis.node()));
    draw();
});

d3.select(document.body).on('mousemove', function(e) {
    if (d3.event.which > 0) {
        d3.event.preventDefault();
        d.push(d3.mouse(vis.node()));
        draw();
    }
});

d3.select(document.body).on('touchstart', function(e) {
    d.push(d3.mouse(vis.node()));
    draw();
});

d3.select(document.body).on('touchmove', function(e) {
    d3.event.preventDefault();
    d.push(d3.mouse(vis.node()));
    draw();
});

draw();
