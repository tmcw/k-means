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
});
