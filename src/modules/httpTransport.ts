const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};

function queryStringify(data: { key: string }) {
    let result = "?";
    for (let key in data) {
        result = result + key + "=" + data[key].toString() + "&";
    }

    result = result.substring(0, result.length - 1);

    return result;
}

export default class HTTPTransport {
    get = (url: string, options: { timeout: number, headers: { key: string, value: string }[], data: any }) => {
        return this.request(url, { ...options, method: METHODS.GET });
    };

    put = (url: string, options: { timeout: number, headers: { key: string, value: string }[], data: any }) => {
        return this.request(url, { ...options, method: METHODS.PUT });
    };

    post = (url: string, options: { timeout: number, headers: { key: string, value: string }[], data: any }) => {
        return this.request(url, { ...options, method: METHODS.POST });
    };

    delete = (url: string, options: { timeout: number, headers: { key: string, value: string }[], data: any }) => {
        return this.request(url, { ...options, method: METHODS.DELETE });
    };

    request = (url: string, options: { timeout: number, headers: { key: string, value: string }[], data: any, method: string }) => {
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
            } else {
                xhr.send(data);
            }
        });
    };
}