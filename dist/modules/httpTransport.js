const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};

function queryStringify(data, result, obj) {
    if (result === void 0) { result = ""; }
    if (obj === void 0) { obj = ""; }
    for (var key in data) {
        if (typeof data[key] === 'object') {

            if (obj == '')
                obj = key;
            else
                obj = obj + "[" + key + "]";
            result = queryStringify(data[key], result, obj);
            obj = "";
        } else {

            if (result !== "")
                result = result + "&";
            if (obj != "")
                result = result + obj + "[" + key + "]" + "=" + data[key].toString();
            else
                result = result + key + "=" + data[key].toString();
        }
    }
    return result;
}
export default class HTTPTransport {
    constructor() {
        this.get = (url, options) => {
            return this.request(url, {...options, method: METHODS.GET });
        };
        this.put = (url, options) => {
            return this.request(url, {...options, method: METHODS.PUT });
        };
        this.post = (url, options) => {
            return this.request(url, {...options, method: METHODS.POST });
        };
        this.delete = (url, options) => {
            return this.request(url, {...options, method: METHODS.DELETE });
        };
        this.request = (url, options) => {
            const { headers, data, method } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.onload = function() {
                    resolve(xhr);
                };
                if (headers != undefined) {
                    for (let i = 0; i < headers.length; i++)
                        xhr.setRequestHeader(headers[i].key, headers[i].value);
                }
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                if (method === METHODS.GET || !data) {
                    xhr.send();
                } else {
                    xhr.send(data);
                }
            });
        };
    }
}