const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__image__content ", {
  duration: 1000,
  delay: 1500,
});

ScrollReveal().reveal(".product__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".product__card", {
  ...scrollRevealOption,
  delay: 500,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centerSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    depth: 250,
    modifier: 1,
    scale: 0.75,
    slideShadows: false,
    stretch: -100,
  },

  pagination: {
    el: ".swiper-pagination",
  },
});






function openModal(element) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  modal.style.display = "block";
  modalImg.src = element.src;
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = "none";
}

// Añadir evento click a todas las imágenes del slider
document.querySelectorAll('.store__card img').forEach(img => {
  img.addEventListener('click', function() {
    openModal(this);
  });
});


//CODIGO PARA EL MODAL DE COMPRA Y PREGUNTA

function openUniqueModal(buttonType) {
  const modal = document.getElementById('unique-modal');
  const modalContent = modal.querySelector('.unique-modal-content');
  
  // Limpiar contenido anterior
  modalContent.innerHTML = '';
  
  // Añadir elementos comunes
  modalContent.innerHTML = `
    <span class="unique-close" onclick="closeUniqueModal()">&times;</span>
    <img src="./assets/whatsapp_logo.png" class="unique-whatsapp-logo" alt="">
    <h2 class="unique-vendedor-estilos">Vendedor Oficial</h2>
    <p class="unique-nombre-de-vendedor-estilos">Luis Viña 🏆</p>
  `;

  if (buttonType === 'Agregar al Carrito') {
    modalContent.innerHTML += `
      <label for="cantidad">Su Cantidad a Ordenar:</label>
      <input type="number" id="cantidad" min="1" value="1" class="cantidad-input">
      <button class="unique-btn unique-boton-modal agregar-carrito" onclick="agregarAlCarrito()">¡Efectuar Orden!</button>
    `;
    modalContent.style.height = '43%';
    
    // Agregar el margin-bottom a la clase
    const vendedorNombre = modalContent.querySelector('.unique-nombre-de-vendedor-estilos');
    if (vendedorNombre) {
        vendedorNombre.style.marginBottom = '6%';
    }
} else if (buttonType === 'Ofertar') {
    modalContent.innerHTML += `
      <button class="unique-btn unique-boton-modal" onclick="openWhatsApp()">Ofertar</button>
    `;
  } else if (buttonType === 'Haz tu Pregunta') {
    modalContent.innerHTML += `
      <button class="unique-btn unique-boton-modal" onclick="enviarPregunta()">Haz tu Pregunta</button>
    `;
  }

  modal.style.display = "block";
}

function agregarAlCarrito() {
  const cantidad = document.getElementById('cantidad').value;
  alert(`Se han agregado ${cantidad} artículos al carrito`);
  closeUniqueModal();
}

function agregarAlCarrito() {
  const cantidad = document.getElementById('cantidad').value;
  // Aquí puedes agregar la lógica para añadir al carrito
  alert(`Se han agregado ${cantidad} artículos al carrito`);
  closeUniqueModal();
}
function closeUniqueModal() {
  document.getElementById('unique-modal').style.display = "none";
}
function hacerPedidoUnique() {
  window.open("https://wa.me/584125005026", "_blank");
  closeUniqueModal();
}

// Añade la función después de las funciones existentes en main.js
function openWhatsApp() {
  const numeroTelefono = "584125005026";
  const mensaje = "Hola Luis, estoy interesado en ordenar un 4K UHD Resolution: The HY300 Smart Projector. Me gustaría saber cuál es el siguiente paso.";
  const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}


function agregarAlCarrito() {
  const numeroTelefono = "584125005026";
  const cantidad = document.getElementById('cantidad').value || 1; // Obtiene la cantidad, por defecto 1
  const mensaje = `Hola Luis, estoy interesado en ordenar ${cantidad} unidades del 4K UHD Resolution: The HY300 Smart Projector. Me gustaría saber cuál es el siguiente paso.`;
  const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

function enviarPregunta() {
  const numeroTelefono = "584125005026";
  const mensaje = "Hola Luis, estoy interesado en el producto y quisiera aclarar algunas dudas.";
  const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
  closeUniqueModal();
}