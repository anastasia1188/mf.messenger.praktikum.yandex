const host = 'https://ya-praktikum.tech/api/v2';
export function isAutorizied(user) {
  return fetch(`${host}/auth/signin`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  }).then((response) => response.text()) // Можно вытащить через .json()
    .then((data) => {
      console.log(data);
      return data;
    });
}
export function isRegistrationSuccess(user) {
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
      login: window.login,
      email: user.email,
      phone: '+79194234578',
      password: user.password,
    }),
  })
    .then((response) => response.text()) // Можно вытащить через .json()
    .then((data) => {
      console.log(data);
      return data;
    });
}
export function saveUserData(user) {
  console.log(user);
  return fetch(`${host}/user/profile`, {
    method: 'PUT',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  }).then((response) => response.text()) // Можно вытащить через .json()
    .then((data) => {
      console.log(data);
      return data;
    });
}
export async function getUserData() {
  const response = await fetch(`${host}/auth/user`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
  const result = response.json();
  console.log('result', result);
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
export async function addChatToList(chat) {
  try {
    const response = await fetch(`${host}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(chat),
    });
    if (response.status === 200) { return true; }
    return false;
  } catch (err) {
    return false;
  }
}
export async function deleteChatFromList(chat) {
  try {
    const response = await fetch('/chats', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(chat),
    });
    if (response.status === 200) { return true; }
    return false;
  } catch (err) {
    return false;
  }
}
