// Generated from TypeScript. Run npm run build to regenerate.
"use strict";
(() => {
  // src/shared/types.ts
  function isRecord(value) {
    return typeof value === "object" && value !== null;
  }
  function isKey(object, key2) {
    return typeof key2 === "string" && Object.prototype.hasOwnProperty.call(object, key2);
  }

  // src/shared/world.ts
  var REGION = { width: 3072, height: 2304 };
  var WORLD = { width: 6144, height: 4608 };
  function regionOrigin(stage) {
    return { x: stage % 2 * REGION.width, y: Math.floor(stage / 2) * REGION.height };
  }
  function regionAt(x, y) {
    return (x >= REGION.width ? 1 : 0) + (y >= REGION.height ? 2 : 0);
  }
  function inRegion(p, stage) {
    const o = regionOrigin(stage);
    return { ...p, x: p.x + o.x, y: p.y + o.y };
  }
  var regionLocks = [0, 6, 15, 30];
  var passages = [{ a: 0, b: 1, x: 3072, y: 735 }, { a: 0, b: 2, x: 455, y: 2304 }, { a: 1, b: 3, x: 3527, y: 2304 }, { a: 2, b: 3, x: 3072, y: 3039 }];
  var TAVERN = { width: 768, height: 512, spawn: { x: 384, y: 365 }, door: { x: 384, y: 454 }, outside: { x: 392, y: 732 }, entrance: { x: 392, y: 710 } };
  var companions = [
    { id: "tala", x: 240, y: 240, role: "Wayfarer" },
    { id: "isko", x: 384, y: 240, role: "Guardian \xB7 faster swings" },
    { id: "amihan", x: 528, y: 240, role: "Scout \xB7 faster steps" }
  ];
  var tavernFurniture = [{ x: 94, y: 116, w: 580, h: 48 }, { x: 103, y: 296, w: 100, h: 48 }, { x: 560, y: 296, w: 100, h: 48 }, { x: 620, y: 188, w: 74, h: 48 }];
  var chests = [{ x: 1120, y: 250 }, { x: 1700, y: 970 }, { x: 730, y: 1010 }, { x: 2480, y: 870 }, { x: 2120, y: 1940 }, { x: 540, y: 1950 }, { x: 2820, y: 1680 }];
  var camps = [{ x: 1100, y: 800 }, { x: 1630, y: 250 }, { x: 2400, y: 1200 }, { x: 850, y: 1790 }];
  var wildNodes = [{ x: 1060, y: 285 }, { x: 1560, y: 190 }, { x: 1780, y: 380 }, { x: 740, y: 840 }, { x: 1110, y: 930 }, { x: 1500, y: 810 }, { x: 1720, y: 1050 }, { x: 240, y: 1020 }, { x: 970, y: 670 }, ...Array.from({ length: 42 }, (_, i) => ({ x: 600 + i * 463 % 2310, y: 650 + i * 197 % 1500 }))];
  var wildSpiritHomes = [{ x: 1160, y: 330 }, { x: 1550, y: 340 }, { x: 1780, y: 290 }, { x: 940, y: 870 }, { x: 1510, y: 930 }, { x: 1720, y: 890 }, ...Array.from({ length: 15 }, (_, i) => ({ x: 1050 + i * 337 % 1810, y: 680 + i * 271 % 1440 }))];
  var forests = [];
  function wildTreesFor(stage) {
    if (forests[stage]) return forests[stage];
    let seed2 = 417 + stage * 239;
    const random = () => {
      seed2 = Math.imul(seed2, 1664525) + 1013904223 >>> 0;
      return seed2 / 4294967296;
    };
    const result = [], protectedPoints = [...wildNodes, ...wildSpiritHomes, ...chests, ...camps];
    for (let i = 0; i < 4800; i++) {
      const t = { x: 70 + random() * (REGION.width - 140), y: 130 + random() * (REGION.height - 210) };
      if (t.x < 960 && t.y < 610 || t.x < 550 && t.y < 820) continue;
      if (Math.abs(t.y - 735) < 75 || Math.abs(t.y - 1e3) < 45 || Math.abs(t.x - 455) < 65 || Math.abs(t.x - 1370) < 65) continue;
      if (protectedPoints.some((p) => Math.hypot(p.x - t.x, p.y - t.y) < 65) || result.some((p) => Math.hypot(p.x - t.x, p.y - t.y) < 72)) continue;
      result.push(t);
    }
    return forests[stage] = result;
  }

  // src/shared/appearance.ts
  var armors = {
    linen: { name: "Linen tunic", hearts: 5, level: 1, coins: 0, beads: 0 },
    abaca: { name: "Abaca vest", hearts: 6, level: 1, coins: 0, beads: 0 },
    leather: { name: "Trail leather", hearts: 7, level: 3, coins: 65, beads: 3 },
    moonweave: { name: "Moonweave coat", hearts: 8, level: 5, coins: 140, beads: 8 }
  };
  var hairStyles = { natural: "Character style", crop: "Short crop", bob: "Soft bob", ponytail: "Ponytail", long: "Long hair" };
  var skinTones = { natural: "Character tone", sunlit: "Sunlit", morena: "Morena", deep: "Deep" };
  var hairColors = { ink: "#34382f", chestnut: "#70503c", ash: "#8a8979" };

  // src/shared/weapons.ts
  var weapons = {
    tirador: { name: "Tirador", kind: "slingshot", rarity: "Common", damage: 1, range: 270, cooldown: 0.5, color: "#c3a16c" },
    sunshot: { name: "Araw tirador", kind: "slingshot", rarity: "Rare", damage: 2, range: 320, cooldown: 0.42, color: "#e9c76e" },
    yantok: { name: "Yantok", kind: "stick", rarity: "Common", damage: 1, range: 48, cooldown: 0.4, color: "#d9b57a" },
    kamagong: { name: "Kamagong arnis", kind: "stick", rarity: "Uncommon", damage: 2, range: 48, cooldown: 0.48, color: "#745347" },
    bolo: { name: "Trail bolo", kind: "blade", rarity: "Uncommon", damage: 2, range: 46, cooldown: 0.52, color: "#bbd2ce" },
    sibat: { name: "Bamboo sibat", kind: "spear", rarity: "Rare", damage: 2, range: 78, cooldown: 0.62, color: "#b3d8c3" },
    moonbolo: { name: "Moonlit bolo", kind: "blade", rarity: "Epic", damage: 3, range: 58, cooldown: 0.48, color: "#dcc1f3" }
  };
  function weaponInfo(id) {
    return Object.prototype.hasOwnProperty.call(weapons, id) ? weapons[id] : weapons.yantok;
  }

  // src/shared/profiles.ts
  function defaultProfile(id) {
    return { name: { tala: "Tala", isko: "Isko", amihan: "Amihan" }[id], outfit: { tala: "terracotta", isko: "ocean", amihan: "ube" }[id], hat: id === "tala" ? "salakot" : id === "amihan" ? "bandana" : "none", hair: "natural", hairColor: "ink", skin: "natural", armor: id === "isko" ? "abaca" : "linen", armors: ["linen", "abaca"], weapon: "yantok", weapons: ["yantok", "tirador"], gear: { arnis: 0, sandals: 0, agimat: 0 }, gearOwned: { arnis: 0, sandals: 0, agimat: 0 }, xp: 0, hp: id === "isko" ? 6 : 5, stamina: 100 };
  }
  function createProfiles() {
    return { tala: defaultProfile("tala"), isko: defaultProfile("isko"), amihan: defaultProfile("amihan") };
  }
  function snapshotProfile(s) {
    return { name: s.name, outfit: s.outfit, hat: s.hat, hair: s.hair, hairColor: s.hairColor, skin: s.skin, armor: s.armor, armors: [...s.armors], weapon: s.weapon, weapons: [...s.weapons], gear: { ...s.gear }, gearOwned: { ...s.gearOwned }, xp: s.xp, hp: s.player.hp, stamina: s.player.stamina };
  }
  function saveProfile(s) {
    s.profiles[s.character] = snapshotProfile(s);
  }
  function characterProfile(s, id) {
    return id === s.character ? snapshotProfile(s) : s.profiles[id];
  }
  function switchCharacter(s, id) {
    if (id === s.character) return;
    saveProfile(s);
    const profile = structuredClone(s.profiles[id]);
    s.character = id;
    for (const key2 of ["name", "outfit", "hat", "hair", "hairColor", "skin", "armor", "armors", "weapon", "weapons", "gear", "gearOwned", "xp"]) Object.assign(s, { [key2]: profile[key2] });
    s.player.hp = profile.hp;
    s.player.stamina = profile.stamina;
    s.player.swing = 0;
    s.player.shot = 0;
    s.player.dash = 0;
    s.player.cooldown = 0;
    s.player.shotCooldown = 0;
    s.player.walking = false;
    s.projectiles = [];
    if (s.area === "tavern") {
      const station = companions.find((c) => c.id === id);
      s.player.x = station.x;
      s.player.y = station.y;
    }
  }
  function restoreProfile(raw, id) {
    const p = defaultProfile(id);
    if (!isRecord(raw)) return p;
    if (typeof raw.name === "string") p.name = raw.name.trim().slice(0, 20) || p.name;
    if (["terracotta", "ocean", "ube", "mango"].includes(String(raw.outfit))) p.outfit = raw.outfit;
    if (["salakot", "bandana", "rattan", "none"].includes(String(raw.hat))) p.hat = raw.hat;
    if (isKey(hairStyles, raw.hair)) p.hair = raw.hair;
    if (isKey(hairColors, raw.hairColor)) p.hairColor = raw.hairColor;
    if (isKey(skinTones, raw.skin)) p.skin = raw.skin;
    if (Array.isArray(raw.armors)) p.armors = [.../* @__PURE__ */ new Set([...p.armors, ...raw.armors.filter((id2) => isKey(armors, id2))])];
    if (isKey(armors, raw.armor) && p.armors.includes(raw.armor)) p.armor = raw.armor;
    if (Array.isArray(raw.weapons)) p.weapons = [.../* @__PURE__ */ new Set([...p.weapons, ...raw.weapons.filter((id2) => isKey(weapons, id2))])];
    if (typeof raw.weapon === "string" && p.weapons.includes(raw.weapon)) p.weapon = raw.weapon;
    for (const key2 of ["arnis", "sandals", "agimat"]) {
      const value = isRecord(raw.gear) ? raw.gear[key2] : 0, owned = isRecord(raw.gearOwned) ? raw.gearOwned[key2] : 0;
      p.gear[key2] = typeof value === "number" && Number.isFinite(value) ? Math.floor(Math.max(0, Math.min(3, value))) : 0;
      p.gearOwned[key2] = typeof owned === "number" && Number.isFinite(owned) ? Math.max(p.gear[key2], Math.floor(Math.max(0, Math.min(3, owned)))) : p.gear[key2];
    }
    p.xp = typeof raw.xp === "number" && Number.isFinite(raw.xp) ? Math.floor(Math.max(0, Math.min(900, raw.xp))) : 0;
    p.hp = typeof raw.hp === "number" && Number.isFinite(raw.hp) ? Math.max(1, Math.min(armors[p.armor].hearts, raw.hp)) : armors[p.armor].hearts;
    p.stamina = typeof raw.stamina === "number" && Number.isFinite(raw.stamina) ? Math.max(0, Math.min(100, raw.stamina)) : 100;
    return p;
  }

  // src/shared/multiplayer.ts
  var number = (value, min, max, fallback = 0) => typeof value === "number" && Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;
  function roomCode(value) {
    return typeof value === "string" && /^[a-z0-9-]{3,24}$/.test(value) ? value : null;
  }
  function guestName(value) {
    return typeof value === "string" ? value.replace(/[<>\u0000-\u001f\u007f]/g, "").trim().slice(0, 20) || "Guest" : "Guest";
  }
  function normalizePose(value) {
    if (!isRecord(value) || !["tala", "isko", "amihan"].includes(String(value.character)) || !["field", "tavern"].includes(String(value.area))) return null;
    const character = value.character, area = value.area, look = restoreProfile(value.look, character);
    look.name = guestName(value.name);
    const x = number(value.x, 0, area === "tavern" ? 768 : 6144), y = number(value.y, 0, area === "tavern" ? 512 : 4608);
    return { name: look.name, character, look, area, stage: area === "tavern" ? 0 : (x >= 3072 ? 1 : 0) + (y >= 2304 ? 2 : 0), x, y, dir: isKey({ up: 1, down: 1, left: 1, right: 1 }, value.dir) ? value.dir : "down", walking: value.walking === true, walkTime: number(value.walkTime, 0, 1e8), swing: number(value.swing, 0, 0.32), shot: number(value.shot, 0, 0.22), dash: number(value.dash, 0, 0.18) };
  }
  function toGuestPose(s, name2) {
    const look = { name: name2, outfit: s.outfit, hat: s.hat, hair: s.hair, hairColor: s.hairColor, skin: s.skin, armor: s.armor, armors: [s.armor], weapon: s.weapon, weapons: [s.weapon], gear: { ...s.gear }, gearOwned: { ...s.gear }, xp: s.xp, hp: s.player.hp, stamina: 100 };
    return { name: name2, character: s.character, look, area: s.area, stage: s.stage, x: s.player.x, y: s.player.y, dir: s.player.dir, walking: s.player.walking, walkTime: s.player.walkTime, swing: s.player.swing, shot: s.player.shot, dash: s.player.dash };
  }

  // src/browser/dom.ts
  function element(id) {
    const result = document.getElementById(id);
    if (!(result instanceof HTMLElement)) throw new Error(`Missing element: ${id}`);
    return result;
  }
  function canvasElement(id) {
    const result = element(id);
    if (!(result instanceof HTMLCanvasElement)) throw new Error(`Expected canvas: ${id}`);
    return result;
  }
  function context2d(canvas3) {
    const context = canvas3.getContext("2d");
    if (!context) throw new Error("Canvas 2D rendering is unavailable.");
    return context;
  }

  // src/browser/multiplayer.ts
  var tracked = /* @__PURE__ */ new Map();
  var configuredOrigin = document.querySelector('meta[name="baryo-guest-origin"]')?.content.trim() || "";
  var apiBase = (location.hostname === "127.0.0.1" || location.hostname === "localhost" ? "" : configuredOrigin) + "/api/guest/";
  var guestId = "";
  var token = "";
  var room = "";
  var name = "";
  var enabled = false;
  var desired = false;
  var pendingEpoch = -1;
  var failures = 0;
  var timer = 0;
  var lastReply = 0;
  var epoch = 0;
  var getState;
  function status(text) {
    element("online-status").textContent = text;
    element("online-open").textContent = token ? "\u265F " + (tracked.size + 1) : "\u265F";
    element("online-open").title = text;
    element("online-open").setAttribute("aria-label", text);
    element("online-copy").toggleAttribute("disabled", !token);
    element("online-leave").toggleAttribute("disabled", !token);
    element("chat-send").toggleAttribute("disabled", !token);
  }
  async function post(action3, body, auth = true) {
    const response = await fetch(apiBase + action3, { method: "POST", headers: { "Content-Type": "application/json", ...auth ? { Authorization: "Bearer " + token } : {} }, body: JSON.stringify(body), cache: "no-store", signal: AbortSignal.timeout(7e3) });
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("Guest server unavailable");
    }
    if (!response.ok) throw new Error(response.status === 401 ? "expired" : isRecord(data) && typeof data.error === "string" ? data.error : "Guest server unavailable");
    if (!isRecord(data)) throw new Error("Invalid guest response");
    return data;
  }
  function schedule(delay) {
    clearTimeout(timer);
    if (desired) timer = window.setTimeout(tick, delay);
  }
  async function connect() {
    const generation = epoch;
    const data = await post("join", { room, name, pose: toGuestPose(getState(), name) }, false);
    if (generation !== epoch) return;
    if (typeof data.id !== "string" || typeof data.token !== "string") throw new Error("Guest server unavailable");
    guestId = data.id;
    token = data.token;
    tracked.clear();
    failures = 0;
    status("Online \xB7 " + room);
    sessionStorage.setItem("baryo-online", JSON.stringify({ room, name }));
  }
  async function tick() {
    if (!desired || pendingEpoch === epoch) return;
    const generation = epoch;
    pendingEpoch = generation;
    try {
      if (!token) {
        await connect();
        return;
      }
      const pose = toGuestPose(getState(), name);
      if (document.hidden) pose.walking = false;
      const data = await post("update", { pose });
      if (generation !== epoch) return;
      if (!Array.isArray(data.peers)) throw new Error("Invalid guest response");
      const now = performance.now(), interval = lastReply ? Math.min(1200, Math.max(400, now - lastReply)) : 550;
      lastReply = now;
      const present = /* @__PURE__ */ new Set();
      for (const raw of data.peers.slice(0, 24)) {
        if (!isRecord(raw) || typeof raw.id !== "string" || raw.id === guestId) continue;
        const normalized = normalizePose(raw);
        if (!normalized) continue;
        const peer = { ...normalized, id: raw.id, updatedAt: typeof raw.updatedAt === "number" ? raw.updatedAt : Date.now() };
        present.add(peer.id);
        const existing = tracked.get(peer.id), current = existing ? interpolate(existing, now) : peer;
        tracked.set(peer.id, { from: current.area === peer.area ? current : peer, to: peer, at: now, duration: interval });
      }
      for (const id of tracked.keys()) if (!present.has(id)) tracked.delete(id);
      failures = 0;
      status("Online \xB7 " + room + " \xB7 " + (tracked.size + 1) + " guests");
      if (Array.isArray(data.messages)) showMessages(data.messages);
      element("online-players").textContent = [name, ...[...tracked.values()].map((p) => p.to.name)].join(" \xB7 ");
    } catch (error) {
      if (generation !== epoch) return;
      failures++;
      if (error instanceof Error && error.message === "expired") token = "";
      if (failures >= 3) tracked.clear();
      status((error instanceof Error && error.message === "Guest server unavailable" ? "Server unavailable" : "Reconnecting") + " \xB7 " + room);
    } finally {
      if (pendingEpoch === generation) pendingEpoch = -1;
      if (generation === epoch) schedule(failures ? Math.min(8e3, 1e3 * failures) : document.hidden ? 2500 : 550);
    }
  }
  function interpolate(peer, now) {
    const t = Math.min(1, Math.max(0, (now - peer.at) / peer.duration));
    if (peer.from.area !== peer.to.area || Math.hypot(peer.to.x - peer.from.x, peer.to.y - peer.from.y) > 350) return peer.to;
    return { ...peer.to, x: peer.from.x + (peer.to.x - peer.from.x) * t, y: peer.from.y + (peer.to.y - peer.from.y) * t, walkTime: peer.to.walkTime + (peer.to.walking ? Math.min(1, (now - peer.at) / 1e3) : 0) };
  }
  function remoteGuests(area) {
    if (!token || performance.now() - lastReply > 6e3) return [];
    return [...tracked.values()].map((p) => interpolate(p, performance.now())).filter((p) => p.area === area);
  }
  async function leave() {
    epoch++;
    desired = false;
    clearTimeout(timer);
    const previous = token;
    token = "";
    tracked.clear();
    element("chat-messages").replaceChildren();
    chatSignature = "";
    sessionStorage.removeItem("baryo-online");
    element("online-players").textContent = "";
    status("Play as guest");
    if (previous) try {
      await fetch(apiBase + "leave", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + previous }, body: "{}", keepalive: true });
    } catch {
    }
  }
  var chatSignature = "";
  function showMessages(messages) {
    const signature = JSON.stringify(messages);
    if (signature === chatSignature) return;
    chatSignature = signature;
    const list = element("chat-messages"), nearBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 40;
    list.replaceChildren(...messages.slice(-30).flatMap((raw) => {
      if (!isRecord(raw) || typeof raw.name !== "string" || typeof raw.text !== "string") return [];
      const item = document.createElement("p"), name2 = document.createElement("b");
      name2.textContent = raw.name + ": ";
      item.append(name2, document.createTextNode(raw.text));
      return [item];
    }));
    if (nearBottom) list.scrollTop = list.scrollHeight;
  }
  function initMultiplayer(readState, available) {
    getState = readState;
    enabled = available;
    status(enabled ? "Play as guest" : "Guest multiplayer \xB7 play in browser");
    element("online-open").toggleAttribute("disabled", !enabled);
    const roomInput = element("guest-room"), nameInput = element("guest-name");
    roomInput.value = roomCode(new URLSearchParams(location.search).get("room")) || "baryo";
    nameInput.value = getState().name;
    element("chat-toggle").addEventListener("click", () => {
      const panel2 = element("room-chat");
      panel2.hidden = !panel2.hidden;
      if (!panel2.hidden) document.getElementById("chat-input").focus();
    });
    document.getElementById("chat-form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const input = element("chat-input"), text = input.value.trim();
      if (!text || !token) return;
      const button = element("chat-send");
      button.disabled = true;
      try {
        await post("chat", { text });
        input.value = "";
        element("chat-error").textContent = "";
        schedule(300);
      } catch (error) {
        element("chat-error").textContent = error instanceof Error ? error.message : "Message not sent";
      } finally {
        button.disabled = !token;
      }
    });
    const panel = element("online-panel");
    element("online-open").addEventListener("click", () => panel.showModal());
    element("online-close").addEventListener("click", () => panel.close());
    element("online-leave").addEventListener("click", leave);
    element("online-new-room").addEventListener("click", () => {
      roomInput.value = "baryo-" + crypto.randomUUID().slice(0, 8);
    });
    element("online-join").addEventListener("click", async () => {
      const nextRoom = roomCode(roomInput.value.trim().toLowerCase());
      if (!nextRoom) {
        status("Use 3\u201324 letters, numbers or dashes");
        return;
      }
      const button = element("online-join");
      button.disabled = true;
      await leave();
      room = nextRoom;
      name = nameInput.value.trim().slice(0, 20) || getState().name;
      desired = true;
      status("Joining\u2026");
      try {
        await connect();
        panel.close();
        lastReply = 0;
        schedule(300);
      } catch (error) {
        desired = false;
        status(error instanceof Error ? error.message : "Guest server unavailable");
      } finally {
        button.disabled = false;
      }
    });
    element("online-copy").addEventListener("click", async () => {
      const url = new URL(location.href);
      url.searchParams.set("room", room);
      try {
        await navigator.clipboard.writeText(url.href);
        element("online-copy").textContent = "Copied \u2713";
      } catch {
        element("online-status").textContent = url.href;
      }
    });
    window.addEventListener("pagehide", () => {
      if (token) void fetch(apiBase + "leave", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer " + token }, body: "{}", keepalive: true });
    });
    if (enabled) try {
      const previous = JSON.parse(sessionStorage.getItem("baryo-online") || "null");
      if (isRecord(previous) && roomCode(previous.room) && typeof previous.name === "string") {
        room = previous.room;
        name = previous.name;
        desired = true;
        schedule(300);
      }
    } catch {
    }
  }

  // src/shared/navigation.ts
  function findPath(start, end, blocked2) {
    if (blocked2(end.x, end.y)) return [];
    const clear2 = (a, b) => {
      const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 6));
      for (let i = 1; i <= n; i++) if (blocked2(a.x + (b.x - a.x) * i / n, a.y + (b.y - a.y) * i / n)) return false;
      return true;
    };
    if (clear2(start, end)) return [end];
    const cell = 16, padding = 9, minX = Math.min(0, Math.floor((end.x - start.x) / cell)) - padding, maxX = Math.max(0, Math.ceil((end.x - start.x) / cell)) + padding, minY = Math.min(0, Math.floor((end.y - start.y) / cell)) - padding, maxY = Math.max(0, Math.ceil((end.y - start.y) / cell)) + padding;
    const point = (x, y) => ({ x: start.x + x * cell, y: start.y + y * cell }), key2 = (x, y) => x + "," + y;
    const open = [{ x: 0, y: 0, g: 0, f: Math.hypot(end.x - start.x, end.y - start.y) / cell }], best = /* @__PURE__ */ new Map([["0,0", 0]]), closed = /* @__PURE__ */ new Set(), solid = /* @__PURE__ */ new Map();
    const wall = (x, y) => {
      const id = key2(x, y);
      if (!solid.has(id)) {
        const p = point(x, y);
        solid.set(id, blocked2(p.x, p.y));
      }
      return solid.get(id);
    };
    for (let visits = 0; open.length && visits < 3500; visits++) {
      let lowest = 0;
      for (let i = 1; i < open.length; i++) if (open[i].f < open[lowest].f) lowest = i;
      const current = open.splice(lowest, 1)[0], id = key2(current.x, current.y);
      if (closed.has(id)) continue;
      closed.add(id);
      const here = point(current.x, current.y);
      if (Math.hypot(here.x - end.x, here.y - end.y) < cell * 1.5 && clear2(here, end)) {
        const result = [end];
        let n = current;
        while (n?.parent) {
          result.push(point(n.x, n.y));
          n = n.parent;
        }
        result.reverse();
        const smooth = [];
        let previous = start, index = 0;
        while (index < result.length) {
          let far = index;
          for (let j = index + 1; j < result.length && clear2(previous, result[j]); j++) far = j;
          smooth.push(result[far]);
          previous = result[far];
          index = far + 1;
        }
        return smooth;
      }
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        const x = current.x + dx, y = current.y + dy, next = key2(x, y);
        if (x < minX || x > maxX || y < minY || y > maxY || closed.has(next) || wall(x, y) || dx && dy && (wall(current.x + dx, current.y) || wall(current.x, current.y + dy))) continue;
        const p = point(x, y);
        if (!clear2(here, p)) continue;
        const g = current.g + Math.hypot(dx, dy);
        if (g >= (best.get(next) ?? Infinity)) continue;
        best.set(next, g);
        open.push({ x, y, g, f: g + Math.hypot(p.x - end.x, p.y - end.y) / cell, parent: current });
      }
    }
    return [];
  }

  // src/shared/folklore.ts
  var legends = [
    { name: "Kapre", shade: "Kapre ember", symbol: "\u2668", title: "The ember in the balete", tradition: "Kapre stories describe a great tree-dwelling figure, often associated with tobacco smoke. Accounts vary between storytellers.", warning: "Watch the slow ember shadows. Keep a little distance, then face them with your arnis.", fragments: [
      "At dusk, Lola notices a coal glowing in a tree where nobody has climbed. Beneath it, three long shadows cross the palayan. The fiesta lanterns have gone cold.",
      "Inside the mango basket lies a singed scrap: \u201CCarry the light onward.\u201D Lola remembers a traveler who vanished before the last fiesta.",
      "Sampaguita sweetens the air, but smoke still curls against the wind. Aling Nena says the traveler carried a lantern with four missing panes.",
      "The ember shadows scatter. In their place rests a warm lantern pane. Scratched into its frame is a street of capiz windows. Your next clue waits in the heritage town."
    ] },
    { name: "Tikbalang", shade: "Tikbalang shadow", symbol: "\u265E", title: "Hoofbeats with no rider", tradition: "The tikbalang is commonly pictured as a horse-headed humanoid associated with bewildering travelers. This encounter is an original adaptation.", warning: "These shadows move in quick, crooked steps. Face the hoofbeats and leave room to dash.", fragments: [
      "A kalesa stands empty. Hoofbeats pass behind you, yet every window reflects an empty street. The lantern pane clouds over, showing the same corner again and again.",
      "The potter finds a hoof mark pressed into yesterday\u2019s clay. Beside it, a child has drawn four panes around a small sun.",
      "A garland marks the real road. Mang Tomas whispers: \u201CCount the houses, not the echoes.\u201D Beyond the last roof, a second lantern pane glints.",
      "The false hoofbeats fade. A second pane slips into the lantern, revealing a mountain path. Above its terraces, something enormous beats its wings without making a sound."
    ] },
    { name: "Manananggal", shade: "Manananggal shade", symbol: "\u22CF", title: "Wings over the terraces", tradition: "Manananggal tales describe a nocturnal being whose winged upper body separates from its lower half. Our shadow creatures are stylized, non-graphic interpretations.", warning: "Watch the wings rise and fall. Step aside from the drifting shades before swinging.", fragments: [
      "Rice bends beneath a wind you cannot feel. A winged silhouette crosses the moon, then another. Ate Laya lights a lamp and asks you to stay where the paths are clear.",
      "Tucked into the rice bundle is the traveler\u2019s ribbon. Its stitched words read: \u201CI followed a light that was not a star.\u201D",
      "Fresh bamboo lantern poles line the footpath. Their shadows point toward a third pane caught beneath dark wings. Your lantern answers with a faint, steady glow.",
      "The winged shades dissolve into mist. The third pane reveals the truth: the traveler was chasing the moon\u2019s reflection. The last light waits beside a distant lake."
    ] },
    { name: "Bakunawa", shade: "Moon-serpent echo", symbol: "\u263E", title: "The moon beneath the water", tradition: "Bakunawa is a moon-swallowing serpent in Visayan traditions. Its appearance here is a traveling tale, not a claim about Maranao belief or this architectural setting.", warning: "These small serpent echoes coil along the shore. Keep to dry paths and watch their glowing eyes.", fragments: [
      "The lake holds two moons. One shines above; the other moves beneath the water. A story brought by a traveler speaks of Bakunawa. Tonight, small echoes coil along the bank.",
      "Carved wood bears the traveler\u2019s final mark: a lantern lowered into water. The lake kept the reflection, and the traveler kept walking after it.",
      "Woven cloth becomes a lantern sail. Three panes glow, but the fourth is dark. Kuya Amir asks you to clear the echoes so the community can carry the light together.",
      "The final pane returns. Four lights become one, and the false moon sinks away. On the far bank, a familiar traveler lifts a hand. The road home was there all along."
    ] }
  ];
  function legendFor(s) {
    return legends[s.stage];
  }
  function chapterFor(s, index = s.stage) {
    return legends[index].fragments[Math.min(3, s.stageProgress[index])];
  }

  // src/shared/core.ts
  function maxHealth(s) {
    return armors[s.armor].hearts;
  }
  var equipment = {
    arnis: { name: "Yantok arnis", icon: "\u2571", description: "Locally inspired rattan stick. Each upgrade makes swings quicker; tier 3 deals double damage.", tiers: ["Practice yantok", "Wrapped yantok", "Polished yantok", "Bayani yantok"] },
    sandals: { name: "Abaca sandals", icon: "\u2667", description: "Woven trail sandals. Each upgrade adds 8% walking and running speed.", tiers: ["Simple sandals", "Woven abaca", "Trail abaca", "Lakbay abaca"] },
    agimat: { name: "Agimat pendant", icon: "\u25C7", description: "A fictional lucky keepsake. Each upgrade adds one peso coin to every sprite drop.", tiers: ["Plain keepsake", "Beaded agimat", "Sun agimat", "Bayanihan agimat"] }
  };
  function progression(s) {
    const level = Math.min(10, 1 + Math.floor(s.xp / 100));
    return { level, progress: level === 10 ? 100 : s.xp % 100, title: level >= 7 ? "Bayani ng Baryo" : level >= 4 ? "Kaibigan ng Bayan" : level >= 2 ? "Lakbay Adventurer" : "Bagong Adventurer" };
  }
  function ownedTier(s, id) {
    return Math.max(s.gear[id], s.gearOwned[id]);
  }
  function upgradeCost(s, id) {
    const tier = ownedTier(s, id);
    return { coins: 30 + tier * 45, beads: tier * 2, level: [1, 2, 4][tier] ?? 10 };
  }
  function gainXP(s, amount) {
    const before = progression(s).level;
    s.xp = Math.min(900, s.xp + amount);
    if (progression(s).level > before) emit(s, "Level " + progression(s).level + "! " + progression(s).title, "quest");
  }
  var characters = { tala: { name: "Tala", description: "Wayfarer \xB7 balanced", shirt: "#dc795d", skin: "#d2a174" }, isko: { name: "Isko", description: "Guardian \xB7 faster swings", shirt: "#598d8a", skin: "#ba865f" }, amihan: { name: "Amihan", description: "Scout \xB7 +12% speed", shirt: "#a987bd", skin: "#dfb28a" } };
  var colors = { terracotta: "#dc795d", ocean: "#598d8a", ube: "#a987bd", mango: "#e5b653" };
  var buildings = [{ x: 142, y: 154, w: 114, h: 75, type: "kubo" }, { x: 350, y: 120, w: 113, h: 76, type: "kubo" }, { x: 610, y: 167, w: 126, h: 73, type: "store" }];
  var trees = [{ x: 66, y: 153 }, { x: 99, y: 305 }, { x: 265, y: 159 }, { x: 485, y: 132 }, { x: 780, y: 143 }, { x: 876, y: 218 }, { x: 859, y: 393 }, { x: 219, y: 397 }, { x: 57, y: 420 }, { x: 744, y: 526 }, { x: 155, y: 535 }];
  var npcs = [{ id: "lola", name: "Lola Rosa", x: 360, y: 245, shirt: "#a87da4" }, { id: "nena", name: "Aling Nena", x: 617, y: 254, shirt: "#d88b58" }, { id: "benji", name: "Kuya Benji", x: 563, y: 363, shirt: "#6b96a5" }];
  var nodes = [{ id: 0, x: 115, y: 324, type: "mango" }, { id: 1, x: 276, y: 184, type: "mango" }, { id: 2, x: 798, y: 174, type: "mango" }, { id: 3, x: 80, y: 405, type: "mango" }, { id: 4, x: 450, y: 285, type: "flowers" }, { id: 5, x: 520, y: 300, type: "flowers" }, { id: 6, x: 693, y: 321, type: "flowers" }, { id: 7, x: 306, y: 340, type: "flowers" }, { id: 8, x: 825, y: 407, type: "buko" }, ...wildNodes.map((p, i) => ({ ...p, id: 9 + i, type: ["mango", "flowers", "buko"][i % 3] }))];
  var spiritHomes = [{ x: 715, y: 295 }, { x: 815, y: 340 }, { x: 748, y: 381 }, ...wildSpiritHomes];
  var quests = [{ title: "A sweet little favor", description: "Bring 3 mangoes to Lola Rosa by the plaza.", goal: 3, item: "mango", npc: "lola", reward: 25 }, { title: "Flowers for the fiesta", description: "Bring 3 sampaguita to Aling Nena at the sari-sari store.", goal: 3, item: "flowers", npc: "nena", reward: 35 }, { title: "A clear path home", description: "Shoo 3 playful leaf sprites near the rice fields, then visit Kuya Benji.", goal: 3, item: "cleared", npc: "benji", reward: 50 }];
  var stages = [
    { name: "Maligaya Barrio", region: "LOWLAND LUZON", architecture: "Bahay kubo", note: "Raised bamboo homes and broad nipa roofs frame this sunny fictional barrio.", theme: "barrio", tasks: quests },
    { name: "Heritage Streets", region: "VIGAN-INSPIRED \xB7 ILOCOS", architecture: "Bahay na bato", note: "Stone lower floors, timber upper stories, capiz-style window grids, and tiled roofs inspired by Vigan\u2019s heritage streets.", theme: "vigan", tasks: [{ title: "A potter\u2019s welcome", description: "Bring 3 clay bundles to Aling Pilar at the plaza.", goal: 3, item: "clay", npc: "lola", reward: 45 }, { title: "Flowers along the street", description: "Bring 4 sampaguita to Mang Tomas at the heritage shop.", goal: 4, item: "flowers", npc: "nena", reward: 55 }, { title: "A quiet kalesa route", description: "Shoo 4 sprites on the eastern street, then see Kuya Benji.", goal: 4, item: "cleared", npc: "benji", reward: 70 }] },
    { name: "Highland Terraces", region: "IFUGAO-INSPIRED \xB7 CORDILLERA", architecture: "Bale houses", note: "Steep thatched roofs, elevated timber houses, and stepped rice terraces inspired by Ifugao architecture and landscapes.", theme: "ifugao", tasks: [{ title: "Rice for the gathering", description: "Bring 3 rice bundles to Ate Laya near the highland house.", goal: 3, item: "rice", npc: "lola", reward: 65 }, { title: "Bamboo for the footpath", description: "Bring 3 bamboo bundles to Mang Dado at the workshop.", goal: 3, item: "bamboo", npc: "nena", reward: 75 }, { title: "A peaceful mountain trail", description: "Shoo 4 sprites beside the terraces, then visit Kuya Benji.", goal: 4, item: "cleared", npc: "benji", reward: 90 }] },
    { name: "Lakeside Gathering", region: "MARANAO-INSPIRED \xB7 LANAO", architecture: "Torogan-inspired hall", note: "A raised timber hall with a sweeping roof and decorative projecting beams inspired by the Maranao torogan and its panolong.", theme: "maranao", tasks: [{ title: "Wood for the craft table", description: "Bring 3 carving-wood bundles to Ate Salma near the hall.", goal: 3, item: "wood", npc: "lola", reward: 85 }, { title: "A woven welcome", description: "Bring 3 woven-cloth bundles to Kuya Amir at the lakeside stall.", goal: 3, item: "cloth", npc: "nena", reward: 95 }, { title: "The final gathering", description: "Shoo 5 sprites along the lakeside path, then see Kuya Benji.", goal: 5, item: "cleared", npc: "benji", reward: 120 }] }
  ];
  var itemLabels = { mango: "mangga", flowers: "sampaguita", buko: "buko", clay: "clay bundles", rice: "rice bundles", bamboo: "bamboo bundles", wood: "carving wood", cloth: "woven cloth", cleared: "shades" };
  function stageInfo(s) {
    return stages[s.stage || 0];
  }
  function currentQuest(s) {
    const q = stageInfo(s).tasks[s.quest];
    return q?.item === "cleared" ? { ...q, title: ["Smoke in the palayan", "The crooked road", "Wings in the moonlight", "Bring back the moon"][s.stage], description: "Dispel " + q.goal + " " + legendFor(s).shade.toLowerCase() + "s, then visit " + stageNpcs(s)[2].name + "." } : q;
  }
  function questAmount(s, q = currentQuest(s)) {
    return q ? q.item === "cleared" ? Math.max(0, s.cleared - (s.clearStart?.[s.stage] || 0)) : s[q.item] : 0;
  }
  var buildingCache = [];
  var treeCache = [];
  var homeCache = [];
  function stageBuildings(s) {
    const i = s.stage || 0;
    return buildingCache[i] ??= buildings.map((b, j) => i === 0 ? b : { ...b, type: i === 1 ? "bato" : i === 2 ? "bale" : j === 1 ? "torogan" : "pavilion", w: i === 1 ? b.w + 12 : i === 3 && j === 1 ? 158 : b.w, h: i === 1 ? 92 : i === 2 ? 96 : i === 3 ? 98 : b.h }).map((b) => inRegion(b, i));
  }
  function stageTrees(s) {
    return treeCache[s.stage] ??= [...s.stage === 3 ? trees.filter((t) => t.x !== 265 && t.y < 451) : trees, ...wildTreesFor(s.stage)].map((t) => inRegion(t, s.stage));
  }
  function stageNodes(s) {
    const mappings = [{}, { mango: "clay" }, { mango: "rice", flowers: "bamboo", buko: "rice" }, { mango: "wood", flowers: "cloth" }];
    return nodes.map((n) => ({ ...n, type: mappings[s.stage || 0][n.type] || n.type, ...s.stage === 3 && n.id === 1 ? { x: 248, y: 218 } : {} })).map((n) => inRegion(n, s.stage));
  }
  function stageNpcs(s) {
    const names = [["Lola Rosa", "Aling Nena", "Kuya Benji"], ["Aling Pilar", "Mang Tomas", "Kuya Benji"], ["Ate Laya", "Mang Dado", "Kuya Benji"], ["Ate Salma", "Kuya Amir", "Kuya Benji"]][s.stage || 0];
    return npcs.map((n, i) => ({ ...n, name: names[i] })).map((n) => inRegion(n, s.stage));
  }
  function monsterHomes(s) {
    return homeCache[s.stage] ??= spiritHomes.map((p) => inRegion(p, s.stage));
  }
  function setBiome(s, index) {
    s.projectiles = [];
    s.stage = index;
    s.quest = s.stageProgress[index];
    s.completed = Array.from({ length: s.quest }, (_, i) => i);
    s.nodes = nodes.map(() => 0);
    s.spirits = monsterHomes(s).map((h, i) => ({ ...h, hp: 2 + s.stage, dead: 0, phase: i * 2, flash: 0 }));
  }
  function unlockAreas(s) {
    const before = s.unlocked;
    for (let i = 1; i < 4; i++) if (s.cleared >= regionLocks[i] || s.stageProgress[i - 1] === 3) s.unlocked = Math.max(s.unlocked, i);
    if (s.unlocked > before) emit(s, "\u2726 New paths opened", "arrival");
  }
  function enterStage(s, index) {
    if (typeof index !== "number" || !Number.isInteger(index) || index < 0 || index > Math.min(3, s.unlocked) || s.paused) return false;
    s.projectiles = [];
    s.area = "field";
    s.stage = index;
    s.quest = s.stageProgress[index];
    s.completed = Array.from({ length: s.quest }, (_, i) => i);
    s.transition = null;
    s.arrival++;
    s.player.x = 392 + regionOrigin(s.stage).x;
    s.player.y = 284 + regionOrigin(s.stage).y;
    s.player.dir = "down";
    s.player.hp = maxHealth(s);
    s.player.stamina = 100;
    s.player.walking = false;
    s.player.swing = 0;
    s.player.invincible = 2;
    s.nodes = nodes.map(() => 0);
    s.spirits = monsterHomes(s).map((h, i) => ({ ...h, hp: 2 + s.stage, dead: 0, phase: i * 2, flash: 0 }));
    emit(s, legendFor(s).title + " \xB7 Press L for the lantern journal.", "arrival");
    return true;
  }
  function create() {
    return { version: 4, profiles: createProfiles(), armor: "linen", armors: ["linen", "abaca"], hair: "natural", skin: "natural", hairColor: "ink", worldVersion: 1, weapon: "yantok", weapons: ["yantok", "tirador"], area: "tavern", chests: [0, 0, 0, 0], loreSeen: [false, false, false, false], xp: 0, gear: { arnis: 0, sandals: 0, agimat: 0 }, gearOwned: { arnis: 0, sandals: 0, agimat: 0 }, stage: 0, stageProgress: [0, 0, 0, 0], clearStart: [0, 0, 0, 0], unlocked: 0, arrival: 0, transition: null, character: "tala", name: "Tala", outfit: "terracotta", hat: "salakot", coins: 0, mango: 0, flowers: 0, buko: 0, beads: 0, clay: 0, rice: 0, bamboo: 0, wood: 0, cloth: 0, cleared: 0, quest: 0, completed: [], projectiles: [], player: { ...TAVERN.spawn, shot: 0, shotCooldown: 0, dir: "down", hp: 5, stamina: 100, walking: false, walkTime: 0, swing: 0, cooldown: 0, dash: 0, dashCooldown: 0, invincible: 0 }, nodes: nodes.map(() => 0), spirits: spiritHomes.map((h, i) => ({ ...h, hp: 2, dead: 0, phase: i * 2, flash: 0 })), time: 0, paused: false, compact: false, eventId: 0, events: [], savedAt: Date.now() };
  }
  function emit(s, text, type = "notice", x = s.player.x, y = s.player.y) {
    s.eventId++;
    s.events.push({ id: s.eventId, text, type, x, y });
    s.events = s.events.slice(-20);
  }
  function bounds(s) {
    return s.area === "tavern" ? TAVERN : WORLD;
  }
  function features(s) {
    if (s.area === "tavern") return [
      ...companions.map((c) => ({ id: c.id, name: characters[c.id].name + " \xB7 " + c.role, kind: "recruit", character: c.id, x: c.x, y: c.y })),
      { id: "exit", name: "Head out", kind: "door", ...TAVERN.door },
      { id: "bed", name: "Rest", kind: "rest", x: 654, y: 251 }
    ];
    return [
      ...s.stage === 0 ? [{ id: "inn", name: "Enter tavern", kind: "door", ...TAVERN.entrance }] : [],
      ...chests.filter((_, i) => !(s.chests[s.stage] & 1 << i)).map((p) => ({ ...p, id: "chest-" + chests.indexOf(p), name: "Open chest", kind: "chest", chest: chests.indexOf(p) })).map((f) => inRegion(f, s.stage)),
      ...camps.map((p, i) => ({ ...p, id: "camp-" + i, name: "Rest", kind: "rest" })).map((f) => inRegion(f, s.stage)),
      ...passages.filter((p) => p.a === s.stage || p.b === s.stage).map((p, i) => {
        const destination = p.a === s.stage ? p.b : p.a;
        const horizontal = p.x % REGION.width === 0;
        return { id: "passage-" + i, name: destination <= s.unlocked ? "Enter " + stages[destination].name : "\u{1F512} " + s.cleared + "/" + regionLocks[destination] + " shades", kind: "gate", destination, x: p.x + (horizontal ? s.stage === p.a ? -32 : 32 : 0), y: p.y + (!horizontal ? s.stage === p.a ? -32 : 32 : 0) };
      })
    ];
  }
  function blocked(x, y, s = { stage: 0 }) {
    if (s.area === "tavern") return x < 68 || x > 700 || y < 174 || y > 469 || tavernFurniture.some((f) => x > f.x - 8 && x < f.x + f.w + 8 && y > f.y - 5 && y < f.y + f.h + 6);
    if (x < 20 || y < 86 || x > WORLD.width - 20 || y > WORLD.height - 20) return true;
    const stage = regionAt(x, y), o = regionOrigin(stage), lx = x - o.x, ly = y - o.y;
    if (stage > (s.unlocked ?? s.stage)) return true;
    if (ly > 456 && ly < (stage === 3 && lx < 960 ? 600 : 505) && !(lx > 425 && lx < 490 || lx > 1340 && lx < 1400)) return true;
    if (stage === 0 && Math.abs(lx - 392) < 100 && ly > 623 && ly < 696) return true;
    if (stageBuildings({ stage }).some((b) => x > b.x - b.w / 2 - 5 && x < b.x + b.w / 2 + 5 && y > b.y - 20 && y < b.y + b.h * 0.48)) return true;
    if (stageTrees({ stage }).some((t) => Math.abs(x - t.x) < 12 && Math.abs(y - t.y) < 9)) return true;
    return false;
  }
  function nearest(s) {
    const p = s.player, choices = s.area === "tavern" ? features(s) : [...features(s), ...stageNpcs(s).map((n2) => ({ ...n2, kind: "npc" })), ...stageNodes(s).filter((n2) => s.nodes[n2.id] <= 0).map((n2) => ({ ...n2, kind: "node" }))];
    choices.sort((a, b) => Math.hypot(p.x - a.x, p.y - a.y) - Math.hypot(p.x - b.x, p.y - b.y));
    const n = choices[0];
    return n && Math.hypot(p.x - n.x, p.y - n.y) < 40 ? n : null;
  }
  function interact(s) {
    if (s.paused || s.transition) return;
    const n = nearest(s);
    if (!n) {
      emit(s, "Walk closer to a villager or a glowing harvest spot.");
      return;
    }
    if (n.kind === "door") {
      action(s, s.area === "tavern" ? "depart" : "home");
      return;
    }
    if (n.kind === "recruit") {
      action(s, "customize", { character: n.character });
      emit(s, characters[s.character].name + " ready!");
      return;
    }
    if (n.kind === "rest") {
      s.player.hp = maxHealth(s);
      s.player.stamina = 100;
      emit(s, "\u2665 Rested");
      return;
    }
    if (n.kind === "gate") {
      if (n.destination !== void 0 && n.destination <= s.unlocked) {
        const p = passages.find((p2) => p2.a === s.stage && p2.b === n.destination || p2.b === s.stage && p2.a === n.destination);
        const dir = s.stage === p.a ? 1 : -1;
        const horizontal = p.x % REGION.width === 0;
        const x = p.x + (horizontal ? dir * 40 : 0), y = p.y + (!horizontal ? dir * 40 : 0);
        if (!blocked(x, y, s)) {
          setBiome(s, n.destination);
          s.player.x = x;
          s.player.y = y;
        }
      } else emit(s, n.name);
      return;
    }
    if (n.kind === "chest") {
      if (n.chest !== void 0 && !(s.chests[s.stage] & 1 << n.chest)) {
        s.chests[s.stage] |= 1 << n.chest;
        s.coins += 25 + s.stage * 10;
        s.beads += 2;
        gainXP(s, 20);
        emit(s, "\u25C9 +" + (25 + s.stage * 10) + "  \u25C7 +2", "loot", n.x, n.y);
      }
      return;
    }
    if (n.kind === "node") {
      s[n.type]++;
      gainXP(s, 3);
      s.nodes[n.id] = 18;
      emit(s, "+1 " + itemLabels[n.type], "gather", n.x, n.y);
      return;
    }
    if (n.kind !== "npc") return;
    const q = currentQuest(s);
    if (q && n.id === q.npc) {
      if (questAmount(s, q) >= q.goal) {
        if (q.item !== "cleared") s[q.item] -= q.goal;
        s.coins += q.reward;
        s.completed.push(s.quest);
        s.quest++;
        s.stageProgress[s.stage] = s.quest;
        gainXP(s, 40);
        emit(s, "Lantern journal updated \xB7 " + legendFor(s).title, "lore");
        emit(s, n.name + ": Salamat! +" + q.reward + " coins", "quest");
        if (s.quest === 3 && s.stage < 3) {
          const next = s.stage + 1;
          if (s.unlocked < next) {
            s.unlocked = next;
            s.clearStart[next] = s.cleared;
          }
          emit(s, "\u2726 Path opened: " + stages[next].name, "departure");
        }
      } else emit(s, n.name + ": " + (s.stage === 0 ? { lola: "Puwede mo ba akong dalhan ng 3 mangga?", nena: "Three sampaguita for our fiesta, please!", benji: legendFor(s).warning }[n.id] : q.description));
    } else emit(s, n.name + ": " + (s.quest >= 3 ? "Salamat! You can revisit completed places from Our Journey." : s.stage === 0 ? { lola: "There is an ember in the balete. Have you seen it?", nena: "Tuloy po! There\u2019s always something good at the tindahan.", benji: legendFor(s).warning }[n.id] : legendFor(s).name + ": " + legendFor(s).warning));
    if (n.id === "lola") {
      s.player.hp = maxHealth(s);
      s.player.stamina = 100;
    }
  }
  function dropEquipment(s, x, y) {
    if ((s.cleared - 1) % 3 !== 0) return;
    const pool = [["kamagong", "bolo"], ["bolo", "sunshot", "sibat"], ["sibat", "sunshot", "moonbolo"], ["moonbolo", "sibat", "kamagong"]][s.stage], weapon = pool[Math.floor((s.cleared - 1) / 3) % pool.length];
    if (!s.weapons.includes(weapon)) {
      s.weapons.push(weapon);
      if (weaponInfo(weapon).damage > weaponInfo(s.weapon).damage) s.weapon = weapon;
      emit(s, "\u2694 " + weaponInfo(weapon).name + " found", "equipment", x, y);
    } else s.beads++;
    if (s.cleared % 9 === 7) {
      const armor = s.stage >= 2 ? "moonweave" : "leather";
      if (!s.armors.includes(armor)) {
        s.armors.push(armor);
        emit(s, "\u2726 " + armors[armor].name + " found", "equipment", x, y);
      }
    }
    const id = ["arnis", "sandals", "agimat"][Math.floor((s.cleared - 1) / 3) % 3];
    const tier = Math.min(3, 1 + Math.floor((s.stage + 1) / 2));
    if (tier > ownedTier(s, id)) {
      s.gearOwned[id] = tier;
      s.gear[id] = tier;
      emit(s, "\u25C7 Found " + equipment[id].tiers[tier] + " \xB7 equipped!", "equipment", x, y);
    } else {
      s.beads += 2;
      emit(s, "\u25C7 Duplicate " + equipment[id].tiers[tier] + " \xB7 +2 beads", "equipment", x, y);
    }
  }
  function defeat(s, e) {
    if (e.dead || e.hp > 0) return;
    e.dead = 28;
    s.cleared++;
    s.coins += 3 + s.gear.agimat;
    s.beads++;
    gainXP(s, 12);
    unlockAreas(s);
    emit(s, "+" + (3 + s.gear.agimat) + " coins \xB7 +1 agimat bead", "loot", e.x, e.y);
    dropEquipment(s, e.x, e.y);
  }
  function shoot(s) {
    const p = s.player;
    if (s.area === "tavern" || s.paused || p.shotCooldown > 0) return;
    const id = weaponInfo(s.weapon).kind === "slingshot" ? s.weapon : s.weapons.includes("sunshot") ? "sunshot" : "tirador", weapon = weaponInfo(id);
    const dir = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[p.dir];
    const target2 = s.spirits.filter((e) => !e.dead && Math.hypot(e.x - p.x, e.y - p.y) < weapon.range && (e.x - p.x) * dir[0] + (e.y - p.y) * dir[1] > 0).sort((a, b) => Math.hypot(a.x - p.x, a.y - p.y) - Math.hypot(b.x - p.x, b.y - p.y))[0];
    const dx = target2 ? target2.x - p.x : dir[0], dy = target2 ? target2.y - p.y : dir[1], length = Math.hypot(dx, dy) || 1;
    p.shot = 0.22;
    p.shotCooldown = weapon.cooldown;
    s.projectiles.push({ x: p.x, y: p.y, vx: dx / length * 340, vy: dy / length * 340, life: weapon.range / 340, damage: weapon.damage });
  }
  function swing(s) {
    if (weaponInfo(s.weapon).kind === "slingshot") {
      shoot(s);
      return;
    }
    const p = s.player;
    if (s.area === "tavern" || s.paused || p.cooldown > 0) return;
    p.swing = 0.32;
    p.cooldown = Math.max(0.16, weaponInfo(s.weapon).cooldown - s.gear.arnis * 0.045 - (s.character === "isko" ? 0.045 : 0));
    const dir = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[p.dir];
    let hit = false;
    for (const e of s.spirits) if (!e.dead && Math.hypot(p.x - e.x, p.y - e.y) < weaponInfo(s.weapon).range) {
      const dx = e.x - p.x, dy = e.y - p.y;
      if (dx * dir[0] + dy * dir[1] < -10) continue;
      e.hp -= Math.max(weaponInfo(s.weapon).damage, s.gear.arnis === 3 ? 2 : 1);
      e.flash = 0.2;
      hit = true;
      emit(s, "\u2726", "hit", e.x, e.y);
      const len = Math.hypot(dx, dy) || 1;
      const x = e.x + dx / len * 9, y = e.y + dy / len * 9;
      if (!blocked(x, y, s)) {
        e.x = x;
        e.y = y;
      }
      defeat(s, e);
    }
    if (!hit) emit(s, "", "swing");
  }
  function action(s, type, value) {
    if (type === "home" && !s.paused) {
      setBiome(s, 0);
      s.area = "tavern";
      s.transition = null;
      Object.assign(s.player, TAVERN.spawn, { walking: false, swing: 0, dash: 0 });
      s.arrival++;
      emit(s, "\u2600 Bahay Pahinga", "arrival");
    }
    if (type === "depart" && !s.paused) {
      setBiome(s, 0);
      s.area = "field";
      Object.assign(s.player, TAVERN.outside, { walking: false, swing: 0, dash: 0, invincible: 2 });
      s.arrival++;
      emit(s, stageInfo(s).name, "arrival");
    }
    if (type === "travel") {
      const inside = s.area === "tavern";
      if (enterStage(s, value) && inside) {
        s.area = "tavern";
        Object.assign(s.player, TAVERN.spawn);
      }
    }
    if (s.transition && !["pause", "compact", "travel", "customize"].includes(type)) return s;
    if (type === "craftArmor" && isKey(armors, value) && !s.paused) {
      const recipe = armors[value];
      if (s.armors.includes(value)) {
        s.armor = value;
        s.player.hp = Math.min(maxHealth(s), s.player.hp);
      } else if (progression(s).level >= recipe.level && s.coins >= recipe.coins && s.beads >= recipe.beads) {
        s.coins -= recipe.coins;
        s.beads -= recipe.beads;
        s.armors.push(value);
        s.armor = value;
        emit(s, recipe.name + " equipped", "equipment");
      }
    }
    if (type === "weapon" && typeof value === "string" && s.weapons.includes(value)) s.weapon = value;
    if (type === "equip" && isRecord(value) && isKey(equipment, value.id) && typeof value.tier === "number" && Number.isInteger(value.tier) && value.tier >= 0 && value.tier <= ownedTier(s, value.id)) {
      s.gear[value.id] = value.tier;
      emit(s, equipment[value.id].tiers[value.tier] + " equipped!", "notice");
    }
    if (type === "upgrade" && isKey(equipment, value) && !s.paused) {
      const cost = upgradeCost(s, value);
      if (ownedTier(s, value) >= 3) emit(s, "This keepsake is fully upgraded.");
      else if (progression(s).level < cost.level) emit(s, "Reach level " + cost.level + " to unlock this upgrade.");
      else if (s.coins < cost.coins || s.beads < cost.beads) emit(s, "Gather more peso coins and agimat beads first.");
      else {
        s.coins -= cost.coins;
        s.beads -= cost.beads;
        s.gear[value] = ownedTier(s, value) + 1;
        s.gearOwned[value] = s.gear[value];
        emit(s, equipment[value].tiers[s.gear[value]] + " equipped!", "quest");
      }
    }
    if (type === "interact") interact(s);
    if (type === "swing") swing(s);
    if (type === "shoot") shoot(s);
    if (type === "pause") s.paused = !s.paused;
    if (type === "compact") s.compact = !s.compact;
    if (type === "dash" && !s.paused && s.player.stamina >= 25 && s.player.dashCooldown <= 0) {
      s.player.stamina -= 25;
      s.player.dash = 0.18;
      s.player.dashCooldown = 0.8;
    }
    if (type === "snack" && !s.paused) {
      if (s.buko > 0) {
        s.buko--;
        s.player.hp = Math.min(maxHealth(s), s.player.hp + 2);
        s.player.stamina = 100;
        emit(s, "Fresh buko! +2 hearts \xB7 energy restored", "gather");
      } else emit(s, "Find a buko by the palms to restore your energy.");
    }
    if (type === "customize" && isRecord(value)) {
      if (isKey(characters, value.character)) switchCharacter(s, value.character);
      if (isKey(colors, value.outfit)) s.outfit = value.outfit;
      if (isKey(hairStyles, value.hair)) s.hair = value.hair;
      if (isKey(skinTones, value.skin)) s.skin = value.skin;
      if (isKey(hairColors, value.hairColor)) s.hairColor = value.hairColor;
      if (isKey(armors, value.armor) && s.armors.includes(value.armor)) {
        s.armor = value.armor;
        s.player.hp = Math.min(maxHealth(s), s.player.hp);
      }
      if (value.hat === "salakot" || value.hat === "bandana" || value.hat === "rattan" || value.hat === "none") s.hat = value.hat;
      if (typeof value.name === "string") s.name = value.name.trim().slice(0, 20) || characters[s.character].name;
    }
    return s;
  }
  function step(s, dt, input = {}) {
    dt = Math.max(0, Math.min(0.05, Number.isFinite(dt) ? dt : 0));
    if (s.paused) {
      s.player.walking = false;
      return s;
    }
    if (s.transition) {
      s.player.walking = false;
      s.transition.remaining -= dt;
      if (s.transition.remaining <= 0) enterStage(s, s.transition.next);
      return s;
    }
    s.time += dt;
    const p = s.player, beforeX = p.x, beforeY = p.y;
    for (const k of ["swing", "cooldown", "dash", "dashCooldown", "invincible", "shot", "shotCooldown"]) p[k] = Math.max(0, p[k] - dt);
    let dx = Math.max(-1, Math.min(1, Number(input.x) || 0)), dy = Math.max(-1, Math.min(1, Number(input.y) || 0));
    const len = Math.hypot(dx, dy);
    p.walking = len > 0;
    if (len) {
      dx /= len;
      dy /= len;
      if (Math.abs(dx) > Math.abs(dy)) p.dir = dx > 0 ? "right" : "left";
      else p.dir = dy > 0 ? "down" : "up";
      const run = input.run && p.stamina > 1, speed = p.dash > 0 ? 240 : (run ? 110 : 73) * (1 + s.gear.sandals * 0.08) * (s.character === "amihan" ? 1.12 : 1);
      if (!blocked(p.x + dx * speed * dt, p.y, s)) p.x += dx * speed * dt;
      if (!blocked(p.x, p.y + dy * speed * dt, s)) p.y += dy * speed * dt;
      p.walkTime += dt * (run ? 1.5 : 1);
      if (run) p.stamina = Math.max(0, p.stamina - 22 * dt);
      else p.stamina = Math.min(100, p.stamina + 16 * dt);
    } else p.stamina = Math.min(100, p.stamina + 22 * dt);
    p.walking = len > 0 && Math.hypot(p.x - beforeX, p.y - beforeY) > 1e-3;
    if (s.area === "tavern") return s;
    const biome = regionAt(p.x, p.y);
    if (biome !== s.stage) setBiome(s, biome);
    s.nodes = s.nodes.map((t) => Math.max(0, t - dt));
    for (const shot of s.projectiles) {
      shot.life -= dt;
      const parts = Math.max(1, Math.ceil(Math.hypot(shot.vx, shot.vy) * dt / 6));
      for (let i = 0; i < parts && shot.life > 0; i++) {
        shot.x += shot.vx * dt / parts;
        shot.y += shot.vy * dt / parts;
        if (blocked(shot.x, shot.y, s)) {
          shot.life = 0;
          break;
        }
        const enemy = s.spirits.find((e) => !e.dead && Math.hypot(e.x - shot.x, e.y - shot.y) < 14);
        if (enemy) {
          enemy.hp -= shot.damage;
          enemy.flash = 0.2;
          emit(s, "\u2726", "hit", enemy.x, enemy.y);
          defeat(s, enemy);
          shot.life = 0;
        }
      }
    }
    s.projectiles = s.projectiles.filter((p2) => p2.life > 0);
    const homes = monsterHomes(s);
    s.spirits.forEach((e, i) => {
      if (s.area !== "field") return;
      e.flash = Math.max(0, e.flash - dt);
      e.phase += dt;
      if (e.dead > 0) {
        e.dead = Math.max(0, e.dead - dt);
        if (e.dead === 0) {
          e.hp = 2 + s.stage;
          e.x = homes[i].x;
          e.y = homes[i].y;
        }
        return;
      }
      if (Math.hypot(p.x - e.x, p.y - e.y) > 800) return;
      if (!s.loreSeen[s.stage] && Math.hypot(p.x - e.x, p.y - e.y) < 105) {
        s.loreSeen[s.stage] = true;
        emit(s, "Encounter: " + legendFor(s).name + " \xB7 " + legendFor(s).warning, "lore");
      }
      const h = homes[i], pace = [0.55, 1.15, 0.75, 0.85][s.stage], tx = h.x + Math.sin(e.phase * pace) * [24, 38, 28, 32][s.stage], ty = h.y + Math.cos(e.phase * (pace + 0.2)) * 16;
      const distance = Math.hypot(p.x - e.x, p.y - e.y), alert = distance < 115 && distance > 12, rate = alert ? (25 + s.stage * 5) * dt / (distance || 1) : Math.min(1, dt * 1.5), nx = e.x + ((alert ? p.x : tx) - e.x) * rate, ny = e.y + ((alert ? p.y : ty) - e.y) * rate;
      if (!blocked(nx, e.y, s)) e.x = nx;
      if (!blocked(e.x, ny, s)) e.y = ny;
      if (Math.hypot(p.x - e.x, p.y - e.y) < 15 && p.invincible <= 0 && p.dash <= 0) {
        p.hp--;
        p.invincible = 1.8;
        emit(s, "Watch out! " + legendFor(s).shade + " nearby.", "hurt");
        if (p.hp <= 0) {
          p.hp = maxHealth(s);
          setBiome(s, 0);
          s.area = "tavern";
          Object.assign(p, TAVERN.spawn, { walking: false, dash: 0, swing: 0 });
          s.arrival++;
          emit(s, "\u2665 Recovered at the tavern.");
        }
      }
    });
    return s;
  }
  function restore(raw) {
    const s = create();
    if (!isRecord(raw) || raw.version !== 4) return s;
    if (isKey(characters, raw.character)) switchCharacter(s, raw.character);
    if (isRecord(raw.profiles)) for (const id of Object.keys(characters)) s.profiles[id] = restoreProfile(raw.profiles[id], id);
    for (const key2 of ["coins", "mango", "flowers", "buko", "beads", "clay", "rice", "bamboo", "wood", "cloth", "cleared", "quest", "time"]) {
      const value = raw[key2];
      if (typeof value === "number" && Number.isFinite(value)) s[key2] = Math.max(0, Math.min(key2 === "quest" ? 3 : 1e7, value));
    }
    s.area = raw.area === "tavern" ? "tavern" : "field";
    if (s.area === "field") {
      s.player.x = 392 + regionOrigin(s.stage).x;
      s.player.y = 284 + regionOrigin(s.stage).y;
    }
    s.stage = typeof raw.stage === "number" && Number.isInteger(raw.stage) ? Math.max(0, Math.min(3, raw.stage)) : 0;
    const progress = Array.isArray(raw.stageProgress) ? raw.stageProgress : null;
    if (progress) s.stageProgress = s.stageProgress.map((_, i) => {
      const value = progress[i];
      return typeof value === "number" && Number.isFinite(value) ? Math.floor(Math.max(0, Math.min(3, value))) : 0;
    });
    else s.stageProgress[0] = Math.floor(s.quest);
    s.unlocked = 0;
    for (let i = 0; i < 3 && s.stageProgress[i] === 3; i++) s.unlocked = i + 1;
    unlockAreas(s);
    s.events = [];
    s.eventId = 0;
    s.stage = Math.min(s.stage, s.unlocked);
    const starts = Array.isArray(raw.clearStart) ? raw.clearStart : [];
    s.clearStart = s.clearStart.map((_, i) => {
      const value = starts[i];
      return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(s.cleared, value)) : i === 0 ? 0 : s.cleared;
    });
    s.xp = typeof raw.xp === "number" && Number.isFinite(raw.xp) ? Math.floor(Math.max(0, Math.min(900, raw.xp))) : Math.min(900, s.stageProgress.reduce((a, b) => a + b, 0) * 40 + s.cleared * 12);
    if (isRecord(raw.gear)) for (const id of Object.keys(equipment)) {
      const tier = raw.gear[id];
      if (typeof tier === "number" && Number.isFinite(tier)) s.gear[id] = Math.floor(Math.max(0, Math.min(3, tier)));
    }
    for (const id of Object.keys(equipment)) {
      const tier = isRecord(raw.gearOwned) ? raw.gearOwned[id] : void 0;
      s.gearOwned[id] = typeof tier === "number" && Number.isFinite(tier) ? Math.max(s.gear[id], Math.floor(Math.max(0, Math.min(3, tier)))) : s.gear[id];
    }
    s.chests = s.chests.map((_, i) => {
      const mask = Array.isArray(raw.chests) ? raw.chests[i] : 0;
      return typeof mask === "number" && Number.isInteger(mask) ? Math.max(0, Math.min((1 << chests.length) - 1, mask)) : 0;
    });
    s.loreSeen = s.loreSeen.map((_, i) => i <= s.unlocked && (Array.isArray(raw.loreSeen) ? raw.loreSeen[i] === true : s.stageProgress[i] === 3));
    s.quest = s.stageProgress[s.stage];
    s.completed = Array.from({ length: s.quest }, (_, i) => i);
    if (Array.isArray(raw.armors)) s.armors = [.../* @__PURE__ */ new Set(["linen", "abaca", ...raw.armors.filter((id) => isKey(armors, id))])];
    action(s, "customize", raw);
    s.paused = raw.paused === true;
    s.compact = raw.compact === true;
    s.transition = null;
    s.weapons = Array.isArray(raw.weapons) ? [.../* @__PURE__ */ new Set(["yantok", "tirador", ...raw.weapons.filter((id) => typeof id === "string" && isKey(weapons, id))])] : ["yantok", "tirador"];
    s.weapon = typeof raw.weapon === "string" && s.weapons.includes(raw.weapon) ? raw.weapon : "yantok";
    const p = isRecord(raw.player) && s.area === "field" && raw.worldVersion !== 1 && typeof raw.player.x === "number" && typeof raw.player.y === "number" ? inRegion({ ...raw.player, x: raw.player.x, y: raw.player.y }, s.stage) : raw.player;
    if (s.area === "field") {
      s.player.x = 392 + regionOrigin(s.stage).x;
      s.player.y = 284 + regionOrigin(s.stage).y;
      s.spirits = monsterHomes(s).map((h, i) => ({ ...h, hp: 2 + s.stage, dead: 0, phase: i * 2, flash: 0 }));
    }
    if (isRecord(p) && typeof p.x === "number" && Number.isFinite(p.x) && typeof p.y === "number" && Number.isFinite(p.y) && (s.area === "tavern" || regionAt(p.x, p.y) === s.stage) && !blocked(p.x, p.y, s)) {
      s.player.x = p.x;
      s.player.y = p.y;
      if (p.dir === "up" || p.dir === "down" || p.dir === "left" || p.dir === "right") s.player.dir = p.dir;
      s.player.hp = typeof p.hp === "number" && Number.isFinite(p.hp) ? Math.max(1, Math.min(maxHealth(s), p.hp)) : maxHealth(s);
    }
    if (raw.worldVersion === 1 && isRecord(p) && typeof p.x === "number" && Number.isFinite(p.x) && typeof p.y === "number" && Number.isFinite(p.y) && s.area === "field" && regionAt(p.x, p.y) === s.stage && p.x > 20 && p.y > 86 && p.x < WORLD.width - 20 && p.y < WORLD.height - 20 && blocked(p.x, p.y, s)) {
      let found = false;
      for (let radius = 8; radius <= 80 && !found; radius += 8) for (let i = 0; i < 12; i++) {
        const x = p.x + Math.cos(i * Math.PI / 6) * radius, y = p.y + Math.sin(i * Math.PI / 6) * radius;
        if (!blocked(x, y, s) && regionAt(x, y) === s.stage) {
          s.player.x = x;
          s.player.y = y;
          found = true;
          break;
        }
      }
    }
    const timers = Array.isArray(raw.nodes) ? raw.nodes : [];
    s.nodes = s.nodes.map((_, i) => {
      const value = timers[i];
      return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(18, value)) : 0;
    });
    saveProfile(s);
    return s;
  }

  // src/browser/client.ts
  var vscode = typeof acquireVsCodeApi === "function" ? acquireVsCodeApi() : null;
  var keys = /* @__PURE__ */ new Set();
  var state = create();
  var loaded = !vscode;
  var last = performance.now();
  var lastUI = "";
  var lastEvent = 0;
  var saveClock = 0;
  var target = null;
  var route = [];
  var toastTimer = 0;
  var installEvent = null;
  var popup = null;
  var lastStage = "";
  var lastWeapons = "";
  var key = "baryo-adventure-v4";
  if (!vscode) {
    try {
      state = restore(JSON.parse(localStorage.getItem(key) || "null"));
    } catch (_) {
    }
    if (new URLSearchParams(location.search).has("popup")) state.compact = true;
  }
  function getState2() {
    return state;
  }
  function setTarget(x, y) {
    route = findPath(state.player, { x, y }, (x2, y2) => blocked(x2, y2, state));
    target = route.shift() || null;
    element("game").focus();
  }
  function notice(text) {
    if (!text) return;
    element("notice").textContent = text;
    element("notice").classList.add("visible");
    toastTimer = 4;
  }
  function persist() {
    if (!loaded) return;
    saveProfile(state);
    state.savedAt = Date.now();
    if (vscode) vscode.postMessage({ type: "save", save: state });
    else try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (_) {
      element("save-status").textContent = "Storage unavailable \u2014 session only";
    }
  }
  if (vscode) {
    window.addEventListener("message", (event) => {
      if (!isRecord(event.data)) return;
      if (event.data.type === "load") {
        state = restore(event.data.save);
        loaded = true;
        lastUI = "";
        update();
      }
      if (event.data.type === "notice" && typeof event.data.text === "string") notice(event.data.text);
    });
    vscode.postMessage({ type: "ready" });
  }
  function action2(type, value) {
    if (!loaded) return;
    const previousCharacter = state.character;
    action(state, type, value);
    if (previousCharacter !== state.character) {
      keys.clear();
      target = null;
      route = [];
    }
    if (["pause", "home", "depart", "travel"].includes(type)) {
      keys.clear();
      target = null;
      route = [];
    }
    update();
    persist();
  }
  var lorePage = state.stage;
  function drawLore() {
    element("lore-tabs").replaceChildren(...legends.map((legend2, i) => {
      const b = document.createElement("button");
      b.textContent = i > state.unlocked ? "\u25C7 Unwritten" : legend2.symbol + " " + legend2.name;
      b.disabled = i > state.unlocked;
      b.setAttribute("aria-pressed", String(i === lorePage));
      b.addEventListener("click", () => {
        lorePage = i;
        drawLore();
      });
      return b;
    }));
    const legend = legends[lorePage], entry = element("lore-entry");
    entry.replaceChildren();
    const heading = document.createElement("h3");
    heading.textContent = legend.symbol + " " + legend.title;
    entry.append(heading);
    const tradition = document.createElement("p");
    tradition.className = "lore-tradition";
    tradition.textContent = legend.tradition;
    entry.append(tradition);
    const field = document.createElement("p");
    field.className = "lore-field";
    field.textContent = state.loreSeen[lorePage] ? "ENCOUNTER RECORDED \xB7 " + legend.warning : "UNSEEN \xB7 Explore the eastern paths to record an encounter.";
    entry.append(field);
    for (let i = 0; i < 4; i++) {
      const fragment = document.createElement("p");
      fragment.className = i <= state.stageProgress[lorePage] ? "lore-fragment" : "lore-fragment locked";
      fragment.textContent = i <= state.stageProgress[lorePage] ? String(i + 1).padStart(2, "0") + " \xB7 " + legend.fragments[i] : "\u25C7 Complete " + i + " favors here to reveal this page.";
      entry.append(fragment);
    }
  }
  function toggleLore() {
    const panel = element("lore-panel");
    keys.clear();
    target = null;
    route = [];
    state.player.walking = false;
    if (panel.open) panel.close();
    else {
      lorePage = state.stage;
      drawLore();
      panel.showModal();
    }
  }
  element("lore-open").addEventListener("click", toggleLore);
  element("lore-close").addEventListener("click", () => element("lore-panel").close());
  element("lore-panel").addEventListener("close", () => {
    keys.clear();
    target = null;
    route = [];
    element("game").focus();
  });
  function toggleEquipment() {
    const panel = element("equipment-panel");
    keys.clear();
    target = null;
    route = [];
    state.player.walking = false;
    if (panel.open) panel.close();
    else {
      lastUI = "";
      update();
      panel.showModal();
    }
  }
  element("equipment-open").addEventListener("click", toggleEquipment);
  element("equipment-close").addEventListener("click", () => {
    element("equipment-panel").close();
  });
  element("equipment-panel").addEventListener("close", () => {
    keys.clear();
    target = null;
    route = [];
    element("game").focus();
  });
  for (const [id, choices] of [["hair", hairStyles], ["skin-tone", skinTones], ["hair-color", { ink: "Ink black", chestnut: "Chestnut", ash: "Ash" }]]) {
    const select = document.getElementById(id);
    select.replaceChildren(...Object.entries(choices).map(([value, textContent]) => Object.assign(document.createElement("option"), { value, textContent })));
  }
  for (const [id, property] of [["hair", "hair"], ["skin-tone", "skin"], ["hair-color", "hairColor"], ["body-armor", "armor"]]) element(id).addEventListener("change", () => action2("customize", { [property]: document.getElementById(id).value }));
  element("look-weapon").addEventListener("change", () => action2("weapon", document.getElementById("look-weapon").value));
  element("sprite-turn").addEventListener("click", () => {
    const canvas3 = element("wardrobe-preview"), directions = ["down", "left", "up", "right"];
    canvas3.dataset.facing = directions[(directions.indexOf(canvas3.dataset.facing || "down") + 1) % 4];
  });
  var armorButtons = /* @__PURE__ */ new Map();
  for (const [id, armor] of Object.entries(armors)) {
    const button = document.createElement("button");
    button.addEventListener("click", () => action2("craftArmor", id));
    armorButtons.set(id, button);
    element("armor-slots").append(button);
  }
  var gearButtons = /* @__PURE__ */ new Map();
  for (const id of Object.keys(equipment)) {
    const gear = equipment[id], card = document.createElement("article");
    card.className = "equipment-card";
    const icon = document.createElement("span");
    icon.className = "gear-icon gear-" + id;
    icon.textContent = gear.icon;
    const name2 = document.createElement("h3");
    name2.textContent = gear.name;
    const tier = document.createElement("b");
    tier.id = "gear-tier-" + id;
    const description = document.createElement("p");
    description.textContent = { arnis: "\u2191 Swing speed \xB7 Tier 3: \xD72 damage", sandals: "+8% speed / tier", agimat: "+1 coin per drop / tier" }[id];
    description.title = gear.description;
    const button = document.createElement("button");
    button.addEventListener("click", () => action2("upgrade", id));
    gearButtons.set(id, button);
    const select = document.createElement("select");
    select.id = "gear-equipped-" + id;
    select.setAttribute("aria-label", "Equipped " + gear.name);
    select.addEventListener("change", () => action2("equip", { id, tier: Number(select.value) }));
    card.append(icon, name2, tier, description, select, button);
    element("equipment-cards").append(card);
  }
  var bindings = { w: "up", W: "up", ArrowUp: "up", s: "down", S: "down", ArrowDown: "down", a: "left", A: "left", ArrowLeft: "left", d: "right", D: "right", ArrowRight: "right", Shift: "run" };
  window.addEventListener("keydown", (event) => {
    if (event.target instanceof HTMLElement && ["INPUT", "SELECT", "TEXTAREA"].includes(event.target.tagName)) return;
    if (event.code === "KeyH" && !event.repeat && !element("equipment-panel").open && !element("lore-panel").open && !element("customize-panel").open && !document.getElementById("online-panel").open) {
      event.preventDefault();
      action2("home");
      return;
    }
    if (event.code === "KeyL" && !event.repeat && !element("equipment-panel").open) {
      event.preventDefault();
      toggleLore();
      return;
    }
    if (event.code === "KeyI" && !event.repeat) {
      if (!element("lore-panel").open) {
        event.preventDefault();
        toggleEquipment();
      }
      return;
    }
    if (element("equipment-panel").open || element("lore-panel").open || element("customize-panel").open || document.getElementById("online-panel").open || event.target instanceof HTMLButtonElement) return;
    if (event.code === "Space" || event.code === "KeyR") {
      event.preventDefault();
      keys.add(event.code === "Space" ? "attack" : "shoot");
    }
    if (!event.repeat && (event.code === "Digit1" || event.code === "Digit2")) {
      event.preventDefault();
      const ranged = event.code === "Digit2", choices = state.weapons.filter((id) => weaponInfo(id).kind === "slingshot" === ranged).sort((a, b) => weaponInfo(b).damage - weaponInfo(a).damage);
      if (choices[0]) action2("weapon", choices[0]);
    }
    const k = bindings[event.key];
    if (k) {
      event.preventDefault();
      keys.add(k);
      target = null;
      route = [];
    }
    if (!event.repeat) {
      if (event.code === "Space") {
        event.preventDefault();
        keys.add("attack");
        action2("swing");
      }
      if (event.code === "KeyR") {
        event.preventDefault();
        keys.add("shoot");
        action2("shoot");
      }
      if (event.code === "KeyE") {
        event.preventDefault();
        action2("interact");
      }
      if (event.code === "KeyQ") {
        event.preventDefault();
        action2("dash");
      }
      if (event.code === "Escape") action2("pause");
    }
  });
  window.addEventListener("keyup", (event) => {
    if (bindings[event.key]) keys.delete(bindings[event.key]);
    if (event.code === "Space") keys.delete("attack");
    if (event.code === "KeyR") keys.delete("shoot");
  });
  function clear() {
    keys.clear();
    target = null;
    route = [];
    state.player.walking = false;
    persist();
  }
  window.addEventListener("blur", clear);
  window.addEventListener("pagehide", clear);
  document.addEventListener("visibilitychange", () => {
    clear();
    last = performance.now();
  });
  document.querySelectorAll("[data-key]").forEach((b) => {
    b.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      b.setPointerCapture(e.pointerId);
      keys.add(b.dataset.key);
      target = null;
    });
    for (const ev of ["pointerup", "pointercancel", "lostpointercapture"]) b.addEventListener(ev, () => keys.delete(b.dataset.key));
  });
  element("travel-now").addEventListener("click", () => {
    if (state.transition) action2("travel", state.transition.next);
  });
  element("touch-interact").addEventListener("click", () => action2("interact"));
  element("touch-swing").addEventListener("click", () => action2("swing"));
  element("touch-dash").addEventListener("click", () => action2("dash"));
  element("shoot").addEventListener("click", () => {
    action2("shoot");
    element("game").focus();
  });
  element("touch-shoot").addEventListener("click", () => action2("shoot"));
  for (const [id, key2] of [["touch-swing", "attack"], ["touch-shoot", "shoot"]]) {
    const b = element(id);
    b.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      b.setPointerCapture(e.pointerId);
      keys.add(key2);
    });
    for (const ev of ["pointerup", "pointercancel", "lostpointercapture"]) b.addEventListener(ev, () => keys.delete(key2));
  }
  element("game").addEventListener("pointerdown", () => {
    element("game").focus();
  });
  element("pause").addEventListener("click", () => {
    action2("pause");
    element("game").focus();
  });
  element("snack").addEventListener("click", () => action2("snack"));
  element("compact").addEventListener("click", () => {
    action2("compact");
    window.mosslightDesktop?.control("expand");
  });
  element("popup").addEventListener("click", () => {
    persist();
    if (vscode) {
      vscode.postMessage({ type: "popup" });
      return;
    }
    if (popup && !popup.closed) {
      popup.focus();
      return;
    }
    const url = new URL(location.href);
    url.searchParams.set("popup", "1");
    popup = window.open(url.href, "baryo-adventure", "popup=yes,width=1000,height=620,resizable=yes");
    if (!popup) notice("Allow popups for this page to open a separate game window.");
  });
  element("home").addEventListener("click", () => {
    action2("home");
    element("game").focus();
  });
  element("depart").addEventListener("click", () => {
    action2("depart");
    element("game").focus();
  });
  document.querySelectorAll("[data-recruit]").forEach((b) => b.addEventListener("click", () => {
    action2("customize", { character: b.dataset.recruit });
    element("game").focus();
  }));
  element("customize-open").addEventListener("click", () => {
    if (state.area !== "tavern") action2("home");
    keys.clear();
    target = null;
    route = [];
    if (!element("customize-panel").open && !document.getElementById("online-panel").open) element("customize-panel").showModal();
  });
  element("customize-close").addEventListener("click", () => element("customize-panel").close());
  element("customize-panel").addEventListener("close", () => {
    element("game").focus();
  });
  for (const [id, c] of Object.entries(characters)) {
    const b = document.createElement("button");
    b.dataset.character = id;
    b.append(Object.assign(document.createElement("canvas"), { width: 48, height: 56, id: "sprite-" + id }), Object.assign(document.createElement("b"), { textContent: c.name }), Object.assign(document.createElement("small"), { textContent: c.description }));
    b.addEventListener("click", () => action2("customize", { character: id }));
    element("character-choices").append(b);
  }
  for (const color of Object.keys(colors)) {
    const b = document.createElement("button");
    b.className = "swatch color-" + color;
    b.dataset.color = color;
    b.setAttribute("aria-label", color + " shirt");
    b.addEventListener("click", () => action2("customize", { outfit: color }));
    element("color-options").append(b);
  }
  element("hat").addEventListener("change", () => action2("customize", { hat: element("hat").value }));
  element("save-name").addEventListener("click", () => {
    action2("customize", { name: element("name-input").value });
    notice("Your adventurer is ready. Tara na!");
  });
  if (window.mosslightDesktop) {
    document.body.classList.add("desktop");
    element("desktop-controls").hidden = false;
    element("popup").hidden = true;
    for (const [id, command] of [["pin-window", "pin"], ["minimize-window", "minimize"], ["close-window", "close"]]) element(id).addEventListener("click", () => window.mosslightDesktop?.control(command));
  }
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installEvent = event;
    element("install").hidden = false;
  });
  element("install").addEventListener("click", async () => {
    if (installEvent) {
      await installEvent.prompt();
      installEvent = null;
      element("install").hidden = true;
    }
  });
  if (!vscode && "serviceWorker" in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register("./sw.js").catch(() => {
  });
  window.addEventListener("storage", (event) => {
    if (event.key === key && event.newValue && !state.player.walking) {
      try {
        state = restore(JSON.parse(event.newValue));
        lastUI = "";
      } catch (_) {
      }
    }
  });
  function update() {
    const s = state, p = s.player, n = nearest(s), q = currentQuest(s);
    const stage = stageInfo(s);
    const origin = regionOrigin(s.stage), lx = p.x - origin.x, ly = p.y - origin.y;
    const region = s.area === "tavern" ? "Bahay Pahinga" : lx > 960 || ly > 610 ? stage.name : s.stage === 0 ? ly > 505 ? "Tabing-ilog" : lx > 670 ? "Palayan" : lx > 540 ? "Sari-sari corner" : "Barangay Maligaya" : stage.name;
    const signature = JSON.stringify([region, s.area, s.chests, s.stage, s.stageProgress, s.unlocked, s.transition ? Math.ceil(s.transition.remaining) : null, s.paused, s.character, s.name, s.outfit, s.hat, s.armor, s.armors, s.hair, s.skin, s.hairColor, s.weapon, s.weapons, s.loreSeen, s.xp, s.gear, s.gearOwned, s.coins, s.mango, s.flowers, s.buko, s.beads, s.quest, s.cleared, Math.floor(p.x / 30), Math.floor(p.y / 30), p.hp, Math.round(p.stamina), Math.round(p.shotCooldown * 10), s.paused, s.compact, n?.id, n?.kind]);
    if (signature === lastUI) return;
    lastUI = signature;
    document.body.dataset.area = s.area;
    element("tavern-party").hidden = s.area !== "tavern";
    element("home").setAttribute("aria-pressed", String(s.area === "tavern"));
    document.querySelectorAll("[data-recruit]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.recruit === s.character));
    });
    document.body.classList.toggle("compact", s.compact);
    element("compact").setAttribute("aria-pressed", String(s.compact));
    element("pause").textContent = s.paused ? "\u25B6" : "\u2161";
    element("pause").setAttribute("aria-label", s.paused ? "Resume" : "Pause");
    element("pause").title = s.paused ? "Resume" : "Pause";
    element("pause").setAttribute("aria-pressed", String(s.paused));
    const legend = legendFor(s);
    element("story-symbol").textContent = legend.symbol;
    element("story-chapter").textContent = "CHAPTER " + (s.stage + 1) + " \xB7 " + s.stageProgress[s.stage] + "/3 FAVORS";
    element("story-title").textContent = legend.title;
    element("story-text").textContent = chapterFor(s);
    const progress = progression(s);
    element("level-number").textContent = "Lv " + progress.level;
    element("level-title").textContent = s.name;
    element("xp-label").textContent = progress.level === 10 ? "MAX" : progress.progress + "/100 XP";
    element("xp-fill").style.width = progress.progress + "%";
    for (const [id, button] of armorButtons) {
      const armor = armors[id], owned = s.armors.includes(id);
      button.textContent = (id === s.armor ? "\u2713 " : "") + armor.name + " \xB7 " + armor.hearts + " \u2665" + (owned ? "" : progress.level < armor.level ? " \xB7 Lv " + armor.level : " \xB7 \u25C9 " + armor.coins + " \u25C7 " + armor.beads);
      button.setAttribute("aria-pressed", String(id === s.armor));
      button.disabled = !owned && (s.paused || progress.level < armor.level || s.coins < armor.coins || s.beads < armor.beads);
    }
    for (const [id, value, options] of [["body-armor", s.armor, s.armors.map((id2) => ({ value: id2, textContent: armors[id2].name }))], ["look-weapon", s.weapon, s.weapons.map((id2) => ({ value: id2, textContent: weaponInfo(id2).name }))]]) {
      const select = document.getElementById(id);
      if (select.options.length !== options.length) select.replaceChildren(...options.map((option) => Object.assign(document.createElement("option"), option)));
      select.value = value;
    }
    document.getElementById("hair").value = s.hair;
    document.getElementById("skin-tone").value = s.skin;
    document.getElementById("hair-color").value = s.hairColor;
    element("armor-hearts").textContent = "Lv " + progression(s).level + " \xB7 " + maxHealth(s) + " \u2665";
    element("equipment-summary").textContent = "Lv " + progress.level + "   \u25C9 " + s.coins + "   \u25C7 " + s.beads;
    const weaponKey = JSON.stringify([s.weapon, s.weapons]);
    if (weaponKey !== lastWeapons) {
      lastWeapons = weaponKey;
      element("weapon-slots").replaceChildren(...s.weapons.map((id) => {
        const weapon = weaponInfo(id), b = document.createElement("button");
        b.className = "weapon-" + weapon.rarity.toLowerCase();
        b.textContent = (id === s.weapon ? "\u2713 " : "\u2694 ") + weapon.name;
        b.title = weapon.rarity + " \xB7 " + weapon.damage + " damage \xB7 " + weapon.range + " reach";
        b.setAttribute("aria-pressed", String(id === s.weapon));
        b.addEventListener("click", () => action2("weapon", id));
        return b;
      }));
    }
    for (const [id, button] of gearButtons) {
      const tier = ownedTier(s, id), cost = upgradeCost(s, id);
      element("gear-tier-" + id).textContent = equipment[id].tiers[s.gear[id]] + " \u2713";
      const select = document.getElementById("gear-equipped-" + id);
      if (select.options.length !== tier + 1) select.replaceChildren(...Array.from({ length: tier + 1 }, (_, i) => Object.assign(document.createElement("option"), { value: String(i), textContent: equipment[id].tiers[i] })));
      select.value = String(s.gear[id]);
      button.disabled = tier === 3 || s.paused || !!s.transition || progress.level < cost.level || s.coins < cost.coins || s.beads < cost.beads;
      button.textContent = tier === 3 ? "\u2713 MAX" : progress.level < cost.level ? "\u{1F512} Lv " + cost.level : "\u2191  \u25C9 " + cost.coins + (cost.beads ? "  \u25C7 " + cost.beads : "");
      button.title = tier === 3 ? "All upgrades equipped" : equipment[id].tiers[tier + 1];
    }
    element("player-name").textContent = s.name;
    for (const id of ["coins", "mango", "flowers", "buko", "beads"]) element(id).textContent = s[id].toLocaleString();
    element("snack").disabled = s.buko <= 0;
    const shooting = s.area === "field" && !s.paused;
    element("shoot").toggleAttribute("disabled", !shooting);
    element("touch-shoot").toggleAttribute("disabled", !shooting);
    element("shoot").classList.toggle("firing", p.shotCooldown > 0);
    element("hearts").textContent = Array.from({ length: maxHealth(s) }, (_, i) => i < p.hp ? "\u2665" : "\u2661").join(" ");
    element("energy-fill").style.width = p.stamina + "%";
    element("location").textContent = region;
    element("stage-region").textContent = stage.region;
    element("scene-title").textContent = stage.name;
    element("scene-architecture").textContent = stage.architecture.toUpperCase();
    element("architecture-title").textContent = stage.architecture;
    element("architecture-note").textContent = stage.note;
    element("stage-eyebrow").textContent = "STAGE " + String(s.stage + 1).padStart(2, "0") + " OF 04 \xB7 " + stage.region;
    element("stage-heading").textContent = ["A little closer to home.", "Stories set in stone.", "Up where the rice fields climb.", "By the water, together."][s.stage];
    element("stage-subtitle").textContent = ["Slow afternoons. Small adventures. A whole barangay to discover.", "Capiz windows, cobbled lanes, and a new community to help.", "Mountain air, timber homes, and a gathering above the clouds.", "A raised hall, a lakeside path, and the last stop of your journey."][s.stage];
    document.body.dataset.stage = stage.theme;
    const materials = [["mango", "flowers", "\u{1F96D}", "\u273F"], ["clay", "flowers", "\u25D2", "\u273F"], ["rice", "bamboo", "\u2667", "\u2571"], ["wood", "cloth", "\u25A5", "\u25A7"]][s.stage];
    element("mango").textContent = String(s[materials[0]]);
    element("flowers").textContent = String(s[materials[1]]);
    element("material-a-label").textContent = itemLabels[materials[0]];
    element("material-b-label").textContent = itemLabels[materials[1]];
    element("material-a-icon").textContent = materials[2];
    element("material-b-icon").textContent = materials[3];
    element("material-a-icon").parentElement.title = itemLabels[materials[0]];
    element("material-b-icon").parentElement.title = itemLabels[materials[1]];
    element("stage-transition").hidden = !s.transition;
    if (s.transition) {
      const next = stages[s.transition.next];
      element("next-stage-name").textContent = next.name;
      element("next-stage-detail").textContent = next.architecture + " \xB7 " + next.region;
      element("travel-countdown").textContent = s.paused ? "Journey paused" : "Travelling in " + Math.ceil(s.transition.remaining) + "\u2026";
      element("travel-now").disabled = s.paused;
    }
    if (q) {
      const amount = Math.min(q.goal, questAmount(s, q));
      element("quest-title").textContent = q.item === "cleared" ? "Dispel shades" : "Collect " + itemLabels[q.item];
      element("quest-description").textContent = q.description;
      element("quest-count").textContent = String(s.quest + 1).padStart(2, "0") + " / 03";
      element("quest-progress-fill").style.width = amount / q.goal * 100 + "%";
      element("quest-progress-text").textContent = amount + " / " + q.goal + " " + itemLabels[q.item];
      const objective = stageNpcs(s).find((n2) => n2.id === q.npc), bearing = ["\u2192", "\u2198", "\u2193", "\u2199", "\u2190", "\u2196", "\u2191", "\u2197"][(Math.round(Math.atan2(objective.y - p.y, objective.x - p.x) / (Math.PI / 4)) + 8) % 8];
      element("quest-hint").textContent = amount >= q.goal ? "\u2713 " + bearing + " " + objective.name : (q.item === "cleared" ? "\u2694" : "\u2726") + " " + amount + "/" + q.goal + " " + itemLabels[q.item];
      element("quest-tip").textContent = q.item === "cleared" ? legendFor(s).warning + " Press Space to dispel the shades." : "Find the glowing " + itemLabels[q.item] + " spots, then return to the neighbor named above. Press E to gather or talk.";
    } else {
      const goal = regionLocks[s.unlocked + 1];
      element("quest-title").textContent = goal ? "Open new paths" : "Find rare weapons";
      element("quest-description").textContent = "Explore and farm monster drops.";
      element("quest-count").textContent = "\u221E";
      element("quest-progress-fill").style.width = (goal ? Math.min(100, s.cleared / goal * 100) : 100) + "%";
      element("quest-progress-text").textContent = goal ? s.cleared + " / " + goal + " shades" : "Explore \xB7 fight \xB7 loot";
      element("quest-tip").textContent = "";
      element("quest-hint").textContent = goal ? "\u2694 " + s.cleared + "/" + goal + " \xB7 unlock paths" : "\u2694 Farm gear";
    }
    element("interaction").hidden = !n || s.paused;
    if (n) element("interaction-text").textContent = n.kind === "node" ? itemLabels[n.type] : n.name;
    if (s.area === "tavern") element("quest-hint").textContent = "Choose a hero \xB7 Head out \u2197";
    if (document.activeElement !== element("name-input")) element("name-input").value = s.name;
    element("hat").value = s.hat;
    document.querySelectorAll("[data-character]").forEach((b) => {
      b.classList.toggle("selected", b.dataset.character === s.character);
      b.setAttribute("aria-pressed", String(b.dataset.character === s.character));
    });
    document.querySelectorAll("[data-color]").forEach((b) => {
      b.classList.toggle("selected", b.dataset.color === s.outfit);
      b.setAttribute("aria-pressed", String(b.dataset.color === s.outfit));
    });
  }
  function frame(now) {
    const dt = Math.min(0.04, (now - last) / 1e3);
    last = now;
    if (loaded && !document.hidden) {
      let x = (keys.has("right") ? 1 : 0) - (keys.has("left") ? 1 : 0), y = (keys.has("down") ? 1 : 0) - (keys.has("up") ? 1 : 0);
      if (target && !x && !y) {
        const dx = target.x - state.player.x, dy = target.y - state.player.y, len = Math.hypot(dx, dy);
        if (len < 5) target = route.shift() || null;
        else {
          x = dx / len;
          y = dy / len;
        }
      }
      const beforeX = state.player.x, beforeY = state.player.y;
      if (!element("equipment-panel").open && !element("lore-panel").open && !element("customize-panel").open && !document.getElementById("online-panel").open) {
        if (keys.has("attack")) action(state, "swing");
        if (keys.has("shoot")) action(state, "shoot");
        step(state, dt, { x, y, run: keys.has("run") });
      }
      if (state.area + state.arrival !== lastStage) {
        lastStage = state.area + state.arrival;
        keys.clear();
        target = null;
        route = [];
        persist();
      }
      if (target && (x || y) && Math.hypot(state.player.x - beforeX, state.player.y - beforeY) < 0.05) target = null;
      for (const e of state.events) if (e.id > lastEvent) {
        lastEvent = e.id;
        if (!["hit", "swing", "gather", "loot"].includes(e.type)) notice(e.type === "lore" ? "\u263E " + legendFor(state).name + " \xB7 [L]" : e.type === "arrival" ? stageInfo(state).name : e.text);
      }
      if (toastTimer > 0) {
        toastTimer -= dt;
        if (toastTimer <= 0) element("notice").classList.remove("visible");
      }
      saveClock += dt;
      if (saveClock > 4) {
        saveClock = 0;
        persist();
      }
      update();
    }
    requestAnimationFrame(frame);
  }
  update();
  initMultiplayer(getState2, !vscode && /^https?:$/.test(location.protocol));
  requestAnimationFrame(frame);

  // src/browser/sprites.ts
  var TILE_W = 80;
  var TILE_H = 64;
  var FRAMES = 8;
  var sheets = /* @__PURE__ */ new Map();
  function shade(hex, amount) {
    const value = parseInt(hex.slice(1), 16);
    return "#" + [value >> 16, value >> 8 & 255, value & 255].map((c) => Math.max(0, Math.min(255, c + amount)).toString(16).padStart(2, "0")).join("");
  }
  function drawFrame(ctx2, look, dir, pose, frame3) {
    const r = (x, y, w, h, color) => {
      ctx2.fillStyle = color;
      ctx2.fillRect(Math.round(x), Math.round(y), w, h);
    };
    const phase = frame3 / FRAMES * Math.PI * 2, moving = pose === "walk" || pose === "dash", stride = moving ? Math.round(Math.sin(phase) * 3) : 0, bob = moving ? Math.abs(stride) * 0.4 : frame3 === 3 || frame3 === 4 ? 1 : 0;
    const outline = "#374237", hair = hairColors[look.hairColor], hairLight = shade(hair, 20), skin = look.skin, skinShadow = shade(skin, -26), skinLight = shade(skin, 21), shirt = look.shirt, shirtShade = shade(shirt, -29), shirtLight = shade(shirt, 27);
    const back = dir === "up", side = dir === "left" || dir === "right", style = look.hair === "natural" ? { tala: "long", isko: "crop", amihan: "ponytail" }[look.character] : look.hair;
    ctx2.save();
    ctx2.translate(40, 59);
    if (dir === "left") ctx2.scale(-1, 1);
    for (const [x, step2] of [[-6, stride], [1, -stride]]) {
      r(x, -12 + step2 * 0.4, 6, 13, outline);
      r(x + 1, -11 + step2 * 0.4, 4, 11, "#68715b");
      r(x + 1, -11 + step2 * 0.4, 1, 10, "#89917a");
      const sole = ["#655440", "#bd9657", "#d0b778", "#e9cf87"][look.sandals];
      r(x - 1, step2 * 0.6, 7, 4, outline);
      r(x, 1 + step2 * 0.6, 6, 2, sole);
      r(x + 1, step2 * 0.6, 3, 1, "#d9c291");
      if (look.sandals > 1) r(x, 3 + step2 * 0.6, 6, 1, "#f2dbab");
    }
    ctx2.translate(pose === "dash" ? 2 : 0, -Math.round(bob));
    if (style === "long" || style === "bob") {
      r(-8, -37, 16, 19, outline);
      r(-7, -36, 14, 18, hair);
      r(-7, -34, 2, 14, hairLight);
    }
    if (style === "ponytail") {
      const swish = moving ? stride * 0.4 : frame3 % 3 - 1;
      r(back ? -2 : -10, -37, 5, 15, outline);
      r(back ? -1 : -9, -36, 3, 13, hair);
      r(back ? -2 : -10, -23 + swish, 4, 6, hair);
      r(back ? -1 : -9, -35, 3, 2, "#cf9a69");
    }
    r(-8, -24, 16, 14, outline);
    r(-7, -23, 14, 12, shirtShade);
    r(-5, -24, 10, 13, shirt);
    r(-5, -22, 2, 10, shirtLight);
    r(-7, -13, 14, 3, shirtShade);
    r(-3, -26, 6, 4, skinShadow);
    r(-2, -26, 4, 3, skin);
    r(-3, -23, 6, 2, "#ebd5a8");
    r(-1, -21, 2, 8, shirtShade);
    r(0, -20, 1, 1, "#edcd8b");
    r(0, -17, 1, 1, "#edcd8b");
    if (look.character === "amihan" && look.armor === "linen") {
      r(-7, -12, 14, 3, shirt);
      r(-6, -10, 12, 2, shirtLight);
    }
    if (look.armor === "abaca") {
      r(-7, -23, 5, 12, "#a88b57");
      r(2, -23, 5, 12, "#c0a671");
      r(-6, -22, 3, 10, "#ddc48b");
      r(3, -22, 3, 10, "#ead59d");
      for (let y = -21; y < -12; y += 3) {
        r(-6, y, 3, 1, "#b59761");
        r(3, y, 3, 1, "#b59761");
      }
      r(-7, -12, 14, 2, "#8d784f");
    } else if (look.armor === "leather") {
      r(-7, -23, 14, 12, "#704f3c");
      r(-6, -22, 5, 10, "#ad7954");
      r(1, -22, 5, 10, "#976446");
      r(-8, -24, 5, 4, "#866044");
      r(3, -24, 5, 4, "#bb8b61");
      r(-5, -20, 10, 1, "#6e503c");
      r(-5, -15, 10, 1, "#6e503c");
      r(-2, -18, 4, 3, "#d9b36a");
      r(-1, -17, 2, 1, "#6d5740");
    } else if (look.armor === "moonweave") {
      r(-7, -24, 14, 14, "#405e68");
      r(-6, -23, 5, 12, "#668d8d");
      r(1, -23, 5, 12, "#51797c");
      r(-8, -24, 4, 5, "#a5c0aa");
      r(4, -24, 4, 5, "#a5c0aa");
      r(-7, -11, 5, 8 + stride * 0.3, "#4c7479");
      r(2, -11, 5, 8 - stride * 0.3, "#60868a");
      r(-6, -5 + stride * 0.3, 4, 1, "#c8cfac");
      r(2, -5 - stride * 0.3, 4, 1, "#c8cfac");
      r(-1, -22, 2, 10, "#d7bd7e");
    }
    r(-7, -12, 14, 2, "#65503a");
    r(-1, -12, 3, 2, "#e2c180");
    const reach = pose === "attack" ? Math.sin(frame3 / 7 * Math.PI) * 7 : pose === "shoot" ? 5 : 0;
    for (const [x, sign] of [[-10, -1], [7, 1]]) {
      const y = -22 + stride * sign * 0.5 - (sign === 1 ? reach : pose === "shoot" ? 4 : 0);
      r(x, y, 4, 9, outline);
      r(x + 1, y + 1, 3, 5, shirt);
      r(x + 1, y + 6, 3, 5, skinShadow);
      r(x + 1, y + 6, 2, 4, skinLight);
    }
    r(-5, -22, 1, 4, "#e0c78c");
    r(-4, -18, 1, 4, "#e0c78c");
    r(-3, -14, 1, 4, "#e0c78c");
    r(-10, -11, 7, 8, outline);
    r(-9, -10, 6, 6, "#bb9960");
    r(-8, -9, 4, 2, "#dfc384");
    r(-7, -6, 1, 2, "#846e43");
    if (look.charm) {
      const x = back ? 6 : 0;
      r(x, -21, 1, 6, "#e9d398");
      r(x - 2, -17, 5, 5, "#a88b4e");
      r(x - 1, -16, 3, 3, look.charm === 3 ? "#ffecae" : look.charm === 2 ? "#8cc6ad" : "#deb46a");
      if (look.charm > 1) {
        r(x - 4, -15, 2, 1, "#ead08e");
        r(x + 3, -15, 2, 1, "#ead08e");
      }
    }
    r(-7, -41, 14, 15, outline);
    r(-6, -40, 12, 13, skinShadow);
    r(-5, -39, 10, 11, skin);
    r(-4, -38, 4, 7, skinLight);
    r(-8, -35, 2, 5, skinShadow);
    r(6, -35, 2, 5, skin);
    r(-7, -42, 14, 6, hair);
    r(-6, -41, 11, 2, hairLight);
    if (back) {
      r(-6, -39, 12, 12, hair);
      r(-5, -37, 2, 8, hairLight);
      r(2, -40, 2, 8, hairLight);
      r(-4, -28, 8, 2, hair);
    } else {
      const blink = pose === "idle" && frame3 === 7, eye = blink ? 1 : 2;
      if (!side) {
        r(-4, -34, 2, eye, "#344033");
        r(3, -34, 2, eye, "#344033");
        if (!blink) {
          r(-4, -34, 1, 1, "#faf1d5");
          r(3, -34, 1, 1, "#faf1d5");
        }
        r(-5, -31, 2, 1, shade(skin, -8));
      } else {
        r(3, -34, 2, eye, "#344033");
        r(6, -33, 2, 3, skinLight);
        r(-6, -39, 4, 10, hair);
      }
      r(0, -32, 1, 2, skinShadow);
      r(0, -29, 3, 1, "#9c6d50");
      r(-5, -39, 2, 6, hair);
      if (style === "crop") r(2, -40, 5, 3, hairLight);
      if (style === "bob" || style === "long") {
        r(-7, -38, 3, 12, hair);
        r(5, -38, 3, 12, hair);
        r(-6, -34, 1, 7, hairLight);
      }
    }
    if (look.hat === "salakot") {
      r(-12, -41, 25, 4, "#8b7449");
      r(-11, -42, 23, 3, "#d4b77b");
      r(-8, -46, 17, 5, "#e6cd95");
      r(-4, -49, 9, 4, "#f0dbac");
      r(-1, -51, 3, 3, "#b99b63");
      r(-9, -42, 19, 1, "#fff0c6");
      for (let i = -5; i < 7; i += 4) r(i, -45, 1, 3, "#c0a16b");
    }
    if (look.hat === "bandana") {
      r(-7, -41, 14, 4, "#b85e4c");
      r(-5, -40, 10, 1, "#e7a37b");
      r(-10, -39, 4, 4, "#975443");
      r(-12, -36 + stride * 0.25, 4, 5, "#cb7759");
      r(-11, -33 + stride * 0.25, 2, 4, "#dc9870");
    }
    if (look.hat === "rattan") {
      r(-9, -42, 18, 4, "#8e774c");
      r(-7, -47, 14, 7, "#cbb67b");
      r(-4, -49, 8, 3, "#e2d197");
      for (let y = -45; y < -40; y += 2) for (let x = -6; x < 7; x += 3) r(x, y, 1, 1, "#a68f5d");
      r(-9, -40, 3, 7, "#b6a36d");
      r(6, -40, 3, 7, "#b6a36d");
    }
    if (look.armed) {
      const weapon = weaponInfo(look.weapon);
      ctx2.save();
      if (pose === "attack") {
        ctx2.translate(1, -20);
        ctx2.rotate((dir === "up" ? -Math.PI / 2 : dir === "down" ? Math.PI / 2 : 0) - 0.85 + frame3 / 7 * 1.7);
        ctx2.translate(0, 20);
      }
      if (weapon.kind === "slingshot") {
        r(10, -13, 3, 13, "#987242");
        r(7, -23, 3, 12, weapon.color);
        r(15, -23, 3, 12, weapon.color);
        r(9, -22, 8, 1, "#f0deab");
        if (pose === "shoot") r(9, -23 + Math.sin(frame3 / 7 * Math.PI) * 4, 7, 1, "#fbe8be");
      } else if (weapon.kind === "blade") {
        r(11, -30, 5, 25, outline);
        r(12, -29, 4, 23, weapon.color);
        r(13, -32, 2, 5, "#eef0cd");
        r(10, -8, 8, 2, "#d9b66c");
        r(12, -5, 3, 7, "#9b7047");
        r(12, -28, 1, 18, "#f4f4da");
      } else if (weapon.kind === "spear") {
        r(12, -41, 2, 46, "#bca26e");
        r(10, -45, 6, 8, weapon.color);
        r(12, -49, 2, 5, "#edf1d1");
        r(11, -35, 4, 3, "#8a6844");
      } else {
        r(11, -33, 4, 37, outline);
        r(12, -32, 3, 35, weapon.color);
        r(12, -31, 1, 32, "#eed29c");
        if (look.wrap) {
          r(11, -15, 5, 8, ["", "#b66f52", "#4e9188", "#b89758"][look.wrap]);
          for (let i = 0; i < look.wrap; i++) r(12, -27 + i * 4, 3, 1, "#896644");
        }
        if (look.wrap === 3) {
          r(11, -34, 5, 2, "#ffe3a0");
          r(11, 2, 5, 2, "#ffe3a0");
        }
      }
      ctx2.restore();
    }
    ctx2.restore();
  }
  function paintSprite(target2, x, y, look, dir, pose, phase, scale) {
    const key2 = JSON.stringify([look, dir, pose]);
    let sheet = sheets.get(key2);
    if (!sheet) {
      sheet = document.createElement("canvas");
      sheet.width = TILE_W * FRAMES;
      sheet.height = TILE_H;
      const ctx2 = sheet.getContext("2d");
      for (let frame4 = 0; frame4 < FRAMES; frame4++) {
        ctx2.save();
        ctx2.translate(frame4 * TILE_W, 0);
        drawFrame(ctx2, look, dir, pose, frame4);
        ctx2.restore();
      }
      if (sheets.size >= 128) sheets.delete(sheets.keys().next().value);
      sheets.set(key2, sheet);
    }
    const frame3 = (Math.floor(phase) % FRAMES + FRAMES) % FRAMES;
    target2.imageSmoothingEnabled = false;
    target2.drawImage(sheet, frame3 * TILE_W, 0, TILE_W, TILE_H, Math.round(x - 40 * scale), Math.round(y - 59 * scale), TILE_W * scale, TILE_H * scale);
  }

  // src/browser/minimap.ts
  var canvas = canvasElement("minimap-canvas");
  var map = context2d(canvas);
  var terrain = document.createElement("canvas");
  terrain.width = 256;
  terrain.height = 192;
  var ink = context2d(terrain);
  var terrainKey = "";
  var lastDraw = -Infinity;
  function drawMinimap(state3, camera2, width, height, now) {
    const key2 = JSON.stringify([state3.area, state3.stage, state3.unlocked, state3.chests[state3.stage]]);
    if (key2 === terrainKey && now - lastDraw < 80) return;
    lastDraw = now;
    const outside = state3.area === "field", origin = outside ? regionOrigin(state3.stage) : { x: 0, y: 0 }, size = bounds(state3), sx = 256 / size.width * (outside ? 2 : 1), sy = 192 / size.height * (outside ? 2 : 1);
    const position = (p2) => ({ x: Math.max(4, Math.min(252, (p2.x - origin.x) * sx)), y: Math.max(4, Math.min(188, (p2.y - origin.y) * sy)) });
    if (key2 !== terrainKey) {
      terrainKey = key2;
      if (!outside) {
        ink.fillStyle = "#745b40";
        ink.fillRect(0, 0, 256, 192);
        ink.fillStyle = "#9b7950";
        ink.fillRect(48 * sx, 84 * sy, 672 * sx, 396 * sy);
        ink.fillStyle = "#a76d50";
        ink.fillRect(202 * sx, 208 * sy, 364 * sx, 216 * sy);
        ink.fillStyle = "#443b30";
        for (const f of tavernFurniture) ink.fillRect(f.x * sx, f.y * sy, f.w * sx, f.h * sy);
        ink.fillStyle = "#e3c387";
        for (const c of companions) {
          ink.beginPath();
          ink.arc(c.x * sx, c.y * sy, 3, 0, Math.PI * 2);
          ink.fill();
        }
        ink.fillStyle = "#9fd0af";
        ink.fillRect(354 * sx, 452 * sy, 60 * sx, 20 * sy);
      } else {
        ink.fillStyle = ["#466b46", "#747557", "#42675b", "#386d68"][state3.stage];
        ink.fillRect(0, 0, 256, 192);
        ink.fillStyle = "#a9b88244";
        for (const tree of stageTrees(state3)) {
          const p2 = position(tree);
          ink.fillRect(p2.x, p2.y, 2, 2);
        }
        ink.fillStyle = "#729f9a";
        ink.fillRect(0, 458 * sy, 256, 47 * sy);
        if (state3.stage === 3) ink.fillRect(0, 458 * sy, 960 * sx, 142 * sy);
        ink.strokeStyle = "#c2af78";
        ink.lineWidth = 2;
        ink.beginPath();
        ink.moveTo(455 * sx, 280 * sy);
        ink.lineTo(455 * sx, 192);
        ink.moveTo(0, 735 * sy);
        ink.lineTo(256, 735 * sy);
        ink.moveTo(1370 * sx, 130 * sy);
        ink.lineTo(1370 * sx, 192);
        ink.moveTo(455 * sx, 1e3 * sy);
        ink.lineTo(256, 1e3 * sy);
        ink.stroke();
        for (const building of stageBuildings(state3)) {
          const p2 = position(building);
          ink.fillStyle = "#d6c59a";
          ink.fillRect(p2.x - 3, p2.y - 2, 6, 4);
        }
        for (const feature of features(state3)) {
          const p2 = position(feature);
          if (feature.kind === "rest") {
            ink.fillStyle = "#b4d29b";
            ink.beginPath();
            ink.moveTo(p2.x, p2.y - 4);
            ink.lineTo(p2.x + 4, p2.y + 3);
            ink.lineTo(p2.x - 4, p2.y + 3);
            ink.fill();
          }
          if (feature.kind === "chest") {
            ink.fillStyle = "#e4be68";
            ink.fillRect(p2.x - 2, p2.y - 2, 4, 4);
          }
          if (feature.kind === "gate") {
            const locked = (feature.destination ?? 0) > state3.unlocked;
            ink.fillStyle = locked ? "#a5a49b" : "#8ed3c0";
            ink.fillRect(p2.x - 3, p2.y - 2, 6, 5);
            if (locked) {
              ink.strokeStyle = "#a5a49b";
              ink.lineWidth = 1;
              ink.strokeRect(p2.x - 2, p2.y - 5, 4, 4);
            } else {
              ink.fillStyle = "#244e44";
              ink.fillRect(p2.x - 1, p2.y - 1, 2, 2);
            }
          }
        }
        for (const npc2 of stageNpcs(state3)) {
          const p2 = position(npc2);
          ink.fillStyle = "#f2d594";
          ink.beginPath();
          ink.arc(p2.x, p2.y, 2, 0, Math.PI * 2);
          ink.fill();
        }
        if (state3.stage === 0) {
          const p2 = position(TAVERN.entrance);
          ink.fillStyle = "#ffe4a0";
          ink.fillRect(p2.x - 3, p2.y - 2, 6, 5);
          ink.beginPath();
          ink.moveTo(p2.x - 5, p2.y - 2);
          ink.lineTo(p2.x, p2.y - 7);
          ink.lineTo(p2.x + 5, p2.y - 2);
          ink.fill();
        }
      }
      element("minimap-place").textContent = outside ? stageInfo(state3).name : "Bahay Pahinga";
      canvas.setAttribute("aria-label", outside ? "Map of " + stageInfo(state3).name + ". White arrow: you. Gold: villagers and treasure. Green: rest camps. Locks: closed paths." : "Map of Bahay Pahinga. White arrow: you. Gold: companions. Green: exit.");
    }
    map.clearRect(0, 0, 256, 192);
    map.drawImage(terrain, 0, 0);
    map.strokeStyle = "#f6efd077";
    map.lineWidth = 1;
    map.strokeRect((camera2.x - origin.x) * sx, (camera2.y - origin.y) * sy, width * sx, height * sy);
    const p = position(state3.player);
    map.save();
    map.translate(p.x, p.y);
    map.rotate({ up: 0, right: Math.PI / 2, down: Math.PI, left: -Math.PI / 2 }[state3.player.dir]);
    map.fillStyle = "#243e35";
    map.beginPath();
    map.arc(0, 0, 6, 0, Math.PI * 2);
    map.fill();
    map.fillStyle = "#fff4cb";
    map.beginPath();
    map.moveTo(0, -5);
    map.lineTo(4, 4);
    map.lineTo(0, 2);
    map.lineTo(-4, 4);
    map.closePath();
    map.fill();
    map.restore();
    map.font = "bold 9px monospace";
    map.fillStyle = "#f4e6ba";
    map.fillText("N", 6, 12);
  }

  // src/browser/renderer.ts
  var canvas2 = canvasElement("game");
  var out = context2d(canvas2);
  var world = document.createElement("canvas");
  var ctx = context2d(world);
  var lastFootstep = -1;
  var W = 640;
  var H = 360;
  var camera = { x: 72, y: 50 };
  var state2 = create();
  var last2 = performance.now();
  var clock = 0;
  var lastEvent2 = 0;
  var portraitKey = "";
  var pointer = null;
  var lastStage2 = "";
  var arrivalFade = 0;
  var particles = [];
  var floaters = [];
  var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function rect(x, y, w, h, c) {
    ctx.fillStyle = c;
    ctx.fillRect(Math.round(x), Math.round(y), w, h);
  }
  function oval(x, y, rx, ry, c) {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  function line(points, color, width = 1) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    points.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
    ctx.stroke();
  }
  var resize = () => {
    const box = canvas2.getBoundingClientRect();
    W = Math.max(280, Math.min(720, Math.round(box.width / 1.25)));
    H = Math.max(160, Math.round(W * box.height / box.width));
    world.width = W;
    world.height = H;
    canvas2.width = W * 2;
    canvas2.height = H * 2;
  };
  new ResizeObserver(resize).observe(canvas2);
  resize();
  canvas2.addEventListener("pointerdown", (event) => {
    const box = canvas2.getBoundingClientRect(), x = (event.clientX - box.left) / box.width * W + camera.x, y = (event.clientY - box.top) / box.height * H + camera.y;
    if (state2.area === "tavern") {
      const recruit = companions.find((c) => c.id !== state2.character && Math.abs(x - c.x) < 22 && y > c.y - 78 && y < c.y + 18);
      if (recruit) {
        action2("customize", { character: recruit.id });
        canvas2.focus();
        return;
      }
    }
    if (!state2.transition && !blocked(x, y, state2)) {
      setTarget(x, y);
      pointer = { x, y, life: 0.7 };
    }
  });
  var seed = 417;
  var rng = () => {
    seed = seed * 16807 % 2147483647;
    return seed / 2147483647;
  };
  var grass = Array.from({ length: 2e3 }, () => ({ x: rng() * 960, y: 90 + rng() * 510, c: Math.floor(rng() * 4), flower: rng() > 0.97 }));
  function ground() {
    if (state2.stage > 0) {
      regionalGround();
      return;
    }
    rect(0, 0, 960, 600, "#83a760");
    rect(0, 0, 960, 83, "#b9d5ae");
    for (let i = 0; i < 9; i++) {
      ctx.fillStyle = i % 2 ? "#94b592" : "#9dc39d";
      ctx.beginPath();
      ctx.moveTo(i * 140 - 50, 90);
      ctx.lineTo(i * 140 + 55, 9 + i * 17 % 38);
      ctx.lineTo(i * 140 + 170, 90);
      ctx.fill();
    }
    rect(0, 70, 960, 22, "#a8c799");
    rect(94, 252, 580, 39, "#d4bf88");
    rect(352, 145, 36, 180, "#d4bf88");
    rect(130, 188, 25, 80, "#d4bf88");
    rect(594, 199, 31, 149, "#d4bf88");
    rect(198, 345, 665, 51, "#ceb780");
    rect(425, 280, 64, 320, "#cdb886");
    rect(310, 270, 220, 26, "#dcc997");
    for (const g of grass) {
      if (g.x < camera.x - 5 || g.x > camera.x + W + 5 || g.y < camera.y - 5 || g.y > camera.y + H + 5) continue;
      const path = g.y > 252 && g.y < 291 && g.x > 94 && g.x < 674 || g.y > 345 && g.y < 396 && g.x > 198 && g.x < 863 || g.x > 425 && g.x < 489 && g.y > 280;
      const color = path ? ["#c4ae79", "#e0ca97"][g.c % 2] : ["#73994f", "#91b26c", "#a1bc74", "#7a9f56"][g.c];
      rect(g.x, g.y, 2, 1, color);
      if (!path && g.c === 0) rect(g.x + 1, g.y - 2, 1, 2, color);
      if (g.flower && !path && g.y < 445) {
        rect(g.x, g.y - 2, 1, 3, "#67874b");
        rect(g.x - 1, g.y - 4, 3, 2, g.c % 2 ? "#f4e6b7" : "#d8cf9f");
      }
    }
    rect(675, 212, 176, 122, "#6f9766");
    for (let j = 0; j < 4; j++) {
      rect(681, 219 + j * 28, 163, 22, j % 2 ? "#8aac6a" : "#91af72");
      rect(680, 241 + j * 28, 166, 3, "#b5b57c");
      for (let i = 0; i < 16; i++) {
        const x = 685 + i * 10, y = 227 + j * 28;
        rect(x, y, 1, 8, "#547a43");
        rect(x - 2, y + 2, 2, 1, "#bad084");
        rect(x + 1, y + 4, 2, 1, "#bdd488");
        rect(x + 3, y + 10, 4, 1, "#a8c49a");
      }
    }
    rect(0, 451, 960, 7, "#b7bb84");
    rect(0, 458, 960, 46, "#6fa7a1");
    rect(0, 463, 960, 34, "#78b1aa");
    rect(0, 504, 960, 7, "#b8bc86");
    for (let i = 0; i < 70; i++) {
      const x = i * 15;
      rect(x, 447, 1, 10, "#597e4a");
      rect(x + 2, 449, 1, 7, "#96b478");
      rect(x, 509, 2, 4, "#698d50");
    }
    rect(423, 449, 68, 62, "#8b7351");
    for (let j = 0; j < 9; j++) {
      rect(425, 451 + j * 7, 64, 5, "#c3a773");
      rect(429, 451 + j * 7, 54, 1, "#d6bd8e");
    }
    rect(423, 444, 3, 68, "#765b40");
    rect(489, 444, 3, 68, "#765b40");
    for (let j = 0; j < 4; j++) {
      rect(420, 446 + j * 21, 6, 6, "#8c6e4b");
      rect(488, 446 + j * 21, 6, 6, "#8c6e4b");
    }
    for (let i = 0; i < 5; i++) rect(358 + i % 2 * 5, 199 + i * 9, 13, 4, "#c3b282");
    for (let i = 0; i < 15; i++) {
      rect(84 + i * 12, 213, 3, 25, "#b49d66");
      rect(82 + i * 12, 214, 6, 3, "#ddc38a");
    }
    rect(83, 220, 173, 3, "#bca26e");
    rect(83, 231, 173, 2, "#a78b5d");
    line([[197, 93], [285, 116], [371, 82], [494, 119], [612, 105]], "#6e7350");
    const flags = ["#e0946e", "#e9c578", "#88a99b", "#b69dba"];
    for (let i = 0; i < 22; i++) {
      const x = 203 + i * 18, y = x < 285 ? 95 + (x - 203) * 0.25 : x < 371 ? 116 - (x - 285) * 0.4 : x < 494 ? 83 + (x - 371) * 0.29 : 119 - (x - 494) * 0.12;
      ctx.fillStyle = flags[i % 4];
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 10, y + 2);
      ctx.lineTo(x + 5, y + 13);
      ctx.fill();
    }
  }
  function wildGround() {
    const base = ["#83a760", "#9fa57e", "#78956c", "#709e83"][state2.stage];
    rect(0, 0, REGION.width, REGION.height, base);
    const path = state2.stage === 1 ? "#c5baa0" : "#b9ad81";
    rect(425, 570, 64, REGION.height - 570, path);
    rect(0, 713, REGION.width, 45, path);
    rect(1340, 130, 60, REGION.height - 130, path);
    rect(455, 980, REGION.width - 455, 35, path);
    rect(850, 344, 550, 45, path);
    for (let i = 0; i < 5400; i++) {
      const x = i * 173 % 3060, y = 100 + i * 127 % 2190;
      if (x < 960 && y < 600 || x < camera.x - 5 || x > camera.x + W + 5 || y < camera.y - 5 || y > camera.y + H + 5) continue;
      if (Math.abs(y - 735) < 25 || Math.abs(x - 455) < 33 || Math.abs(x - 1370) < 32 || Math.abs(y - 997) < 19) continue;
      rect(x, y, 2, 1, i % 3 ? "#628b5a" : "#abc186");
      if (i % 13 === 0) {
        rect(x, y - 3, 1, 3, "#567a4e");
        rect(x - 1, y - 4, 3, 2, "#d3cba1");
      }
    }
    rect(960, 451, REGION.width - 960, 7, "#b4b88a");
    rect(960, 458, REGION.width - 960, 46, "#78aaa4");
    rect(960, 504, REGION.width - 960, 7, "#b4b88a");
    rect(1338, 446, 65, 67, "#806d50");
    for (let i = 0; i < 9; i++) rect(1340, 449 + i * 7, 60, 5, "#c9b386");
    rect(1337, 444, 3, 73, "#78644b");
    rect(1401, 444, 3, 73, "#78644b");
    const signs = state2.stage === 0 ? [{ x: 820, y: 735, label: "HERITAGE \u2192" }, { x: 455, y: 1220, label: "TERRACES \u2193" }] : state2.stage === 1 ? [{ x: 455, y: 1380, label: "LAKESIDE \u2193" }, { x: 2350, y: 735, label: "WILDS \u2192" }] : state2.stage === 2 ? [{ x: 2200, y: 735, label: "LAKESIDE \u2192" }, { x: 455, y: 990, label: "BARRIO \u2191" }] : [{ x: 455, y: 1100, label: "HERITAGE \u2191" }, { x: 2100, y: 735, label: "WILDS \u2192" }];
    for (const sign of signs) {
      rect(sign.x - 2, sign.y - 32, 4, 33, "#786548");
      rect(sign.x - 34, sign.y - 34, 68, 17, "#bfa36e");
      ctx.font = "6px monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff0c5";
      ctx.fillText(sign.label, sign.x, sign.y - 23);
    }
    for (const camp of camps) {
      oval(camp.x, camp.y, 32, 15, "#b9ae80");
      for (let i = 0; i < 7; i++) {
        const angle = i * Math.PI * 2 / 7;
        oval(camp.x + Math.cos(angle) * 13, camp.y + Math.sin(angle) * 7, 4, 3, "#7d7a64");
      }
      rect(camp.x - 7, camp.y - 2, 14, 3, "#796041");
      ctx.fillStyle = "#e4bb70";
      ctx.beginPath();
      ctx.moveTo(camp.x - 6, camp.y - 4);
      ctx.lineTo(camp.x + Math.sin(clock * 9) * 3, camp.y - 24);
      ctx.lineTo(camp.x + 7, camp.y - 4);
      ctx.fill();
      oval(camp.x, camp.y - 8, 3, 6, "#f7d790");
    }
  }
  function tavernOutside() {
    const x = 392, y = 650;
    oval(x, y + 43, 115, 20, "#294a3744");
    rect(x - 94, y - 32, 188, 70, "#ab8759");
    for (let i = 0; i < 24; i++) rect(x - 92 + i * 8, y - 32, 2, 70, "#c1a16e");
    rect(x - 98, y + 28, 196, 9, "#7f6344");
    for (let i = 0; i < 11; i++) {
      const width = 78 + i * 15;
      rect(x - width / 2, y - 102 + i * 6, width, 7, ["#8a624d", "#a37653", "#b78b5f"][i % 3]);
    }
    rect(x - 117, y - 36, 234, 6, "#74563f");
    rect(x - 19, y - 16, 38, 54, "#4d4637");
    rect(x - 14, y - 13, 28, 51, "#d7b77a");
    rect(x - 11, y - 10, 22, 45, "#6c5540");
    for (const side of [-1, 1]) {
      rect(x + side * 59 - 15, y - 14, 30, 26, "#6e5d42");
      rect(x + side * 59 - 12, y - 11, 24, 20, "#efce88");
      rect(x + side * 59, y - 11, 2, 20, "#927347");
      rect(x + side * 59 - 12, y - 2, 24, 2, "#927347");
    }
    rect(x - 65, y - 51, 130, 18, "#e3c68a");
    ctx.font = "bold 8px monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "#584932";
    ctx.fillText("BAHAY PAHINGA", x, y - 39);
    for (let i = 0; i < 4; i++) rect(x - 24 - i * 4, y + 39 + i * 5, 48 + i * 8, 4, "#bba06f");
    ctx.fillStyle = "#fff0b4";
    ctx.font = "9px monospace";
    ctx.fillText("\u2302", x, y - 119 + Math.sin(clock * 2) * 2);
  }
  function tavernGround() {
    rect(0, 0, 768, 512, "#302b2e");
    rect(44, 81, 680, 399, "#4e3b32");
    rect(56, 95, 656, 373, "#96754f");
    for (let j = 0; j < 24; j++) {
      rect(57, 99 + j * 15, 654, 1, "#b18c5b");
      for (let i = 0; i < 7; i++) rect(58 + i * 103 + j % 2 * 50, 100 + j * 15, 1, 14, "#70553c");
    }
    rect(48, 84, 672, 80, "#67513b");
    for (let i = 0; i < 34; i++) rect(52 + i * 20, 88, 3, 72, "#8e704a");
    rect(48, 152, 672, 13, "#4b3a2e");
    for (const x of [105, 650]) {
      rect(x - 22, 101, 44, 39, "#3b4c4a");
      rect(x - 18, 105, 36, 31, "#91a6a0");
      rect(x - 1, 104, 3, 33, "#b69967");
      rect(x - 19, 119, 38, 3, "#b69967");
    }
    rect(245, 100, 278, 21, "#d6b77a");
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "#59432e";
    ctx.fillText("BAHAY PAHINGA", 384, 115);
    rect(202, 208, 364, 216, "#8b4b42");
    rect(208, 214, 352, 204, "#b87952");
    for (let j = 0; j < 11; j++) {
      rect(211, 218 + j * 18, 346, 2, "#d9ae70");
      for (let i = 0; i < 20; i++) rect(214 + i * 17, 219 + j * 18, 3, 6, "#8f5744");
    }
    rect(214, 222, 340, 192, "#9c6348");
    rect(194, 131, 380, 29, "#55402f");
    rect(187, 126, 394, 9, "#d4ad6d");
    for (let i = 0; i < 8; i++) {
      rect(211 + i * 47, 133, 2, 23, "#a98655");
      oval(215 + i * 43, 123, 5, 6, i % 2 ? "#a2a27a" : "#c18d61");
      rect(212 + i * 43, 116, 6, 3, "#e1c18a");
    }
    for (const x of [153, 602]) {
      rect(x - 12, 99, 24, 37, "#c49d65");
      for (let i = 0; i < 4; i++) rect(x - 10, 103 + i * 8, 20, 3, i % 2 ? "#905b46" : "#e4c17f");
    }
    for (const table of [tavernFurniture[1], tavernFurniture[2]]) {
      rect(table.x + 7, table.y + 22, 7, 33, "#5a402f");
      rect(table.x + table.w - 15, table.y + 22, 7, 33, "#5a402f");
      rect(table.x - 4, table.y - 4, table.w + 8, 39, "#b18a53");
      rect(table.x, table.y, table.w, 31, "#c9a36a");
      for (let i = 0; i < 3; i++) {
        oval(table.x + 20 + i * 30, table.y + 12, 7, 4, "#e1c996");
        rect(table.x + 16 + i * 30, table.y + 8, 4, 6, "#7f6948");
      }
      rect(table.x + 26, table.y + 45, 48, 10, "#8a6640");
    }
    rect(622, 186, 70, 49, "#5a4534");
    rect(625, 187, 64, 43, "#9faba0");
    rect(627, 187, 60, 12, "#e2d3b4");
    rect(627, 201, 60, 26, "#899a88");
    rect(648, 206, 39, 3, "#c7b589");
    rect(52, 380, 27, 57, "#503c2e");
    rect(54, 383, 22, 24, "#8c7260");
    const flicker = Math.sin(clock * 10) * 2;
    oval(65, 398, 8, 12 + flicker, "#da9b54");
    oval(65, 401, 4, 8, "#ffe2a0");
    rect(351, 447, 66, 30, "#5d4732");
    rect(354, 452, 60, 26, "#c4a574");
    ctx.font = "8px monospace";
    ctx.fillStyle = "#ffedb6";
    ctx.fillText("OUT \u2192", 384, 493);
    for (const x of [176, 590]) {
      oval(x, 186, 12, 6, "#3b302888");
      rect(x - 6, 173, 12, 15, "#d6a85e");
      rect(x - 3, 175, 6, 10, "#ffe0a0");
      const glow = ctx.createRadialGradient(x, 180, 2, x, 180, 65);
      glow.addColorStop(0, "#ffd18b33");
      glow.addColorStop(1, "#ffd18b00");
      ctx.fillStyle = glow;
      ctx.fillRect(x - 65, 115, 130, 130);
    }
  }
  function profileSprite(target2, x, y, id, profile, scale, dir = "down", pose = "idle", phase = clock * 4.5) {
    const skin = { natural: characters[id].skin, sunlit: "#d9b385", morena: "#ae7b54", deep: "#80533c" }[profile.skin];
    paintSprite(target2, x, y, { character: id, hat: profile.hat, shirt: colors[profile.outfit], skin, hair: profile.hair, hairColor: profile.hairColor, armor: profile.armor, weapon: profile.weapon, armed: true, sandals: profile.gear.sandals, charm: profile.gear.agimat, wrap: profile.gear.arnis }, dir, pose, phase, scale);
  }
  function companion(c) {
    const selected = state2.character === c.id, profile = characterProfile(state2, c.id);
    oval(c.x, c.y + 4, 24, 8, selected ? "#e5c77788" : "#382d2c55");
    profileSprite(ctx, c.x, c.y, c.id, profile, 1.3);
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = selected ? "#ffe3a0" : "#f2dfb4";
    ctx.fillText((selected ? "\u2713 " : "") + characters[c.id].name, c.x, c.y + 25);
    ctx.font = "7px monospace";
    ctx.fillStyle = "#e1c9a0";
    ctx.fillText(c.role.split(" \xB7 ")[0] + " \xB7 Lv " + Math.min(10, 1 + Math.floor(profile.xp / 100)), c.x, c.y + 38);
  }
  function remoteGuest(peer) {
    oval(peer.x, peer.y + 3, 12, 4, "#82c9bf55");
    const pose = peer.shot > 0 ? "shoot" : peer.swing > 0 ? "attack" : peer.dash > 0 ? "dash" : peer.walking ? "walk" : "idle";
    profileSprite(ctx, peer.x, peer.y, peer.character, peer.look, 1.05, peer.dir, pose, peer.walking ? peer.walkTime * 12 : clock * 4.5);
    ctx.textAlign = "center";
    ctx.font = "7px monospace";
    const label = peer.name + " \xB7 " + characters[peer.character].name;
    ctx.fillStyle = "#24483ddb";
    const width = ctx.measureText(label).width;
    ctx.fillRect(peer.x - width / 2 - 4, peer.y - 72, width + 8, 12);
    ctx.fillStyle = "#d4f0df";
    ctx.fillText(label, peer.x, peer.y - 64);
  }
  function fieldFeature(f) {
    if (f.kind === "chest") {
      rect(f.x - 12, f.y - 10, 24, 16, "#8c6241");
      rect(f.x - 13, f.y - 16, 26, 9, "#c19956");
      rect(f.x - 11, f.y - 13, 22, 2, "#edca83");
      rect(f.x - 3, f.y - 11, 6, 9, "#e4c37c");
      rect(f.x - 1, f.y - 8, 2, 3, "#786049");
      ctx.fillStyle = "#ffe4a0";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("\u2726", f.x, f.y - 24 + Math.sin(clock * 3) * 2);
    }
    if (f.kind === "gate") {
      const locked = (f.destination ?? 0) > state2.unlocked;
      oval(f.x, f.y + 2, 25, 9, locked ? "#62657b55" : "#d4c58155");
      rect(f.x - 3, f.y - 39, 6, 41, "#7f6747");
      rect(f.x - 27, f.y - 38, 54, 18, "#bfa36d");
      ctx.fillStyle = "#f4e2b4";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "center";
      ctx.fillText(locked ? "\u25C7" : "\u2197", f.x, f.y - 25);
      if (Math.hypot(state2.player.x - f.x, state2.player.y - f.y) < 150) {
        ctx.font = "7px monospace";
        ctx.fillText(f.name, f.x, f.y - 52);
      }
    }
  }
  function localAmbient() {
    for (let i = 0; i < 55; i++) {
      const x = (i * 29 + clock * 7) % 960, y = 467 + i * 11 % (state2.stage === 3 ? 120 : 29);
      rect(x, y, 8 + i % 3 * 3, 1, i % 2 ? "#acd1b9" : "#8fc5b4");
    }
    if (state2.stage === 0) {
      rect(425, 451, 64, 58, "#b59a6c");
      for (let i = 0; i < 9; i++) rect(425, 452 + i * 7, 64, 4, "#d4bb87");
      rect(423, 446, 3, 67, "#8d714d");
      rect(489, 446, 3, 67, "#8d714d");
    }
    if (state2.stage === 0 || state2.stage === 2) {
      oval(887, 299, 20, 6, "#4b6a3b33");
      rect(869, 279, 35, 18, "#8c9482");
      rect(900, 279, 13, 13, "#a0a590");
      rect(871, 294, 4, 11, "#7c8775");
      rect(895, 294, 4, 11, "#7c8775");
      line([[903, 279], [899, 272], [894, 274]], "#d3c9a7", 2);
      line([[910, 279], [916, 273], [921, 275]], "#d3c9a7", 2);
      rect(909, 284, 1, 2, "#495a47");
      line([[870, 281], [861, 283 + Math.sin(clock * 3) * 3], [858, 290]], "#747f6d", 2);
    }
    if (state2.stage === 0) jeepney();
    else regionalTransport();
  }
  function drawTerrain() {
    const actual = state2, savedCamera = camera;
    for (let stage = 0; stage < 4; stage++) {
      const origin = regionOrigin(stage);
      if (origin.x > savedCamera.x + W || origin.x + REGION.width < savedCamera.x || origin.y > savedCamera.y + H || origin.y + REGION.height < savedCamera.y) continue;
      state2 = { ...actual, stage };
      camera = { x: savedCamera.x - origin.x, y: savedCamera.y - origin.y };
      ctx.save();
      ctx.translate(origin.x, origin.y);
      wildGround();
      ground();
      localAmbient();
      if (stage > actual.unlocked) {
        ctx.fillStyle = "#15262bd9";
        ctx.fillRect(0, 0, REGION.width, REGION.height);
      }
      ctx.restore();
    }
    state2 = actual;
    camera = savedCamera;
  }
  function regionalObject(stage, draw) {
    const actual = state2;
    state2 = { ...actual, stage };
    draw();
    state2 = actual;
  }
  function visible(p, margin = 160) {
    return p.x > camera.x - margin && p.x < camera.x + W + margin && p.y > camera.y - margin && p.y < camera.y + H + margin;
  }
  function house(b) {
    if (state2.stage > 0) {
      regionalHouse(b);
      return;
    }
    const { x, y, w, h } = b, shop = b.type === "store";
    oval(x, y + 36, w * 0.64, 12, "#466b3b35");
    if (!shop) {
      for (let i = -1; i <= 1; i++) {
        rect(x + i * 39 - 3, y + 18, 6, 34, "#876745");
        rect(x + i * 39 - 1, y + 18, 2, 32, "#aa895a");
      }
    }
    rect(x - w / 2, y - h * 0.55, w, h * 0.95, shop ? "#c2b08b" : "#c4ac78");
    rect(x - w / 2, y + 17, w, 4, "#9b8058");
    for (let i = 0; i < w / 7; i++) {
      rect(x - w / 2 + i * 7, y - h * 0.55, 1, h * 0.95, shop ? "#ad9975" : "#aa915f");
      rect(x - w / 2 + i * 7 + 2, y - h * 0.55, 1, h * 0.95, "#d6be8b");
    }
    const doorX = shop ? x - 35 : x - 5;
    rect(doorX, y - 17, 22, 44, "#69583e");
    rect(doorX + 3, y - 15, 16, 39, "#87734e");
    rect(doorX + 15, y + 6, 2, 3, "#e6c67e");
    rect(x - 42, y - 26, 25, 23, "#6f8b76");
    rect(x - 41, y - 25, 10, 20, "#a6bca1");
    rect(x - 28, y - 25, 10, 20, "#b8c6a4");
    rect(x - 31, y - 27, 3, 25, "#927851");
    rect(x - 43, y - 16, 27, 2, "#9b8056");
    if (!shop) {
      rect(x + 31, y - 27, 18, 23, "#7e8e70");
      for (let j = 0; j < 4; j++) rect(x + 32, y - 25 + j * 5, 16, 2, "#bfaf7f");
    }
    const roof = shop ? ["#ba7864", "#ce947a", "#d8ac88"] : ["#9a8652", "#b6a06a", "#c7b37d"];
    for (let j = 0; j < 10; j++) {
      const rw = w * 0.48 + j * 9;
      rect(x - rw / 2, y - h - 10 + j * 5, rw, 6, roof[j % 3]);
      if (!shop) for (let k = 0; k < rw / 10; k++) rect(x - rw / 2 + k * 10, y - h - 7 + j * 5, 1, 4, "#8d7b4d55");
    }
    rect(x - w * 0.78, y - h + 38, w * 1.56, 5, shop ? "#915f50" : "#9c8451");
    if (shop) {
      rect(x - 59, y - 10, 118, 7, "#dbb76c");
      for (let i = 0; i < 12; i++) rect(x - 59 + i * 10, y - 10, 5, 7, "#7c9b7e");
      rect(x - 13, y - 27, 62, 33, "#6b7658");
      rect(x - 10, y - 24, 57, 21, "#9fb08a");
      for (let i = 0; i < 5; i++) {
        rect(x - 8 + i * 11, y - 20, 5, 8, ["#d9b36b", "#b57e67", "#d3d2a3"][i % 3]);
        rect(x - 7 + i * 11, y - 22, 3, 2, "#e3d8a9");
      }
      rect(x - 11, y + 4, 62, 6, "#a18a5f");
      rect(x - 48, y - 61, 96, 16, "#f2dfad");
      ctx.fillStyle = "#695c42";
      ctx.font = "bold 6px monospace";
      ctx.textAlign = "center";
      ctx.fillText("NENA\u2019S SARI-SARI", x, y - 51);
    } else {
      for (let i = 0; i < 3; i++) rect(doorX - 4 - i * 3, y + 25 + i * 6, 31 + i * 6, 5, ["#bb9e6b", "#a68a5c", "#92794e"][i]);
      rect(x - 46, y + 24, 13, 8, "#936e4e");
      rect(x - 44, y + 14, 2, 13, "#547846");
      rect(x - 50, y + 13, 14, 5, "#83a260");
    }
  }
  function regionalGround() {
    const stage = state2.stage, base = stage === 1 ? "#b4b28b" : stage === 2 ? "#78956c" : "#709e83";
    rect(0, 0, 960, 600, base);
    rect(0, 0, 960, 87, stage === 1 ? "#d9d8bc" : stage === 2 ? "#c5d3cf" : "#bcd6cf");
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = stage === 2 ? i % 2 ? "#819a91" : "#92aaa1" : stage === 3 ? "#8fb7ac" : "#b5c2a2";
      ctx.beginPath();
      ctx.moveTo(i * 150 - 80, 104);
      ctx.lineTo(i * 150 + 55, stage === 2 ? i % 2 * 28 : 45 + i % 3 * 10);
      ctx.lineTo(i * 150 + 190, 104);
      ctx.fill();
    }
    if (stage === 2) {
      for (let j = 0; j < 6; j++) {
        const yy = 90 + j * 23;
        rect(j * 9, yy, 960 - j * 18, 20, j % 2 ? "#86a579" : "#94af7d");
        rect(j * 9, yy + 17, 960 - j * 18, 4, "#657f6c");
        for (let i = 0; i < 38; i++) {
          rect(i * 26 + j * 2, yy + 9, 17, 1, "#bbcd9e");
          rect(i * 26 + j * 2 + 3, yy + 5, 1, 4, "#547d4d");
        }
      }
    }
    const path = stage === 1 ? "#d1c3a7" : stage === 2 ? "#b4b09a" : "#c2b78d";
    rect(94, 252, 580, 39, path);
    rect(352, 145, 36, 180, path);
    rect(130, 188, 25, 80, path);
    rect(594, 199, 31, 149, path);
    rect(198, 345, 665, 51, path);
    rect(425, 280, 64, 320, path);
    rect(310, 270, 220, 26, path);
    if (stage === 1) {
      rect(42, 212, 878, 225, "#b9b29b");
      for (let j = 0; j < 19; j++) for (let i = 0; i < 42; i++) {
        const x = 42 + i * 21 + j % 2 * 10, y = 214 + j * 12;
        rect(x, y, 19, 10, ["#cbc0a5", "#d4c9b1", "#bdb39c"][(i + j) % 3]);
        rect(x + 2, y + 1, 14, 1, "#e0d4bb");
      }
    }
    for (const g of grass) {
      if (g.x < camera.x - 5 || g.x > camera.x + W + 5 || g.y < camera.y - 5 || g.y > camera.y + H + 5) continue;
      if (g.y > 445 || stage === 1 && g.y > 210) continue;
      rect(g.x, g.y, 2, 1, stage === 2 ? ["#9db58b", "#668966"][g.c % 2] : stage === 3 ? ["#8bb38d", "#5a906e"][g.c % 2] : "#a1ae84");
    }
    if (stage === 2) {
      for (let j = 0; j < 5; j++) {
        rect(669 + j * 5, 215 + j * 25, 184 - j * 10, 21, j % 2 ? "#9cb27f" : "#a7be8b");
        rect(667 + j * 5, 233 + j * 25, 188 - j * 10, 5, "#6c8573");
        for (let i = 0; i < 15 - j; i++) {
          rect(677 + j * 5 + i * 11, 223 + j * 25, 1, 8, "#577f4e");
          rect(675 + j * 5 + i * 11, 225 + j * 25, 5, 1, "#d1d79d");
        }
      }
    }
    if (stage === 3) {
      for (let j = 0; j < 4; j++) {
        rect(680, 223 + j * 24, 161, 18, j % 2 ? "#c4ad78" : "#a48b62");
        for (let i = 0; i < 23; i++) rect(683 + i * 7, 223 + j * 24, 2, 18, j % 2 ? "#9a8060" : "#d4bb86");
      }
      line([[674, 216], [849, 216]], "#466f5d", 2);
    }
    const water = stage === 1 ? "#89a99e" : stage === 2 ? "#8cb7b2" : "#6faaa9";
    rect(0, 451, 960, 7, stage === 1 ? "#a29983" : "#b5bd9b");
    rect(0, 458, 960, stage === 3 ? 142 : 46, water);
    if (stage !== 3) rect(0, 504, 960, 7, "#b7bc9b");
    if (stage === 1) {
      rect(420, 446, 75, 67, "#999e8c");
      for (let j = 0; j < 8; j++) for (let i = 0; i < 5; i++) rect(423 + i * 14, 448 + j * 8, 12, 6, "#ccc7b0");
      rect(420, 443, 4, 72, "#777d70");
      rect(491, 443, 4, 72, "#777d70");
    } else {
      const length = stage === 3 ? 151 : 62;
      rect(423, 449, 69, length, "#816f58");
      for (let j = 0; j < length / 7; j++) rect(425, 451 + j * 7, 64, 5, stage === 2 ? "#b6b18a" : "#cebb8e");
      rect(422, 446, 3, length, "#766b53");
      rect(489, 446, 3, length, "#766b53");
    }
    if (stage === 1) {
      for (const [x, y] of [[275, 251], [510, 250], [860, 391], [94, 393]]) {
        rect(x - 2, y - 43, 4, 43, "#636f64");
        rect(x - 6, y - 52, 12, 10, "#9b9c7e");
        rect(x - 4, y - 50, 8, 7, "#f3d99a");
        rect(x - 7, y - 54, 14, 2, "#6d796a");
        rect(x - 4, y + 1, 8, 3, "#7a8170");
      }
    }
    if (stage !== 2) {
      line([[194, 92], [350, 111], [610, 99]], stage === 3 ? "#526f60" : "#8d8c72");
      for (let i = 0; i < 21; i++) {
        const x = 200 + i * 19, y = 93 + Math.sin(i * 0.14) * 16;
        ctx.fillStyle = ["#cf927a", "#ddb968", "#8eaaa0", "#b5a0ba"][i % 4];
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 10, y + 1);
        ctx.lineTo(x + 5, y + 10);
        ctx.fill();
      }
    }
  }
  function regionalHouse(b) {
    const { x, y, w } = b, stage = state2.stage;
    oval(x, y + 35, w * 0.65, 11, "#435a4533");
    if (stage === 1) {
      rect(x - w / 2, y - 17, w, 56, "#b8aa8e");
      for (let j = 0; j < 6; j++) for (let i = 0; i < w / 18; i++) rect(x - w / 2 + i * 18 + j % 2 * 7, y - 14 + j * 8, 16, 6, j % 2 ? "#cbc0a6" : "#c2b69d");
      rect(x - w / 2 - 3, y - 65, w + 6, 51, "#a89574");
      rect(x - w / 2 - 5, y - 17, w + 10, 4, "#807e68");
      for (let i = 0; i < 4; i++) {
        const wx = x - w / 2 + 10 + i * (w - 15) / 4;
        rect(wx, y - 58, 21, 32, "#6a8079");
        rect(wx + 2, y - 56, 17, 27, "#d0d3b4");
        for (let j = 0; j < 4; j++) {
          rect(wx + 2, y - 54 + j * 7, 17, 1, "#8e9d87");
          rect(wx + 4 + j * 4, y - 56, 1, 27, "#98a58b");
        }
        rect(wx, y - 24, 21, 3, "#7e7862");
        rect(wx + 2, y - 22, 17, 3, "#c7b698");
      }
      rect(x - 14, y + 3, 28, 36, "#817b65");
      ctx.fillStyle = "#5f705f";
      ctx.beginPath();
      ctx.arc(x, y + 4, 14, Math.PI, 0);
      ctx.fill();
      rect(x - 11, y + 3, 22, 33, "#6a7564");
      rect(x - 10, y + 2, 20, 2, "#d5c6a5");
      for (let j = 0; j < 7; j++) {
        const rw = w * 0.55 + j * 12;
        rect(x - rw / 2, y - 102 + j * 5, rw, 6, ["#a57862", "#bd8f72", "#cc9f7f"][j % 3]);
        for (let i = 0; i < rw / 9; i++) rect(x - rw / 2 + i * 9, y - 100 + j * 5, 1, 3, "#946c5755");
      }
      rect(x - w * 0.76, y - 67, w * 1.52, 4, "#8c6e59");
      if (b.x === 610) {
        rect(x - 38, y - 6, 76, 13, "#ede1bf");
        ctx.fillStyle = "#69705b";
        ctx.font = "5px monospace";
        ctx.textAlign = "center";
        ctx.fillText("HERITAGE CRAFTS", x, y + 3);
      }
    } else if (stage === 2) {
      for (const off of [-35, 35]) {
        rect(x + off - 4, y - 8, 8, 51, "#807257");
        rect(x + off - 10, y + 13, 20, 4, "#a39a73");
        rect(x + off - 2, y + 21, 2, 21, "#b5a780");
      }
      rect(x - w * 0.38, y - 51, w * 0.76, 53, "#957e59");
      for (let i = 0; i < w / 9; i++) rect(x - w * 0.38 + i * 7, y - 50, 1, 51, "#b19b71");
      rect(x - w * 0.4, y - 2, w * 0.8, 6, "#74664e");
      rect(x - 9, y - 27, 20, 30, "#5e5f48");
      rect(x - 6, y - 24, 14, 25, "#7c7252");
      for (let j = 0; j < 17; j++) {
        const rw = 9 + j * (w * 1.35 / 17);
        rect(x - rw / 2, y - 117 + j * 4, rw, 5, ["#978b63", "#b2a478", "#c0b086"][j % 3]);
        if (j > 5) for (let i = 0; i < rw / 11; i++) rect(x - rw / 2 + i * 11, y - 115 + j * 4, 1, 3, "#7e785755");
      }
      rect(x - w * 0.73, y - 51, w * 1.46, 5, "#8c805b");
      line([[x - 8, y + 5], [x - 23, y + 44]], "#b8a47a", 3);
      line([[x + 7, y + 5], [x - 8, y + 44]], "#b8a47a", 3);
      for (let j = 0; j < 5; j++) line([[x - 9 - j * 3, y + 10 + j * 7], [x + 5 - j * 3, y + 10 + j * 7]], "#d0bd92", 2);
    } else {
      for (const off of [-w * 0.36, 0, w * 0.36]) {
        rect(x + off - 4, y + 9, 8, 38, "#705c48");
        rect(x + off - 2, y + 9, 2, 36, "#af9368");
      }
      rect(x - w / 2, y - 46, w, 63, "#9b7955");
      for (let j = 0; j < 8; j++) rect(x - w / 2, y - 44 + j * 8, w, 1, "#b89969");
      rect(x - w / 2, y + 12, w, 7, "#756149");
      const torogan = b.type === "torogan";
      for (let j = 0; j < 12; j++) {
        const rw = w * 0.3 + j * (w * 0.12);
        rect(x - rw / 2, y - 112 + j * 5, rw, 6, ["#766c52", "#988760", "#b3a173"][j % 3]);
      }
      rect(x - w * 0.86, y - 53, w * 1.72, 5, "#6e6047");
      for (let i = 0; i < 4; i++) {
        const wx = x - w * 0.42 + i * w * 0.23;
        rect(wx, y - 35, w * 0.16, 21, "#567a71");
        rect(wx + 2, y - 33, w * 0.12, 17, "#91aaa0");
        rect(wx + 3, y - 30, w * 0.1, 1, "#bfc6a0");
      }
      rect(x - 10, y - 14, 21, 30, "#5a6551");
      rect(x - 7, y - 12, 15, 26, "#7b7758");
      if (torogan) {
        for (const side of [-1, 1]) {
          ctx.save();
          ctx.translate(x + side * w * 0.48, y + 8);
          ctx.scale(side, 1);
          ctx.fillStyle = "#b89453";
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(36, -9);
          ctx.lineTo(48, -28);
          ctx.lineTo(39, -35);
          ctx.lineTo(38, -23);
          ctx.lineTo(26, -16);
          ctx.lineTo(6, -12);
          ctx.closePath();
          ctx.fill();
          line([[7, -5], [30, -12], [41, -28]], "#705f42", 2);
          rect(10, -10, 5, 2, "#d4bd7d");
          ctx.restore();
        }
        rect(x - w / 2 + 3, y - 7, w - 6, 6, "#748a65");
        for (let i = 0; i < 12; i++) rect(x - w / 2 + 7 + i * 12, y - 5, 5, 2, "#e0c77e");
      } else {
        rect(x - 29, y - 6, 58, 12, "#d2b382");
        ctx.fillStyle = "#5f6b51";
        ctx.font = "5px monospace";
        ctx.textAlign = "center";
        ctx.fillText("LAKESIDE CRAFTS", x, y + 2);
      }
      for (let j = 0; j < 4; j++) rect(x - 13 - j * 3, y + 18 + j * 6, 27 + j * 6, 4, "#b39c70");
    }
  }
  function highlandTree(t) {
    const { x, y } = t;
    oval(x, y, 20, 6, "#4f715044");
    rect(x - 3, y - 49, 6, 49, "#84785e");
    for (let i = 0; i < 5; i++) {
      const width = 49 - i * 8;
      rect(x - width / 2, y - 27 - i * 12, width, 12, ["#557c65", "#638b6c", "#729b75"][i % 3]);
      rect(x - width / 2 + 2, y - 27 - i * 12, width * 0.4, 2, "#8aac80");
    }
  }
  function regionalTransport() {
    if (state2.stage === 1) {
      const x = 587, y = 366;
      oval(x - 38, y + 13, 34, 7, "#6f765633");
      rect(x - 47, y - 17, 35, 19, "#988263");
      rect(x - 51, y - 22, 43, 6, "#6a7864");
      rect(x - 47, y - 35, 34, 15, "#708574");
      rect(x - 43, y - 33, 26, 10, "#b7c2a2");
      for (const off of [-40, -18]) {
        oval(x + off, y + 4, 8, 8, "#626858");
        oval(x + off, y + 4, 5, 5, "#b7b198");
      }
      line([[x - 9, y - 7], [x + 30, y + 1]], "#b29b73", 2);
      rect(x + 27, y - 13, 31, 13, "#b19371");
      rect(x + 53, y - 25, 9, 18, "#b19371");
      rect(x + 57, y - 30, 11, 10, "#ba9f7d");
      for (const off of [30, 51]) {
        rect(x + off, y - 1, 3, 14, "#7c715a");
        rect(x + off, y + 11 + Math.sin(clock * 3 + off), 5, 3, "#6b6854");
      }
      line([[x + 28, y - 10], [x + 21, y - 16], [x + 18, y - 8]], "#80745b", 2);
      rect(x + 65, y - 27, 1, 2, "#525f4c");
    } else if (state2.stage === 2) {
      const x = 592, y = 366;
      rect(x - 33, y - 8, 65, 12, "#968362");
      rect(x - 30, y - 14, 58, 6, "#b5a37a");
      for (let i = 0; i < 5; i++) rect(x - 26 + i * 12, y - 19, 7, 8, "#c8bb8e");
      for (const off of [-23, 23]) {
        oval(x + off, y + 6, 8, 8, "#5c6e58");
        oval(x + off, y + 6, 5, 5, "#b2b695");
      }
      line([[x + 31, y - 5], [x + 54, y + 2]], "#83785d", 3);
    } else {
      const x = 596, y = 478 + Math.sin(clock * 2) * 2;
      oval(x, y + 7, 57, 5, "#42898444");
      ctx.fillStyle = "#a58c60";
      ctx.beginPath();
      ctx.moveTo(x - 55, y - 6);
      ctx.lineTo(x + 56, y - 6);
      ctx.lineTo(x + 38, y + 10);
      ctx.lineTo(x - 40, y + 10);
      ctx.closePath();
      ctx.fill();
      rect(x - 36, y - 7, 72, 3, "#d5bd8d");
      rect(x - 28, y - 5, 8, 10, "#6a7760");
      rect(x + 20, y - 5, 8, 10, "#6a7760");
      line([[x - 3, y - 15], [x + 19, y + 16]], "#c0ac7f", 3);
    }
  }
  function palm(t) {
    const x = t.x, y = t.y, sway = Math.sin(clock * 0.9 + x) * 2;
    oval(x + 4, y + 1, 24, 7, "#456e3d33");
    line([[x, y], [x - 4, y - 25], [x + 1, y - 58], [x + sway, y - 87]], "#8d7951", 7);
    line([[x + 2, y], [x - 1, y - 30], [x + 3, y - 65], [x + sway + 2, y - 86]], "#b19b65", 2);
    for (let j = 0; j < 6; j++) rect(x - 5, y - j * 12, 8, 1, "#7e6d48");
    const top = y - 88;
    const leaves = [[-39, -4, -17, -19], [-35, 16, -17, -8], [36, -5, 19, -20], [38, 15, 19, -6], [-12, -27, -6, -19], [11, -25, 7, -21]];
    for (const [dx, dy, cx, cy] of leaves) {
      ctx.strokeStyle = "#4d8052";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(x + sway, top);
      ctx.quadraticCurveTo(x + cx + sway, top + cy, x + dx + sway, top + dy);
      ctx.stroke();
      line([[x + sway, top], [x + dx * 0.75 + sway, top + dy * 0.65]], "#7ba063", 2);
    }
    oval(x - 6, top + 7, 4, 5, "#a0a16c");
    oval(x + 2, top + 8, 4, 5, "#b2ad74");
  }
  function mangoTree(t) {
    const x = t.x, y = t.y, sway = Math.round(Math.sin(clock * 0.65 + x * 0.01));
    oval(x + 5, y + 2, 30, 8, "#31583b2e");
    rect(x - 5, y - 47, 10, 48, "#705e41");
    rect(x - 3, y - 45, 6, 44, "#9b8053");
    rect(x + 1, y - 42, 2, 42, "#c2a26b");
    rect(x - 8, y - 1, 17, 3, "#7f734b");
    line([[x - 1, y - 31], [x - 15, y - 49]], "#806b46", 4);
    line([[x + 2, y - 35], [x + 15, y - 56]], "#9b8053", 3);
    ctx.save();
    ctx.translate(sway, 0);
    rect(x - 26, y - 76, 50, 49, "#386447");
    rect(x - 37, y - 61, 74, 29, "#3d714a");
    rect(x - 31, y - 70, 62, 35, "#4d8250");
    rect(x - 22, y - 81, 45, 26, "#608f58");
    rect(x - 11, y - 85, 24, 16, "#729f65");
    rect(x - 36, y - 55, 20, 15, "#50834e");
    rect(x + 20, y - 59, 20, 20, "#47794b");
    rect(x - 24, y - 36, 48, 6, "#3b6b47");
    let leafSeed = (Math.imul(Math.floor(x), 73856093) ^ Math.imul(Math.floor(y), 19349663)) >>> 0;
    const leafRandom = () => {
      leafSeed = Math.imul(leafSeed, 1664525) + 1013904223 >>> 0;
      return leafSeed / 4294967296;
    };
    for (let i = 0; i < 15; i++) {
      const lx = x - 27 + leafRandom() * 56, ly = y - 74 + leafRandom() * 35;
      rect(lx, ly, 5 + i % 3 * 2, 2, i % 3 ? "#83aa6b" : "#a0bc7b");
      if (i % 4 === 0) rect(lx + 2, ly - 2, 3, 1, "#c2d293");
    }
    if (state2.stage === 0) for (let i = 0; i < 4; i++) {
      rect(x - 22 + i * 13, y - 49 + i % 2 * 7, 4, 6, "#edc16b");
      rect(x - 21 + i * 13, y - 49 + i % 2 * 7, 1, 4, "#f9d98a");
    }
    ctx.restore();
  }
  function person(target2, x, y, who, walk, dir, hat, shirt, scale = 1, active = false, preview) {
    const game = active && target2 === ctx, p = state2.player, pose = preview || (game ? p.shot > 0 ? "shoot" : p.swing > 0 ? "attack" : p.dash > 0 ? "dash" : walk ? "walk" : "idle" : walk ? "walk" : "idle");
    const time = preview ? performance.now() / 1e3 : clock, phase = game && pose === "attack" ? (1 - p.swing / 0.32) * 7.99 : game && pose === "shoot" ? (1 - p.shot / 0.22) * 7.99 : pose === "walk" || pose === "dash" ? (game ? p.walkTime : time) * 12 : time * 4.5 + x * 0.01;
    const tone = active ? { sunlit: "#d9b385", morena: "#ae7b54", deep: "#80533c", natural: characters[who].skin }[state2.skin] : characters[who].skin;
    paintSprite(target2, x, y, { character: who, hat, shirt, skin: tone, hair: active ? state2.hair : "natural", hairColor: active ? state2.hairColor : "ink", armor: active ? state2.armor : "linen", weapon: pose === "shoot" ? weaponInfo(state2.weapon).kind === "slingshot" ? state2.weapon : state2.weapons.includes("sunshot") ? "sunshot" : "tirador" : state2.weapon, armed: active, sandals: active ? state2.gear.sandals : 0, charm: active ? state2.gear.agimat : 0, wrap: active ? state2.gear.arnis : 0 }, dir, pose, phase, scale);
  }
  function npc(n) {
    oval(n.x, n.y + 2, 9, 3, "#4b643c44");
    person(ctx, n.x, n.y + Math.sin(clock * 2 + n.x) * 0.25, "isko", false, Math.sin(clock * 0.35 + n.x) > 0.92 ? "left" : "down", "none", n.shirt, 1);
    if (n.id === "lola") {
      rect(n.x - 8, n.y - 42, 17, 6, "#c2b79a");
      rect(n.x + 9, n.y - 40, 5, 5, "#ded4b5");
    }
    const q = currentQuest(state2);
    if (q && q.npc === n.id) {
      ctx.font = "bold 10px monospace";
      ctx.fillStyle = "#fff1b6";
      ctx.textAlign = "center";
      ctx.fillText("!", n.x, n.y - 61 + Math.sin(clock * 3) * 2);
    }
    if (Math.hypot(state2.player.x - n.x, state2.player.y - n.y) < 64) {
      ctx.font = "6px monospace";
      ctx.fillStyle = "#fff0c7";
      ctx.textAlign = "center";
      ctx.fillText(n.name, n.x, n.y - 55);
    }
  }
  function jeepney() {
    const x = 596, y = 365 + Math.sin(clock * 10) * 0.3;
    oval(x, y + 11, 58, 10, "#4e613c44");
    rect(x - 52, y - 31, 94, 40, "#7d9e94");
    rect(x - 59, y - 23, 111, 25, "#d9c794");
    rect(x - 54, y - 33, 92, 7, "#e7dab2");
    rect(x - 49, y - 38, 83, 5, "#63867c");
    rect(x - 53, y - 21, 88, 7, "#c97758");
    for (let i = 0; i < 5; i++) {
      rect(x - 48 + i * 17, y - 30, 13, 12, "#73928a");
      rect(x - 47 + i * 17, y - 29, 10, 8, "#a8c6b0");
    }
    rect(x + 37, y - 26, 19, 25, "#9caf9b");
    rect(x + 41, y - 23, 16, 13, "#b8d4bd");
    rect(x + 47, y - 4, 18, 12, "#d2bb83");
    rect(x + 49, y - 5, 14, 3, "#e6d9a6");
    rect(x + 60, y + 3, 4, 4, "#f9e8a9");
    rect(x - 58, y + 3, 5, 5, "#d3a16d");
    rect(x - 59, y + 7, 124, 3, "#a0a38a");
    for (const off of [-35, 38]) {
      oval(x + off, y + 10, 9, 9, "#4d5142");
      oval(x + off, y + 10, 5, 5, "#afb8a1");
      oval(x + off, y + 10, 2, 2, "#687967");
    }
    ctx.textAlign = "center";
    ctx.font = "bold 5px monospace";
    ctx.fillStyle = "#4e644a";
    ctx.fillText("MALIGAYA \u2022 BAYAN", x - 10, y - 34);
    ctx.fillStyle = "#e9d8a9";
    ctx.fillText("INGAT!", x - 6, y - 7);
  }
  function spirit(e) {
    const bob = Math.sin(clock * 3 + e.phase) * 2, body = e.flash ? "#fff0cb" : ["#574c51", "#514957", "#61536b", "#426a70"][state2.stage], eye = e.flash ? "#ffffff" : "#f5ca79";
    oval(e.x, e.y + 3, state2.stage === 0 ? 13 : 10, 4, "#26394066");
    ctx.save();
    ctx.translate(Math.round(e.x), Math.round(e.y + bob));
    ctx.scale(1.15, 1.15);
    if (state2.stage === 0) {
      rect(-11, -25, 22, 23, body);
      rect(-9, -37, 18, 14, body);
      rect(-12, -35, 24, 4, "#736256");
      rect(-17, -24, 6, 20, body);
      rect(11, -24, 6, 20, body);
      rect(-9, -3, 6, 6, body);
      rect(4, -3, 6, 6, body);
      rect(-5, -31, 3, 2, eye);
      rect(3, -31, 3, 2, eye);
      rect(7, -27, 9, 3, "#987353");
      rect(15, -27, 3, 3, "#ed9861");
      for (let i = 0; i < 3; i++) oval(18 + Math.sin(clock + i) * 3, -32 - i * 5 - (clock * 4 + i * 2) % 5, 3 + i, 2, "#aaa69a55");
    } else if (state2.stage === 1) {
      const stride = Math.sin(clock * 9 + e.phase) * 3;
      rect(-7, -23, 14, 17, body);
      rect(-7, -42, 11, 19, body);
      rect(1, -37, 12, 8, body);
      rect(-6, -47, 3, 7, body);
      rect(0, -46, 3, 6, body);
      rect(-5, -39, 3, 2, eye);
      rect(10, -33, 2, 2, "#c2ada0");
      rect(-12, -23, 5, 17, body);
      rect(7, -22, 4, 17, body);
      rect(-6, -7 + stride, 4, 12, body);
      rect(3, -7 - stride, 4, 12, body);
      rect(-7, 3 + stride, 6, 3, "#9f927d");
      rect(2, 3 - stride, 6, 3, "#9f927d");
    } else if (state2.stage === 2) {
      const wing = Math.sin(clock * 7 + e.phase) * 8;
      for (const side of [-1, 1]) {
        ctx.save();
        ctx.scale(side, 1);
        ctx.fillStyle = body;
        ctx.beginPath();
        ctx.moveTo(3, -17);
        ctx.lineTo(28, -30 + wing);
        ctx.lineTo(24, -10 + wing * 0.3);
        ctx.lineTo(16, -15);
        ctx.lineTo(10, -5);
        ctx.closePath();
        ctx.fill();
        line([[5, -17], [25, -26 + wing]], "#99829a", 1);
        ctx.restore();
      }
      rect(-6, -26, 12, 18, body);
      rect(-6, -33, 12, 11, "#96818e");
      rect(-7, -36, 14, 5, body);
      rect(-4, -29, 2, 2, eye);
      rect(3, -29, 2, 2, eye);
      rect(-4, -10, 8, 4, body);
      for (let i = 0; i < 3; i++) rect(-3 + i * 3, -5 + (clock * 7 + i * 3) % 6, 1, 3, "#aaa1b066");
    } else {
      for (let i = 7; i >= 0; i--) {
        const x = -i * 4, y = -8 + Math.sin(clock * 4 + e.phase - i * 0.7) * 5;
        oval(x, y, 5 - i * 0.35, 5 - i * 0.3, i % 2 ? body : "#53858a");
        rect(x - 1, y - 4, 2, 2, "#c4ba83");
      }
      rect(-5, -18, 13, 12, body);
      rect(3, -14, 8, 7, "#65908b");
      rect(-4, -23, 3, 7, "#d1c38f");
      rect(5, -22, 3, 7, "#d1c38f");
      rect(3, -16, 3, 2, eye);
      rect(9, -11, 2, 2, "#f2d58b");
    }
    if (Math.hypot(state2.player.x - e.x, state2.player.y - e.y) < 110) {
      ctx.font = "6px monospace";
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff0c8";
      rect(-10, -48, 20, 3, "#29383c");
      rect(-10, -48, 20 * Math.max(0, e.hp) / (2 + state2.stage), 3, "#d9a279");
    }
    ctx.restore();
  }
  function chicken(x, y, index) {
    const foot = Math.sin(clock * 7 + index) > 0 ? 1 : 0;
    oval(x, y + 2, 7, 2, "#45674333");
    rect(x - 5, y - 7, 10, 7, "#f1e2bb");
    rect(x - 3, y - 9, 7, 3, "#fff0cc");
    rect(x + 3, y - 12, 5, 6, "#f8ecd1");
    rect(x + 3, y - 14, 4, 3, "#c77a5c");
    rect(x + 7, y - 9, 3, 2, "#dcaf62");
    rect(x + 5, y - 11, 1, 1, "#3f4c38");
    rect(x - 7, y - 9, 3, 4, "#d0bf8d");
    rect(x - 3, y - 5, 5, 2, "#dbcba0");
    rect(x - 2, y, 1, 3 - foot, "#b99353");
    rect(x + 2, y, 1, 2 + foot, "#b99353");
  }
  function drawNode(n) {
    if (state2.nodes[n.id] > 0) return;
    const y = n.y + Math.sin(clock * 3 + n.id) * 1.1;
    oval(n.x, n.y + 1, 7, 2, "#55764633");
    if (n.type === "clay") {
      rect(n.x - 6, y - 8, 12, 8, "#bd9579");
      rect(n.x - 4, y - 11, 8, 4, "#d2b196");
      rect(n.x - 3, y - 8, 5, 1, "#e5c8a4");
    } else if (n.type === "rice") {
      rect(n.x - 4, y - 8, 8, 8, "#c6b175");
      for (let i = 0; i < 5; i++) {
        rect(n.x - 5 + i * 2, y - 15, 1, 10, "#dad097");
        rect(n.x - 6 + i * 2, y - 14 + i % 2 * 2, 3, 2, "#e8d9a0");
      }
      rect(n.x - 4, y - 4, 8, 2, "#927c54");
    } else if (n.type === "bamboo") {
      for (let i = 0; i < 3; i++) {
        rect(n.x - 5 + i * 4, y - 15 + i % 2 * 2, 3, 16, "#96b77d");
        for (let j = 0; j < 3; j++) rect(n.x - 5 + i * 4, y - 13 + j * 5, 3, 1, "#d1d3a0");
      }
    } else if (n.type === "wood") {
      for (let i = 0; i < 3; i++) {
        rect(n.x - 6, y - 10 + i * 4, 13, 3, "#b39262");
        rect(n.x - 5, y - 10 + i * 4, 10, 1, "#dcc08e");
      }
      rect(n.x - 1, y - 11, 2, 13, "#7c7957");
    } else if (n.type === "cloth") {
      rect(n.x - 7, y - 12, 14, 12, "#b49a7d");
      for (let i = 0; i < 4; i++) rect(n.x - 6 + i * 4, y - 12, 2, 12, "#dbc398");
      rect(n.x - 7, y - 8, 14, 2, "#7a9d87");
      rect(n.x - 7, y - 3, 14, 1, "#e8d7a9");
    } else if (n.type === "mango") {
      rect(n.x - 4, y - 9, 7, 9, "#e9bb58");
      rect(n.x - 3, y - 8, 2, 6, "#f8d27c");
      rect(n.x, y - 12, 1, 4, "#69844c");
      rect(n.x + 1, y - 12, 4, 2, "#88a65b");
    } else if (n.type === "flowers") {
      rect(n.x, y - 7, 1, 8, "#608446");
      for (const [dx, dy] of [[-3, -7], [2, -7], [0, -10], [0, -4]]) rect(n.x + dx, y + dy, 3, 3, "#f4eed7");
      rect(n.x, y - 7, 2, 2, "#dfcb8d");
    } else {
      rect(n.x - 5, y - 7, 10, 8, "#b2b77b");
      rect(n.x - 3, y - 10, 6, 4, "#cbd29b");
      rect(n.x + 2, y - 6, 2, 5, "#8f9c60");
    }
    ctx.fillStyle = "#ffedb9";
    ctx.font = "8px monospace";
    if (Math.sin(clock * 3 + n.id) > 0) ctx.fillText("\xB7", n.x + 9, y - 13);
  }
  function frame2(now) {
    const dt = Math.min(0.04, (now - last2) / 1e3);
    last2 = now;
    state2 = getState2();
    if (!state2.paused) clock += dt;
    const p = state2.player, size = bounds(state2), sceneKey = state2.area + state2.arrival, tx = clamp(p.x - W * 0.5, 0, Math.max(0, size.width - W)), ty = clamp(p.y - H * 0.55, 0, Math.max(0, size.height - H));
    if (lastStage2 !== sceneKey) {
      lastStage2 = sceneKey;
      camera.x = tx;
      camera.y = ty;
      arrivalFade = 1;
      particles.length = 0;
      floaters.length = 0;
      pointer = null;
    }
    camera.x += (tx - camera.x) * (1 - Math.exp(-dt * 8));
    camera.y += (ty - camera.y) * (1 - Math.exp(-dt * 8));
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    ctx.translate(-Math.round(camera.x), -Math.round(camera.y));
    if (state2.area === "tavern") tavernGround();
    else drawTerrain();
    const objects = state2.area === "tavern" ? companions.filter((c) => c.id !== state2.character).map((c) => ({ y: c.y, draw: () => companion(c) })) : [
      ...[0, 1, 2, 3].flatMap((stage) => stage > state2.unlocked ? [] : [
        ...stageBuildings({ stage }).filter((b) => visible(b)).map((b) => ({ y: b.y + 35, draw: () => regionalObject(stage, () => house(b)) })),
        ...stageTrees({ stage }).filter((t) => visible(t)).map((t) => ({ y: t.y, draw: () => {
          const covers = state2.player.x > t.x - 40 && state2.player.x < t.x + 40 && state2.player.y > t.y - 96 && state2.player.y < t.y + 8;
          ctx.save();
          if (covers) ctx.globalAlpha = 0.38;
          if (stage === 2) highlandTree(t);
          else if (stage === 1) mangoTree(t);
          else if (Math.floor(t.x + t.y) % 3) mangoTree(t);
          else palm(t);
          ctx.restore();
        } }))
      ]),
      ...[0, 1, 2].map((i) => {
        const origin = regionOrigin(state2.stage), x = origin.x + 260 + i * 111 + Math.sin(clock * 0.5 + i) * 21, y = origin.y + 312 + i % 2 * 53 + Math.cos(clock * 0.65 + i) * 11;
        return { y, draw: () => chicken(x, y, i) };
      }),
      ...stageNpcs(state2).map((n) => ({ y: n.y, draw: () => npc(n) })),
      ...stageNodes(state2).filter((n) => visible(n)).map((n) => ({ y: n.y, draw: () => drawNode(n) })),
      ...features(state2).filter((f) => visible(f)).map((f) => ({ y: f.y, draw: () => fieldFeature(f) }))
    ];
    if (state2.area === "field" && visible(TAVERN.entrance)) objects.push({ y: 695, draw: tavernOutside });
    for (const e of state2.spirits) if (state2.area === "field" && e.dead <= 0) objects.push({ y: e.y, draw: () => spirit(e) });
    for (const peer of remoteGuests(state2.area)) if (visible(peer)) objects.push({ y: peer.y, draw: () => remoteGuest(peer) });
    objects.push({ y: p.y, draw: () => {
      oval(p.x, p.y + 3, 10, 3, "#3f633d55");
      if (p.invincible > 0 && Math.floor(clock * 12) % 2 === 0) ctx.globalAlpha = 0.5;
      person(ctx, p.x, p.y, state2.character, p.walking, p.dir, state2.hat, colors[state2.outfit], state2.area === "tavern" ? 1.3 : 1.05, true);
      ctx.globalAlpha = 1;
      if (state2.area === "tavern") {
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffe3a0";
        ctx.fillText("\u25BC", p.x, p.y - 78 + Math.sin(clock * 3) * 2);
        ctx.fillText(characters[state2.character].name, p.x, p.y + 25);
        ctx.font = "7px monospace";
        ctx.fillStyle = "#e1c9a0";
        ctx.fillText(companions.find((c) => c.id === state2.character).role.split(" \xB7 ")[0], p.x, p.y + 38);
      }
      if (p.swing > 0) {
        const angle = { right: 0, down: Math.PI / 2, left: Math.PI, up: -Math.PI / 2 }[p.dir], progress = 1 - p.swing / 0.32;
        ctx.strokeStyle = "#f8e5aaab";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y - 18, weaponInfo(state2.weapon).range * 0.55, angle - 0.9, angle - 0.9 + progress * 1.8);
        ctx.stroke();
      }
      if (p.dash > 0) {
        for (let i = 1; i < 4; i++) rect(p.x - 7 - i * 5, p.y - 9 + i * 3, 6, 2, "#f6e5ad77");
      }
    } });
    objects.sort((a, b) => a.y - b.y);
    for (const o of objects) if (o.y > camera.y - 130 && o.y < camera.y + H + 150) o.draw();
    if (state2.area === "field") {
      for (let i = 0; i < 5; i++) {
        const x = 180 + i * 141 + Math.sin(clock * 0.4 + i) * 20, y = 217 + i * 61 % 180 + Math.cos(clock * 0.7 + i) * 7;
        rect(x, y, 1, 2, "#8d8960");
        rect(x - 2, y + Math.floor(clock * 6) % 2, 2, 1, i % 2 ? "#f0db99" : "#dfb19f");
        rect(x + 1, y, 2, 1, "#f3dfa8");
      }
      for (let i = 0; i < 3; i++) {
        const x = (clock * 13 + i * 53) % 960, y = 99 + i * 7 + Math.sin(clock + i) * 3;
        line([[x - 3, y - 2], [x, y], [x + 4, y - 2]], "#eee7c6", 1);
      }
    }
    if (state2.area === "field" && p.walking && Math.floor(p.walkTime * 9) !== lastFootstep) {
      lastFootstep = Math.floor(p.walkTime * 9);
      for (let i = 0; i < 2; i++) particles.push({ x: p.x + (i ? 4 : -4), y: p.y + 3, vx: (i ? 1 : -1) * 5, vy: -5, life: 0.3, color: "#ddcb9b66" });
    }
    for (const shot of state2.projectiles) {
      oval(shot.x, shot.y + 2, 3, 1, "#26493644");
      line([[shot.x - shot.vx * 0.018, shot.y - 12 - shot.vy * 0.018], [shot.x, shot.y - 12]], "#f2dda37a", 2);
      rect(shot.x - 2, shot.y - 14, 4, 4, "#fff0ba");
      rect(shot.x, shot.y - 13, 2, 2, "#9a8d6c");
    }
    for (const e of state2.events) if (e.id > lastEvent2) {
      lastEvent2 = e.id;
      if (["gather", "loot", "hit", "quest", "equipment"].includes(e.type)) {
        floaters.push({ x: e.x, y: e.y - 25, text: e.text, life: e.type === "equipment" ? 3 : 1.5 });
        for (let i = 0; i < 9; i++) particles.push({ x: e.x, y: e.y - 6, vx: (Math.random() - 0.5) * 38, vy: -Math.random() * 35, life: 0.7, color: e.type === "hit" ? "#d2e5a3" : "#f6df9e" });
      }
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const a = particles[i];
      a.life -= dt;
      a.x += a.vx * dt;
      a.y += a.vy * dt;
      a.vy += dt * 45;
      rect(a.x, a.y, 2, 2, a.color);
      if (a.life <= 0) particles.splice(i, 1);
    }
    ctx.font = "bold 7px monospace";
    ctx.textAlign = "center";
    for (let i = floaters.length - 1; i >= 0; i--) {
      const a = floaters[i];
      a.life -= dt;
      a.y -= dt * 12;
      ctx.fillStyle = "#3e5738";
      ctx.fillText(a.text, a.x + 1, a.y + 1);
      ctx.fillStyle = "#fff0bc";
      ctx.fillText(a.text, a.x, a.y);
      if (a.life <= 0) floaters.splice(i, 1);
    }
    if (pointer) {
      pointer.life -= dt;
      ctx.strokeStyle = "#fff2bb";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(pointer.x, pointer.y, 6 + pointer.life * 8, 3 + pointer.life * 4, 0, 0, Math.PI * 2);
      ctx.stroke();
      if (pointer.life <= 0) pointer = null;
    }
    if (state2.area === "field" && state2.stageProgress.every((q) => q === 3)) {
      ctx.fillStyle = "#ffedb9";
      ctx.font = "12px Georgia";
      ctx.fillText("Salamat, kaibigan!", 450, 230 + Math.sin(clock) * 2);
    }
    ctx.restore();
    const lantern = ctx.createRadialGradient(p.x - camera.x, p.y - camera.y, 42, p.x - camera.x, p.y - camera.y, Math.max(W, H) * 0.7);
    lantern.addColorStop(0, "#d8ae5700");
    lantern.addColorStop(0.5, "#e1cf8c06");
    lantern.addColorStop(1, state2.area === "tavern" ? "#24152c33" : "#1b44352a");
    ctx.fillStyle = lantern;
    ctx.fillRect(0, 0, W, H);
    if (state2.area === "field") for (let i = 0; i < 7; i++) {
      const fx = (clock * 9 + i * 101) % W, fy = H * 0.76 + Math.sin(clock * 0.4 + i) * 14;
      ctx.fillStyle = "#ced0c212";
      ctx.fillRect(fx, fy, 74, 3);
    }
    if (state2.area === "field") {
      for (let i = 0; i < 12; i++) {
        const lx = (i * 137 + clock * (5 + i % 3)) % W, ly = (i * 79 + clock * (8 + i % 2)) % H;
        ctx.fillStyle = i % 3 ? "#d4bb7755" : "#e9d49a66";
        ctx.fillRect(Math.round(lx + Math.sin(clock + i) * 5), Math.round(ly), 3, 1);
        if (i % 4 === 0) {
          ctx.fillStyle = "#fce8a477";
          ctx.fillRect(Math.round(lx), Math.round(ly) - 2, 1, 1);
        }
      }
    }
    if (arrivalFade > 0) {
      arrivalFade = Math.max(0, arrivalFade - dt * 0.9);
      ctx.fillStyle = "rgba(247,240,219," + arrivalFade * 0.7 + ")";
      ctx.fillRect(0, 0, W, H);
    }
    out.imageSmoothingEnabled = false;
    out.clearRect(0, 0, canvas2.width, canvas2.height);
    out.drawImage(world, 0, 0, canvas2.width, canvas2.height);
    drawMinimap(state2, camera, W, H, now);
    const key2 = JSON.stringify([state2.character, state2.hat, state2.outfit, state2.armor, state2.hair, state2.skin, state2.hairColor, state2.gear, state2.weapon, state2.profiles, Math.floor(clock * 8)]);
    if (key2 !== portraitKey) {
      portraitKey = key2;
      const portrait = context2d(canvasElement("portrait"));
      portrait.clearRect(0, 0, 48, 56);
      person(portrait, 24, 53, state2.character, false, "down", state2.hat, colors[state2.outfit], 0.95, true);
      for (const [id, c] of Object.entries(characters)) {
        const target2 = context2d(canvasElement("sprite-" + id));
        target2.clearRect(0, 0, 48, 56);
        profileSprite(target2, 24, 53, id, characterProfile(state2, id), 0.95);
      }
    }
    if (document.getElementById("equipment-panel").open) {
      const preview = context2d(canvasElement("equipment-preview"));
      preview.clearRect(0, 0, 144, 150);
      preview.fillStyle = "#e9e5d1";
      preview.beginPath();
      preview.ellipse(72, 133, 38, 8, 0, 0, Math.PI * 2);
      preview.fill();
      person(preview, 68, 133, state2.character, false, "down", state2.hat, colors[state2.outfit], 2.15, true);
    }
    if (element("customize-panel").open) {
      const canvas3 = canvasElement("wardrobe-preview"), preview = context2d(canvas3);
      preview.clearRect(0, 0, canvas3.width, canvas3.height);
      preview.fillStyle = "#c1c9a7";
      preview.beginPath();
      preview.ellipse(90, 172, 48, 9, 0, 0, Math.PI * 2);
      preview.fill();
      const pose = element("sprite-pose").value;
      person(preview, 90, 167, state2.character, pose === "walk", canvas3.dataset.facing || "down", state2.hat, colors[state2.outfit], 2.9, true, pose);
    }
    requestAnimationFrame(frame2);
  }
  requestAnimationFrame(frame2);
})();
//# sourceMappingURL=game.js.map
