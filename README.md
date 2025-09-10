# Polls Mobile (Expo + Expo Router)

A simple polls app built with Expo, React Native, and Expo Router.

## Requirements
- Node.js 18+
- npm (or yarn/pnpm)
- Expo CLI (installed automatically through scripts)

## Setup
1. Install dependencies:
```bash
npm install
```

2. Start the app (choose your target from the Expo UI):
```bash
npm run start
```

- iOS simulator shortcut:
```bash
npm run ios
```
- Android emulator shortcut:
```bash
npm run android
```
- Web:
```bash
npm run web
```

## API Configuration
The app expects a backend exposing:
- GET `/polls` → list polls
- GET `/polls/:id` → get poll detail
- POST `/polls/:id/vote` → vote

Base URL is configured in `src/config/env.tsx`. For local development, ensure the device/simulator can reach your machine (LAN IP vs localhost).

## Project Structure
- `app/` - Expo Router routes
  - `index.tsx` → redirects to `/polls`
  - `polls/index.tsx` → polls list
  - `polls/[id].tsx` → poll detail
- `src/components/` → UI components (`PollCard`, `PollDetail`)
- `src/api/` → Axios client, endpoints, and types
- `src/services/` → service layer (`PollsService`)

## Pages
- Polls List (`/polls`): Fetches and displays polls via `PollsService.getAll()`.
- Poll Detail (`/polls/[id]`): Displays a single poll and allows voting via `PollsService.vote()`.

## Troubleshooting
- White screen on device: ensure the API is reachable from the device (use LAN IP).
- Routing issues: verify `App.tsx` re-exports `expo-router/entry` and `index.ts` can boot via Expo.
- Metro cache: restart with `expo start -c`.

## License
MIT
