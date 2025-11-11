# 🚀 Quick Start Guide

## Get Your App Running in 3 Steps!

### Step 1: Get Your Supabase Anon Key (2 minutes)

1. Open: https://supabase.com/dashboard/project/ykloznldvabceeorfsxm/settings/api
2. Copy the **"anon public"** key (the long string starting with `eyJ...`)
3. Open the `.env` file in this project
4. Replace `YOUR_SUPABASE_ANON_KEY_HERE` with your key

Your `.env` should look like:
```
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSI...
```

### Step 2: Enable Email Auth in Supabase (1 minute)

1. Open: https://supabase.com/dashboard/project/ykloznldvabceeorfsxm/auth/providers
2. Make sure **Email** is enabled (toggle should be ON)
3. That's it!

### Step 3: Run the App! (30 seconds)

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## 🎉 Test It Out!

1. Click **"Sign In"** in the header
2. Switch to **"Sign Up"** tab
3. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: (min 6 characters)
4. Click **"Sign Up"**
5. Check your email and click the verification link
6. Come back and click **"Sign In"**
7. Enter your email and password
8. You'll see: **"Welcome, Your Name!"** in the header 🎊

## 💡 Pro Tips

- The username you enter during signup will appear in the header
- Click "Sign Out" to log out
- Your session persists even if you refresh the page
- Check the IMPLEMENTATION_SUMMARY.md for detailed info

## ❓ Having Issues?

**Can't sign up?**
- Make sure Email auth is enabled in Supabase
- Check spam folder for verification email

**"Error fetching data"?**
- Verify your `.env` has the correct anon key
- Restart the dev server: Ctrl+C, then `npm run dev`

**Username not showing?**
- It's saved in user metadata during signup
- Try signing up with a new account

## 📚 More Info

- Full documentation: `README.md`
- Implementation details: `IMPLEMENTATION_SUMMARY.md`
- Supabase setup: `SUPABASE_SETUP.md`

Enjoy your weather app with authentication! 🌤️
