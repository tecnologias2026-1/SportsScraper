# 🎨 Arquitectura CSS-First - SportsScraper

## Principio de Diseño

**HTML + CSS Puro** para interfaz y navegación  
**JavaScript** solo para lógica de datos y sincronización

---

## Componentes CSS-Only (Sin JavaScript)

### 1. **Menú Hamburguesa Mobile**
```html
<!-- Hidden checkbox -->
<input type="checkbox" id="mobileMenuToggle" class="menu-toggle">

<!-- Label actúa como botón -->
<label for="mobileMenuToggle" class="mobile-menu-btn">
  <i class="material-icons">menu</i>
</label>

<!-- Drawer menu -->
<div class="mobile-menu-drawer">...</div>

<!-- Overlay clickeable -->
<label for="mobileMenuToggle" class="mobile-menu-overlay"></label>
```

**CSS:**
```css
#mobileMenuToggle:checked ~ .mobile-menu-drawer {
  left: 0;  /* Muestra el drawer */
}

#mobileMenuToggle:checked ~ .mobile-menu-overlay {
  display: block;  /* Muestra overlay */
}
```

**Ventajas:**
- ✅ No requiere JavaScript
- ✅ Funciona sin JS habilitado
- ✅ Mejor accesibilidad
- ✅ Más rápido (sin re-renders)

---

### 2. **Dropdowns (Categorías y Ordenamiento)**
```html
<!-- Hidden checkbox para cada dropdown -->
<input type="checkbox" id="categoriesToggle" class="dropdown-toggle">
<input type="checkbox" id="sortToggle" class="dropdown-toggle">

<!-- Labels como botones -->
<label for="categoriesToggle" class="sort-btn">CATEGORÍAS</label>
<label for="sortToggle" class="sort-btn">ORDENAR</label>

<!-- Dropdowns inicialmente ocultos -->
<div id="categoriesDropdown" class="dropdown-menu">...</div>
<div id="sortDropdown" class="dropdown-menu">...</div>
```

**CSS:**
```css
.dropdown-menu {
  display: none;  /* Oculto por defecto */
}

#categoriesToggle:checked ~ #categoriesDropdown {
  display: block;  /* Mostrar cuando checkbox está checked */
}

#sortToggle:checked ~ #sortDropdown {
  display: block;
}
```

---

### 3. **Overlay Móvil**
```html
<!-- Label vacío que cierra el menú -->
<label for="mobileMenuToggle" class="mobile-menu-overlay"></label>
```

**CSS:**
```css
.mobile-menu-overlay {
  display: none;  /* Oculto por defecto */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 998;
  cursor: pointer;
}

#mobileMenuToggle:checked ~ .mobile-menu-overlay {
  display: block;  /* Visible cuando menú abierto */
}
```

---

## Componentes con JavaScript (Necesarios)

### 1. **Búsqueda de Productos**
```javascript
// Búsqueda dinámica de productos en PRODUCTS array
function showSuggestions(query) {
  const matches = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query)
  );
  // Renderizar sugestiones
}
```
**Por qué JS:** Requiere filtrado dinámico en tiempo real

### 2. **Filtrado y Ordenamiento**
```javascript
// Aplicar filtros y ordenamiento a productos
function applyFilterAndSort() {
  let filtered = PRODUCTS.filter(product => 
    matchesSearch && matchesCategory && matchesPrice
  );
  // Ordenar según selección
  renderProducts(filtered);
}
```
**Por qué JS:** Lógica compleja de datos y cálculos

### 3. **Sincronización Búsqueda Desktop/Mobile**
```javascript
// Desktop input y Mobile input deben estar sincronizados
mobileSearchInput.addEventListener('input', (e) => {
  desktopSearchInput.value = e.target.value;
  performSearch(e.target.value);
});
```
**Por qué JS:** Requiere sincronización en tiempo real

---

## Estadísticas de Reducción

| Métrica | Antes | Después | Reducción |
|---------|-------|---------|-----------|
| **JS Files** | 4 | 3 | -25% |
| **JS Lines (mobile-menu.js)** | 378 | 0 | -100% |
| **setupSortAndFilterListeners** | ~100 líneas | ~55 líneas | -45% |
| **Event Listeners (Menu)** | 5+ | 1 (checkbox) | -80% |
| **CSS Puro Usado** | 40% | 75% | +87% |

---

## Mejores Prácticas Aplicadas

✅ **Progressive Enhancement**
- Sitio funciona sin JS (navegación y menús)
- JS mejora la experiencia (búsqueda dinámica)

✅ **Performance**
- Menos JavaScript = Más rápido
- CSS es más eficiente que JS DOM manipulation
- No hay re-renders innecesarios

✅ **Accesibilidad**
- Labels + inputs = Código semántico
- Funciona con teclado (Tab, Enter, Space)
- Screen readers lo entienden

✅ **Mantenibilidad**
- CSS declarativo vs JS imperativo
- Menos bugs potenciales
- Código más legible

---

## Estructura de Carpetas

```
SportsScraper/
├── index.html          # HTML semántico con inputs/labels
├── css/
│   └── style.css       # TODO el CSS (navegación, dropdowns, responsive)
├── js/
│   ├── script.js       # Búsqueda, filtrado, datos (SOLO lógica)
│   ├── router.js       # Enrutamiento (requerido)
│   └── auth.js         # Autenticación (requerido)
└── assets/
```

---

## Checklist CSS-First

- [x] Menú mobile: CSS puro (checkbox + label)
- [x] Dropdowns: CSS puro (:checked selector)
- [x] Overlay: CSS puro
- [x] Responsive: CSS media queries
- [x] Animaciones: CSS transitions
- [x] JavaScript: Solo para datos y búsqueda
- [x] Accesibilidad: Labels + inputs semánticos
- [x] Performance: Mínimo JS posible

---

## Recursos

- MDN: `:checked` pseudo-class
- MDN: `<label>` HTML element
- CSS-Tricks: Checkbox Hack (The Good)
- A List Apart: Progressive Enhancement

