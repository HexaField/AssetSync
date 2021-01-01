var params = {};
if (typeof document !== 'undefined') {
    var parser = document.createElement('a');
    parser.href = location.href;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0])
            params[pair[0]] = decodeURIComponent(pair[1]);
    }
}

export function getParams() {
    return params
}