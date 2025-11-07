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

## 🌐 GitHub Pages Deployment

This application is ready for deployment on GitHub Pages! Here's how to deploy it:

### Prerequisites
- A GitHub account
- The project pushed to a GitHub repository

### Deployment Steps

**Option 1: Use the Deployment Script (Recommended)**

*For macOS/Linux users:*
1. Make the script executable:
   ```bash
   chmod +x deploy.sh
   ```
2. Run the deployment script:
   ```bash
   ./deploy.sh
   ```

*For Windows users:*
1. Simply run the batch file:
   ```cmd
   deploy.bat
   ```

3. Follow the on-screen instructions

**Option 2: Manual Deployment**
1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Initial commit - Money Tracker ready for deployment"
   git remote add origin https://github.com/yourusername/money-tracker.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to **Pages** section
   - Under **Build and deployment**, select **Source**: Deploy from a branch
   - Select **Branch**: main (or master)
   - Select **Folder**: / (root)
   - Click **Save**

3. **Wait for deployment**:
   - GitHub will build and deploy your site
   - This usually takes 1-2 minutes
   - You'll see a green checkmark when ready

4. **Access your site**:
   - Go to Settings > Pages
   - Your site will be available at: `https://yourusername.github.io/money-tracker/`

### Features Available on GitHub Pages
✅ **Static Site**: Perfect for GitHub Pages (no server requirements)  
✅ **Offline Support**: Service worker works for offline access  
✅ **Responsive Design**: Works on all devices  
✅ **Data Privacy**: All data stored locally in browser  
✅ **Fast Loading**: Optimized assets and CDN resources  

### Troubleshooting

**404 Errors**:
- Make sure you're deploying from the root folder (/)
- Check that your repository name matches the URL path

**Service Worker Issues**:
- Clear browser cache after deployment
- The service worker may need to update on first visit

**Styling Issues**:
- Ensure all CSS files are committed
- Check browser console for any resource loading errors

### Custom Domain (Optional)
To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to your repository root with your domain
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use the custom domain

### Updating the Site
Simply push changes to your main branch:
```bash
git add .
git commit -m "Update features"
git push origin main
```
GitHub Pages will automatically redeploy your site!

## 🚀 Vercel Deployment

This application is also optimized for Vercel deployment with enhanced performance and security features!

### Why Deploy on Vercel?

✅ **Blazing Fast**: Global Edge Network for instant load times  
✅ **Zero Config**: Automatic deployment from Git repository  
✅ **HTTPS by Default**: Free SSL certificates included  
✅ **Security Optimized**: Built-in security headers and protections  
✅ **Analytics Ready**: Optional Vercel Analytics integration  
✅ **Preview Deployments**: Test changes before going live  

### Prerequisites
- A Vercel account (free)
- The project pushed to a GitHub repository
- Vercel CLI installed (optional, for local deployment)

### Deployment Steps

**Option 1: Deploy via Vercel Website (Recommended for beginners)**

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Click "New Project"

2. **Import Repository**:
   - Select your Money Tracker repository
   - Vercel will automatically detect it as a static site
   - Click "Deploy"

3. **Customize Settings (Optional)**:
   - Set custom domain (if needed)
   - Enable Vercel Analytics
   - Configure environment variables

4. **Launch!**:
   - Your site will be live at: `https://your-project-name.vercel.app`

**Option 2: Use the Vercel Deployment Script (Recommended)**

*For macOS/Linux users:*
1. Make the script executable:
   ```bash
   chmod +x deploy-vercel.sh
   ```
2. Run the deployment script:
   ```bash
   ./deploy-vercel.sh
   ```

*For Windows users:*
1. Simply run the batch file:
   ```cmd
   deploy-vercel.bat
   ```

3. Follow the on-screen instructions

**Option 3: Manual Deployment via Vercel CLI**

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project directory**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

### Vercel-Specific Optimizations

This project includes several Vercel optimizations:

#### 🛡️ Enhanced Security
- **XSS Protection**: Built-in XSS attack prevention
- **Frame Protection**: Prevents clickjacking attacks
- **Content Type Protection**: Prevents MIME-type sniffing
- **Referrer Policy**: Controls referrer information leakage
- **Permissions Policy**: Restricts access to sensitive APIs

#### ⚡ Performance Optimizations
- **Asset Caching**: Long-term caching for CSS/JS files (1 year)
- **Service Worker**: Optimized for Vercel's Edge Network
- **CDN Headers**: Proper caching for external resources
- **Compression**: Automatic gzip/brotli compression

#### 🔄 Service Worker Compatibility
- Optimized cache paths for Vercel deployment
- Proper fallback handling for offline access
- CDN resource caching for external libraries

### Environment Variables (Optional)

For advanced configurations, you can set environment variables in Vercel:

```bash
# Example environment variables
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Custom Domain Setup

1. **Add Custom Domain**:
   - Go to your Vercel project dashboard
   - Click "Settings" → "Domains"
   - Add your custom domain

2. **Update DNS**:
   - Follow Vercel's DNS configuration guide
   - Point your domain to Vercel's nameservers

3. **SSL Certificate**:
   - Vercel automatically provisions SSL certificates
   - HTTPS will be enabled automatically

### Monitoring and Analytics

**Vercel Analytics** (Optional):
- Real-time performance metrics
- Core Web Vitals monitoring
- User behavior insights
- A/B testing capabilities

Enable in your Vercel dashboard:
1. Go to project settings
2. Click "Analytics"
3. Follow setup instructions

### Updating Your Site

**Automatic Updates**:
Simply push changes to your main branch:
```bash
git add .
git commit -m "Update Money Tracker features"
git push origin main
```
Vercel will automatically rebuild and deploy your changes!

**Manual Deployments**:
```bash
vercel --prod
```

### Troubleshooting

**Service Worker Issues**:
- Clear browser cache after first deployment
- Check browser console for cache warnings
- Service worker updates automatically within 24 hours

**Performance Issues**:
- Check Vercel Analytics for Core Web Vitals
- Verify CDN caching is working correctly
- Optimize images if you add them later

**Security Warnings**:
- All security headers are pre-configured
- Check Vercel dashboard for any security alerts
- Ensure no sensitive data is exposed in client-side code

### Advanced Features

**Preview Deployments**:
- Every PR creates a preview deployment
- Test changes before merging to main
- Share preview URLs with team members

**Edge Functions** (Future Enhancement):
- Could add server-side features if needed
- API endpoints for data synchronization
- Advanced authentication systems

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
