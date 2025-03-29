document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Version history toggle
    const showVersionHistoryBtn = document.getElementById('showVersionHistory');
    const versionHistoryContent = document.getElementById('versionHistoryContent');
    
    if (showVersionHistoryBtn && versionHistoryContent) {
        showVersionHistoryBtn.addEventListener('click', function() {
            if (versionHistoryContent.style.display === 'block') {
                versionHistoryContent.style.display = 'none';
                showVersionHistoryBtn.innerHTML = '<i class="fas fa-history"></i> View Version History';
            } else {
                versionHistoryContent.style.display = 'block';
                showVersionHistoryBtn.innerHTML = '<i class="fas fa-times"></i> Hide Version History';
            }
        });
    }
    
    // Support form modal
    const openSupportFormBtn = document.getElementById('openSupportForm');
    const contactLink = document.getElementById('contactLink');
    const supportFormModal = document.getElementById('supportFormModal');
    const closeModal = document.querySelector('.close-modal');
    const supportForm = document.getElementById('supportForm');
    
    function openModal() {
        if (supportFormModal) {
            supportFormModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModalFunc() {
        if (supportFormModal) {
            supportFormModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    if (openSupportFormBtn) {
        openSupportFormBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            closeModalFunc();
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === supportFormModal) {
            closeModalFunc();
        }
    });
    
    // Handle form submission
    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to your server
            // For demonstration, we'll just show a success message
            
            // Clear form
            supportForm.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent. We\'ll get back to you soon!';
            
            const modalContent = document.querySelector('.modal-content');
            modalContent.appendChild(successMessage);
            
            // Remove success message and close modal after 3 seconds
            setTimeout(function() {
                modalContent.removeChild(successMessage);
                closeModalFunc();
            }, 3000);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to policy sections when they come into view
    const policySections = document.querySelectorAll('.policy-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    policySections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
    
    // Add animate class to already visible sections
    document.addEventListener('DOMContentLoaded', () => {
        policySections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                section.classList.add('animate');
            }
        });
    });
    
    // Add CSS for animated sections
    const style = document.createElement('style');
    style.textContent = `
        .policy-section.animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Update last updated date dynamically
    // You can change this to the actual last update date
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        lastUpdatedElement.textContent = today.toLocaleDateString('en-US', options);
    }
});
