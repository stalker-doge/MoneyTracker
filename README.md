# Money Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-latest-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-latest-pink.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.x-green.svg)](https://www.chartjs.org/)

A sophisticated web-based expense tracking dashboard designed for personal financial management. Features an intuitive interface with comprehensive data visualization, local storage persistence, and responsive design for seamless cross-device experience.

## Overview

Money Tracker provides a complete solution for personal expense management with:
- **Real-time expense tracking** with immediate visual feedback
- **Advanced data visualization** using Chart.js for spending insights
- **Privacy-first architecture** with all data stored locally
- **Professional UI/UX** with responsive design and keyboard shortcuts
- **Multi-currency support** with customizable settings
- **Comprehensive data management** with import/export capabilities

## Key Features

### Core Functionality
- **Expense Management**: Add, edit, and delete transactions with ease
- **Budget Tracking**: Set and monitor monthly budgets with visual progress indicators
- **Data Visualization**: Interactive charts for spending patterns and trends
- **Advanced Filtering**: Filter transactions by category and date ranges
- **Multi-currency Support**: Support for 20+ major currencies plus custom options
- **Keyboard Shortcuts**: Productivity-enhancing keyboard controls
- **Dark/Light Mode**: Toggle between themes for comfortable usage

### Data Management
- **Local Storage**: All data persisted locally with no server dependency
- **Import/Export**: Support for both JSON and CSV formats
- **Data Backup**: Easy backup and restore functionality
- **Privacy Protection**: Complete data privacy with no external data transmission

### Visualizations
- **Category Breakdown**: Doughnut chart showing spending by category
- **Monthly Trends**: Bar chart displaying monthly spending patterns
- **30-Day Trend**: Line chart with moving average for recent spending
- **Budget Analysis**: Donut chart comparing budget vs. actual spending

## Technical Architecture

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Visualization**: Chart.js 4.x for responsive, interactive charts
- **Icons**: Font Awesome 6.4 for consistent iconography
- **Storage**: Browser LocalStorage for data persistence
- **Deployment**: Static site compatible (GitHub Pages, Vercel, Netlify)

### Architecture Pattern
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   UI Controller │    │  Data Manager   │    │ Chart Config    │
│                 │    │                 │    │                 │
│ • DOM Events    │◄──►│ • CRUD Ops      │◄──►│ • Chart Setups  │
│ • Modal Mgmt    │    │ • Validation    │    │ • Styling       │
│ • Keyboard      │    │ • Storage Mgmt  │    │ • Data Binding  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  App Controller │
                    │                 │
                    │ • Initialization │
                    │ • Event Coord   │
                    │ • State Mgmt    │
                    └─────────────────┘
```

### Project Structure
```
money-tracker/
├── index.html              # Main application entry point
├── css/
│   └── styles.css          # Complete styling system
├── js/
│   ├── app.js              # Application controller and initialization
│   ├── data-manager.js     # Data operations and storage management
│   ├── chart-config.js     # Chart.js configurations and styling
│   └── ui-controller.js    # UI interactions and DOM manipulation
├── sw.js                   # Service worker for offline functionality
├── vercel.json            # Vercel deployment configuration
├── deploy.*               # Deployment scripts for various platforms
└── README.md               # This documentation
```

## Installation and Setup

### Prerequisites
- Modern web browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- No additional software or server requirements

### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/money-tracker.git
   cd money-tracker
   ```

2. Open the application:
   ```bash
   # Simply open index.html in your preferred browser
   open index.html
   ```

3. Start tracking expenses immediately

### Development Setup
For local development with live reload:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if available)
npx serve .

# Then navigate to http://localhost:8000
```

## Usage Guide

### Getting Started
1. **Set Your Budget**: Configure your monthly budget in the settings
2. **Add Transactions**: Use the quick add form for expense entry
3. **View Analytics**: Monitor spending patterns through interactive charts
4. **Export Data**: Regular backup your financial data

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Ctrl+N` | Add new expense |
| `Ctrl+E` | Export data |
| `Ctrl+I` | Import data |
| `Ctrl+R` | Refresh dashboard |
| `Ctrl+L` | Clear all data (with confirmation) |
| `Esc` | Close active modal |
| `Shift+?` | Show keyboard shortcuts help |

