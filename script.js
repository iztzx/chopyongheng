// Product data
const products = [
    {
        id: 1,
        name: 'Premium Mangrove Charcoal',
        category: 'Premium',
        price: 25.00,
        unit: 'per bundle (5kg)',
        description: 'Our signature product, made from sustainably sourced mangrove wood. Long burning time with consistent heat output.',
        features: ['Long burning time', 'Consistent heat output'],
        rating: 5,
        inStock: true
    },
    {
        id: 2,
        name: 'Restaurant Grade Charcoal',
        category: 'Professional',
        price: 35.00,
        unit: 'per bundle (5kg)',
        description: 'Professional quality charcoal preferred by hawkers and restaurants. High heat capacity with extended burn duration.',
        features: ['High heat capacity', 'Extended burn duration'],
        rating: 5,
        inStock: true
    },
    {
        id: 3,
        name: 'Home Cooking Charcoal',
        category: 'Family',
        price: 18.00,
        unit: 'per bundle (3kg)',
        description: 'Perfect for family use. Easy to light with moderate burn time, ideal for everyday cooking needs.',
        features: ['Easy to light', 'Moderate burn time'],
        rating: 4,
        inStock: true
    },
    {
        id: 4,
        name: 'BBQ Charcoal',
        category: 'Specialty',
        price: 22.00,
        unit: 'per bundle (4kg)',
        description: 'Specially prepared for grilling. Quick ignition with intense heat perfect for barbecue cooking.',
        features: ['Quick ignition', 'Intense heat'],
        rating: 5,
        inStock: true
    },
    {
        id: 5,
        name: 'Hot Pot Charcoal',
        category: 'Specialty',
        price: 20.00,
        unit: 'per bundle (3kg)',
        description: 'Traditional fuel for authentic hot pot experience. Gentle, consistent heat for perfect hot pot cooking.',
        features: ['Gentle heat', 'Consistent temperature'],
        rating: 4,
        inStock: true
    },
    {
        id: 6,
        name: 'Bulk Order Special',
        category: 'Bulk',
        price: 200.00,
        unit: 'per 10 bundles',
        description: 'Special bulk pricing for restaurants and regular customers. Mix and match any products.',
        features: ['Bulk discount', 'Mix and match'],
        rating: 5,
        inStock: true
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('chop-yong-heng-cart')) || {};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartDisplay();
    setupNavigation();
    setupContactForm();
    
    // Check for admin access
    if (window.location.hash === '#admin') {
        showAdminPanel();
    }
});

