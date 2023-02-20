export default async function submit(ev) {
    ev.preventDefault();
    let formData = new FormData(ev.target);
    let object = {};
    formData.forEach((value, key) => object[key] = value);
    let json = JSON.stringify(object);
    return await fetch(ev.target.action, {
        method: ev.target.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    });
}
