const STORAGE_KEY = "ww-rando-hint-tracker";
const CHECKED_KEY = "ww-rando-hint-tracker-checked";
const SETTINGS_KEY = "ww-rando-hint-tracker-settings";
const PREFERENCES_FILE = "preferences.json";
const APP_VERSION = "1.2.0";

const DEFAULT_SETTINGS = {
  pageBackground: "#f4f1e8",
  streamKey: "#00ff00",
  showHoHo: true,
  showBlueChu: true,
  streamMode: false,
  compactMode: false,
  chromeHidden: false,
  mapSize: null,
  mapIconSize: 100,
  hintPanelWidth: 360,
  hintArrowPosition: 50,
  startingGearShards: []
};

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
  "Thorned Fairy Island",
  "Cliff Plateau Isles",
  "Horseshoe Island",
  "Angular Isles",
  "Boating Course"
];

const TRACKED_AREAS = [
  { name: "Dragon Roost Cavern", imageKind: "boss", imageName: "Gohma", matchNames: ["Dragon Roost Cavern"] },
  { name: "Forbidden Woods", imageKind: "boss", imageName: "Kalle Demos", matchNames: ["Forbidden Woods"] },
  { name: "Tower of the Gods", imageKind: "boss", imageName: "Gohdan", matchNames: ["Tower of the Gods"], excludedMapTargets: ["Tower of the Gods Sector"] },
  { name: "Forsaken Fortress", imageKind: "boss", imageName: "Helmaroc King", matchNames: ["Forsaken Fortress"], excludedMapTargets: ["Forsaken Fortress Sector"] },
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
  "Bombs": "Bomb",
  "Grapple": "Grappling Hook"
};

const DISPLAY_ITEM_ALIASES = {
  "Triforce Shard": "Triforce of Courage"
};

