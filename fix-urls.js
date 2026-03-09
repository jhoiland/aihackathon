const fs = require('fs');

let content = fs.readFileSync('lib/mockData.ts', 'utf8');

// Find all old unsplash URLs (may span multiple lines)
const oldUrls = content.match(/https:\/\/images\.unsplash\.com\/photo-[^\s"]+/g);
console.log(`Found ${oldUrls ? oldUrls.length : 0} old URLs to replace`);

if (oldUrls && oldUrls.length > 0) {
  console.log('Sample old URL:', oldUrls[0].substring(0, 100));
}

// Replace all old unsplash photo URLs - use [\s\S]* to match across newlines
const newContent = content.replace(/https:\/\/images\.unsplash\.com\/photo-[^\s"]+/g, 'https://source.unsplash.com/600x400/?landmark');

fs.writeFileSync('lib/mockData.ts', newContent);
console.log('✓ All image URLs updated successfully');
