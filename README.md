# Money Tracker 💰

A beautiful web-based spending tracker dashboard with a playful soft pink pastel theme. Track your expenses, visualize spending patterns, and manage your budget with style!

## 🌟 Features

### Core Functionality
- ✅ Add, edit, and delete expenses
- 📊 Beautiful charts and visualizations
- 🔍 Filter by category and month
- 💾 Local data storage (no backend required)
- 📱 Fully responsive design
- ⌨️ Keyboard shortcuts
- 💾 Export/import data functionality

### Visualizations
- 🍩 Spending by category (doughnut chart)
- 📊 Monthly spending trends (bar chart)
- 📈 30-day spending trend with moving average (line chart)
- 🎯 Budget vs actual spending (donut chart)

### Categories
- 🍔 Food
- 🚗 Transport
- 🎬 Entertainment
- 🛍️ Shopping
- 📄 Bills
- 💊 Health
- 📚 Education
- 📦 Other

## 🎨 Design

The application features a soft pink pastel theme with:
- **Primary Color**: #FFE5EC (soft pink)
- **Secondary Color**: #FFC2D1 (dusty rose)
- **Accent Color**: #FFB3C1 (coral pink)
- **Background**: #FFF5F7 (very light pink)
- **Text**: #5D4E60 (muted purple-gray)

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start tracking your expenses!

### Quick Start
1. Add your first expense using the "Quick Add Expense" form
2. View your spending patterns in the charts
3. Filter transactions by category or month
4. Export your data anytime

## 📱 Usage

### Adding Expenses
1. Fill in the amount, category, description, and date
2. Click "Add Expense" or press Ctrl+N
3. Your expense will be added and charts will update automatically

### Managing Transactions
- **Edit**: Click the edit icon on any transaction
- **Delete**: Click the trash icon to remove a transaction
- **Filter**: Use the dropdown filters to view specific categories or months

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl+N` | New expense |
| `Ctrl+E` | Export data |
| `Ctrl+I` | Import data |
| `Ctrl+R` | Refresh data |
| `Ctrl+L` | Clear all data |
| `Esc` | Close modal |
| `Shift+?` | Show help |

### Data Management
- **Auto-save**: Data is automatically saved to browser's local storage
- **Export**: Download your data as JSON file
- **Import**: Upload previously exported JSON files
- **Clear**: Remove all data (use with caution)

## 🏗️ Project Structure

```
money-tracker/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Complete styling with pastel theme
├── js/
│   ├── app.js              # Main application controller
│   ├── data-manager.js     # Data operations and LocalStorage
│   ├── chart-config.js     # Chart.js configurations
│   └── ui-controller.js    # UI interactions and DOM manipulation
└── README.md               # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations and transitions
- **Vanilla JavaScript**: No frameworks required
- **Chart.js**: Beautiful, responsive charts
- **Font Awesome**: Icons and visual elements
- **LocalStorage**: Client-side data persistence

## 📊 Data Storage

All data is stored locally in your browser using LocalStorage:
- Transactions are saved as JSON
- Budget settings are preserved
- No server or internet connection required
- Data persists between browser sessions

## 🔧 Customization

### Adding New Categories
1. Edit the `categoryNames` object in `data-manager.js`
2. Add new colors to the `categoryColors` object in `chart-config.js`
3. Update the category dropdown in `index.html`

### Changing Colors
- Modify the CSS variables in `styles.css`
- Update chart colors in `chart-config.js`
- Ensure consistency across all components

### Budget Settings
- Default budget is set to $1000 in `data-manager.js`
- Can be modified through the application interface

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🔒 Privacy & Security

- All data stays on your device
- No data is sent to external servers
- No tracking or analytics
- Full control over your financial data

## 🚀 Performance

- Lightweight and fast loading
- Optimized charts and animations
- Efficient data management
- Minimal resource usage

## 🤝 Contributing

This is a personal project, but feel free to:
- Report issues
- Suggest features
- Submit pull requests
- Share feedback

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- [ ] Dark mode support
- [ ] Multiple budgets
- [ ] Recurring transactions
- [ ] Spending goals
- [ ] Data synchronization
- [ ] Advanced filtering
- [ ] Custom date ranges
- [ ] CSV export
- [ ] Print-friendly reports
- [ ] Mobile app version

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for errors
2. Ensure JavaScript is enabled
3. Try refreshing the page
4. Clear browser cache if needed

## 🎉 Enjoy!

Happy tracking! Monitor your spending, save money, and achieve your financial goals with this beautiful and intuitive expense tracker.

---

Made with ❤️ and soft pink pastels ✨
