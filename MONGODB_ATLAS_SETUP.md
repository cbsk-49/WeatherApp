# MongoDB Atlas Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Verify your email

### Step 2: Create a Free Cluster
1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select a cloud provider (AWS recommended)
4. Choose a region closest to you
5. Click **"Create Cluster"** (takes 1-3 minutes)

### Step 3: Create Database User
1. In the Security section, click **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username (e.g., `accuweather`)
5. Click **"Autogenerate Secure Password"** or create your own
6. **SAVE THE PASSWORD** - you'll need it!
7. Set privileges to **"Read and write to any database"**
8. Click **"Add User"**

### Step 4: Whitelist Your IP Address
1. Go to **"Network Access"** (under Security)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0) for development
   - ⚠️ For production, use your specific IP
4. Click **"Confirm"**

### Step 5: Get Your Connection String
1. Go back to **"Database"** tab
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` with your database username
6. Replace `<password>` with your database password
7. Add `/accuweather` before the `?` to specify database name:
   ```
   mongodb+srv://accuweather:yourpassword@cluster0.xxxxx.mongodb.net/accuweather?retryWrites=true&w=majority
   ```

### Step 6: Update Backend .env File
1. Open `backend/.env`
2. Replace the MONGODB_URI with your connection string:
   ```
   MONGODB_URI=mongodb+srv://accuweather:yourpassword@cluster0.xxxxx.mongodb.net/accuweather?retryWrites=true&w=majority
   ```
3. Save the file

## ✅ You're Done!

Now you can start the backend server:
```bash
cd backend
npm start
```

If you see "✅ Connected to MongoDB", everything is working!

## Troubleshooting

### Error: "MongoNetworkError"
- Check your internet connection
- Make sure IP address is whitelisted (try 0.0.0.0/0)
- Verify connection string is correct

### Error: "Authentication failed"
- Double-check username and password in connection string
- Make sure you're using the database user password, not your Atlas account password
- Special characters in password need to be URL-encoded

### Need Help?
The connection string format is:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```
