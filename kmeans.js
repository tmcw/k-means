function sample(list, m) {
    var n = list.length;
    if (m > n) return void console &&
        console.log('list length must be > sample');
    var sampleList = [];
    for (var i = n - m; i < n; i++) {
        var item = list[~~(Math.random() * i)];
        if (sampleList.indexOf(item) !== -1) {
            sampleList.push(list[i]);
        } else {
            sampleList.push(item);
        }
    }
    return sampleList;
}

function dist1d(a, b) {
    return Math.abs(a - b);
}

function average1d(n, val) {
    var s = 0;
    for (var i = 0; i < n.length; i++) {
        s += val(n[i]);
    }
    return s / n.length;
}

function dist(a, b) {
    var d = 0;
    for (var i = 0; i < a.length; i++) {
        d += Math.pow(a[i] - b[i], 2);
    }
    return Math.sqrt(d);
}

function identity(x) {
    return x;
}

function means_clusters(x, means, distance, val) {
    if (!val) val = identity;
    if (!distance) distance = dist1d;
    // For every value, find the closest mean and add that value to the
    // mean's `vals` array.
    var groups = {};
    for (var i = 0; i < x.length; i++) {
        var dists = [];
        for (var j = 0; j < means.length; j++) {
            dists.push(distance(val(x[i]), val(means[j])));
        }
        var closest_index = dists.indexOf(Math.min.apply(null, dists));
        if (!groups[closest_index]) groups[closest_index] = [];
        groups[closest_index].push(x[i]);
    }
    var out = [];
    for (var idx in groups) {
        out.push(groups[idx]);
    }
    return out;
}

function clusters_means(clusters, average, val) {
    if (!average) average = average1d;
    if (!val) val = identity;
    var newmeans = [];
    for (i = 0; i < clusters.length; i++) {
        var centroid = average(clusters[i], val);
        newmeans.push(centroid);
    }
    return newmeans;
}

function kmeans(x, n, distance, average) {

}

if (typeof module !== 'undefined') {
    module.exports = {
        sample: sample,
        dist1d: dist1d,
        dist: dist,
        means_clusters: means_clusters,
        clusters_means: clusters_means,
        kmeans: kmeans
    };
}
