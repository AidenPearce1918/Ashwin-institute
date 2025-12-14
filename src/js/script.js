// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside (but not on hamburger)
document.addEventListener('click', (e) => {
    const isClickInsideMenu = navMenu.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    
    if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for buttons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('href');
        if (target) {
            document.querySelector(target).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeIn 0.6s ease-in-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and stat items
document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Faculty modal functionality
const facultyCards = document.querySelectorAll('.faculty-card');
const facultyModal = document.getElementById('facultyModal');
const modalTitle = document.querySelector('.modal-content #modal-title');
const modalSubject = document.querySelector('.modal-subject');
const modalQualifications = document.querySelector('.modal-qualifications');
const modalExperience = document.querySelector('.modal-experience');
const modalSpecialty = document.querySelector('.modal-specialty');
const modalBook = document.getElementById('modalBook');

function openFacultyModal(card) {
    const name = card.dataset.name;
    const subject = card.dataset.subject;
    const qual = card.dataset.qualifications;
    const exp = card.dataset.experience;
    const spec = card.dataset.specialty;

    modalTitle.textContent = name;
    modalSubject.textContent = subject;
    modalQualifications.textContent = qual;
    modalExperience.textContent = exp;
    modalSpecialty.textContent = 'Specialization: ' + spec;

    // set Book Demo link to contact page with subject prefilled
    const subjectParam = encodeURIComponent(`Book demo with ${name} (${subject})`);
    modalBook.setAttribute('href', `../pages/contact.html?subject=${subjectParam}`);

    facultyModal.hidden = false;
    // move focus into modal
    facultyModal.querySelector('.modal-close').focus();
}

function closeFacultyModal() {
    facultyModal.hidden = true;
}

facultyCards.forEach(card => {
    card.addEventListener('click', () => openFacultyModal(card));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFacultyModal(card);
        }
    });
    card.setAttribute('tabindex', '0');
});

// Close handlers
document.querySelectorAll('[data-modal-close]').forEach(el => el.addEventListener('click', closeFacultyModal));
document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', closeFacultyModal));
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && facultyModal && facultyModal.getAttribute('aria-hidden') === 'false') {
        closeFacultyModal();
    }
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Get Started button functionality
document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent.includes('Get Started')) {
        btn.addEventListener('click', () => {
            // Redirect to courses page or scroll to courses section
            window.location.href = 'pages/courses.html';
        });
    }
});
