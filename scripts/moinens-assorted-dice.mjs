const MODULE_ID = "moinens-assorted-dice";
const TEX = `modules/${MODULE_ID}/textures`;
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// Every set registers its DSN system under this shared `group`, so they all nest under one
// "Moinen's Assorted Dice" heading in the Dice So Nice UI (System constructor: id, name, mode, group).
const GROUP = "Moinen's Assorted Dice";

// Moinen's Assorted Dice — one module that bundles several custom Dice So Nice! sets and serves the one
// matching the active game system. Each "brand" is registered by its own function below; the brand whose
// system is active is registered FIRST and as "preferred" so DSN defaults to it (DSN keeps the first
// preferred it sees). The others are registered as "default" so they remain selectable in the library.

// game.system.id  ->  brand key
const SYSTEM_MAP = {
  stonetop: "stonetop",
  mythicbastionland: "mb",
  "salvage-union": "salvage",
  salvageunion: "salvage"
};

// ── Brand: Stonetop (carved stone) ──────────────────────────────────────────────────────────────────
// Has baked per-face calibration: dice listed in data/stonetop-baked.json load from textures/stonetop/_fit/
// (transform already applied); others use the identity texture.
async function registerStonetop(dice3d, mode) {
  const base = `${TEX}/stonetop`;
  const baked = await fetch(`modules/${MODULE_ID}/data/stonetop-baked.json`)
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);
  const tex = (type, rel) => `${base}/${baked.includes(type) ? "_fit/" : ""}${rel}.webp`;

  dice3d.addSystem({ id: "stonetop", name: "Stonetop", group: GROUP }, mode);
  await dice3d.addTexture("stonetop-stone", {
    name: "Stonetop Stone", composite: "source-over",
    source: `${base}/stone.webp`, bump: `${base}/stone-bump.webp`
  });
  dice3d.addColorset({
    name: "stonetop", description: "Carved Stone", category: "Stonetop",
    foreground: "#3a2d1a", background: "#cab68c", edge: "#9a8a63", outline: "#241c12",
    texture: "stonetop-stone", material: "wood", font: "Arial"
  }, mode);

  const reg = (type, shape, names) => dice3d.addDicePreset({
    type, system: "stonetop", colorset: "stonetop",
    labels: names.map((n) => tex(type, n)), bumpMaps: names.map((n) => tex(type, `${n}-bump`))
  }, shape);

  dice3d.addDicePreset({
    type: "d4", system: "stonetop", colorset: "stonetop",
    labels: range(1, 4).map(() => `${base}/d4blank.webp`),
    bumpMaps: range(1, 4).map(() => `${base}/d4blank.webp`),   // required or DSN skips d4 bumps -> flat
    backgrounds: {
      labels: range(1, 4).map((n) => tex("d4", `d4bg${n}`)),
      bumpMaps: range(1, 4).map((n) => tex("d4", `d4bg${n}-bump`))
    }
  }, "d4");
  reg("d2", "d2", ["d2f1", "d2f2"]);
  reg("d6", "d6", range(1, 6).map((n) => `face${n}`));
  reg("d8", "d8", range(1, 8).map((n) => `d8face${n}`));
  reg("d10", "d10", [...range(2, 10), 1].map((n) => `d10f${n}`));
  reg("d12", "d12", range(1, 12).map((n) => `d12f${n}`));
  reg("d20", "d20", range(1, 20).map((n) => `d20f${n}`));
}

