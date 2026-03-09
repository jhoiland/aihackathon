# Setup Instructions - Travel Discovery App

## Quick Start (Recommended)

### Windows Users
1. Make sure Node.js is installed (see verification below)
2. Double-click `setup.bat` in the project folder
3. The script will install dependencies and start the app
4. Open your browser to `http://localhost:3000`

### macOS/Linux Users
1. Make sure Node.js is installed (see verification below)
2. Open Terminal and navigate to the project folder
3. Run: `chmod +x setup.sh && ./setup.sh`
4. Open your browser to `http://localhost:3000`

## Manual Setup

### Step 1: Install Node.js

**If you don't have Node.js installed:**

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS version (Long Term Support)
3. Run the installer and follow prompts
   - **Windows**: Select "Add to PATH" when prompted
   - **macOS**: Follow default installation
   - **Linux**: Use your package manager (apt, brew, etc.)

**Verify installation:**
```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show 9.0.0 or higher
```

### Step 2: Install Dependencies

Navigate to the project folder in terminal/command prompt:

```bash
cd path/to/travel-discovery-app
```

Install all dependencies:

```bash
npm install
```

This may take 2-5 minutes. You'll see lots of output - this is normal.

### Step 3: Start Development Server

```bash
npm run dev
```

You'll see output like:
```
> travel-discovery-app@0.1.0 dev
> next dev

  ▲ Next.js v14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.5s
```

### Step 4: Open in Browser

Open your browser and go to: **http://localhost:3000**

## Troubleshooting

### "npm: command not found"
- **Solution**: Node.js is not installed or not in PATH
- Install Node.js from https://nodejs.org/
- Restart your terminal/command prompt after installing

### "Port 3000 already in use"
- **Solution**: Another app is using port 3000
- Option 1: Close the other app
- Option 2: Use a different port:
  ```bash
  npm run dev -- -p 3001
  ```
  Then visit http://localhost:3001

### "Error: cannot find module"
- **Solution**: Dependencies not installed properly
- Run: `rm -rf node_modules package-lock.json` (macOS/Linux)
  Or: `rmdir /s /q node_modules` (Windows)
- Then run: `npm install` again

### Build errors
- **Solution**: Clear Next.js cache
- Run: `npm run dev -- --clear` or delete the `.next` folder
- Restart the development server

### Slow installation
- **Solution**: Use npm cache
- Run: `npm cache verify`
- Then try `npm install` again

## Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Create production build
npm run build

# Run production server
npm start

# Check for linting issues
npm run lint

# Type check TypeScript
npm run type-check
```

## Production Deployment

### Build for production:
```bash
npm run build
npm start
```

### Deploy to Vercel (recommended):
```bash
npm install -g vercel
vercel
```

Follow the Vercel prompts to deploy.

### Deploy to other platforms:
The app can deploy to any Node.js hosting:
- Netlify
- AWS Amplify
- Railway
- Render
- DigitalOcean

All support `npm install && npm run build && npm start`

## Environment Variables

Create `.env.local` file in the project root (already exists with example):

```env
# Add any API URLs or configuration here
# Example:
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

NEXT_PUBLIC_ variables are visible to the browser, others are server-only.

## Project Structure

```
travel-discovery-app/
├── app/                    # Pages and layouts
├── components/             # React components
│   └── ui/                # shadcn/ui components
├── lib/                    # Utilities and data
├── public/                 # Static files
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.js     # Tailwind CSS config
├── next.config.js         # Next.js config
├── README.md              # Documentation
└── setup.bat/setup.sh     # Setup scripts
```

## System Requirements

- **OS**: Windows, macOS, or Linux
- **Node.js**: 18.0.0 or higher
- **RAM**: 512 MB minimum (1 GB recommended)
- **Disk Space**: 200 MB for node_modules
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

## Getting Help

1. **Check this file** for common issues
2. **Check README.md** for feature documentation
3. **Google the error** - most issues are well-documented
4. **Check Node.js version** - make sure it's 18+

## Next Steps

Once the app is running:

1. Explore the **Explore page** to browse destinations
2. Try **Search** to find specific places
3. Go to **Profile** to set your travel preferences
4. Save favorites by clicking heart icons
5. Click on any city to see detailed information

Enjoy exploring! 🌍✈️

---

For more information, see README.md