const NUMBERED_ITEM_GROUPS = [
  { baseName: "Treasure Chart", count: 46, aliases: ["Treasure Map"] },
  { baseName: "Triforce Chart", count: 8, aliases: [] }
];

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
const versionLabel = document.querySelector("#versionLabel");
const dataStatus = document.querySelector("#dataStatus");
const resetRunButton = document.querySelector("#resetRunButton");
const hideChromeButton = document.querySelector("#hideChromeButton");
const showChromeButton = document.querySelector("#showChromeButton");
const undoButton = document.querySelector("#undoButton");
const redoButton = document.querySelector("#redoButton");
const pageBackgroundInput = document.querySelector("#pageBackgroundInput");
const streamKeyInput = document.querySelector("#streamKeyInput");
const showHoHoInput = document.querySelector("#showHoHoInput");
const showBlueChuInput = document.querySelector("#showBlueChuInput");
const streamModeInput = document.querySelector("#streamModeInput");
const compactModeInput = document.querySelector("#compactModeInput");
const mapIconSizeInput = document.querySelector("#mapIconSizeInput");
const hintArrowPositionInput = document.querySelector("#hintArrowPositionInput");
const mapResizeFrame = document.querySelector("#mapResizeFrame");
const mapResizeHandles = document.querySelectorAll(".map-resize-handle");
const hintPanel = document.querySelector(".hint-panel");
const hintPanelResizeHandle = document.querySelector("#hintPanelResizeHandle");
const blueChuCount = document.querySelector("#blueChuCount");
const shardStatusList = document.querySelector("#shardStatusList");
const shardPreview = document.querySelector("#shardPreview");
const shardPreviewImage = document.querySelector("#shardPreviewImage");
const browseRandoFolderButton = document.querySelector("#browseRandoFolderButton");
const syncRandoConfigButton = document.querySelector("#syncRandoConfigButton");
const randoFolderInput = document.querySelector("#randoFolderInput");
const randoFolderStatus = document.querySelector("#randoFolderStatus");
const tabs = document.querySelectorAll(".tab");
let randoFolderHandle = null;
let randoFolderFiles = null;

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
    const itemSearchNames = buildItemSearchNames(items);
    const locationData = parseLocationData(locationText);

    state.data = {
      items,
      itemSearchNames,
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

function buildItemSearchNames(items) {
  const names = [...items, ...Object.keys(ITEM_NAME_ALIASES)];

  NUMBERED_ITEM_GROUPS.forEach((group) => {
    if (!items.some((item) => normalize(item) === normalize(group.baseName))) return;

    for (let number = 1; number <= group.count; number += 1) {
      names.push(`${group.baseName} ${number}`);
      group.aliases.forEach((alias) => names.push(`${alias} ${number}`));
    }
  });

  return unique(names);
}

function preloadStaticIconImages() {
  ["Old Man Ho Ho", "Blue Chu Jelly"].forEach((name) => {
    const image = new Image();
    image.src = itemImage(name);
  });
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
  const numberedAlias = getNumberedItemAlias(match.name);

  return {
    ...match,
    name: aliasName || numberedAlias || match.name
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
  const imageName = ITEM_IMAGE_ALIASES[name] || DISPLAY_ITEM_ALIASES[name] || getNumberedItemBaseName(name) || name;
  return `${IMAGE_ROOTS.items}${encodeURIComponent(imageName)}.png`;
}

function getShardNumber(name) {
  const match = name.match(/^Triforce Shard\s+([1-8])$/);
  return match ? match[1] : null;
}

function getNumberedItemAlias(name) {
  const match = String(name || "").match(/^(Treasure Map)\s+([1-9]|[1-3][0-9]|4[0-6])$/i);
  return match ? `Treasure Chart ${match[2]}` : null;
}

function getNumberedItemBaseName(name) {
  const normalizedName = String(name || "");
  const group = NUMBERED_ITEM_GROUPS.find((itemGroup) => {
    const escaped = itemGroup.baseName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`^${escaped}\\s+\\d+$`, "i").test(normalizedName);
  });

  return group ? group.baseName : null;
}

function getItemNumberBadge(name) {
  const shardNumber = getShardNumber(name);
  if (shardNumber) return { className: "shard-number", number: shardNumber };

  const chartMatch = String(name || "").match(/^(?:Treasure Chart|Triforce Chart)\s+(\d+)$/i);
  if (chartMatch) return { className: "chart-number", number: chartMatch[1] };

  return null;
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
    cell.addEventListener("dragover", handleSectorDragOver);
    cell.addEventListener("dragleave", handleSectorDragLeave);
    cell.addEventListener("drop", (event) => handleSectorDrop(event, sector));

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
  renderMapSideTab();
}

function renderMapSideTab() {
  blueChuCount.closest(".jelly-counter").hidden = !state.settings.showBlueChu;
  blueChuCount.textContent = Object.keys(state.checked).filter((id) => id.startsWith("blue-chu-jelly:")).length;
  shardStatusList.innerHTML = "";

  for (let number = 1; number <= 8; number += 1) {
    const shardName = `Triforce Shard ${number}`;
    const shardHints = getShardHints(number);
    const shardHintIds = shardHints.map(getHintIconId);
    const fallbackId = `triforce-shard-status:${number}`;
    const isHinted = shardHints.length > 0;
    const isChecked = shardHintIds.length ? shardHintIds.every((id) => state.checked[id]) : Boolean(state.checked[fallbackId]);
    const isStartingGear = state.settings.startingGearShards.includes(number);

    const button = document.createElement("button");
    button.type = "button";
    button.draggable = true;
    button.dataset.shardNumber = number;
    button.className = `shard-status${isHinted ? " hinted" : ""}${isChecked ? " checked" : ""}${isStartingGear ? " starting" : ""}`;
    button.title = `${shardName}${isStartingGear ? " - starting gear" : isHinted ? "" : " - not hinted"}${isChecked ? " - checked" : ""}`;
    button.addEventListener("click", () => {
      const nextChecked = !isChecked;
      setChecked(fallbackId, nextChecked);
      shardHintIds.forEach((id) => setChecked(id, nextChecked));
      localStorage.setItem(CHECKED_KEY, JSON.stringify(state.checked));
      renderGrid();
    });
    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      toggleStartingGearShard(number);
    });
    button.addEventListener("dragstart", (event) => {
      hideShardPreview();
      event.dataTransfer.setData("text/plain", `Triforce Shard ${number}`);
      event.dataTransfer.setData("application/x-wwr-shard", String(number));
      event.dataTransfer.effectAllowed = "copy";
    });
    button.addEventListener("mouseenter", () => showShardPreview(shardName));
    button.addEventListener("focus", () => showShardPreview(shardName));
    button.addEventListener("mouseleave", hideShardPreview);
    button.addEventListener("blur", hideShardPreview);

    const image = document.createElement("img");
    image.src = itemImage(shardName);
    image.alt = shardName;
    button.appendChild(image);
    const badge = document.createElement("span");
    badge.className = "item-number shard-number";
    badge.textContent = number;
    button.appendChild(badge);
    if (isStartingGear) {
      const cross = document.createElement("span");
      cross.className = "starting-cross";
      button.appendChild(cross);
    }
    shardStatusList.appendChild(button);
  }
}

