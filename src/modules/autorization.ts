import HTTPTransport from "../../dist/modules/httpTransport.js";

interface User {
    login: string;
    password: string;
}

interface User {
    login: string,
    password: string
}

export async function isAutorizied(user: User) {

    let result = false;

    let response = await fetch('/auth/signin',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        }
    );

    if (response.status === 200)
        result = true;

    return result;
}

export async function isRegistrationSuccess(user: User) {
    try {
        let response = await fetch('/auth/signup',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            }
        )
        if (response.status === 200)
            return true
        else
            return false;
    }
    catch (err) {
        return false;
    };
}

export async function saveUserData(user: User) {
    try {
        let response = await fetch('/user/profile',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            }
        )
        if (response.status === 200)
            return true
        else
            return false;
    }
    catch (err) {
        return false;
    };
}

export async function getUserData() {
    const response = await fetch('/auth/user');
    const result = response.json();
    return result;
}

export async function getChats() {
    const response = await fetch('/chats');
    const result = response.json();
    return result;
}

export async function getMessages() {
    const response = await fetch('/messages');
    const result = response.json();
    return result;
}

export async function addChatToList(chat: Object)
{
    try {
        let response = await fetch('/chats',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(chat)
            }
        )
        if (response.status === 200)
            return true
        else
            return false;
    }
    catch (err) {
        return false;
    };
}

export async function deleteChatFromList(chat: Object)
{
    try {
        let response = await fetch('/chats',
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(chat)
            }
        )
        if (response.status === 200)
            return true
        else
            return false;
    }
    catch (err) {
        return false;
    };
}


function postFile(form: HTMLFormElement) {
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
