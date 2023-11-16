
const formulario = document.querySelector(".form")
const url = `http://localhost:3000/api/admin/login`

formulario.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const postData = {};

    for (let element of formulario.elements) {
        if (element.name.length > 0)
            postData[element.name] = element.value
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    };

    await fetch(url, requestOptions)
        .then(resp => resp.json())
        .then(({ msg, token }) => {
            if (msg) {
                return console.log(msg);
            }
            localStorage.setItem('x-token', token);
            window.location.href = 'http://localhost:3000/panelcontrol';
        })
        .catch(err => {
            console.log(err)
        })
})