// Load products into the shop section
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card fade-in">
            <div class="product-image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                </svg>
                <div class="product-category">${product.category}</div>
            </div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-text">(${product.rating}/5)</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    ${product.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
                <div class="product-price-section">
                    <div>
                        <span class="product-price">RM ${product.price.toFixed(2)}</span>
                        <span class="product-unit">${product.unit}</span>
                    </div>
                </div>
                <div class="product-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${product.id}, -1)" ${getQuantity(product.id) === 0 ? 'disabled' : ''}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                        <span class="quantity-display">${getQuantity(product.id)}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${product.id}, 1)" ${getQuantity(product.id) >= 30 ? 'disabled' : ''}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </button>
                    </div>
                    <button class="btn btn-primary add-to-cart" onclick="addToCart(${product.id})" ${getQuantity(product.id) >= 30 ? 'disabled' : ''}>
                        Add to Cart
                    </button>
                </div>
                ${getQuantity(product.id) >= 30 ? '<p style="color: #D2691E; font-size: 0.875rem; margin-top: 0.5rem;">Maximum quantity reached</p>' : ''}
            </div>
        </div>
    `).join('');
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<svg class="star" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon></svg>';
        } else {
            stars += '<svg class="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon></svg>';
        }
    }
    return stars;
}

// Get quantity of a product in cart
function getQuantity(productId) {
    return cart[productId] || 0;
}

// Update quantity of a product
function updateQuantity(productId, change) {
    const currentQuantity = getQuantity(productId);
    const newQuantity = Math.max(0, Math.min(30, currentQuantity + change));
    
    if (newQuantity === 0) {
        delete cart[productId];
    } else {
        cart[productId] = newQuantity;
    }
    
    saveCart();
    updateCartDisplay();
    loadProducts(); // Refresh products to update buttons
}

// Add product to cart
function addToCart(productId) {
    updateQuantity(productId, 1);
}

// Remove product from cart
function removeFromCart(productId) {
    delete cart[productId];
    saveCart();
    updateCartDisplay();
    loadProducts();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('chop-yong-heng-cart', JSON.stringify(cart));
}

// Get total quantity in cart
function getTotalQuantity() {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
}

// Get total price in cart
function getTotalPrice() {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
        const product = products.find(p => p.id === parseInt(productId));
        return total + (product ? product.price * quantity : 0);
    }, 0);
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartContent = document.getElementById('cart-content');
    const cartTotal = document.getElementById('cart-total');
    
    const totalQuantity = getTotalQuantity();
    const totalPrice = getTotalPrice();
    
    // Update cart count
    if (cartCount) {
        cartCount.textContent = totalQuantity;
        cartCount.style.display = totalQuantity > 0 ? 'block' : 'none';
    }
    
    // Update cart total
    if (cartTotal) {
        cartTotal.textContent = `RM ${totalPrice.toFixed(2)}`;
    }
    
    // Update cart content
    if (cartContent) {
        if (totalQuantity === 0) {
            cartContent.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p><p>Start shopping to add items to your cart.</p></div>';
        } else {
            cartContent.innerHTML = Object.entries(cart).map(([productId, quantity]) => {
                const product = products.find(p => p.id === parseInt(productId));
                if (!product) return '';
                
                return `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${product.name}</h4>
                            <p>${product.unit}</p>
                        </div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${product.id}, -1)">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                            <span class="quantity-display">${quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${product.id}, 1)" ${quantity >= 30 ? 'disabled' : ''}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                            <button class="quantity-btn" onclick="removeFromCart(${product.id})" style="margin-left: 8px; color: #dc3545; border-color: #dc3545;">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3,6 5,6 21,6"></polyline>
                                    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="cart-item-price">RM ${(product.price * quantity).toFixed(2)}</div>
                    </div>
                `;
            }).join('');
        }
    }
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
        
        // Prevent body scroll when cart is open
        if (cartSidebar.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (getTotalQuantity() === 0) {
        alert('Your cart is empty. Please add some products before checkout.');
        return;
    }
    
    // For now, just show an alert. In a real implementation, this would redirect to a checkout page
    alert(`Checkout functionality would be implemented here.\n\nTotal: RM ${getTotalPrice().toFixed(2)}\nItems: ${getTotalQuantity()}`);
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const sectionTop = section.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Setup navigation
function setupNavigation() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Close mobile menu if open
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // For demo purposes, just show success message
            alert('Thank you for your message! We will get back to you within 24 hours.');
            contactForm.reset();
            
            // In a real implementation, you would submit to Formspree or another service
        });
    }
}

// Holiday management system
let holidays = JSON.parse(localStorage.getItem('chop-yong-heng-holidays')) || [];

// Show admin panel
function showAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        adminPanel.style.display = 'block';
        generateCalendar();
    }
}

// Close admin panel
function closeAdmin() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
        adminPanel.style.display = 'none';
    }
    // Remove hash from URL
    if (window.location.hash === '#admin') {
        history.replaceState(null, null, window.location.pathname);
    }
}

// Generate calendar for holiday management
function generateCalendar() {
    const calendarContainer = document.getElementById('admin-calendar');
    if (!calendarContainer) return;
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Clear calendar
    calendarContainer.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.textContent = day;
        header.style.fontWeight = 'bold';
        header.style.textAlign = 'center';
        header.style.padding = '8px';
        header.style.backgroundColor = '#f5f5f5';
        calendarContainer.appendChild(header);
    });
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day disabled';
        calendarContainer.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Check if this date is a holiday
        if (holidays.includes(dateString)) {
            dayElement.classList.add('holiday');
        }
        
        // Check if this date is a Sunday (no delivery)
        const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
        if (dayOfWeek === 0) {
            dayElement.classList.add('disabled');
            dayElement.title = 'No delivery on Sundays';
        } else {
            dayElement.addEventListener('click', () => toggleHoliday(dateString, dayElement));
        }
        
        calendarContainer.appendChild(dayElement);
    }
}

// Toggle holiday status for a date
function toggleHoliday(dateString, element) {
    const index = holidays.indexOf(dateString);
    
    if (index > -1) {
        // Remove holiday
        holidays.splice(index, 1);
        element.classList.remove('holiday');
    } else {
        // Add holiday
        holidays.push(dateString);
        element.classList.add('holiday');
    }
}

// Save holidays to localStorage
function saveHolidays() {
    localStorage.setItem('chop-yong-heng-holidays', JSON.stringify(holidays));
    alert('Holiday settings saved successfully!');
}

// Check if a date is a holiday
function isHoliday(dateString) {
    return holidays.includes(dateString);
}

// Utility function to format date
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Add some default holidays (Chinese New Year, etc.)
function addDefaultHolidays() {
    const currentYear = new Date().getFullYear();
    const defaultHolidays = [
        `${currentYear}-01-01`, // New Year's Day
        `${currentYear}-02-10`, // Chinese New Year (example date)
        `${currentYear}-02-11`, // Chinese New Year (example date)
        `${currentYear}-05-01`, // Labour Day
        `${currentYear}-08-31`, // National Day
        `${currentYear}-12-25`, // Christmas Day
    ];
    
    defaultHolidays.forEach(holiday => {
        if (!holidays.includes(holiday)) {
            holidays.push(holiday);
        }
    });
    
    saveHolidays();
}

// Initialize default holidays if none exist
if (holidays.length === 0) {
    addDefaultHolidays();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .news-item, .timeline-item');
    animatedElements.forEach(el => observer.observe(el));
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close cart with Escape key
    if (e.key === 'Escape') {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar && cartSidebar.classList.contains('open')) {
            toggleCart();
        }
        
        // Close admin panel with Escape key
        const adminPanel = document.getElementById('admin-panel');
        if (adminPanel && adminPanel.style.display === 'block') {
            closeAdmin();
        }
    }
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
