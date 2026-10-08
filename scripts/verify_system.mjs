import fs from 'fs';
import path from 'path';

console.log('--- RUNNING HACKNEXT SYSTEM INTEGRITY CHECK ---');

// 1. Verify schema.sql
const schemaPath = path.resolve('supabase/schema.sql');
if (!fs.existsSync(schemaPath)) {
  console.error('FAIL: supabase/schema.sql missing');
  process.exit(1);
}
const schemaContent = fs.readFileSync(schemaPath, 'utf8');
if (!schemaContent.includes('floor_events') || !schemaContent.includes('floor_number INTEGER UNIQUE')) {
  console.error('FAIL: schema.sql missing required table structure');
  process.exit(1);
}
console.log('✓ supabase/schema.sql verified');

// 2. Verify .env.example
const envExamplePath = path.resolve('.env.example');
if (!fs.existsSync(envExamplePath)) {
  console.error('FAIL: .env.example missing');
  process.exit(1);
}
console.log('✓ .env.example verified');

// 3. Verify dist bundle
const distIndex = path.resolve('dist/index.html');
if (!fs.existsSync(distIndex)) {
  console.error('FAIL: dist/index.html missing');
  process.exit(1);
}
console.log('✓ Production build assets present in dist/');

// 4. Verify asset files
const logoLeft = path.resolve('public/assets/logo-left.png');
const logoRight = path.resolve('public/assets/logo-right.png');
if (!fs.existsSync(logoLeft) || !fs.existsSync(logoRight)) {
  console.error('FAIL: Logo assets missing in public/assets/');
  process.exit(1);
}
console.log('✓ College logo assets verified');

// 5. Verify README.md
const readme = path.resolve('README.md');
if (!fs.existsSync(readme)) {
  console.error('FAIL: README.md missing');
  process.exit(1);
}
console.log('✓ README.md documentation verified');

console.log('ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!');
