// ===================== MODO OSCURO =====================
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// ===================== MENÚ HAMBURGUESA =====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && !themeToggle.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// ===================== SCROLL SUAVE =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// ===================== FLIP CARDS (móvil) =====================
document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// ===================== MODAL DE ELEMENTOS Y CLASES =====================
const elementData = {
    // --- CLASES IPv4 ---
    classA: {
        icon: '🅰️', title: 'Clase A', tagline: 'Para redes masivas',
        desc: 'Diseñada para redes muy grandes. El primer bit siempre es 0. El primer octeto identifica la red y los otros tres a los hosts.',
        funcs: ['Rango: <code>1.0.0.0</code> a <code>126.255.255.255</code>', 'Máscara de red: <code>255.0.0.0</code>', 'Hosts por red: 16,777,214', 'Uso: Grandes corporaciones o ISP'],
        tip: 'El valor <code>127.x.x.x</code> está reservado para loopback (localhost).'
    },
    classB: {
        icon: '🅱️', title: 'Clase B', tagline: 'Para redes medianas',
        desc: 'Los dos primeros bits son siempre 10. Los primeros dos octetos identifican la red y los dos últimos a los hosts.',
        funcs: ['Rango: <code>128.0.0.0</code> a <code>191.255.255.255</code>', 'Máscara de red: <code>255.255.0.0</code>', 'Hosts por red: 65,534', 'Uso: Universidades, empresas medianas'],
        tip: 'Es común encontrar direcciones de este tipo en redes institucionales.'
    },
    classC: {
        icon: '©️', title: 'Clase C', tagline: 'Para redes pequeñas',
        desc: 'Los tres primeros bits son 110. Los primeros tres octetos identifican la red y el último al host. Es la más común.',
        funcs: ['Rango: <code>192.0.0.0</code> a <code>223.255.255.255</code>', 'Máscara de red: <code>255.255.255.0</code>', 'Hosts por red: 254', 'Uso: Hogares y pequeñas oficinas'],
        tip: 'Las direcciones privadas <code>192.168.x.x</code> pertenecen a esta clase.'
    },
    classD: {
        icon: '📡', title: 'Clase D', tagline: 'Direcciones Multicast',
        desc: 'Los primeros cuatro bits son 1110. No se asigna a hosts normales, sino a grupos de dispositivos que reciben el mismo tráfico simultáneamente.',
        funcs: ['Rango: <code>224.0.0.0</code> a <code>239.255.255.255</code>', 'Sin máscara de subred tradicional', 'Uso: Transmisión de video, IPTV', 'Protocolos como IGMP la utilizan'],
        tip: 'Si envías un paquete a una dirección multicast, todos los suscritos lo reciben.'
    },
    classE: {
        icon: '🧪', title: 'Clase E', tagline: 'Reservada para experimentación',
        desc: 'Los primeros cuatro bits son 1111. Está reservada por la IANA para investigación y desarrollo, por lo que no se asigna a dispositivos comerciales.',
        funcs: ['Rango: <code>240.0.0.0</code> a <code>255.255.255.255</code>', 'No tiene máscara asignada para hosts', 'Uso: Investigación y experimentación', 'No enrutable en Internet'],
        tip: 'La dirección <code>255.255.255.255</code> es de broadcast limitado.'
    },

    // --- ELEMENTOS BÁSICOS ---
    router: {
        icon: '📡', title: 'Router', tagline: 'Conecta tu red local con Internet',
        desc: 'Dispositivo central que enruta el tráfico entre la LAN e Internet y gestiona toda la configuración de la red.',
        funcs: ['Asigna IPs automáticamente (DHCP)', 'Conecta la LAN con Internet (NAT)', 'Gestiona la red WiFi (SSID + clave)', 'Aplica firewall y seguridad'],
        tip: 'IP de acceso común: <code>192.168.1.1</code>'
    },
    switch: {
        icon: '🔀', title: 'Switch', tagline: 'Distribuye los datos por cable',
        desc: 'Conecta varios dispositivos por cable dentro de la LAN y envía cada paquete solo al equipo correcto.',
        funcs: ['Conecta de 4 a 24+ dispositivos', 'Velocidad: 100 Mbps o 1 Gbps', 'Reduce colisiones frente a un hub', 'Base de la topología estrella'],
        tip: 'Ideal: switch Gigabit no administrado.'
    },
    ip: {
        icon: '🔢', title: 'Direccionamiento IP', tagline: 'Identidad única de cada dispositivo',
        desc: 'Cada equipo necesita una IP única dentro de la red para poder comunicarse con los demás.',
        funcs: ['Rango privado: <code>192.168.1.x</code>', 'Máscara: <code>255.255.255.0</code>', 'Puerta de enlace: IP del router', 'DHCP suele usar <code>.100</code> a <code>.200</code>'],
        tip: 'No uses la IP del router ni la de broadcast.'
    },
    dhcp: {
        icon: '⚙️', title: 'DHCP', tagline: 'Asignación automática de IPs',
        desc: 'Protocolo que entrega automáticamente una IP, máscara, gateway y DNS a cada dispositivo conectado.',
        funcs: ['Rango de IPs configurable', 'Tiempo de concesión (lease time)', 'Reservas de IP por MAC', 'Evita conflictos de IP duplicada'],
        tip: 'El router suele ser el servidor DHCP por defecto.'
    },
    dns: {
        icon: '🌍', title: 'DNS', tagline: 'Traduce dominios a direcciones IP',
        desc: 'Convierte los nombres que escribes (google.com) en las IPs que usan los dispositivos.',
        funcs: ['DNS primario: <code>8.8.8.8</code> (Google)', 'DNS secundario: <code>1.1.1.1</code> (Cloudflare)', 'Se puede asignar por DHCP', 'Acelera y mejora la navegación'],
        tip: 'Usa DNS de confianza para más privacidad.'
    },
    wifi: {
        icon: '📶', title: 'Seguridad WiFi', tagline: 'Protege tu red inalámbrica',
        desc: 'Un cifrado débil expone toda la red. Configura siempre el estándar más seguro disponible.',
        funcs: ['Usa WPA2 o WPA3 (nunca WEP)', 'Contraseña de 12+ caracteres', 'Cambia el SSID por defecto', 'Desactiva WPS'],
        tip: 'WPA3 es el estándar más seguro actualmente.'
    },
    medios: {
        icon: '🪢', title: 'Medios de Transmisión', tagline: 'El camino físico de los datos',
        desc: 'Es el canal por donde viaja la información. Se dividen en guiados (cables) y no guiados (Wi-Fi).',
        funcs: ['Cable de Cobre (UTP/STP): Económico, usa RJ45, ideal para distancias cortas', 'Fibra Óptica: Usa luz, altísima velocidad y distancias largas', 'Inalámbrico (WiFi): Ondas de radio, brinda movilidad'],
        tip: 'El cable UTP Cat 6 es el estándar actual para redes LAN.'
    },
    gateway: {
        icon: '🚪', title: 'Gateway (Puerta de Enlace)', tagline: 'La salida hacia otras redes',
        desc: 'Es la dirección IP del router dentro de la red local. Funciona como la "puerta" por donde los dispositivos envían tráfico cuando el destino está fuera de su red.',
        funcs: ['Suele ser la primera IP de la red (ej. <code>192.168.1.1</code>)', 'Permite la comunicación con Internet (WAN)', 'Traduce direcciones IP privadas a públicas (NAT)', 'Se configura en los equipos o vía DHCP'],
        tip: 'Si un equipo no tiene configurado el Gateway, no podrá navegar por Internet.'
    }
};

