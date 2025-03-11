// Ambil elemen tombol hamburger dan menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Tambahkan event listener untuk tombol hamburger
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.team-card');
    const cardWidth = cards[0].offsetWidth + 40; // card width + margin
    
    let currentIndex = 0;
    let startX, startScrollLeft, isDown = false;
    
    // Calculate maximum index
    const maxIndex = cards.length - Math.floor(track.parentElement.offsetWidth / cardWidth);

    // Setup carousel
    function setupCarousel() {
        // Set initial position to show one card in the middle
        repositionCarousel();
        
        // For mobile, make cards clickable to go to LinkedIn
        if (window.innerWidth <= 768) {
            cards.forEach(card => {
                card.addEventListener('click', function() {
                    const linkedinUrl = this.querySelector('.linkedin-link').getAttribute('href');
                    window.open(linkedinUrl, '_blank');
                });
            });
        }
        
        // Enable/disable navigation buttons based on position
        updateNavButtons();
    }
    
    function repositionCarousel() {
        // Ensure currentIndex is within bounds
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
        
        // Center the current card
        const position = -currentIndex * cardWidth;
        track.style.transform = `translateX(${position}px)`;
        
        // Update nav buttons
        updateNavButtons();
    }
    
    function updateNavButtons() {
        // Show/hide previous button
        document.querySelector('.carousel-prev').style.opacity = currentIndex <= 0 ? '0.3' : '1';
        document.querySelector('.carousel-prev').style.pointerEvents = currentIndex <= 0 ? 'none' : 'auto';
        
        // Show/hide next button
        document.querySelector('.carousel-next').style.opacity = currentIndex >= maxIndex ? '0.3' : '1';
        document.querySelector('.carousel-next').style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    }

    // Next button
    document.querySelector('.carousel-next').addEventListener('click', function() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            repositionCarousel();
        }
    });

    // Previous button
    document.querySelector('.carousel-prev').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            repositionCarousel();
        }
    });

    // Mouse dragging functionality
    track.addEventListener('mousedown', function(e) {
        isDown = true;
        startX = e.pageX;
        startScrollLeft = parseInt(track.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
        track.style.cursor = 'grabbing';
    });

    track.addEventListener('mouseleave', function() {
        isDown = false;
        track.style.cursor = 'grab';
    });

    track.addEventListener('mouseup', function() {
        isDown = false;
        track.style.cursor = 'grab';
        
        // Snap to nearest card
        const dragDistance = parseInt(track.style.transform.replace('translateX(', '').replace('px)', '')) - startScrollLeft;
        if (Math.abs(dragDistance) > 50) { // Only move if dragged enough
            const moveBy = Math.round(dragDistance / cardWidth);
            currentIndex = Math.max(0, Math.min(currentIndex - moveBy, maxIndex));
        }
        repositionCarousel();
    });

    track.addEventListener('mousemove', function(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX);
        track.style.transform = `translateX(${startScrollLeft + walk}px)`;
    });

    // Touch events for mobile
    track.addEventListener('touchstart', function(e) {
        isDown = true;
        startX = e.touches[0].pageX;
        startScrollLeft = parseInt(track.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
    });

    track.addEventListener('touchend', function() {
        isDown = false;
        
        // Snap to nearest card
        const dragDistance = parseInt(track.style.transform.replace('translateX(', '').replace('px)', '')) - startScrollLeft;
        if (Math.abs(dragDistance) > 50) { // Only move if dragged enough
            const moveBy = Math.round(dragDistance / cardWidth);
            currentIndex = Math.max(0, Math.min(currentIndex - moveBy, maxIndex));
        }
        repositionCarousel();
    });

    track.addEventListener('touchmove', function(e) {
        if (!isDown) return;
        const x = e.touches[0].pageX;
        const walk = (x - startX);
        track.style.transform = `translateX(${startScrollLeft + walk}px)`;
    });

    // Initialize carousel
    setupCarousel();
    
    // Update on window resize
    window.addEventListener('resize', function() {
        // Recalculate maxIndex
        const updatedMaxIndex = cards.length - Math.floor(track.parentElement.offsetWidth / cardWidth);
        maxIndex = Math.max(0, updatedMaxIndex);
        
        // Make sure current index is valid
        currentIndex = Math.min(currentIndex, maxIndex);
        
        // Reposition carousel
        setupCarousel();
    });
});
// akhir carousel

