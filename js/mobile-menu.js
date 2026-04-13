// ========================================
// MOBILE MENU FUNCTIONALITY
// ========================================

function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

  // Open menu
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuDrawer.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close menu
  function closeMenu() {
    mobileMenuDrawer.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  closeMenuBtn.addEventListener('click', closeMenu);
  mobileMenuOverlay.addEventListener('click', closeMenu);

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-menu-drawer') && !e.target.closest('.mobile-menu-btn')) {
      closeMenu();
    }
  });

  // Setup mobile search
  setupMobileSearch();
}

// ========================================
// MOBILE SEARCH FUNCTIONALITY
// ========================================

function setupMobileSearch() {
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const mobileSearchBtn = document.querySelector('.mobile-search-btn');
  const desktopSearchInput = document.getElementById('searchInput');

  let mobileSearchTimeout;

  // Sync inputs
  mobileSearchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    desktopSearchInput.value = query;
    clearTimeout(mobileSearchTimeout);

    if (query.length > 0) {
      showMobileSuggestions(query);
      mobileSearchTimeout = setTimeout(() => {
        performSearch(query);
      }, 300);
    } else {
      hideMobileSuggestions();
      performSearch('');
    }
  });

  // Search on button click
  mobileSearchBtn.addEventListener('click', () => {
    hideMobileSuggestions();
    performSearch(mobileSearchInput.value);
  });

  // Search on Enter
  mobileSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      hideMobileSuggestions();
      performSearch(mobileSearchInput.value);
    }
  });

  // Close suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-search-wrapper')) {
      hideMobileSuggestions();
    }
  });
}

function showMobileSuggestions(query) {
  const lowerQuery = query.toLowerCase();

  // Filter products
  const matches = PRODUCTS.filter(product => {
    const name = product.name.toLowerCase();
    const brand = product.brand.toLowerCase();
    const category = product.category.toLowerCase();

    return name.includes(lowerQuery) ||
           brand.includes(lowerQuery) ||
           category.includes(lowerQuery);
  }).slice(0, 8);

  const suggestionsEl = document.getElementById('mobile-search-suggestions');
  const suggestionsContent = suggestionsEl.querySelector('.mobile-suggestions-content');

  if (matches.length > 0) {
    suggestionsContent.innerHTML = matches.map(product => `
      <div class="mobile-suggestion-item" data-product-id="${product.id}">
        <div style="font-weight: bold;">${product.name}</div>
        <div style="color: #666; font-size: 0.75rem;">${product.brand} • ${product.category}</div>
      </div>
    `).join('');

    // Add click handlers
    suggestionsContent.querySelectorAll('.mobile-suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        const productId = item.dataset.productId;
        const product = PRODUCTS.find(p => p.id === productId);
        document.getElementById('mobileSearchInput').value = product.name;
        document.getElementById('searchInput').value = product.name;
        hideMobileSuggestions();
        performSearch(product.name);
      });
    });

    suggestionsEl.classList.add('active');
  } else {
    suggestionsContent.innerHTML = `
      <div style="padding: 0.75rem 1rem; color: #999; font-size: 0.8rem;">
        No hay resultados para "${query}"
      </div>
    `;
    suggestionsEl.classList.add('active');
  }
}

function hideMobileSuggestions() {
  const suggestionsEl = document.getElementById('mobile-search-suggestions');
  suggestionsEl.classList.remove('active');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
});
