var w = 600,
    h = 500,
    row = 100,
    t = 0.5,
    delta = 0.01,
    padding = 40,
    points = [0, 2, 3, 4, 5, 10, 18, 16, 20].map(function(x) { return { x: x, chosen: false }; }),
    n = 3;

var choose = sample(points, 4);
for (var i = 0; i < choose.length; i++) choose[i].chosen = true;
var xs = d3.scale.linear()
  .range([0, w - padding])
  .domain([0, 20])
  .clamp(true);

function x(_) { return xs(_.x); }

var svg = d3.select('#vis').append('svg')
  .attr('width', w + 2 * padding)
  .attr('height', h + 2 * padding);

var steps = svg.selectAll('g')
  .data(['input data', 'random choices for cluster centers', 'all points closest to mean choices', 'new means'])
  .enter()
  .append('g')
  .attr('class', 'step')
  .attr('transform', function(d, i) {
      return 'translate(' + padding + ',' + (padding + (i * row)) + ')';
  });

steps.append('rect')
  .attr('class', 'title')
  .attr('width', w)
  .attr('height', row - padding - 10)
  .attr({y: -30, x: -20});

steps.append('rect')
  .attr('class', 'stage')
  .attr('width', w - padding)
  .attr('height', row - padding * 2)
  .attr('y', -10);

steps.append('text')
    .text(function(d) { return d; })
    .attr('dy', -15);

var p = steps.selectAll('g.points')
  .data(points)
  .enter()
  .append('g').attr('class', 'point');

p.attr('transform', function(d) {
    return 'translate(' + x(d) + ', 0)';
  });

p.append('circle')
  .attr('class', 'control')
  .attr('r', 10)
  .attr('class', function(d, i, v) {
      return (d.chosen && v > 0) ? 'control chosen' : 'control';
  });

p.append('text')
  .attr('class', 'controltext')
  .attr('dx', '0px')
  .attr('dy', '4px')
  .text(function(d, i) { return d.x; });


var c = steps.selectAll('g.closest')
  .data(function(d, i, v) {
      if (i > 1) {
          return means_clusters(points, points.filter(function(x) {
              return x.chosen;
          }), distance1d, function(d) { return d.x; });
      } else {
          return [];
      }
  })
  .enter()
  .append('g').attr('class', 'closest');

c.append('rect')
   .attr('x', function(d) { console.log(d); });

function drawrow(vis, points) {
  var point = vis.selectAll('g.point')
      .data(points)
    .enter().append('g').attr('class', 'point');

  point.append('circle')
    .attr('class', 'control')
    .attr('r', 10);

  point.append('text')
    .attr('class', 'controltext')
    .attr('dy', '4px')
    .text(function(d, i) { return d.x; });
}
