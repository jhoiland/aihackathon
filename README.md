# Travel Discovery App

A modern, clean, and inspiring travel app that helps users discover attractive travel destinations and get personalized recommendations for things to do, eat, and experience.

## Features

- **Explore Destinations**: Browse beautiful travel destinations with filtering by climate, travel type, and interests
- **Smart Recommendations**: Get personalized suggestions based on your age group, interests, and travel preferences
- **City Guides**: Detailed information about each destination including attractions, restaurants, activities, and travel tips
- **Search**: Fast search across all destinations, attractions, restaurants, and activities
- **Favorites**: Save your favorite cities and experiences for easy access
- **Preferences**: Customize your travel preferences to get better recommendations
- **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with CSS variables for theming
- **Components**: shadcn/ui custom component library
- **State Management**: React hooks with localStorage for persistence
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## Project Structure

```
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Explore/home page
│   ├── globals.css              # Global styles
│   ├── city/[id]/page.tsx       # City detail page
│   ├── search/page.tsx          # Search page
│   ├── favorites/page.tsx       # Favorites page
│   └── profile/page.tsx         # Profile & preferences page
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── label.tsx
│   ├── navigation.tsx           # Main navigation component
│   └── destination-card.tsx     # Reusable destination card
├── lib/
│   ├── utils.ts                 # Utility functions (cn)
│   ├── types.ts                 # TypeScript type definitions
│   ├── mockData.ts              # Mock data for all entities
│   └── storage.ts               # localStorage utilities
├── public/                       # Static assets
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── next.config.js               # Next.js configuration
└── .env.local                   # Environment variables (example)
```

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-discovery-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm start` - Run production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Usage

### Explore Page
- Browse featured destinations with beautiful cards
- Filter by climate, travel type, and interests
- Click any destination to view detailed information
- Save destinations to favorites

### City Guide
- View comprehensive information about each city
- See must-see attractions and hidden gems
- Browse restaurant recommendations sorted by category
- Discover activities and things to do
- Get practical travel tips

### Search
- Search across all destinations, attractions, restaurants, and activities
- Real-time search results with autosuggest
- Click to view full details

### Favorites
- Save cities, attractions, and restaurants
- View all your saved items in one place
- Remove items by clicking the trash icon
- Favorites persist across sessions

### Profile & Preferences
- Set your age group
- Choose your interests (culture, food, nightlife, etc.)
- Select travel type (solo, couple, family, group, adventure)
- Set budget preference
- Choose preferred climate and season
- Recommendations update based on preferences

## Data Structure

### Cities
- Name, country, description
- Climate, best time to visit
- Known for (tags)
- Beautiful hero images

### Attractions
- Must-see and hidden gems
- Detailed descriptions
- Location with tips
- Age-based recommendations
- Tags matching interests

### Restaurants
- Multiple categories (budget, mid-range, fine-dining, local favorites, vegetarian-friendly)
- Cuisine type and specialties
- Price levels
- Why recommended

### Activities
- Duration and category
- Price levels
- Tags and age recommendations
- Images and descriptions

## Smart Recommendations

The app uses flexible recommendation logic based on:
- **Age Group**: 18-24, 25-34, 35-49, 50-64, 65+
- **Interests**: Culture, nightlife, food, nature, history, shopping, relaxation, adventure, art, music
- **Travel Type**: Solo, couple, family, group, adventure
- **Budget**: Budget, mid-range, fine-dining

Recommendations are re-ranked based on matching interests and age-appropriateness without hard-coding suggestions.

## Customization

### Adding New Destinations
Edit `lib/mockData.ts` and add entries to:
- `mockCountries`
- `mockCities`
- `mockAttractions`
- `mockRestaurants`
- `mockActivities`
- `mockTravelTips`

### Styling
- Colors: Edit CSS variables in `app/globals.css`
- Tailwind: Customize in `tailwind.config.js`
- Components: Located in `components/ui/`

### Data Models
Type definitions are in `lib/types.ts`. Extend them as needed for your use case.

## Storage

Data is persisted using browser localStorage:
- **Favorites**: Automatically synced with localStorage
- **User Preferences**: Saved when profile is updated
- **Data is preserved** across browser sessions

Note: In a production app, this would be replaced with a backend database (Supabase, Firebase, etc.)

## Performance

- Static generation for improved performance
- Image optimization with Next.js Image
- Responsive design for all screen sizes
- Smooth animations and transitions
- Optimized for Core Web Vitals

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Backend API integration with Supabase
- User authentication and sync
- Real restaurant and attraction data from APIs
- User reviews and ratings
- Trip planning and itinerary builder
- Push notifications for travel deals
- Offline support with service workers
- Dark mode toggle (CSS already supports it)

## Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
Works with any Node.js hosting:
- Netlify
- AWS Amplify
- Railway
- Render
- DigitalOcean

## License

MIT License - feel free to use this project as a template

## Support

For issues, questions, or suggestions, please open an issue or contact the development team.

---

Built with ❤️ using Next.js and Tailwind CSS
