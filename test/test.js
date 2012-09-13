var kmeans = require('../'),
    assert = require('assert');

describe('kmeans', function() {
    it('should be able to take one sample from a dataset', function() {
        var d = [1, 2, 3];
        var s = kmeans.sample(d, 1);
        assert.equal(s.length, 1);
        assert.ok(d.indexOf(s[0]) !== -1);
    });

    it('should be sample an entire dataset', function() {
        var d = [1, 2, 3];
        var s = kmeans.sample(d, 3);
        assert.equal(s.length, 3);
        assert.ok(d.indexOf(s[0]) !== -1);
        assert.equal(d.sort().toString(), s.sort().toString());
    });

    it('can get the distance between two numbers', function() {
        assert.equal(kmeans.dist1d(1, 3), 2);
    });

    it('can get the distance between two simple points', function() {
        assert.equal(kmeans.dist([0, 0], [0, 0]), 0);
        assert.equal(kmeans.dist([0, 0], [0, 1]), 1);

        // pythagorean triple
        assert.equal(kmeans.dist([3, 4], [0, 0]), 5);
    });

    it('can make mean groups from means', function() {
        var more_means = kmeans.means_clusters([3], [3, 4]);
        assert.equal(more_means.length, 1);
        assert.equal(more_means[0], 3);
    });

    it('can use the val accessor and make mean groups from means', function() {
        var more_means = kmeans.means_clusters([{x: 3}], [{x: 3}, {x: 4}],
            function(d) {
                return d.x;
            });
        assert.equal(more_means.length, 1);
        assert.equal(more_means[0][0].x, 3);
    });

    it('can make means from clusters', function() {
        var more_means = kmeans.means_clusters([3], [3, 4]);
        assert.equal(more_means.length, 1);
        var n = kmeans.clusters_means(more_means);
        assert.equal(n[0], 3);
    });

});
