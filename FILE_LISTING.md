# Complete File Listing - Travel Discovery App

This document lists every file in the project with brief descriptions.

## Configuration Files

### package.json
- All npm dependencies (Next.js, React, Tailwind, shadcn/ui, etc.)
- Scripts: dev, build, start, lint, type-check
- Private: true (npm will not publish)

### tsconfig.json
- TypeScript compiler options
- Strict mode enabled
- Path aliases configured (@/* for imports)

### next.config.js
- Next.js configuration
- React strict mode enabled
- Image optimization disabled for dev

### tailwind.config.js
- Tailwind CSS configuration
- Dark mode support
- Custom color theme
- Animation support customized

### postcss.config.js
- PostCSS plugins
- Tailwind and autoprefixer configured

### .env.local
- Environment variables (empty by default)
- For adding API URLs or configuration

### .gitignore
- Git ignore rules
- Ignores node_modules, build files, env files, etc.

---

## Root Documentation

### README.md (Comprehensive)
- Project overview
- Features list
- Tech stack details
- Project structure
- Installation steps
- Usage guide for each page
- Data structure explanation
- Storage information
- Browser support
- Future enhancements
- Deployment guide

### PROJECT_SUMMARY.md (Complete Overview)
- What was built
- Page-by-page breakdown
- Component listing
- Data organization
- Feature checklist
- All requirements met
- How to start
- What's included/not included

### SETUP.md (Step-by-Step)
- Quick start section
- Node.js installation guide
- Manual setup steps
- Troubleshooting guide
- Development commands
- Production deployment
- Environment variables
- System requirements

### FEATURES.md (Detailed Guide)
- Feature overview
- Page-by-page features
- Navigation map
- Data organization
- User journeys
- Technical implementation
- Customization guide

### QUICKSTART.md (5-Minute Reference)
- Quick installation
- What you can do
- Navigation guide
- App experience walkthrough
- Common tasks
- Data overview
- Tips and tricks

---

## Setup Scripts

### setup.bat
- Windows batch script
- Checks for Node.js
- Installs dependencies
- Starts dev server
- Opens localhost:3000

### setup.sh
- macOS/Linux shell script
- Makes itself executable
- Checks for Node.js
- Installs dependencies
- Starts dev server

---

## App Directory (/app)

### layout.tsx
- Root layout component
- HTML structure
- Imports globals.css
- Sets metadata (title, description)

### page.tsx (Explore Page)
- Main homepage
- Destination browsing
- Filter system (climate, travel type, interests)
- Displays destination cards
- Shows result count

### globals.css
- Tailwind directives
- CSS custom variables
- Color theme definitions
- Light and dark mode colors
- Global styles
- Smooth scroll behavior

### city/[id]/page.tsx (City Guide)
- Dynamic routes for each city
- Back button
- City hero image
- Overview section
- "Known for" tags
- Must-see attractions grid
- Hidden gems section
- Restaurant recommendations
- Activities section
- Travel tips
- Favorites button

### search/page.tsx (Search Page)
- Search input UI
- Real-time search
- Results organized by type
- Clickable results
- Empty state handling

### favorites/page.tsx (Favorites Page)
- Displays all saved favorites
- Organized by type
- Remove buttons
- Empty state message
- Guidance to explore

### profile/page.tsx (Profile/Preferences)
- Preference settings
- Age group selector
- Travel type selector
- Budget preference
- Climate/season selectors
- Interest multi-select
- Save and reset buttons
- Info cards about usage

---

## Components Directory (/components)

### navigation.tsx
- Responsive navigation bar
- Desktop horizontal menu
- Mobile hamburger menu
- Logo with icon
- Active page highlighting
- Links to all routes

### destination-card.tsx
- Reusable city card component
- Image with hover zoom
- City name overlay
- Description
- "Known for" tags
- Climate and timing info
- Favorites heart button
- Click to navigate to city

---

## UI Components Directory (/components/ui)

### button.tsx
- CVA-based button component
- Variants: default, outline, ghost, secondary, destructive, link
- Sizes: default, sm, lg, icon
- Fully styled and accessible

### card.tsx
- Card container component
- CardHeader, CardTitle, CardDescription
- CardContent, CardFooter
- Used throughout app

### input.tsx
- Text input field
- Search bar compatible
- Full Tailwind styling
- Accessible with focus states

### badge.tsx
- Topic/tag display
- Variants: default, secondary, destructive, outline
- Small, round pill shape
- Used for filtering and display

### select.tsx
- Dropdown select component
- Radix UI based
- Scrollable options
- Check icon for selection
- Keyboard accessible

### dialog.tsx
- Modal dialog component
- Radix UI DialogPrimitive
- Overlay with blur backdrop
- Close button with X icon
- Header, footer, title, description subcomponents

### dropdown-menu.tsx
- Context menu component
- Radix UI based
- Multi-level support
- Checkboxes and radio options
- Separators and labels

### label.tsx
- Form label component
- Radix UI based
- Clean styling
- Keyboard accessible

---

## Library Directory (/lib)

### types.ts
- TypeScript type definitions
- AgeGroup type (5 options)
- TravelType (5 options)
- Interest (10 options)
- PriceLevel (3 options)
- UserPreferences interface
- Country interface
- City interface
- Attraction interface
- Restaurant interface
- Activity interface
- TravelTip interface
- CityGuide interface
- Favorite interface

### mockData.ts
- Complete mock data
- mockCountries (6 countries)
- mockCities (6 cities with full data)
- mockAttractions (13 attractions)
- mockRestaurants (12 restaurants)
- mockActivities (9 activities)
- mockTravelTips (9 tips)
- All with realistic descriptions
- Images via Unsplash URLs

### storage.ts
- localStorage utilities
- getFavoritesFromStorage()
- saveFavoritestoStorage()
- addToFavorites()
- removeFromFavorites()
- isFavorited()
- getPreferencesFromStorage()
- savePreferencestoStorage()
- getDefaultPreferences()
- shouldRecommendForAge()
- calculateRelevanceScore()
- sortByRelevance()

### utils.ts
- Utility functions
- cn() function for class merging
- Combines clsx and tailwind-merge

---

## What Each Page Does

### / (Explore Page)
- Browse 6 beautiful travel destinations
- Filter by climate, travel type, interests
- Save favorites with heart icon
- See destination cards in grid
- Click to view full city details

### /city/[id] (City Guide Page)
- View complete city information
- See must-see attractions
- Find hidden gems
- Browse restaurants by category
- Discover activities
- Check travel tips
- Save favorites

### /search (Search Page)
- Type to search in real-time
- Results organized by type
- Find cities, attractions, restaurants, activities
- Click results to view details

### /favorites (Favorites Page)
- View all saved items
- Organized by type
- Remove items
- Empty state with guidance

### /profile (Profile Page)
- Set age group
- Choose interests
- Select travel type
- Set budget preference
- Choose climate/season
- Save preferences

---

## Data Flow

1. Components import from /lib/mockData.ts
2. Storage utilities manage localStorage
3. Preferences affect sorting/recommendations
4. UI components render data
5. Navigation connects pages
6. All data stays in browser

---

## File Count Summary

- Configuration files: 6
- Documentation: 5
- Setup scripts: 2
- App pages: 6
- Components: 2
- UI Components: 8
- Library utilities: 4

**Total: 33 files (excluding git/node_modules)**

---

## Key File Dependencies

```
app/
├── page.tsx
│   ├── components/navigation.tsx
│   ├── components/destination-card.tsx
│   ├── components/ui/button.tsx
│   ├── lib/mockData.ts
│   ├── lib/types.ts
│   └── lib/storage.ts

├── city/[id]/page.tsx
│   ├── components/navigation.tsx
│   ├── components/ui/card.tsx
│   ├── components/ui/badge.tsx
│   ├── lib/mockData.ts
│   └── lib/storage.ts

├── search/page.tsx
│   ├── components/navigation.tsx
│   ├── components/ui/input.tsx
│   ├── components/ui/button.tsx
│   ├── lib/mockData.ts
│   └── lib/types.ts

├── favorites/page.tsx
│   ├── components/navigation.tsx
│   ├── components/ui/card.tsx
│   ├── components/ui/button.tsx
│   ├── lib/storage.ts
│   └── lib/mockData.ts

└── profile/page.tsx
    ├── components/navigation.tsx
    ├── components/ui/select.tsx
    ├── components/ui/label.tsx
    ├── components/ui/badge.tsx
    ├── lib/types.ts
    └── lib/storage.ts
```

---

## Editing Guide

To modify the app:

1. **Colors**: Edit app/globals.css CSS variables
2. **Add cities**: Edit lib/mockData.ts
3. **Change filters**: Edit app/page.tsx
4. **Add routes**: Create app/newroute/page.tsx
5. **Modify components**: Edit components/
6. **Change types**: Edit lib/types.ts

---

## Build Output

When you run `npm run build`:
- Compiles TypeScript
- Bundles React code
- Optimizes images
- Creates .next/ folder
- Ready for production deployment

---

This covers every file in the project. For more details about specific features, see README.md or FEATURES.md.