function getShardHints(number) {
  const shardName = `Triforce Shard ${number}`;
  return state.hints.filter((hint) => hint.left?.name === shardName);
}

function showShardPreview(shardName) {
  shardPreviewImage.src = miscImage(`${shardName} Highlight`);
  shardPreviewImage.alt = shardName;
  shardPreview.hidden = false;
}

function hideShardPreview() {
  shardPreview.hidden = true;
}

function toggleStartingGearShard(number) {
  const startingShards = new Set(state.settings.startingGearShards);
  if (startingShards.has(number)) {
    startingShards.delete(number);
  } else {
    startingShards.add(number);
  }

  state.settings.startingGearShards = [...startingShards].sort((a, b) => a - b);
  saveSettings();
  renderGrid();
}

function handleSectorDragOver(event) {
  if (!event.dataTransfer.types.includes("application/x-wwr-shard")) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
  event.currentTarget.classList.add("drag-target");
}

function handleSectorDrop(event, sector) {
  const shardNumber = Number(event.dataTransfer.getData("application/x-wwr-shard"));
  event.currentTarget.classList.remove("drag-target");
  if (!shardNumber) return;

  event.preventDefault();
  appendHintLine(`Triforce Shard ${shardNumber} at ${sector}`);
}

function handleSectorDragLeave(event) {
  event.currentTarget.classList.remove("drag-target");
}

function appendHintLine(line) {
  const currentText = hintInput.value.trimEnd();
  hintInput.value = currentText ? `${currentText}\n${line}` : line;
  updateFromInput();
}

function getStaticSectorIcons(sector) {
  const icons = [];

  if (state.settings.showHoHo && OLD_MAN_HO_HO_SECTORS.some((name) => normalize(name) === normalize(sector))) {
    icons.push({
      id: `old-man-ho-ho:${sector}`,
      type: "hoho",
      title: `Old Man Ho Ho at ${sector}`,
      image: itemImage("Old Man Ho Ho"),
      anchorX: 33
    });
  }

  if (state.settings.showBlueChu) {
    const jellyMatches = BLUE_CHU_JELLY_SECTORS
      .map((name, index) => ({ name, index }))
      .filter((item) => normalize(item.name) === normalize(sector));
    const jellyAnchors = jellyMatches.length > 1 ? [58, 76] : [67];

    jellyMatches.forEach((item, localIndex) => {
      icons.push({
        id: `blue-chu-jelly:${sector}:${item.index}`,
        type: "blue-chu",
        title: `Blue Chu Jelly at ${sector}`,
        image: itemImage("Blue Chu Jelly"),
        anchorX: jellyAnchors[localIndex] || 67
      });
    });
  }

  return icons;
}

function getSectorHints(sector) {
  return state.hints
    .filter((hint) => isHintForSector(hint, sector))
    .map((hint) => ({
      id: getHintIconId(hint),
      type: hint.type,
      title: hint.title,
      image: hint.left?.image || null,
      itemName: hint.left?.name || ""
    }));
}

function getHintIconId(hint) {
  return `${hint.type}:${hint.lineNumber}:${hint.title}`;
}

function isHintForSector(hint, sector) {
  if (hint.type === "path" || !hint.mapTarget) return false;

  const target = normalize(hint.mapTarget);
  const sectorKey = normalize(sector);

  if (sectorKey === normalize("Forsaken Fortress")) {
    return target === normalize("Forsaken Fortress Sector");
  }

  return target === sectorKey;
}

