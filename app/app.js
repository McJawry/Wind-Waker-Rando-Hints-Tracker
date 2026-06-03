const STORAGE_KEY = "ww-rando-hint-tracker";
const CHECKED_KEY = "ww-rando-hint-tracker-checked";
const SETTINGS_KEY = "ww-rando-hint-tracker-settings";
const PREFERENCES_FILE = "preferences.json";

const DATA_FILES = {
  items: "data/item_names.txt",
  bosses: "data/bosses.txt",
  locations: "data/location_pool.txt"
};

const IMAGE_ROOTS = {
  items: "assets/images/items/",
  bosses: "assets/images/bosses/",
  misc: "assets/images/misc/"
};

const FALLBACK_SECTORS = [
  "Forsaken Fortress", "Star Island", "Northern Fairy Island", "Gale Isle", "Crescent Moon Island", "Seven Star Isles", "Overlook Island",
  "Four Eye Reef", "Mother & Child Isles", "Spectacle Island", "Windfall Island", "Pawprint Isle", "Dragon Roost Island", "Flight Control Platform",
  "Western Fairy Island", "Rock Spire Isle", "Tingle Island", "Northern Triangle Island", "Eastern Fairy Island", "Fire Mountain", "Star Belt Archipelago",
  "Three Eye Reef", "Greatfish Isle", "Cyclops Reef", "Six Eye Reef", "Tower of the Gods Sector", "Eastern Triangle Island", "Thorned Fairy Island",
  "Needle Rock Isle", "Islet of Steel", "Stone Watcher Island", "Southern Triangle Island", "Private Oasis", "Bomb Island", "Birds Peak Rock",
  "Diamond Steppe Island", "Five Eye Reef", "Shark Island", "Southern Fairy Island", "Ice Ring Isle", "Forest Haven", "Cliff Plateau Isles",
  "Horseshoe Island", "Outset Island", "Headstone Island", "Two Eye Reef", "Angular Isles", "Boating Course", "Five Star Isles"
];

const OLD_MAN_HO_HO_SECTORS = [
  "Forsaken Fortress",
  "Northern Fairy Island",
  "Crescent Moon Island",
  "Flight Control Platform",
  "Stone Watcher Island",
  "Private Oasis",
  "Bomb Island",
  "Horseshoe Island",
  "Outset Island",
  "Two Eye Reef"
];

const BLUE_CHU_JELLY_SECTORS = [
  "Star Island",
  "Northern Fairy Island",
  "Crescent Moon Island",
  "Crescent Moon Island",
  "Overlook Island",
  "Mother & Child Isles",
  "Spectacle Island",
  "Pawprint Isle",
  "Western Fairy Island",
  "Rock Spire Isle",
  "Tingle Island",
  "Eastern Fairy Island",
  "Needle Rock Isle",
  "Stone Watcher Island",
  "Birds Peak Rock",
  "Diamond Steppe Island",
  "Shark Island",
  "Southern Fairy Island",
  "Cliff Plateau Isles",
  "Horseshoe Island",
  "Angular Isles",
  "Boating Course"
];

const TRACKED_AREAS = [
  { name: "Dragon Roost Cavern", imageKind: "boss", imageName: "Gohma", matchNames: ["Dragon Roost Cavern"] },
  { name: "Forbidden Woods", imageKind: "boss", imageName: "Kalle Demos", matchNames: ["Forbidden Woods"] },
  { name: "Tower of the Gods", imageKind: "boss", imageName: "Gohdan", matchNames: ["Tower of the Gods"] },
  { name: "Forsaken Fortress", imageKind: "boss", imageName: "Helmaroc King", matchNames: ["Forsaken Fortress"] },
  { name: "Earth Temple", imageKind: "boss", imageName: "Jalhalla", matchNames: ["Earth Temple"] },
  { name: "Wind Temple", imageKind: "boss", imageName: "Molgera", matchNames: ["Wind Temple"] },
  { name: "Mailbox", imageKind: "misc", imageName: "Mailbox", matchNames: ["Mailbox"] },
  { name: "The Great Sea", imageKind: "misc", imageName: "Great Sea", matchNames: ["Great Sea"] },
  { name: "Hyrule", imageKind: "misc", imageName: "Hyrule", matchNames: ["Hyrule", "Hyrule Castle"] },
  { name: "Ganon's Tower", imageKind: "boss", imageName: "Ganondorf", matchNames: ["Ganon's Tower"] }
];

