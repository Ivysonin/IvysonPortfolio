// Default configuration
const defaultConfig = {
    hero_title: 'Ivyson Thauan',
    hero_subtitle: 'Desenvolvedor',
    hero_description: 'Transformando ideias em soluções escaláveis com Python e Flask',
    whatsapp_number: '5581992331241',
    email_address: 'ivysonthauan4@gmail.com',
    github_url: 'https://github.com/Ivysonin',
    linkedin_url: 'https://www.linkedin.com/in/ivysonin/',
    background_color: '#0a0a0b',
    surface_color: '#131316',
    text_color: '#f5f5f7',
    primary_action_color: '#dc2626',
    secondary_action_color: '#7f1d1d'
};

let config = { ...defaultConfig };

// WhatsApp message function
function whatsappMessage(name, email, phone, message) {
    const phoneNumber = config.whatsapp_number || defaultConfig.whatsapp_number;
    const formattedMessage = `*Nova mensagem do Portfólio*%0A%0A*Nome:* ${encodeURIComponent(name)}%0A*E-mail:* ${encodeURIComponent(email)}%0A*Telefone:* ${encodeURIComponent(phone || 'Não informado')}%0A%0A*Mensagem:*%0A${encodeURIComponent(message)}`;
    return `https://wa.me/${phoneNumber}?text=${formattedMessage}`;
}

// Update UI based on config
function onConfigChange(cfg) {
    config = { ...defaultConfig, ...cfg };
    
    // Update hero section
    const heroName = document.getElementById('hero-name');
    const heroRole = document.getElementById('hero-role');
    const heroDesc = document.getElementById('hero-desc');
    
    if (heroName) heroName.textContent = config.hero_title || defaultConfig.hero_title;
    if (heroRole) heroRole.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
    if (heroDesc) heroDesc.textContent = config.hero_description || defaultConfig.hero_description;
    
    // Update social links
    const githubLinks = ['github-link', 'footer-github'];
    const linkedinLinks = ['linkedin-link', 'footer-linkedin'];
    
    githubLinks.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = config.github_url || defaultConfig.github_url;
    });
    
    linkedinLinks.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = config.linkedin_url || defaultConfig.linkedin_url;
    });
    
    const emailLink = document.getElementById('email-link');
    if (emailLink) emailLink.href = `mailto:${config.email_address || defaultConfig.email_address}`;
    
    // Update colors
    const bgColor = config.background_color || defaultConfig.background_color;
    const surfaceColor = config.surface_color || defaultConfig.surface_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const primaryColor = config.primary_action_color || defaultConfig.primary_action_color;
    const secondaryColor = config.secondary_action_color || defaultConfig.secondary_action_color;
    
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
    
    document.documentElement.style.setProperty('--bg-primary', bgColor);
    document.documentElement.style.setProperty('--bg-secondary', surfaceColor);
    document.documentElement.style.setProperty('--text-primary', textColor);
    document.documentElement.style.setProperty('--accent-primary', primaryColor);
    document.documentElement.style.setProperty('--accent-secondary', secondaryColor);
}

// Initialize Element SDK
if (window.elementSdk) {
    window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (cfg) => onConfigChange(cfg),
    mapToCapabilities: (cfg) => ({
        recolorables: [
        {
            get: () => cfg.background_color || defaultConfig.background_color,
            set: (value) => { cfg.background_color = value; window.elementSdk.setConfig({ background_color: value }); }
        },
        {
            get: () => cfg.surface_color || defaultConfig.surface_color,
            set: (value) => { cfg.surface_color = value; window.elementSdk.setConfig({ surface_color: value }); }
        },
        {
            get: () => cfg.text_color || defaultConfig.text_color,
            set: (value) => { cfg.text_color = value; window.elementSdk.setConfig({ text_color: value }); }
        },
        {
            get: () => cfg.primary_action_color || defaultConfig.primary_action_color,
            set: (value) => { cfg.primary_action_color = value; window.elementSdk.setConfig({ primary_action_color: value }); }
        },
        {
            get: () => cfg.secondary_action_color || defaultConfig.secondary_action_color,
            set: (value) => { cfg.secondary_action_color = value; window.elementSdk.setConfig({ secondary_action_color: value }); }
        }
        ],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    }),
    mapToEditPanelValues: (cfg) => new Map([
        ['hero_title', cfg.hero_title || defaultConfig.hero_title],
        ['hero_subtitle', cfg.hero_subtitle || defaultConfig.hero_subtitle],
        ['hero_description', cfg.hero_description || defaultConfig.hero_description],
        ['whatsapp_number', cfg.whatsapp_number || defaultConfig.whatsapp_number],
        ['email_address', cfg.email_address || defaultConfig.email_address],
        ['github_url', cfg.github_url || defaultConfig.github_url],
        ['linkedin_url', cfg.linkedin_url || defaultConfig.linkedin_url]
    ])
    });
} else {
    onConfigChange(defaultConfig);
}

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const overlay = document.getElementById('menu-overlay');

function openMobileMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('active');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('active');
}

overlay.addEventListener('click', closeMobileMenu);
mobileMenuBtn.addEventListener('click', openMobileMenu);
closeMenuBtn.addEventListener('click', closeMobileMenu);
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Fecha ao clicar fora do menu
document.addEventListener('click', (event) => { 
    const isClickInsideMenu = mobileMenu.contains(event.target); 
    const isClickOnButton = mobileMenuBtn.contains(event.target); 
    if (!isClickInsideMenu && !isClickOnButton) { 
        closeMobileMenu(); 
    } 
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    const whatsappUrl = whatsappMessage(name, email, phone, message);
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    contactForm.reset();
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
    navbar.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
});

// Section visibility animation
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
    }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Active nav link highlight
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === `#${entry.target.id}`
                    );
                });
            }
        });
    },
    {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
    }
);

sections.forEach(section => {
    navObserver.observe(section);
});

// Skill bar animation
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0%';
        setTimeout(() => {
        entry.target.style.width = width;
        }, 100);
    }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});