// ── Brand: Stonetop (Brown) — second colour of the carved-stone set ──────────────────────────────────
// Same faces tinted to a darker brown stone (#714e30); reuses the stonetop calibration (same
// stonetop-baked.json), textures live in textures/stonetop-brown/. The brown is baked into the faces,
// so background/edge just match it for the bevels.
async function registerStonetopBrown(dice3d, mode) {
  const base = `${TEX}/stonetop-brown`;
  const baked = await fetch(`modules/${MODULE_ID}/data/stonetop-baked.json`)
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);
  const tex = (type, rel) => `${base}/${baked.includes(type) ? "_fit/" : ""}${rel}.webp`;

  dice3d.addSystem({ id: "stonetop-brown", name: "Stonetop (Brown)", group: GROUP }, mode);
  await dice3d.addTexture("stonetop-brown-stone", {
    name: "Stonetop Brown Stone", composite: "source-over",
    source: `${base}/stone.webp`, bump: `${base}/stone-bump.webp`
  });
  dice3d.addColorset({
    name: "stonetop-brown", description: "Carved Stone (Brown)", category: "Stonetop",
    foreground: "#e8dcc4", background: "#714e30", edge: "#714e30", outline: "#120c06",
    texture: "stonetop-brown-stone", material: "wood", font: "Arial"
  }, mode);

  const reg = (type, shape, names) => dice3d.addDicePreset({
    type, system: "stonetop-brown", colorset: "stonetop-brown",
    labels: names.map((n) => tex(type, n)), bumpMaps: names.map((n) => tex(type, `${n}-bump`))
  }, shape);

  dice3d.addDicePreset({
    type: "d4", system: "stonetop-brown", colorset: "stonetop-brown",
    labels: range(1, 4).map(() => `${base}/d4blank.webp`),
    bumpMaps: range(1, 4).map(() => `${base}/d4blank.webp`),   // required or DSN skips d4 bumps -> flat
    backgrounds: {
      labels: range(1, 4).map((n) => tex("d4", `d4bg${n}`)),
      bumpMaps: range(1, 4).map((n) => tex("d4", `d4bg${n}-bump`))
    }
  }, "d4");
  reg("d2", "d2", ["d2f1", "d2f2"]);
  reg("d6", "d6", range(1, 6).map((n) => `face${n}`));
  reg("d8", "d8", range(1, 8).map((n) => `d8face${n}`));
  reg("d10", "d10", [...range(2, 10), 1].map((n) => `d10f${n}`));
  reg("d12", "d12", range(1, 12).map((n) => `d12f${n}`));
  reg("d20", "d20", range(1, 20).map((n) => `d20f${n}`));
}

// ── Brand: Stonetop (Brown Body) — original faces, brown #714e30 die body ────────────────────────────
// NO texture changes: reuses the stonetop faces as-is. Only the DIE-BODY colour changes — the stone
// shown BETWEEN/around the face tiles (bevels, edges, transparent face margins) is painted by the
// colorset, so a tintable grayscale stone (multiply) over background #714e30 turns the body + edges
// brown while every face stays the original carved parchment. DSN's own per-die colour (recolour live
// via the "Dice Color" picker), no new face files. Reuses the stonetop calibration (stonetop-baked.json).
async function registerStonetopBrownBody(dice3d, mode) {
  const base = `${TEX}/stonetop`;
  const baked = await fetch(`modules/${MODULE_ID}/data/stonetop-baked.json`)
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);
  const tex = (type, rel) => `${base}/${baked.includes(type) ? "_fit/" : ""}${rel}.webp`;

  dice3d.addSystem({ id: "stonetop-brownbody", name: "Stonetop (Brown Body)", group: GROUP }, mode);
  await dice3d.addTexture("stonetop-stone-tint", {
    name: "Stonetop Stone (tintable)", composite: "multiply",
    source: `${base}/stone-tint.webp`, bump: `${base}/stone-bump.webp`
  });
  dice3d.addColorset({
    name: "stonetop-brownbody", description: "Carved Stone (original faces, brown body)", category: "Stonetop",
    foreground: "#3a2d1a", background: "#7a522c", edge: "#714e30", outline: "#120c06",
    texture: "stonetop-stone-tint", material: "wood", font: "Arial"
  }, mode);

  const reg = (type, shape, names) => dice3d.addDicePreset({
    type, system: "stonetop-brownbody", colorset: "stonetop-brownbody",
    labels: names.map((n) => tex(type, n)), bumpMaps: names.map((n) => tex(type, `${n}-bump`))
  }, shape);

  dice3d.addDicePreset({
    type: "d4", system: "stonetop-brownbody", colorset: "stonetop-brownbody",
    labels: range(1, 4).map(() => `${base}/d4blank.webp`),
    bumpMaps: range(1, 4).map(() => `${base}/d4blank.webp`),   // required or DSN skips d4 bumps -> flat
    backgrounds: {
      labels: range(1, 4).map((n) => tex("d4", `d4bg${n}`)),
      bumpMaps: range(1, 4).map((n) => tex("d4", `d4bg${n}-bump`))
    }
  }, "d4");
  reg("d2", "d2", ["d2f1", "d2f2"]);
  reg("d6", "d6", range(1, 6).map((n) => `face${n}`));
  reg("d8", "d8", range(1, 8).map((n) => `d8face${n}`));
  reg("d10", "d10", [...range(2, 10), 1].map((n) => `d10f${n}`));
  reg("d12", "d12", range(1, 12).map((n) => `d12f${n}`));
  reg("d20", "d20", range(1, 20).map((n) => `d20f${n}`));
}

