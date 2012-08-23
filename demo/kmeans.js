function choose_means(x, n) {
    // n is the number of means to choose.

    // the number of means cannot be higher
    // than the arity of the dataset
    if (n > x.length) return null;
    var means = [];
    while (means.length < n) {
        var idx = ~~(Math.random() * (x.length));
        if (!seen[idx]) {
            means.push({ val: x[idx], vals: [] });
            seen[idx] = true;
        }
    }
    return means;
}

function means_clusters(x, means, distance) {
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
}

function clusters_means(clusters) {
    var newvals = [];
    for (i = 0; i < means.length; i++) {
        var centroid = average(means[i].vals);
        newvals.push({
            val: centroid,
            vals: []
        });
    }
}

function kmeans(x, n, distance, average) {

}

if (typeof module !== 'undefined') {
    module.exports = {
        choose_means: choose_means,
        means_clusters: means_clusters,
        clusters_means: clusters_means,
        kmeans: kmeans
    };
}
