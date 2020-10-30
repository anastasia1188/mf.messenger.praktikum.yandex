const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};
function queryStringify(data) {
    let result = "?";
    for (let key in data) {
        result = result + key + "=" + data[key].toString() + "&";
    }
    result = result.substring(0, result.length - 1);
    return result;
}
export default class HTTPTransport {
    constructor() {
        this.get = (url, options = { timeout: 0 }) => {
            return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
        };
        this.put = (url, options = { timeout: 0 }) => {
            return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
        };
        this.post = (url, options = { timeout: 0 }) => {
            return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
        };
        this.delete = (url, options = { timeout: 0 }) => {
            return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
        };
        this.request = (url, options, timeout = 5000) => {
            const { headers, data, method } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.onload = function () {
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
                }
                else {
                    xhr.send(data);
                }
            });
        };
    }
}
