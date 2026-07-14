/* ==========================================================================
   Sukruthi Dental and Oral Care Clinic - Interactive Logic (Vanilla JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Leaflet Map
    initMap();

    // Scroll Progress Indicator
    initScrollProgress();

    // Sticky Navbar & Theme Toggle
    initHeaderAndTheme();

    // Intersection Observer for Scroll Spy Navigation
    initScrollSpy();

    // Mobile Hamburger Menu
    initMobileMenu();

    // Services Filter Tabs and Modals
    initServicesFilter();

    // Gallery Filters and Lightbox
    initGallery();

    // Testimonials Carousel
    initTestimonialsCarousel();

    // FAQ Accordion
    initFaqAccordion();

    // Booking Appointment Form & Receipt Download
    initBookingForm();

});

/* --------------------------------------------------------------------------
   1. Interactive Map (Leaflet.js)
   -------------------------------------------------------------------------- */
function initMap() {
    const lat = 12.3037308;
    const lng = 76.6905694;
    
    try {
        // Create leaflet map container
        const map = L.map('map', {
            scrollWheelZoom: false
        }).setView([lat, lng], 17);

        // Load open street map tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Custom Teal Marker Icon
        const tealIcon = L.divIcon({
            html: '<div style="background-color:#0d9488;width:16px;height:16px;border-radius:50%;border:3px solid #ffffff;box-shadow:0 0 10px rgba(0,0,0,0.4)"></div>',
            className: 'custom-teal-marker',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        // Add Marker
        L.marker([lat, lng], { icon: tealIcon }).addTo(map)
            .bindPopup(`
                <div style="font-family:'Outfit',sans-serif;padding:4px;">
                    <strong style="color:#0d9488;display:block;margin-bottom:2px;">Sukruthi Dental & Oral Care</strong>
                    <span style="font-size:11px;color:#64748b;">Above Axis Bank, 1st Floor, Siddarthanagar</span>
                </div>
            `)
            .openPopup();
            
    } catch (e) {
        console.error("Map initialization failed. Checking internet connection.", e);
        document.getElementById('map').innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;height:100%;background:#e2e8f0;color:#64748b;font-size:14px;text-align:center;padding:24px;">
                <div>
                    <i class="fa-solid fa-circle-exclamation" style="font-size:32px;color:#ec4899;margin-bottom:8px;"></i>
                    <p>Map could not load. Please connect to the internet to load Map tiles.</p>
                    <a href="https://maps.google.com/?q=12.3037308,76.6905694" target="_blank" style="color:#0d9488;text-decoration:underline;display:block;margin-top:8px;">Open on Google Maps directly</a>
                </div>
            </div>`;
    }
}

/* --------------------------------------------------------------------------
   2. Scroll Progress Bar
   -------------------------------------------------------------------------- */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/* --------------------------------------------------------------------------
   3. Sticky Header & Dark Theme Toggle
   -------------------------------------------------------------------------- */
function initHeaderAndTheme() {
    const header = document.querySelector('.main-header');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Sticky Scroll Action
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Theme Toggle Handler
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

/* --------------------------------------------------------------------------
   4. Scroll Spy Navigation
   -------------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 180; // offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   5. Mobile Drawer Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* --------------------------------------------------------------------------
   6. Services Details & Dynamic Filter System
   -------------------------------------------------------------------------- */
const servicesData = {
    'RCT': {
        title: 'Root Canal Treatment (RCT)',
        icon: 'fa-solid fa-house-medical-circle-exclamation',
        image: 'assets/service-rct.jpg',
        description: `
            <p><strong>Root Canal Treatment (RCT)</strong> is a critical restorative dental procedure performed to save a severely decayed, infected, or damaged tooth that might otherwise require complete extraction.</p>
            <p>At Sukruthi Dental and Oral Care, Dr. Mahesh M. S. performs precision root canals using advanced computerized endodontic equipment. The procedure involves:
            <ul>
                <li>Removing the infected dental pulp and nervous tissue from the root canals.</li>
                <li>Meticulous cleaning, disinfection, and shaping of the canal pathways.</li>
                <li>Sealing the empty canals with sterile bio-compatible fillings (Gutta-Percha).</li>
                <li>Restoring the structure and utility using structural dental fillings and crowning.</li>
            </ul>
            Our advanced local anesthetics and micro-dentistry systems ensure a virtually pain-free, comfortable patient experience.</p>
        `
    },
    'Whitening': {
        title: 'Tooth Whitening & Bleaching',
        icon: 'fa-solid fa-certificate',
        image: 'assets/service-whitening.jpg',
        description: `
            <p>A bright smile increases self-confidence and leaves a stellar impression. Professional <strong>Tooth Whitening</strong> is a cosmetic procedure designed to treat staining and deep discoloration of natural teeth.</p>
            <p>Our treatment safely dissolves stains caused by caffeine, tea, foods, tobacco usage, or natural aging. Sukruthi Dental clinic offers both:
            <ul>
                <li><strong>In-Clinic Power Whitening:</strong> Achieving up to 6-8 shades lighter in a single 45-minute treatment session using advanced laser light activation.</li>
                <li><strong>Custom Home Bleaching Kits:</strong> Made with precise laboratory dental trays for progressive, comfortable home application under expert checkups.</li>
            </ul>
            We prioritize enamel-safe bleaching chemicals that prevent post-treatment gum sensitivity.</p>
        `
    },
    'Braces': {
        title: 'Dental Braces Fixing & Alignment',
        icon: 'fa-solid fa-teeth',
        image: 'assets/service-braces.jpg',
        description: `
            <p>Orthodontic treatments correct teeth alignment, misaligned bites (underbites, overbites), crowding, and cosmetic tooth spacings. <strong>Dental Braces Fixing</strong> ensures long-term bite health and facial aesthetics.</p>
            <p>We provide multiple orthodontic solutions:
            <ul>
                <li><strong>Traditional Metal Braces:</strong> The most durable, highly cost-effective option for all complex dental misalignments.</li>
                <li><strong>Ceramic (Tooth-Colored) Braces:</strong> Made with clear materials that match your natural teeth, offering a highly discrete aesthetic.</li>
                <li><strong>Invisible & Clear Aligners:</strong> Removable, customized plastic trays designed for transparent alignment without wire brackets.</li>
            </ul>
            Our clinic schedules periodic braces adjustments to align teeth progressively and safely.</p>
        `
    },
    'Laser': {
        title: 'Laser Gum & Dental Surgery',
        icon: 'fa-solid fa-burst',
        image: 'assets/service-laser.jpg',
        description: `
            <p><strong>Laser Dentistry</strong> represents the peak of modern, minimally invasive oral treatment. Advanced diode lasers replace traditional scalpels for an array of periodontal procedures.</p>
            <p>Benefits of Laser Gum Treatments at Sukruthi clinic:
            <ul>
                <li><strong>No Scalpels & No Sutures:</strong> Cuts are sealed instantly by laser heat, avoiding bleeding and needle stitches.</li>
                <li><strong>Sterilized Treatment:</strong> Highly concentrated laser light sterilizes target tissues, cutting infection risks.</li>
                <li><strong>Minimal Pain & Swelling:</strong> Laser light interacts gently with nerves, eliminating deep discomfort.</li>
                <li><strong>Rapid Healing:</strong> Patients can return to solid foods and normal activities much quicker.</li>
            </ul>
            Excellent for gum contouring, bleeding gum treatment, frenectomy, and clinical sterilization.</p>
        `
    },
    'Pits': {
        title: 'Pits And Fissures Sealants',
        icon: 'fa-solid fa-shield-halved',
        image: 'assets/service-sealants.jpg',
        description: `
            <p>Preventive dental care is the foundation of long-term tooth health. The chewing surfaces of back molars contain deep grooves called <strong>pits and fissures</strong>, which easily trap food residues and bacteria.</p>
            <p>We apply thin, medical-grade composite coatings as sealants to:
            <ul>
                <li>Form a smooth protective shield over tooth grooves.</li>
                <li>Prevent acidic food plaque from destroying enamel.</li>
                <li>Reduce cavity developments by up to 80% in molars.</li>
            </ul>
            This painless, non-invasive treatment takes under 15 minutes per tooth and is highly recommended for growing school-going children and young adults.</p>
        `
    },
    'Impacted': {
        title: 'Impacted Tooth & Wisdom Extraction',
        icon: 'fa-solid fa-syringe',
        image: 'assets/service-extraction.jpg',
        description: `
            <p>When a tooth is unable to emerge fully or properly through the gumline, it is considered <strong>impacted</strong>. This commonly occurs with third molars (wisdom teeth) due to jaw space limitations.</p>
            <p>Untreated impacted teeth can cause tooth crowding, nerve root damage, deep decay, and painful cyst formations. Our oral surgical extraction covers:
            <ul>
                <li>Detailed local X-ray diagnosis to visualize jaw bone structures.</li>
                <li>Gentle extraction of the wisdom tooth under local sedation.</li>
                <li>Post-operative stitching (suturing) and medical guidance.</li>
            </ul>
            Dr. Mahesh M. S. holds specialization in handling complex impacted teeth extractions with maximum comfort.</p>
        `
    }
};

function initServicesFilter() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            serviceCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    // Trigger reflow for animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Modal Services Opening
window.openServiceDetail = function(serviceKey) {
    const data = servicesData[serviceKey];
    if (!data) return;

    const modal = document.getElementById('service-modal');
    document.getElementById('modal-service-banner').innerHTML = `<img src="${data.image}" alt="${data.title} Banner">`;
    document.getElementById('modal-service-title').textContent = data.title;
    document.getElementById('modal-service-icon').innerHTML = `<i class="${data.icon}"></i>`;
    document.getElementById('modal-service-desc').innerHTML = data.description;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // stop scroll
};

window.closeServiceModal = function() {
    const modal = document.getElementById('service-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
};

window.bookFromServiceModal = function() {
    closeServiceModal();
    const serviceTitle = document.getElementById('modal-service-title').textContent;
    openBookingModal();
    
    // Auto-select option matching title
    const select = document.getElementById('booking-service');
    for (let i = 0; i < select.options.length; i++) {
        if (serviceTitle.includes(select.options[i].text) || select.options[i].text.includes(serviceTitle)) {
            select.selectedIndex = i;
            break;
        }
    }
};

/* --------------------------------------------------------------------------
   7. Gallery Filter and Lightbox Slideshow
   -------------------------------------------------------------------------- */
const galleryImages = [
    { src: 'assets/hero-clinic.jpg', caption: 'Modern Pediatric & Adult Dental Treatment Chair with Pink Accents' },
    { src: 'assets/doctor-treatment.jpg', caption: 'State-of-the-Art Dental Care Instruments & Treatment Chamber' },
    { src: 'assets/happy-smile.jpg', caption: 'Smiling Patient demonstrating Clean, Restored Tooth Health' }
];
let currentLightboxIndex = 0;

function initGallery() {
    const galleryTabs = document.querySelectorAll('.gallery-tabs button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            galleryTabs.forEach(t => {
                t.classList.remove('gallery-tabactive');
                t.classList.add('gallery-tab');
            });
            tab.classList.remove('gallery-tab');
            tab.classList.add('gallery-tabactive');

            const filter = tab.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCat = item.getAttribute('data-category');
                if (filter === 'all' || itemCat === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

window.openLightbox = function(index) {
    currentLightboxIndex = index;
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    img.src = galleryImages[index].src;
    caption.textContent = galleryImages[index].caption;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
    document.getElementById('lightbox-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.changeLightboxSlide = function(n) {
    currentLightboxIndex += n;
    if (currentLightboxIndex >= galleryImages.length) {
        currentLightboxIndex = 0;
    }
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryImages.length - 1;
    }

    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    
    // Smooth transition
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = galleryImages[currentLightboxIndex].src;
        caption.textContent = galleryImages[currentLightboxIndex].caption;
        img.style.opacity = '1';
    }, 150);
};

// Close modals when clicking backdrop
window.addEventListener('click', (e) => {
    const serviceModal = document.getElementById('service-modal');
    const bookingModal = document.getElementById('booking-modal');
    const lightboxModal = document.getElementById('lightbox-modal');

    if (e.target === serviceModal) closeServiceModal();
    if (e.target === bookingModal) closeBookingModal();
    if (e.target === lightboxModal) closeLightbox();
});

/* --------------------------------------------------------------------------
   8. Patient Testimonials Slider
   -------------------------------------------------------------------------- */
function initTestimonialsCarousel() {
    const track = document.getElementById('reviews-track');
    const prevBtn = document.getElementById('prev-review-btn');
    const nextBtn = document.getElementById('next-review-btn');
    const dotsContainer = document.getElementById('slider-dots');
    
    const cards = document.querySelectorAll('.review-card-item');
    let currentIndex = 0;

    // Reset Dots
    dotsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dots .dot');

    function updateControls() {
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    function moveToSlide(index) {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = cards.length - 1;
        if (currentIndex >= cards.length) currentIndex = 0;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateControls();
    }

    prevBtn.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });

    // Auto slide every 6 seconds
    let autoPlay = setInterval(() => {
        moveToSlide(currentIndex + 1);
    }, 6000);

    // Stop autoplay on user interaction
    const container = document.querySelector('.reviews-slider-container');
    container.addEventListener('mouseenter', () => clearInterval(autoPlay));
    container.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 6000);
    });
}

/* --------------------------------------------------------------------------
   9. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const faqItem = btn.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Close other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });

            if (!isActive) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}

/* --------------------------------------------------------------------------
   10. Booking Appointment Form & Receipt Generation
   -------------------------------------------------------------------------- */
let activeBookingDetails = null;

function initBookingForm() {
    const bookingDateInput = document.getElementById('booking-date');
    
    // Set minimum date to today (patients cannot book past dates)
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;

    const formattedToday = `${yyyy}-${mm}-${dd}`;
    bookingDateInput.min = formattedToday;
}

window.openBookingModal = function() {
    const modal = document.getElementById('booking-modal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Reset modal state
    document.getElementById('booking-form').classList.remove('hidden');
    document.getElementById('booking-success-message').classList.add('hidden');
};

window.closeBookingModal = function() {
    const modal = document.getElementById('booking-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
};

window.handleBookingSubmit = function(e) {
    e.preventDefault();

    const name = document.getElementById('booking-name').value.trim();
    const phone = document.getElementById('booking-phone').value.trim();
    const service = document.getElementById('booking-service').value;
    const doctor = document.getElementById('booking-doctor').value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const notes = document.getElementById('booking-message').value.trim();

    // Verification check
    if (name.length < 3) {
        alert("Please enter a valid patient name (minimum 3 characters).");
        return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
        alert("Please enter a valid 10-digit contact mobile number.");
        return;
    }

    const regId = 'SKD-' + Math.floor(10000000 + Math.random() * 90000000);

    activeBookingDetails = {
        name,
        phone,
        service,
        doctor,
        date,
        time,
        notes: notes || "None",
        registrationId: regId,
        clinicAddress: "Lalitha Arcade, 1st Floor, Siddarthanagar, Near Above Axis Bank, Mysore, Karnataka 570011",
        contactNumber: "+91 98441 70621"
    };

    // Swap layouts inside modal
    document.getElementById('booking-form').classList.add('hidden');
    
    // Bind receipt content
    document.getElementById('receipt-name').textContent = name;
    document.getElementById('receipt-service').textContent = service;
    document.getElementById('receipt-doctor').textContent = doctor;
    document.getElementById('receipt-datetime').textContent = `${date} at ${time}`;
    document.getElementById('receipt-id').textContent = regId;
    document.getElementById('receipt-phone').textContent = `+91 ${phone}`;

    document.getElementById('booking-success-message').classList.remove('hidden');
};

window.resetAndCloseBooking = function() {
    // Reset Form fields
    document.getElementById('booking-form').reset();
    closeBookingModal();
};

window.downloadReceipt = function() {
    if (!activeBookingDetails) return;

    const receiptText = `================================================
SUKRUTHI DENTAL AND ORAL CARE
Lalitha Arcade, 1st Floor, Siddarthanagar, Mysore
Helpline: +91 98441 70621 | +91 85115 23134
================================================
APPOINTMENT PRE-REGISTRATION RECEIPT

Registration ID : ${activeBookingDetails.registrationId}
Date Generated  : ${new Date().toLocaleDateString()}
------------------------------------------------
PATIENT DETAILS
Patient Name    : ${activeBookingDetails.name}
Phone Number    : +91 ${activeBookingDetails.phone}
------------------------------------------------
APPOINTMENT DETAILS
Service/Need    : ${activeBookingDetails.service}
Dentist Named   : ${activeBookingDetails.doctor}
Requested Date  : ${activeBookingDetails.date}
Time Window     : ${activeBookingDetails.time}
Patient Notes   : ${activeBookingDetails.notes}
------------------------------------------------
CLINIC LOCATION
Lalitha Arcade, 1st Floor, Siddarthanagar,
Near Above Axis Bank, Mysore, Karnataka - 570011

*IMPORTANT INSTRUCTION*
This receipt confirms pre-registration of your slot.
Our desk agent will call you within 2 hours during clinic
timings (10 AM - 9 PM) to finalize and lock the booking.
================================================`;

    const blob = new Blob([receiptText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Sukruthi_Dental_Receipt_${activeBookingDetails.registrationId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
