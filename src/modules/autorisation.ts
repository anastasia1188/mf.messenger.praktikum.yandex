import HTTPTransport from "../../dist/modules/httpTransport.js";

interface User {
    login: string;
    password: string;
}

interface User{
    login: string,
    password: string
}

export async function isAutorizied(user: User) {
    const data = await getUsers();
    const users = JSON.parse(data.responseText);

    for (let i = 0; i < users.length; i++) {
        if ((users[i].login === user.login) && (users[i].password === user.password)) {
            return true;
        }
    }

    return false;
}

async function getUsers()
{
    const host = 'http://mf.messenger.praktikum.yandex';
    //const host =  'https://amazing-turing-810a80.netlify.app/'
    const httpTransport = new HTTPTransport;
    const res = await httpTransport.get(`${host}/data/users.json`);
    return res;
}

export async function isRegistrationSuccess(user: User) {
    const httpTransport = new HTTPTransport;
    const host = 'http://mf.messenger.praktikum.yandex';
    //const host = 'https://amazing-turing-810a80.netlify.app/';

    const data = await getUsers();
    const users = data.responseText;

    if (users.indexOf(user.login) === -1) {
        const arrUsers = JSON.parse(users);
        arrUsers.push(JSON.stringify(user));
        const body = JSON.stringify(arrUsers);
        const options = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: body,
        };
        httpTransport.post('${host}user.json', options);
        return true;
    } 
    else
        return false;
}

function postFile(form:HTMLFormElement) {
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
