document.addEventListener("DOMContentLoaded", () => {
  // ✅ Navegación suave entre secciones
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ✅ Efecto toast al hacer click en los enlaces de modelos
  document.querySelectorAll('.model-link').forEach(link => {
    link.addEventListener('click', function(e) {
      const modelTitle = this.querySelector('.model-title').textContent;
      showToast(`Cargando ${modelTitle}...`);
    });
  });

  // ✅ Notificaciones del sistema
  const showToast = (msg) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  };

  // ✅ Filtros y búsqueda (para tags, colores o títulos)
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Buscar ropa o colores...';
  searchInput.className = 'search-bar';
  document.querySelector('.hero').appendChild(searchInput);

  searchInput.addEventListener('input', function () {
    const term = this.value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
      const content = card.innerText.toLowerCase();
      card.style.display = content.includes(term) ? 'block' : 'none';
    });
    document.querySelectorAll('.color-card').forEach(color => {
      const content = color.innerText.toLowerCase();
      color.style.display = content.includes(term) ? 'block' : 'none';
    });
  });

  // ✅ Modales informativos
  const showModal = (text) => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <p>${text}</p>
        <button class="modal-close">Cerrar</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.querySelector('.modal-close').onclick = () => modal.remove();
  };

  // ✅ Efectos de partículas de fondo (opcional con canvas)
  const canvas = document.createElement('canvas');
  canvas.className = 'particles';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: Math.random() * 1,
      dy: Math.random() * 1
    }));
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(46,139,87,0.4)";
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x > canvas.width || p.y > canvas.height) {
        p.x = Math.random() * canvas.width;
        p.y = -10;
      }
    }
    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  animateParticles();
  window.addEventListener('resize', resizeCanvas);

  // ✅ Animaciones de entrada progresivas
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section, .card, .color-card, .model-item').forEach(el => {
    observer.observe(el);
  });

  // ✅ FUNCIONALIDAD DE WHATSAPP FLOTANTE - NUEVA
  // Configuración de WhatsApp flotante
  const whatsappFloatConfig = {
    phoneNumber: '593960145588',
    message: 'Gracias por contactarnos, nos encargamos de distribuir modelos 3D. ¿En qué estaría interesado? Además, si usted crea modelos también denos la información para poder subir sus archivos para que puedan ser vendidos.'
  };

  // Función para mostrar notificación específica de WhatsApp
  const showWhatsAppNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'whatsapp-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'whatsapp-slide-out 0.5s ease-out forwards';
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 3000);
  };

  // Función para crear efecto visual de click en WhatsApp
  const createWhatsAppClickEffect = () => {
    const button = document.querySelector('.whatsapp-float');
    
    const effect = document.createElement('div');
    effect.className = 'whatsapp-click-effect';
    
    button.appendChild(effect);
    
    setTimeout(() => {
      effect.remove();
    }, 600);
  };

  // Función principal de WhatsApp flotante
  window.openWhatsAppFloat = function() {
    const encodedMessage = encodeURIComponent(whatsappFloatConfig.message);
    const whatsappUrl = `https://wa.me/${whatsappFloatConfig.phoneNumber}?text=${encodedMessage}`;
    
    createWhatsAppClickEffect();
    showWhatsAppNotification('Redirigiendo a WhatsApp...');
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 300);
  };

  // Inicializar WhatsApp (opcional, para debug)
  console.log('✅ WhatsApp flotante inicializado');
  console.log('✅ Todas las funcionalidades cargadas correctamente');
});
