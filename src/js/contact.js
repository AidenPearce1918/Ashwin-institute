// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Prefill subject from URL param if present
(function prefillSubjectFromUrl(){
    try {
        const params = new URLSearchParams(window.location.search);
        const subjectParam = params.get('subject');
        if (subjectParam) {
            const subjectField = document.getElementById('subject');
            if (subjectField) {
                subjectField.value = decodeURIComponent(subjectParam);
                subjectField.scrollIntoView({ behavior: 'smooth' });
                subjectField.focus();
            }
        }
    } catch (e) {
        // ignore malformed URLs
        console.warn('Could not parse URL params for subject', e);
    }
})();

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Here you would normally send the data to a server
        // For now, we'll just show a success message
        console.log('Form Data:', data);
        
        showMessage('Thank you for your message! We will get back to you soon.', 'success');
        this.reset();
    });
}

function showMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Enroll button functionality
document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent.includes('Enroll Now')) {
        btn.addEventListener('click', function() {
            alert('Enrollment feature coming soon! Please contact us for more information.');
        });
    }
});