// ── Brand: Mythic Bastionland (illuminated parchment) ────────────────────────────────────────────────
function registerMB(dice3d, mode) {
  const base = `${TEX}/mythic-bastionland`;
  dice3d.addSystem({ id: "mb-dice", name: "Mythic Bastionland", group: GROUP }, mode);
  dice3d.addColorset({
    name: "mb-dice", description: "Illuminated Parchment", category: "Mythic Bastionland",
    foreground: "#6b531d", background: "#e3d8bb", edge: "#b9a778", outline: "#4a3a1c",
    material: "wood", font: "Arial"
  }, mode);

  const reg = (type, shape, names) => dice3d.addDicePreset({
    type, system: "mb-dice", colorset: "mb-dice",
    labels: names.map((n) => `${base}/${n}.webp`), bumpMaps: names.map((n) => `${base}/${n}-bump.webp`)
  }, shape);

  reg("d6", "d6", range(1, 6).map((n) => `d6f${n}`));
  reg("d8", "d8", range(1, 8).map((n) => `d8f${n}`));
  reg("d10", "d10", [...range(2, 10), 1].map((n) => `d10f${n}`));
  reg("d12", "d12", range(1, 12).map((n) => `d12f${n}`));
  reg("d20", "d20", range(1, 20).map((n) => `d20f${n}`));
  dice3d.addDicePreset({
    type: "d4", system: "mb-dice", colorset: "mb-dice",
    labels: range(1, 4).map(() => `${base}/d4blank.webp`),
    bumpMaps: range(1, 4).map(() => `${base}/d4blank.webp`),   // required or DSN skips d4 bumps -> flat
    backgrounds: {
      labels: range(1, 4).map((n) => `${base}/d4f${n}.webp`),
      bumpMaps: range(1, 4).map((n) => `${base}/d4f${n}-bump.webp`)
    }
  }, "d4");
}

// ── Brand: Salvage Union (weathered salvage crate) ───────────────────────────────────────────────────
function registerSalvage(dice3d, mode) {
  const base = `${TEX}/salvage-union`;
  dice3d.addSystem({ id: "salvage-union", name: "Salvage Union", group: GROUP }, mode);
  dice3d.addColorset({
    name: "salvage-union", description: "Scrapyard", category: "Salvage Union",
    foreground: "#f4f1ea", background: "#8cc7d6", edge: "#1b2327", outline: "#10161a",
    material: "stone", font: "Arial"   // matte stone — renders the baked full textures cleanly (no plastic)
  }, mode);

  const reg = (type, shape, names) => dice3d.addDicePreset({
    type, system: "salvage-union", colorset: "salvage-union",
    labels: names.map((n) => `${base}/${n}.webp`), bumpMaps: names.map((n) => `${base}/${n}-bump.webp`)
  }, shape);

  reg("d6", "d6", range(1, 6).map((n) => `d6f${n}`));
  reg("d8", "d8", range(1, 8).map((n) => `d8f${n}`));
  reg("d10", "d10", [...range(2, 10), 1].map((n) => `d10f${n}`));
  reg("d12", "d12", range(1, 12).map((n) => `d12f${n}`));
  reg("d20", "d20", range(1, 20).map((n) => `d20f${n}`));
  dice3d.addDicePreset({
    type: "d4", system: "salvage-union", colorset: "salvage-union",
    labels: range(1, 4).map(() => `${base}/d4blank.webp`),
    bumpMaps: range(1, 4).map(() => `${base}/d4blank.webp`),   // required or DSN skips d4 bumps -> flat
    backgrounds: {
      labels: range(1, 4).map((n) => `${base}/d4f${n}.webp`),
      bumpMaps: range(1, 4).map((n) => `${base}/d4f${n}-bump.webp`)
    }
  }, "d4");
}

