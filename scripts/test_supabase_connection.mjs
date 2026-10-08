import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env file manually
const envPath = path.resolve('.env');
let supabaseUrl = '';
let supabaseAnonKey = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('VITE_SUPABASE_URL=')) {
      supabaseUrl = trimmed.replace('VITE_SUPABASE_URL=', '').trim();
    }
    if (trimmed.startsWith('VITE_SUPABASE_ANON_KEY=')) {
      supabaseAnonKey = trimmed.replace('VITE_SUPABASE_ANON_KEY=', '').trim();
    }
  }
}

console.log('Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
console.log('Key prefix:', supabaseAnonKey.substring(0, 15) + '...');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('ERROR: Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runTest() {
  try {
    console.log('\n1. Fetching floor_events from database...');
    const { data, error } = await supabase
      .from('floor_events')
      .select('*');

    if (error) {
      console.error('❌ Supabase Query Error:', error.message);
      console.error('Details:', error);
      if (error.message.includes('relation "public.floor_events" does not exist') || error.code === '42P01') {
        console.log('\n⚠️ The table "floor_events" has NOT been created yet in this Supabase project.');
        console.log('👉 ACTION REQUIRED: Run the SQL query in supabase/schema.sql inside your Supabase SQL Editor!');
      } else if (error.message.includes('JWT') || error.message.includes('API key') || error.code === 'PGRST301') {
        console.log('\n⚠️ Invalid API key or authorization issue.');
      }
      return false;
    }

    console.log('✅ Successfully connected to Supabase!');
    console.log(`Found ${data.length} floor records:`);
    console.table(data);

    if (data.length === 0) {
      console.log('\n⚠️ Table exists, but has 0 rows. Please run the seed inserts in supabase/schema.sql.');
    } else {
      console.log('\n2. Testing write permission (upsert Floor 1)...');
      const testUpdate = await supabase
        .from('floor_events')
        .update({ updated_at: new Date().toISOString() })
        .eq('floor_number', 1);

      if (testUpdate.error) {
        console.error('❌ Update test failed:', testUpdate.error.message);
        console.log('👉 Check your RLS policies in supabase/schema.sql.');
      } else {
        console.log('✅ Update test succeeded! Anonymous updates are allowed.');
      }
    }

    return true;
  } catch (err) {
    console.error('❌ Network exception connecting to Supabase:', err.message);
    return false;
  }
}

runTest().then((success) => {
  console.log('\n--- Test Complete. Success:', success, '---');
});
