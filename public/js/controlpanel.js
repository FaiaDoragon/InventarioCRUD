const buttonListar = document.getElementById('listar');
const buttonFormCrear = document.getElementById('crear');
const buttonEditar = document.getElementById('editar');
const buttonBorrar = document.getElementById('borrar');

const url = `http://localhost:3000/api/admin/productos/`

buttonListar.addEventListener('click', ev => {
    const token = localStorage.getItem('x-token');
    if (!token) {
        window.location.href = 'http://localhost:3000'
        throw new Error('No hay token valido en el servidor')
    }
    fetch(url, {
        headers: {
            'x-token': token
        }
    })
        .then(resp => resp.json())
        .then(({ msg, productos }) => {
            if (msg) {
                console.log(msg);
            }
            const tablaProductos = document.createElement('table');
            tablaProductos.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>ESTADO</th>
                    <th>MARCA</th>
                    <th>PRECIO</th>
                    <th>STOCK</th>
                    <th>TALLA</th>
                    <th>COLOR</th>
                    <th>CREATED_AT</th>
                    <th>UPDATED_AT</th>
                </tr>
            </thead>
            <tbody>
                ${productos.map((producto) => `
                    <tr>
                        <td>${producto.ID}</td>
                        <td>${producto.NOMBRE}</td>
                        <td>${producto.ESTADO}</td>
                        <td>${producto.MARCA}</td>
                        <td>${producto.PRECIO}</td>
                        <td>${producto.STOCK}</td>
                        <td>${producto.TALLA}</td>
                        <td>${producto.COLOR}</td>
                        <td>${producto.createdAt}</td>
                        <td>${producto.updatedAt}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;

            // Añadir la tabla al cuerpo del documento (o a otro elemento según tus necesidades)
            document.body.appendChild(tablaProductos);
        })
        .catch(err => {
            console.log(err)
        })
})

buttonFormCrear.addEventListener('click', (ev) => {
    ev.preventDefault()
    const token = localStorage.getItem('x-token');

    if (!token) {
        window.location.href = 'http://localhost:3000'
        throw new Error('No hay token valido en el servidor')
    }

    const formularioCrear = document.createElement('div');
    formularioCrear.innerHTML = `
            <form id="miFormulario">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required />
                <label for="marca">Marca:</label>
                <input type="text" id="marca" name="marca" required />
                <label for="img">Imagen:</label>
                <input type="text" id="img" name="img" />
                <label for="precio">Precio:</label>
                <input type="number" id="precio" name="precio" step="0.01"/>
                <label for="stock">Stock:</label>
                <input type="number" id="stock" name="stock" />
                <label for="talla">Talla:</label>
                <input type="text" id="talla" name="talla" />
                <label for="color">Color:</label>
                <input type="text" id="color" name="color" required />
                <button type="submit" id="enviardata">Enviar</button>
            </form>
            `
    document.body.appendChild(formularioCrear);

    const enviarCrear = document.getElementById("miFormulario");

    enviarCrear.addEventListener('submit', (ev) => {
        ev.preventDefault()

        const token = localStorage.getItem('x-token');
        const datos = Object.fromEntries(
            new FormData(ev.target)
        )

        fetch(url, {
            method: 'POST',
            headers: {
                'x-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
            .then(resp => resp.json())
            .then(({ msg, producto }) => {
                if (msg) {
                    console.log(msg);
                }
                const productoCreado = document.createElement('table');
                productoCreado.innerHTML = `
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>ESTADO</th>
                        <th>MARCA</th>
                        <th>PRECIO</th>
                        <th>STOCK</th>
                        <th>TALLA</th>
                        <th>COLOR</th>
                        <th>CREATED_AT</th>
                        <th>UPDATED_AT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${producto.ID}</td>
                        <td>${producto.NOMBRE}</td>
                        <td>${producto.ESTADO}</td>
                        <td>${producto.MARCA}</td>
                        <td>${producto.PRECIO}</td>
                        <td>${producto.STOCK}</td>
                        <td>${producto.TALLA}</td>
                        <td>${producto.COLOR}</td>
                        <td>${producto.createdAt}</td>
                        <td>${producto.updatedAt}</td>
                    </tr>
                </tbody>
            `;
                document.body.appendChild(productoCreado);

            })
            .catch(err => {
                console.log(err)
            })
    })

})

buttonEditar.addEventListener('click', ev => {
    const token = localStorage.getItem('x-token');


    if (!token) {
        window.location.href = 'http://localhost:3000'
        throw new Error('No hay token valido en el servidor')
    }

    const barraBusqueda = document.createElement('div')
    barraBusqueda.innerHTML = `
    <input type="text" id="productoID" placeholder='introdusca ID' /><button id="searcheditar">buscar</button>
    `
    document.body.appendChild(barraBusqueda)

    const buttonFormEditar = document.getElementById('searcheditar');

    buttonFormEditar.addEventListener('click', ev => {
        ev.preventDefault();

        const id = document.getElementById('productoID').value;

        const token = localStorage.getItem('x-token');

        fetch(url + id, {
            headers: {
                'x-token': token
            }
        })
            .then(resp => resp.json())
            .then(({ msg, producto }) => {
                if (msg) {
                    const mensaje = document.createElement('div');
                    mensaje.innerHTML = `<h3>${msg}</h3>`

                    document.body.appendChild(mensaje)
                }
                const formularioCrear = document.createElement('table');
                formularioCrear.innerHTML = `
        <form action="">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" placeholder='${producto.NOMBRE}' required>

        <label for="marca">Marca:</label>
        <input type="text" id="marca" name="marca" placeholder='${producto.MARCA}' required>

        <label for="img">Imagen:</label>
        <input type="url" id="img" name="img" placeholder='${producto.IMG}' >

        <label for="precio">Precio:</label>
        <input type="number" id="precio" name="precio" placeholder='${producto.PRECIO}' >

        <label for="stock">Stock:</label>
        <input type="number" id="stock" name="stock" placeholder='${producto.STOCK}' >

        <label for="talla">Talla:</label>
        <input type="text" id="talla" name="talla" placeholder='${producto.TALLA}' >


        <label for="color">Color:</label>
        <input type="text" id="color" name="color" placeholder='${producto.COLOR}' required>

        <button type="submit">Enviar</button>
        </form>
            `
                document.body.appendChild(formularioCrear);

            })
            .catch(err => {
                console.log(err)
            })
    })

})

buttonBorrar.addEventListener('click', ev => {
    const token = localStorage.getItem('x-token');

    if (!token) {
        window.location.href = 'http://localhost:3000'
        throw new Error('No hay token valido en el servidor')
    }

    const barraBusqueda = document.createElement('div')
    barraBusqueda.innerHTML = `
    <input type="text" id="productoID" placeholder='introdusca ID' /><button id="searchborrar">buscar</button>
    `
    document.body.appendChild(barraBusqueda)

    const buttonFormBorrar = document.getElementById('searchborrar');

    buttonFormBorrar.addEventListener('click', (ev) => {
        ev.preventDefault()

        const id = document.getElementById('productoID').value;

        const token = localStorage.getItem('x-token')

        fetch(url + id, {
            method: 'DELETE',
            headers: {
                'x-token': token
            }
        })
            .then(resp => resp.json())
            .then(({ msg, producto }) => {
                if (msg) {
                    const avisoDelete = document.createElement('div');
                    avisoDelete.innerHTML = `<h2>${msg}</h2>`
                    document.body.appendChild(avisoDelete);
                }
                const productoBorrar = document.createElement('table');
                productoBorrar.innerHTML = `
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>ESTADO</th>
                        <th>MARCA</th>
                        <th>PRECIO</th>
                        <th>STOCK</th>
                        <th>TALLA</th>
                        <th>COLOR</th>
                        <th>CREATED_AT</th>
                        <th>UPDATED_AT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${producto.ID}</td>
                        <td>${producto.NOMBRE}</td>
                        <td>${producto.ESTADO}</td>
                        <td>${producto.MARCA}</td>
                        <td>${producto.PRECIO}</td>
                        <td>${producto.STOCK}</td>
                        <td>${producto.TALLA}</td>
                        <td>${producto.COLOR}</td>
                        <td>${producto.createdAt}</td>
                        <td>${producto.updatedAt}</td>
                    </tr>
                </tbody>
            `;
                document.body.appendChild(productoBorrar);

            })
            .catch(err => {
                console.log(err)
            })
    })
})