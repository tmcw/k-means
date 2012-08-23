function sample(list, m) {
    var n = list.length;
    if (m > n) return void console &&
        console.log('list length must be > sample');
    var sampleList = [];
    for (var i = n - m; i < n; i++) {
        var item = list[~~(Math.random() * i)];
        if (sampleList.indexOf(item) !== -1)
            sampleList.push(list[i]);
        else
            sampleList.push(item);
    }
    return sampleList;
}