const modal = document.getElementById('elementModal');
const modalBody = document.getElementById('modalBody');

document.querySelectorAll('.element-card').forEach(card => {
    card.addEventListener('click', () => {
        const key = card.dataset.element;
        const data = elementData[key];
        if (!data) return;

        modalBody.innerHTML = `
            <h3>${data.icon} ${data.title}</h3>
            <p class="modal-tagline">${data.tagline}</p>
            <p>${data.desc}</p>
            <h4>Puntos clave</h4>
            <ul>
                ${data.funcs.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <h4>💡 Dato</h4>
            <p>${data.tip}</p>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===================== ARQUITECTURA INTERACTIVA (ENERGÍA POR CABLES) =====================
const archNodes = document.querySelectorAll('.arch-node');
const archInfo = document.getElementById('archInfo');

archNodes.forEach(node => {
    const showInfo = () => {
        archNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        archInfo.innerHTML = `
            <span class="arch-info-icon">💡</span>
            <p>${node.dataset.info}</p>
        `;
    };
    node.addEventListener('click', showInfo);
    node.addEventListener('mouseenter', showInfo);
});

const simulateBtn = document.getElementById('simulateBtn');

simulateBtn.addEventListener('click', () => {
    simulateBtn.disabled = true;
    runCableAnimation();
});

function runCableAnimation() {
    const container = document.querySelector('.architecture-new');
    const pcNode = document.querySelectorAll('.arch-device')[0];
    const switchNode = document.querySelector('.arch-switch');
    const routerNode = document.querySelector('.arch-router');
    const internetNode = document.querySelector('.arch-internet');

    const getCoords = (el, isTop = false) => {
        const rect = el.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();
        return {
            x: rect.left - parentRect.left + (rect.width / 2) - 6,
            y: isTop ? (rect.top - parentRect.top - 6) : (rect.top - parentRect.top + (rect.height / 2) - 6)
        };
    };

    const pcPos = getCoords(pcNode);
    const switchPos = getCoords(switchNode);
    const switchTop = getCoords(switchNode, true); 
    const routerPos = getCoords(routerNode);
    const routerTop = getCoords(routerNode, true);
    const internetPos = getCoords(internetNode);

    const branchesContainer = document.querySelector('.arch-devices-container');
    const branchesRect = branchesContainer.getBoundingClientRect();
    const horizontalCableY = branchesRect.top - container.getBoundingClientRect().top; 

    const route = [
        { x: pcPos.x, y: pcPos.y },                 
        { x: pcPos.x, y: horizontalCableY },        
        { x: switchPos.x, y: horizontalCableY },    
        { x: switchPos.x, y: switchPos.y },         
        { x: switchPos.x, y: switchTop.y },         
        { x: routerPos.x, y: routerPos.y },         
        { x: routerPos.x, y: routerTop.y },         
        { x: internetPos.x, y: internetPos.y }      
    ];

    const packet = document.createElement('div');
    packet.classList.add('data-packet');
    container.appendChild(packet);

    const trailInterval = setInterval(() => {
        createTrail(packet, container);
    }, 50);

    let currentSegment = 0;
    let progress = 0;
    const speed = 0.04;

    function movePacket() {
        if (currentSegment >= route.length - 1) {
            clearInterval(trailInterval);
            packet.style.opacity = '0';
            packet.style.transition = 'opacity 0.4s ease';
            setTimeout(() => {
                packet.remove();
                simulateBtn.disabled = false;
            }, 400);
            return;
        }

        const start = route[currentSegment];
        const end = route[currentSegment + 1];

        const currentX = start.x + (end.x - start.x) * progress;
        const currentY = start.y + (end.y - start.y) * progress;

        packet.style.left = `${currentX}px`;
        packet.style.top = `${currentY}px`;

        progress += speed;

        if (progress >= 1) {
            progress = 0;
            currentSegment++;
        }

        requestAnimationFrame(movePacket);
    }

    requestAnimationFrame(movePacket);
}

function createTrail(packet, container) {
    if (!packet.parentNode) return;
    
    const trail = document.createElement('div');
    trail.classList.add('packet-trail');
    
    const packetLeft = parseFloat(packet.style.left) || 0;
    const packetTop = parseFloat(packet.style.top) || 0;
    
    trail.style.left = `${packetLeft + 3}px`; 
    trail.style.top = `${packetTop + 3}px`;
    
    container.appendChild(trail);
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0.5)';
    }, 20);
    
    setTimeout(() => {
        trail.remove();
    }, 320);
}

// ===================== CANVAS: RED ANIMADA =====================
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;
let mouse = { x: null, y: null, radius: 120 };

function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    initParticles();
}

function initParticles() {
    particles = [];
    const density = Math.floor((canvas.width * canvas.height) / 12000);
    const count = Math.min(Math.max(density, 40), 110);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 1.8 + 1
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
                const opacity = 1 - dist / 130;
                ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.35})`;
                ctx.lineWidth = 0.7;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.85)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.08)';
        ctx.fill();
    });

    if (mouse.x !== null) {
        particles.forEach(p => {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                const opacity = 1 - dist / mouse.radius;
                ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.55})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        });
    }
}

