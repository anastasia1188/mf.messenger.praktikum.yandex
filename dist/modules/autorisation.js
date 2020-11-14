import { HTTPTransport } from "../../dist/modules/httpTransport.js";
export async function autorisation(user) {
    const host = 'http://mf.messenger.praktikum.yandex';
    //const host =  'https://amazing-turing-810a80.netlify.app/'
    const httpTransport = new HTTPTransport;
    const res = await httpTransport.get(`${host}/data/users.json`);
    const data = JSON.parse(res.responseText);
    for (let i = 0; i < data.length; i++) {
        if ((data[i].login === user.login) && (data[i].password === user.password)) {
            user.result = true;
        }
    }
}
export async function registration(user) {
    const host = 'http://mf.messenger.praktikum.yandex';
    //const host = 'https://amazing-turing-810a80.netlify.app/';
    const httpTransport = new HTTPTransport;
    const res = await httpTransport.post(`${host}/data/users.json`);
    const resJSON = res.responseText;
    if (resJSON.indexOf(user.login) === -1) {
        user.result = true;
        resJSON.push(JSON.stringify(user));
        const body = JSON.stringify(resJSON);
        const options = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: body,
        };
        httpTransport.post('user.json', options);
    }
    else
        user.result = false;
}
function postFile(form) {
    const host = 'http://mf.messenger.praktikum.yandex';
    const formData = new FormData(form);
    fetch(`${host}/data/image`, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
        return data;
    });
}
