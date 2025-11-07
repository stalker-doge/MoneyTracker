// UI Controller - Handles all user interactions and DOM manipulation
class UIController {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.updateUI();
    }

        // Initialize DOM elements
        initializeElements() {
            // Forms
            this.quickAddForm = document.getElementById('quickAddForm');
            this.editForm = document.getElementById('editForm');
            this.budgetForm = document.getElementById('budgetForm');
            this.settingsForm = document.getElementById('settingsForm');
            
            // Inputs
            this.expenseAmount = document.getElementById('expenseAmount');
            this.expenseCategory = document.getElementById('expenseCategory');
            this.expenseDescription = document.getElementById('expenseDescription');
            this.expenseDate = document.getElementById('expenseDate');
            
            // Edit modal inputs
            this.editId = document.getElementById('editId');
            this.editAmount = document.getElementById('editAmount');
            this.editCategory = document.getElementById('editCategory');
            this.editDescription = document.getElementById('editDescription');
            this.editDate = document.getElementById('editDate');
            
            // Budget modal inputs
            this.newBudgetAmount = document.getElementById('newBudgetAmount');
            this.currentBudgetDisplay = document.getElementById('currentBudgetDisplay');
            this.currentSpendingDisplay = document.getElementById('currentSpendingDisplay');
            this.newRemainingDisplay = document.getElementById('newRemainingDisplay');
            
            // Settings modal inputs
            this.currencySelect = document.getElementById('currencySelect');
            this.customCurrencyFields = document.getElementById('customCurrencyFields');
            this.customCurrencyCode = document.getElementById('customCurrencyCode');
            this.customCurrencySymbol = document.getElementById('customCurrencySymbol');
            this.symbolPosition = document.getElementById('symbolPosition');
            this.currencyPreview = document.getElementById('currencyPreview');
            
            // Filters
            this.categoryFilter = document.getElementById('categoryFilter');
            this.monthFilter = document.getElementById('monthFilter');
            
            // Display elements
            this.totalSpent = document.getElementById('totalSpent');
            this.dailyAverage = document.getElementById('dailyAverage');
            this.biggestExpense = document.getElementById('biggestExpense');
            this.transactionCount = document.getElementById('transactionCount');
            this.transactionsList = document.getElementById('transactionsList');
            
            // Budget display elements
            this.budgetAmount = document.getElementById('budgetAmount');
            this.spentThisMonth = document.getElementById('spentThisMonth');
            this.remainingBudget = document.getElementById('remainingBudget');
            this.budgetProgress = document.getElementById('budgetProgress');
            this.budgetProgressText = document.getElementById('budgetProgressText');
            
            // Modals
            this.editModal = document.getElementById('editModal');
            this.budgetModal = document.getElementById('budgetModal');
            this.settingsModal = document.getElementById('settingsModal');
            this.importModal = document.getElementById('importModal');
            this.csvImportModal = document.getElementById('csvImportModal');
            this.closeModal = document.querySelector('.close');
            this.settingsToggle = document.getElementById('settingsToggle');
            
            // Import form elements
            this.importForm = document.getElementById('importForm');
            this.importFile = document.getElementById('importFile');
            this.replaceData = document.getElementById('replaceData');
            
            // CSV import form elements
            this.csvImportForm = document.getElementById('csvImportForm');
            this.csvImportFile = document.getElementById('csvImportFile');
            this.csvReplaceData = document.getElementById('csvReplaceData');
            
            // Set today's date as default
            const today = new Date().toISOString().split('T')[0];
            this.expenseDate.value = today;
        }

    // Bind event listeners
    bindEvents() {
        // Form submissions
        this.quickAddForm.addEventListener('submit', (e) => this.handleQuickAdd(e));
        this.editForm.addEventListener('submit', (e) => this.handleEditSubmit(e));
        this.budgetForm.addEventListener('submit', (e) => this.handleBudgetSubmit(e));
        this.settingsForm.addEventListener('submit', (e) => this.handleSettingsSubmit(e));
        this.importForm.addEventListener('submit', (e) => this.handleImportSubmit(e));
        this.csvImportForm.addEventListener('submit', (e) => this.handleCSVImportSubmit(e));
        
        // Settings form input changes
        this.currencySelect.addEventListener('change', () => this.handleCurrencyChange());
        this.customCurrencyCode.addEventListener('input', () => this.updateCurrencyPreview());
        this.customCurrencySymbol.addEventListener('input', () => this.updateCurrencyPreview());
        this.symbolPosition.addEventListener('change', () => this.updateCurrencyPreview());
        
        // Budget form input change
        this.newBudgetAmount.addEventListener('input', () => this.updateBudgetPreview());
        
        // Settings toggle
        this.settingsToggle.addEventListener('click', () => this.showSettingsModal());
        
        // Filters
        this.categoryFilter.addEventListener('change', () => this.updateTransactionsList());
        this.monthFilter.addEventListener('change', () => this.updateTransactionsList());
        
        // Modal controls
        this.closeModal.addEventListener('click', () => this.closeEditModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.editModal) {
                this.closeEditModal();
            }
            if (e.target === this.budgetModal) {
                this.closeBudgetModal();
            }
            if (e.target === this.settingsModal) {
                this.closeSettingsModal();
            }
            if (e.target === this.importModal) {
                this.closeImportModal();
            }
            if (e.target === this.csvImportModal) {
                this.closeCSVImportModal();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeEditModal();
                this.closeBudgetModal();
                this.closeSettingsModal();
                this.closeImportModal();
                this.closeCSVImportModal();
            }
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                this.expenseAmount.focus();
            }
        });
        
        // Form validation
        this.expenseAmount.addEventListener('input', () => this.validateAmount(this.expenseAmount));
        this.editAmount.addEventListener('input', () => this.validateAmount(this.editAmount));
        this.newBudgetAmount.addEventListener('input', () => this.validateAmount(this.newBudgetAmount));
    }

    // Validate amount input
    validateAmount(input) {
        const value = parseFloat(input.value);
        if (isNaN(value) || value <= 0) {
            input.setCustomValidity('Please enter a valid positive amount');
        } else {
            input.setCustomValidity('');
        }
    }

    // Handle quick add form submission
    handleQuickAdd(e) {
        e.preventDefault();
        
        const transaction = {
            amount: parseFloat(this.expenseAmount.value),
            category: this.expenseCategory.value,
            description: this.expenseDescription.value,
            date: this.expenseDate.value
        };
        
        // Add transaction
        window.dataManager.addTransaction(transaction);
        
        // Show success message
        this.showMessage('Expense added successfully!', 'success');
        
        // Reset form
        this.quickAddForm.reset();
        this.expenseDate.value = new Date().toISOString().split('T')[0];
        
        // Update UI
        this.updateUI();
    }

    // Handle edit form submission
    handleEditSubmit(e) {
        e.preventDefault();
        
        const updatedTransaction = {
            amount: parseFloat(this.editAmount.value),
            category: this.editCategory.value,
            description: this.editDescription.value,
            date: this.editDate.value
        };
        
        // Update transaction
        const success = window.dataManager.updateTransaction(this.editId.value, updatedTransaction);
        
        if (success) {
            this.showMessage('Transaction updated successfully!', 'success');
            this.closeEditModal();
            this.updateUI();
        } else {
            this.showMessage('Error updating transaction', 'error');
        }
    }

    // Update all UI elements
    updateUI() {
        this.updateSummaryCards();
        this.updateBudgetSection();
        this.updateTransactionsList();
        if (window.chartManager) {
            window.chartManager.updateAllCharts();
        }
    }

    // Update summary cards
    updateSummaryCards() {
        const stats = window.dataManager.getSummaryStats();
        
        this.totalSpent.textContent = this.formatCurrency(stats.totalSpent);
        this.dailyAverage.textContent = this.formatCurrency(stats.dailyAverage);
        this.biggestExpense.textContent = this.formatCurrency(stats.biggestExpense);
        this.transactionCount.textContent = stats.transactionCount;
        
        // Add animations
        this.animateValue(this.totalSpent, 0, stats.totalSpent, 1000);
        this.animateValue(this.dailyAverage, 0, stats.dailyAverage, 1000);
        this.animateValue(this.biggestExpense, 0, stats.biggestExpense, 1000);
        this.animateValue(this.transactionCount, 0, stats.transactionCount, 1000);
    }

    // Update budget section
    updateBudgetSection() {
        const budgetInfo = window.dataManager.getBudgetInfo();
        
        // Update budget display
        this.budgetAmount.textContent = this.formatCurrency(budgetInfo.budget);
        this.spentThisMonth.textContent = this.formatCurrency(budgetInfo.spent);
        this.remainingBudget.textContent = this.formatCurrency(budgetInfo.remaining);
        
        // Update progress bar
        const percentage = Math.min(budgetInfo.percentage, 100);
        this.budgetProgress.style.width = percentage + '%';
        this.budgetProgressText.textContent = percentage.toFixed(1) + '%';
        
        // Update progress bar color based on percentage
        this.budgetProgress.className = 'progress-fill';
        if (percentage >= 90) {
            this.budgetProgress.classList.add('danger');
        } else if (percentage >= 70) {
            this.budgetProgress.classList.add('warning');
        }
        
        // Update remaining budget color
        this.remainingBudget.className = 'budget-value';
        if (budgetInfo.remaining < 0) {
            this.remainingBudget.classList.add('danger');
        } else if (budgetInfo.remaining < budgetInfo.budget * 0.3) {
            this.remainingBudget.classList.add('warning');
        }
    }

    // Show budget modal
    showBudgetModal() {
        const budgetInfo = window.dataManager.getBudgetInfo();
        
        // Populate modal with current values
        this.currentBudgetDisplay.textContent = this.formatCurrency(budgetInfo.budget);
        this.currentSpendingDisplay.textContent = this.formatCurrency(budgetInfo.spent);
        this.newBudgetAmount.value = budgetInfo.budget;
        
        // Update new remaining display
        this.updateBudgetPreview();
        
        // Show modal
        this.budgetModal.style.display = 'block';
        
        // Focus on amount field
        setTimeout(() => this.newBudgetAmount.focus(), 100);
    }

    // Close budget modal
    closeBudgetModal() {
        this.budgetModal.style.display = 'none';
        this.budgetForm.reset();
    }

    // Update budget preview
    updateBudgetPreview() {
        const newBudget = parseFloat(this.newBudgetAmount.value) || 0;
        const currentSpending = window.dataManager.getBudgetInfo().spent;
        const newRemaining = newBudget - currentSpending;
        
        this.newRemainingDisplay.textContent = this.formatCurrency(newRemaining);
        
        // Update color based on remaining amount
        this.newRemainingDisplay.className = '';
        if (newRemaining < 0) {
            this.newRemainingDisplay.style.color = '#FF6B6B';
        } else if (newRemaining < newBudget * 0.3) {
            this.newRemainingDisplay.style.color = '#FFA500';
        } else {
            this.newRemainingDisplay.style.color = '#FFB3C1';
        }
    }

    // Handle budget form submission
    handleBudgetSubmit(e) {
        e.preventDefault();
        
        const newBudget = parseFloat(this.newBudgetAmount.value);
        
        if (isNaN(newBudget) || newBudget <= 0) {
            this.showMessage('Please enter a valid budget amount', 'error');
            return;
        }
        
        // Update budget
        this.updateBudget(newBudget);
        
        // Close modal
        this.closeBudgetModal();
    }

    // Update transactions list
    updateTransactionsList() {
        const filters = {
            category: this.categoryFilter.value,
            month: this.monthFilter.value
        };
        
        const transactions = window.dataManager.getFilteredTransactions(filters);
        
        if (transactions.length === 0) {
            this.transactionsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-receipt"></i>
                    <p>No transactions found</p>
                </div>
            `;
            return;
        }
        
        this.transactionsList.innerHTML = transactions.map(transaction => 
            this.createTransactionHTML(transaction)
        ).join('');
        
        // Bind transaction action events
        this.bindTransactionEvents();
    }

    // Create transaction HTML
    createTransactionHTML(transaction) {
        const categoryDisplay = window.dataManager.getCategoryDisplayName(transaction.category);
        const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        return `
            <div class="transaction-item" data-id="${transaction.id}">
                <div class="transaction-info">
                    <div class="transaction-description">${transaction.description}</div>
                    <div class="transaction-meta">
                        <span class="transaction-category">${categoryDisplay}</span>
                        <span>${formattedDate}</span>
                    </div>
                </div>
                <div class="transaction-amount">${this.formatCurrency(transaction.amount)}</div>
                <div class="transaction-actions">
                    <button class="btn-icon btn-edit" onclick="uiController.editTransaction('${transaction.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="uiController.deleteTransaction('${transaction.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // Bind transaction action events
    bindTransactionEvents() {
        // Events are bound via onclick attributes in the HTML
    }

    // Edit transaction
    editTransaction(id) {
        const transaction = window.dataManager.getTransactionById(id);
        if (!transaction) return;
        
        // Populate edit form
        this.editId.value = transaction.id;
        this.editAmount.value = transaction.amount;
        this.editCategory.value = transaction.category;
        this.editDescription.value = transaction.description;
        this.editDate.value = transaction.date;
        
        // Show modal
        this.editModal.style.display = 'block';
        
        // Focus on amount field
        setTimeout(() => this.editAmount.focus(), 100);
    }

    // Delete transaction
    deleteTransaction(id) {
        const transaction = window.dataManager.getTransactionById(id);
        if (!transaction) return;
        
        if (confirm(`Are you sure you want to delete "${transaction.description}"?`)) {
            const success = window.dataManager.deleteTransaction(id);
            if (success) {
                this.showMessage('Transaction deleted successfully!', 'success');
                this.updateUI();
            } else {
                this.showMessage('Error deleting transaction', 'error');
            }
        }
    }

    // Close edit modal
    closeEditModal() {
        this.editModal.style.display = 'none';
        this.editForm.reset();
    }

    // Show message
    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            ${message}
        `;
        
        // Insert at the top of the main content
        const main = document.querySelector('.main');
        main.insertBefore(messageDiv, main.firstChild);
        
        // Remove after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Format currency
    formatCurrency(amount) {
        return window.dataManager.formatCurrency(amount);
    }

    // Show settings modal
    showSettingsModal() {
        const currentSettings = window.dataManager.getCurrencySettings();
        
        // Populate modal with current values
        this.currencySelect.value = currentSettings.code;
        this.customCurrencyCode.value = currentSettings.code;
        this.customCurrencySymbol.value = currentSettings.symbol;
        this.symbolPosition.value = currentSettings.symbolPosition;
        
        // Show/hide custom fields based on selection
        this.handleCurrencyChange();
        
        // Update preview
        this.updateCurrencyPreview();
        
        // Show modal
        this.settingsModal.style.display = 'block';
        
        // Focus on currency select
        setTimeout(() => this.currencySelect.focus(), 100);
    }

    // Close settings modal
    closeSettingsModal() {
        this.settingsModal.style.display = 'none';
        this.settingsForm.reset();
    }

    // Handle currency change
    handleCurrencyChange() {
        const selectedValue = this.currencySelect.value;
        
        if (selectedValue === 'custom') {
            this.customCurrencyFields.style.display = 'block';
        } else {
            this.customCurrencyFields.style.display = 'none';
        }
        
        this.updateCurrencyPreview();
    }

    // Update currency preview
    updateCurrencyPreview() {
        const selectedValue = this.currencySelect.value;
        let previewSettings;
        
        if (selectedValue === 'custom') {
            previewSettings = {
                code: this.customCurrencyCode.value || 'USD',
                symbol: this.customCurrencySymbol.value || '$',
                symbolPosition: this.symbolPosition.value,
                locale: 'en-US'
            };
        } else if (selectedValue) {
            const currency = window.dataManager.getAvailableCurrencies().find(c => c.code === selectedValue);
            if (currency) {
                previewSettings = {
                    code: currency.code,
                    symbol: currency.symbol,
                    symbolPosition: window.dataManager.getSymbolPosition(currency.locale),
                    locale: currency.locale
                };
            }
        }
        
        if (previewSettings) {
            try {
                this.currencyPreview.textContent = new Intl.NumberFormat(previewSettings.locale, {
                    style: 'currency',
                    currency: previewSettings.code
                }).format(1234.56);
            } catch (error) {
                // Fallback to manual formatting
                const formattedAmount = '1234.56';
                if (previewSettings.symbolPosition === 'after') {
                    this.currencyPreview.textContent = `${formattedAmount} ${previewSettings.symbol}`;
                } else {
                    this.currencyPreview.textContent = `${previewSettings.symbol}${formattedAmount}`;
                }
            }
        } else {
            this.currencyPreview.textContent = '£1,234.56'; // Default fallback
        }
    }

    // Handle settings form submission
    handleSettingsSubmit(e) {
        e.preventDefault();
        
        const selectedValue = this.currencySelect.value;
        let newSettings;
        
        if (selectedValue === 'custom') {
            // Validate custom currency inputs
            const customCode = this.customCurrencyCode.value.trim();
            const customSymbol = this.customCurrencySymbol.value.trim();
            
            if (!customCode || customCode.length === 0) {
                this.showMessage('Please enter a currency code', 'error');
                return;
            }
            
            if (!customSymbol || customSymbol.length === 0) {
                this.showMessage('Please enter a currency symbol', 'error');
                return;
            }
            
            newSettings = {
                code: customCode.toUpperCase(),
                symbol: customSymbol,
                symbolPosition: this.symbolPosition.value,
                locale: 'en-US'
            };
        } else if (selectedValue) {
            newSettings = {
                code: selectedValue
            };
        } else {
            this.showMessage('Please select a currency', 'error');
            return;
        }
        
        // Update currency settings
        window.dataManager.updateCurrencySettings(newSettings);
        
        // Show success message
        this.showMessage('Currency settings updated successfully!', 'success');
        
        // Close modal
        this.closeSettingsModal();
        
        // Update entire UI to reflect new currency
        this.updateUI();
    }

    // Animate value counting
    animateValue(element, start, end, duration) {
        const startTime = performance.now();
        const endTime = startTime + duration;
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (end - start) * easeOutQuart;
            
            if (element.id === 'transactionCount') {
                element.textContent = Math.floor(current);
            } else {
                element.textContent = this.formatCurrency(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    }

    // Set current month in month filter
    setCurrentMonthFilter() {
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        this.monthFilter.value = currentMonth;
    }

    // Export data
    exportData() {
        window.dataManager.exportData();
        this.showMessage('Data exported successfully!', 'success');
    }

    // Export data to CSV
    exportToCSV() {
        try {
            window.dataManager.exportToCSV();
            this.showMessage('CSV data exported successfully!', 'success');
        } catch (error) {
            this.showMessage(`Error exporting CSV: ${error.message}`, 'error');
        }
    }

    // Import data
    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const success = window.dataManager.importData(e.target.result);
            if (success) {
                this.showMessage('Data imported successfully!', 'success');
                this.updateUI();
            } else {
                this.showMessage('Error importing data. Please check the file format.', 'error');
            }
        };
        reader.readAsText(file);
    }

    // Import CSV data
    importFromCSV(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                window.dataManager.importFromCSV(e.target.result);
                this.showMessage('CSV data imported successfully!', 'success');
                this.updateUI();
            } catch (error) {
                this.showMessage(`Error importing CSV: ${error.message}`, 'error');
            }
        };
        reader.readAsText(file);
    }

    // Handle CSV file import
    handleCSVImport(event) {
        const file = event.target.files[0];
        if (!file) {
            this.showMessage('Please select a CSV file', 'error');
            return;
        }

        if (!file.name.endsWith('.csv')) {
            this.showMessage('Please select a CSV file', 'error');
            return;
        }

        this.importFromCSV(file);
    }

    // Handle CSV export with current filters
    handleCSVExport() {
        try {
            // Get current filters
            const filters = {
                category: this.categoryFilter.value,
                month: this.monthFilter.value
            };
            
            window.dataManager.exportToCSV(filters);
            this.showMessage('CSV data exported successfully!', 'success');
        } catch (error) {
            this.showMessage(`Error exporting CSV: ${error.message}`, 'error');
        }
    }

    // Clear all data
    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            window.dataManager.clearAllData();
            this.showMessage('All data cleared successfully!', 'success');
            this.updateUI();
        }
    }

    // Update budget
    updateBudget(newBudget) {
        window.dataManager.updateBudget(newBudget);
        this.showMessage('Budget updated successfully!', 'success');
        this.updateUI();
    }

    // Add keyboard navigation
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + E: Export data
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.exportData();
            }
            
            // Ctrl/Cmd + I: Import data
            if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
                e.preventDefault();
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => this.importData(e.target.files[0]);
                input.click();
            }
        });
    }

    // Show import modal
    showImportModal() {
        // Show modal
        this.importModal.style.display = 'block';
        
        // Focus on file input
        setTimeout(() => this.importFile.focus(), 100);
    }

    // Close import modal
    closeImportModal() {
        this.importModal.style.display = 'none';
        this.importForm.reset();
    }

    // Show CSV import modal
    showCSVImportModal() {
        // Show modal
        this.csvImportModal.style.display = 'block';
        
        // Focus on file input
        setTimeout(() => this.csvImportFile.focus(), 100);
    }

    // Close CSV import modal
    closeCSVImportModal() {
        this.csvImportModal.style.display = 'none';
        this.csvImportForm.reset();
    }

    // Handle CSV import form submission
    handleCSVImportSubmit(e) {
        e.preventDefault();
        
        const file = this.csvImportFile.files[0];
        
        if (!file) {
            this.showMessage('Please select a CSV file', 'error');
            return;
        }
        
        if (!file.name.endsWith('.csv')) {
            this.showMessage('Please select a CSV file', 'error');
            return;
        }
        
        const replaceData = this.csvReplaceData.checked;
        
        // Read file and process import
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                // If replace data is checked, clear existing data first
                if (replaceData) {
                    window.dataManager.transactions = [];
                }
                
                // Import CSV data
                window.dataManager.importFromCSV(e.target.result);
                
                this.showMessage('CSV data imported successfully!', 'success');
                this.closeCSVImportModal();
                this.updateUI();
                
            } catch (error) {
                this.showMessage(`Error importing CSV: ${error.message}`, 'error');
            }
        };
        
        reader.onerror = () => {
            this.showMessage('Error reading file. Please try again.', 'error');
        };
        
        reader.readAsText(file);
    }

    // Handle import form submission
    handleImportSubmit(e) {
        e.preventDefault();
        
        const file = this.importFile.files[0];
        
        if (!file) {
            this.showMessage('Please select a file to import', 'error');
            return;
        }
        
        if (!file.name.endsWith('.json')) {
            this.showMessage('Please select a JSON file', 'error');
            return;
        }
        
        const replaceData = this.replaceData.checked;
        
        // Read file and process import
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = e.target.result;
                const data = JSON.parse(jsonData);
                
                // Validate data structure
                if (!this.validateImportData(data)) {
                    this.showMessage('Invalid file format. Please check the file structure.', 'error');
                    return;
                }
                
                // Import data
                if (replaceData) {
                    // Replace all existing data
                    window.dataManager.transactions = data.transactions || [];
                    if (data.budget && !isNaN(data.budget)) {
                        window.dataManager.budget = parseFloat(data.budget);
                    }
                } else {
                    // Merge with existing data
                    if (data.transactions && Array.isArray(data.transactions)) {
                        data.transactions.forEach(transaction => {
                            if (!window.dataManager.getTransactionById(transaction.id)) {
                                window.dataManager.addTransaction(transaction);
                            }
                        });
                    }
                    if (data.budget && !isNaN(data.budget)) {
                        window.dataManager.budget = parseFloat(data.budget);
                    }
                }
                
                // Save data
                window.dataManager.saveData();
                
                this.showMessage('Data imported successfully!', 'success');
                this.closeImportModal();
                this.updateUI();
                
            } catch (error) {
                console.error('Error parsing JSON:', error);
                this.showMessage('Error parsing JSON file. Please check the file format.', 'error');
            }
        };
        
        reader.onerror = () => {
            this.showMessage('Error reading file. Please try again.', 'error');
        };
        
        reader.readAsText(file);
    }

    // Validate import data structure
    validateImportData(data) {
        // Basic validation
        if (!data || typeof data !== 'object') {
            return false;
        }
        
        // Check if transactions exist and is an array
        if (data.transactions && !Array.isArray(data.transactions)) {
            return false;
        }
        
        // Validate transactions if they exist
        if (data.transactions) {
            for (const transaction of data.transactions) {
                if (!transaction.id || !transaction.amount || !transaction.category || !transaction.description || !transaction.date) {
                    return false;
                }
                
                // Validate amount is a positive number
                if (isNaN(transaction.amount) || transaction.amount <= 0) {
                    return false;
                }
                
                // Validate date format
                if (!/^\d{4}-\d{2}-\d{2}$/.test(transaction.date)) {
                    return false;
                }
                
                // Validate category
                const validCategories = ['food', 'transport', 'entertainment', 'shopping', 'bills', 'health', 'education', 'other'];
                if (!validCategories.includes(transaction.category)) {
                    return false;
                }
            }
        }
        
        // Validate budget if it exists
        if (data.budget && (isNaN(data.budget) || data.budget <= 0)) {
            return false;
        }
        
        return true;
    }

    // Initialize tooltips
    initializeTooltips() {
        // Add tooltips to buttons with title attributes
        const elementsWithTooltip = document.querySelectorAll('[title]');
        elementsWithTooltip.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = e.target.getAttribute('title');
                tooltip.style.position = 'absolute';
                tooltip.style.background = '#5D4E60';
                tooltip.style.color = 'white';
                tooltip.style.padding = '0.5rem';
                tooltip.style.borderRadius = '6px';
                tooltip.style.fontSize = '0.8rem';
                tooltip.style.zIndex = '1000';
                tooltip.style.pointerEvents = 'none';
                
                document.body.appendChild(tooltip);
                
                const rect = e.target.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
                
                e.target.tooltip = tooltip;
            });
            
            element.addEventListener('mouseleave', (e) => {
                if (e.target.tooltip) {
                    e.target.tooltip.remove();
                    delete e.target.tooltip;
                }
            });
        });
    }
}

// Initialize global UI controller
window.uiController = new UIController();

// Global functions for onclick handlers
window.closeEditModal = () => window.uiController.closeEditModal();
window.closeBudgetModal = () => window.uiController.closeBudgetModal();
window.closeSettingsModal = () => window.uiController.closeSettingsModal();
window.closeImportModal = () => window.uiController.closeImportModal();
window.closeCSVImportModal = () => window.uiController.closeCSVImportModal();
