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
        this.get = (url, options) => {
            return this.request(url, { ...options, method: METHODS.GET });
        };
        this.put = (url, options) => {
            return this.request(url, { ...options, method: METHODS.PUT });
        };
        this.post = (url, options) => {
            return this.request(url, { ...options, method: METHODS.POST });
        };
        this.delete = (url, options) => {
            return this.request(url, { ...options, method: METHODS.DELETE });
        };
        this.request = (url, options) => {
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
