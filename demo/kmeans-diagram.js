var w = 600,
    h = 500,
    row = 100,
    t = 0.5,
    delta = 0.01,
    padding = 40,
    points = [0, 2, 3, 4, 5, 10, 18, 16, 20],
    n = 3;

var means = sample(points, 4);
var xs = d3.scale.linear()
  .range([0, w - padding])
  .domain([0, 20])
  .clamp(true);

function x(_) { return xs(_); }

var svg = d3.select('#vis').append('svg')
  .attr('width', w + 2 * padding)
  .attr('height', h + 2 * padding);

var steps = svg.selectAll('g')
  .data(['input data',
        'means',
        'all points closest to mean choices',
        'new means',
        'all points closest to new means',
        'new means'])
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

var clusters1 = means_clusters(points, means, dist1d, function(d) { return d; });
var means2 = clusters_means(clusters1, average1d, function(d) { return d; });
var clusters2 = means_clusters(points, means2, dist1d, function(d) { return d; });
var means3 = clusters_means(clusters2, average1d, function(d) { return d; });

var c = steps.selectAll('g.closest')
  .data(function(d, i, v) {
      if (i == 1 || i == 2) {
          return clusters1;
      } else if (i == 3 || i == 4) {
          return clusters2;
      } else {
          return [];
      }
  })
  .enter()
  .append('g').attr('class', 'closest');

c.append('rect')
   .attr('x', function(d) {
       return xs(d3.min(d, function(x) { return x; }));
   })
   .attr('class', 'closest')
   .attr('height', 20)
   .attr('y', -10)
   .attr('width', function(d) {
       return xs((d3.max(d, function(x) { return x; }) -
         d3.min(d, function(x) { return x; })));
   });

var p = steps.selectAll('g.points')
  .data(points)
  .enter()
  .append('g').attr('class', 'point');

p.attr('transform', function(d) {
    return 'translate(' + x(d) + ', 0)';
  });

p.append('circle')
  .attr('r', 10)
  .attr('class', 'control');

p.append('text')
  .attr('class', 'controltext')
  .attr('dx', '0px')
  .attr('dy', '4px')
  .text(function(d, i) { return d; });

var m = steps.selectAll('g.means')
  .data(function(d, i, v) {
      if (i == 1 || i == 2) {
          return means;
      } else if (i == 3 || i == 4) {
          return means2;
      } else if (i == 5) {
          return means3;
      } else {
          return [];
      }
  })
  .enter()
  .append('g').attr('class', 'mean');

m.attr('transform', function(d) {
    return 'translate(' + x(d) + ', 15)';
  });

m.append('circle')
  .attr('r', 5)
  .attr('class', 'mean');

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
    .text(function(d, i) { return d; });
}
