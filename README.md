# 🏃‍♂️ Weekly Mileage Tracker

A modern, responsive web application for tracking your running and walking workouts. Built with vanilla HTML, CSS, and JavaScript, this app helps you monitor your weekly mileage progress with beautiful charts and statistics.

## 📈 Why Track Your Mileage?

Mileage is one of the most reliable predictors of race performance. Research consistently shows that weekly mileage directly correlates with improved race times and overall running performance across all distances.

### Key Benefits of Mileage Tracking:

- **🏆 Performance Predictor**: Weekly mileage is the strongest predictor of race times across all distances (5K to marathon)
- **🎯 Goal Setting**: Track your progress and set realistic weekly mileage targets based on your race goals
- **🔄 Consistency Monitoring**: Identify training patterns and maintain consistent weekly volume
- **📊 Progress Visualization**: See your mileage trends over time with interactive charts
- **🏃‍♂️ Race Preparation**: Build the endurance foundation needed for successful race performance
- **💪 Injury Prevention**: Monitor volume to avoid overtraining and maintain sustainable training loads

Whether you're training for your first 5K or preparing for a marathon, consistent weekly mileage tracking is essential for achieving your running goals.

## ✨ Features

- **Add Workouts**: Log your runs and walks with distance and date
- **Weekly Statistics**: Track total miles, number of workouts, and daily average
- **Interactive Chart**: Visualize your weekly progress with a beautiful bar chart
- **Recent Workouts**: View and manage your recent workout history
- **Local Storage**: Your data persists between sessions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## 🚀 Live Demo

[View the live demo here](https://your-netlify-url.netlify.app)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Vanilla JS with modern features
- **Chart.js**: Beautiful, responsive charts
- **Local Storage**: Client-side data persistence

## 📱 Features in Detail

### Add Workout Form
- Select workout type (Run/Walk)
- Enter distance in kilometers (supports decimals)
- Choose date (defaults to today)
- Form validation and success notifications

### Weekly Statistics
- **This Week**: Total kilometers for the current week (Monday to Sunday)
- **Previous Week**: Total kilometers from the previous week (Monday to Sunday)

### Weekly Mileage Trend Chart
- Bar chart showing weekly totals over the last 8 weeks
- Tracks your mileage trend over time
- Responsive design that adapts to screen size
- Interactive tooltips with detailed information
- Beautiful gradient styling

### Recent Workouts
- List of your 10 most recent workouts
- Delete functionality for each workout
- Sorted by date (most recent first)
- Empty state when no workouts exist

## 🎨 Design Features

- **Gradient Background**: Beautiful purple gradient theme
- **Card-based Layout**: Clean, organized sections
- **Smooth Animations**: Hover effects and transitions
- **Mobile-First**: Responsive design for all devices
- **Accessibility**: Proper contrast and keyboard navigation

## 📦 Installation & Setup

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mileage-tracker.git
   cd mileage-tracker
   ```

2. **Open in your browser**
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Using Node.js (if installed)
   npx serve .
   
   # Or simply open index.html in your browser
   ```

3. **Start tracking your workouts!**

### Deployment to Netlify

#### Option 1: Drag & Drop (Easiest)
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Drag and drop your project folder to the Netlify dashboard
3. Your site will be deployed instantly!

#### Option 2: Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Netlify will automatically deploy your site

#### Option 3: Netlify CLI
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify deploy`
3. Follow the prompts to deploy

## 🔧 Configuration

The app is ready to use out of the box! No configuration needed. All data is stored locally in your browser's localStorage.

## 📊 Data Storage

- **Local Storage**: All workout data is stored locally in your browser
- **No Server Required**: The app works completely offline
- **Privacy**: Your data never leaves your device

## 🎯 Future Enhancements

- [ ] Export data to CSV/PDF
- [ ] Multiple user profiles
- [ ] Goal setting and tracking
- [ ] Social sharing
- [ ] Dark mode toggle
- [ ] PWA capabilities
- [ ] Offline support
- [ ] Data backup/restore

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) for beautiful charts
- [Netlify](https://netlify.com) for hosting
- The running community for inspiration

---

**Happy Running! 🏃‍♂️💨**