// ── Brand: Stonetop Bone (carved ivory) ──────────────────────────────────────────────────────────────
// A second look for Stonetop: smooth aged BONE faces with a carved beaded-rope border. d6 shows carved
// SPIRAL PIPS (1-6); the other dice carry Phantom Runes numerals. Full baked faces (matte plastic). NOT
// in SYSTEM_MAP — the carved-stone "stonetop" brand stays the default for the Stonetop system; this one
// registers as "default" so it's selectable in the DSN library.
function registerStonetopBone(dice3d, mode) {
  const base = `${TEX}/stonetop-bone`;
  dice3d.addSystem({ id: "stonetop-bone", name: "Stonetop Bone", group: GROUP }, mode);
  dice3d.addColorset({
    name: "stonetop-bone", description: "Carved Bone", category: "Stonetop",
    foreground: "#3a2d1a", background: "#dfceaa", edge: "#c9b78f", outline: "#2c2114",
    material: "stone", font: "Arial"   // stone: matte carved-bone finish (no glossy plastic sheen)
  }, mode);

  const reg = (type, shape, names) => dice3d.addDicePreset({
    type, system: "stonetop-bone", colorset: "stonetop-bone",
    labels: names.map((n) => `${base}/${n}.webp`), bumpMaps: names.map((n) => `${base}/${n}-bump.webp`)
  }, shape);

  reg("d6", "d6", range(1, 6).map((n) => `d6f${n}`));   // carved spiral pips
  reg("d8", "d8", range(1, 8).map((n) => `d8f${n}`));
  reg("d10", "d10", [...range(2, 10), 1].map((n) => `d10f${n}`));
  reg("d12", "d12", range(1, 12).map((n) => `d12f${n}`));
  reg("d20", "d20", range(1, 20).map((n) => `d20f${n}`));
  dice3d.addDicePreset({
    type: "d4", system: "stonetop-bone", colorset: "stonetop-bone",
    labels: range(1, 4).map(() => `${base}/d4blank.webp`),
    // top-level bumpMaps MUST be present (even transparent) or DSN's registerFaces skips the whole d4
    // bump branch and never applies backgrounds.bumpMaps -> the d4 renders flat. Transparent vertex
    // bumps add nothing; the real relief comes from backgrounds.bumpMaps below.
    bumpMaps: range(1, 4).map(() => `${base}/d4blank.webp`),
    backgrounds: {
      labels: range(1, 4).map((n) => `${base}/d4f${n}.webp`),
      bumpMaps: range(1, 4).map((n) => `${base}/d4f${n}-bump.webp`)
    }
  }, "d4");
}

// ── Brand: Stonetop Amber (bone faces, resin material) ───────────────────────────────────────────────
// The Stonetop Bone face set with ONE change: a glossy RESIN material instead of matte stone — an amber
// (fossil-resin), warm translucent finish. Reuses the same textures/stonetop-bone/ faces (no new art).
// Selectable in the DSN library; not tied to any system.
function registerStonetopAmber(dice3d, mode) {
  const base = `${TEX}/stonetop-bone`;   // reuse the bone faces as-is
  dice3d.addSystem({ id: "stonetop-amber", name: "Stonetop Amber", group: GROUP }, mode);
  dice3d.addColorset({
    name: "stonetop-amber", description: "Amber (resin)", category: "Stonetop",
    foreground: "#3a2d1a", background: "#dfceaa", edge: "#c9b78f", outline: "#2c2114",
    material: "resin", font: "Arial"   // resin: glossy translucent amber finish over the bone faces
  }, mode);

  const reg = (type, shape, names) => dice3d.addDicePreset({
    type, system: "stonetop-amber", colorset: "stonetop-amber",
    labels: names.map((n) => `${base}/${n}.webp`), bumpMaps: names.map((n) => `${base}/${n}-bump.webp`)
  }, shape);

  reg("d6", "d6", range(1, 6).map((n) => `d6f${n}`));
  reg("d8", "d8", range(1, 8).map((n) => `d8f${n}`));
  reg("d10", "d10", [...range(2, 10), 1].map((n) => `d10f${n}`));
  reg("d12", "d12", range(1, 12).map((n) => `d12f${n}`));
  reg("d20", "d20", range(1, 20).map((n) => `d20f${n}`));
  dice3d.addDicePreset({
    type: "d4", system: "stonetop-amber", colorset: "stonetop-amber",
    labels: range(1, 4).map(() => `${base}/d4blank.webp`),
    bumpMaps: range(1, 4).map(() => `${base}/d4blank.webp`),   // enables DSN's d4 bump branch (see Bone note)
    backgrounds: {
      labels: range(1, 4).map((n) => `${base}/d4f${n}.webp`),
      bumpMaps: range(1, 4).map((n) => `${base}/d4f${n}-bump.webp`)
    }
  }, "d4");
}