// kualitas produk
// Ambil elemen modal, gambar modal, dan tombol close
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-image");
const closeBtn = document.querySelector(".modal__close");

// Ambil semua gambar di gallery
const images = document.querySelectorAll(".gallery__image");

// Loop melalui setiap gambar dan tambahkan event listener
images.forEach((image) => {
    image.addEventListener("click", () => {
        modal.style.display = "block"; // Tampilkan modal
        modalImg.src = image.src; // Set sumber gambar modal
    });
});

// Tutup modal saat tombol close diklik
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Tutup modal saat klik di luar gambar
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// akhir kualitas produk

// testimoni
const testimonials = [
    {
        quote: "Solusi yang ditawarkan perusahaan ini benar-benar mengubah cara bisnis kami beroperasi. Efisiensi meningkat drastis!",
        author: "Budi Santoso",
        position: "CEO, PT Maju Bersama",
        linkedin: "https://linkedin.com/company/pt-maju-bersama"
    },
    {
        quote: "Layanan yang sangat profesional dan tepat waktu. Tidak pernah mengecewakan dalam setiap project yang kami kerjakan bersama.",
        author: "Siti Rahma",
        position: "Marketing Director, Global Indonesia",
        linkedin: "https://linkedin.com/company/global-indonesia"
    },
    {
        quote: "Tim yang sangat responsif dan selalu memberikan solusi inovatif untuk setiap tantangan yang kami hadapi.",
        author: "Ahmad Ridwan",
        position: "CTO, Tech Nusantara",
        linkedin: "https://linkedin.com/company/tech-nusantara"
    },
    {
        quote: "Kualitas pekerjaan yang konsisten dan selalu melebihi ekspektasi. Sangat merekomendasikan untuk semua kebutuhan bisnis Anda.",
        author: "Dewi Putri",
        position: "Operations Manager, Sukses Group",
        linkedin: "https://linkedin.com/company/sukses-group"
    },
    {
        quote: "Pendekatan yang sangat customer-oriented membuat kami merasa dimengerti dan dihargai sebagai klien.",
        author: "Hendra Wijaya",
        position: "Founder, StartUp Lokal",
        linkedin: "https://linkedin.com/company/startup-lokal"
    },
    {
        quote: "Kerja sama yang luar biasa selama 3 tahun terakhir. Mereka lebih dari sekedar vendor, tapi partner sejati dalam bisnis.",
        author: "Nina Anggraini",
        position: "HR Director, Mega Corporindo",
        linkedin: "https://linkedin.com/company/mega-corporindo"
    }
];

// Fungsi untuk membuat card testimoni
function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    const quote = document.createElement('p');
    quote.className = 'testimonial-quote';
    quote.textContent = testimonial.quote;
    
    const authorInfo = document.createElement('div');
    
    const author = document.createElement('div');
    author.className = 'testimonial-author';
    author.textContent = testimonial.author;
    
    const position = document.createElement('div');
    position.className = 'testimonial-position';
    position.textContent = testimonial.position;
    
    authorInfo.appendChild(author);
    authorInfo.appendChild(position);
    
    card.appendChild(quote);
    card.appendChild(authorInfo);
    
    // Menambahkan event listener untuk redirect ke LinkedIn
    card.addEventListener('click', function() {
        window.open(testimonial.linkedin, '_blank');
    });
    
    return card;
}

// Fungsi untuk mengisi marquee dengan card testimoni
function populateMarquee() {
    const marqueeElement = document.getElementById('marquee');
    
    // Menambahkan semua testimoni ke marquee
    testimonials.forEach(testimonial => {
        const card = createTestimonialCard(testimonial);
        marqueeElement.appendChild(card);
    });
    
    // Duplikasi elemen untuk efek marquee yang mulus
    const originalCards = Array.from(marqueeElement.children);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        // Menambahkan event listener ke clone
        clone.addEventListener('click', function() {
            window.open(testimonials[originalCards.indexOf(card)].linkedin, '_blank');
        });
        marqueeElement.appendChild(clone);
    });
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    populateMarquee();
});
// akhir testimoni