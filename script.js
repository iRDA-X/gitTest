document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const consultationForm = document.getElementById('consultationForm');
    const ctaBtn = document.getElementById('ctaBtn');
    const navLinks = document.querySelectorAll('a[href^="#"]');

    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        const svgPath = mobileMenuBtn.querySelector('path');
        if (mobileMenu.classList.contains('hidden')) {
            svgPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        } else {
            svgPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        }
    });

    const scrollToSection = (targetId) => {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const svgPath = mobileMenuBtn.querySelector('path');
                svgPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            }
        });
    });

    ctaBtn?.addEventListener('click', () => {
        scrollToSection('consultationForm');
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9-+\s()]+$/;
        return phoneRegex.test(phone) && phone.replace(/[^0-9]/g, '').length >= 10;
    };

    const showValidationError = (element, message) => {
        element.classList.add('border-red-500');
        
        let errorElement = element.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('p');
            errorElement.className = 'error-message text-red-500 text-sm mt-1';
            element.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    };

    const clearValidationError = (element) => {
        element.classList.remove('border-red-500');
        const errorElement = element.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    };

    consultationForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const companyName = document.getElementById('companyName');
        const contactName = document.getElementById('contactName');
        const contactEmail = document.getElementById('contactEmail');
        const contactPhone = document.getElementById('contactPhone');
        const inquiryContent = document.getElementById('inquiryContent');
        
        let isValid = true;

        [companyName, contactName, contactEmail, contactPhone].forEach(field => {
            clearValidationError(field);
        });

        if (!companyName.value.trim()) {
            showValidationError(companyName, '회사명을 입력해주세요.');
            isValid = false;
        }

        if (!contactName.value.trim()) {
            showValidationError(contactName, '담당자명을 입력해주세요.');
            isValid = false;
        }

        if (!contactEmail.value.trim()) {
            showValidationError(contactEmail, '이메일을 입력해주세요.');
            isValid = false;
        } else if (!validateEmail(contactEmail.value)) {
            showValidationError(contactEmail, '올바른 이메일 형식을 입력해주세요.');
            isValid = false;
        }

        if (!contactPhone.value.trim()) {
            showValidationError(contactPhone, '연락처를 입력해주세요.');
            isValid = false;
        } else if (!validatePhone(contactPhone.value)) {
            showValidationError(contactPhone, '올바른 연락처를 입력해주세요. (최소 10자리)');
            isValid = false;
        }

        if (isValid) {
            const submitBtn = consultationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '처리 중...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`${contactName.value}님, 상담 신청이 완료되었습니다!\n빠른 시일 내에 연락드리겠습니다.`);
                consultationForm.reset();
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .feature-card, .process-step, .testimonial'
    );

    elementsToAnimate.forEach((element, index) => {
        element.classList.add('fade-in-up');
        element.style.transitionDelay = `${index * 0.1}s`;
        animateOnScroll.observe(element);
    });

    const headerElement = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            headerElement.style.backgroundColor = 'rgba(18, 67, 166, 0.95)';
            headerElement.style.backdropFilter = 'blur(10px)';
        } else {
            headerElement.style.backgroundColor = '';
            headerElement.style.backdropFilter = '';
        }

        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            headerElement.style.transform = 'translateY(-100%)';
        } else {
            headerElement.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    document.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            clearValidationError(field);
        });
    });

    const parallaxElements = document.querySelectorAll('.hero-section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
});