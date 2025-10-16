# Steam Clone - React TypeScript Project

A Steam-like gaming website built with React, TypeScript, and Vite.

## Features

- **Main Page**: Browse games with a search functionality
- **Game Detail Page**: View detailed information about individual games
- **Responsive Design**: Steam-inspired dark theme
- **Search Functionality**: Search games by name, developer, or genre
- **Modern UI**: Clean, professional interface with smooth animations

## Components

- `Navbar.tsx`: Main navigation bar
- `SearchBar.tsx`: Search functionality with real-time filtering
- `GameCard.tsx`: Individual game display cards
- `GameList.tsx`: Grid layout for displaying multiple games
- `GameDetail.tsx`: Detailed game information page

## Pages

- `MainPage.tsx`: Home page with search and game listings
- `GamePage.tsx`: Individual game detail view

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router DOM
- CSS3 with modern features

## Future Enhancements

- Integration with a real games API
- User authentication
- Shopping cart functionality
- Game reviews and ratings
- Advanced filtering options

## API Integration

The project is ready for API integration. Replace the sample data in `src/data/sampleGames.ts` with your actual API calls.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
