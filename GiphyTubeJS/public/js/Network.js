/**
 * Created by vijay.budhram on 11/14/15.
 */
var Network = {
    jsonRequest: function (options) {
        var url = options.url;
        var method = options.method || 'GET';
        var headers = options.headers || {};
        var body = options.body || '';
        var callback = options.callback || function (err, data) {
                console.error("options.callback was missing for this request");
            };

        if (!url) {
            throw 'loadURL requires a url argument';
        }

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onreadystatechange = function () {
            try {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        callback(null, JSON.parse(xhr.responseText));
                    } else {
                        callback(new Error("Error [" + xhr.status + "] making http request: " + url));
                    }
                }
            } catch (err) {
                console.error('Aborting request ' + url + '. Error: ' + err);
                xhr.abort();
                callback(new Error("Error making request to: " + url + " error: " + err));
            }
        };

        xhr.open(method, url, true);

        Object.keys(headers).forEach(function (key) {
            xhr.setRequestHeader(key, headers[key]);
        });

        xhr.send();

        return xhr;
    }
};
