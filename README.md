# Baryo · A Little Philippine Adventure

A playable Filipino-inspired pixel village adventure for browsers and VS Code. Explore fictional Barangay Maligaya, help your neighbors prepare for a fiesta, gather local treats, and shoo playful leaf sprites with an arnis stick.

The world includes raised bahay kubo houses, a sari-sari store, a jeepney, rice fields, coconut palms, a carabao, a river footbridge, and banderitas. Characters have walking, running, dash, and arnis animations. Water, palms, butterflies, birds, and villagers animate while you explore.

## Play locally

Requires Node.js 22.12 or newer. Install development dependencies once with `npm install` (or `npm ci` when using the lockfile). Browser play uses the generated JavaScript bundle.

```sh
npm install
npm start
```

Open http://127.0.0.1:4173. Click the scene to focus it.

| Control | Action |
| --- | --- |
| WASD / arrow keys | Walk in eight directions |
| Click / tap clear ground | Walk toward that spot; use keys to steer around obstacles |
| Shift | Run while energy lasts |
| Q | Short dash |
| E | Talk or gather nearby items |
| Space | Swing the arnis stick in the direction you face |
| Escape | Pause / resume |

Touch buttons appear on narrow screens. Walk close to a villager or harvest spot to see the interaction prompt. Buko restores two hearts and your energy. Visit Lola Rosa to recover hearts. Losing your hearts returns you to the plaza with your collected items intact.

## Bayanihan quests

1. Gather three mangoes and bring them to Lola Rosa at the plaza.
2. Gather three sampaguita flowers and bring them to Aling Nena at the sari-sari store.
3. Face and shoo three leaf sprites near the rice fields, then talk to Kuya Benji near the jeepney.

Harvests regrow after 18 seconds; sprites return after 28 seconds. Completed favors award peso coins. Sprites drop coins and collectible agimat beads. The leaf sprites, characters, village, and story are fictional.

Click your character card to choose Tala, Isko, or Amihan, rename your adventurer, change shirt color, or wear a salakot or bandana. Appearance and progress save automatically.

## VS Code extension

1. Open this folder in VS Code and press **F5**. Select **Run Baryo Adventure** if prompted.
2. In the Extension Development Host, run **Baryo: Open Adventure** from the command palette.
3. Choose **Baryo: Pop Out Game** for a larger editor view. Click the scene before using keyboard controls.

The panel and editor view share VS Code storage. The browser has its own local save. The previous Mosslight saves remain under their old storage keys; this game starts a separate Baryo save.

## Outside VS Code

- **Browser:** use `npm start`, or deploy the static build.
- **Pop out:** click **Pop out** for a resizable browser window.
- **Installable web app:** on supported browsers, use the browser's Install App option or the Install button when offered. Offline play becomes available after the assets have cached successfully. Browser popups do not guarantee always-on-top behavior.
- **Desktop launcher:** the optional Electron wrapper in `desktop/` has pin, minimize, and close controls. It requires a separate Electron runtime installation and has not been verified on this machine. Browser and VS Code play do not require Electron.

## Build and check

```sh
npm run check
npm test
npm run build:web
```

Deploy the contents of `standalone-site/dist/` to a static host. This produces a local deployment-ready build; it does not publish to a hosting account.

The sprites and scenery use Canvas drawing code written in TypeScript. There are no external fonts, accounts, telemetry, or runtime network dependencies.

## Journey stages

Complete the three favors in a region to automatically travel to the next stage after a short transition. Pause freezes travel; Travel Now skips the countdown. Our Journey lets you revisit unlocked regions. Coins, materials, character appearance, and completed favors persist across travel and saves. Sprite-clearing goals count separately in each region.

| Stage | Setting | Buildings and scenery | New tasks |
| --- | --- | --- | --- |
| 1 | Maligaya Barrio | Bahay kubo, rice fields, jeepney | Mangoes, sampaguita, three sprites |
| 2 | Vigan-inspired Heritage Streets | Bahay na bato, capiz-style grids, tiled roofs, cobbled lanes, kalesa | Clay, sampaguita, four sprites |
| 3 | Ifugao-inspired Highland Terraces | Elevated bale houses, steep thatched roofs, stepped fields, highland trees | Rice, bamboo, four sprites |
| 4 | Maranao-inspired Lakeside Gathering | Raised torogan-inspired hall, projecting decorative beams, woven mats, lakeside boat and dock | Carving wood, woven cloth, five sprites |

These are stylized fictional locations, not reconstructions of specific heritage buildings. Architectural references: [UNESCO: Historic City of Vigan](https://whc.unesco.org/en/list/502/), [National Museum: Ifugao Ethnographic](https://www.nationalmuseum.gov.ph/exhibitions/nm-cordillera-rice-terraces-regional-museum/ifugao-ethnographic/), and [National Museum: Architecture and Furniture](https://www.nationalmuseum.gov.ph/our-collections/ethnology/architecture-and-furniture/).

Existing Baryo saves keep their inventory and completed barrio favors. An already-finished barrio save unlocks the heritage stage on return. Completing all four regions finishes the journey; revisiting does not repeat completion rewards.

## TypeScript source layout

Edit the TypeScript files rather than generated JavaScript:

- `src/shared/core.ts` — movement, collision, quests, stages, and save validation.
- `src/shared/types.ts` — game state, resource, NPC, action, and message types.
- `src/browser/client.ts` — controls, saves, and interface updates.
- `src/browser/renderer.ts` — Canvas art, camera, and animations.
- `src/browser/dom.ts` — typed DOM and Canvas access.
- `src/extension.ts` — VS Code extension integration.
- `src/desktop/` — optional Electron main process and preload bridge.
- `src/worker/sw.ts` — offline service worker, checked against worker APIs.
- `scripts/*.mts` — build, preview, standalone export, and watch commands.
- `test/*.test.ts` — gameplay and extension integration tests.

`npm run check` checks all sources in strict mode without emitting files. `npm run build` type-checks and generates the extension at `dist/extension.js`, the browser bundle at `dist/web/game.js`, the service worker at `dist/web/sw.js`, desktop launchers under `desktop/dist/`, and tests under `dist/test/`. Source maps support debugging TypeScript directly.

`npm run watch` rebuilds when TypeScript changes. Reload the browser after a successful rebuild. `npm test` builds and runs the compiled tests. `npm run build:web` builds and exports standalone assets into `standalone-site/dist/`. F5 runs the build before launching the VS Code extension. The VSIX prepublish hook also builds automatically.

JavaScript exists only in build-output folders: `dist/`, `desktop/dist/`, and `standalone-site/dist/`. The `media/` folder contains only HTML, CSS, the manifest, and image assets. The browser and VS Code still execute JavaScript; TypeScript is the maintained source. VS Code hides generated `dist/` folders from the Explorer so the editable TypeScript files are easy to find. Existing game-save keys and format are preserved.
# Tavern
