const fs = require('fs');

let content = fs.readFileSync('lib/mockData.ts', 'utf8');

// Replace source.unsplash.com URLs with picsum.photos
// For countries/cities (500x300 and 800x500)
content = content.replace(/https:\/\/source\.unsplash\.com\/500x300[^"]*/g, (match, offset) => {
  const id = Math.floor(offset / 100) % 100;
  return `https://picsum.photos/500/300?random=${id}`;
});

content = content.replace(/https:\/\/source\.unsplash\.com\/800x500[^"]*/g, (match, offset) => {
  const id = Math.floor(offset / 200) % 100;
  return `https://picsum.photos/800/500?random=${id}`;
});

// For attractions/restaurants/activities (600x400)
content = content.replace(/https:\/\/source\.unsplash\.com\/600x400[^"]*/g, (match, offset) => {
  const id = Math.floor(offset / 150) % 100;
  return `https://picsum.photos/600/400?random=${id}`;
});

fs.writeFileSync('lib/mockData.ts', content);
console.log('✓ All URLs switched to picsum.photos');
