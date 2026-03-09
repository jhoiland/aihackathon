# Travel Discovery App - Feature Guide

## Overview

The Travel Discovery App is a modern web application that helps users discover travel destinations and get personalized recommendations. It works entirely with mock data and local storage, making it perfect for demonstrations and offline use.

## Main Features

### 1. Explore Page (Home)

**Route**: `/`

The main discovery page where users browse travel destinations.

**Features**:
- **Featured Destinations Grid**: Beautiful cards showing all available cities
- **Smart Filtering**:
  - Climate filter (Tropical, Temperate, Cold)
  - Travel Type (Solo, Couple, Family, Group, Adventure)
  - Interests (Culture, Nightlife, Food, Nature, History, Shopping, Relaxation, Adventure, Art, Music)
  - Click badges/buttons to toggle filters
  - Multiple selections create more specific results
  - "Clear all filters" button appears when filters are active

- **Destination Cards** show:
  - Beautiful hero image with hover zoom effect
  - City name and description
  - What it's known for (tags)
  - Climate and best time to visit
  - Heart icon to save to favorites
  - Click card to view full city guide

**Recommendations**: Items are sorted by relevance based on user preferences

### 2. City Guide Page

**Route**: `/city/[id]`

Complete information about a specific destination.

**Sections**:

#### Overview
- Large hero image
- City name and description
- Back button to explore
- Favorite button (heart icon)
- Climate and best time to visit info cards

#### What It's Known For
- List of defining characteristics and attractions

#### Must-See Attractions
- Grid of iconic must-visit attractions
- Each shows:
  - Beautiful image
  - Name and location
  - Description
  - "Why Recommended" reasons
  - Tags matching interests
  - Visitor tips

#### Hidden Gems
- Undiscovered or less famous attractions
- Same structure as must-see attractions
- Great for travelers seeking unique experiences

#### Where to Eat
- Restaurant recommendations
- Organized by category:
  - **Budget**: Affordable street food and casual dining
  - **Mid-range**: Quality restaurants
  - **Fine Dining**: Premium culinary experiences
  - **Local Favorites**: Authentic, popular spots
  - **Vegetarian-Friendly**: Plant-based options

- Each restaurant shows:
  - Name and category badge
  - Location with map icon
  - Cuisine type and price level
  - Specialty dishes
  - Interest tags
  - Full description

#### Things to Do
- Activities and experiences
- Each includes:
  - Activity image
  - Name and category
  - Duration
  - Price level
  - Interest tags
  - Description

#### Travel Tips
- Practical information organized by category:
  - **Transport**: Getting around the city
  - **Safety**: Important safety information
  - **Timing**: Best times and weather considerations
  - **General**: Other useful tips

### 3. Search Page

**Route**: `/search`

Fast, real-time search across all entities.

**Features**:
- Search input in prominent search header
- Auto-triggering results as you type
- Results organized by category:
  - **Destinations** (cities)
  - **Attractions**
  - **Restaurants**
  - **Things to Do** (activities)

- Each result is clickable and navigates to relevant detail page
- Shows "No results" message when search yields nothing
- Browse all destinations button when search is empty

**Search matches**:
- City names and descriptions
- Attraction names and descriptions
- Restaurant names, cuisine, and descriptions
- Activity names, categories, and descriptions

### 4. Favorites Page

**Route**: `/favorites`

Personal collection of saved destinations and experiences.

**Features**:
- View all saved items organized by type
- Save counter in header
- Three sections:
  - **Favorite Destinations**: Full cards with images
  - **Favorite Attractions**: List view with thumbnail images
  - **Favorite Restaurants**: Organized by category

- Actions:
  - Click any item to view full details
  - Remove button on each item to unsave
  - Automatic persistence to localStorage
  - Empty state with suggestions

**Empty State**: When no favorites are saved
- Shows inspiring message
- Button to browse destinations
- Encourages exploration

### 5. Profile & Preferences

**Route**: `/profile`

Customize travel profile for personalized recommendations.

**Settings**:

1. **Age Group** (Required)
   - 18-24
   - 25-34
   - 35-49
   - 50-64
   - 65+

2. **Travel Type** (Required)
   - Solo travel
   - Couple travel
   - Family travel
   - Group travel
   - Adventure travel

3. **Budget Preference** (Required)
   - Budget ($ - Backpacking, street food)
   - Mid-range ($$ - Comfortable, mixed)
   - Fine Dining ($$$-$$$$- Upscale)

4. **Preferred Climate** (Optional)
   - Tropical
   - Temperate
   - Cold
   - Any

5. **Preferred Season** (Optional)
   - Spring
   - Summer
   - Fall
   - Winter
   - Any

6. **Interests** (Multiple Select)
   - Culture
   - Nightlife
   - Food
   - Nature
   - History
   - Shopping
   - Relaxation
   - Adventure
   - Art
   - Music

**Actions**:
- Save preferences (auto-persisted to localStorage)
- Reset to defaults
- Success message on save
- Info card explaining how preferences are used

**How Preferences Are Used**:
- Recommendations are ranked by matching interests and age-appropriateness
- Restaurants are filtered by budget preference
- Activities are sorted by relevance to interests
- Artists can update preferences anytime to discover new recommendations

