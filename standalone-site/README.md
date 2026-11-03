# Baryo guest multiplayer

Browser assets are exported from the parent TypeScript game with npm run build:web. This hosting project serves /game/index.html plus /api/guest/:action using Cloudflare D1. Run npm run dev locally after applying drizzle migrations; publish through Sites. Guest sessions expire after 20 seconds without a heartbeat. Adventures remain device-local.
