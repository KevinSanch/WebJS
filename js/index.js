console.log('OK');

//Ejecución después de terminar de cargar DOM
document.addEventListener('DOMContentLoaded', () => {
  //Lista de productos
  let carrito = [];
  let listProducts = [
    {
      id: '101',
      name: 'Motorola Moto E15',
      price: 159050,
      img: '/images/celular1.webp',
      alt: 'Un celular, modelo Moto E15 de la marca Motorola',
    },
    {
      id: '102',
      name: 'Xiaomi Redmi 13',
      price: 203140,
      img: '/images/celular2.webp',
      alt: 'Un celular, modelo Redmi 13 de la marca Xiaomi',
    },
    {
      id: '103',
      name: 'Samsung Galaxy A56 5G',
      price: 605642,
      img: '/images/celular3.webp',
      alt: 'Un celular, modelo Galaxy A56 5G de la marca Samsung',
    },
    {
      id: '104',
      name: 'Apple iPhone 16 Pro',
      price: 1420651,
      img: '/images/celular4.webp',
      alt: 'Un celular, modelo iPhone 16 Pro de la marca Apple',
    },
    {
      id: '201',
      name: "Notebook Acer A314 36P 3772 I3 N305 128GB 8GB 14'",
      price: 529480,
      img: '/images/notebook1.webp',
      alt: 'Una notebook, modelo Acer A314 de la marca Acer',
    },
    {
      id: '202',
      name: "Notebook ASUS E410KA-PM464 N6000 4GB/64GB/14'",
      price: 280716,
      img: '/images/notebook1.webp',
      alt: 'Una notebook, modelo E410KA-PM464 de la marca ASUS',
    },
    {
      id: '301',
      name: 'Auricular JBL IN-EAR Bluetooth Tune 710BT',
      price: 91423,
      img: '/images/auricular1.webp',
      alt: 'Un auricular, modelo IN-EAR Bluetooth Tune 710BT de la marca JBL',
    },
    {
      id: '302',
      name: 'Auricular JBL Wave Beam 2 Bluetooth con Microfone',
      price: 80972,
      img: '/images/auricular2.webp',
      alt: 'Un auricular, modelo Wave Beam 2 Bluetooth de la marca JBL',
    },
  ];

  //Función para ordenar productos
  function compararProductosPorID(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }

  listProducts.sort(compararProductosPorID);

  //Función para cargar productos al conteiner
  function cargarProductos() {
    const allProducts = document.querySelector('.conteinerCardSectionProducts');

    if (!allProducts) {
      console.error(
        "Error: No se encontró el contenedor con la clase 'productos'."
      );
      return;
    }

    for (let i = 0; i < listProducts.length; i++) {
      let card = document.createElement('div');
      card.classList.add('cardSectionProducts');

      let imgSection = document.createElement('div');
      imgSection.classList.add('imgSectionProducts');

      let img = document.createElement('img');
      img.src = listProducts[i].img;
      img.alt = listProducts[i].alt;

      let textSection = document.createElement('div');
      textSection.classList.add('textSectionProducts');

      let tittleSection = document.createElement('span');
      tittleSection.classList.add('titleSectionProducts');
      tittleSection.textContent = listProducts[i].name;

      let priceSection = document.createElement('span');
      priceSection.classList.add('priceSectionProducts');
      priceSection.textContent =
        '$' + listProducts[i].price.toLocaleString('es-AR');

      let buttonSection = document.createElement('div');
      buttonSection.classList.add('buttonSectionProducts');
      let button = document.createElement('button');
      button.classList.add('btnAgregarCarrito');
      button.textContent = 'Agregar al carrito';
      button.dataset.id = listProducts[i].id;

      buttonSection.appendChild(button);

      textSection.appendChild(tittleSection);
      textSection.appendChild(priceSection);

      imgSection.appendChild(img);

      card.appendChild(imgSection);
      card.appendChild(textSection);
      card.appendChild(buttonSection);

      allProducts.appendChild(card);
    }
  }

  function manejarClicComprar(e) {
    if (e.target.classList.contains('btnAgregarCarrito')) {
      const productId = e.target.dataset.id;
      agregarProductoAlCarrito(productId);
    }
  }

  function agregarProductoAlCarrito(idProducto) {
    let productoEnCarrito = carrito.find((item) => item.id === idProducto);

    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {
      let productoOriginal = listProducts.find(
        (item) => item.id === idProducto
      );
      if (productoOriginal) {
        carrito.push({ ...productoOriginal, cantidad: 1 });
      }
    }
    actualizarCarritoHTML();
  }

  function manejarClicCarrito(evento) {
    const target = evento.target;

    if (
      target.classList.contains('btn-cantidad') ||
      target.classList.contains('btn-eliminar')
    ) {
      const productoId = target.dataset.id;
      const accion = target.dataset.action;

      if (accion === 'eliminar') {
        eliminarProductoDelCarrito(productoId);
      } else if (accion === 'restar') {
        restarCantidadProducto(productoId);
      } else if (accion === 'sumar') {
        sumarCantidadProducto(productoId);
      }
    }
  }

  function actualizarCarritoHTML() {
    const carritoCompras = document.querySelector('.cardDivCart');

    if (!carritoCompras) {
      console.error(
        "Error: No se encontró el contenedor con la clase 'cardDivCart'."
      );
      return;
    }

    carritoCompras.textContent = ''; // limpiar antes

    const titulo = document.createElement('span');
    titulo.classList.add('titleCart');
    titulo.textContent = 'Tu Carrito de Compras';
    carritoCompras.appendChild(titulo);

    const listaCarrito = document.createElement('ul');
    listaCarrito.classList.add('listCart');
    carritoCompras.appendChild(listaCarrito);

    const totalCarrito = document.createElement('p');
    totalCarrito.classList.add('allCart');

    const cantidadCarrito = document.createElement('p');
    cantidadCarrito.classList.add('amountCart');

    carritoCompras.appendChild(totalCarrito);
    carritoCompras.appendChild(cantidadCarrito);

    let totalPagar = 0;
    let cantidadProductosUnicos = 0;

    if (carrito.length === 0) {
      const carritoVacio = document.createElement('p');
      carritoVacio.textContent = 'El carrito está vacío.';
      listaCarrito.appendChild(carritoVacio);
    } else {
      carrito.forEach((item) => {
        const li = document.createElement('li');

        const spanInfo = document.createElement('span');
        spanInfo.textContent = `${item.name} - $${item.price} x ${item.cantidad}`;
        li.appendChild(spanInfo);

        const contBotones = document.createElement('div');
        contBotones.classList.add('conteinerBtn');

        const btnRestar = document.createElement('button');
        btnRestar.textContent = '-';
        btnRestar.classList.add('btn-cantidad');
        btnRestar.dataset.id = item.id;
        btnRestar.dataset.action = 'restar';
        contBotones.appendChild(btnRestar);

        const btnSumar = document.createElement('button');
        btnSumar.textContent = '+';
        btnSumar.classList.add('btn-cantidad');
        btnSumar.dataset.id = item.id;
        btnSumar.dataset.action = 'sumar';
        contBotones.appendChild(btnSumar);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'x';
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.dataset.id = item.id;
        btnEliminar.dataset.action = 'eliminar';
        contBotones.appendChild(btnEliminar);

        li.appendChild(contBotones);
        listaCarrito.appendChild(li);

        totalPagar += item.price * item.cantidad;
        cantidadProductosUnicos++;
      });
    }

    totalCarrito.textContent = `Total a pagar: $${totalPagar.toLocaleString(
      'es-AR'
    )}`;
    cantidadCarrito.textContent = `Productos en carrito: ${cantidadProductosUnicos}`;
  }

  function sumarCantidadProducto(idProducto) {
    let prod = carrito.find((item) => item.id === idProducto);
    if (prod) {
      prod.cantidad++;
      actualizarCarritoHTML();
    }
  }

  function restarCantidadProducto(idProducto) {
    let prod = carrito.find((item) => item.id === idProducto);
    if (prod) {
      prod.cantidad--;
      if (prod.cantidad <= 0) {
        eliminarProductoDelCarrito(idProducto);
      } else {
        actualizarCarritoHTML();
      }
    }
  }

  function eliminarProductoDelCarrito(idProducto) {
    carrito = carrito.filter((item) => item.id !== idProducto);
    actualizarCarritoHTML();
  }

  // Cargar productos y carrito
  cargarProductos();
  actualizarCarritoHTML();

  // listeners
  document
    .querySelector('.conteinerCardSectionProducts')
    .addEventListener('click', manejarClicComprar);

  document
    .querySelector('.cardDivCart')
    .addEventListener('click', manejarClicCarrito);
});