const MANUAL_AREA_ABBREVIATIONS = {
  DRC: "Dragon Roost Cavern",
  DRI: "Dragon Roost Island",
  FW: "Forbidden Woods",
  FH: "Forest Haven",
  FF: "Forsaken Fortress",
  GT: "Ganon's Tower",
  NFI: "Northern Fairy Island",
  SFI: "Southern Fairy Island",
  WFI: "Western Fairy Island",
  EFI: "Eastern Fairy Island",
  TFI: "Thorned Fairy Island",
  NTI: "Northern Triangle Island",
  ETI: "Eastern Triangle Island",
  STI: "Southern Triangle Island",
  TOTG: "Tower of the Gods",
  WT: "Wind Temple",
  ET: "Earth Temple",
  "M&C": "Mother & Child Isles",
  FCP: "Flight Control Platform"
};

const ITEM_IMAGE_ALIASES = {};

const ITEM_NAME_ALIASES = {
  "Cmd": "Command Melody",
  "Cheese": "Triforce Shard",
  "Cheese 1": "Triforce Shard 1",
  "Cheese 2": "Triforce Shard 2",
  "Cheese 3": "Triforce Shard 3",
  "Cheese 4": "Triforce Shard 4",
  "Cheese 5": "Triforce Shard 5",
  "Cheese 6": "Triforce Shard 6",
  "Cheese 7": "Triforce Shard 7",
  "Cheese 8": "Triforce Shard 8",
  "Bombs": "Bomb"
};

const DISPLAY_ITEM_ALIASES = {
  "Triforce Shard": "Triforce of Courage"
};

const REQUIREMENT_ALIASES = {
  r: { key: "required", label: "Required" },
  req: { key: "required", label: "Required" },
  required: { key: "required", label: "Required" },
  p: { key: "possibly-required", label: "Possibly required" },
  possible: { key: "possibly-required", label: "Possibly required" },
  possibly: { key: "possibly-required", label: "Possibly required" },
  "possibly required": { key: "possibly-required", label: "Possibly required" },
  "possibly-required": { key: "possibly-required", label: "Possibly required" },
  n: { key: "not-required", label: "Not required" },
  nr: { key: "not-required", label: "Not required" },
  not: { key: "not-required", label: "Not required" },
  "not required": { key: "not-required", label: "Not required" },
  "not-required": { key: "not-required", label: "Not required" }
};

const state = {
  filter: "all",
  hints: [],
  checked: loadChecked(),
  settings: loadSettings(),
  history: [],
  historyIndex: -1,
  isApplyingHistory: false,
  data: {
    items: [],
    itemSearchNames: [],
    bosses: [],
    locations: [],
    sectors: FALLBACK_SECTORS,
    areas: FALLBACK_SECTORS,
    areaAliases: {},
    loaded: false
  }
};

const seaGrid = document.querySelector("#seaGrid");
const areaStrip = document.querySelector("#areaStrip");
const hintInput = document.querySelector("#hintInput");
const hintList = document.querySelector("#hintList");
const hintCount = document.querySelector("#hintCount");
const saveStatus = document.querySelector("#saveStatus");
const dataStatus = document.querySelector("#dataStatus");
const resetRunButton = document.querySelector("#resetRunButton");
const undoButton = document.querySelector("#undoButton");
const redoButton = document.querySelector("#redoButton");
const pageBackgroundInput = document.querySelector("#pageBackgroundInput");
const streamKeyInput = document.querySelector("#streamKeyInput");
const showHoHoInput = document.querySelector("#showHoHoInput");
const showBlueChuInput = document.querySelector("#showBlueChuInput");
const streamModeInput = document.querySelector("#streamModeInput");
const compactModeInput = document.querySelector("#compactModeInput");
const tabs = document.querySelectorAll(".tab");

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function parseList(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*-\s*/, "").trim())
    .filter(Boolean);
}

