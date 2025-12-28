# AccuWeather with MongoDB - Migration Complete! 🎉

## What Changed?

✅ **Supabase removed** - Now using MongoDB + Express backend
✅ **Custom authentication** - JWT tokens with bcrypt password hashing
✅ **Backend API** - RESTful API endpoints for auth
✅ **Local sessions** - Auth tokens stored in localStorage

## Quick Start

### 1. Set Up MongoDB Atlas (5 minutes)
Follow the guide: [MONGODB_ATLAS_SETUP.md](MONGODB_ATLAS_SETUP.md)

**Summary:**
- Create free MongoDB Atlas account
- Create a cluster
- Create database user
- Whitelist IP (0.0.0.0/0 for dev)
- Copy connection string
- Update `backend/.env` with your connection string

### 2. Start Backend Server
```bash
cd backend
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### 3. Start Frontend (New Terminal)
```bash
# From the AccuWeather folder
npm run dev
```

### 4. Test It!
1. Open http://localhost:5173
2. Click "Sign In" → "Sign Up"
3. Create account with name, email, password
4. Sign in with your credentials
5. See your name in the header!

## Architecture

### Backend (Port 5000)
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Auth**: JWT + bcryptjs
- **Location**: `backend/` folder

**API Endpoints:**
- `POST /api/auth/signup` - Register
- `POST /api/auth/signin` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/signout` - Logout

### Frontend (Port 5173)
- **Framework**: React + Vite
- **Auth**: JWT stored in localStorage
- **API Calls**: Native fetch API

## Environment Variables

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/accuweather
JWT_SECRET=acc8f9d2e5b1c4a7f3d6e9b2c5a8f1d4e7b0c3a6f9d2e5b8c1a4f7d0e3b6c9a2
NODE_ENV=development
```

### Frontend `.env`
```env
VITE_OPENWEATHER_API_KEY=0e62256fee1a37258c2b81d504f0c4dc
VITE_API_URL=http://localhost:5000/api
```

## File Structure

```
AccuWeather/
├── backend/
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── src/
│   ├── contexts/
│   │   └── AuthContext.jsx (Updated)
│   ├── pages/
│   │   └── Header.jsx (Updated)
│   └── ...
└── ...
```

## Testing Authentication

### Sign Up
```javascript
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Sign In
```javascript
POST http://localhost:5000/api/auth/signin
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

Response includes JWT token:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

## Security Features

✅ Password hashing with bcrypt (10 rounds)
✅ JWT tokens (7-day expiry)
✅ Protected routes with middleware
✅ CORS configured for frontend
✅ Environment variables for secrets

## Troubleshooting

### Backend won't start
- Check MongoDB connection string in `backend/.env`
- Make sure MongoDB Atlas IP is whitelisted
- Verify all dependencies installed: `npm install`

### Frontend auth not working
- Check backend is running on port 5000
- Open browser console for errors
- Verify `VITE_API_URL` in frontend `.env`

### "Failed to fetch"
- Backend must be running first
- Check CORS settings in `backend/server.js`
- Verify ports: backend (5000), frontend (5173)

## Next Steps

- ✅ Authentication working
- ✅ User management
- ⭐ Add password reset
- ⭐ Add email verification
- ⭐ Add profile updates
- ⭐ Add admin roles

Enjoy your new MongoDB-powered AccuWeather app! 🌤️
