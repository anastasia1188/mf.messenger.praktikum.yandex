export async function isAutorizied(user) {
    let result = false;
    let response = await fetch('/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });
    if (response.status === 200)
        result = true;
    return result;
}
export async function isRegistrationSuccess(user) {
    try {
        let response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        if (response.status === 200)
            return true;
        else
            return false;
    }
    catch (err) {
        return false;
    }
    ;
}
export async function saveUserData(user) {
    try {
        let response = await fetch('/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        if (response.status === 200)
            return true;
        else
            return false;
    }
    catch (err) {
        return false;
    }
    ;
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
export async function addChatToList(chat) {
    try {
        let response = await fetch('/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(chat)
        });
        if (response.status === 200)
            return true;
        else
            return false;
    }
    catch (err) {
        return false;
    }
    ;
}
export async function deleteChatFromList(chat) {
    try {
        let response = await fetch('/chats', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(chat)
        });
        if (response.status === 200)
            return true;
        else
            return false;
    }
    catch (err) {
        return false;
    }
    ;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3JpemF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZHVsZXMvYXV0b3JpemF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVlBLE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWSxDQUFDLElBQVU7SUFFekMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBRW5CLElBQUksUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLGNBQWMsRUFDckM7UUFDSSxNQUFNLEVBQUUsTUFBTTtRQUNkLE9BQU8sRUFBRTtZQUNMLGNBQWMsRUFBRSxnQ0FBZ0M7U0FDbkQ7UUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7S0FDN0IsQ0FDSixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUc7UUFDdkIsTUFBTSxHQUFHLElBQUksQ0FBQztJQUVsQixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxxQkFBcUIsQ0FBQyxJQUFVO0lBQ2xELElBQUk7UUFDQSxJQUFJLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxjQUFjLEVBQ3JDO1lBQ0ksTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUU7Z0JBQ0wsY0FBYyxFQUFFLGdDQUFnQzthQUNuRDtZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztTQUM3QixDQUNKLENBQUE7UUFDRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRztZQUN2QixPQUFPLElBQUksQ0FBQTs7WUFFWCxPQUFPLEtBQUssQ0FBQztLQUNwQjtJQUNELE9BQU8sR0FBRyxFQUFFO1FBQ1IsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFBQSxDQUFDO0FBQ04sQ0FBQztBQUVELE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWSxDQUFDLElBQVU7SUFDekMsSUFBSTtRQUNBLElBQUksUUFBUSxH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