function parseLocationData(text) {
  const rawLines = text.split(/\r?\n/);
  const locations = [];
  const firstBlockLocations = [];
  let isFirstBlock = true;

  rawLines.forEach((rawLine) => {
    const line = rawLine.replace(/^\s*-\s*/, "").trim();
    if (!line) {
      if (locations.length > 0) isFirstBlock = false;
      return;
    }

    locations.push(line);
    if (isFirstBlock) firstBlockLocations.push(line);
  });

  const sectors = unique(firstBlockLocations.map(getAreaFromLocation)).slice(0, 49);
  const areas = unique([...sectors, ...locations.map(getAreaFromLocation)]);

  return {
    locations,
    sectors: sectors.length === 49 ? sectors : FALLBACK_SECTORS,
    areas
  };
}

function getAreaFromLocation(location) {
  return location.split(" - ")[0].trim();
}

function unique(values) {
  const seen = new Set();
  return values.filter((value) => {
    const key = normalize(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildAreaAliases(areas) {
  const aliases = {};

  Object.entries(MANUAL_AREA_ABBREVIATIONS).forEach(([abbr, area]) => {
    aliases[normalize(abbr)] = area;
  });

  areas.forEach((area) => {
    const acronym = area
      .replace(/\bSector\b/gi, "")
      .split(/[^A-Za-z0-9&]+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("");

    const key = normalize(acronym);
    if (key && !aliases[key]) {
      aliases[key] = area;
    }
  });

  return aliases;
}

async function loadText(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return response.text();
}

async function loadData() {
  try {
    const [itemText, bossText, locationText] = await Promise.all([
      loadText(DATA_FILES.items),
      loadText(DATA_FILES.bosses),
      loadText(DATA_FILES.locations)
    ]);
    const items = parseList(itemText);
    const locationData = parseLocationData(locationText);

    state.data = {
      items,
      itemSearchNames: unique([...items, ...Object.keys(ITEM_NAME_ALIASES)]),
      bosses: parseList(bossText),
      locations: locationData.locations,
      sectors: locationData.sectors,
      areas: locationData.areas,
      areaAliases: buildAreaAliases(locationData.areas),
      loaded: true
    };
    dataStatus.textContent = "Data loaded";
  } catch (error) {
    dataStatus.textContent = "Data not loaded";
    console.error(error);
  }

  updateFromInput();
}

function scoreMatch(query, candidate) {
  const q = normalize(query);
  const c = normalize(candidate);

  if (!q || !c) return 0;
  if (q === c) return 120;
  if (c.includes(q)) return 90 + Math.min(q.length, 25);

  const queryWords = q.split(" ").filter(Boolean);
  const candidateWords = c.split(" ").filter(Boolean);
  const candidateWordSet = new Set(candidateWords);
  const candidateStems = new Set(candidateWords.map(stemWord));
  let score = 0;

  queryWords.forEach((word) => {
    const stemmedWord = stemWord(word);
    if (candidateWordSet.has(word) || candidateStems.has(stemmedWord)) {
      score += 24 + word.length;
      return;
    }

    const prefixMatch = candidateWords.find((candidateWord) => candidateWord.startsWith(word) || stemWord(candidateWord).startsWith(stemmedWord));
    if (prefixMatch && word.length >= 3) {
      score += 34 + word.length;
    }
  });

  return score;
}

function stemWord(word) {
  return word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word;
}

function findBest(query, candidates) {
  const ranked = candidates
    .map((name) => ({ name, score: scoreMatch(query, name) }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  const second = ranked[1];

  if (!best || best.score < 24) {
    return { name: query.trim(), score: 0, confidence: "unknown", note: "No clear match found" };
  }

  if (second && best.score - second.score < 10) {
    return { name: best.name, score: best.score, confidence: "ambiguous", note: `Could also mean ${second.name}` };
  }

  return {
    name: best.name,
    score: best.score,
    confidence: best.score >= 120 ? "exact" : "fuzzy",
    note: best.score >= 120 ? "Exact match" : "Best fuzzy match"
  };
}

function findBestArea(query) {
  const aliasMatch = getAreaAliasMatch(query);
  if (aliasMatch) return aliasMatch;
  return findBest(query, state.data.areas);
}

function findBestLocation(query) {
  const expandedQuery = expandLeadingAreaAlias(query);
  return findBest(expandedQuery, state.data.locations);
}

function getAreaAliasMatch(query) {
  const key = normalize(query);
  const area = state.data.areaAliases[key];
  if (!area) return null;

  return {
    name: area,
    score: 140,
    confidence: "exact",
    note: "Abbreviation match"
  };
}

function expandLeadingAreaAlias(query) {
  const trimmed = query.trim();
  const parts = trimmed.split(/\s+/);
  if (!parts.length) return trimmed;

  const first = normalize(parts[0]);
  const area = state.data.areaAliases[first];
  if (!area) return trimmed;

  return [area, ...parts.slice(1)].join(" ");
}

function parseRequirement(itemText) {
  const clean = itemText.trim();
  const parts = clean.split(/\s+/);
  const last = normalize(parts[parts.length - 1]);
  const lastTwo = normalize(parts.slice(-2).join(" "));
  const requirement = REQUIREMENT_ALIASES[lastTwo] || REQUIREMENT_ALIASES[last];

  if (!requirement) {
    return { itemText: clean, requirement: null };
  }

  const wordsToRemove = REQUIREMENT_ALIASES[lastTwo] ? 2 : 1;

  return {
    itemText: parts.slice(0, -wordsToRemove).join(" ").trim(),
    requirement
  };
}

function parseHints(text) {
  return text
    .split(/\r?\n/)
    .map((line, index) => parseLine(line, index + 1))
    .filter(Boolean);
}

function parseLine(rawLine, lineNumber) {
  const line = rawLine.trim();
  if (!line) return null;

  const pathParts = line.match(/^(.+?)\s+to\s+(.+)$/i);
  if (pathParts) {
    const area = findBestArea(pathParts[1]);
    const boss = findBest(pathParts[2], state.data.bosses);
    return buildHint("path", line, lineNumber, area, boss, null);
  }

  const itemLocationParts = line.match(/^(.+?)\s+(?:at|in|on)\s+(.+)$/i);
  if (itemLocationParts) {
    const parsedItem = parseRequirement(itemLocationParts[1]);
    const item = canonicalizeItemMatch(findBest(parsedItem.itemText, state.data.itemSearchNames));
    const destinationText = itemLocationParts[2];
    const location = findBestLocation(destinationText);
    const area = findBestArea(destinationText);
    const isLocationHint = location.score > area.score + 8 || location.confidence === "exact";
    return buildHint(isLocationHint ? "location" : "item", line, lineNumber, item, isLocationHint ? location : area, parsedItem.requirement);
  }

  return {
    type: "needs-review",
    line,
    lineNumber,
    left: { kind: "text", name: "Unknown" },
    right: { kind: "text", name: line },
    title: "Unrecognized hint format",
    detail: "Use: area to boss, item at area, or item at location.",
    mapTarget: null,
    needsReview: true
  };
}

function canonicalizeItemMatch(match) {
  const aliasName = ITEM_NAME_ALIASES[match.name];

  return {
    ...match,
    name: aliasName || match.name
  };
}

function buildHint(type, line, lineNumber, first, second, requirement) {
  const needsReview = [first.confidence, second.confidence].some((confidence) => confidence === "unknown" || confidence === "ambiguous");
  const reviewNotes = [first, second]
    .filter((match) => match.confidence === "unknown" || match.confidence === "ambiguous")
    .map((match) => match.note)
    .join("; ");

  if (type === "path") {
    return {
      type,
      line,
      lineNumber,
      left: { kind: "text", name: first.name },
      right: { kind: "boss", name: second.name, image: bossImage(second.name) },
      title: `${first.name} to ${second.name}`,
      detail: needsReview ? reviewNotes : "Path hint",
      mapTarget: first.name,
      requirement: null,
      needsReview
    };
  }

  if (type === "item") {
    return {
      type,
      line,
      lineNumber,
      left: { kind: "item", name: first.name, image: itemImage(first.name) },
      right: { kind: "text", name: second.name },
      title: `${first.name} at ${second.name}`,
      detail: needsReview ? reviewNotes : "Item hint",
      mapTarget: second.name,
      requirement,
      needsReview
    };
  }

  return {
    type,
    line,
    lineNumber,
    left: { kind: "item", name: first.name, image: itemImage(first.name) },
    right: { kind: "text", name: second.name },
    title: `${second.name} rewards ${first.name}`,
    detail: needsReview ? reviewNotes : "Location hint",
    mapTarget: getAreaFromLocation(second.name),
    requirement,
    needsReview
  };
}

function itemImage(name) {
  const imageName = ITEM_IMAGE_ALIASES[name] || DISPLAY_ITEM_ALIASES[name] || name;
  return `${IMAGE_ROOTS.items}${encodeURIComponent(imageName)}.png`;
}

function getShardNumber(name) {
  const match = name.match(/^Triforce Shard\s+([1-8])$/);
  return match ? match[1] : null;
}

function bossImage(name) {
  return `${IMAGE_ROOTS.bosses}${encodeURIComponent(name)}.png`;
}

function miscImage(name) {
  return `${IMAGE_ROOTS.misc}${encodeURIComponent(name)}.png`;
}

function renderGrid() {
  seaGrid.innerHTML = "";

  state.data.sectors.forEach((sector) => {
    const cell = document.createElement("div");
    cell.className = "sector";
    cell.dataset.sector = sector;

    const label = document.createElement("div");
    label.className = "sector-label";
    label.textContent = sector.replace(" Sector", "");

    const hintIcons = document.createElement("div");
    hintIcons.className = "sector-hint-icons";

    getSectorHints(sector).forEach((icon) => {
      hintIcons.appendChild(createMapIcon(icon));
    });

    const markerIcons = document.createElement("div");
    markerIcons.className = "sector-marker-icons";

    getStaticSectorIcons(sector).forEach((icon) => {
      markerIcons.appendChild(createMapIcon(icon));
    });

    cell.append(label, hintIcons, markerIcons);
    seaGrid.appendChild(cell);
  });

  renderAreaStrip();
}

function getStaticSectorIcons(sector) {
  const icons = [];

  if (state.settings.showHoHo && OLD_MAN_HO_HO_SECTORS.some((name) => normalize(name) === normalize(sector))) {
    icons.push({
      id: `old-man-ho-ho:${sector}`,
      type: "hoho",
      title: `Old Man Ho Ho at ${sector}`,
      image: itemImage("Old Man Ho Ho")
    });
  }

  if (state.settings.showBlueChu) {
    BLUE_CHU_JELLY_SECTORS.forEach((name, index) => {
      if (normalize(name) !== normalize(sector)) return;
      icons.push({
        id: `blue-chu-jelly:${sector}:${index}`,
        type: "blue-chu",
        title: `Blue Chu Jelly at ${sector}`,
        image: itemImage("Blue Chu Jelly")
      });
    });
  }

  return icons;
}

function getSectorHints(sector) {
  return state.hints
    .filter((hint) => hint.type !== "path" && hint.mapTarget && normalize(hint.mapTarget) === normalize(sector))
    .map((hint) => ({
      id: `${hint.type}:${hint.lineNumber}:${hint.title}`,
      type: hint.type,
      title: hint.title,
      image: hint.left?.image || null,
      itemName: hint.left?.name || ""
    }));
}

function createMapIcon(icon) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `map-icon ${icon.type}${state.checked[icon.id] ? " checked" : ""}`;
  button.title = `${icon.title} - click to mark checked`;
  button.addEventListener("click", () => toggleChecked(icon.id));

  if (icon.image) {
    const shardNumber = getShardNumber(icon.itemName || "");
    const image = document.createElement("img");
    image.src = icon.image;
    image.alt = "";
    button.appendChild(image);
    if (shardNumber) {
      const badge = document.createElement("span");
      badge.className = "shard-number";
      badge.textContent = shardNumber;
      button.appendChild(badge);
    }
  } else {
    button.textContent = icon.type === "path" ? "P" : icon.type === "item" ? "I" : "L";
  }

  return button;
}

function renderAreaStrip() {
  areaStrip.innerHTML = "";
  let renderedAreas = 0;

  TRACKED_AREAS.forEach((area) => {
    const areaHints = getAreaHints(area);
    if (!areaHints.length) return;
    renderedAreas += 1;

    const cell = document.createElement("div");
    cell.className = "area-cell";
    cell.title = area.name;

    const areaImage = document.createElement("img");
    areaImage.className = "area-image";
    areaImage.src = area.imageKind === "boss" ? bossImage(area.imageName) : miscImage(area.imageName);
    areaImage.alt = area.name;

    const hintIcons = document.createElement("div");
    hintIcons.className = "area-hint-icons";
    areaHints.forEach((icon) => {
      hintIcons.appendChild(createMapIcon(icon));
    });

    cell.append(areaImage, hintIcons);
    areaStrip.appendChild(cell);
  });

  areaStrip.hidden = renderedAreas === 0;
}

function getAreaHints(area) {
  return state.hints
    .filter((hint) => hint.type !== "path" && area.matchNames.some((name) => normalize(name) === normalize(hint.mapTarget)))
    .map((hint) => ({
      id: `${hint.type}:${hint.lineNumber}:${hint.title}`,
      type: hint.type,
      title: hint.title,
      image: hint.left?.image || null,
      itemName: hint.left?.name || ""
    }));
}

function renderHints() {
  const visibleHints = state.hints.filter((hint) => {
    if (state.filter === "all") return true;
    if (state.filter === "needs-review") return hint.needsReview || hint.type === "needs-review";
    return hint.type === state.filter;
  });

  hintCount.textContent = `${state.hints.length} ${state.hints.length === 1 ? "hint" : "hints"}`;
  hintList.innerHTML = "";

  if (!visibleHints.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = state.hints.length ? "No hints match this filter." : "Type hint notes to see them parsed here. Right-click a parsed hint to delete its note line.";
    hintList.appendChild(empty);
    return;
  }

  visibleHints.forEach((hint) => {
    const card = document.createElement("article");
    card.className = getHintCardClass(hint);
    card.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      removeHintLine(hint.lineNumber);
    });

    const flow = document.createElement("div");
    flow.className = "hint-flow";
    flow.append(renderHintSide(hint.left, "left", hint), renderArrow(), renderHintSide(hint.right, "right", hint));

    const meta = document.createElement("div");
    meta.className = "hint-meta";
    const lineText = document.createElement("span");
    lineText.className = "hint-line-text";
    lineText.textContent = `Line ${hint.lineNumber}: ${hint.needsReview ? hint.detail : labelForType(hint.type)}`;
    meta.append(renderHintStatus(hint), lineText);

    card.append(flow, meta);
    hintList.appendChild(card);
  });
}

function getHintCardClass(hint) {
  const classes = ["hint-card", hint.type];
  if (hint.requirement) classes.push(`requirement-${hint.requirement.key}`);
  if (hint.needsReview) classes.push("needs-review");
  return classes.join(" ");
}

function renderHintStatus(hint) {
  const status = document.createElement("span");
  status.className = "hint-status";

  if (hint.needsReview) {
    status.classList.add("review");
    status.textContent = "Review";
    return status;
  }

  if (hint.type === "path") {
    status.classList.add("path");
    status.textContent = "Path";
    return status;
  }

  if (hint.requirement) {
    status.classList.add(hint.requirement.key);
    status.textContent = hint.requirement.label;
    return status;
  }

  status.classList.add("neutral");
  status.textContent = labelForType(hint.type);
  return status;
}

function renderHintSide(side, position, hint) {
  const wrap = document.createElement("div");
  wrap.className = `hint-side ${position} ${side.kind}`;

  const name = document.createElement("span");
  name.className = "hint-name";
  name.textContent = side.name;

  if (side.image) {
    const image = document.createElement("img");
    image.className = `hint-image ${side.kind === "boss" ? "boss-image" : ""}`;
    image.src = side.image;
    image.alt = side.name;
    if (side.kind === "boss") {
      wrap.appendChild(image);
    } else if (position === "left") {
      const itemBox = document.createElement("div");
      itemBox.className = "stream-item-box";
      itemBox.appendChild(image);
      const shardNumber = getShardNumber(side.name);
      if (shardNumber) {
        const badge = document.createElement("span");
        badge.className = "shard-number";
        badge.textContent = shardNumber;
        itemBox.appendChild(badge);
      }
      if (hint.requirement || hint.needsReview) {
        itemBox.appendChild(renderHintStatus(hint));
      }
      wrap.append(itemBox, name);
    } else {
      wrap.append(name, image);
    }
  } else {
    wrap.appendChild(name);
  }

  return wrap;
}

function renderArrow() {
  const arrow = document.createElement("img");
  arrow.className = "hint-arrow";
  arrow.src = miscImage("Arrow");
  arrow.alt = "to";
  return arrow;
}

function labelForType(type) {
  if (type === "path") return "Path hint";
  if (type === "item") return "Item hint";
  if (type === "location") return "Location hint";
  return "Review";
}

function toggleChecked(id) {
  state.checked[id] = !state.checked[id];
  if (!state.checked[id]) delete state.checked[id];
  localStorage.setItem(CHECKED_KEY, JSON.stringify(state.checked));
  renderGrid();
}

function loadChecked() {
  try {
    return JSON.parse(localStorage.getItem(CHECKED_KEY)) || {};
  } catch {
    return {};
  }
}

function loadSettings() {
  const defaults = {
    pageBackground: "#f4f1e8",
    streamKey: "#00ff00",
    showHoHo: true,
    showBlueChu: true,
    streamMode: false,
    compactMode: false
  };

  try {
    return { ...defaults, ...(JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}) };
  } catch {
    return defaults;
  }
}

async function loadPreferences() {
  try {
    const response = await fetch(PREFERENCES_FILE, { cache: "no-store" });
    if (!response.ok) return;

    const preferences = await response.json();
    state.settings = { ...state.settings, ...preferences };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
    applySettings();
  } catch {
    // Opening the app without the launcher cannot read the preferences file.
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
  fetch(PREFERENCES_FILE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state.settings, null, 2)
  }).catch(() => {
    // Local storage remains the fallback when the launcher is not running.
  });
}

function applySettings() {
  document.documentElement.style.setProperty("--bg", state.settings.pageBackground);
  document.documentElement.style.setProperty("--stream-key", state.settings.streamKey);
  pageBackgroundInput.value = state.settings.pageBackground;
  streamKeyInput.value = state.settings.streamKey;
  showHoHoInput.checked = state.settings.showHoHo;
  showBlueChuInput.checked = state.settings.showBlueChu;
  streamModeInput.checked = state.settings.streamMode;
  compactModeInput.checked = state.settings.compactMode;
  document.body.classList.toggle("stream-mode", state.settings.streamMode);
  document.body.classList.toggle("compact-mode", state.settings.compactMode);
  renderGrid();
  renderAreaStrip();
}

function pushHistory(value) {
  if (state.isApplyingHistory) return;
  if (state.history[state.historyIndex] === value) return;

  state.history = state.history.slice(0, state.historyIndex + 1);
  state.history.push(value);
  state.historyIndex = state.history.length - 1;
  updateHistoryButtons();
}

function applyHistoryValue(value) {
  state.isApplyingHistory = true;
  hintInput.value = value;
  updateFromInput({ recordHistory: false });
  state.isApplyingHistory = false;
  updateHistoryButtons();
}

function undoNotes() {
  if (state.historyIndex <= 0) return;
  state.historyIndex -= 1;
  applyHistoryValue(state.history[state.historyIndex]);
}

function redoNotes() {
  if (state.historyIndex >= state.history.length - 1) return;
  state.historyIndex += 1;
  applyHistoryValue(state.history[state.historyIndex]);
}

function updateHistoryButtons() {
  undoButton.disabled = state.historyIndex <= 0;
  redoButton.disabled = state.historyIndex >= state.history.length - 1;
}

function removeHintLine(lineNumber) {
  const lines = hintInput.value.split(/\r?\n/);
  lines.splice(lineNumber - 1, 1);
  hintInput.value = lines.join("\n");
  updateFromInput();
}

function updateFromInput(options = {}) {
  const shouldRecordHistory = options.recordHistory !== false;
  state.hints = parseHints(hintInput.value);
  localStorage.setItem(STORAGE_KEY, hintInput.value);
  saveStatus.textContent = "Saved locally";
  if (shouldRecordHistory) pushHistory(hintInput.value);
  resizeHintInput();
  renderGrid();
  renderHints();
}

function resizeHintInput() {
  hintInput.style.height = "auto";
  hintInput.style.height = `${Math.max(180, hintInput.scrollHeight)}px`;
}

hintInput.addEventListener("input", () => {
  saveStatus.textContent = "Saving...";
  updateFromInput();
});

undoButton.addEventListener("click", undoNotes);
redoButton.addEventListener("click", redoNotes);

pageBackgroundInput.addEventListener("input", () => {
  state.settings.pageBackground = pageBackgroundInput.value;
  saveSettings();
  applySettings();
});

streamKeyInput.addEventListener("input", () => {
  state.settings.streamKey = streamKeyInput.value;
  saveSettings();
  applySettings();
});

showHoHoInput.addEventListener("change", () => {
  state.settings.showHoHo = showHoHoInput.checked;
  saveSettings();
  applySettings();
});

showBlueChuInput.addEventListener("change", () => {
  state.settings.showBlueChu = showBlueChuInput.checked;
  saveSettings();
  applySettings();
});

streamModeInput.addEventListener("change", () => {
  state.settings.streamMode = streamModeInput.checked;
  saveSettings();
  applySettings();
});

compactModeInput.addEventListener("change", () => {
  state.settings.compactMode = compactModeInput.checked;
  saveSettings();
  applySettings();
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    state.filter = tab.dataset.filter;
    renderHints();
  });
});

resetRunButton.addEventListener("click", () => {
  const shouldReset = window.confirm("Clear notes and checked icons for this run?");
  if (!shouldReset) return;

  hintInput.value = "";
  state.checked = {};
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(CHECKED_KEY);
  state.history = [];
  state.historyIndex = -1;
  updateFromInput();
});

hintInput.value = localStorage.getItem(STORAGE_KEY) || "";
applySettings();
loadPreferences();
pushHistory(hintInput.value);
updateHistoryButtons();
renderHints();
loadData();
