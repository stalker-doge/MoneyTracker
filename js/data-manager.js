// Data Manager - Handles all data operations and LocalStorage
class DataManager {
    constructor() {
        this.storageKey = 'moneyTrackerData';
        this.budgetStorageKey = 'moneyTrackerBudget';
        this.goalsStorageKey = 'moneyTrackerGoals';
        this.budgetsStorageKey = 'moneyTrackerBudgets';
        this.settingsStorageKey = 'moneyTrackerSettings';
        this.activeBudgetStorageKey = 'moneyTrackerActiveBudget';
        this.transactions = [];
        this.budgets = [];
        this.goals = [];
        this.activeBudgetId = 'default';
        this.budget = 1000; // Default monthly budget
        this.currency = 'GBP'; // Default currency
        this.currencySettings = {
            code: 'GBP',
            symbol: '£',
            locale: 'en-GB',
            symbolPosition: 'before' // 'before' or 'after'
        };
        this.initializeData();
    }

    // Initialize data from LocalStorage or create default data
    initializeData() {
        const storedData = localStorage.getItem(this.storageKey);
        const storedBudget = localStorage.getItem(this.budgetStorageKey);
        const storedCurrencySettings = localStorage.getItem('moneyTrackerCurrency');
        
        if (storedData) {
            try {
                this.transactions = JSON.parse(storedData);
            } catch (error) {
                console.error('Error parsing stored data:', error);
                this.transactions = this.createSampleData();
            }
        } else {
            this.transactions = this.createSampleData();
        }

        if (storedBudget) {
            this.budget = parseFloat(storedBudget);
        }

        // Load currency settings
        if (storedCurrencySettings) {
            try {
                this.currencySettings = JSON.parse(storedCurrencySettings);
            } catch (error) {
                console.error('Error parsing currency settings:', error);
                // Keep default settings
            }
        }

        this.saveData();
    }

    // Create sample data for demonstration
    createSampleData() {
        const sampleTransactions = [
            {
                id: this.generateId(),
                amount: 25.50,
                category: 'food',
                description: 'Lunch at cafe',
                date: new Date().toISOString().split('T')[0]
            },
            {
                id: this.generateId(),
                amount: 45.00,
                category: 'transport',
                description: 'Gas for car',
                date: new Date(Date.now() - 86400000).toISOString().split('T')[0]
            },
            {
                id: this.generateId(),
                amount: 120.00,
                category: 'shopping',
                description: 'New shoes',
                date: new Date(Date.now() - 172800000).toISOString().split('T')[0]
            },
            {
                id: this.generateId(),
                amount: 15.99,
                category: 'entertainment',
                description: 'Movie tickets',
                date: new Date(Date.now() - 259200000).toISOString().split('T')[0]
            },
            {
                id: this.generateId(),
                amount: 200.00,
                category: 'bills',
                description: 'Electricity bill',
                date: new Date(Date.now() - 345600000).toISOString().split('T')[0]
            }
        ];

        return sampleTransactions;
    }

