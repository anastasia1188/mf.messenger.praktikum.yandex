export function autorisation(user) {
    //const host = 'http://mf.messenger.praktikum.yandex';
    const host = 'https://amazing-turing-810a80.netlify.app/';
    fetch(`${host}/data/users.json`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: user.name,
            login: user.login,
            email: user.email,
            password: user.password,
        }),
    }).then(response => response.text())
        .then(data => {
        return data;
    })
        .then(data => {
        fetch(`${host}/data/users.json`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
            .then(r => r.json())
            .then(data => {
            if (data != undefined) {
                for (let i = 0; i < data.length; i++) {
                    if ((data[i].login === user.login) && (data[i].password === user.password)) {
                        user.result = true;
                    }
                }
            }
        });
    });
}
export async function registration(user) {
    //const host = 'http://mf.messenger.praktikum.yandex';
    const host = 'https://amazing-turing-810a80.netlify.app/';
    let res = await fetch(`${host}/data/users.json`);
    let resJSON = await res.json();
    if (resJSON.indexOf(user.login) === -1) {
        user.result = true;
        resJSON.push(JSON.stringify(user));
        let body = JSON.stringify(resJSON);
        fetch(`${host}/data/users.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: body
        });
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
