# AccuWeather - Real-time Weather Application


A modern weather tracking application built with React, Vite, and Supabase authentication.

## Features

- 🌤️ Real-time weather data for any city worldwide
- 📅 3-day weather forecast
- 🗺️ Interactive weather map with click-to-explore
- ⚠️ Weather alerts and warnings
- 🔐 User authentication with Supabase
- 📊 Detailed weather metrics (temperature, humidity, wind, pressure, etc.)
- 🎨 Dynamic backgrounds based on weather conditions

## Tech Stack

- **Frontend**: React 19, React Router v7
- **Build Tool**: Vite 7
- **Authentication**: Supabase
- **Maps**: React Leaflet
- **API**: OpenWeather API
- **Styling**: Custom CSS with glassmorphism effects

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- OpenWeather API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cbsk-49/WeatherApp.git
cd WeatherApp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Get your Supabase anon key:
     1. Go to https://supabase.com/dashboard
     2. Select your project
     3. Settings → API
     4. Copy the `anon` `public` key
   - Update `.env` with your keys:
```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_SUPABASE_URL=https://ykloznldvabceeorfsxm.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Enable Email Authentication in Supabase:
   - Go to Authentication → Providers in your Supabase dashboard
   - Enable Email provider

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage

### Authentication
1. Click "Sign In" in the header
2. Create an account with your email and username
3. Verify your email (check spam folder if needed)
4. Sign in with your credentials
5. Your username will appear in the header: "Welcome, [username]!"

### Weather Search
1. Enter a city name in the search box on the home page
2. Click "Get Weather" to see current weather
3. View detailed metrics including temperature, humidity, wind, and more

### Forecast
1. Navigate to the Forecast page
2. Enter a city name to see a 3-day forecast
3. View high/low temperatures and weather conditions

### Interactive Map
1. Navigate to the Maps page
2. Click anywhere on the map to get weather for that location
3. View markers for previously clicked locations
4. Use "Center on Last Click" to refocus the map

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
WeatherApp/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and media
│   ├── contexts/        # React contexts (AuthContext)
│   ├── lib/             # Utilities and configurations
│   │   └── supabaseClient.js
│   ├── pages/           # Page components
│   │   ├── About.jsx
│   │   ├── Alerts.jsx
│   │   ├── Auth.jsx
│   │   ├── Forecast.jsx
│   │   ├── Header.jsx
│   │   ├── Maps.jsx
│   │   └── WeatherCard.jsx
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables (not in git)
├── .env.example         # Example environment file
└── package.json
```

## Security Notes

- Never commit `.env` file to version control
- Keep your API keys secure
- The `.gitignore` file excludes `.env` by default

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

MIT

## Acknowledgments

- Weather data provided by [OpenWeather](https://openweathermap.org/)
- Authentication powered by [Supabase](https://supabase.com/)
- Maps powered by [Leaflet](https://leafletjs.com/)
