// Theme switching functionality
class ThemeManager {
    constructor() {
        console.log('ThemeManager initialized');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        console.log('Initializing theme manager');
        // Apply saved theme on page load
        this.applyTheme(this.currentTheme);
        
        // Create and add toggle button
        this.createToggleButton();
        
        // Add theme class to body for CSS targeting
        document.body.classList.add('theme-' + this.currentTheme);
        console.log('Theme manager initialized successfully');
    }

    createToggleButton() {
        console.log('Creating toggle button');
        const toggle = document.createElement('button');
        toggle.id = 'theme-toggle';
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Toggle theme');
        
        // Add tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        toggle.appendChild(tooltip);
        
        // Set initial icon
        this.updateToggleIcon();
        
        // Add click event
        toggle.addEventListener('click', () => {
            console.log('Toggle clicked');
            this.toggleTheme();
        });
        
        // Add to page
        document.body.appendChild(toggle);
        console.log('Toggle button added to page');
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        console.log('Toggling theme from', this.currentTheme, 'to', newTheme);
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update body class
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add('theme-' + theme);
        
        // Apply theme
        this.applyTheme(theme);
        
        // Update toggle icon
        this.updateToggleIcon();
    }

    applyTheme(theme) {
        const root = document.documentElement;
        
        if (theme === 'dark') {
            root.style.setProperty('--bg-primary', '#1a202c');
            root.style.setProperty('--bg-secondary', '#2d3748');
            root.style.setProperty('--text-primary', '#f7fafc');
            root.style.setProperty('--text-secondary', '#e2e8f0');
            root.style.setProperty('--text-muted', '#a0aec0');
            root.style.setProperty('--border-color', '#4a5568');
            root.style.setProperty('--accent-color', '#63b3ed');
            root.style.setProperty('--card-bg', '#2d3748');
            root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.3)');
        } else {
            root.style.setProperty('--bg-primary', '#f7fafc');
            root.style.setProperty('--bg-secondary', '#edf2f7');
            root.style.setProperty('--text-primary', '#2d3748');
            root.style.setProperty('--text-secondary', '#4a5568');
            root.style.setProperty('--text-muted', '#718096');
            root.style.setProperty('--border-color', '#e2e8f0');
            root.style.setProperty('--accent-color', '#2b6cb0');
            root.style.setProperty('--card-bg', '#ffffff');
            root.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.1)');
        }
    }

    updateToggleIcon() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            // Remove existing icon classes
            toggle.classList.remove('sun-icon', 'moon-icon');
            
            const tooltip = toggle.querySelector('.tooltip');
            
            if (this.currentTheme === 'dark') {
                toggle.classList.add('sun-icon');
                if (tooltip) tooltip.textContent = 'Toggle light mode';
            } else {
                toggle.classList.add('moon-icon');
                if (tooltip) tooltip.textContent = 'Toggle dark mode';
            }
            console.log('Icon updated for theme:', this.currentTheme);
        } else {
            console.log('Toggle button not found!');
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing theme manager');
    new ThemeManager();
});

// Fallback initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded (fallback), initializing theme manager');
        new ThemeManager();
    });
} else {
    console.log('DOM already loaded, initializing theme manager immediately');
    new ThemeManager();
} 