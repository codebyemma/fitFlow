# FitFlow - Fitness Tracking Application

A comprehensive fitness tracking application built with React, Zustand, and Tailwind CSS.

## 🚀 Features

- **Exercise Management**: Browse and search through a comprehensive exercise database
- **Routine Builder**: Create custom workout routines with days and exercises
- **Workout Tracking**: Log your workouts and track progress over time
- **Progress Charts**: Visualize your strength progression with charts
- **Favorites System**: Save your favorite exercises for quick access
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🏗️ Project Structure

```
fit-flow/
├── src/
│   ├── components/
│   │   ├── DashBoard.jsx          # Main dashboard with favorites and exercise list
│   │   ├── DetailsPage.jsx        # Individual exercise details page
│   │   ├── Exercise.jsx           # Exercise selection component
│   │   ├── ExerciseLists.jsx      # List of all exercises
│   │   ├── Favorites.jsx          # Favorite exercises display
│   │   ├── LandingPage.jsx        # Landing page component
│   │   ├── NavBar.jsx             # Navigation component
│   │   ├── ProgressionChart.jsx   # Progress visualization charts
│   │   ├── RoutineBuilder.jsx     # Workout routine creation
│   │   ├── Search.jsx             # Exercise search and filtering
│   │   ├── SignUp.jsx             # User signup component
│   │   └── WorkoutTracker.jsx     # Workout logging and tracking
│   ├── hooks/
│   │   └── useDebounce.js         # Debounce hook for search optimization
│   ├── stores/
│   │   └── exerciseStore.js       # Centralized state management with Zustand
│   ├── App.jsx                    # Main application component with routing
│   └── index.js                   # Application entry point
├── .env.example                   # Environment variables template
├── package.json                   # Project dependencies
└── README.md                      # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fit-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your RapidAPI key:
   ```
   REACT_APP_RAPIDAPI_KEY=your_actual_api_key_here
   ```

4. **Get API Key**
   - Visit [RapidAPI ExerciseDB](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)
   - Sign up and subscribe to get your API key
   - Add the key to your `.env` file

5. **Start the development server**
   ```bash
   npm start
   ```

## 🔧 Key Technologies

- **React 18**: Modern React with hooks and functional components
- **Zustand**: Lightweight state management
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Chart library for progress visualization
- **RapidAPI ExerciseDB**: Exercise database API

## 📱 Component Architecture

### State Management
- **Centralized Store**: All application state managed in `exerciseStore.js`
- **Persistent Storage**: User data persists across sessions
- **Loading States**: Proper loading and error handling throughout the app

### Data Flow
1. **Exercise Fetching**: Centralized API calls from the store
2. **State Updates**: Components subscribe to store changes
3. **User Actions**: Components dispatch actions to update store
4. **Persistence**: Store automatically saves to localStorage

### Routing Structure
- `/` - Landing page
- `/signup` - User registration
- `/dashboard` - Main application dashboard
- `/exercise/:id` - Individual exercise details

## 🎯 Usage Guide

### Creating Routines
1. Navigate to any exercise detail page
2. Use the Routine Builder to create workout routines
3. Add days and exercises to your routine
4. Set target sets, reps, and weights

### Tracking Workouts
1. Use the Workout Tracker to log your workouts
2. Record weight, reps, and sets for each exercise
3. View progress charts to track improvement
4. Automatic progression and deload logic

### Managing Favorites
1. Browse exercises on the dashboard
2. Click the heart icon to add/remove favorites
3. Quick access to favorite exercises from the dashboard

## 🔒 Security Notes

- **API Keys**: Never commit API keys to version control
- **Environment Variables**: Use `.env` files for sensitive configuration
- **Input Validation**: All user inputs are validated before processing

## 🚧 Development

### Adding New Features
1. Create new components in `src/components/`
2. Add new state and actions to `exerciseStore.js`
3. Update routing in `App.jsx` if needed
4. Follow existing patterns for consistency

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS for styling
- Maintain consistent component structure

## 📊 Performance Features

- **Debounced Search**: Optimized search with 500ms debounce
- **Lazy Loading**: Components load data only when needed
- **Efficient State Updates**: Minimal re-renders with Zustand
- **Image Optimization**: Fallback images for failed loads

## 🐛 Troubleshooting

### Common Issues
1. **API Errors**: Check your RapidAPI key and subscription
2. **Data Not Loading**: Verify network connectivity and API status
3. **State Not Persisting**: Check browser localStorage support

### Debug Mode
Enable debug logging by setting `localStorage.debug = 'fitflow:*'` in browser console.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.
