## k-means-cluster

[![Greenkeeper badge](https://badges.greenkeeper.io/tmcw/k-means.svg)](https://greenkeeper.io/)

[k-means clustering](http://en.wikipedia.org/wiki/K-means)
in configurable dimensions, in-browser and with node.js.

In order to support [learning about the algorithm](http://macwright.org/2012/09/16/k-means.html),
this library is split into very small bits, so you can use each
step separately.

```javascript
var kmeans = require('k-means-cluster');

var d = [1, 2, 3];
// take a random sample of the array d
var s = kmeans.sample(d, 1);

console.log(s);
// [1]

// Get the euclidean distance between two points represented as
// arrays
console.log(kmeans.dist([0, 0], [0, 1]), 1);
// 1
```

In order to support a variety of data, accessors are used in functions like
`means_clusters(x, means, distance, val)` (though with good defaults -
distance defaults to euclidean, val defaults to `function(x) { return x; }`).

```javascript
var c = kmeans.means_clusters([3], [3, 4])
console.log(c.length);
// 1
```

## Usage

    npm install --save k-means-cluster

## Testing

    npm test

## License is [WTFPL](http://sam.zoy.org/wtfpl/)
