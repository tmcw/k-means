function kmeans(x, n, distance, average) {

    // n is the number of means to choose.
    if (n === 0) {
        console.error('The number of means must be non-zero');
        return null;
    } else if (n > x.length) {
        console.error('The number of means must be fewer than the length of the dataset');
        return null;
    }

    var seen = {};
    var means = [];

    // Randomly choose k means from the data and make sure that no point
    // is chosen twice. This bit inspired by polymaps
    while (means.length < n) {
        var idx = ~~(Math.random() * (x.length));
        if (!seen[idx]) {
            means.push({ val: x[idx], vals: [] });
            seen[idx] = true;
        }
    }

    var i;
    // For every value, find the closest mean and add that value to the
    // mean's `vals` array.
    for (i = 0; i < x.length; i++) {
        var dists = [];
        for (var j = 0; j < means.length; j++) {
            dists.push(distance(x[i], means[j].val));
        }
        var closest_index = dists.indexOf(Math.min.apply(null, dists));
        means[closest_index].vals.push(x[i]);
    }

    // Create new centers from the centroids of the values in each
    // group.
    //
    // > In the case of one-dimensional data, such as the test scores,
    // the centroid is the arithmetic average of the values
    // of the points in a cluster.
    //
    // [Vance Faber](http://bit.ly/LHCh2y)
    var newvals = [];
    for (i = 0; i < means.length; i++) {
        var centroid = average(means[i].vals);
        newvals.push({
            val: centroid,
            vals: []
        });
    }

    return newvals;
}

if (typeof module !== 'undefined') {
    module.exports = kmeans;
}
