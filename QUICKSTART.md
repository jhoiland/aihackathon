# Quick Start Guide

Welcome to the Travel Discovery App! Here's everything you need to get started.

## 🚀 Installation (5 minutes)

### Step 1: Install Node.js
If not already installed:
1. Go to https://nodejs.org/ 
2. Download LTS version
3. Install it (accept defaults)
4. Verify: Open terminal/command prompt and run:
   ```
   node --version
   npm --version
   ```

### Step 2: Install & Run

**Windows**: 
- Double-click `setup.bat` in project folder
- App starts at http://localhost:3000

**macOS/Linux**:
```bash
chmod +x setup.sh
./setup.sh
```

**Manual** (any OS):
```bash
npm install
npm run dev
```

Then open: http://localhost:3000

## 🎯 What You Can Do

### Explore Destinations
- ✅ Browse 6 beautiful cities
- ✅ Filter by climate, travel type, interests
- ✅ Save to favorites with heart icon
- ✅ Click any card to view full details

### View City Guides
- ✅ See must-see attractions
- ✅ Find hidden gems
- ✅ Browse restaurants by category
- ✅ Discover activities
- ✅ Read travel tips

### Search Everything
- ✅ Search cities, attractions, restaurants
- ✅ Real-time results as you type
- ✅ Click results to view details

### Manage Favorites
- ✅ View all saved items
- ✅ Organized by type
- ✅ Auto-saved to browser
- ✅ Remove items you don't want

### Set Preferences
- ✅ Choose age group
- ✅ Set interests
- ✅ Select travel type
- ✅ Set budget preference
- ✅ Choose climate/season
- ✅ Get better recommendations

## 📱 Navigation

**Top Navigation Bar** (sticky):
- `Travel` logo → Back to home/explore
- `Explore` → Browse all destinations
- `Search` → Find anything
- `Favorites` → Your saved items
- `Profile` → Set preferences

**Mobile**: Hamburger menu on right

## 🎨 The App Experience

### Explore Page (Home)
```
[Beautiful gradient hero]
"Discover Your Next Journey"

[Filter options]
Climate | Travel Type | Interests

[Destination cards in grid]
Each shows: Image | Name | Description | Tags | Heart icon
```

### City Guide Page
```
[Large hero image of city]

City Name | ♥ favorite button

What It's Known For [tags]

Must-See Attractions [cards with images]

Hidden Gems [cards with images]

Where to Eat [restaurants list]

Things to Do [activities]

Travel Tips [practical info]
```

### Search Page
```
[Search input at top]

[Results organized by type]
Destinations | Attractions | Restaurants | Activities

Click any result to view details
```

### Favorites Page
```
Your Saved Items

[Organized by type]
Favorite Destinations | Attractions | Restaurants

[Each has remove button]

Empty state: "Start exploring and save items"
```

### Profile Page
```
Travel Preferences

Settings:
- Age Group (18-24, 25-34, etc.)
- Travel Type (solo, couple, family, etc.)
- Budget (budget, mid-range, fine-dining)
- Climate (prefer tropical/temperate/cold/any)
- Season (prefer spring/summer/fall/winter/any)
- Interests (select multiple: culture, food, nightlife, etc.)

[Save button] [Reset button]
```

## 💾 How Data Works

- **Favorites**: Saved in your browser (localStorage)
- **Preferences**: Saved in your browser (localStorage)
- **Persistence**: Survives browser refresh
- **No Account**: No login required
- **Privacy**: Everything stays on your device
- **Pre-loaded Data**: 6 cities with complete info

## 🔧 Common Tasks

### Add a Favorite
- Click ♥ heart on any city/attraction/restaurant
- Heart fills with red color
- Item added to Favorites page

### Remove a Favorite
- Go to Favorites page
- Click "Remove" button on item
- Item is removed

### Update Preferences
1. Click "Profile" in navigation
2. Change any settings
3. Click "Save Preferences"
4. See "Preferences saved" message
5. Recommendations update throughout app

### Search for Something
1. Click "Search" in navigation
2. Type in search box
3. Results appear instantly
4. Click result to view full details

### Filter Destinations
1. On Explore page, scroll under hero
2. Click filter buttons/badges
3. Results update instantly
4. Click "Clear all filters" to reset

## 📚 Available Data

### Cities
- Rome, Italy
- Tokyo, Japan
- Barcelona, Spain
- Paris, France
- Bangkok, Thailand
- Amsterdam, Netherlands

### Per City
- 2-3 Must-see attractions
- 1-2 Hidden gems
- 2 Restaurants (various categories)
- 1-2 Activities
- 2-3 Travel tips

## 🎯 MVP Features Included

✅ Browse destinations with beautiful cards
✅ Filter by climate, travel type, interests
✅ Save to favorites
✅ View detailed city guides
✅ Multiple restaurant categories
✅ Must-see and hidden gem attractions
✅ Activities and things to do
✅ Travel tips and practical information
✅ Fast search functionality
✅ Set travel preferences
✅ Smart recommendation sorting
✅ Mobile responsive design
✅ Data persists across sessions
✅ Clean, modern UI
✅ Smooth interactions and animations

## 🚫 Not Included (Future)

❌ User authentication/accounts
❌ Backend database
❌ Real API data
❌ Payment/booking
❌ User reviews
❌ Map integration

## 💡 Tips

1. **Start with Explore**: Get a feel for the app and cities
2. **Try Filtering**: Use climate/interests to narrow down
3. **Set Preferences**: Update profile to personalize recommendations
4. **Favorite Cities**: Save ones you're interested in
5. **Check Details**: Click on cities to see full information
6. **Use Search**: Quickly find specific restaurants or activities
7. **Return Often**: Your favorites and preferences are saved

## 🐛 Troubleshooting

**Page blank/errors?**
- Refresh browser (Ctrl+R or Cmd+R)
- Check browser console (F12) for red errors

**Favorites/Preferences not saving?**
- Check browser LocalStorage is enabled (usually is by default)
- Try private/incognito mode (not recommended for persistent data)

**App won't start?**
- Make sure Node.js is installed (check `node --version`)
- Try: `npm install` then `npm run dev`
- Make sure no other app is using port 3000

**Slow loading?**
- First load can take 5-10 seconds (normal)
- After that should be instant

## 📖 More Help

- **README.md**: Full documentation
- **SETUP.md**: Detailed setup instructions
- **FEATURES.md**: Complete feature guide

## 🎉 You're Ready!

1. Run the app: `npm run dev`
2. Open: http://localhost:3000
3. Start exploring!

Have fun discovering amazing travel destinations! ✈️🌍

---

Questions? Check the documentation files in the project root.
