# Google Maps Places API Integration Plan

## Project Analysis

### Current Structure
- **Framework**: Next.js 14 with TypeScript
- **Data Layer**: `lib/mockData.ts` - hardcoded mock data
- **Types**: `lib/types.ts` - data structure definitions
- **Storage**: `lib/storage.ts` - localStorage management
- **Components**: Reusable Tailwind CSS components in `components/`
- **Pages**: App router with pages for explore, city guide, search, favorites, profile

### Existing Data
- 12 countries (without lat/lng)
- 16 cities (without lat/lng)
- 40+ attractions, 15+ restaurants, 13+ activities (mock data)

### Current Capabilities
✅ Client-side filtering and sorting
✅ Favorites/preferences persistence
✅ Responsive UI with Tailwind CSS
✅ Search functionality
❌ Real location data
❌ API integration
❌ Dynamic data fetching
❌ Map display

---

## Implementation Strategy

### Phase 1: Data Structures & Types
**Files to create/update:**
- `lib/types.ts` - Add new interfaces for Google Places
- `lib/cities.ts` - 200 cities with coordinates
- `lib/googlePlaceTypes.ts` - Google Places API response types

**Changes needed:**
```
✓ Extend City interface: add lat, lng, priority fields
✓ Create GooglePlace type for API responses
✓ Create PlacesCache type for storing synced data
✓ Create RankingScore type for scoring logic
```

### Phase 2: API Integration Layer
**Files to create:**
- `lib/googlePlaces.ts` - Google Places API client
- `lib/ranking.ts` - Sorting/ranking logic
- `lib/deduplication.ts` - Dedup by place_id
- `app/api/places/route.ts` - GET/POST places
- `app/api/sync/route.ts` - Trigger sync job

**Functionality:**
```
✓ Text Search API for attractions
✓ Nearby Search API for restaurants/hotels
✓ Place Details API for additional info
✓ Rating/review sorting
✓ Distance calculation from city center
✓ Duplicate detection via place_id
```

### Phase 3: Cache Management
**File to create:**
- `lib/placeCache.ts` - LocalStorage/IndexedDB cache

**Functionality:**
```
✓ Store synced places locally
✓ Check cache before API call
✓ Update on sync
✓ Fallback to mock data if offline
```

### Phase 4: UI Extensions
**Components to create:**
- `components/PlacesList.tsx` - Table/list view
- `components/PlacesMap.tsx` - Map component
- `components/PlaceFilters.tsx` - Rating/distance filters
- `components/PlaceCard.tsx` - Individual place card

**Page updates:**
- `app/city/[id]/page.tsx` - Add tabs for Attractions/Restaurants/Hotels

**Features:**
```
✓ Tab navigation between place types
✓ List + Map views
✓ Filters: rating, distance, price
✓ Sort options
✓ Click to see details
```

---

## Detailed File Structure

### New Files (18 files)

```
lib/
  ├── cities.ts                    # 200 cities with coordinates
  ├── googlePlaceTypes.ts          # Google API response types
  ├── googlePlaces.ts              # API client + Text/Nearby search
  ├── ranking.ts                   # Sorting: ratings, reviews, distance
  ├── deduplication.ts             # Dedup logic using place_id
  └── placeCache.ts                # Cache management

app/api/
  ├── places/
  │   └── route.ts                 # GET/POST places with caching
  └── sync/
      └── route.ts                 # POST to trigger category sync

components/
  ├── PlacesList.tsx               # List/table view
  ├── PlacesMap.tsx                # Google Map display
  ├── PlaceFilters.tsx             # Filter sidebar
  ├── PlaceCard.tsx                # Individual place card
  └── PlacesTabs.tsx               # Attraction/Restaurant/Hotel tabs

hooks/
  └── usePlaces.ts                 # Hook for fetching places
```

### Modified Files (4 files)

```
lib/
  ├── types.ts                     # Add new interfaces
  └── mockData.ts                  # Update with lat/lng

app/
  └── city/[id]/
      └── page.tsx                 # Add tabs and place sections

package.json                        # Add: google-map-react, axios
```

---

## Implementation Order

1. **Types & Data** (5 min)
   - Update City interface with lat/lng
   - Create 200 cities data
   - Define Google Places types

2. **API Client** (10 min)
   - Create googlePlaces.ts
   - Implement Text Search
   - Implement Nearby Search

3. **Ranking & Dedup** (5 min)
   - Create ranking.ts
   - Create deduplication.ts
   - Test logic

4. **Cache Layer** (5 min)
   - Create placeCache.ts
   - Implement get/set/update

5. **API Routes** (10 min)
   - Create /api/places route
   - Create /api/sync route
   - Add caching logic

6. **UI Components** (15 min)
   - PlacesList.tsx
   - PlaceFilters.tsx
   - PlaceCard.tsx
   - PlacesMap.tsx (basic)

7. **Page Integration** (10 min)
   - Update city/[id]/page.tsx
   - Add tabs
   - Add place sections
   - Connect to API

8. **Testing** (5 min)
   - Test with mock API responses
   - Verify dedup logic
   - Check UI rendering

---

## Key Design Decisions

### 1. **Data Source Priority**
```
1. Google Places API (if API key available)
2. Cache (fast, offline support)
3. Mock data (fallback)
```

### 2. **Sync Strategy**
- Manual sync via `/api/sync` endpoint
- Stores results in localStorage/IndexedDB
- Can be called multiple times
- Updates existing records by place_id
- Frontend triggered via button in UI

### 3. **Deduplication**
- Use Google's `place_id` as unique identifier
- Check against existing places before storing
- Merge duplicates (keep highest rating)

### 4. **Ranking Formula**

**Attractions:**
```
score = (rating * 20) + (review_count * 0.5) + (proximity_bonus * 10)
proximity_bonus = 1 - (distance_km / max_distance_km)
```

**Restaurants:**
```
score = (rating * 20) + (review_count * 0.5) - (price_level * 5)
```

**Hotels:**
```
score = (rating * 20) + (review_count * 0.5) - (distance_km * 2)
```

### 5. **Caching Strategy**
- Store last 100 places per category per city in localStorage
- 24h cache expiry
- Refresh on manual sync
- Fallback to mock data gracefully

---

## Configuration

### Required
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `GOOGLE_PLACES_API_KEY` - Server-side key (optional, for server-side calls)

### Optional Environment Variables
```
CACHE_EXPIRY_HOURS=24
MAX_PLACES_PER_CATEGORY=50
SYNC_BATCH_SIZE=5
```

---

## Backward Compatibility

✅ **No breaking changes to existing code**
- Existing City interface still works
- New lat/lng fields are optional
- Mock data remains as fallback
- Existing components unmodified
- New features are optional/progressive enhancement

✅ **Graceful degradation**
- Works without Google API key (shows mock data)
- Works offline (uses cache)
- No required refactoring

---

## API Endpoints Added

### GET `/api/places?cityId=rome&category=attractions`
Returns places for a city category, with caching

### POST `/api/sync`
```json
{
  "cityIds": ["rome", "paris"],
  "categories": ["attractions", "restaurants", "hotels"]
}
```
Triggers background sync, returns job ID

### GET `/api/sync?jobId=xyz`
Returns sync status

---

## Next Steps

Would you like me to proceed with implementation? I recommend starting with:

1. Phase 1 - Add city data + types (10 min) ← START HERE
2. Phase 2 - Build API client + routes (15 min)
3. Phase 3 - Create UI components (15 min)
4. Phase 4 - Integrate into city page (10 min)

All without breaking existing functionality.

Ready to start? Let me know which phase to begin with!