function updateParticles() {
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
    });
}

function animate() {
    updateParticles();
    drawParticles();
    animationId = requestAnimationFrame(animate);
}

canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();

// ===================== TERMINAL IPCONFIG =====================
const runIpconfig = document.getElementById('runIpconfig');
const clearIpconfig = document.getElementById('clearIpconfig');
const terminalOutput = document.getElementById('terminalOutput');
let isRunning = false;

const commandText = 'C:\\Users\\Estudiante> ipconfig';
const outputText = `
Adaptador de LAN inalámbrica Wi-Fi:

   Sufijo DNS específico. . . . . . . . . : 
   Vínculo: dirección IPv6 local. . . . . : fe80::a4b2:c9d1:2f3e:8b4a%12
   Dirección IPv4. . . . . . . . . . . . . : 192.168.1.15
   Máscara de subred . . . . . . . . . . . : 255.255.255.0
   Puerta de enlace predeterminada . . . . : 192.168.1.1
`;

async function typeText(element, text, speed = 25) {
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        const delay = text.charAt(i) === '\n' ? 90 : speed;
        await new Promise(r => setTimeout(r, delay));
    }
}

runIpconfig.addEventListener('click', async () => {
    if (isRunning) return;
    isRunning = true;
    runIpconfig.disabled = true;

    terminalOutput.textContent = '';
    const promptSpan = document.createElement('span');
    promptSpan.className = 'terminal-prompt';
    terminalOutput.appendChild(promptSpan);
    await typeText(promptSpan, commandText, 40);

    await new Promise(r => setTimeout(r, 400));

    const outputSpan = document.createElement('span');
    outputSpan.style.color = '#e2e8f0';
    promptSpan.appendChild(document.createTextNode('\n'));
    promptSpan.appendChild(outputSpan);
    await typeText(outputSpan, outputText, 12);

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    promptSpan.appendChild(cursor);

    const terminalBody = document.getElementById('terminalBody');
    terminalBody.scrollTop = terminalBody.scrollHeight;

    isRunning = false;
    runIpconfig.disabled = false;
});

clearIpconfig.addEventListener('click', () => {
    if (isRunning) return;
    terminalOutput.textContent = '';
});

// ===================== ANIMACIÓN SCROLL =====================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.flip-card, .element-card, .terminal-wrapper, .info-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
