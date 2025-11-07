// Chart Configuration - Handles all Chart.js visualizations
class ChartManager {
    constructor() {
        this.charts = {};
        this.categoryColors = {
            food: '#FF6B9D',
            transport: '#C9E4DE',
            entertainment: '#FFC8DD',
            shopping: '#FFAFCC',
            bills: '#BDE0FE',
            health: '#A2D2FF',
            education: '#FEC89A',
            other: '#E5E5E5'
        };
        this.initializeCharts();
    }

    // Initialize all charts
    initializeCharts() {
        this.initializeCategoryChart();
        this.initializeMonthlyChart();
        this.initializeTrendChart();
        this.initializeBudgetChart();
    }

    // Initialize Category Pie Chart
    initializeCategoryChart() {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return;

        const categoryData = window.dataManager.getSpendingByCategory();
        const labels = Object.keys(categoryData).map(cat => 
            window.dataManager.getCategoryDisplayName(cat)
        );
        const data = Object.values(categoryData);
        const colors = Object.keys(categoryData).map(cat => this.categoryColors[cat]);

        this.charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderColor: '#FFFFFF',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12,
                                family: "'Segoe UI', sans-serif"
                            },
                            color: '#5D4E60'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: £${value.toFixed(2)} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    // Initialize Monthly Bar Chart
    initializeMonthlyChart() {
        const ctx = document.getElementById('monthlyChart');
        if (!ctx) return;

        const monthlyData = window.dataManager.getMonthlySpending();
        const sortedMonths = Object.keys(monthlyData).sort();
        const labels = sortedMonths.map(month => {
            const [year, monthNum] = month.split('-');
            const date = new Date(year, monthNum - 1);
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        });
        const data = sortedMonths.map(month => monthlyData[month]);

        this.charts.monthly = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Monthly Spending',
                    data: data,
                    backgroundColor: 'rgba(255, 179, 193, 0.8)',
                    borderColor: 'rgba(255, 179, 193, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    hoverBackgroundColor: 'rgba(255, 194, 209, 0.9)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Spent: £${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '£' + value.toFixed(0);
                            },
                            color: '#5D4E60',
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: 'rgba(255, 229, 236, 0.3)',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#5D4E60',
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    delay: (context) => {
                        let delay = 0;
                        if (context.type === 'data' && context.mode === 'default') {
                            delay = context.dataIndex * 100;
                        }
                        return delay;
                    }
                }
            }
        });
    }

    // Initialize Trend Line Chart
    initializeTrendChart() {
        const ctx = document.getElementById('trendChart');
        if (!ctx) return;

        const trendData = window.dataManager.getSpendingTrend();
        const labels = Object.keys(trendData).map(date => {
            const d = new Date(date);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        const data = Object.values(trendData);

        // Calculate moving average for smoother trend line
        const movingAverage = this.calculateMovingAverage(data, 7);

        this.charts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Daily Spending',
                    data: data,
                    borderColor: 'rgba(255, 179, 193, 1)',
                    backgroundColor: 'rgba(255, 179, 193, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(255, 179, 193, 1)',
                    pointBorderColor: '#FFFFFF',
                    pointBorderWidth: 2,
                    pointHoverRadius: 6
                }, {
                    label: '7-Day Average',
                    data: movingAverage,
                    borderColor: 'rgba(255, 107, 157, 1)',
                    backgroundColor: 'transparent',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12,
                                family: "'Segoe UI', sans-serif"
                            },
                            color: '#5D4E60'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: £${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '£' + value.toFixed(0);
                            },
                            color: '#5D4E60',
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: 'rgba(255, 229, 236, 0.3)',
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: '#5D4E60',
                            font: {
                                size: 11
                            },
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Initialize Budget vs Actual Chart
    initializeBudgetChart() {
        const ctx = document.getElementById('budgetChart');
        if (!ctx) return;

        const budgetInfo = window.dataManager.getBudgetInfo();
        const remaining = Math.max(0, budgetInfo.remaining);

        this.charts.budget = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Spent', 'Remaining'],
                datasets: [{
                    data: [budgetInfo.spent, remaining],
                    backgroundColor: [
                        budgetInfo.percentage > 80 ? 'rgba(255, 107, 107, 0.8)' : 'rgba(255, 179, 193, 0.8)',
                        'rgba(201, 228, 222, 0.8)'
                    ],
                    borderColor: [
                        budgetInfo.percentage > 80 ? 'rgba(255, 107, 107, 1)' : 'rgba(255, 179, 193, 1)',
                        'rgba(201, 228, 222, 1)'
                    ],
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12,
                                family: "'Segoe UI', sans-serif"
                            },
                            color: '#5D4E60'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: £${value.toFixed(2)} (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });

        // Add center text
        const centerX = ctx.width / 2;
        const centerY = ctx.height / 2;
        this.updateBudgetCenterText(budgetInfo);
    }

    // Update budget chart center text
    updateBudgetCenterText(budgetInfo) {
        const ctx = document.getElementById('budgetChart');
        if (!ctx) return;

        // This would need to be implemented with a custom plugin
        // For now, we'll update the chart title with budget info
        const budgetCard = ctx.closest('.card');
        const title = budgetCard.querySelector('h2');
        const percentageText = budgetInfo.percentage > 80 ? ' ⚠️' : '';
        title.innerHTML = `<i class="fas fa-chart-donut"></i> Budget vs Actual${percentageText}`;
    }

    // Calculate moving average
    calculateMovingAverage(data, period) {
        const result = [];
        for (let i = 0; i < data.length; i++) {
            const start = Math.max(0, i - Math.floor(period / 2));
            const end = Math.min(data.length, i + Math.ceil(period / 2));
            const subset = data.slice(start, end);
            const average = subset.reduce((a, b) => a + b, 0) / subset.length;
            result.push(average);
        }
        return result;
    }

    // Update all charts with new data
    updateAllCharts() {
        this.updateCategoryChart();
        this.updateMonthlyChart();
        this.updateTrendChart();
        this.updateBudgetChart();
    }

    // Update Category Chart
    updateCategoryChart() {
        if (!this.charts.category) return;

        const categoryData = window.dataManager.getSpendingByCategory();
        const labels = Object.keys(categoryData).map(cat => 
            window.dataManager.getCategoryDisplayName(cat)
        );
        const data = Object.values(categoryData);
        const colors = Object.keys(categoryData).map(cat => this.categoryColors[cat]);

        this.charts.category.data.labels = labels;
        this.charts.category.data.datasets[0].data = data;
        this.charts.category.data.datasets[0].backgroundColor = colors;
        this.charts.category.update('active');
    }

    // Update Monthly Chart
    updateMonthlyChart() {
        if (!this.charts.monthly) return;

        const monthlyData = window.dataManager.getMonthlySpending();
        const sortedMonths = Object.keys(monthlyData).sort();
        const labels = sortedMonths.map(month => {
            const [year, monthNum] = month.split('-');
            const date = new Date(year, monthNum - 1);
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        });
        const data = sortedMonths.map(month => monthlyData[month]);

        this.charts.monthly.data.labels = labels;
        this.charts.monthly.data.datasets[0].data = data;
        this.charts.monthly.update('active');
    }

    // Update Trend Chart
    updateTrendChart() {
        if (!this.charts.trend) return;

        const trendData = window.dataManager.getSpendingTrend();
        const labels = Object.keys(trendData).map(date => {
            const d = new Date(date);
            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });
        const data = Object.values(trendData);
        const movingAverage = this.calculateMovingAverage(data, 7);

        this.charts.trend.data.labels = labels;
        this.charts.trend.data.datasets[0].data = data;
        this.charts.trend.data.datasets[1].data = movingAverage;
        this.charts.trend.update('active');
    }

    // Update Budget Chart
    updateBudgetChart() {
        if (!this.charts.budget) return;

        const budgetInfo = window.dataManager.getBudgetInfo();
        const remaining = Math.max(0, budgetInfo.remaining);

        this.charts.budget.data.datasets[0].data = [budgetInfo.spent, remaining];
        this.charts.budget.data.datasets[0].backgroundColor = [
            budgetInfo.percentage > 80 ? 'rgba(255, 107, 107, 0.8)' : 'rgba(255, 179, 193, 0.8)',
            'rgba(201, 228, 222, 0.8)'
        ];
        this.charts.budget.data.datasets[0].borderColor = [
            budgetInfo.percentage > 80 ? 'rgba(255, 107, 107, 1)' : 'rgba(255, 179, 193, 1)',
            'rgba(201, 228, 222, 1)'
        ];

        this.charts.budget.update('active');
        this.updateBudgetCenterText(budgetInfo);
    }

    // Destroy all charts (useful for cleanup)
    destroyAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        this.charts = {};
    }

    // Export chart as image
    exportChart(chartName, filename) {
        if (!this.charts[chartName]) return;

        const canvas = document.getElementById(chartName + 'Chart');
        if (!canvas) return;

        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}-${new Date().toISOString().split('T')[0]}.png`;
        a.click();
    }
}

// Initialize global chart manager
window.chartManager = new ChartManager();