    // Generate unique ID for transactions
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Save data to LocalStorage
    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.transactions));
        localStorage.setItem(this.budgetStorageKey, this.budget.toString());
        localStorage.setItem('moneyTrackerCurrency', JSON.stringify(this.currencySettings));
    }

    // Get available currencies
    getAvailableCurrencies() {
        return [
            { code: 'USD', symbol: '$', locale: 'en-US', name: 'US Dollar' },
            { code: 'EUR', symbol: '€', locale: 'de-DE', name: 'Euro' },
            { code: 'GBP', symbol: '£', locale: 'en-GB', name: 'British Pound' },
            { code: 'JPY', symbol: '¥', locale: 'ja-JP', name: 'Japanese Yen' },
            { code: 'CAD', symbol: 'C$', locale: 'en-CA', name: 'Canadian Dollar' },
            { code: 'AUD', symbol: 'A$', locale: 'en-AU', name: 'Australian Dollar' },
            { code: 'CHF', symbol: 'Fr', locale: 'de-CH', name: 'Swiss Franc' },
            { code: 'CNY', symbol: '¥', locale: 'zh-CN', name: 'Chinese Yuan' },
            { code: 'INR', symbol: '₹', locale: 'en-IN', name: 'Indian Rupee' },
            { code: 'KRW', symbol: '₩', locale: 'ko-KR', name: 'South Korean Won' },
            { code: 'BRL', symbol: 'R$', locale: 'pt-BR', name: 'Brazilian Real' },
            { code: 'MXN', symbol: '$', locale: 'es-MX', name: 'Mexican Peso' },
            { code: 'SEK', symbol: 'kr', locale: 'sv-SE', name: 'Swedish Krona' },
            { code: 'NOK', symbol: 'kr', locale: 'nb-NO', name: 'Norwegian Krone' },
            { code: 'DKK', symbol: 'kr', locale: 'da-DK', name: 'Danish Krone' },
            { code: 'SGD', symbol: 'S$', locale: 'en-SG', name: 'Singapore Dollar' },
            { code: 'HKD', symbol: 'HK$', locale: 'en-HK', name: 'Hong Kong Dollar' },
            { code: 'NZD', symbol: 'NZ$', locale: 'en-NZ', name: 'New Zealand Dollar' },
            { code: 'ZAR', symbol: 'R', locale: 'en-ZA', name: 'South African Rand' },
            { code: 'RUB', symbol: '₽', locale: 'ru-RU', name: 'Russian Ruble' }
        ];
    }

    // Get current currency settings
    getCurrencySettings() {
        return { ...this.currencySettings };
    }

    // Update currency settings
    updateCurrencySettings(newSettings) {
        if (newSettings.code) {
            // Find preset currency or use custom settings
            const presetCurrency = this.getAvailableCurrencies().find(c => c.code === newSettings.code);
            
            if (presetCurrency) {
                this.currencySettings = {
                    code: presetCurrency.code,
                    symbol: presetCurrency.symbol,
                    locale: presetCurrency.locale,
                    symbolPosition: this.getSymbolPosition(presetCurrency.locale)
                };
            } else {
                // Custom currency
                this.currencySettings = {
                    code: newSettings.code,
                    symbol: newSettings.symbol || newSettings.code,
                    locale: newSettings.locale || 'en-US',
                    symbolPosition: newSettings.symbolPosition || 'before'
                };
            }
        } else if (newSettings.symbol) {
            // Custom symbol only
            this.currencySettings.symbol = newSettings.symbol;
            this.currencySettings.symbolPosition = newSettings.symbolPosition || 'before';
        }

        this.saveData();
    }

    // Get symbol position based on locale
    getSymbolPosition(locale) {
        const beforeLocales = ['en-US', 'en-GB', 'en-CA', 'en-AU', 'en-SG', 'en-HK', 'en-NZ', 'pt-BR', 'es-MX'];
        return beforeLocales.includes(locale) ? 'before' : 'after';
    }

    // Format amount with current currency
    formatCurrency(amount) {
        try {
            return new Intl.NumberFormat(this.currencySettings.locale, {
                style: 'currency',
                currency: this.currencySettings.code
            }).format(amount);
        } catch (error) {
            // Fallback to manual formatting if Intl fails
            const formattedAmount = amount.toFixed(2);
            if (this.currencySettings.symbolPosition === 'after') {
                return `${formattedAmount} ${this.currencySettings.symbol}`;
            } else {
                return `${this.currencySettings.symbol}${formattedAmount}`;
            }
        }
    }

    // Add new transaction
    addTransaction(transaction) {
        const newTransaction = {
            id: this.generateId(),
            ...transaction,
            date: transaction.date || new Date().toISOString().split('T')[0]
        };

        this.transactions.unshift(newTransaction);
        this.saveData();
        return newTransaction;
    }

    // Update existing transaction
    updateTransaction(id, updatedData) {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index !== -1) {
            this.transactions[index] = {
                ...this.transactions[index],
                ...updatedData
            };
            this.saveData();
            return this.transactions[index];
        }
        return null;
    }

    // Delete transaction
    deleteTransaction(id) {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index !== -1) {
            const deleted = this.transactions.splice(index, 1)[0];
            this.saveData();
            return deleted;
        }
        return null;
    }

    // Get all transactions
    getAllTransactions() {
        return [...this.transactions];
    }

    // Get transaction by ID
    getTransactionById(id) {
        return this.transactions.find(t => t.id === id);
    }

    // Get filtered transactions
    getFilteredTransactions(filters = {}) {
        let filtered = [...this.transactions];

        // Filter by category
        if (filters.category && filters.category !== '') {
            filtered = filtered.filter(t => t.category === filters.category);
        }

        // Filter by month
        if (filters.month) {
            const [year, month] = filters.month.split('-');
            filtered = filtered.filter(t => {
                const transactionDate = new Date(t.date);
                return transactionDate.getFullYear() === parseInt(year) && 
                       transactionDate.getMonth() === parseInt(month) - 1;
            });
        }

        // Filter by date range
        if (filters.startDate) {
            filtered = filtered.filter(t => t.date >= filters.startDate);
        }

        if (filters.endDate) {
            filtered = filtered.filter(t => t.date <= filters.endDate);
        }

        // Sort by date (newest first)
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        return filtered;
    }

    // Get transactions for current month
    getCurrentMonthTransactions() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        
        return this.transactions.filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate.getFullYear() === year && 
                   transactionDate.getMonth() === month;
        });
    }

    // Calculate summary statistics
    getSummaryStats() {
        const transactions = this.getAllTransactions();
        
        if (transactions.length === 0) {
            return {
                totalSpent: 0,
                dailyAverage: 0,
                biggestExpense: 0,
                transactionCount: 0
            };
        }

        const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
        const transactionCount = transactions.length;
        const biggestExpense = Math.max(...transactions.map(t => t.amount));
        
        // Calculate daily average based on date range
        const dates = transactions.map(t => t.date);
        const minDate = new Date(Math.min(...dates.map(d => new Date(d))));
        const maxDate = new Date(Math.max(...dates.map(d => new Date(d))));
        const daysDiff = Math.max(1, Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1);
        const dailyAverage = totalSpent / daysDiff;

        return {
            totalSpent,
            dailyAverage,
            biggestExpense,
            transactionCount
        };
    }

    // Get spending by category
    getSpendingByCategory() {
        const categoryTotals = {};
        
        this.transactions.forEach(transaction => {
            if (!categoryTotals[transaction.category]) {
                categoryTotals[transaction.category] = 0;
            }
            categoryTotals[transaction.category] += transaction.amount;
        });

        return categoryTotals;
    }

    // Get monthly spending data
    getMonthlySpending() {
        const monthlyData = {};
        
        this.transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = 0;
            }
            monthlyData[monthKey] += transaction.amount;
        });

        return monthlyData;
    }

    // Get spending trend data (last 30 days)
    getSpendingTrend() {
        const trendData = {};
        const today = new Date();
        
        // Initialize last 30 days
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateKey = date.toISOString().split('T')[0];
            trendData[dateKey] = 0;
        }

        // Fill with actual spending
        this.transactions.forEach(transaction => {
            if (trendData.hasOwnProperty(transaction.date)) {
                trendData[transaction.date] += transaction.amount;
            }
        });

        return trendData;
    }

    // Get budget information
    getBudgetInfo() {
        const currentMonthSpending = this.getCurrentMonthTransactions()
            .reduce((sum, t) => sum + t.amount, 0);
        
        return {
            budget: this.budget,
            spent: currentMonthSpending,
            remaining: this.budget - currentMonthSpending,
            percentage: (currentMonthSpending / this.budget) * 100
        };
    }

    // Update budget
    updateBudget(newBudget) {
        this.budget = parseFloat(newBudget);
        this.saveData();
    }

    // Export data to JSON
    exportData() {
        const data = {
            transactions: this.transactions,
            budget: this.budget,
            currency: this.currencySettings,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `money-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Export data to CSV
    exportToCSV(filters = {}) {
        const transactions = this.getFilteredTransactions(filters);
        
        if (transactions.length === 0) {
            throw new Error('No transactions to export');
        }
        
        const headers = ['Date', 'Description', 'Category', 'Amount'];
        const csvRows = [
            headers.join(','),
            ...transactions.map(transaction => [
                transaction.date,
                `"${this.escapeCsvField(transaction.description)}"`,
                transaction.category,
                transaction.amount.toFixed(2)
            ])
        ];
        
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `money-tracker-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Import data from CSV
    importFromCSV(csvData) {
        try {
            const lines = csvData.split('\n').filter(line => line.trim());
            
            if (lines.length < 2) {
                throw new Error('CSV file is empty or invalid');
            }
            
            const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
            const requiredHeaders = ['date', 'description', 'category', 'amount'];
            
            // Check if all required headers are present
            for (const header of requiredHeaders) {
                if (!headers.includes(header)) {
                    throw new Error(`Missing required header: ${header}`);
                }
            }
            
            const transactions = [];
            
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(v => v.trim());
                
                if (values.length !== headers.length) {
                    throw new Error(`Row ${i} has incorrect number of columns`);
                }
                
                const transaction = {};
                headers.forEach((header, index) => {
                    const value = values[index];
                    
                    // Remove quotes if present
                    const cleanValue = value.startsWith('"') && value.endsWith('"') 
                        ? value.slice(1, -1) 
                        : value;
                    
                    switch (header) {
                        case 'date':
                            transaction.date = this.validateDate(cleanValue);
                            break;
                        case 'description':
                            transaction.description = cleanValue;
                            break;
                        case 'category':
                            transaction.category = this.validateCategory(cleanValue);
                            break;
                        case 'amount':
                            transaction.amount = parseFloat(cleanValue);
                            break;
                    }
                });
                
                // Validate transaction
                this.validateTransaction(transaction);
                transactions.push(transaction);
            }
            
            // Add transactions to existing data
            transactions.forEach(transaction => {
                this.addTransaction(transaction);
            });
            
            return true;
        } catch (error) {
            console.error('Error importing CSV:', error);
            throw error;
        }
    }

    // Escape CSV field to handle commas and quotes
    escapeCsvField(field) {
        if (field.includes(',') || field.includes('"') || field.includes('\n')) {
            return `"${field.replace(/"/g, '""')}"`;
        }
        return field;
    }

    // Validate date format
    validateDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date format: ${dateString}`);
        }
        return date.toISOString().split('T')[0];
    }

    // Validate category
    validateCategory(category) {
        const validCategories = ['food', 'transport', 'entertainment', 'shopping', 'bills', 'health', 'education', 'other'];
        const normalizedCategory = category.toLowerCase().trim();
        
        if (!validCategories.includes(normalizedCategory)) {
            throw new Error(`Invalid category: ${category}`);
        }
        
        return normalizedCategory;
    }

    // Validate transaction
    validateTransaction(transaction) {
        if (!transaction.date) {
            throw new Error('Transaction date is required');
        }
        if (!transaction.description) {
            throw new Error('Transaction description is required');
        }
        if (!transaction.category) {
            throw new Error('Transaction category is required');
        }
        if (isNaN(transaction.amount) || transaction.amount <= 0) {
            throw new Error('Transaction amount must be a positive number');
        }
    }

    // Import data from JSON
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.transactions && Array.isArray(data.transactions)) {
                this.transactions = data.transactions;
            }
            
            if (data.budget && !isNaN(data.budget)) {
                this.budget = parseFloat(data.budget);
            }
            
            this.saveData();
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    // Clear all data
    clearAllData() {
        this.transactions = [];
        this.budget = 1000;
        this.saveData();
    }

    // Get category display name
    getCategoryDisplayName(category) {
        const categoryNames = {
            food: '🍔 Food',
            transport: '🚗 Transport',
            entertainment: '🎬 Entertainment',
            shopping: '🛍️ Shopping',
            bills: '📄 Bills',
            health: '💊 Health',
            education: '📚 Education',
            other: '📦 Other'
        };
        
        return categoryNames[category] || category;
    }

    // Get category colors for charts
    getCategoryColors() {
        return {
            food: '#FF6B9D',
            transport: '#C9E4DE',
            entertainment: '#FFC8DD',
            shopping: '#FFAFCC',
            bills: '#BDE0FE',
            health: '#A2D2FF',
            education: '#FEC89A',
            other: '#E5E5E5'
        };
    }
}

// Initialize global data manager
window.dataManager = new DataManager();
