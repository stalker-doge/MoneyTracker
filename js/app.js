// Main Application - Initializes and coordinates all components
class MoneyTrackerApp {
    constructor() {
        this.isInitialized = false;
        this.initializeApp();
    }

    // Initialize the entire application
    async initializeApp() {
        try {
            console.log('Initializing Money Tracker App...');
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeApp());
                return;
            }

            // Initialize components in order
            await this.initializeComponents();
            this.setupEventListeners();
            this.setupServiceWorker();
            this.setupAnalytics();
            
            this.isInitialized = true;
            console.log('Money Tracker App initialized successfully!');
            
            // Show welcome message for first-time users
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showErrorMessage('Failed to initialize the application. Please refresh the page.');
        }
    }

    // Initialize all components
    async initializeComponents() {
        // Data Manager is already initialized in its own file
        // Chart Manager is already initialized in its own file
        // UI Controller is already initialized in its own file
        
        // Set current month filter
        if (window.uiController) {
            window.uiController.setCurrentMonthFilter();
        }
        
        // Initialize additional features
        this.initializeTheme();
        this.initializeKeyboardShortcuts();
        this.initializeDragAndDrop();
        this.initializeOfflineSupport();
    }

    // Setup global event listeners
    setupEventListeners() {
        // Handle visibility change (tab switching)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.isInitialized) {
                // Refresh data when tab becomes visible
                this.refreshData();
            }
        });

        // Handle online/offline status
        window.addEventListener('online', () => {
            this.showSuccessMessage('Connection restored!');
            this.syncData();
        });

        window.addEventListener('offline', () => {
            this.showWarningMessage('Connection lost. Working offline.');
        });

        // Handle beforeunload (page closing)
        window.addEventListener('beforeunload', (e) => {
            // Warn if there are unsaved changes
            if (this.hasUnsavedChanges()) {
                e.preventDefault();
                e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            }
        });

        // Handle resize events
        window.addEventListener('resize', this.debounce(() => {
            if (window.chartManager) {
                window.chartManager.updateAllCharts();
            }
        }, 250));

        // Handle context menu (prevent on charts)
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('canvas')) {
                e.preventDefault();
            }
        });
    }

    // Initialize theme system
    initializeTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Add dark mode support (optional enhancement)
        prefersDark.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    }

    // Initialize keyboard shortcuts
    initializeKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Global shortcuts
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 's':
                        e.preventDefault();
                        this.exportData();
                        break;
                    case 'o':
                        e.preventDefault();
                        this.importData();
                        break;
                    case 'l':
                        e.preventDefault();
                        this.clearAllData();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.refreshData();
                        break;
                }
            }
            
            // Help dialog
            if (e.key === '?' && e.shiftKey) {
                e.preventDefault();
                this.showHelpDialog();
            }
        });
    }

    // Initialize drag and drop for file imports
    initializeDragAndDrop() {
        const dropZone = document.body;
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        
        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type === 'application/json') {
                this.importData(files[0]);
            }
        });
    }

    // Initialize offline support
    initializeOfflineSupport() {
        if ('serviceWorker' in navigator) {
            // Service worker setup is handled separately
        }
        
        // Store data in localStorage for offline access
        this.setupOfflineStorage();
    }

    // Setup offline storage
    setupOfflineStorage() {
        // Ensure data is saved periodically
        setInterval(() => {
            if (window.dataManager) {
                window.dataManager.saveData();
            }
        }, 30000); // Every 30 seconds
    }

    // Setup service worker
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then((registration) => {
                    console.log('ServiceWorker registration successful');
                })
                .catch((error) => {
                    console.log('ServiceWorker registration failed');
                });
        }
    }

    // Setup analytics (optional)
    setupAnalytics() {
        // Google Analytics or other tracking can be added here
        // For now, we'll just log page views
        console.log('Page viewed:', window.location.pathname);
    }

    // Show welcome message for first-time users
    showWelcomeMessage() {
        const hasVisited = localStorage.getItem('moneyTrackerVisited');
        
        if (!hasVisited) {
            setTimeout(() => {
                this.showInfoMessage(`
                    <h3>Welcome to Money Tracker! 🎉</h3>
                    <p>Start tracking your expenses with style:</p>
                    <ul style="text-align: left; margin: 1rem 0;">
                        <li>💰 Add expenses using the quick form</li>
                        <li>📊 View beautiful charts and insights</li>
                        <li>🔍 Filter and search transactions</li>
                        <li>⌨️ Use keyboard shortcuts (Ctrl+N for new expense)</li>
                        <li>💾 Export your data anytime</li>
                    </ul>
                    <p>Press <kbd>?</kbd> anytime for help!</p>
                `, 10000);
                
                localStorage.setItem('moneyTrackerVisited', 'true');
            }, 1000);
        }
    }

    // Show help dialog
    showHelpDialog() {
        const helpContent = `
            <h3>Keyboard Shortcuts</h3>
            <table style="width: 100%; text-align: left;">
                <tr><td><kbd>Ctrl+N</kbd></td><td>New expense</td></tr>
                <tr><td><kbd>Ctrl+E</kbd></td><td>Export data</td></tr>
                <tr><td><kbd>Ctrl+I</kbd></td><td>Import data</td></tr>
                <tr><td><kbd>Ctrl+R</kbd></td><td>Refresh data</td></tr>
                <tr><td><kbd>Esc</kbd></td><td>Close modal</td></tr>
                <tr><td><kbd>?</kbd></td><td>Show help</td></tr>
            </table>
            <h3>Tips</h3>
            <ul style="text-align: left;">
                <li>Drag and drop JSON files to import data</li>
                <li>Click on charts to see detailed information</li>
                <li>Use filters to focus on specific categories</li>
                <li>Data is automatically saved locally</li>
            </ul>
        `;
        
        this.showInfoMessage(helpContent, 15000);
    }

    // Refresh all data
    refreshData() {
        if (window.uiController) {
            window.uiController.updateUI();
        }
        
        this.showSuccessMessage('Data refreshed!', 2000);
    }

    // Export data
    exportData() {
        if (window.uiController) {
            window.uiController.exportData();
        }
    }

    // Import data
    importData(file) {
        if (window.uiController) {
            if (file) {
                window.uiController.importData(file);
            } else {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => window.uiController.importData(e.target.files[0]);
                input.click();
            }
        }
    }

    // Clear all data
    clearAllData() {
        if (window.uiController) {
            window.uiController.clearAllData();
        }
    }

    // Sync data (when coming back online)
    syncData() {
        // This would sync with a backend server if one existed
        console.log('Syncing data...');
    }

    // Check for unsaved changes
    hasUnsavedChanges() {
        // Check if any forms have unsaved data
        const quickAddForm = document.getElementById('quickAddForm');
        const editForm = document.getElementById('editForm');
        
        return quickAddForm && quickAddForm.checkValidity() && 
               quickAddForm.querySelector('input:not([value=""])') ||
               editForm && editForm.style.display !== 'none';
    }

    // Message display methods
    showSuccessMessage(message, duration = 3000) {
        if (window.uiController) {
            window.uiController.showMessage(message, 'success');
        }
    }

    showErrorMessage(message, duration = 5000) {
        if (window.uiController) {
            window.uiController.showMessage(message, 'error');
        }
    }

    showWarningMessage(message, duration = 4000) {
        if (window.uiController) {
            window.uiController.showMessage(message, 'warning');
        }
    }

    showInfoMessage(message, duration = 5000) {
        if (window.uiController) {
            window.uiController.showMessage(message, 'info');
        }
    }

    // Utility function: debounce
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Get app version
    getVersion() {
        return '1.0.0';
    }

    // Get app info
    getAppInfo() {
        return {
            name: 'Money Tracker',
            version: this.getVersion(),
            description: 'A beautiful spending tracker with soft pink pastel theme',
            author: 'Money Tracker Team',
            features: [
                'Expense tracking',
                'Beautiful charts',
                'Data export/import',
                'Offline support',
                'Responsive design'
            ]
        };
    }
}

// Initialize the app when the script loads
window.moneyTrackerApp = new MoneyTrackerApp();

// Make some functions globally available for debugging
window.debugApp = {
    getDataManager: () => window.dataManager,
    getChartManager: () => window.chartManager,
    getUIController: () => window.uiController,
    getApp: () => window.moneyTrackerApp,
    exportData: () => window.moneyTrackerApp.exportData(),
    clearData: () => window.moneyTrackerApp.clearAllData(),
    showHelp: () => window.moneyTrackerApp.showHelpDialog()
};

// Console welcome message
console.log('%c🎉 Money Tracker v1.0.0', 'color: #FFB3C1; font-size: 20px; font-weight: bold;');
console.log('%cTrack your spending with style! 💰✨', 'color: #FFC2D1; font-size: 14px;');
console.log('%cType debugApp.showHelp() for keyboard shortcuts', 'color: #FFE5EC; font-size: 12px;');
