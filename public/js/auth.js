
const formulario = document.getElementById('init')
const url = `http://localhost:3000/api/admin/productos`

init.addEventListener('submit', () => {
    event.preventDefault();
    fetch(url)

    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error en la solicitud:', error));
})