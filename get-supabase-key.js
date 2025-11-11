#!/usr/bin/env node

console.log('\n🔑 Supabase Setup Helper\n');
console.log('You need to get your Supabase anon key to complete the setup.\n');
console.log('Follow these steps:\n');
console.log('1. Open your browser and go to: https://supabase.com/dashboard');
console.log('2. Log in to your account');
console.log('3. Select your project: ykloznldvabceeorfsxm');
console.log('4. Click on "Settings" (⚙️ gear icon) in the left sidebar');
console.log('5. Click on "API" under Project Settings');
console.log('6. Find the "Project API keys" section');
console.log('7. Copy the "anon" "public" key (NOT the service_role key!)');
console.log('8. Open the .env file in this project');
console.log('9. Replace "YOUR_SUPABASE_ANON_KEY_HERE" with your actual key\n');
console.log('Your .env file should look like this:\n');
console.log('VITE_OPENWEATHER_API_KEY=0e62256fee1a37258c2b81d504f0c4dc');
console.log('VITE_SUPABASE_URL=https://ykloznldvabceeorfsxm.supabase.co');
console.log('VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\n');
console.log('⚠️  Make sure to enable Email Authentication in Supabase:');
console.log('   Authentication → Providers → Enable Email\n');
console.log('After updating .env, run: npm run dev\n');
