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

### Vercel

Import the project with **Root Directory** set to the folder containing this `package.json` and `vercel.json` (the repository root when this project is the whole repository). Use Node.js **24.x**. The checked-in `vercel.json` selects the **Other** framework preset, runs `npm run build`, and publishes **`dist/web`**. The install command includes development dependencies needed to compile TypeScript and skips the optional Electron binary download.

Redeploy after adding this configuration. If deploying from the CLI, run `vercel` from the project root, or run `vercel build` followed by `vercel deploy --prebuilt`. The latter requires Vercel's build step to generate `.vercel/output`; the ordinary `npm run build` produces `dist/web` for source deployments. Do not set the output directory to the project root, `dist`, or `.vercel/output`: those are not the browser game's static asset directory.

The sprites and scenery use Canvas drawing code written in TypeScript. There are no external fonts, accounts, telemetry, or runtime network dependencies.

## Connected world

The field is one continuous 6,144 × 4,608 world divided into four connected biomes. Walk along the trails to choose where to explore; there are no region tabs. A small corner minimap shows your position, villagers, treasure, rest camps, and locked paths. Paths open after 6, 15, and 30 total monster clears, or by completing the previous region’s favors. Crossing an unlocked border keeps movement and health continuous. Coins, materials, character appearance, and completed favors persist across areas and saves.

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

## Adventurer progression and equipment

Press **I** or the **◇ Equipment** toolbar button to open your gear. The world freezes while the dialog is open; close it with **I**, Escape, or ×. Gathering grants 3 XP, clearing a sprite grants 12 XP, and completing a favor grants 40 XP. Every 100 XP advances a level, up to level 10.

Upgrade your yantok arnis for quicker swings (double damage at tier 3), abaca sandals for 8% more movement speed per tier, and a fictional agimat pendant for an extra coin per sprite drop per tier. Purchases immediately equip and save, using peso coins and agimat beads. Upgrade tiers require levels 1, 2, and 4. Existing saves retain their items and receive starting XP from completed favors and cleared sprites.

Equipped gear is drawn on the world character, portrait, and enlarged equipment preview: tier-specific yantok wraps, woven sandals, and colored agimat pendants. Use the equipment selectors to switch between collected tiers for free. The first sprite clear drops equipment, followed by every third clear (1, 4, 7, …); drops cycle through arnis, sandals, and agimat. Regions drop tiers 1, 2, 2, and 3 respectively. Better finds equip automatically, while duplicate or lower-tier finds grant two bonus beads. Owned and equipped tiers persist across saves and travel.

## The Lantern Road: folklore journey

Press **L** or **☾ Journal** for an original four-chapter mystery. Each completed favor reveals another fragment; approaching an eastern monster records its encounter notes once. Completed older saves recover their finished chapters automatically. The journal freezes gameplay while open.

The four stages feature kapre embers, tikbalang shadows, manananggal shades, and moon-serpent echoes inspired by Bakunawa. Each has a distinct animated silhouette and movement rhythm, with dusk lighting and drifting mist. These are fictional shadow encounters; the architecture and folklore are not presented as one community’s belief system. In particular, Bakunawa is identified as a Visayan tradition carried into the fictional lakeside chapter by a traveler.

Folklore background: [The Aswang Project’s Creatures of Philippine Mythology](https://www.aswangproject.com/creatures-of-philippine-mythology/). Story, lantern puzzle, shadow enemies, and combat rules are original game fiction.

## Tavern, exploration, and combat

New adventurers start at **Bahay Pahinga**. Talk to Tala, Isko, or Amihan with **E**, or select their button, then use the door or **Head out**. Isko has quicker swings; Amihan moves 12% faster. Use **H** or **⌂** to return to the tavern. Rest at the bed or a field camp; defeat recovers you at the tavern with your belongings.

- **Hold Space:** repeat attacks with your equipped weapon.
- **Hold R:** fire the tirador with pebbles, light aiming assistance, and a cooldown.
- **1 / 2:** select your strongest collected melee / ranged weapon.
- **I:** inspect, equip, and upgrade gear.
- **Click ground:** route around nearby obstacles; movement keys take over immediately.

Each biome has 60 supply spots, 24 monster homes, seven one-time chests, and four rest camps. Enemies respawn after 28 seconds for weapon farming. Arnis, bolo, spear, and tirador variants have different damage, reach, and rarity. Better damage drops equip automatically; collected weapons remain available in Equipment.

Forests use deterministic spacing to keep trunks apart and main roads clear. Canopies fade over your character. Save migration preserves progress and moves old local region coordinates into the shared world once. A saved position covered by regenerated scenery is placed on nearby clear ground. The optional journal retains the folklore story.
