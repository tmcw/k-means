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
        assert.equal(more_means[0].val, 3);

        var more_x = kmeans.means_clusters([3, 4], [3]);
        assert.equal(more_x.length, 1);
        assert.equal(more_x[0].group.length, 2);

        var id_x = kmeans.means_clusters([3, 4], [3, 4]);
        assert.equal(id_x.length, 2);
        assert.equal(id_x[0].group.length, 1);
        assert.equal(id_x[1].group.length, 1);
    });
});
