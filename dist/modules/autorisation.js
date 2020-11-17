import HTTPTransport from "../../dist/modules/httpTransport.js";
export async function isAutorizied(user) {
    const data = await getUsers();
    const users = JSON.parse(data.responseText);
    for (let i = 0; i < users.length; i++) {
        if ((users[i].login === user.login) && (users[i].password === user.password)) {
            return true;
        }
    }
    return false;
}
async function getUsers() {
    const host = 'http://mf.messenger.praktikum.yandex';
    //const host =  'https://amazing-turing-810a80.netlify.app/'
    const httpTransport = new HTTPTransport;
    const res = await httpTransport.get(`${host}/data/users.json`);
    return res;
}
export async function isRegistrationSuccess(user) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3Jpc2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZHVsZXMvYXV0b3Jpc2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLHFDQUFxQyxDQUFDO0FBWWhFLE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWSxDQUFDLElBQVU7SUFDekMsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLEVBQUUsQ0FBQztJQUM5QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUU1QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMxRSxPQUFPLElBQUksQ0FBQztTQUNmO0tBQ0o7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQsS0FBSyxVQUFVLFFBQVE7SUFFbkIsTUFBTSxJQUFJLEdBQUcsc0NBQXNDLENBQUM7SUFDcEQsNERBQTREO0lBQzVELE1BQU0sYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDO0lBQ3hDLE1BQU0sR0FBRyxHQUFHLE1BQU0sYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksa0JBQWtCLENBQUMsQ0FBQztJQUMvRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLHFCQUFxQixDQUFDLElBQVU7SUFDbEQsTUFBTSxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUM7SUFDeEMsTUFBTSxJQUFJLEdBQUcsc0NBQXNDLENBQUM7SUFDcEQsNERBQTREO0lBRTVELE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxFQUFFLENBQUM7SUFDOUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUVoQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2xDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxNQUFNLE9BQU8sR0FBRztZQUNaLE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUUsZ0NBQWdDO2FBQ25EO1lBQ0QsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO1FBQ0YsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQztLQUNmOztRQUVHLE9BQU8sS0FBSyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBQyxJQUFvQjtJQUNsQyxNQUFNLElBQUksR0FBRyxzQ0FBc0MsQ0FBQztJQUNwRCxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVwQyxLQUFLLENBQUMsR0FBRyxJQUFJLGFBQWEsRUFBRTtRQUN4QixNQUFNLEVBQUUsS0FBSztRQUNiLFdBQVcsRUFBRSxTQUFTO1FBQ3RCLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLFFBQVE7S0FDakIsQ0FBQztTQUNHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDVCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUMsQ0FBQztBQUNYLENBQUMifQ==