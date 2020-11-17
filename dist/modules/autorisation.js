import { HTTPTransport } from "../../dist/modules/httpTransport.js";
export async function autorisation(user) {
    const host = 'http://mf.messenger.praktikum.yandex';
    //const host =  'https://amazing-turing-810a80.netlify.app/'
    const httpTransport = new HTTPTransport;
    const res = await httpTransport.get(`${host}/data/users.json`);
    const data = JSON.parse(res.responseText);
    for (let i = 0; i < data.length; i++) {
        if ((data[i].login === user.login) && (data[i].password === user.password)) {
            //user.result = true;
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
        //user.result = true;
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
    /*else
        user.result = false;*/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b3Jpc2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZHVsZXMvYXV0b3Jpc2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQU9sRSxNQUFNLENBQUMsS0FBSyxVQUFVLFlBQVksQ0FBQyxJQUFVO0lBQ3pDLE1BQU0sSUFBSSxHQUFHLHNDQUFzQyxDQUFDO0lBQ3BELDREQUE0RDtJQUU1RCxNQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQztJQUN4QyxNQUFNLEdBQUcsR0FBRyxNQUFNLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLGtCQUFrQixDQUFDLENBQUM7SUFDL0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEUscUJBQXFCO1NBQ3hCO0tBQ0o7QUFDTCxDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxZQUFZLENBQUMsSUFBVTtJQUN6QyxNQUFNLElBQUksR0FBRyxzQ0FBc0MsQ0FBQztJQUNwRCw0REFBNEQ7SUFFNUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUM7SUFFeEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hFLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFDakMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNwQyxxQkFBcUI7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxNQUFNLE9BQU8sR0FBRztZQUNaLE9BQU8sRUFBRTtnQkFDTCxjQUFjLEVBQUUsZ0NBQWdDO2FBQ25EO1lBQ0QsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO1FBQ0YsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDNUM7SUFDRDs4QkFDMEI7QUFDOUIsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFDLElBQW9CO0lBQ2xDLE1BQU0sSUFBSSxHQUFHLHNDQUFzQyxDQUFDO0lBQ3BELE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXBDLEtBQUssQ0FBQyxHQUFHLElBQUksYUFBYSxFQUFFO1FBQ3hCLE1BQU0sRUFBRSxLQUFLO1FBQ2IsV0FBVyxFQUFFLFNBQVM7UUFDdEIsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsUUFBUTtLQUNqQixDQUFDO1NBQ0csSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNULE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyJ9