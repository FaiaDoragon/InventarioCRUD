const buttonListar = document.getElementById('listar');
const buttonFormCrear = document.getElementById('crear');
const buttonEditar = document.getElementById('editar');
const buttonBorrar = document.getElementById('borrar');
const buttonEliminar = document.getElementById('eliminar');

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
                'x-token': token,
            }
        })
            .then(resp => resp.json())
            .then(({ msg, producto }) => {
                if (msg) {
                    const mensaje = document.createElement('div');
                    mensaje.innerHTML = `<h3>${msg}</h3>`

                    document.body.appendChild(mensaje)
                }
                const formularioEditar = document.createElement('div');
                formularioEditar.innerHTML = `
                <form action="" id="miFormularioEditar">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="NOMBRE" placeholder='${producto.NOMBRE}' >     
                <label for="marca">Marca:</label>
                <input type="text" id="marca" name="MARCA" placeholder='${producto.MARCA}' >                   
                <label for="img">Imagen:</label>
                <input type="text" id="img" name="IMG" placeholder='${producto.IMG}' >                  
                <label for="precio">Precio:</label>
                <input type="number" id="precio" name="PRECIO" placeholder='${producto.PRECIO}' step="0.01">                  
                <label for="stock">Stock:</label>
                <input type="number" id="stock" name="STOCK" placeholder='${producto.STOCK}' >                
                <label for="talla">Talla:</label>
                <input type="text" id="talla" name="TALLA" placeholder='${producto.TALLA}' >                            
                <label for="color">Color:</label>
                <input type="text" id="color" name="COLOR" placeholder='${producto.COLOR}' >                
                <button type="submit" id="superbutton">Enviar</button>
                </form>
            `
                document.body.appendChild(formularioEditar);

                const miFormularioEditar = document.getElementById('miFormularioEditar')
                miFormularioEditar.addEventListener('submit', (ev) => {
                    ev.preventDefault();

                    const datos = Object.fromEntries(
                        new FormData(ev.target)
                    )

                    for ( let key in datos) {
                        if (datos[key] === '') {
                            datos[key] = undefined;
                        }
                    }

                    fetch(url + id, {
                        method: 'PUT',
                        headers: {
                            'x-token': token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datos)
                    })
                        .then(resp => resp.json())
                        .then(({ msg, producto }) => {
                            if (msg) {
                                const avisoUpdated = document.createElement('div');
                                avisoUpdated.innerHTML = `<h2>${msg}</h2>`
                                document.body.appendChild(avisoUpdated);
                            }

                            const productoEditado = document.createElement('table')
                            productoEditado.innerHTML = `
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
                            `
                            document.body.appendChild(productoEditado)
                            
                        })
                })
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

buttonEliminar.addEventListener('click', ev => {
    const token = localStorage.getItem('x-token');

    if (!token) {
        window.location.href = 'http://localhost:3000'
        throw new Error('No hay token valido en el servidor')
    }

    const barraBusqueda = document.createElement('div')
    barraBusqueda.innerHTML = `
    <input type="text" id="productoID" placeholder='introdusca ID' /><button id="searcheliminar">buscar</button>
    `
    document.body.appendChild(barraBusqueda)

    const buttonFormEliminar = document.getElementById('searcheliminar');

    buttonFormEliminar.addEventListener('click', (ev) => {
        ev.preventDefault()

        const id = document.getElementById('productoID').value;

        const token = localStorage.getItem('x-token')

        fetch(url + '/d/' + id, {
            method: 'DELETE',
            headers: {
                'x-token': token
            }
        })
            .then(resp => resp.json())
            .then(({ msg }) => {
                if (msg) {
                    const avisoDelete = document.createElement('div');
                    avisoDelete.innerHTML = `<h2>${msg}</h2>`
                    document.body.appendChild(avisoDelete);
                }
            })
            .catch(err => {
                console.log(err)
            })
    })
})