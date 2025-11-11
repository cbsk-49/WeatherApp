# Supabase Setup Instructions

## Getting Your Supabase Anon Key

You need to get your Supabase anon key to complete the setup:

1. Go to https://supabase.com/dashboard
2. Select your project: `ykloznldvabceeorfsxm`
3. Click on "Settings" (gear icon) in the left sidebar
4. Click on "API" under Project Settings
5. Copy the `anon` `public` key (NOT the service_role key)
6. Paste it into the `.env` file, replacing the placeholder:

```
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

## Enable Email Authentication in Supabase

1. Go to Authentication → Providers in your Supabase dashboard
2. Make sure Email provider is enabled
3. Configure email templates if needed

## Database Setup (Optional)

The authentication is handled by Supabase Auth automatically. User metadata (like username) is stored in the `auth.users` table.

If you want to store additional user data, you can create a `profiles` table:

```sql
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  updated_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Policy to allow users to read their own profile
create policy "Users can view own profile" 
  on profiles for select 
  using (auth.uid() = id);

-- Policy to allow users to update their own profile
create policy "Users can update own profile" 
  on profiles for update 
  using (auth.uid() = id);
```

## Running the App

After updating the `.env` file with your anon key:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Testing Authentication

1. Click "Sign In" in the header
2. Switch to "Sign Up" tab
3. Enter your name, email, and password
4. Click "Sign Up"
5. Check your email for the confirmation link
6. After confirming, you can sign in
7. Your username will appear in the header: "Welcome, [username]!"
