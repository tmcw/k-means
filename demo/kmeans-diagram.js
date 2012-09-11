var w = 600,
    h = 500,
    row = 100,
    padding = 40;

var x = d3.scale.linear()
  .range([0, w - padding])
  .domain([0, 20])
  .clamp(true);

var svg = d3.select('#vis').append('svg')
  .attr('width', w + 2 * padding)
  .attr('height', h + 2 * padding);

var points = [0, 2, 3, 4, 5, 10, 18, 16, 20];
var means = sample(points, 4);
var clusters1 = means_clusters(points, means, dist1d, function(d) { return d; });
var means2 = clusters_means(clusters1, average1d, function(d) { return d; });
var clusters2 = means_clusters(points, means2, dist1d, function(d) { return d; });
var means3 = clusters_means(clusters2, average1d, function(d) { return d; });

var steps = svg.selectAll('g')
  .data(['input data',
      'means',
      'all points closest to mean choices',
      'new means',
      'all points closest to new mean',
      'the new means'])
  .enter()
  .append('g')
  .attr('class', 'step')
  .attr('transform', function(d, i) {
      return 'translate(' + padding + ',' + (padding + (i * row)) + ')';
  });

steps.append('rect')
  .attr('class', 'stage')
  .attr('width', w - padding)
  .attr('height', row - padding * 2)
  .attr('y', -10);

steps.append('text')
    .text(function(d) { return d; })
    .attr('dy', -15);

function closest_d(d, i, v) {
    if (i == 1 || i == 2) {
        return clusters1;
    } else if (i == 3 || i == 4) {
        return clusters2;
    } else {
        return [];
    }
}
var c = steps.selectAll('g.closest')
  .data(closest_d)
  .enter()
  .append('g').attr('class', 'closest');

var closest_areas = c.append('rect')
    .attr('class', 'closest')
    .attr('height', 20)
    .attr('y', -10);

function update() {

    means = sample(points, 4);
    clusters1 = means_clusters(points, means, dist1d, function(d) { return d; });
    means2 = clusters_means(clusters1, average1d, function(d) { return d; });
    clusters2 = means_clusters(points, means2, dist1d, function(d) { return d; });
    means3 = clusters_means(clusters2, average1d, function(d) { return d; });

    closest_areas.data(closest_d);
    closest_areas
        .transition()
        .attr('x', function(d) {
            return x(d3.min(d, function(x) { return x; }));
        })
        .attr('width', function(d) {
            return x((d3.max(d, function(x) { return x; }) -
              d3.min(d, function(x) { return x; })));
        });

    p.data(points);
    p.attr('transform', function(d) {
        return 'translate(' + x(d) + ', 0)';
    });
    controltext.text(function(d, i) { return d; });
    m.data(means_d)
    .transition()
    .attr('transform', function(d) {
        return 'translate(' + x(d) + ', 15)';
    });
}

var p = steps.selectAll('g.points')
  .data(points)
  .enter()
  .append('g').attr('class', function(d, i, v){
      return 'point row-' + v;
  });

p.append('circle')
  .attr('r', 10)
  .attr('class', function(d, i, v) {
      return 'control row-' + v;
  });

var controltext = p.append('text')
  .attr('class', 'controltext')
  .attr('dx', '0px')
  .attr('dy', '4px');

steps.selectAll('g.row-0')
    .call(d3.behavior.drag()
      .on("drag", function(d, i) {
        points[i] = x.invert(d3.event.x);
        update();
      })
    );

function means_d(d, i, v) {
    if (i == 1 || i == 2) {
        return means;
    } else if (i == 3 || i == 4) {
        return means2;
    } else if (i == 5) {
        return means3;
    } else {
        return [];
    }
}

var m = steps.selectAll('g.means')
  .data(means_d)
  .enter()
  .append('g').attr('class', 'mean');

m.append('circle')
  .attr('r', 5)
  .attr('class', 'mean');

update();
