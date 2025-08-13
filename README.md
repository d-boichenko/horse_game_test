# Horse Racing Game

A fun and interactive horse-racing game built with Vue.js as part of a test task.

## Requirements

- **Node.js**: Version 22 or higher
- **npm**: Comes with Node.js

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
horse_game/
├── src/
│   ├── components/          # Vue components
│   │   ├── AppHeader.vue    # Main header with controls
│   │   ├── Horse.vue        # Individual horse display
│   │   ├── HorseLine.vue    # Horse racing line with animation
│   │   ├── HorseList.vue    # List of all horses
│   │   ├── HorseTable.vue   # Individual race results table
│   │   ├── HorseTables.vue  # All race results
│   │   └── HorseTrack.vue   # Main racing track
│   ├── store/              # Vuex state management
│   │   ├── modules/
│   │   │   ├── game.js     # Game state and race logic
│   │   │   └── horses.js   # Horse data and selection
│   │   └── index.js        # Store configuration
│   ├── assets/             # Static assets
│   │   ├── colorDictionary.js  # Horse colors
│   │   └── nameDictionary.js   # Horse names
│   ├── styles/             # SCSS stylesheets
│   ├── App.vue             # Main application component
│   └── main.js             # Application entry point
├── public/                 # Static files
├── package.json            # Project dependencies
└── vite.config.js         # Build configuration
```

## Horse Speed Formula

The game uses a simple formula to calculate how fast each horse runs:

**Speed = Horse Condition affects race time**

- Each horse has a **condition** value between 1 and 100
- Better condition = faster horse = shorter race time
- Formula: `duration = 15 - ((condition - 1) / 99) × (15 - 5)`
- This means:
  - Horse with condition 1: takes 15 seconds to finish
  - Horse with condition 100: takes 5 seconds to finish
  - Horse with condition 50: takes about 10 seconds to finish

## How It Works

1. **Horse Generation**: The game creates 20 random horses with unique names and colors
2. **Race Setup**: 10 horses are randomly selected for each race
3. **Racing Program**: 6 races with different track lengths (1200m to 2200m)
4. **Animation**: Horses move across the screen based on their condition/speed
5. **Results**: Race results are tracked and displayed in tables

## Potential Improvements

### Track Length Effects
- Currently track length doesn't affect race time
- **Improvement**: Longer tracks should take more time to complete
- Make race duration depend on both horse condition AND track length

### More Random Results
- Right now, the same horses always perform similarly
- **Improvement**: Add more randomness to each race
- Sometimes a good horse might have a bad day, or a weak horse might get lucky

### Seeded Data for Testing
- Currently all races are completely random
- **Improvement**: Add option to use fixed data for testing
- This helps developers and testers get the same results every time

### Better Error Handling
- The app doesn't handle errors well if something goes wrong
- **Improvement**: Add proper error messages and recovery
- Show user-friendly messages when things don't work

### Remove Magic Numbers
- Hard-coded values like "5", "15", "20", "10" are scattered in the code
- **Improvement**: Move all these numbers to a config file
- Makes it easier to adjust game settings without touching the code

### Better User Interface
- Current UI is basic and could look more professional
- **Improvement**: Add better colors, animations, and layout
- Make it more visually appealing and easier to use

### Responsive Design
- Game might not work well on phones or tablets
- **Improvement**: Make it work perfectly on all screen sizes
- Ensure buttons and text are readable on mobile devices

### Unit Tests
- No automated tests to check if code works correctly
- **Improvement**: Add tests for all game functions
- This prevents bugs when making changes

### End-to-End Tests
- No tests to check if the whole app works together
- **Improvement**: Add tests that simulate real user actions
- Like clicking start race and checking results appear

### Horse Selection Feature
- Players can't choose which horses to bet on or follow
- **Improvement**: Let users select their favorite horses
- Add betting or prediction features for more engagement

---

Enjoy racing! 🐎🏁