### Transaction Management
- **Adding**: Complete the form with amount, category, description, and date
- **Editing**: Click the edit icon on any transaction to modify details
- **Deleting**: Click the trash icon to remove unwanted transactions
- **Filtering**: Use category and month filters for focused analysis

### Budget Configuration
- Access through settings or the "Edit Budget" button
- Set monthly budget amounts in your preferred currency
- Visual progress indicators show remaining budget
- Automatic calculation of spending percentage

## Configuration and Customization

### Currency Settings
Support for 20+ major currencies including:
- USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, KRW
- Custom currency configuration for unique requirements
- Flexible symbol positioning (prefix/suffix)

### Category Management
Default categories include: Food, Transport, Entertainment, Shopping, Bills, Health, Education, Other
- **Adding Categories**: Modify `categoryNames` in `data-manager.js`
- **Color Customization**: Update `categoryColors` in `chart-config.js`
- **UI Updates**: Add new options to category dropdowns in `index.html`

### Theme Customization
- **Color Scheme**: Modify CSS variables in `styles.css`
- **Chart Styling**: Update color configurations in `chart-config.js`
- **Responsive Design**: Breakpoints and mobile optimizations included

## Deployment

### GitHub Pages
```bash
# Deploy using provided script
./deploy.sh        # macOS/Linux
deploy.bat          # Windows

# Or manual deployment
git add .
git commit -m "Deploy Money Tracker"
git push origin main
```

Then enable GitHub Pages in repository settings.

### Vercel
```bash
# Deploy using provided script
./deploy-vercel.sh  # macOS/Linux
deploy-vercel.bat   # Windows

# Or using Vercel CLI
npm i -g vercel
vercel --prod
```

### Netlify
1. Drag and drop the project folder to Netlify deploy page
2. Or connect your Git repository for continuous deployment

## Performance and Security

### Performance Features
- **Lightweight**: Minimal footprint for fast loading
- **Optimized Charts**: Efficient rendering and updates
- **Caching Strategy**: Service worker for offline functionality
- **Responsive Design**: Optimized for all device sizes

### Security Considerations
- **Local-Only Storage**: No data transmission to external servers
- **No Third-Party Tracking**: Complete user privacy
- **Input Validation**: Comprehensive client-side validation
- **Secure Defaults**: Safe default configurations

## Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 60+ | Full feature support |
| Firefox | 55+ | Full feature support |
| Safari | 12+ | Full feature support |
| Edge | 79+ | Full feature support |

## Contributing

We welcome contributions to improve Money Tracker:

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with clear, commit messages
4. Test thoroughly across different browsers
5. Submit a pull request with detailed description

### Code Standards
- **JavaScript**: ES6+ standards with proper error handling
- **CSS**: Organized with clear commenting and responsive design
- **HTML**: Semantic markup with accessibility considerations
- **Documentation**: Update README and inline comments as needed

### Reporting Issues
- Use GitHub Issues with clear bug reports
- Include browser version and reproduction steps
- Provide screenshots for UI-related issues

## Roadmap

### Planned Enhancements
- [ ] Advanced reporting with custom date ranges
- [ ] Recurring transaction automation
- [ ] Spending goal tracking and alerts
- [ ] Advanced analytics with AI-powered insights
- [ ] Mobile application (React Native)
- [ ] Multi-user support with data synchronization
- [ ] Advanced export formats (PDF reports)
- [ ] Integration with banking APIs

### Version History
- **v2.0**: Multi-currency support, dark mode, enhanced charts
- **v1.5**: CSV import/export, improved UI, performance optimizations
- **v1.0**: Initial release with core functionality

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

### Documentation
- This README provides comprehensive setup and usage information
- Inline code comments for developer reference
- Keyboard shortcuts help within the application

### Troubleshooting
**Common Issues:**
- **Data Not Saving**: Check browser localStorage permissions
- **Charts Not Loading**: Verify JavaScript is enabled and no console errors
- **Mobile Display Issues**: Ensure browser zoom is at 100%

**Getting Help:**
1. Check browser console for error messages
2. Verify JavaScript is enabled
3. Clear browser cache and reload
4. Try a different browser if issues persist

---

Money Tracker is designed and maintained with a focus on user privacy, performance, and intuitive financial management.

**Keywords**: expense tracker, personal finance, budget management, financial dashboard, money management, spending analysis, financial planning