// ── Brand: Amanojaku — Niebo / Ziemia (yin-yang d6 pair, sumi-e brush) ───────────────────────────────
// A taijitu PAIR of d6, numerals from the Amanojaku Demo brush font (1001fonts, personal-use), FULL
// baked faces (matte velvet). Generated TOGETHER in one image2 call (12-face montage) so both share one
// ink style — see modules/amanojaku-dice/. Niebo (天, Yang): deep-indigo night sky + WHITE numerals +
// white koi-6. Ziemia (地, Yin): cream washi + seigaiha waves + BLACK numerals + black koi-6. The
// value-6 face of each is a koi curled into the digit 6, eye in the opposite colour (the yin-yang seed).
// Not tied to a game system (registered "default"); selectable in the DSN library under "Amanojaku".
function makeAmanojakuD6(brand, name, cs) {
  return function (dice3d, mode) {
    const base = `${TEX}/${brand}`;
    dice3d.addSystem({ id: brand, name, group: GROUP }, mode);
    dice3d.addColorset({
      name: brand, description: name, category: "Amanojaku",
      foreground: cs.fg, background: cs.bg, edge: cs.edge, outline: cs.outline,
      material: cs.material, font: "Arial"   // matte (velvet/stone) — baked full faces, never plastic
    }, mode);
    dice3d.addDicePreset({
      type: "d6", system: brand, colorset: brand,
      labels: range(1, 6).map((n) => `${base}/d6f${n}.webp`),
      bumpMaps: range(1, 6).map((n) => `${base}/d6f${n}-bump.webp`)
    }, "d6");
  };
}
// Yin-yang pair: Niebo (天, Yang) deep-indigo night sky + WHITE ink + white koi-6;
// Ziemia (地, Yin) cream washi + BLACK ink + black koi-6. Each value-6 face is a koi curled
// into the digit 6, with an opposite-colour eye (the taijitu seed). Built by tools/build_yinyang_dice.py.
const registerAmanojakuNiebo = makeAmanojakuD6("amanojaku-niebo", "Amanojaku Niebo (天)",
  { fg: "#f2f0ea", bg: "#18304f", edge: "#0f2138", outline: "#081320", material: "stone" });
const registerAmanojakuZiemia = makeAmanojakuD6("amanojaku-ziemia", "Amanojaku Ziemia (地)",
  { fg: "#1a1206", bg: "#e9e0c9", edge: "#ccbf9e", outline: "#3a2f17", material: "stone" });

const BRANDS = {
  stonetop: registerStonetop,
  "stonetop-brown": registerStonetopBrown, // tinted faces (#714e30 baked); not in SYSTEM_MAP -> selectable
  "stonetop-brownbody": registerStonetopBrownBody, // original faces, brown #714e30 die body (no texture edit)
  "stonetop-bone": registerStonetopBone, // ivory/bone faces, spiral-pip d6; not in SYSTEM_MAP -> selectable
  "stonetop-amber": registerStonetopAmber, // bone faces, resin material; not in SYSTEM_MAP -> selectable
  mb: registerMB,
  salvage: registerSalvage,
  "amanojaku-niebo": registerAmanojakuNiebo,   // 天 Yang — nocne niebo, białe cyfry, biały koi-6
  "amanojaku-ziemia": registerAmanojakuZiemia  // 地 Yin — kremowe washi, czarne cyfry, czarny koi-6
};

Hooks.once("diceSoNiceReady", async (dice3d) => {
  const active = SYSTEM_MAP[game.system?.id] ?? null;
  // Register the active brand FIRST so its "preferred" claim wins; others as "default".
  const order = Object.keys(BRANDS).sort((a, b) => (a === active ? -1 : b === active ? 1 : 0));
  console.log(`${MODULE_ID} | system "${game.system?.id}" -> brand "${active ?? "(none)"}"`);
  for (const brand of order) {
    await BRANDS[brand](dice3d, brand === active ? "preferred" : "default");
  }
});
