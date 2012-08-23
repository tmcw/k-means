var w = 600,
    h = 200,
    row = 100,
    t = 0.5,
    delta = 0.01,
    padding = 20,
    points = [1, 4, 5, 8].map(function(x) { return { x: x, chosen: false }; }),
    n = 3;

var svg = d3.select("#vis").append("svg")
    .attr("width", w + 2 * padding)
    .attr("height", h + 2 * padding);

var vis = svg.append('g')
  .attr("transform", "translate(" + padding + "," + padding + ")");

var choices = svg.append('g')
  .attr("transform", "translate(" + padding + "," + (padding + row) + ")");

var xs = d3.scale.linear()
    .range([0, w])
    .domain([0, 10])
    .clamp(true);

function x(_) { return xs(_.x); }

function drawrow(vis, points) {
    vis.selectAll("circle.control")
        .data(points)
      .enter().append("circle")
        .attr("class", "control")
        .attr("r", 10)
        .attr("cx", x)
        .attr("cy", 0)
        .call(d3.behavior.drag()
          .on("drag", function(d) {
            d.x = Math.round(xs.invert(d3.event.x));
            draw();
          }));

    vis.selectAll("text.controltext")
        .data(points)
      .enter().append("text")
        .attr("class", "controltext")
        .attr("dx", "0px")
        .attr("dy", "25px")
        .text(function(d, i) { return d.x; });

    function draw() {
        vis.selectAll("circle.control")
            .attr("cx", x);
        vis.selectAll("text.controltext")
            .attr("x", x)
            .attr("y", 0)
            .text(function(d, i) { return d.x; });
    }

    draw();
}

drawrow(vis, points);
drawrow(choices, points);
