var sample = require('./floyd');
function distance1d(a, b) { return Math.abs(a - b); }

function means_clusters(x, means, distance, val) {
    // For every value, find the closest mean and add that value to the
    // mean's `vals` array.
    for (i = 0; i < x.length; i++) {
        var dists = [];
        for (var j = 0; j < means.length; j++) {
            dists.push(distance(x[i], val(means[j])));
        }
        if (!means[closest_index].vals) means[closest_index].vals = [];
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
        sample: sample,
        means_clusters: means_clusters,
        clusters_means: clusters_means,
        kmeans: kmeans
    };
}