## Navigation

The top navigation bar is sticky and always visible:

**Desktop**: Shows all navigation items inline
- Branding icon (purple-pink gradient)
- Explore
- Search
- Favorites
- Profile

**Mobile**: Hamburger menu with collapsible navigation
- Brand name hidden to save space
- Menu toggle button visible
- Same navigation items available

**Active page**: Highlighted with primary color background

## Data Organization

### Cities (6 total)
- Rome (Italy)
- Tokyo (Japan)
- Barcelona (Spain)
- Paris (France)
- Bangkok (Thailand)
- Amsterdam (Netherlands)

### Attractions (13 total)
- Multiple per city
- Mix of must-sees and hidden gems
- Historical, cultural, and scenic

### Restaurants (12 total)
- Multiple per city
- Variety of categories and price levels
- Different cuisines

### Activities (9 total)
- Experiences and things to do
- Various categories and durations
- Multiple interests per city

### Travel Tips (9 total)
- Practical information
- Safety, transport, timing tips
- City-specific advice

## Key Features

### Smart Recommendations

The app uses flexible recommendation logic:

- **No hard-coding**: Recommendations aren't baked into descriptions
- **Relevance scoring**: Items are sorted by matching your preferences
- **Interest matching**: Higher scores for matching interests
- **Age-based filtering**: Items marked for your age group rank higher
- **Budget alignment**: Restaurants filtered by price preference
- **Dynamic**: Update preferences to see changes immediately

### Data Persistence

Uses browser localStorage (client-side):
- **Favorites**: Auto-saved when items are saved/removed
- **Preferences**: Saved when profile is updated
- **Persistence**: Data survives browser refresh and session restarts
- **No accounts**: No login or backend required
- **Privacy**: All data stays on your device

### Responsive Design

- **Desktop**: Full navigation bar, multi-column grids
- **Tablet**: Optimized spacing, flexible layouts
- **Mobile**: Single-column layouts, hamburger menu, touch-optimized

### Visual Design

- **Modern**: Clean, contemporary aesthetic
- **Premium**: High-quality imagery and spacing
- **Color Scheme**:
  - Primary: Purple (actions and highlights)
  - Secondary: Pink (accents)
  - Neutral: Grays (backgrounds and text)
  - Accent: Red (favorites)
  
- **Typography**: Clear hierarchy with modern fonts
- **Transitions**: Smooth hover effects and animations
- **Icons**: Lucide React icons for consistency

## User Journeys

### Journey 1: First-Time Discovery
1. Land on Explore page
2. Filter by interests (e.g., "Food", "Culture")
3. Click a destination card
4. Browse attractions and restaurants
5. Save favorites
6. Go to profile to refine preferences

### Journey 2: Planning a Trip
1. Go to Favorites page
2. Review saved destinations
3. Use Search to find specific restaurants
4. Check Profile for travel plan alignment
5. Explore related cities

### Journey 3: Customizing Recommendations
1. Go to Profile
2. Update age group and interests
3. Save preferences
4. Return to Explore to see re-ranked recommendations
5. Notice different items ranked higher

## Technical Implementation

### Component Architecture
- **Navigation**: Reusable with active state tracking
- **DestinationCard**: Reusable card with favorites integration
- **UI Components**: Modular shadcn/ui components
- **Pages**: Fully functional with data loading and state management

### Data Flow
1. Mock data in `lib/mockData.ts`
2. Components fetch from mock data
3. Storage utilities (`lib/storage.ts`) manage persistence
4. Preference-based sorting applied client-side
5. All data stays in browser (no API calls)

### State Management
- React hooks for component state
- localStorage for persistence
- URL params for routing
- No external state management needed

## Performance

- Next.js static generation for fast loads
- Image optimization with placeholder blur
- Responsive images scale properly
- Smooth animations using CSS transitions
- Efficient filtering and searching
- No unnecessary re-renders

## Customization Guide

### Adding a New City

Edit `lib/mockData.ts`:

1. Add to `mockCountries` if needed
2. Add to `mockCities`:
```typescript
{
  id: "new-city",
  countryId: "country-id",
  name: "City Name",
  description: "...",
  image: "url",
  knownFor: ["tag1", "tag2"],
  climate: "Temperate",
  bestTimeToVisit: "Month-Month",
  introText: "...",
}
```
3. Add attractions, restaurants, activities matching cityId
4. Add travel tips matching cityId

### Changing Colors

Edit `app/globals.css` CSS variables section:
```css
:root {
  --primary: 0 100% 50%; /* Change hue, saturation, lightness */
  --accent: 0 84.2% 60.2%;
  /* ... etc */
}
```

Or edit `tailwind.config.js` for more control.

### Modifying Filters

Edit `app/page.tsx`:
```typescript
const climateOptions = ["tropical", "temperate", "cold"];
const interestOptions: Interest[] = [
  "culture", "nightlife", // ... add or remove
];
```

## Future Enhancements

- Backend API integration
- Real restaurant data
- User authentication
- Comments and ratings
- Trip itinerary builder
- Mobile app version
- Real-time availability
- Booking integration

---

Enjoy exploring the Travel Discovery App! Questions? Check README.md for more info.
