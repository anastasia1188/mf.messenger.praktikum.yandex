import HTTPTransport from "../../dist/modules/httpTransport";

interface User {
    email: string;
    name: string;
    login: string;
    password: string;
}

const host = 'https://ya-praktikum.tech/api/v2';

export function isAutorizied(user: User|ObjectInterface) {
    return fetch(`${host}/auth/signin`,
        {
            method: 'POST',
            credentials: 'include',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        }
    ).then(response => response.text()) // Можно вытащить через .json()
    .then(data => {
      console.log(data);
      return data;
    });
}

export function isRegistrationSuccess(user: User|ObjectInterface) {
    return fetch(`${host}/auth/signup`, {
        method: 'POST',
        credentials: 'include', 
        mode: 'cors', 
        headers: {
            'content-type': 'application/json', 
        },
        body: JSON.stringify({
            first_name: user.name,
            second_name: user.name,
            login: (<any>window).login,
            email: user.email,
            phone: "+79194234578",
            password: user.password
        }),
    })
      .then(response => response.text()) // Можно вытащить через .json()
      .then(data => {
        console.log(data);
        return data;
      });
}

export function saveUserData(user: Object) {

    return fetch(`${host}/user/profile`,
        {
            method: 'PUT',
            credentials: 'include', // Нужно подставлять куки
            mode: 'cors', // Работаем с CORS
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        }
    ).then(response => response.text()) // Можно вытащить через .json()
    .then(data => {
      console.log(data);
      return data;
    });
}

export async function getUserData() {

    const response = await fetch(`${host}/auth/user`,
     {
        method: 'GET',
        credentials: 'include', // Нужно подставлять куки
        mode: 'cors', // Работаем с CORS
        headers: {
        'Content-Type': 'application/json;charset=utf-8'}
        });

    const result = response.json();
    console.log('result', result);
    return result;
}

export async function getChats() {
    const response = await fetch(`/chats`);
    const result = response.json();
    return result;
}

export async function getMessages() {
    const response = await fetch(`/messages`);
    const result = response.json();
    return result;
}

export async function addChatToList(chat: Object) {
    try {
        let response = await fetch(`${host}/chats`,
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

export async function deleteChatFromList(chat: Object) {
    try {
        let response = await fetch(`/chats`,
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

// TODO 
export function addUsertoChat(user: Object) {
    return fetch(`${host}/chat/users`,
        {
            method: 'PUT',
            credentials: 'include', 
            mode: 'cors', 
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        }
    ).then(response => response.text()) 
    .then(data => {
      console.log(data);
      return data;
    });
}

export function deleteUserFromChat(user: Object) {
    console.log(user);
    return fetch(`${host}/chats/users`,
        {
            method: 'DELETE',
            credentials: 'include', 
            mode: 'cors', 
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        }
    ).then(response => response.text()) 
    .then(data => {
      console.log(data);
      return data;
    });
}

export function logout() {
    return fetch(`${host}/auth/logout`,
        {
            method: 'POST',
            credentials: 'include',
            mode: 'cors', 
            headers: {
               'Content-Type': 'application/json;charset=utf-8'
            }
        }
    ).then(response => response.text()) 
    .then(data => {
      console.log(data);
      return data;
    });
}