function createMapIcon(icon) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `map-icon ${icon.type}${state.checked[icon.id] ? " checked" : ""}`;
  button.title = `${icon.title} - click to mark checked`;
  if (icon.anchorX) button.style.left = `${icon.anchorX}%`;
  button.addEventListener("click", () => toggleChecked(icon.id));

  if (icon.image) {
    const itemBadge = getItemNumberBadge(icon.itemName || "");
    const image = document.createElement("img");
    image.src = icon.image;
    image.alt = "";
    button.appendChild(image);
    if (itemBadge) {
      const badge = document.createElement("span");
      badge.className = `item-number ${itemBadge.className}`;
      badge.textContent = itemBadge.number;
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
    .filter((hint) => {
      if (hint.type === "path") return false;
      if (area.excludedMapTargets?.some((name) => normalize(name) === normalize(hint.mapTarget))) return false;
      return area.matchNames.some((name) => normalize(name) === normalize(hint.mapTarget));
    })
    .map((hint) => ({
      id: getHintIconId(hint),
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
      const itemBadge = getItemNumberBadge(side.name);
      if (itemBadge) {
        const badge = document.createElement("span");
        badge.className = `item-number ${itemBadge.className}`;
        badge.textContent = itemBadge.number;
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

function setChecked(id, isChecked) {
  if (isChecked) {
    state.checked[id] = true;
  } else {
    delete state.checked[id];
  }
}

function loadChecked() {
  try {
    return JSON.parse(localStorage.getItem(CHECKED_KEY)) || {};
  } catch {
    return {};
  }
}

function loadSettings() {
  return { ...DEFAULT_SETTINGS, ...readStoredSettings() };
}

function readStoredSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
  } catch {
    return {};
  }
}

async function loadPreferences() {
  try {
    const response = await fetch(PREFERENCES_FILE, { cache: "no-store" });
    if (!response.ok) return;

    const preferences = await response.json();
    state.settings = { ...DEFAULT_SETTINGS, ...preferences, ...readStoredSettings() };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
    applySettings();
  } catch {
    // Browser storage remains the source of truth when preferences.json cannot be read.
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
  if (!canWritePreferencesFile()) return;

  fetch(PREFERENCES_FILE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state.settings, null, 2)
  }).catch(() => {
    // Local storage remains the fallback when the launcher is not running.
  });
}

function canWritePreferencesFile() {
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

function applySettings() {
  document.documentElement.style.setProperty("--bg", state.settings.pageBackground);
  document.documentElement.style.setProperty("--stream-key", state.settings.streamKey);
  document.documentElement.style.setProperty("--hint-panel-width", `${state.settings.hintPanelWidth}px`);
  document.documentElement.style.setProperty("--hint-arrow-position", `${state.settings.hintArrowPosition}%`);
  if (state.settings.mapSize) {
    document.documentElement.style.setProperty("--user-map-size", `${state.settings.mapSize}px`);
  } else {
    document.documentElement.style.removeProperty("--user-map-size");
  }
  applyMapIconSize();
  pageBackgroundInput.value = state.settings.pageBackground;
  streamKeyInput.value = state.settings.streamKey;
  showHoHoInput.checked = state.settings.showHoHo;
  showBlueChuInput.checked = state.settings.showBlueChu;
  streamModeInput.checked = state.settings.streamMode;
  compactModeInput.checked = state.settings.compactMode;
  mapIconSizeInput.value = state.settings.mapIconSize;
  hintArrowPositionInput.value = state.settings.hintArrowPosition;
  document.body.classList.toggle("stream-mode", state.settings.streamMode);
  document.body.classList.toggle("compact-mode", state.settings.compactMode);
  document.body.classList.toggle("chrome-hidden", state.settings.chromeHidden);
  renderGrid();
}

function applyMapIconSize() {
  const mapSize = seaGrid.getBoundingClientRect().width || state.settings.mapSize || 460;
  const sectorSize = mapSize / 7;
  const sliderScale = state.settings.mapIconSize / 100;
  const iconSize = clampNumber(sectorSize * 0.25 * sliderScale, 10, sectorSize * 0.32);
  document.documentElement.style.setProperty("--item-map-icon-size", `${Math.round(iconSize)}px`);
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getCurrentMapSize() {
  return Math.round(seaGrid.getBoundingClientRect().width || state.settings.mapSize || 460);
}

async function browseRandoFolder() {
  if (window.showDirectoryPicker) {
    try {
      randoFolderHandle = await window.showDirectoryPicker();
      randoFolderFiles = null;
      randoFolderStatus.textContent = randoFolderHandle.name;
      syncRandoConfigButton.disabled = false;
    } catch (error) {
      if (error.name !== "AbortError") {
        randoFolderStatus.textContent = "Choose folder with randomizer .exe";
      }
    }
    return;
  }

  randoFolderInput.click();
}

async function readLinkedConfigText() {
  if (randoFolderHandle) {
    const configHandle = await randoFolderHandle.getFileHandle("config.yaml");
    const configFile = await configHandle.getFile();
    return configFile.text();
  }

  if (randoFolderFiles) {
    const configFile = [...randoFolderFiles].find((file) => {
      const path = file.webkitRelativePath || file.name;
      return /(^|\/)config\.yaml$/i.test(path);
    });
    if (!configFile) throw new Error("config.yaml not found");
    return configFile.text();
  }

  throw new Error("No randomizer folder linked");
}

function getYamlBoolean(text, key) {
  const match = text.match(new RegExp(`^\\s*${key}\\s*:\\s*(true|false)\\b`, "im"));
  return match ? match[1].toLowerCase() === "true" : false;
}

function getYamlListSection(text, sectionName) {
  const lines = text.split(/\r?\n/);
  const values = [];
  const sectionIndex = lines.findIndex((line) => new RegExp(`^\\s*${sectionName}\\s*:`).test(line));
  if (sectionIndex < 0) return values;

  const sectionLine = lines[sectionIndex];
  const inlineMatch = sectionLine.match(/:\s*\[(.*)\]\s*(?:#.*)?$/);
  if (inlineMatch) {
    return inlineMatch[1]
      .split(",")
      .map(cleanYamlValue)
      .filter(Boolean);
  }

  const baseIndent = sectionLine.match(/^\s*/)[0].length;
  for (let index = sectionIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim() || line.trimStart().startsWith("#")) continue;

    const indent = line.match(/^\s*/)[0].length;
    if (indent <= baseIndent && !line.trimStart().startsWith("-")) break;

    const itemMatch = line.match(/^\s*-\s*(.*?)\s*(?:#.*)?$/);
    if (itemMatch) values.push(cleanYamlValue(itemMatch[1]));
  }

  return values.filter(Boolean);
}

function cleanYamlValue(value) {
  return String(value || "")
    .trim()
    .replace(/^["']|["']$/g, "");
}

function getStartingGearShards(configText) {
  return getYamlListSection(configText, "starting_gear")
    .map((item) => item.match(/^Triforce Shard\s+([1-8])$/i))
    .filter(Boolean)
    .map((match) => Number(match[1]));
}

function applyRandoConfig(configText) {
  const hoHoHints = getYamlBoolean(configText, "ho_ho_triforce_hints") || getYamlBoolean(configText, "ho_ho_hints");
  const progressionSpoilsTrading = getYamlBoolean(configText, "progression_spoils_trading");
  const progressionLongSidequests = getYamlBoolean(configText, "progression_long_sidequests");
  const excludedLocations = getYamlListSection(configText, "excluded_locations").map(normalize);
  const potionShopExcluded = excludedLocations.includes(normalize("Windfall Island - Potion Shop 15 Blue Chu"));

  state.settings.showHoHo = hoHoHints;
  state.settings.showBlueChu = progressionSpoilsTrading && progressionLongSidequests && !potionShopExcluded;
  state.settings.startingGearShards = getStartingGearShards(configText);
  saveSettings();
  applySettings();
}

const seaGridResizeObserver = new ResizeObserver(() => {
  applyMapIconSize();
});
seaGridResizeObserver.observe(seaGrid);

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
  hintInput.style.height = `${Math.max(135, hintInput.scrollHeight)}px`;
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
  renderGrid();
});

showBlueChuInput.addEventListener("change", () => {
  state.settings.showBlueChu = showBlueChuInput.checked;
  saveSettings();
  renderGrid();
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

mapIconSizeInput.addEventListener("input", () => {
  state.settings.mapIconSize = Number(mapIconSizeInput.value);
  applyMapIconSize();
  saveSettings();
});

hintArrowPositionInput.addEventListener("input", () => {
  state.settings.hintArrowPosition = Number(hintArrowPositionInput.value);
  document.documentElement.style.setProperty("--hint-arrow-position", `${state.settings.hintArrowPosition}%`);
  saveSettings();
});

browseRandoFolderButton.addEventListener("click", browseRandoFolder);

randoFolderInput.addEventListener("change", () => {
  randoFolderFiles = randoFolderInput.files;
  randoFolderHandle = null;
  const firstFile = randoFolderFiles?.[0];
  const folderName = firstFile?.webkitRelativePath?.split("/")[0] || "Folder linked";
  randoFolderStatus.textContent = randoFolderFiles?.length ? folderName : "Choose folder with randomizer .exe";
  syncRandoConfigButton.disabled = !randoFolderFiles?.length;
});

syncRandoConfigButton.addEventListener("click", async () => {
  try {
    syncRandoConfigButton.disabled = true;
    randoFolderStatus.textContent = "Syncing...";
    const configText = await readLinkedConfigText();
    applyRandoConfig(configText);
    randoFolderStatus.textContent = "Synced";
  } catch {
    randoFolderStatus.textContent = "config.yaml not found";
  } finally {
    syncRandoConfigButton.disabled = !(randoFolderHandle || randoFolderFiles?.length);
  }
});

hideChromeButton.addEventListener("click", () => {
  state.settings.chromeHidden = true;
  saveSettings();
  applySettings();
});

function getResizeDelta(edge, deltaX, deltaY) {
  const horizontalDelta = edge.includes("left") ? -deltaX : edge.includes("right") ? deltaX : 0;
  const verticalDelta = edge.includes("top") ? -deltaY : edge.includes("bottom") ? deltaY : 0;

  if (horizontalDelta && verticalDelta) {
    return Math.abs(horizontalDelta) > Math.abs(verticalDelta) ? horizontalDelta : verticalDelta;
  }

  return horizontalDelta || verticalDelta;
}

function startMapResize(event) {
  if (event.button !== 0) return;
  event.preventDefault();
  const startX = event.clientX;
  const startY = event.clientY;
  const startSize = getCurrentMapSize();
  const minSize = 280;
  const maxSize = 760;
  const edge = event.currentTarget.dataset.resizeEdge;
  const handle = event.currentTarget;

  mapResizeFrame.classList.add("resizing");
  handle.setPointerCapture(event.pointerId);

  const handleMove = (moveEvent) => {
    if (!(moveEvent.buttons & 1)) return;
    const delta = getResizeDelta(edge, moveEvent.clientX - startX, moveEvent.clientY - startY);
    const nextSize = clampNumber(startSize + delta, minSize, maxSize);
    state.settings.mapSize = Math.round(nextSize);
    document.documentElement.style.setProperty("--user-map-size", `${state.settings.mapSize}px`);
    applyMapIconSize();
  };

  const handleUp = (upEvent) => {
    mapResizeFrame.classList.remove("resizing");
    if (handle.hasPointerCapture(upEvent.pointerId)) handle.releasePointerCapture(upEvent.pointerId);
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
    window.removeEventListener("pointercancel", handleUp);
    saveSettings();
  };

  window.addEventListener("pointermove", handleMove);
  window.addEventListener("pointerup", handleUp);
  window.addEventListener("pointercancel", handleUp);
}

mapResizeHandles.forEach((handle) => {
  handle.addEventListener("pointerdown", startMapResize);
});

hintPanelResizeHandle.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  event.preventDefault();
  const startX = event.clientX;
  const startWidth = hintPanel.getBoundingClientRect().width || state.settings.hintPanelWidth;
  const minWidth = 240;
  const maxWidth = Math.min(520, window.innerWidth - 24);

  hintPanel.classList.add("resizing");
  hintPanelResizeHandle.setPointerCapture(event.pointerId);

  const handleMove = (moveEvent) => {
    if (!(moveEvent.buttons & 1)) return;
    const nextWidth = clampNumber(startWidth + startX - moveEvent.clientX, minWidth, maxWidth);
    state.settings.hintPanelWidth = Math.round(nextWidth);
    document.documentElement.style.setProperty("--hint-panel-width", `${state.settings.hintPanelWidth}px`);
  };

  const handleUp = (upEvent) => {
    hintPanel.classList.remove("resizing");
    if (hintPanelResizeHandle.hasPointerCapture(upEvent.pointerId)) hintPanelResizeHandle.releasePointerCapture(upEvent.pointerId);
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
    window.removeEventListener("pointercancel", handleUp);
    saveSettings();
  };

  window.addEventListener("pointermove", handleMove);
  window.addEventListener("pointerup", handleUp);
  window.addEventListener("pointercancel", handleUp);
});

showChromeButton.addEventListener("click", () => {
  state.settings.chromeHidden = false;
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
  state.settings.startingGearShards = [];
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(CHECKED_KEY);
  saveSettings();
  state.history = [];
  state.historyIndex = -1;
  updateFromInput();
});

hintInput.value = localStorage.getItem(STORAGE_KEY) || "";
versionLabel.textContent = `v${APP_VERSION}`;
applySettings();
preloadStaticIconImages();
loadPreferences();
pushHistory(hintInput.value);
updateHistoryButtons();
renderHints();
loadData();
