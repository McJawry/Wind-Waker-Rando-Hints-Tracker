const STORAGE_KEY = "ww-rando-hint-tracker";
const CHECKED_KEY = "ww-rando-hint-tracker-checked";
const SETTINGS_KEY = "ww-rando-hint-tracker-settings";
const SPHERE_STORAGE_KEY = "ww-rando-hint-tracker-spheres";
const SPHERE_NOTES_STORAGE_KEY = "ww-rando-hint-tracker-sphere-notes";
const PREFERENCES_FILE = "preferences.json";
const APP_VERSION = "1.4.0-beta-v5-optimized-v6";

const DEFAULT_SETTINGS = {
  pageBackground: "#f4f1e8",
  streamKey: "#00ff00",
  showHoHo: true,
  showBlueChu: true,
  streamMode: false,
  compactMode: false,
  automaticMode: false,
  automaticLastLocation: false,
  chromeHidden: false,
  mapSize: null,
  mapIconSize: 100,
  hintPanelWidth: 360,
  hintArrowPosition: 50,
  assignmentMode: "hint",
  mapView: "map",
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

const DUNGEON_ENTRANCE_TRACKERS = [
  { abbreviation: "DRC", name: "Dragon Roost Cavern" },
  { abbreviation: "FW", name: "Forbidden Woods" },
  { abbreviation: "TotG", name: "Tower of the Gods" },
  { abbreviation: "ET", name: "Earth Temple" },
  { abbreviation: "WT", name: "Wind Temple" }
];
const BOSS_LOCATIONS = {
  Gohma: "Dragon Roost Cavern - Gohma Heart Container",
  "Kalle Demos": "Forbidden Woods - Kalle Demos Heart Container",
  Gohdan: "Tower of the Gods - Gohdan Heart Container",
  "Helmaroc King": "Forsaken Fortress - Helmaroc King Heart Container",
  Jalhalla: "Earth Temple - Jalhalla Heart Container",
  Molgera: "Wind Temple - Molgera Heart Container",
  Ganondorf: "Ganon's Tower - Defeat Ganondorf"
};
const DUNGEON_REQUIRED_BOSSES = {
  "Dragon Roost Cavern": "Gohma",
  "Forbidden Woods": "Kalle Demos",
  "Tower of the Gods": "Gohdan",
  "Forsaken Fortress": "Helmaroc King",
  "Earth Temple": "Jalhalla",
  "Wind Temple": "Molgera"
};
const REQUIRED_BOSS_OPTION_KEYS = {
  Gohma: "Gohma_Required",
  "Kalle Demos": "Kalle_Demos_Required",
  Gohdan: "Gohdan_Required",
  "Helmaroc King": "Helmaroc_King_Required",
  Jalhalla: "Jalhalla_Required",
  Molgera: "Molgera_Required"
};
const IMPLICIT_STARTING_GEAR = ["Wind Waker", "Wind's Requiem", "Progressive Sail"];
const DUNGEON_KEY_LOGIC = [
  { dungeon: "Dragon Roost Cavern", smallKeyCount: 4 },
  { dungeon: "Forbidden Woods", smallKeyCount: 1 },
  { dungeon: "Tower of the Gods", smallKeyCount: 2 },
  { dungeon: "Earth Temple", smallKeyCount: 3 },
  { dungeon: "Wind Temple", smallKeyCount: 2 }
];
const MAX_LOGIC_ITEM_COPIES = {
  "Empty Bottle": 4,
  "Progressive Bow": 3,
  "Progressive Bomb Bag": 2,
  "Progressive Magic Meter": 2,
  "Progressive Picto Box": 2,
  "Progressive Quiver": 2,
  "Progressive Sail": 2,
  "Progressive Shield": 2,
  "Progressive Sword": 4,
  "Progressive Wallet": 2
};

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
  "Bottle": "Empty Bottle",
  "Cheese": "Triforce Shard",
  "Triforce Shard": "Triforce Shard",
  "Cheese 1": "Triforce Shard 1",
  "Cheese 2": "Triforce Shard 2",
  "Cheese 3": "Triforce Shard 3",
  "Cheese 4": "Triforce Shard 4",
  "Cheese 5": "Triforce Shard 5",
  "Cheese 6": "Triforce Shard 6",
  "Cheese 7": "Triforce Shard 7",
  "Cheese 8": "Triforce Shard 8",
  "Bombs": "Bomb",
  "Grapple": "Grappling Hook",
  "Hook": "Hookshot"
};

const DISPLAY_ITEM_ALIASES = {
  "Triforce Shard": "Triforce of Courage"
};

const NUMBERED_ITEM_GROUPS = [
  { baseName: "Treasure Chart", count: 46, aliases: ["Treasure Map"] },
  { baseName: "Triforce Chart", count: 8, aliases: [] }
];

const LOCATION_CATEGORY_OPTION_KEYS = {
  "Dungeon": ["progression_dungeons"],
  "Boss": ["progression_dungeons"],
  "Randomizable Miniboss Room": ["progression_dungeons"],
  "Tingle Chest": ["progression_tingle_chests"],
  "Dungeon Secret": ["progression_dungeon_secrets"],
  "Puzzle Secret Cave": ["progression_puzzle_secret_caves"],
  "Combat Secret Cave": ["progression_combat_secret_caves"],
  "Savage Labyrinth": ["progression_savage_labyrinth"],
  "Great Fairy": ["progression_great_fairies"],
  "Short Sidequest": ["progression_short_sidequests"],
  "Short Side Quest": ["progression_short_sidequests"],
  "Long Sidequest": ["progression_long_sidequests"],
  "Long Side Quest": ["progression_long_sidequests"],
  "Spoils Trading": ["progression_spoils_trading"],
  "Minigame": ["progression_minigames"],
  "Battlesquid": ["progression_battlesquid"],
  "Battle Squid": ["progression_battlesquid"],
  "Free Gift": ["progression_free_gifts"],
  "Mail": ["progression_mail"],
  "Platform": ["progression_platforms_rafts"],
  "Raft": ["progression_platforms_rafts"],
  "Submarine": ["progression_submarines"],
  "Eye Reef Chest": ["progression_eye_reef_chests"],
  "Eye Reef Chests": ["progression_eye_reef_chests"],
  "Big Octo": ["progression_big_octos_gunboats"],
  "Gunboat": ["progression_big_octos_gunboats"],
  "Sunken Treasure": ["progression_triforce_charts", "progression_treasure_charts"],
  "Expensive Purchase": ["progression_expensive_purchases"],
  "Island Puzzle": ["progression_island_puzzles"],
  "Misc": ["progression_misc"],
  "Other Chest": ["progression_misc"],
  "Obscure": ["progression_obscure"],
  "Always Progression": ["__always__"]
};


const LOCATION_CATEGORY_ALIASES = {
  "Crescent Moon Island - Chest on Island": "Crescent Moon Island - Chest",
  "Dragon Roost Island - Baito Mail Game": "Dragon Roost Island - Rito Aerie - Mail Sorting",
  "Fire Mountain - Interior Chest": "Fire Mountain - Cave - Chest",
  "Five Eye Reef - Destroy Cannons and Gunboats": "Five Eye Reef - Destroy Cannons",
  "Hyrule Castle - Sword Chamber Chest": "Hyrule - Master Sword Chamber",
  "Ice Ring Isle - Interior Chest": "Ice Ring Isle - Cave - Chest",
  "Outset Island - Mesa's House Chest": "Outset Island - Mesa the Grasscutter's House",
  "Outset Island - Under Link's House": "Outset Island - Underneath Link's House",
  "Pawprint Isle - Chu Chu Cave Chest": "Pawprint Isle - Chuchu Cave - Chest",
  "Rock Spire Isle - Beedle 500 Rupee Item": "Rock Spire Isle - Beedle's Special Shop Ship - 500 Rupee Item",
  "Rock Spire Isle - Beedle 900 Rupee Item": "Rock Spire Isle - Beedle's Special Shop Ship - 900 Rupee Item",
  "Rock Spire Isle - Beedle 950 Rupee Item": "Rock Spire Isle - Beedle's Special Shop Ship - 950 Rupee Item",
  "Windfall Island - Battle Squid First Prize": "Windfall Island - Battlesquid - First Prize",
  "Windfall Island - Battle Squid Second Prize": "Windfall Island - Battlesquid - Second Prize",
  "Windfall Island - Battle Squid Under 20 Prize": "Windfall Island - Battlesquid - Under 20 Shots Prize",
  "Windfall Island - Cafe Postman Delivery": "Windfall Island - Cafe Bar - Postman",
  "Windfall Island - Lenzo Become Assistant": "Windfall Island - Lenzo's House - Become Lenzo's Assistant",
  "Windfall Island - Lenzo House Left Chest": "Windfall Island - Lenzo's House - Left Chest",
  "Windfall Island - Lenzo House Right Chest": "Windfall Island - Lenzo's House - Right Chest",
  "Windfall Island - Mila Catch Thief": "Windfall Island - Mila - Follow the Thief",
  "Windfall Island - Sam Decorate Island": "Windfall Island - Sam - Decorate the Town",
  "Dragon Roost Cavern - Mini Boss": "Dragon Roost Cavern - Miniboss",
  "Dragon Roost Cavern - Swing Across Lava Chest": "Dragon Roost Cavern - Chest Across Lava Pit",
  "Dragon Roost Cavern - Water Jug Alcove Chest": "Dragon Roost Cavern - Alcove With Water Jugs",
  "Earth Temple - Chest Behind Destructable Wall": "Earth Temple - Chest Behind Destructible Walls",
  "Earth Temple - Stalfos Mini Boss": "Earth Temple - Stalfos Miniboss Room",
  "Forbidden Woods - Mothula Mini Boss Chest": "Forbidden Woods - Mothula Miniboss Room",
  "Tower of the Gods - Chest Behind Bombable Wall": "Tower of the Gods - Chest Behind Bombable Walls",
  "Tower of the Gods - Darknut Mini Boss": "Tower of the Gods - Darknut Miniboss Room",
  "Tower of the Gods - Skull Room Chest": "Tower of the Gods - Skulls Room Chest",
  "Wind Temple - Hub Room Center Chest": "Wind Temple - Chest In Middle Of Hub Room",
  "Wind Temple - Wizzrobe Mini Boss": "Wind Temple - Wizzrobe Miniboss Room"
};

const LOCATION_CATEGORY_OVERRIDES = {
  "Windfall Island - Auction 100 Rupee": ["Expensive Purchase", "Minigame"],
  "Windfall Island - Dampa Pig Minigame": ["Minigame"],
  "Ganon's Tower - Defeat Ganondorf": ["Dungeon"]
};

const LOCATION_ORDER_OVERRIDES = [
  { location: "Windfall Island - Dampa Pig Minigame", after: "Windfall Island - Tott Teach Rhythm" },
  { location: "Dragon Roost Island - Hoskit Give 20 Golden Feathers", after: "Dragon Roost Island - Boulder Chest" }
];

const SPHERE_RULE_OVERRIDES = {};

const RANDOMIZER_LOCATION_DATA_PATHS = [
  "logic/data/location_data.yaml",
  "logic/item_locations.txt"
];

const REMOTE_RANDOMIZER_LOCATION_DATA_URLS = [
  "https://raw.githubusercontent.com/SuperDude88/TWWHD-Randomizer/1.2.0/logic/data/location_data.yaml"
];
const RANDOMIZER_SPHERE_LOGIC_PATHS = {
  locations: ["logic/data/world.yaml", "logic/world.yaml", "logic/item_locations.txt"],
  macros: ["logic/data/macros.yaml", "logic/macros.yaml", "logic/macros.txt"],
  locationData: ["logic/data/location_data.yaml"],
  entrances: ["logic/data/entrance_shuffle_table.yaml"]
};
const BUNDLED_RANDOMIZER_LOGIC_PATHS = {
  locations: "logic/world.yaml",
  macros: "logic/macros.yaml",
  locationData: "logic/location_data.yaml",
  entrances: "logic/entrance_shuffle_table.yaml"
};
const REMOTE_RANDOMIZER_SPHERE_LOGIC_URLS = {
  locations: "https://raw.githubusercontent.com/SuperDude88/TWWHD-Randomizer/1.2.0/logic/data/world.yaml",
  macros: "https://raw.githubusercontent.com/SuperDude88/TWWHD-Randomizer/1.2.0/logic/data/macros.yaml",
  locationData: "https://raw.githubusercontent.com/SuperDude88/TWWHD-Randomizer/1.2.0/logic/data/location_data.yaml",
  entrances: "https://raw.githubusercontent.com/SuperDude88/TWWHD-Randomizer/1.2.0/logic/data/entrance_shuffle_table.yaml"
};

const ITEM_PALETTE_ENTRIES = [
  { kind: "item", itemName: "Telescope", row: 1, column: 1 },
  { kind: "item", itemName: "Sail", row: 1, column: 2 },
  { kind: "item", itemName: "Wind Waker", row: 1, column: 3 },
  { kind: "item", itemName: "Grappling Hook", row: 1, column: 4 },
  { kind: "item", itemName: "Spoils Bag", row: 1, column: 5 },
  { kind: "item", itemName: "Boomerang", row: 1, column: 6 },
  { kind: "item", itemName: "Deku Leaf", row: 1, column: 7 },
  { kind: "item", itemName: "Progressive Sword", row: 1, column: 8 },
  { kind: "item", itemName: "Tingle Bottle", row: 2, column: 1 },
  { kind: "item", itemName: "Progressive Picto Box", row: 2, column: 2 },
  { kind: "item", itemName: "Iron Boots", row: 2, column: 3 },
  { kind: "blank", row: 2, column: 4 },
  { kind: "item", itemName: "Bait Bag", row: 2, column: 5 },
  { kind: "item", itemName: "Progressive Bow", row: 2, column: 6 },
  { kind: "item", itemName: "Bomb", row: 2, column: 7 },
  { kind: "item", itemName: "Progressive Shield", row: 2, column: 8 },
  { kind: "item", itemName: "Cabana Deed", row: 3, column: 1 },
  { kind: "item", itemName: "Maggie's Letter", row: 3, column: 2 },
  { kind: "item", itemName: "Moblin's Letter", row: 3, column: 3 },
  { kind: "item", itemName: "Note to Mom", row: 3, column: 4 },
  { kind: "item", itemName: "Delivery Bag", row: 3, column: 5 },
  { kind: "item", itemName: "Hookshot", row: 3, column: 6 },
  { kind: "item", itemName: "Skull Hammer", row: 3, column: 7 },
  { kind: "item", itemName: "Power Bracelets", row: 3, column: 8 },
  { kind: "item", itemName: "Empty Bottle", row: 4, column: 1 },
  { kind: "item", itemName: "Wind's Requiem", row: 4, column: 2 },
  { kind: "item", itemName: "Ballad of Gales", row: 4, column: 3 },
  { kind: "item", itemName: "Command Melody", row: 4, column: 4 },
  { kind: "item", itemName: "Earth God's Lyric", row: 4, column: 5 },
  { kind: "item", itemName: "Wind God's Aria", row: 4, column: 6 },
  { kind: "item", itemName: "Song of Passing", row: 4, column: 7 },
  { kind: "item", itemName: "Hero's Charm", row: 4, column: 8 },
  { kind: "pearl-cluster", row: 5, column: 1 },
  { kind: "triforce-cluster", itemName: "Triforce Shard", imageName: "Triforce of Courage", row: 5, column: 3 },
  { kind: "blank", row: 5, column: 5 },
  { kind: "item", itemName: "Tingle Statue", row: 5, column: 6 },
  { kind: "item", itemName: "Ghost Ship Chart", row: 5, column: 7 },
  { kind: "item", itemName: "Hurricane Spin", row: 5, column: 8 },
  { kind: "item", itemName: "Bomb Bag", row: 6, column: 5 },
  { kind: "item", itemName: "Quiver", row: 6, column: 6 },
  { kind: "item", itemName: "Progressive Wallet", row: 6, column: 7 },
  { kind: "item", itemName: "Progressive Magic Meter", row: 6, column: 8 },
  { kind: "item", itemName: "Small Key", row: 7, column: 1 },
  { kind: "item", itemName: "Boss Key", row: 7, column: 2 },
  { kind: "item", itemName: "Treasure Chart", row: 7, column: 3 },
  { kind: "item", itemName: "Triforce Chart", row: 7, column: 4 },
  { kind: "boss", bossName: "Gohma", row: 8, column: 1 },
  { kind: "boss", bossName: "Kalle Demos", row: 8, column: 2 },
  { kind: "boss", bossName: "Gohdan", row: 8, column: 3 },
  { kind: "boss", bossName: "Helmaroc King", row: 8, column: 4 },
  { kind: "boss", bossName: "Jalhalla", row: 8, column: 5 },
  { kind: "boss", bossName: "Molgera", row: 8, column: 6 },
  { kind: "boss", bossName: "Ganondorf", row: 8, column: 7 }
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
  sphere: loadSphereState(),
  settings: loadSettings(),
  history: [],
  historyIndex: -1,
  isApplyingHistory: false,
  isDraggingHintItem: false,
  draggedHintItem: "",
  draggedHintKind: "item",
  pendingSphereItem: "",
  data: {
    items: [],
    itemSearchNames: [],
    bosses: [],
    locations: [],
    filteredLocationKeys: null,
    areaLocationKeys: null,
    locationOrder: null,
    randoMarkedLocationKeys: new Set(),
    randoMarkedItems: [],
    sphereEntranceConnections: {},
    sphereChartMappings: {},
    sphereRules: {},
    sphereMacros: {},
    sphereWorld: null,
    sphereOptions: {},
    sphereStartingIsland: "",
    sphereConfiguredStartingGear: [],
    sphereStartingGear: [],
    requiredBosses: new Set(),
    sphereLogicLoaded: false,
    sectors: FALLBACK_SECTORS,
    areas: FALLBACK_SECTORS,
    areaAliases: {},
    loaded: false
  }
};

const seaGrid = document.querySelector("#seaGrid");
const areaStrip = document.querySelector("#areaStrip");
const hintInput = document.querySelector("#hintInput");
const sphereInput = document.querySelector("#sphereInput");
const hintNotesTab = document.querySelector("#hintNotesTab");
const sphereNotesTab = document.querySelector("#sphereNotesTab");
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
const parsedHintsFiltersInput = document.querySelector("#parsedHintsFiltersInput");
const automaticModeInput = document.querySelector("#automaticModeInput");
const automaticLastLocationInput = document.querySelector("#automaticLastLocationInput");
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
const itemPalette = document.querySelector("#itemPalette");
const mapViewButton = document.querySelector("#mapViewButton");
const sphereViewButton = document.querySelector("#sphereViewButton");
const hintAssignmentButton = document.querySelector("#hintAssignmentButton");
const sphereAssignmentButton = document.querySelector("#sphereAssignmentButton");
const sphereLogicStatus = document.querySelector("#sphereLogicStatus");
const mapResizeHelp = document.querySelector("#mapResizeHelp");
const sphereBoard = document.querySelector("#sphereBoard");
const sphereBoardEmpty = document.querySelector("#sphereBoardEmpty");
const sphereCanvas = document.querySelector("#sphereCanvas");
const sphereColumns = document.querySelector("#sphereColumns");
const sphereEdges = document.querySelector("#sphereEdges");
const dungeonEntranceList = document.querySelector("#dungeonEntranceList");
const startingItemsPrompt = document.querySelector("#startingItemsPrompt");
const startingItemsPalette = document.querySelector("#startingItemsPalette");
const startingItemsMessage = document.querySelector("#startingItemsMessage");
const startingItemsSelectionCount = document.querySelector("#startingItemsSelectionCount");
const startingItemsClearButton = document.querySelector("#startingItemsClearButton");
const startingItemsCancelButton = document.querySelector("#startingItemsCancelButton");
const startingItemsApplyButton = document.querySelector("#startingItemsApplyButton");
const startingItemsButton = document.querySelector("#startingItemsButton");
const spherePopoutButton = document.querySelector("#spherePopoutButton");
const browseRandoFolderButton = document.querySelector("#browseRandoFolderButton");
const syncRandoConfigButton = document.querySelector("#syncRandoConfigButton");
const randoFolderInput = document.querySelector("#randoFolderInput");
const randoFolderStatus = document.querySelector("#randoFolderStatus");
const automaticModePrompt = document.querySelector("#automaticModePrompt");
const automaticModeItemImage = document.querySelector("#automaticModeItemImage");
const automaticModeItemName = document.querySelector("#automaticModeItemName");
const automaticModeMessage = document.querySelector("#automaticModeMessage");
const automaticModeLocationChoices = document.querySelector("#automaticModeLocationChoices");
const automaticModeSkipButton = document.querySelector("#automaticModeSkipButton");
const tabs = document.querySelectorAll(".tab");
let randoFolderHandle = null;
let randoFolderFiles = null;
let activeManualHintTarget = null;
let manualDragGhost = null;
let locationDropList = null;
let paletteAssignmentLocation = "";
let pendingRandomStartingItems = [];
let expectedRandomStartingItemCount = 0;
let syncedRandomStartingItemCount = 0;
let spherePopoutWindow = null;
let randoAutosavePollTimer = null;
let randoAutosavePollBusy = false;
let randoAutosaveLastText = null;
let randoAutosaveLastModified = null;
let automaticPendingItems = [];
let automaticLocationChoices = [];
let automaticLastCheckedLocation = "";
let sphereLogicRevision = 0;
let sphereAnalysisCache = { key: "", calculation: null, relativeUnknown: null, pathProgress: [], dependenciesReady: false };
let sphereReachabilityCache = new Map();
let sphereOwnDungeonKeyPoolCache = { key: "", pools: new Map() };
let sphereHardBossRequirementCache = new Map();
let sphereRenderTimer = null;
let sphereAnalysisWorker = null;
let sphereAnalysisJobId = 0;
let sphereAreaGroupOpenState = new Map();
let sphereAreaGroupsDefaultOpen = true;

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
      filteredLocationKeys: state.data.filteredLocationKeys,
      areaLocationKeys: state.data.areaLocationKeys,
      locationOrder: state.data.locationOrder,
      randoMarkedLocationKeys: state.data.randoMarkedLocationKeys || new Set(),
      randoMarkedItems: state.data.randoMarkedItems || [],
      sphereEntranceConnections: state.data.sphereEntranceConnections || {},
      sphereChartMappings: state.data.sphereChartMappings || {},
      sphereRules: state.data.sphereRules,
      sphereMacros: state.data.sphereMacros,
      sphereWorld: state.data.sphereWorld,
      sphereOptions: state.data.sphereOptions,
      sphereConfiguredStartingGear: state.data.sphereConfiguredStartingGear,
      sphereStartingGear: state.data.sphereStartingGear,
      sphereLogicLoaded: state.data.sphereLogicLoaded,
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

  if (state.data.loaded) updateSphereFromInput({ render: false });
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
  const exact = candidates.find((name) => normalize(name) === normalize(query));
  if (exact) {
    return { name: exact, score: 120, confidence: "exact", note: "Exact match" };
  }

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

function sortLocationsBySourceOrder(locations) {
  const orderedLocations = [...locations];
  if (state.data.locationOrder) {
    orderedLocations.sort((first, second) => {
      const firstOrder = state.data.locationOrder.get(normalize(first));
      const secondOrder = state.data.locationOrder.get(normalize(second));
      return (firstOrder ?? Number.MAX_SAFE_INTEGER) - (secondOrder ?? Number.MAX_SAFE_INTEGER);
    });
  }

  LOCATION_ORDER_OVERRIDES.forEach(({ location, after }) => {
    const locationIndex = orderedLocations.findIndex((candidate) => normalize(candidate) === normalize(location));
    if (locationIndex < 0) return;

    const [locationEntry] = orderedLocations.splice(locationIndex, 1);
    const afterIndex = orderedLocations.findIndex((candidate) => normalize(candidate) === normalize(after));
    if (afterIndex < 0) {
      orderedLocations.splice(locationIndex, 0, locationEntry);
      return;
    }

    orderedLocations.splice(afterIndex + 1, 0, locationEntry);
  });

  return orderedLocations;
}

function getAvailableLocations() {
  const locations = state.data.filteredLocationKeys
    ? state.data.locations.filter((location) => state.data.filteredLocationKeys.has(normalize(location)))
    : state.data.locations;
  return sortLocationsBySourceOrder(locations);
}

function findBestLocation(query) {
  const expandedQuery = expandLeadingAreaAlias(query);
  return findBest(expandedQuery, getAvailableLocations());
}

function getAreaAliasMatch(query) {
  const key = normalize(query);
  const directArea = state.data.areaAliases[key];
  if (directArea) return buildAreaAliasResult(directArea);

  const parts = key.split(" ").filter(Boolean);
  if (parts.length > 1 && parts[parts.length - 1] === "sector") {
    const leadingKey = parts.slice(0, -1).join(" ");
    const baseArea = state.data.areaAliases[leadingKey];
    const sectorArea = baseArea ? findKnownArea(`${baseArea} Sector`) : null;
    if (sectorArea) return buildAreaAliasResult(sectorArea);
  }

  return null;
}

function buildAreaAliasResult(area) {
  return {
    name: area,
    score: 140,
    confidence: "exact",
    note: "Abbreviation match"
  };
}

function findKnownArea(name) {
  return [...state.data.areas, ...state.data.sectors].find((area) => normalize(area) === normalize(name));
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

function isNoteToMomItemHint(line) {
  return /^note\s+to\s+mom\b/i.test(line) && /\s(?:at|in|on)\s/i.test(line);
}

function parseLine(rawLine, lineNumber) {
  const line = rawLine.trim();
  if (!line) return null;

  const barrenParts = line.match(/^(.+?)\s+(?:is\s+)?(?:foolish|barren)$/i);
  if (barrenParts) {
    const area = findBestArea(barrenParts[1]);
    const needsReview = area.confidence === "unknown" || area.confidence === "ambiguous";
    return {
      type: "barren",
      line,
      lineNumber,
      left: { kind: "text", name: area.name },
      right: { kind: "text", name: "Foolish" },
      title: `${area.name} is foolish`,
      detail: needsReview ? area.note : "Foolish area hint",
      mapTarget: null,
      requirement: null,
      needsReview
    };
  }

  const pathParts = line.match(/^(.+?)\s+to\s+(.+)$/i);
  if (pathParts && !isNoteToMomItemHint(line)) {
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

function renderGrid(options = {}) {
  seaGrid.innerHTML = "";

  state.data.sectors.forEach((sector) => {
    const cell = document.createElement("div");
    cell.className = "sector";
    cell.dataset.sector = sector;
    cell.addEventListener("dragover", handleSectorDragOver);
    cell.addEventListener("dragleave", handleSectorDragLeave);
    cell.addEventListener("drop", (event) => handleSectorDrop(event, sector));
    cell.addEventListener("click", (event) => openAreaLocationList(event, sector, "sector"));

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

    const entranceIcons = document.createElement("div");
    entranceIcons.className = "sector-entrance-icons";
    DUNGEON_ENTRANCE_TRACKERS.filter((dungeon) => normalize(state.sphere.entranceMappings[dungeon.name]) === normalize(sector)).forEach((dungeon) => {
      const badge = document.createElement("button");
      badge.type = "button";
      badge.className = "sector-entrance-badge";
      badge.textContent = dungeon.abbreviation;
      badge.title = `${dungeon.name} entrance - right-click to clear`;
      badge.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        clearDungeonEntranceMapping(dungeon.name);
      });
      entranceIcons.appendChild(badge);
    });

    cell.append(label, hintIcons, markerIcons, entranceIcons);
    seaGrid.appendChild(cell);
  });

  renderAreaStrip();
  renderMapSideTab();
  if (sphereRenderTimer !== null && !options.deferSphere) {
    window.clearTimeout(sphereRenderTimer);
    sphereRenderTimer = null;
  }
  if (shouldRenderSphereBoard()) {
    if (options.deferSphere) {
      if (sphereRenderTimer !== null) window.clearTimeout(sphereRenderTimer);
      sphereRenderTimer = window.setTimeout(() => {
        sphereRenderTimer = null;
        if (shouldRenderSphereBoard()) renderSphereBoard();
      }, 160);
    } else {
      renderSphereBoard();
    }
  }
  applyTrackerView();
}

function shouldRenderSphereBoard() {
  return state.settings.mapView === "spheres" || Boolean(spherePopoutWindow && !spherePopoutWindow.closed);
}

function renderMapSideTab() {
  blueChuCount.closest(".jelly-counter").hidden = !state.settings.showBlueChu;
  blueChuCount.textContent = Object.keys(state.checked).filter((id) => id.startsWith("blue-chu-jelly:")).length;
  shardStatusList.innerHTML = "";

  for (let number = 1; number <= 8; number += 1) {
    const shardName = `Triforce Shard ${number}`;
    const { isHinted, isChecked } = getShardTrackingState(number);
    const isStartingGear = state.settings.startingGearShards.includes(number);

    const button = document.createElement("button");
    button.type = "button";
    button.draggable = true;
    button.dataset.shardNumber = number;
    button.className = `shard-status${isHinted ? " hinted" : ""}${isChecked ? " checked" : ""}${isStartingGear ? " starting" : ""}`;
    button.title = `${shardName}${isStartingGear ? " - starting gear" : isHinted ? "" : " - not hinted"}${isChecked ? " - checked" : ""}`;
    button.addEventListener("click", () => {
      const selectedForAutomaticMode = selectAutomaticShard(number);
      if (!selectedForAutomaticMode) setShardTrackingChecked(number, !isChecked);
      renderGrid();
    });
    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      toggleStartingGearShard(number);
    });
    button.addEventListener("dragstart", (event) => {
      hideShardPreview();
      const itemName = `Triforce Shard ${number}`;
      startHintItemDrag(itemName);
      event.dataTransfer.setData("text/plain", itemName);
      event.dataTransfer.setData("application/x-wwr-shard", String(number));
      event.dataTransfer.setData("application/x-wwr-hint-item", itemName);
      event.dataTransfer.effectAllowed = "copy";
    });
    button.addEventListener("dragend", finishHintItemDrag);
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
  renderDungeonEntranceList();
}

function renderDungeonEntranceList() {
  dungeonEntranceList.innerHTML = "";
  DUNGEON_ENTRANCE_TRACKERS.forEach((dungeon) => {
    const mappedSector = state.sphere.entranceMappings[dungeon.name];
    const button = document.createElement("button");
    button.type = "button";
    button.draggable = true;
    button.className = `dungeon-entrance${mappedSector ? " mapped" : ""}`;
    button.textContent = dungeon.abbreviation;
    button.title = mappedSector ? `${dungeon.name} at ${mappedSector} - drag to move, right-click to clear` : `${dungeon.name} - drag onto its sector`;
    button.addEventListener("dragstart", (event) => {
      startHintItemDrag(dungeon.name, "entrance");
      event.dataTransfer.setData("text/plain", dungeon.name);
      event.dataTransfer.setData("application/x-wwr-hint-item", dungeon.name);
      event.dataTransfer.setData("application/x-wwr-dungeon", dungeon.name);
      event.dataTransfer.effectAllowed = "copy";
    });
    button.addEventListener("dragend", finishHintItemDrag);
    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      clearDungeonEntranceMapping(dungeon.name);
    });
    dungeonEntranceList.appendChild(button);
  });
}

function getShardHints(number) {
  const shardName = `Triforce Shard ${number}`;
  return state.hints.filter((hint) => hint.left?.name === shardName);
}

function getShardTrackingState(number) {
  const shardHints = getShardHints(number);
  const shardHintIds = shardHints.map(getHintIconId);
  const fallbackId = `triforce-shard-status:${number}`;
  return {
    shardHintIds,
    fallbackId,
    isHinted: shardHints.length > 0,
    isChecked: shardHintIds.length
      ? shardHintIds.every((id) => state.checked[id])
      : Boolean(state.checked[fallbackId])
  };
}

function setShardTrackingChecked(number, checked) {
  const { shardHintIds, fallbackId } = getShardTrackingState(number);
  setChecked(fallbackId, checked);
  shardHintIds.forEach((id) => setChecked(id, checked));
  localStorage.setItem(CHECKED_KEY, JSON.stringify(state.checked));
}

function getDungeonSmallKeyName(item, location = "") {
  const keyDungeons = DUNGEON_ENTRANCE_TRACKERS
    .map((dungeon) => dungeon.name)
    .filter((name) => name !== "Forsaken Fortress");
  const explicitDungeon = keyDungeons.find((name) => normalize(item) === normalize(`${name} Small Key`));
  if (explicitDungeon) return `${explicitDungeon} Small Key`;
  if (normalize(item) !== "small key" || !location) return "";
  const locationArea = getAreaFromLocation(location);
  const locationDungeon = keyDungeons.find((name) => normalize(name) === normalize(locationArea));
  return locationDungeon ? `${locationDungeon} Small Key` : "";
}

function getSphereInventoryItemKey(item, location = "") {
  let itemName = String(item || "");
  const dungeonNames = DUNGEON_ENTRANCE_TRACKERS
    .map((dungeon) => dungeon.name)
    .filter((name) => name !== "Forsaken Fortress");
  const locationArea = getAreaFromLocation(location);
  const locationDungeon = dungeonNames.find((name) => normalize(name) === normalize(locationArea));
  if (/^small key$/i.test(itemName) && locationDungeon) itemName = `${locationDungeon} Small Key`;
  if (/^(?:boss|big) key$/i.test(itemName) && locationDungeon) itemName = `${locationDungeon} Big Key`;

  const aliases = {
    bomb: "bombs",
    sail: "progressive sail",
    "bomb bag": "progressive bomb bag",
    quiver: "progressive quiver",
    "magic meter upgrade": "progressive magic meter"
  };
  const key = normalize(itemName);
  return aliases[key] || key;
}

function showShardPreview(shardName) {
  shardPreviewImage.src = miscImage(`${shardName} Highlight`);
  shardPreviewImage.alt = shardName;
  shardPreview.hidden = false;
}

function hideShardPreview() {
  shardPreview.hidden = true;
}

function renderItemPalette() {
  itemPalette.innerHTML = "";

  ITEM_PALETTE_ENTRIES.forEach((entry) => {
    if (entry.kind === "pearl-cluster") {
      itemPalette.appendChild(createPearlCluster(entry));
      return;
    }

    if (entry.kind === "triforce-cluster") {
      itemPalette.appendChild(createPaletteSlot({ ...entry, kind: "item", large: true }));
      return;
    }

    itemPalette.appendChild(createPaletteSlot(entry));
  });
}
function renderStartingItemsPalette() {
  startingItemsPalette.innerHTML = "";

  ITEM_PALETTE_ENTRIES.forEach((entry) => {
    if (entry.kind === "boss") return;
    if (entry.kind === "pearl-cluster") {
      startingItemsPalette.appendChild(createStartingPearlCluster(entry));
      return;
    }
    if (entry.kind === "triforce-cluster") {
      startingItemsPalette.appendChild(createStartingItemSlot({ ...entry, kind: "item", large: true }));
      return;
    }
    startingItemsPalette.appendChild(createStartingItemSlot(entry));
  });
}

function createStartingPearlCluster(entry) {
  const cluster = document.createElement("div");
  cluster.className = "item-palette-cluster pearl-cluster";
  positionPaletteEntry(cluster, entry, 2, 2);

  [
    { itemName: "Nayru's Pearl", className: "pearl-top" },
    { itemName: "Din's Pearl", className: "pearl-left" },
    { itemName: "Farore's Pearl", className: "pearl-right" }
  ].forEach((pearl) => {
    cluster.appendChild(createStartingItemSlot({ kind: "item", ...pearl }));
  });

  return cluster;
}

function createStartingItemSlot(entry) {
  const slot = document.createElement("button");
  slot.type = "button";
  slot.className = `item-palette-slot${entry.large ? " large" : ""}${entry.className ? ` ${entry.className}` : ""}`;
  if (entry.row && entry.column) positionPaletteEntry(slot, entry, entry.large ? 2 : 1, entry.large ? 2 : 1);

  if (entry.kind === "blank") {
    slot.classList.add("blank");
    slot.disabled = true;
    return slot;
  }

  const itemName = entry.itemName;
  const imageName = entry.imageName || itemName;
  const selectedCount = pendingRandomStartingItems.filter((item) => normalize(item) === normalize(itemName)).length;
  slot.classList.toggle("selected", selectedCount > 0);
  slot.setAttribute("aria-pressed", selectedCount > 0 ? "true" : "false");
  slot.title = selectedCount
    ? `${itemName} selected. Click to remove.`
    : `${itemName}. Click to add.`;

  slot.addEventListener("click", () => {
    if (selectedCount) {
      pendingRandomStartingItems = pendingRandomStartingItems.filter((item) => normalize(item) !== normalize(itemName));
    } else {
      if (pendingRandomStartingItems.length >= expectedRandomStartingItemCount) return;
      pendingRandomStartingItems.push(itemName);
    }
    updateStartingItemsPrompt();
  });
  slot.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const selectedIndex = pendingRandomStartingItems.findLastIndex((item) => normalize(item) === normalize(itemName));
    if (selectedIndex < 0) return;
    pendingRandomStartingItems.splice(selectedIndex, 1);
    updateStartingItemsPrompt();
  });

  const image = document.createElement("img");
  image.src = itemImage(imageName);
  image.alt = itemName;
  image.addEventListener("error", () => {
    slot.classList.add("missing");
    slot.disabled = true;
    slot.title = `${itemName} image missing`;
  });
  slot.appendChild(image);


  return slot;
}

function updateStartingItemsPrompt() {
  const allowsMultiple = expectedRandomStartingItemCount > 1;
  startingItemsMessage.textContent = allowsMultiple ? "Select the random starting item or items this seed gave you." : "Select the random starting item this seed gave you.";
  startingItemsSelectionCount.textContent = allowsMultiple ? `${pendingRandomStartingItems.length} selected (up to ${expectedRandomStartingItemCount})` : `${pendingRandomStartingItems.length} selected`;
  startingItemsApplyButton.disabled = pendingRandomStartingItems.length < 1;
  renderStartingItemsPalette();
}

function showStartingItemsPrompt(itemCount) {
  expectedRandomStartingItemCount = Math.max(1, Math.round(itemCount));
  pendingRandomStartingItems = [...(state.sphere.randomStartingItems || [])].slice(0, expectedRandomStartingItemCount);
  updateStartingItemsPrompt();
  startingItemsPrompt.hidden = false;
  requestAnimationFrame(() => startingItemsPalette.querySelector(".item-palette-slot:not(:disabled)")?.focus());
}

function hideStartingItemsPrompt() {
  startingItemsPrompt.hidden = true;
}

function refreshSphereStartingGear() {
  state.data.sphereStartingGear = [
    ...IMPLICIT_STARTING_GEAR,
    ...(state.data.sphereConfiguredStartingGear || []),
    ...(state.sphere.randomStartingItems || [])
  ];
  state.data.sphereOptions.starting_gear = [...state.data.sphereStartingGear];
}

function applyRandomStartingItems() {
  if (!pendingRandomStartingItems.length || pendingRandomStartingItems.length > expectedRandomStartingItemCount) return;
  state.sphere.randomStartingItems = [...pendingRandomStartingItems];
  saveSphereState();
  refreshSphereStartingGear();
  renderGrid();
  hideStartingItemsPrompt();
}


function createPearlCluster(entry) {
  const cluster = document.createElement("div");
  cluster.className = "item-palette-cluster pearl-cluster";
  positionPaletteEntry(cluster, entry, 2, 2);

  [
    { itemName: "Nayru's Pearl", className: "pearl-top" },
    { itemName: "Din's Pearl", className: "pearl-left" },
    { itemName: "Farore's Pearl", className: "pearl-right" }
  ].forEach((pearl) => {
    const slot = createPaletteSlot({ kind: "item", itemName: pearl.itemName, className: pearl.className });
    cluster.appendChild(slot);
  });

  return cluster;
}

function createPaletteSlot(entry) {
  const slot = document.createElement("button");
  slot.type = "button";
  slot.className = `item-palette-slot${entry.large ? " large" : ""}${entry.className ? ` ${entry.className}` : ""}`;
  if (entry.row && entry.column) positionPaletteEntry(slot, entry, entry.large ? 2 : 1, entry.large ? 2 : 1);

  if (entry.kind === "blank") {
    slot.classList.add("blank");
    slot.disabled = true;
    return slot;
  }

  const dragName = entry.kind === "boss" ? entry.bossName : entry.itemName;
  const imageName = entry.imageName || dragName;
  slot.title = dragName;
  slot.dataset.dragName = dragName;
  slot.dataset.dragKind = entry.kind === "boss" ? "path" : "item";
  slot.addEventListener("pointerdown", (event) => beginPaletteEntryDrag(event, slot.dataset.dragName, slot.dataset.dragKind));

  const image = document.createElement("img");
  image.src = entry.kind === "boss" ? bossImage(imageName) : itemImage(imageName);
  image.alt = dragName;
  image.addEventListener("error", () => {
    slot.classList.add("missing");
    slot.disabled = true;
    slot.title = `${dragName} image missing`;
  });
  slot.appendChild(image);
  return slot;
}

function positionPaletteEntry(element, entry, columnSpan = 1, rowSpan = 1) {
  element.style.gridColumn = `${entry.column} / span ${columnSpan}`;
  element.style.gridRow = `${entry.row} / span ${rowSpan}`;
}

function showItemPalette(options = {}) {
  paletteAssignmentLocation = options.location || "";
  renderItemPalette();
  itemPalette.hidden = false;
  itemPalette.style.left = "0px";
  itemPalette.style.top = "0px";

  const paletteRect = itemPalette.getBoundingClientRect();
  const mapRect = seaGrid.getBoundingClientRect();
  const left = clampNumber(mapRect.left + (mapRect.width - paletteRect.width) / 2, 8, window.innerWidth - paletteRect.width - 8);
  const top = clampNumber(mapRect.top + (mapRect.height - paletteRect.height) / 2, 8, window.innerHeight - paletteRect.height - 8);
  itemPalette.style.left = `${left}px`;
  itemPalette.style.top = `${top}px`;
}

function hideItemPalette() {
  itemPalette.hidden = true;
  paletteAssignmentLocation = "";
}

function beginPaletteEntryDrag(event, dragName, dragKind = "item") {
  if (event.button !== 0) return;
  event.preventDefault();
  event.stopPropagation();
  if (paletteAssignmentLocation) {
    const location = paletteAssignmentLocation;
    hideItemPalette();
    assignPaletteEntryToLocation(dragName, dragKind, location);
    return;
  }
  hideItemPalette();
  startHintItemDrag(dragName, dragKind);
  createManualDragGhost(dragName, dragKind);
  updateManualHintDrag(event);

  const handleMove = (moveEvent) => {
    if (!(moveEvent.buttons & 1)) {
      finishManualHintDrag(moveEvent, false);
      cleanup();
      return;
    }
    updateManualHintDrag(moveEvent);
  };

  const handleUp = (upEvent) => {
    finishManualHintDrag(upEvent, true);
    cleanup();
  };

  const cleanup = () => {
    window.removeEventListener("pointermove", handleMove);
    window.removeEventListener("pointerup", handleUp);
    window.removeEventListener("pointercancel", handleUp);
  };

  window.addEventListener("pointermove", handleMove);
  window.addEventListener("pointerup", handleUp);
  window.addEventListener("pointercancel", handleUp);
}

function assignPaletteEntryToLocation(dragName, dragKind, location) {
  if (dragKind === "path") {
    appendHintLine(`${getAreaFromLocation(location)} to ${dragName}`);
    return;
  }
  if (state.settings.assignmentMode === "sphere") {
    addSpherePlacement(dragName, location);
  } else {
    appendHintLine(`${dragName} at ${location}`);
  }
}

function createManualDragGhost(dragName, dragKind = "item") {
  removeManualDragGhost();
  manualDragGhost = document.createElement("div");
  manualDragGhost.className = "manual-drag-ghost";

  const image = document.createElement("img");
  image.src = dragKind === "path" ? bossImage(dragName) : itemImage(dragName);
  image.alt = dragName;
  manualDragGhost.appendChild(image);
  document.body.appendChild(manualDragGhost);
}

function removeManualDragGhost() {
  manualDragGhost?.remove();
  manualDragGhost = null;
}

function updateManualHintDrag(event) {
  if (manualDragGhost) {
    manualDragGhost.style.left = `${event.clientX}px`;
    manualDragGhost.style.top = `${event.clientY}px`;
  }

  const target = getManualHintDropTarget(event.clientX, event.clientY);
  setActiveManualHintTarget(target?.element || null);
}

function finishManualHintDrag(event, shouldDrop) {
  const target = shouldDrop ? getManualHintDropTarget(event.clientX, event.clientY) : null;
  const draggedItem = state.draggedHintItem;
  const draggedKind = state.draggedHintKind;
  let spherePromptTarget = null;

  if (target?.destination && state.draggedHintItem) {
    if (draggedKind === "entrance" && target.kind === "sector") {
      setDungeonEntranceMapping(draggedItem, target.destination);
    } else if (draggedKind === "item" && state.settings.assignmentMode === "sphere") {
      if (target.kind === "location") {
        addSpherePlacement(draggedItem, target.destination);
      } else {
        spherePromptTarget = target;
      }
    } else if (draggedKind !== "entrance") {
      const line = draggedKind === "path" ? `${target.destination} to ${draggedItem}` : `${draggedItem} at ${target.destination}`;
      appendHintLine(line);
    }
  }

  setActiveManualHintTarget(null);
  removeManualDragGhost();
  finishHintItemDrag();
  if (spherePromptTarget) promptForSphereLocation(draggedItem, spherePromptTarget, event.clientX, event.clientY);
}

function getManualHintDropTarget(x, y) {
  const element = document.elementFromPoint(x, y);
  const locationOption = element?.closest?.(".location-drop-option");
  if (locationOption?.dataset.location) {
    return { element: locationOption, destination: locationOption.dataset.location, kind: "location" };
  }

  const sector = element?.closest?.(".sector");
  if (sector?.dataset.sector) return { element: sector, destination: sector.dataset.sector, kind: "sector" };

  const area = element?.closest?.(".area-cell");
  if (area?.dataset.area) return { element: area, destination: area.dataset.area, kind: "area" };

  return null;
}

function getAreaLocationChoices(areaName, targetKind) {
  const possibleAreas = [areaName];
  if (targetKind === "sector" && !/\bsector\b/i.test(areaName)) {
    possibleAreas.unshift(`${areaName} Sector`);
  } else if (targetKind === "area") {
    const trackedArea = TRACKED_AREAS.find((area) => normalize(area.name) === normalize(areaName));
    if (trackedArea) possibleAreas.push(...trackedArea.matchNames);
  }

  const areaKeys = unique(possibleAreas).map(normalize);
  const availableLocations = targetKind === "area" && state.data.areaLocationKeys
    ? sortLocationsBySourceOrder(
      state.data.locations.filter((location) => state.data.areaLocationKeys.has(normalize(location)))
    )
    : getAvailableLocations();
  return availableLocations.filter((location) => areaKeys.includes(normalize(getAreaFromLocation(location))));
}

function showLocationDropList(areaName, targetKind, x, y, onSelect = null) {
  hideLocationDropList();
  const locations = getAreaLocationChoices(areaName, targetKind);
  if (!locations.length) return;

  const maxRows = 13;
  const maxColumns = 3;
  const columnCount = Math.min(Math.ceil(locations.length / maxRows), maxColumns);
  const rowCount = Math.ceil(locations.length / columnCount);

  locationDropList = document.createElement("div");
  locationDropList.className = "location-drop-list";
  locationDropList.style.setProperty("--location-column-count", columnCount);
  locationDropList.style.setProperty("--location-list-width", `${columnCount * 250}px`);
  locationDropList.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const option = event.target.closest(".location-drop-option");
    if (option?.dataset.location) {
      const location = option.dataset.location;
      hideLocationDropList();
      showItemPalette({ location });
      return;
    }
    hideLocationDropList();
  });

  const title = document.createElement("div");
  title.className = "location-drop-title";
  const titleText = document.createElement("span");
  titleText.textContent = areaName.replace(" Sector", "");
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "location-drop-close";
  closeButton.textContent = "\u00d7";
  closeButton.title = "Close location list";
  closeButton.setAttribute("aria-label", "Close location list");
  closeButton.addEventListener("click", hideLocationDropList);
  title.append(titleText, closeButton);
  locationDropList.appendChild(title);

  const columns = document.createElement("div");
  columns.className = "location-drop-columns";

  for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
    const column = document.createElement("div");
    column.className = "location-drop-column";
    const columnLocations = locations.slice(columnIndex * rowCount, (columnIndex + 1) * rowCount);

    columnLocations.forEach((location) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "location-drop-option";
      option.dataset.location = location;
      option.textContent = location.replace(`${getAreaFromLocation(location)} - `, "");
      if (isLocationMarked(location)) {
        option.classList.add("rando-marked");
      }
      option.title = getLocationMarkedTitle(location);
      option.addEventListener("dragover", handleHintTargetDragOver);
      option.addEventListener("dragleave", handleHintTargetDragLeave);
      option.addEventListener("drop", (event) => handleHintTargetDrop(event, location, "location"));
      if (onSelect) {
        option.addEventListener("click", () => {
          onSelect(location);
          hideLocationDropList();
        });
      } else {
        option.addEventListener("click", () => {
          toggleLocationChecked(location);
          option.classList.toggle("rando-marked", isLocationMarked(location));
          option.title = getLocationMarkedTitle(location);
        });
      }
      column.appendChild(option);
    });

    columns.appendChild(column);
  }

  locationDropList.appendChild(columns);

  document.body.appendChild(locationDropList);
  positionLocationDropList(x, y);
}

function positionLocationDropList(x, y) {
  if (!locationDropList) return;
  const mapRect = seaGrid.getBoundingClientRect();
  const listRect = locationDropList.getBoundingClientRect();
  const left = clampNumber(x - listRect.width / 2, mapRect.left + 6, mapRect.right - listRect.width - 6);
  const top = clampNumber(y - 12, mapRect.top + 6, mapRect.bottom - listRect.height - 6);
  locationDropList.style.left = `${left}px`;
  locationDropList.style.top = `${top}px`;
}

function hideLocationDropList() {
  locationDropList?.remove();
  locationDropList = null;
}

function promptForSphereLocation(itemName, target, x, y) {
  showLocationDropList(target.destination, target.kind, x, y, (location) => {
    addSpherePlacement(itemName, location);
  });
}

function handleLocationListPointerRequest(event) {
  if (event.button !== 2) return;
  handleLocationListRequest(event);
}
function handleLocationListRequest(event) {
  if (!state.isDraggingHintItem || state.draggedHintKind !== "item") return;
  event.preventDefault();
  event.stopPropagation();
  const target = getManualHintDropTarget(event.clientX, event.clientY);
  if (!target || target.kind === "location") return;
  showLocationDropList(target.destination, target.kind, event.clientX, event.clientY);
  updateManualHintDrag(event);
}
function setActiveManualHintTarget(element) {
  if (activeManualHintTarget === element) return;
  activeManualHintTarget?.classList.remove("drag-target");
  activeManualHintTarget = element;
  activeManualHintTarget?.classList.add("drag-target");
}
function handleMapContextMenu(event) {
  event.preventDefault();
  if (!itemPalette.hidden) {
    hideItemPalette();
    return;
  }

  showItemPalette();
}

function startHintItemDrag(itemName = "", dragKind = "item") {
  state.isDraggingHintItem = true;
  state.draggedHintItem = itemName;
  state.draggedHintKind = dragKind;
  hideShardPreview();
  hideLocationDropList();
  renderAreaStrip();
}

function finishHintItemDrag() {
  if (!state.isDraggingHintItem) return;
  state.isDraggingHintItem = false;
  state.draggedHintItem = "";
  state.draggedHintKind = "item";
  hideLocationDropList();
  setActiveManualHintTarget(null);
  renderAreaStrip();
}

function hasDraggedHintItem(dataTransfer) {
  return dataTransfer.types.includes("application/x-wwr-hint-item")
    || dataTransfer.types.includes("application/x-wwr-shard")
    || dataTransfer.types.includes("application/x-wwr-dungeon");
}

function getDraggedHintItem(dataTransfer) {
  const itemName = dataTransfer.getData("application/x-wwr-hint-item");
  if (itemName) return itemName;

  const shardNumber = Number(dataTransfer.getData("application/x-wwr-shard"));
  return shardNumber ? `Triforce Shard ${shardNumber}` : "";
}

function getDraggedHintKind(dataTransfer) {
  return dataTransfer.types.includes("application/x-wwr-dungeon") ? "entrance" : "item";
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
  handleHintTargetDragOver(event);
}

function handleSectorDrop(event, sector) {
  handleHintTargetDrop(event, sector, "sector");
}

function handleSectorDragLeave(event) {
  handleHintTargetDragLeave(event);
}

function handleAreaDrop(event, areaName) {
  handleHintTargetDrop(event, areaName, "area");
}

function handleHintTargetDragOver(event) {
  if (!hasDraggedHintItem(event.dataTransfer)) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
  event.currentTarget.classList.add("drag-target");
}

function handleHintTargetDrop(event, destinationName, targetKind = "area") {
  const itemName = getDraggedHintItem(event.dataTransfer);
  const dragKind = getDraggedHintKind(event.dataTransfer);
  event.currentTarget.classList.remove("drag-target");
  if (!itemName) return;

  event.preventDefault();
  finishHintItemDrag();

  if (dragKind === "entrance") {
    if (targetKind === "sector") setDungeonEntranceMapping(itemName, destinationName);
    return;
  }

  if (state.settings.assignmentMode === "sphere") {
    if (targetKind === "location") {
      addSpherePlacement(itemName, destinationName);
    } else {
      promptForSphereLocation(itemName, { destination: destinationName, kind: targetKind }, event.clientX, event.clientY);
    }
    return;
  }

  appendHintLine(`${itemName} at ${destinationName}`);
}

function handleHintTargetDragLeave(event) {
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
    const canReceiveDraggedItem = state.isDraggingHintItem && state.draggedHintKind !== "entrance";
    const canChooseSphereLocation = state.settings.assignmentMode === "sphere";
    if (!areaHints.length && !canReceiveDraggedItem && !canChooseSphereLocation) return;
    renderedAreas += 1;

    const cell = document.createElement("div");
    cell.className = `area-cell${areaHints.length ? "" : " empty-drop-area"}`;
    cell.title = area.name;
    cell.dataset.area = area.name;
    cell.addEventListener("dragover", handleHintTargetDragOver);
    cell.addEventListener("dragleave", handleHintTargetDragLeave);
    cell.addEventListener("drop", (event) => handleAreaDrop(event, area.name));
    cell.addEventListener("click", (event) => openAreaLocationList(event, area.name, "area"));

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

  if (hint.type === "barren") {
    status.classList.add("neutral");
    status.textContent = "Foolish";
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
      itemBox.className = "stream-item-box requirement-cycle-target";
      itemBox.role = "button";
      itemBox.tabIndex = 0;
      itemBox.title = "Click to cycle requiredness";
      itemBox.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        cycleHintRequirement(hint.lineNumber);
      });
      itemBox.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        cycleHintRequirement(hint.lineNumber);
      });
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
  if (type === "barren") return "Foolish area hint";
  return "Review";
}

function cycleHintRequirement(lineNumber) {
  const lines = hintInput.value.split(/\r?\n/);
  const index = lineNumber - 1;
  const line = lines[index] || "";
  const match = line.match(/^(.+?)\s+(at|in|on)\s+(.+)$/i);
  if (!match) return;

  const parsedItem = parseRequirement(match[1]);
  const currentKey = parsedItem.requirement?.key || "none";
  const nextSuffix = {
    none: "r",
    required: "p",
    "possibly-required": "n",
    "not-required": ""
  }[currentKey];

  if (nextSuffix === undefined) return;

  const nextItemText = [parsedItem.itemText, nextSuffix].filter(Boolean).join(" ");
  lines[index] = `${nextItemText} ${match[2]} ${match[3]}`;
  hintInput.value = lines.join("\n");
  updateFromInput();
}
function toggleChecked(id) {
  state.checked[id] = !state.checked[id];
  if (!state.checked[id]) delete state.checked[id];
  localStorage.setItem(CHECKED_KEY, JSON.stringify(state.checked));
  renderGrid();
}

function getLocationCheckedId(location) {
  return `sphere-location-checked:${normalize(location)}`;
}

function isLocationLocallyChecked(location) {
  return Boolean(state.checked[getLocationCheckedId(location)]);
}

function isLocationMarked(location) {
  return isRandoMarkedLocation(location) || isLocationLocallyChecked(location);
}

function getLocationMarkedTitle(location) {
  if (isRandoMarkedLocation(location)) return "Checked in linked randomizer tracker. Left-click to also toggle the local check; right-click to assign an item.";
  if (isLocationLocallyChecked(location)) return "Checked locally. Left-click to uncheck; right-click to assign an item.";
  return "Left-click to check; right-click to assign an item.";
}

function toggleLocationChecked(location) {
  const id = getLocationCheckedId(location);
  setChecked(id, !state.checked[id]);
  localStorage.setItem(CHECKED_KEY, JSON.stringify(state.checked));
  if (shouldRenderSphereBoard()) renderSphereBoard();
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

function loadSphereState() {
  try {
    const stored = JSON.parse(localStorage.getItem(SPHERE_STORAGE_KEY)) || {};
    const placements = (Array.isArray(stored.placements) ? stored.placements : []).map((placement) => {
      if (!placement.fromAutosave || !placement.location) return placement;
      const migrated = { ...placement, fromAutomaticTracker: true };
      delete migrated.fromAutosave;
      return migrated;
    });
    return {
      placements,
      entranceMappings: stored.entranceMappings || {},
      autosaveEntranceMappings: stored.autosaveEntranceMappings || {},
      randomStartingItems: Array.isArray(stored.randomStartingItems) ? stored.randomStartingItems : []
    };
  } catch {
    return { placements: [], entranceMappings: {}, autosaveEntranceMappings: {}, randomStartingItems: [] };
  }
}

function saveSphereState() {
  localStorage.setItem(SPHERE_STORAGE_KEY, JSON.stringify(state.sphere));
}

function serializeSpherePlacements() {
  return state.sphere.placements.map((placement) => `${placement.item} at ${placement.location}`).join("\n");
}

function parseSpherePlacementLine(rawLine, lineNumber, existingPlacements) {
  const line = rawLine.trim();
  if (!line) return null;
  const parts = line.match(/^(.+?)\s+(?:at|in|on)\s+(.+)$/i);
  if (!parts) return null;

  const item = canonicalizeItemMatch(findBest(parts[1], state.data.itemSearchNames));
  const location = findBestLocation(parts[2]);
  if (!item.score || !location.score) return null;
  const existing = existingPlacements.get(normalize(location.name));
  const placement = {
    id: existing?.id || `sphere-text-${lineNumber}-${Math.random().toString(36).slice(2, 7)}`,
    item: item.name,
    location: location.name
  };
  if (existing && normalize(existing.item) === normalize(item.name) && (existing.fromAutomaticTracker || existing.fromAutosave)) {
    placement.fromAutomaticTracker = true;
    placement.autosaveItemKey = existing.autosaveItemKey || getAutomaticAutosaveItemKey(existing.item);
  }
  return placement;
}

function parseSphereNotes(text) {
  const existingPlacements = new Map(state.sphere.placements.map((placement) => [normalize(placement.location), placement]));
  const placementsByLocation = new Map();
  String(text || "").split(/\r?\n/).forEach((line, index) => {
    const placement = parseSpherePlacementLine(line, index + 1, existingPlacements);
    if (placement) placementsByLocation.set(normalize(placement.location), placement);
  });
  return [...placementsByLocation.values()];
}

function resizeSphereInput() {
  sphereInput.style.height = "auto";
  sphereInput.style.height = `${Math.max(135, sphereInput.scrollHeight)}px`;
}

function updateSphereFromInput(options = {}) {
  localStorage.setItem(SPHERE_NOTES_STORAGE_KEY, sphereInput.value);
  saveStatus.textContent = "Saved locally";
  resizeSphereInput();
  if (!state.data.loaded) return;

  state.sphere.placements = parseSphereNotes(sphereInput.value);
  saveSphereState();
  invalidateSphereAnalysis();
  if (options.render !== false) renderGrid({ deferSphere: options.deferSphere === true });
}

function replaceSpherePlacementLine(item, location) {
  const lines = sphereInput.value ? sphereInput.value.split(/\r?\n/) : [];
  const existingPlacements = new Map(state.sphere.placements.map((placement) => [normalize(placement.location), placement]));
  const lineIndex = lines.findIndex((line, index) => {
    const placement = parseSpherePlacementLine(line, index + 1, existingPlacements);
    return placement && normalize(placement.location) === normalize(location);
  });
  const canonicalLine = `${item} at ${location}`;
  if (lineIndex >= 0) lines[lineIndex] = canonicalLine;
  else lines.push(canonicalLine);
  sphereInput.value = lines.join("\n");
  updateSphereFromInput();
}

function removeSpherePlacementLine(location) {
  const existingPlacements = new Map(state.sphere.placements.map((placement) => [normalize(placement.location), placement]));
  const lines = sphereInput.value.split(/\r?\n/).filter((line, index) => {
    const placement = parseSpherePlacementLine(line, index + 1, existingPlacements);
    return !placement || normalize(placement.location) !== normalize(location);
  });
  sphereInput.value = lines.join("\n");
  updateSphereFromInput();
}

function addSpherePlacement(item, location, metadata = {}) {
  replaceSpherePlacementLine(item, location);
  const placement = state.sphere.placements.find((candidate) => normalize(candidate.location) === normalize(location));
  if (!placement || !Object.keys(metadata).length) return;
  Object.assign(placement, metadata);
  saveSphereState();
}

function removeSpherePlacement(id) {
  const placement = state.sphere.placements.find((candidate) => candidate.id === id);
  if (!placement) return;
  removeSpherePlacementLine(placement.location);
}

function setDungeonEntranceMapping(dungeonName, sector) {
  state.sphere.entranceMappings[dungeonName] = sector;
  delete state.sphere.autosaveEntranceMappings[dungeonName];
  saveSphereState();
  renderGrid();
}

function clearDungeonEntranceMapping(dungeonName) {
  if (!state.sphere.entranceMappings[dungeonName]) return;
  delete state.sphere.entranceMappings[dungeonName];
  delete state.sphere.autosaveEntranceMappings[dungeonName];
  saveSphereState();
  renderGrid();
}

function setMapView(view) {
  state.settings.mapView = view === "spheres" ? "spheres" : "map";
  saveSettings();
  if (state.settings.mapView === "spheres") renderSphereBoard();
  applyTrackerView();
}

function setAssignmentMode(mode) {
  state.settings.assignmentMode = mode === "sphere" ? "sphere" : "hint";
  saveSettings();
  applyTrackerView();
}

function applyTrackerView() {
  const showingSpheres = state.settings.mapView === "spheres";
  seaGrid.hidden = showingSpheres;
  sphereBoard.hidden = !showingSpheres;
  areaStrip.hidden = showingSpheres || !areaStrip.children.length;
  mapResizeHelp.textContent = showingSpheres ? "Sphere board scrolls sideways" : "Drag map edge to resize";
  mapViewButton.classList.toggle("active", !showingSpheres);
  sphereViewButton.classList.toggle("active", showingSpheres);
  hintAssignmentButton.classList.toggle("active", state.settings.assignmentMode !== "sphere");
  sphereAssignmentButton.classList.toggle("active", state.settings.assignmentMode === "sphere");
  document.body.classList.toggle("sphere-assignment-mode", state.settings.assignmentMode === "sphere");
  if (showingSpheres) requestAnimationFrame(drawSphereEdges);
}

function openSpherePopout() {
  if (spherePopoutWindow && !spherePopoutWindow.closed) {
    syncSpherePopout();
    spherePopoutWindow.focus();
    return;
  }

  const popup = window.open("", "wwr-sphere-tracking", "popup=yes,width=1000,height=720,resizable=yes,scrollbars=yes");
  if (!popup) {
    window.alert("Allow pop-ups for this page to open the sphere tracking window.");
    return;
  }

  spherePopoutWindow = popup;
  const popupDocument = popup.document;
  popupDocument.open();
  popupDocument.write("<!doctype html><html><head></head><body></body></html>");
  popupDocument.close();
  popupDocument.title = "WWR Sphere Tracking";

  const base = popupDocument.createElement("base");
  base.href = document.baseURI;
  const charset = popupDocument.createElement("meta");
  charset.setAttribute("charset", "utf-8");
  const viewport = popupDocument.createElement("meta");
  viewport.name = "viewport";
  viewport.content = "width=device-width, initial-scale=1";
  const stylesheet = popupDocument.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("styles.css", document.baseURI).href;
  const overrides = popupDocument.createElement("style");
  overrides.textContent = [
    "html, body { width: 100%; height: 100%; margin: 0; }",
    "body.sphere-popout-body { min-width: 0; overflow: hidden; background: #15232a; }",
    ".sphere-popout-shell { display: grid; grid-template-rows: auto minmax(0, 1fr); width: 100%; height: 100%; }",
    ".sphere-popout-header { z-index: 3; display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 42px; padding: 6px 10px; border-bottom: 1px solid #20333b; background: #fffdf7; color: #172027; }",
    ".sphere-popout-header h1 { margin: 0; font-size: 0.9rem; }",
    ".sphere-popout-status { color: #65727a; font-size: 0.68rem; font-weight: 800; }",
    ".sphere-popout-board.sphere-board { width: 100%; max-width: none; height: 100%; min-height: 0; aspect-ratio: auto; border: 0; }",
    ".sphere-popout-board .sphere-columns { min-height: calc(100vh - 64px); }"
  ].join("\n");
  popupDocument.head.append(charset, viewport, base, stylesheet, overrides);

  popupDocument.body.className = "sphere-popout-body";
  const shell = popupDocument.createElement("main");
  shell.className = "sphere-popout-shell";
  const header = popupDocument.createElement("header");
  header.className = "sphere-popout-header";
  const heading = popupDocument.createElement("h1");
  heading.textContent = "Sphere Tracking";
  const status = popupDocument.createElement("span");
  status.id = "spherePopoutStatus";
  status.className = "sphere-popout-status";
  header.append(heading, status);

  const board = popupDocument.createElement("section");
  board.id = "spherePopoutBoard";
  board.className = "sphere-board sphere-popout-board";
  const empty = popupDocument.createElement("div");
  empty.id = "spherePopoutEmpty";
  empty.className = "sphere-board-empty";
  const canvas = popupDocument.createElement("div");
  canvas.id = "spherePopoutCanvas";
  canvas.className = "sphere-canvas";
  const edges = popupDocument.createElementNS("http://www.w3.org/2000/svg", "svg");
  edges.id = "spherePopoutEdges";
  edges.classList.add("sphere-edges");
  edges.setAttribute("aria-hidden", "true");
  const columns = popupDocument.createElement("div");
  columns.id = "spherePopoutColumns";
  columns.className = "sphere-columns";
  canvas.append(edges, columns);
  board.append(empty, canvas);
  shell.append(header, board);
  popupDocument.body.appendChild(shell);
  installSphereBoardPanning(board, popup);

  popup.addEventListener("resize", () => drawSphereEdgesInPopout());
  popup.addEventListener("beforeunload", () => {
    if (spherePopoutWindow === popup) spherePopoutWindow = null;
  });
  stylesheet.addEventListener("load", () => syncSpherePopout());
  renderSphereBoard();
  popup.focus();
}

function installSphereBoardPanning(board, ownerWindow = window) {
  if (!board || board.dataset.panInstalled === "true") return;
  board.dataset.panInstalled = "true";
  let activePointerId = null;
  let startX = 0;
  let startY = 0;
  let startScrollLeft = 0;
  let startScrollTop = 0;
  let dragging = false;
  let suppressClick = false;

  const finish = (event) => {
    if (event.pointerId !== activePointerId) return;
    if (dragging) {
      suppressClick = true;
      ownerWindow.setTimeout(() => { suppressClick = false; }, 0);
    }
    dragging = false;
    activePointerId = null;
    board.classList.remove("sphere-panning");
    if (board.hasPointerCapture?.(event.pointerId)) board.releasePointerCapture(event.pointerId);
  };

  board.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || activePointerId !== null) return;
    activePointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    startScrollLeft = board.scrollLeft;
    startScrollTop = board.scrollTop;
    board.setPointerCapture?.(event.pointerId);
  }, true);
  board.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointerId) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (!dragging && Math.hypot(deltaX, deltaY) < 4) return;
    dragging = true;
    board.classList.add("sphere-panning");
    board.scrollLeft = startScrollLeft - deltaX;
    board.scrollTop = startScrollTop - deltaY;
    event.preventDefault();
  }, true);
  board.addEventListener("pointerup", finish, true);
  board.addEventListener("pointercancel", finish, true);
  board.addEventListener("click", (event) => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressClick = false;
  }, true);
  board.addEventListener("dragstart", (event) => event.preventDefault(), true);
}

function syncSpherePopout() {
  const popup = spherePopoutWindow;
  if (!popup || popup.closed) {
    spherePopoutWindow = null;
    return;
  }

  const popupDocument = popup.document;
  const empty = popupDocument.querySelector("#spherePopoutEmpty");
  const canvas = popupDocument.querySelector("#spherePopoutCanvas");
  const columns = popupDocument.querySelector("#spherePopoutColumns");
  const status = popupDocument.querySelector("#spherePopoutStatus");
  if (!empty || !canvas || !columns || !status) return;
  const board = popupDocument.querySelector("#spherePopoutBoard");
  const scrollLeft = board?.scrollLeft || 0;
  const scrollTop = board?.scrollTop || 0;

  empty.textContent = sphereBoardEmpty.textContent;
  empty.hidden = sphereBoardEmpty.hidden;
  canvas.hidden = sphereCanvas.hidden;
  status.textContent = sphereLogicStatus.textContent;
  columns.replaceChildren(...[...sphereColumns.children].map((column) => popupDocument.importNode(column, true)));

  columns.querySelectorAll(".sphere-placement:not([data-hint-line])").forEach((card) => {
    card.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      removeSpherePlacement(card.dataset.nodeId);
    });
  });
  columns.querySelectorAll("[data-hint-line]").forEach((card) => {
    card.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      removeHintLine(Number(card.dataset.hintLine));
    });
  });
  columns.querySelectorAll("[data-node-id]").forEach((node) => {
    node.addEventListener("mouseenter", () => setSpherePopoutEdgeHighlight(node.dataset.nodeId));
    node.addEventListener("mouseleave", () => setSpherePopoutEdgeHighlight(""));
  });
  columns.querySelectorAll(".sphere-area-group").forEach((group) => {
    group.addEventListener("toggle", () => handleSphereAreaGroupToggle(group, columns));
  });
  columns.querySelectorAll(".sphere-groups-toggle").forEach((button) => {
    button.addEventListener("click", () => toggleAllSphereAreaGroups(columns));
  });
  updateSphereGroupToggleButtons();

  popup.requestAnimationFrame(() => popup.requestAnimationFrame(() => {
    if (board) {
      board.scrollLeft = scrollLeft;
      board.scrollTop = scrollTop;
    }
    drawSphereEdgesInPopout();
  }));
}

function drawSphereEdgesInPopout() {
  const popup = spherePopoutWindow;
  if (!popup || popup.closed) return;
  const popupDocument = popup.document;
  const canvas = popupDocument.querySelector("#spherePopoutCanvas");
  const edges = popupDocument.querySelector("#spherePopoutEdges");
  if (!canvas || !edges || canvas.hidden) return;

  const canvasRect = canvas.getBoundingClientRect();
  const width = Math.max(canvas.scrollWidth, canvas.clientWidth);
  const height = Math.max(canvas.scrollHeight, canvas.clientHeight);
  edges.setAttribute("width", width);
  edges.setAttribute("height", height);
  edges.setAttribute("viewBox", `0 0 ${width} ${height}`);
  edges.innerHTML = "";

  const nodes = new Map([...canvas.querySelectorAll("[data-node-id]")].map((node) => [node.dataset.nodeId, node]));
  nodes.forEach((target, targetId) => {
    const dependencies = target.dataset.dependencies?.split(",").filter(Boolean) || [];
    dependencies.forEach((sourceId) => {
      const source = nodes.get(sourceId);
      if (!source) return;
      const sourceRect = source.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const startX = sourceRect.right - canvasRect.left;
      const startY = sourceRect.top + sourceRect.height / 2 - canvasRect.top;
      const endX = targetRect.left - canvasRect.left;
      const endY = targetRect.top + targetRect.height / 2 - canvasRect.top;
      const bend = Math.max(20, (endX - startX) * 0.45);
      const path = popupDocument.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M ${startX} ${startY} C ${startX + bend} ${startY}, ${endX - bend} ${endY}, ${endX} ${endY}`);
      path.dataset.source = sourceId;
      path.dataset.target = targetId;
      edges.appendChild(path);
    });
  });
  markSpherePathHintEdges(nodes, canvas, edges);
}

function openAreaLocationList(event, areaName, targetKind) {
  if (event.button !== 0 || state.isDraggingHintItem || event.target.closest("button")) return;
  event.preventDefault();
  hideItemPalette();
  showLocationDropList(areaName, targetKind, event.clientX, event.clientY);
}

function setSpherePopoutEdgeHighlight(nodeId) {
  const popup = spherePopoutWindow;
  if (!popup || popup.closed) return;
  applySphereChainFocus(
    popup.document.querySelector("#spherePopoutCanvas"),
    popup.document.querySelector("#spherePopoutEdges"),
    nodeId
  );
}

function getSphereItemCopyLimit(item) {
  if (isGenericTriforceShard(item)) return 8;
  if (getShardNumber(item)) return 1;
  const matchingEntry = Object.entries(MAX_LOGIC_ITEM_COPIES)
    .find(([name]) => getSphereInventoryItemKey(name) === getSphereInventoryItemKey(item));
  return matchingEntry?.[1] || 1;
}

function getAcquiredSphereItemCounts() {
  const counts = new Map();
  const representedCounts = new Map();
  const representedShardKeys = [];
  const addRepresentedItem = (item, location = "") => {
    const itemKey = getSphereInventoryItemKey(item, location);
    counts.set(itemKey, (counts.get(itemKey) || 0) + 1);
    representedCounts.set(itemKey, (representedCounts.get(itemKey) || 0) + 1);
    if (getShardNumber(item)) representedShardKeys.push(itemKey);
  };

  state.data.sphereStartingGear.forEach((item) => addRepresentedItem(item));
  state.sphere.placements.forEach((placement) => addRepresentedItem(placement.item, placement.location));
  state.data.randoMarkedItems.forEach((item) => {
    const itemKey = getSphereInventoryItemKey(item);
    if (isGenericTriforceShard(item) || getShardNumber(item)) {
      if (representedShardKeys.length) representedShardKeys.shift();
      else counts.set(itemKey, (counts.get(itemKey) || 0) + 1);
      return;
    }
    const representedCount = representedCounts.get(itemKey) || 0;
    if (representedCount > 0) {
      representedCounts.set(itemKey, representedCount - 1);
      return;
    }
    counts.set(itemKey, (counts.get(itemKey) || 0) + 1);
  });

  for (let number = 1; number <= 8; number += 1) {
    const itemKey = getSphereInventoryItemKey(`Triforce Shard ${number}`);
    if (getShardTrackingState(number).isChecked && !counts.get(itemKey)) counts.set(itemKey, 1);
  }
  return counts;
}

function getSphereTrackingKnowledge() {
  const occupiedLocations = new Set(state.sphere.placements.map((placement) => normalize(placement.location)));
  const availableLocations = new Set(getAvailableLocations().map(normalize));
  const unmatchedObtainedPlacements = [...state.sphere.placements];
  const acquiredItemCounts = getAcquiredSphereItemCounts();
  const hintPlacements = [];
  const areaHints = [];

  state.hints
    .filter((hint) => !hint.needsReview && (hint.type === "location" || hint.type === "item"))
    .forEach((hint) => {
      const hintItemKey = getSphereInventoryItemKey(hint.left.name);
      if ((acquiredItemCounts.get(hintItemKey) || 0) >= getSphereItemCopyLimit(hint.left.name)) return;
      if (hint.type === "item") {
        const hintedLocationKeys = new Set(getSphereHintAreaLocations(hint.right.name).map(normalize));
        const foundIndex = unmatchedObtainedPlacements.findIndex((placement) => (
          getSphereInventoryItemKey(placement.item, placement.location) === hintItemKey
          && hintedLocationKeys.has(normalize(placement.location))
        ));
        if (foundIndex >= 0) {
          unmatchedObtainedPlacements.splice(foundIndex, 1);
          return;
        }
        areaHints.push(hint);
        return;
      }

      const locationKey = normalize(hint.right.name);
      if (!availableLocations.has(locationKey) || occupiedLocations.has(locationKey)) return;
      occupiedLocations.add(locationKey);
      hintPlacements.push({
        id: `sphere-hint-${hint.lineNumber}`,
        item: hint.left.name,
        location: hint.right.name,
        fromHint: true,
        lineNumber: hint.lineNumber
      });
  });

  const placements = [...state.sphere.placements, ...hintPlacements];
  const placedShardNumbers = new Set(placements.map((placement) => Number(getShardNumber(placement.item))).filter(Boolean));
  const startingShardNumbers = new Set(state.data.sphereStartingGear.map((item) => Number(getShardNumber(item))).filter(Boolean));
  const acquiredShardSources = [];
  for (let number = 1; number <= 8; number += 1) {
    if (startingShardNumbers.has(number) || placedShardNumbers.has(number) || !getShardTrackingState(number).isChecked) continue;
    acquiredShardSources.push({
      id: `sphere-acquired-shard-${number}`,
      item: `Triforce Shard ${number}`,
      number
    });
  }
  const representedItemCounts = new Map();
  const representedShardKeys = [];
  state.data.sphereStartingGear.forEach((item) => {
    const itemKey = getSphereInventoryItemKey(item);
    representedItemCounts.set(itemKey, (representedItemCounts.get(itemKey) || 0) + 1);
    if (getShardNumber(item)) representedShardKeys.push(itemKey);
  });
  state.sphere.placements.forEach((placement) => {
    const itemKey = getSphereInventoryItemKey(placement.item, placement.location);
    representedItemCounts.set(itemKey, (representedItemCounts.get(itemKey) || 0) + 1);
    if (getShardNumber(placement.item)) representedShardKeys.push(itemKey);
  });
  acquiredShardSources.forEach((source) => {
    const itemKey = getSphereInventoryItemKey(source.item);
    representedItemCounts.set(itemKey, (representedItemCounts.get(itemKey) || 0) + 1);
    representedShardKeys.push(itemKey);
  });
  const autosaveItemSources = [];
  state.data.randoMarkedItems.forEach((item, index) => {
    const itemKey = getSphereInventoryItemKey(item);
    const shardNumber = getShardNumber(item);
    if (shardNumber || isGenericTriforceShard(item)) {
      if (representedShardKeys.length) representedShardKeys.shift();
      else autosaveItemSources.push({ id: `sphere-autosave-item-${itemKey}-${index}`, item, fromAutosave: true });
      return;
    }
    const representedCount = representedItemCounts.get(itemKey) || 0;
    if (representedCount > 0) {
      representedItemCounts.set(itemKey, representedCount - 1);
      return;
    }
    autosaveItemSources.push({
      id: `sphere-autosave-item-${itemKey}-${index}`,
      item,
      fromAutosave: true
    });
  });

  return {
    placements,
    hintPlacements,
    areaHints,
    acquiredShardSources,
    autosaveItemSources,
    pathHints: state.hints.filter((hint) => (
      hint.type === "path"
      && !hint.needsReview
      && (!state.data.requiredBosses.size || state.data.requiredBosses.has(normalize(hint.right.name)))
    )),
    barrenHints: state.hints.filter((hint) => hint.type === "barren" && !hint.needsReview)
  };
}

function getSphereHintAreaLocations(areaName) {
  const targetKind = state.data.sectors.some((sector) => normalize(sector) === normalize(areaName)) ? "sector" : "area";
  return getAreaLocationChoices(areaName, targetKind);
}

function getSphereHintPrediction(locations, calculation) {
  const spheres = unique(locations
    .map((location) => calculation.locationSpheres[normalize(location)])
    .filter((sphere) => Number.isInteger(sphere)))
    .sort((first, second) => first - second);
  if (!spheres.length) return "Sphere unknown";
  if (spheres.length === 1) return `Possible sphere ${spheres[0]}`;
  const ranges = [];
  let rangeStart = spheres[0];
  let rangeEnd = spheres[0];
  spheres.slice(1).forEach((sphere) => {
    if (sphere === rangeEnd + 1) {
      rangeEnd = sphere;
      return;
    }
    ranges.push(rangeStart === rangeEnd ? `${rangeStart}` : `${rangeStart}-${rangeEnd}`);
    rangeStart = sphere;
    rangeEnd = sphere;
  });
  ranges.push(rangeStart === rangeEnd ? `${rangeStart}` : `${rangeStart}-${rangeEnd}`);
  return `Possible spheres ${ranges.join(", ")}`;
}

function getCollectedBlueChuJellyCount() {
  return Object.keys(state.checked).filter((id) => id.startsWith("blue-chu-jelly:") && state.checked[id]).length;
}

function getSphereBlueChuJellyCount() {
  return 15;
}

function getSphereLogicStartingGear() {
  return [
    ...state.data.sphereStartingGear,
    ...Array(getSphereBlueChuJellyCount()).fill("Blue Chu Jelly")
  ];
}

function getSphereCalculationInput(placements, includeDependencies = true) {
  return {
    locations: getAvailableLocations(),
    rules: state.data.sphereRules,
    macros: state.data.sphereMacros,
    world: state.data.sphereWorld,
    placements,
    startingGear: getSphereLogicStartingGear(),
    options: state.data.sphereOptions,
    entranceMappings: Object.fromEntries(Object.entries(state.sphere.entranceMappings).map(([name, sector]) => [normalize(name), sector])),
    entranceConnections: state.data.sphereEntranceConnections,
    chartMappings: state.data.sphereChartMappings,
    startingIsland: state.data.sphereStartingIsland,
    includeDependencies
  };
}

function calculateSphereProgression(placements = getSphereTrackingKnowledge().placements, options = {}) {
  if (!state.data.sphereLogicLoaded || !window.WWRSphereEngine) return null;
  return window.WWRSphereEngine.calculate(getSphereCalculationInput(placements, options.includeDependencies !== false));
}

function getSphereReachableLocationSet(items, options = {}) {
  if (!window.WWRSphereEngine?.getReachableLocations) return new Set();
  const additionalStartAreas = options.additionalStartAreas || [];
  const cacheKey = JSON.stringify({
    items: items.map(normalize).sort(),
    additionalStartAreas: additionalStartAreas.map(normalize).sort(),
    startingIsland: normalize(state.data.sphereStartingIsland)
  });
  if (sphereReachabilityCache.has(cacheKey)) return sphereReachabilityCache.get(cacheKey);
  const reachable = new Set(window.WWRSphereEngine.getReachableLocations({
    // Boss checks are logic probes as well as visible checks. Keep them in the
    // reachability graph even when the synced location filters hide them.
    locations: unique([...getAvailableLocations(), ...Object.values(BOSS_LOCATIONS)]),
    rules: state.data.sphereRules,
    macros: state.data.sphereMacros,
    world: state.data.sphereWorld,
    items,
    options: state.data.sphereOptions,
    entranceMappings: Object.fromEntries(Object.entries(state.sphere.entranceMappings).map(([name, sector]) => [normalize(name), sector])),
    entranceConnections: state.data.sphereEntranceConnections,
    chartMappings: state.data.sphereChartMappings,
    startingIsland: state.data.sphereStartingIsland,
    additionalStartAreas
  }));
  sphereReachabilityCache.set(cacheKey, reachable);
  return reachable;
}

function getMaximalSphereLogicInventory() {
  const items = [];
  state.data.items.forEach((item) => {
    const copies = MAX_LOGIC_ITEM_COPIES[item] || 1;
    for (let index = 0; index < copies; index += 1) items.push(item);
  });
  DUNGEON_KEY_LOGIC.forEach(({ dungeon, smallKeyCount }) => {
    for (let index = 0; index < smallKeyCount; index += 1) items.push(`${dungeon} Small Key`);
    items.push(`${dungeon} Big Key`);
  });
  return items;
}

// The two reachability sets computed here depend only on the source item and which
// dungeon (if any) `location` starts from - not on `location` itself, so callers that
// check many locations against the same source (inferRelativeUnknownSpheres does,
// for every available location and every unresolved target) can pass a `cache` Map
// to compute each (item, dungeonStart) pair's sets once instead of once per location.
function isLogicRequiredItemForLocation(source, location, cache) {
  if (!source?.item || !location || isOwnDungeonKeyForPath(source.item)) return false;
  const itemKey = getSphereInventoryItemKey(source.item, source.location || location);
  if (!itemKey) return false;

  const locationArea = getAreaFromLocation(location);
  const dungeonStart = state.data.sphereWorld?.dungeonStarts?.[normalize(locationArea)];
  const cacheKey = `${itemKey}|${dungeonStart || ""}`;
  let sets = cache?.get(cacheKey);
  if (!sets) {
    const maximalInventory = getMaximalSphereLogicInventory();
    const reducedInventory = maximalInventory.filter((item) => getSphereInventoryItemKey(item) !== itemKey);
    if (reducedInventory.length === maximalInventory.length) {
      sets = { skip: true };
    } else {
      const options = dungeonStart ? { additionalStartAreas: [dungeonStart] } : {};
      sets = {
        skip: false,
        withItem: getSphereReachabilityWithOwnDungeonKeys(maximalInventory, options),
        without: getSphereReachabilityWithOwnDungeonKeys(reducedInventory, options)
      };
    }
    cache?.set(cacheKey, sets);
  }
  if (sets.skip) return false;
  const locationKey = normalize(location);
  return sets.withItem.has(locationKey) && !sets.without.has(locationKey);
}

function getOwnDungeonKeyPotentialPools() {
  const smallKeysOwnDungeon = normalize(state.data.sphereOptions.dungeon_small_keys) === "own dungeon";
  const bigKeysOwnDungeon = normalize(state.data.sphereOptions.dungeon_big_keys) === "own dungeon";
  if (!smallKeysOwnDungeon && !bigKeysOwnDungeon) return new Map();

  const cacheKey = JSON.stringify({
    revision: sphereLogicRevision,
    locations: getAvailableLocations(),
    entrances: state.data.sphereEntranceConnections,
    manualEntrances: state.sphere.entranceMappings,
    smallKeysOwnDungeon,
    bigKeysOwnDungeon
  });
  if (sphereOwnDungeonKeyPoolCache.key === cacheKey) return sphereOwnDungeonKeyPoolCache.pools;

  const maximalInventory = getMaximalSphereLogicInventory();
  const pools = new Map();
  DUNGEON_KEY_LOGIC.forEach(({ dungeon, smallKeyCount }) => {
    const dungeonLocations = getAvailableLocations().filter((location) => normalize(getAreaFromLocation(location)) === normalize(dungeon));
    const keyTypes = [];
    if (smallKeysOwnDungeon) keyTypes.push({ item: `${dungeon} Small Key`, count: smallKeyCount });
    if (bigKeysOwnDungeon) keyTypes.push({ item: `${dungeon} Big Key`, count: 1 });

    keyTypes.forEach(({ item, count }) => {
      const itemKey = getSphereInventoryItemKey(item);
      const inventoryWithoutKey = maximalInventory.filter((candidate) => getSphereInventoryItemKey(candidate) !== itemKey);
      const itemPools = [];
      for (let itemCount = 0; itemCount < count; itemCount += 1) {
        const reachable = getSphereReachableLocationSet([
          ...inventoryWithoutKey,
          ...Array(itemCount).fill(item)
        ]);
        itemPools.push(dungeonLocations.filter((location) => reachable.has(normalize(location))));
      }
      pools.set(itemKey, { item, count, itemPools });
    });
  });

  sphereOwnDungeonKeyPoolCache = { key: cacheKey, pools };
  return pools;
}

function getSphereReachabilityWithOwnDungeonKeys(items, options = {}) {
  const effectiveItems = [...items];
  let reachable = getSphereReachableLocationSet(effectiveItems, options);
  const keyPools = getOwnDungeonKeyPotentialPools();
  if (!keyPools.size) return reachable;

  let changed = true;
  while (changed) {
    changed = false;
    keyPools.forEach(({ item, count, itemPools }, itemKey) => {
      let ownedCount = effectiveItems.filter((candidate) => getSphereInventoryItemKey(candidate) === itemKey).length;
      while (ownedCount < count) {
        const potentialLocations = itemPools[ownedCount] || [];
        const keyIsGuaranteed = potentialLocations.length > 0 && potentialLocations.every((location) => (
          isLocationMarked(location) || reachable.has(normalize(location))
        ));
        if (!keyIsGuaranteed) break;
        effectiveItems.push(item);
        ownedCount += 1;
        changed = true;
        reachable = getSphereReachableLocationSet(effectiveItems, options);
      }
    });
  }
  return reachable;
}

function invalidateSphereAnalysis() {
  sphereAnalysisJobId += 1;
  if (sphereAnalysisWorker) sphereAnalysisWorker.terminate();
  sphereAnalysisWorker = null;
  sphereAnalysisCache = { key: "", calculation: null, relativeUnknown: null, pathProgress: [], dependenciesReady: false };
  sphereReachabilityCache.clear();
  sphereHardBossRequirementCache.clear();
  sphereOwnDungeonKeyPoolCache = { key: "", pools: new Map() };
}

function finishSphereDependencyAnalysis(key, calculation) {
  if (sphereAnalysisCache.key !== key || !calculation) return;
  const knowledge = getSphereTrackingKnowledge();
  const relativeUnknown = inferRelativeUnknownSpheres(knowledge, calculation);
  sphereAnalysisCache = {
    key,
    calculation,
    relativeUnknown,
    pathProgress: getPathBossProgressEntries(knowledge, calculation, relativeUnknown),
    dependenciesReady: true
  };
  if (shouldRenderSphereBoard()) renderSphereBoard();
}

function queueSphereDependencyAnalysis(key, placements) {
  const jobId = ++sphereAnalysisJobId;
  if (sphereAnalysisWorker) sphereAnalysisWorker.terminate();

  if (typeof Worker === "undefined") {
    window.setTimeout(() => {
      if (jobId !== sphereAnalysisJobId || sphereAnalysisCache.key !== key) return;
      finishSphereDependencyAnalysis(key, calculateSphereProgression(placements));
    }, 0);
    return;
  }

  const worker = new Worker(new URL("sphere-worker.js", document.baseURI));
  sphereAnalysisWorker = worker;
  worker.addEventListener("message", (event) => {
    if (event.data?.jobId !== jobId || jobId !== sphereAnalysisJobId) return;
    worker.terminate();
    if (sphereAnalysisWorker === worker) sphereAnalysisWorker = null;
    if (event.data.error) {
      window.setTimeout(() => {
        if (jobId !== sphereAnalysisJobId || sphereAnalysisCache.key !== key) return;
        finishSphereDependencyAnalysis(key, calculateSphereProgression(placements));
      }, 0);
      return;
    }
    finishSphereDependencyAnalysis(key, event.data.calculation);
  });
  worker.addEventListener("error", () => {
    if (jobId !== sphereAnalysisJobId) return;
    worker.terminate();
    if (sphereAnalysisWorker === worker) sphereAnalysisWorker = null;
    window.setTimeout(() => {
      if (jobId !== sphereAnalysisJobId || sphereAnalysisCache.key !== key) return;
      finishSphereDependencyAnalysis(key, calculateSphereProgression(placements));
    }, 0);
  }, { once: true });
  worker.postMessage({ jobId, input: getSphereCalculationInput(placements) });
}

function getSphereAnalysisKey(knowledge) {
  return JSON.stringify({
    revision: sphereLogicRevision,
    placements: knowledge.placements.map(({ id, item, location }) => [id, item, location]),
    areaHints: knowledge.areaHints.map((hint) => [hint.lineNumber, hint.left.name, hint.right.name]),
    pathHints: knowledge.pathHints.map((hint) => [hint.lineNumber, hint.left.name, hint.right.name]),
    barrenHints: knowledge.barrenHints.map((hint) => [hint.lineNumber, hint.left.name]),
    acquiredShards: knowledge.acquiredShardSources.map((source) => source.number),
    autosaveItems: knowledge.autosaveItemSources.map((source) => source.item),
    startingGear: state.data.sphereStartingGear,
    blueChuJellyCount: getSphereBlueChuJellyCount(),
    markedLocations: [
      ...state.data.randoMarkedLocationKeys,
      ...Object.keys(state.checked).filter((key) => key.startsWith("sphere-location-checked:") && state.checked[key])
    ].sort(),
    entrances: Object.entries(state.sphere.entranceMappings).sort(([first], [second]) => first.localeCompare(second))
      .concat(Object.entries(state.data.sphereEntranceConnections).sort(([first], [second]) => first.localeCompare(second))),
    charts: Object.entries(state.data.sphereChartMappings).sort(([first], [second]) => first.localeCompare(second))
  });
}

function getSphereBoardAnalysis(knowledge) {
  const key = getSphereAnalysisKey(knowledge);
  if (sphereAnalysisCache.key === key) return sphereAnalysisCache;
  sphereReachabilityCache.clear();
  const canAnalyze = state.data.sphereLogicLoaded && Boolean(window.WWRSphereEngine);
  sphereAnalysisCache = {
    key,
    calculation: null,
    relativeUnknown: null,
    pathProgress: [],
    dependenciesReady: false,
    pending: canAnalyze
  };
  if (canAnalyze) queueSphereDependencyAnalysis(key, knowledge.placements);
  return sphereAnalysisCache;
}

function getResolvedProgressiveUpgradeProviders(knowledge, calculation) {
  const prunedPlacementIds = new Set(calculation.prunedPlacementIds || []);
  const counts = new Map();
  state.data.sphereStartingGear.forEach((item) => {
    const itemKey = normalize(item);
    if (!itemKey.startsWith("progressive ")) return;
    counts.set(itemKey, (counts.get(itemKey) || 0) + 1);
  });

  const providers = new Map();
  knowledge.placements
    .filter((placement) => Number.isInteger(calculation.placementSpheres[placement.id]) && !prunedPlacementIds.has(placement.id))
    .sort((first, second) => calculation.placementSpheres[first.id] - calculation.placementSpheres[second.id])
    .forEach((placement) => {
      const itemKey = normalize(placement.item);
      if (!itemKey.startsWith("progressive ")) return;
      const previousCount = counts.get(itemKey) || 0;
      counts.set(itemKey, previousCount + 1);
      if (previousCount > 0) providers.set(itemKey, placement);
    });

  return [...providers.values()];
}

function inferRelativeUnknownSpheres(knowledge, calculation) {
  const prunedPlacementIds = new Set(calculation.prunedPlacementIds || []);
  const unresolvedPlacements = knowledge.placements.filter((placement) => (
    !Number.isInteger(calculation.placementSpheres[placement.id]) && !prunedPlacementIds.has(placement.id)
  ));
  const prunedPlacements = knowledge.placements.filter((placement) => (
    prunedPlacementIds.has(placement.id) && !placement.fromHint
  ));
  const areaSources = knowledge.areaHints.map((hint) => ({
    id: `sphere-area-hint-${hint.lineNumber}`,
    item: hint.left.name
  }));
  const sources = [
    ...unresolvedPlacements,
    ...prunedPlacements,
    ...areaSources,
    ...knowledge.acquiredShardSources,
    ...knowledge.autosaveItemSources
  ];
  const placementLevels = new Map(unresolvedPlacements.map((placement) => [placement.id, 0]));
  const dependencies = new Map(unresolvedPlacements.map((placement) => [placement.id, []]));
  if (!sources.length || !window.WWRSphereEngine?.getReachableLocations) {
    return { unresolvedPlacements, placementLevels, dependencies, availableLocations: [], availableDependencies: new Map() };
  }

  const resolvedPlacements = knowledge.placements
    .filter((placement) => Number.isInteger(calculation.placementSpheres[placement.id]) && !prunedPlacementIds.has(placement.id));
  const resolvedItems = resolvedPlacements.map((placement) => getDungeonSmallKeyName(placement.item, placement.location) || placement.item);
  const knownItems = [...getSphereLogicStartingGear(), ...resolvedItems];
  const baselineReachable = new Set(Object.keys(calculation.locationSpheres));
  const reachableByItem = new Map();
  const progressiveProviders = getResolvedProgressiveUpgradeProviders(knowledge, calculation);
  const reducedReachability = new Map();
  const getReachableLocations = getSphereReachableLocationSet;

  const acquiredUnknownSources = [
    ...unresolvedPlacements.filter((placement) => !placement.fromHint),
    ...prunedPlacements,
    ...knowledge.acquiredShardSources,
    ...knowledge.autosaveItemSources
  ];
  const reachableWithAcquiredItems = getSphereReachabilityWithOwnDungeonKeys([
    ...knownItems,
    ...acquiredUnknownSources.map((source) => getDungeonSmallKeyName(source.item, source.location) || source.item)
  ]);
  const occupiedLocationKeys = new Set(knowledge.placements.map((placement) => normalize(placement.location)));
  const availableLocations = getAvailableLocations().filter((location) => {
    const locationKey = normalize(location);
    return !baselineReachable.has(locationKey)
      && reachableWithAcquiredItems.has(locationKey)
      && !occupiedLocationKeys.has(locationKey)
      && !isLocationMarked(location);
  });
  const availableDependencies = new Map(availableLocations.map((location) => [normalize(location), []]));

  const dependencySources = sources.filter((source) => !source.fromAutosave);
  const requiredItemCache = new Map();
  dependencySources.forEach((source) => {
    const itemKey = normalize(source.item);
    if (!reachableByItem.has(itemKey)) {
      reachableByItem.set(itemKey, getReachableLocations([...knownItems, source.item]));
    }

    const reachable = reachableByItem.get(itemKey);
    availableLocations.forEach((location) => {
      if (!reachable.has(normalize(location)) && !isLogicRequiredItemForLocation(source, location, requiredItemCache)) return;
      availableDependencies.get(normalize(location)).push(source.id);
    });
    const newlyReachableTargets = unresolvedPlacements.filter((target) => {
      if (target.id === source.id) return;
      const locationKey = normalize(target.location);
      return !baselineReachable.has(locationKey)
        && (reachable.has(locationKey) || isLogicRequiredItemForLocation(source, target.location, requiredItemCache));
    });
    newlyReachableTargets.forEach((target) => {
      dependencies.get(target.id).push(source.id);
    });
    if (!newlyReachableTargets.length) return;

    progressiveProviders.forEach((provider) => {
      const cacheKey = `${itemKey}:${provider.id}`;
      if (!reducedReachability.has(cacheKey)) {
        const reducedItems = [
          ...getSphereLogicStartingGear(),
          ...resolvedPlacements.filter((placement) => placement.id !== provider.id).map((placement) => placement.item),
          source.item
        ];
        reducedReachability.set(cacheKey, getReachableLocations(reducedItems));
      }

      const reduced = reducedReachability.get(cacheKey);
      newlyReachableTargets.forEach((target) => {
        if (!reduced.has(normalize(target.location))) dependencies.get(target.id).push(provider.id);
      });
    });
  });

  // Triforce access is a count gate, so no single unknown shard can reveal the
  // dependency. Test all obtained unknown shards together, then remove them one
  // at a time to keep the resulting graph honest.
  const unknownShardSources = [
    ...unresolvedPlacements.filter((placement) => {
      const shardNumber = Number(getShardNumber(placement.item));
      return shardNumber && (!placement.fromHint || getShardTrackingState(shardNumber).isChecked);
    }),
    ...knowledge.acquiredShardSources
  ];
  if (unknownShardSources.length) {
    const unknownShardItems = unknownShardSources.map((source) => source.item);
    const reachableWithShards = getReachableLocations([...knownItems, ...unknownShardItems]);
    const shardTargets = unresolvedPlacements.filter((target) => {
      const locationKey = normalize(target.location);
      return !baselineReachable.has(locationKey) && reachableWithShards.has(locationKey);
    });

    // Neither of these depends on which target we're checking - hoisted out of the
    // shardTargets loop so each is computed once instead of once per target (this
    // was previously O(shardTargets x sources) and O(shardTargets x providers) full
    // reachability walks for a result that never varied across targets).
    const reachableWithoutShardSource = unknownShardSources.map((source, sourceIndex) => getReachableLocations([
      ...knownItems,
      ...unknownShardItems.filter((_, itemIndex) => itemIndex !== sourceIndex)
    ]));
    const reachableWithoutProgressiveProvider = progressiveProviders.map((provider) => getReachableLocations([
      ...getSphereLogicStartingGear(),
      ...resolvedPlacements.filter((placement) => placement.id !== provider.id).map((placement) => placement.item),
      ...unknownShardItems
    ]));

    shardTargets.forEach((target) => {
      const locationKey = normalize(target.location);
      unknownShardSources.forEach((source, sourceIndex) => {
        if (!reachableWithoutShardSource[sourceIndex].has(locationKey)) dependencies.get(target.id).push(source.id);
      });

      progressiveProviders.forEach((provider, providerIndex) => {
        if (!reachableWithoutProgressiveProvider[providerIndex].has(locationKey)) dependencies.get(target.id).push(provider.id);
      });
    });
  }

  // If several unresolved copies of the same item can unlock a target, they are
  // alternatives, not cumulative requirements. Prefer the copy whose own
  // dependency path is shortest and does not loop back through the target.
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const sourceOrder = new Map(sources.map((source, index) => [source.id, index]));
  const getDependencyDepth = (sourceId, targetId, visiting = new Set()) => {
    if (sourceId === targetId || visiting.has(sourceId)) return Number.POSITIVE_INFINITY;
    const childDependencies = unique(dependencies.get(sourceId) || []).filter((id) => sourceById.has(id));
    if (!childDependencies.length) return 0;
    const nextVisiting = new Set(visiting);
    nextVisiting.add(sourceId);
    const childDepths = childDependencies.map((id) => getDependencyDepth(id, targetId, nextVisiting));
    if (childDepths.some((depth) => !Number.isFinite(depth))) return Number.POSITIVE_INFINITY;
    return 1 + Math.max(...childDepths);
  };

  dependencies.forEach((parentIds, targetId) => {
    const fixedParents = [];
    const equivalentSources = new Map();
    unique(parentIds).forEach((parentId) => {
      const source = sourceById.get(parentId);
      if (!source) {
        fixedParents.push(parentId);
        return;
      }
      const itemKey = normalize(source.item);
      if (!equivalentSources.has(itemKey)) equivalentSources.set(itemKey, []);
      equivalentSources.get(itemKey).push(parentId);
    });

    equivalentSources.forEach((candidateIds) => {
      const selected = [...candidateIds].sort((firstId, secondId) => {
        const depthDifference = getDependencyDepth(firstId, targetId) - getDependencyDepth(secondId, targetId);
        return Number.isNaN(depthDifference) || depthDifference === 0
          ? (sourceOrder.get(firstId) || 0) - (sourceOrder.get(secondId) || 0)
          : depthDifference;
      })[0];
      if (selected) fixedParents.push(selected);
    });
    dependencies.set(targetId, fixedParents);
  });

  const sourceIds = new Set(sources.map((source) => source.id));
  const children = new Map([...sourceIds].map((id) => [id, []]));
  const indegrees = new Map(unresolvedPlacements.map((placement) => [placement.id, 0]));
  dependencies.forEach((parentIds, targetId) => {
    unique(parentIds).forEach((parentId) => {
      if (!sourceIds.has(parentId)) return;
      if (!children.has(parentId)) children.set(parentId, []);
      children.get(parentId).push(targetId);
      indegrees.set(targetId, (indegrees.get(targetId) || 0) + 1);
    });
  });

  const queue = [...sourceIds].filter((id) => !indegrees.has(id) || indegrees.get(id) === 0);
  const visited = new Set();
  while (queue.length) {
    const sourceId = queue.shift();
    if (visited.has(sourceId)) continue;
    visited.add(sourceId);
    const sourceLevel = placementLevels.get(sourceId) || 0;
    (children.get(sourceId) || []).forEach((targetId) => {
      placementLevels.set(targetId, Math.max(placementLevels.get(targetId) || 0, sourceLevel + 1));
      indegrees.set(targetId, Math.max(0, (indegrees.get(targetId) || 0) - 1));
      if (indegrees.get(targetId) === 0) queue.push(targetId);
    });
  }

  return { unresolvedPlacements, placementLevels, dependencies, availableLocations, availableDependencies };
}

function renderSphereBoard() {
  const knowledge = getSphereTrackingKnowledge();
  const analysis = getSphereBoardAnalysis(knowledge);
  const calculation = analysis.calculation;
  if (!calculation) {
    const hasExistingGraph = sphereColumns.children.length > 0;
    if (analysis.pending) {
      sphereLogicStatus.textContent = `${state.sphere.placements.length} placed - analyzing`;
      sphereBoardEmpty.textContent = "Analyzing sphere logic...";
      sphereBoardEmpty.hidden = hasExistingGraph;
      sphereCanvas.hidden = !hasExistingGraph;
      const popupDocument = spherePopoutWindow && !spherePopoutWindow.closed
        ? spherePopoutWindow.document
        : null;
      const popupStatus = popupDocument?.querySelector("#spherePopoutStatus");
      const popupEmpty = popupDocument?.querySelector("#spherePopoutEmpty");
      const popupCanvas = popupDocument?.querySelector("#spherePopoutCanvas");
      if (popupStatus) popupStatus.textContent = sphereLogicStatus.textContent;
      if (popupEmpty) {
        popupEmpty.textContent = sphereBoardEmpty.textContent;
        popupEmpty.hidden = sphereBoardEmpty.hidden;
      }
      if (popupCanvas) popupCanvas.hidden = sphereCanvas.hidden;
    } else {
      sphereColumns.innerHTML = "";
      sphereEdges.innerHTML = "";
      sphereBoardEmpty.textContent = "Sync the randomizer folder, then assign an item to an exact location in Sphere mode.";
      sphereBoardEmpty.hidden = false;
      sphereCanvas.hidden = true;
      sphereLogicStatus.textContent = "Sync for sphere logic";
      syncSpherePopout();
    }
    return;
  }

  const scrollLeft = sphereBoard.scrollLeft;
  const scrollTop = sphereBoard.scrollTop;
  sphereColumns.querySelectorAll(".sphere-area-group[data-node-id]").forEach((group) => {
    sphereAreaGroupOpenState.set(group.dataset.nodeId, group.open);
  });
  sphereColumns.innerHTML = "";
  sphereEdges.innerHTML = "";
  sphereBoardEmpty.textContent = "Sync the randomizer folder, then assign an item to an exact location in Sphere mode.";
  sphereBoardEmpty.hidden = true;
  sphereCanvas.hidden = false;
  sphereLogicStatus.textContent = `${state.sphere.placements.length} placed${knowledge.hintPlacements.length ? ` + ${knowledge.hintPlacements.length} location hints` : ""}`;
  const pathProgress = analysis.pathProgress;
  const pathBossIconsByLocation = analysis.dependenciesReady
    ? buildPathBossLocationIcons(knowledge, calculation, analysis.relativeUnknown)
    : new Map();

  const placementByLocation = new Map(knowledge.placements.map((placement) => [normalize(placement.location), placement]));
  const startColumn = document.createElement("article");
  startColumn.className = "sphere-column start-column";
  const startHeading = document.createElement("h3");
  startHeading.textContent = "Start";
  const startNode = document.createElement("div");
  startNode.className = "sphere-start-node";
  startNode.dataset.nodeId = "start";
  startNode.textContent = state.data.sphereStartingGear.length ? `${state.data.sphereStartingGear.length} starting items` : "Starting gear";
  startNode.title = state.data.sphereStartingGear.join("\n") || "No additional starting gear";
  const groupToggleButton = document.createElement("button");
  groupToggleButton.type = "button";
  groupToggleButton.className = "sphere-groups-toggle";
  groupToggleButton.addEventListener("click", () => toggleAllSphereAreaGroups(sphereColumns));
  startColumn.append(startHeading, startNode, groupToggleButton);
  sphereColumns.appendChild(startColumn);

  const sphereNumbers = calculation.sphereLocations.map((locations, sphere) => locations?.length ? sphere : null).filter((sphere) => sphere !== null);
  sphereNumbers.forEach((sphere) => {
    const column = document.createElement("article");
    column.className = "sphere-column";
    const heading = document.createElement("h3");
    heading.textContent = `Sphere ${sphere}`;
    column.appendChild(heading);

    const sphereLocations = calculation.sphereLocations[sphere] || [];
    const placements = sphereLocations.map((location) => placementByLocation.get(normalize(location))).filter(Boolean);
    const solvedPathHints = pathProgress.filter((entry) => entry.progress.kind === "exact" && entry.progress.sphere === sphere);
    const placementList = document.createElement("div");
    placementList.className = "sphere-placement-list";
    placements.forEach((placement) => placementList.appendChild(createSpherePlacementNode(
      placement,
      sphere,
      calculation
    )));

    const openLocations = sphereLocations.filter((location) => !placementByLocation.has(normalize(location)) && !isLocationMarked(location));
    if (!placements.length && !openLocations.length && !solvedPathHints.length) return;
    const groups = groupSphereLocationsByArea(openLocations);
    if (groups.length) {
      const availableHeading = document.createElement("div");
      availableHeading.className = "sphere-available-heading";
      availableHeading.textContent = `Available ${openLocations.length}`;
      column.appendChild(availableHeading);

      const groupList = document.createElement("div");
      groupList.className = "sphere-area-groups";
      groups.forEach((group) => groupList.appendChild(createSphereAreaGroup(
        group,
        sphere,
        calculation,
        pathBossIconsByLocation
      )));
      column.appendChild(groupList);
    }
    if (placements.length) column.appendChild(placementList);
    if (solvedPathHints.length) {
      const pathList = document.createElement("div");
      pathList.className = "sphere-prediction-list";
      solvedPathHints.forEach(({ hint, progress }) => pathList.appendChild(createSpherePathPredictionNode(
        hint,
        knowledge,
        calculation,
        analysis.relativeUnknown,
        progress
      )));
      column.appendChild(pathList);
    }

    sphereColumns.appendChild(column);
  });

  renderSpherePredictionColumns(
    knowledge,
    calculation,
    analysis.relativeUnknown,
    pathProgress,
    pathBossIconsByLocation
  );
  updateSphereGroupToggleButtons();
  syncSpherePopout();
  requestAnimationFrame(() => requestAnimationFrame(() => {
    sphereBoard.scrollLeft = scrollLeft;
    sphereBoard.scrollTop = scrollTop;
    drawSphereEdges();
  }));
}

function createSpherePlacementNode(
  placement,
  sphere,
  calculation,
  relativeDependencies = null
) {
  const knownSphere = Number.isInteger(sphere);
  const outOfLogic = !Number.isInteger(calculation.locationSpheres[normalize(placement.location)]);
  const itemKey = normalize(placement.item);
  const jalhallaRequired = !state.data.requiredBosses.size || state.data.requiredBosses.has(normalize("Jalhalla"));
  const mandatoryUpgrade = ["progressive sword", "progressive bow", "progressive picto box"].includes(itemKey)
    || (itemKey === "progressive shield" && jalhallaRequired);
  const isPruned = !mandatoryUpgrade && (calculation.prunedPlacementIds || []).includes(placement.id);
  const card = document.createElement("button");
  card.type = "button";
  card.className = `sphere-placement${placement.fromHint ? " hint-derived" : ""}${knownSphere ? "" : " unknown-sphere-placement"}${outOfLogic ? " out-of-logic-placement" : ""}${isPruned ? " optional-placement" : ""}`;
  card.dataset.nodeId = placement.id;
  card.dataset.pathItem = placement.item;
  card.dataset.dependencies = (relativeDependencies || calculation.dependencies[normalize(placement.location)] || []).join(",");
  if (!placement.fromHint) card.dataset.markedLocation = "true";
  if (placement.fromHint) card.dataset.hintLine = placement.lineNumber;
  const sphereLabel = knownSphere ? `Sphere ${sphere}` : outOfLogic ? "Out of logic" : "Sphere unknown";
  const optionalLabel = isPruned ? "\nOptional in the minimal playthrough" : "";
  card.title = `${placement.item}\n${placement.location}\n${sphereLabel}${optionalLabel}\nRight-click to remove ${placement.fromHint ? "hint" : "placement"}`;
  card.setAttribute("aria-label", `${placement.item} at ${placement.location}, ${sphereLabel.toLowerCase()}${isPruned ? ", optional" : ""}`);
  card.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (placement.fromHint) {
      removeHintLine(placement.lineNumber);
    } else {
      removeSpherePlacement(placement.id);
    }
  });
  addSphereNodeHighlightEvents(card);

  const icon = document.createElement("span");
  icon.className = "sphere-item-icon";
  const image = document.createElement("img");
  image.src = itemImage(placement.item);
  image.alt = "";
  icon.appendChild(image);
  const itemBadge = getItemNumberBadge(placement.item);
  if (itemBadge) {
    const badge = document.createElement("span");
    badge.className = `item-number ${itemBadge.className}`;
    badge.textContent = itemBadge.number;
    icon.appendChild(badge);
  }

  const label = document.createElement("span");
  label.className = "sphere-placement-label";
  const area = getAreaFromLocation(placement.location);
  const areaLabel = document.createElement("small");
  areaLabel.className = "sphere-placement-area";
  areaLabel.textContent = area.replace(" Sector", "");
  const locationLabel = document.createElement("strong");
  locationLabel.className = "sphere-placement-location";
  locationLabel.textContent = placement.location.replace(`${area} - `, "");
  label.append(areaLabel, locationLabel);
  card.append(icon, label);
  if (isPruned) {
    const optional = document.createElement("small");
    optional.className = "sphere-optional-label";
    optional.textContent = "Optional";
    card.appendChild(optional);
  }
  return card;
}

function createSphereAcquiredShardNode(source) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "sphere-placement unknown-sphere-placement";
  card.dataset.nodeId = source.id;
  card.title = `${source.item}\nObtained, exact sphere unknown\nRight-click to mark unobtained`;
  card.setAttribute("aria-label", `${source.item}, obtained, exact sphere unknown`);
  card.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const { shardHintIds, fallbackId } = getShardTrackingState(source.number);
    setChecked(fallbackId, false);
    shardHintIds.forEach((id) => setChecked(id, false));
    localStorage.setItem(CHECKED_KEY, JSON.stringify(state.checked));
    renderGrid();
  });
  addSphereNodeHighlightEvents(card);

  const icon = document.createElement("span");
  icon.className = "sphere-item-icon";
  const image = document.createElement("img");
  image.src = itemImage(source.item);
  image.alt = "";
  icon.appendChild(image);
  const badgeData = getItemNumberBadge(source.item);
  if (badgeData) {
    const badge = document.createElement("span");
    badge.className = `item-number ${badgeData.className}`;
    badge.textContent = badgeData.number;
    icon.appendChild(badge);
  }

  const label = document.createElement("span");
  label.className = "sphere-placement-label";
  label.textContent = "Obtained shard";
  card.append(icon, label);
  return card;
}

function createSphereAutosaveItemNode(source) {
  const card = document.createElement("div");
  card.className = "sphere-placement unknown-sphere-placement";
  card.dataset.nodeId = source.id;
  card.title = `${source.item}\nObtained in linked randomizer tracker, exact sphere unknown`;
  addSphereNodeHighlightEvents(card);

  const icon = document.createElement("span");
  icon.className = "sphere-item-icon";
  const image = document.createElement("img");
  image.src = itemImage(ITEM_NAME_ALIASES[source.item] || source.item);
  image.alt = "";
  icon.appendChild(image);

  const label = document.createElement("span");
  label.className = "sphere-placement-label";
  label.textContent = source.item;
  card.append(icon, label);
  return card;
}

function createSphereAreaHintNode(hint, calculation, knowledge) {
  const occupiedLocationKeys = new Set(knowledge.placements.map((placement) => normalize(placement.location)));
  const locations = getSphereHintAreaLocations(hint.right.name).filter((location) => (
    !occupiedLocationKeys.has(normalize(location)) && !isLocationMarked(location)
  ));
  const card = document.createElement("button");
  card.type = "button";
  card.className = "sphere-hint-prediction hint-derived";
  card.dataset.nodeId = `sphere-area-hint-${hint.lineNumber}`;
  card.dataset.hintLine = hint.lineNumber;
  card.dataset.dependencies = unique(locations.flatMap((location) => calculation.dependencies[normalize(location)] || [])).join(",");
  const prediction = getSphereHintPrediction(locations, calculation);
  card.title = `${hint.left.name} at ${hint.right.name}\n${prediction}\nExact location unknown\nRight-click to remove hint`;
  card.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    removeHintLine(hint.lineNumber);
  });
  addSphereNodeHighlightEvents(card);

  const icon = document.createElement("span");
  icon.className = "sphere-item-icon";
  const image = document.createElement("img");
  image.src = itemImage(hint.left.name);
  image.alt = "";
  icon.appendChild(image);
  const badgeData = getItemNumberBadge(hint.left.name);
  if (badgeData) {
    const badge = document.createElement("span");
    badge.className = `item-number ${badgeData.className}`;
    badge.textContent = badgeData.number;
    icon.appendChild(badge);
  }

  const body = document.createElement("span");
  body.className = "sphere-prediction-body";
  const area = document.createElement("strong");
  area.textContent = hint.right.name.replace(" Sector", "");
  const meta = document.createElement("small");
  meta.textContent = prediction;
  body.append(area, meta);
  card.append(icon, body);
  return card;
}

function getBossLocation(bossName) {
  return Object.entries(BOSS_LOCATIONS).find(([name]) => normalize(name) === normalize(bossName))?.[1] || "";
}

function isOwnDungeonKeyForPath(item) {
  const itemKey = normalize(item);
  if (/small key$/.test(itemKey)) {
    return normalize(state.data.sphereOptions.dungeon_small_keys) === "own dungeon";
  }
  if (/(?:big|boss) key$/.test(itemKey)) {
    return normalize(state.data.sphereOptions.dungeon_big_keys) === "own dungeon";
  }
  return false;
}

function getPathBossProgressEntries(knowledge, calculation, relativeUnknown) {
  const prunedPlacementIds = new Set(calculation.prunedPlacementIds || []);
  const ownDungeonKeyIds = new Set(knowledge.placements
    .filter((placement) => isOwnDungeonKeyForPath(placement.item))
    .map((placement) => placement.id));
  const withoutOwnDungeonKeys = (sourceIds) => unique(sourceIds || [])
    .filter((sourceId) => !ownDungeonKeyIds.has(sourceId));
  const entries = knowledge.pathHints.map((hint) => {
    const bossLocation = getBossLocation(hint.right.name);
    const exactSphere = calculation.locationSpheres[normalize(bossLocation)];
    return {
      hint,
      progress: Number.isInteger(exactSphere)
        ? {
            kind: "exact",
            sphere: exactSphere,
            bossLocation,
            logicalIds: withoutOwnDungeonKeys(calculation.dependencies[normalize(bossLocation)] || [])
          }
        : { kind: "unknown", bossLocation, logicalIds: [] }
    };
  });
  const unresolvedEntries = entries.filter((entry) => entry.progress.kind === "unknown" && entry.progress.bossLocation);
  if (!unresolvedEntries.length) return entries;
  const resolvedItems = knowledge.placements
    .filter((placement) => Number.isInteger(calculation.placementSpheres[placement.id]) && !prunedPlacementIds.has(placement.id))
    .map((placement) => placement.item);
  const relativeSources = [
    ...relativeUnknown.unresolvedPlacements.map((placement) => ({
      id: placement.id,
      item: placement.item,
      level: relativeUnknown.placementLevels.get(placement.id) || 0
    })),
    ...knowledge.areaHints.map((areaHint) => ({ id: `sphere-area-hint-${areaHint.lineNumber}`, item: areaHint.left.name, level: 0 })),
    ...knowledge.acquiredShardSources.map((source) => ({ ...source, level: 0 })),
    ...knowledge.autosaveItemSources.map((source) => ({ ...source, level: 0 }))
  ];
  const maxLevel = Math.max(0, ...relativeSources.map((source) => source.level));
  const inventoriesByLevel = new Map();
  for (let level = 0; level <= maxLevel; level += 1) {
    const items = [
      ...getSphereLogicStartingGear(),
      ...resolvedItems,
      ...relativeSources.filter((source) => source.level <= level).map((source) => source.item)
    ];
    inventoriesByLevel.set(level, items);
    const reachable = getSphereReachabilityWithOwnDungeonKeys(items);
    unresolvedEntries.forEach((entry) => {
      if (entry.progress.kind !== "unknown" || !reachable.has(normalize(entry.progress.bossLocation))) return;
      const bossPlacement = knowledge.placements.find((placement) => normalize(placement.location) === normalize(entry.progress.bossLocation));
      entry.progress = {
        ...entry.progress,
        kind: "relative",
        level: level + 1,
        logicalIds: bossPlacement
          ? withoutOwnDungeonKeys(relativeUnknown.dependencies.get(bossPlacement.id) || [])
          : []
      };
    });
    if (unresolvedEntries.every((entry) => entry.progress.kind !== "unknown")) break;
  }

  const fallbackEntries = unresolvedEntries.filter((entry) => entry.progress.kind === "relative" && !entry.progress.logicalIds.length);
  const fallbackLevels = [...new Set(fallbackEntries.map((entry) => entry.progress.level - 1))];
  fallbackLevels.forEach((sourceLevel) => {
    const levelEntries = fallbackEntries.filter((entry) => entry.progress.level - 1 === sourceLevel);
    const candidateSources = relativeSources.filter((source) => (
      source.level === sourceLevel && !isOwnDungeonKeyForPath(source.item)
    ));
    const fullItems = inventoriesByLevel.get(sourceLevel) || [];
    candidateSources.forEach((candidate) => {
      let removed = false;
      const reducedItems = fullItems.filter((item) => {
        if (!removed && normalize(item) === normalize(candidate.item)) {
          removed = true;
          return false;
        }
        return true;
      });
      const reachableWithoutCandidate = getSphereReachabilityWithOwnDungeonKeys(reducedItems);
      levelEntries.forEach((entry) => {
        if (!reachableWithoutCandidate.has(normalize(entry.progress.bossLocation))) {
          entry.progress.logicalIds.push(candidate.id);
        }
      });
    });
  });
  return entries;
}

function getPathLogicalItems(progress, knowledge, calculation, relativeUnknown) {
  const sourceItems = new Map();
  knowledge.placements.forEach((placement) => sourceItems.set(placement.id, placement.item));
  knowledge.areaHints.forEach((hint) => sourceItems.set(`sphere-area-hint-${hint.lineNumber}`, hint.left.name));
  knowledge.acquiredShardSources.forEach((source) => sourceItems.set(source.id, source.item));
  knowledge.autosaveItemSources.forEach((source) => sourceItems.set(source.id, source.item));
  return unique(progress.logicalIds || []).map((id) => ({
    id,
    item: sourceItems.get(id)
  })).filter((entry) => entry.item).map((entry) => ({
    ...entry,
    sphere: calculation.placementSpheres[entry.id],
    relativeLevel: relativeUnknown.placementLevels.get(entry.id)
  }));
}

function getPathHintSourceIds(hint, progress, knowledge, calculation, relativeUnknown) {
  if (progress.kind === "unknown") return [];
  const placementsById = new Map(knowledge.placements.map((placement) => [placement.id, placement]));
  const dependenciesFor = (sourceId) => {
    const placement = placementsById.get(sourceId);
    if (!placement) return [];
    return calculation.dependencies[normalize(placement.location)]
      || relativeUnknown.dependencies.get(sourceId)
      || [];
  };
  const ancestors = new Set();
  const pending = [...(progress.logicalIds || [])];
  while (pending.length) {
    const sourceId = pending.pop();
    if (!sourceId || ancestors.has(sourceId)) continue;
    ancestors.add(sourceId);
    dependenciesFor(sourceId).forEach((dependencyId) => pending.push(dependencyId));
  }

  const hintedAreaLocations = new Set(getSphereHintAreaLocations(hint.left.name).map(normalize));
  const placementSources = knowledge.placements
    .filter((placement) => (
      ancestors.has(placement.id)
      && hintedAreaLocations.has(normalize(placement.location))
      && !isOwnDungeonKeyForPath(placement.item)
      && !(calculation.prunedPlacementIds || []).includes(placement.id)
    ))
    .map((placement) => ({
      id: placement.id,
      sphere: calculation.placementSpheres[placement.id],
      relativeLevel: relativeUnknown.placementLevels.get(placement.id)
    }));
  const areaHintSources = knowledge.areaHints
    .filter((areaHint) => ancestors.has(`sphere-area-hint-${areaHint.lineNumber}`)
      && getSphereHintAreaLocations(areaHint.right.name).some((location) => hintedAreaLocations.has(normalize(location))))
    .map((areaHint) => `sphere-area-hint-${areaHint.lineNumber}`);
  const latestPlacementSources = selectLatestPathCandidates(placementSources).map((candidate) => candidate.id);
  return unique(latestPlacementSources.length ? latestPlacementSources : areaHintSources);
}

function selectLatestPathCandidates(candidates) {
  if (!candidates.length) return [];
  const rank = (candidate) => Number.isInteger(candidate.sphere)
    ? candidate.sphere
    : Number.isInteger(candidate.relativeLevel) ? candidate.relativeLevel : -1;
  const highestRank = Math.max(...candidates.map(rank));
  return candidates.filter((candidate) => rank(candidate) === highestRank);
}

function getPathHintCandidates(hint, knowledge, calculation, relativeUnknown) {
  const prunedPlacementIds = new Set(calculation.prunedPlacementIds || []);
  const areaLocations = new Set(getSphereHintAreaLocations(hint.left.name).map(normalize));
  const barrenLocationKeys = getBarrenSphereLocationKeys(knowledge);
  const exactCandidates = knowledge.placements.filter((placement) => (
    areaLocations.has(normalize(placement.location))
    && !barrenLocationKeys.has(normalize(placement.location))
    && !prunedPlacementIds.has(placement.id)
    && !isOwnDungeonKeyForPath(placement.item)
  ));
  const usedDependencies = new Set([
    ...Object.values(calculation.dependencies).flat(),
    ...[...relativeUnknown.dependencies.values()].flat()
  ]);
  const confirmedProgression = exactCandidates.filter((placement) => usedDependencies.has(placement.id));
  const selectedExact = confirmedProgression.length ? confirmedProgression : exactCandidates;
  const areaHintCandidates = knowledge.areaHints.filter((itemHint) => {
    if (isOwnDungeonKeyForPath(itemHint.left.name)) return false;
    const itemLocations = getSphereHintAreaLocations(itemHint.right.name);
    return itemLocations.some((location) => (
      areaLocations.has(normalize(location)) && !barrenLocationKeys.has(normalize(location))
    ));
  }).map((itemHint) => ({
    id: `sphere-area-hint-${itemHint.lineNumber}`,
    item: itemHint.left.name,
    lineNumber: itemHint.lineNumber,
    sphere: null
  }));

  return [
    ...selectedExact.map((placement) => ({
      id: placement.id,
      item: placement.item,
      lineNumber: placement.lineNumber || null,
      sphere: calculation.placementSpheres[placement.id],
      relativeLevel: relativeUnknown.placementLevels.get(placement.id),
      confirmed: usedDependencies.has(placement.id)
    })),
    ...areaHintCandidates.map((candidate) => ({
      ...candidate,
      confirmed: usedDependencies.has(candidate.id)
    }))
  ];
}

function getBarrenSphereLocationKeys(knowledge) {
  return new Set((knowledge.barrenHints || []).flatMap((hint) => (
    getSphereHintAreaLocations(hint.left.name).map(normalize)
  )));
}

function isHardRequiredItemForBoss(placement, bossName) {
  if (!placement || isOwnDungeonKeyForPath(placement.item)) return false;
  const bossLocation = getBossLocation(bossName);
  const itemKey = getSphereInventoryItemKey(placement.item, placement.location);
  if (!bossLocation || !itemKey) return false;

  const logicKey = JSON.stringify({
    revision: sphereLogicRevision,
    options: state.data.sphereOptions,
    entrances: Object.entries(state.sphere.entranceMappings).sort(([first], [second]) => first.localeCompare(second)),
    connections: Object.entries(state.data.sphereEntranceConnections).sort(([first], [second]) => first.localeCompare(second)),
    charts: Object.entries(state.data.sphereChartMappings).sort(([first], [second]) => first.localeCompare(second))
  });
  const cacheKey = `${logicKey}|${normalize(bossName)}|${itemKey}`;
  if (sphereHardBossRequirementCache.has(cacheKey)) return sphereHardBossRequirementCache.get(cacheKey);

  const maximalInventory = getMaximalSphereLogicInventory();
  const reducedInventory = maximalInventory.filter((item) => getSphereInventoryItemKey(item) !== itemKey);
  if (reducedInventory.length === maximalInventory.length) {
    sphereHardBossRequirementCache.set(cacheKey, false);
    return false;
  }

  const bossDungeon = getAreaFromLocation(bossLocation);
  const dungeonStart = state.data.sphereWorld?.dungeonStarts?.[normalize(bossDungeon)];
  const reachabilityOptions = dungeonStart ? { additionalStartAreas: [dungeonStart] } : {};
  const fullReachability = getSphereReachabilityWithOwnDungeonKeys(maximalInventory, reachabilityOptions);
  const hardRequired = fullReachability.has(normalize(bossLocation))
    && !getSphereReachabilityWithOwnDungeonKeys(reducedInventory, reachabilityOptions).has(normalize(bossLocation));
  sphereHardBossRequirementCache.set(cacheKey, hardRequired);
  return hardRequired;
}

function buildPathBossLocationIcons(knowledge, calculation, relativeUnknown) {
  const bossesByLocation = new Map();
  const collectedPlacements = knowledge.placements.filter((placement) => !placement.fromHint);
  const placementsById = new Map(collectedPlacements.map((placement) => [placement.id, placement]));
  const occupiedLocationKeys = new Set(knowledge.placements.map((placement) => normalize(placement.location)));
  const availableLocations = unique([
    ...calculation.sphereLocations.flatMap((locations) => locations || []),
    ...(relativeUnknown.availableLocations || [])
  ]).filter((location) => !occupiedLocationKeys.has(normalize(location)) && !isLocationMarked(location));
  const addBoss = (location, bossName) => {
    const locationKey = normalize(location);
    if (!bossesByLocation.has(locationKey)) bossesByLocation.set(locationKey, []);
    const bosses = bossesByLocation.get(locationKey);
    if (!bosses.includes(bossName)) bosses.push(bossName);
  };
  const placementDependencies = (placement) => unique([
    ...(calculation.dependencies[normalize(placement.location)] || []),
    ...(relativeUnknown.dependencies.get(placement.id) || [])
  ]);
  const locationDependencies = (location) => unique([
    ...(calculation.dependencies[normalize(location)] || []),
    ...(relativeUnknown.availableDependencies.get(normalize(location)) || [])
  ]);

  knowledge.pathHints.forEach((hint) => {
    const hintedAreaLocations = new Set(getSphereHintAreaLocations(hint.left.name).map(normalize));
    const treeSourceIds = new Set(collectedPlacements
      .filter((placement) => hintedAreaLocations.has(normalize(placement.location)))
      .map((placement) => placement.id));

    let changed = true;
    while (changed) {
      changed = false;
      collectedPlacements.forEach((placement) => {
        if (treeSourceIds.has(placement.id)) return;
        if (!placementDependencies(placement).some((sourceId) => treeSourceIds.has(sourceId))) return;
        treeSourceIds.add(placement.id);
        changed = true;
      });
    }

    const pathResolved = [...treeSourceIds].some((sourceId) => (
      isHardRequiredItemForBoss(placementsById.get(sourceId), hint.right.name)
    ));
    if (pathResolved) return;

    availableLocations.forEach((location) => {
      if (hintedAreaLocations.has(normalize(location))
        || locationDependencies(location).some((sourceId) => treeSourceIds.has(sourceId))) {
        addBoss(location, hint.right.name);
      }
    });
  });

  return bossesByLocation;
}

function createSpherePathPredictionNode(hint, knowledge, calculation, relativeUnknown, progress) {
  const solved = progress.kind !== "unknown";
  const displayedItems = solved
    ? getPathLogicalItems(progress, knowledge, calculation, relativeUnknown)
    : getPathHintCandidates(hint, knowledge, calculation, relativeUnknown);
  const linkedItems = solved
    ? displayedItems
    : selectLatestPathCandidates(displayedItems.filter((item) => item.confirmed));
  const card = document.createElement("button");
  card.type = "button";
  card.className = "sphere-path-prediction";
  card.dataset.nodeId = `sphere-path-hint-${hint.lineNumber}`;
  card.dataset.hintLine = hint.lineNumber;
  card.dataset.dependencies = unique(linkedItems.map((item) => item.id)).join(",");
  card.dataset.pathSourceIds = getPathHintSourceIds(hint, progress, knowledge, calculation, relativeUnknown).join(",");
  const displayedItemNames = displayedItems.map((item) => item.item);
  const sphereLabel = progress.kind === "exact"
    ? `Sphere ${progress.sphere}`
    : progress.kind === "relative"
      ? progress.level === 1 ? "After sphere ?" : `${progress.level} steps after ?`
      : "Sphere unknown";
  const itemSummary = displayedItemNames.length
    ? `\n${solved ? "Linked items" : "Candidates"}: ${displayedItemNames.join(", ")}`
    : solved ? "" : "\nNo candidate item identified yet";
  card.title = `${hint.left.name} to ${hint.right.name}\n${sphereLabel}${itemSummary}\nRight-click to remove hint`;
  card.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    removeHintLine(hint.lineNumber);
  });
  addSphereNodeHighlightEvents(card);

  const header = document.createElement("span");
  header.className = "sphere-path-header";
  const bossIcon = document.createElement("img");
  bossIcon.className = "sphere-boss-icon";
  bossIcon.src = bossImage(hint.right.name);
  bossIcon.alt = hint.right.name;
  const pathText = document.createElement("span");
  pathText.className = "sphere-path-text";
  const area = document.createElement("strong");
  area.textContent = hint.left.name.replace(" Sector", "");
  const unknown = document.createElement("small");
  unknown.textContent = sphereLabel;
  pathText.append(area, unknown);
  header.append(bossIcon, pathText);
  card.appendChild(header);

  const candidateRow = document.createElement("span");
  candidateRow.className = "sphere-path-candidates";
  if (!displayedItems.length) {
    if (!solved) {
      const empty = document.createElement("small");
      empty.textContent = "Waiting for candidate item";
      candidateRow.appendChild(empty);
    }
  } else {
    displayedItems.forEach((candidate) => {
      const candidateIcon = document.createElement("span");
      candidateIcon.className = "sphere-path-candidate";
      candidateIcon.title = `${candidate.item}${Number.isInteger(candidate.sphere) ? ` - sphere ${candidate.sphere}` : Number.isInteger(candidate.relativeLevel) && candidate.relativeLevel > 0 ? ` - ${candidate.relativeLevel} steps after unknown sphere` : " - sphere unknown"}`;
      const image = document.createElement("img");
      image.src = itemImage(candidate.item);
      image.alt = candidate.item;
      candidateIcon.appendChild(image);
      const badgeData = getItemNumberBadge(candidate.item);
      if (badgeData) {
        const badge = document.createElement("span");
        badge.className = `item-number ${badgeData.className}`;
        badge.textContent = badgeData.number;
        candidateIcon.appendChild(badge);
      }
      if (Number.isInteger(candidate.sphere)) {
        const sphereBadge = document.createElement("span");
        sphereBadge.className = "sphere-candidate-sphere";
        sphereBadge.textContent = `S${candidate.sphere}`;
        candidateIcon.appendChild(sphereBadge);
      } else if (Number.isInteger(candidate.relativeLevel) && candidate.relativeLevel > 0) {
        const sphereBadge = document.createElement("span");
        sphereBadge.className = "sphere-candidate-sphere";
        sphereBadge.textContent = `?+${candidate.relativeLevel}`;
        candidateIcon.appendChild(sphereBadge);
      }
      candidateRow.appendChild(candidateIcon);
    });
    const count = document.createElement("small");
    count.textContent = solved
      ? displayedItems.length === 1 ? "1 linked item" : `${displayedItems.length} linked items`
      : displayedItems.length === 1 ? "1 candidate" : `${displayedItems.length} candidates`;
    candidateRow.appendChild(count);
  }
  if (candidateRow.children.length) card.appendChild(candidateRow);
  return card;
}

function renderSpherePredictionColumns(
  knowledge,
  calculation,
  relativeUnknown,
  pathProgress,
  pathBossIconsByLocation
) {
  const maxRelativeLevel = Math.max(
    0,
    ...relativeUnknown.placementLevels.values(),
    ...pathProgress.filter((entry) => entry.progress.kind === "relative").map((entry) => entry.progress.level)
  );
  for (let level = 0; level <= maxRelativeLevel; level += 1) {
    const placements = relativeUnknown.unresolvedPlacements.filter((placement) => (relativeUnknown.placementLevels.get(placement.id) || 0) === level);
    const areaHints = level === 0 ? knowledge.areaHints : [];
    const acquiredShards = level === 0 ? knowledge.acquiredShardSources : [];
    const autosaveItems = level === 0
      ? knowledge.autosaveItemSources.filter((source) => !/\b(?:small|big|boss) key\b/i.test(source.item))
      : [];
    const availableLocations = level === 0 ? relativeUnknown.availableLocations || [] : [];
    const solvedPathHints = pathProgress.filter((entry) => entry.progress.kind === "relative" && entry.progress.level === level);
    if (!placements.length && !areaHints.length && !acquiredShards.length && !autosaveItems.length && !availableLocations.length && !solvedPathHints.length) continue;
    const itemColumn = document.createElement("article");
    itemColumn.className = "sphere-column sphere-prediction-column";
    const heading = document.createElement("h3");
    heading.textContent = level === 0 ? "Sphere ?" : level === 1 ? "After sphere ?" : `${level} steps after ?`;
    itemColumn.appendChild(heading);
    const list = document.createElement("div");
    list.className = "sphere-prediction-list";
    placements.forEach((placement) => list.appendChild(createSpherePlacementNode(
      placement,
      null,
      calculation,
      unique(relativeUnknown.dependencies.get(placement.id) || [])
    )));
    acquiredShards.forEach((source) => list.appendChild(createSphereAcquiredShardNode(source)));
    autosaveItems.forEach((source) => list.appendChild(createSphereAutosaveItemNode(source)));
    areaHints.forEach((hint) => list.appendChild(createSphereAreaHintNode(hint, calculation, knowledge)));
    solvedPathHints.forEach(({ hint, progress }) => list.appendChild(createSpherePathPredictionNode(
      hint,
      knowledge,
      calculation,
      relativeUnknown,
      progress
    )));
    if (availableLocations.length) {
      const availableHeading = document.createElement("div");
      availableHeading.className = "sphere-available-heading";
      availableHeading.textContent = `Available ${availableLocations.length}`;
      itemColumn.appendChild(availableHeading);

      const groupList = document.createElement("div");
      groupList.className = "sphere-area-groups";
      const unknownCalculation = { dependencies: {} };
      groupSphereLocationsByArea(availableLocations)
        .forEach((group) => groupList.appendChild(createSphereAreaGroup(
          group,
          "unknown",
          unknownCalculation,
          pathBossIconsByLocation
        )));
      itemColumn.appendChild(groupList);
    }
    itemColumn.appendChild(list);
    sphereColumns.appendChild(itemColumn);
  }

  const unresolvedPathHints = pathProgress.filter((entry) => entry.progress.kind === "unknown");
  if (unresolvedPathHints.length) {
    const pathColumn = document.createElement("article");
    pathColumn.className = "sphere-column sphere-path-column";
    const heading = document.createElement("h3");
    heading.textContent = "Paths";
    pathColumn.appendChild(heading);
    const list = document.createElement("div");
    list.className = "sphere-prediction-list";
    unresolvedPathHints.forEach(({ hint, progress }) => list.appendChild(createSpherePathPredictionNode(
      hint,
      knowledge,
      calculation,
      relativeUnknown,
      progress
    )));
    pathColumn.appendChild(list);
    sphereColumns.appendChild(pathColumn);
  }
}
function groupSphereLocationsByArea(locations) {
  const groups = new Map();
  locations.forEach((location) => {
    const area = getAreaFromLocation(location);
    if (!groups.has(area)) groups.set(area, []);
    groups.get(area).push(location);
  });
  return [...groups.entries()].map(([area, areaLocations]) => ({ area, locations: areaLocations }));
}

function createSpherePathBossList(possibleBosses) {
  if (!possibleBosses.length) return null;
  const bossList = document.createElement("span");
  bossList.className = "sphere-location-path-bosses";
  bossList.setAttribute("aria-label", `Possibly on the path to ${possibleBosses.join(" or ")}`);
  possibleBosses.forEach((bossName) => {
    const image = document.createElement("img");
    image.className = "sphere-location-path-boss";
    image.src = bossImage(bossName);
    image.alt = bossName;
    image.title = `Possibly on the path to ${bossName}`;
    bossList.appendChild(image);
  });
  return bossList;
}

function createSphereAreaGroup(group, sphere, calculation, pathBossIconsByLocation = new Map()) {
  const details = document.createElement("details");
  details.className = "sphere-area-group";
  details.dataset.nodeId = `sphere-${sphere}-area-${normalize(group.area)}`;
  details.open = sphereAreaGroupOpenState.has(details.dataset.nodeId)
    ? sphereAreaGroupOpenState.get(details.dataset.nodeId)
    : sphereAreaGroupsDefaultOpen;
  const dependencies = unique(group.locations.flatMap((location) => calculation.dependencies[normalize(location)] || []));
  details.dataset.dependencies = dependencies.join(",");
  addSphereNodeHighlightEvents(details);

  const summary = document.createElement("summary");
  const name = document.createElement("span");
  name.textContent = group.area.replace(" Sector", "");
  const count = document.createElement("strong");
  count.textContent = group.locations.length;
  const groupBossList = createSpherePathBossList(unique(group.locations.flatMap((location) => (
    pathBossIconsByLocation.get(normalize(location)) || []
  ))));
  summary.append(name);
  if (groupBossList) summary.appendChild(groupBossList);
  summary.appendChild(count);

  const list = document.createElement("div");
  list.className = "sphere-location-list";
  group.locations.forEach((location) => {
    const locationName = document.createElement("div");
    locationName.dataset.location = location;
    const label = document.createElement("span");
    label.textContent = location.replace(`${getAreaFromLocation(location)} - `, "");
    locationName.appendChild(label);
    const bossList = createSpherePathBossList(pathBossIconsByLocation.get(normalize(location)) || []);
    if (bossList) locationName.appendChild(bossList);
    if (isLocationMarked(location)) {
      locationName.classList.add("rando-marked");
      locationName.title = `${location}\n${getLocationMarkedTitle(location)}`;
    } else {
      locationName.title = location;
    }
    list.appendChild(locationName);
  });
  details.append(summary, list);
  details.addEventListener("toggle", () => handleSphereAreaGroupToggle(details, sphereColumns));
  return details;
}

function getSphereColumnRoots() {
  const roots = [sphereColumns];
  const popupColumns = spherePopoutWindow && !spherePopoutWindow.closed
    ? spherePopoutWindow.document.querySelector("#spherePopoutColumns")
    : null;
  if (popupColumns) roots.push(popupColumns);
  return roots;
}

function updateSphereGroupToggleButtons() {
  getSphereColumnRoots().forEach((root) => {
    const groups = [...root.querySelectorAll(".sphere-area-group")];
    const shouldExpand = groups.some((group) => !group.open);
    root.querySelectorAll(".sphere-groups-toggle").forEach((button) => {
      button.textContent = shouldExpand ? "Expand all" : "Collapse all";
      button.title = shouldExpand ? "Expand every area panel" : "Collapse every area panel";
    });
  });
}

function handleSphereAreaGroupToggle(group, sourceRoot) {
  const nodeId = group.dataset.nodeId;
  sphereAreaGroupOpenState.set(nodeId, group.open);
  getSphereColumnRoots().forEach((root) => {
    if (root === sourceRoot) return;
    const matchingGroup = [...root.querySelectorAll(".sphere-area-group")]
      .find((candidate) => candidate.dataset.nodeId === nodeId);
    if (matchingGroup && matchingGroup.open !== group.open) matchingGroup.open = group.open;
  });
  updateSphereGroupToggleButtons();
  requestAnimationFrame(drawSphereEdges);
  spherePopoutWindow?.requestAnimationFrame?.(() => drawSphereEdgesInPopout());
}

function toggleAllSphereAreaGroups(sourceRoot) {
  const shouldExpand = [...sourceRoot.querySelectorAll(".sphere-area-group")].some((group) => !group.open);
  sphereAreaGroupsDefaultOpen = shouldExpand;
  sphereAreaGroupOpenState.clear();
  getSphereColumnRoots().forEach((root) => {
    root.querySelectorAll(".sphere-area-group").forEach((group) => {
      group.open = shouldExpand;
      sphereAreaGroupOpenState.set(group.dataset.nodeId, shouldExpand);
    });
  });
  updateSphereGroupToggleButtons();
  requestAnimationFrame(drawSphereEdges);
  spherePopoutWindow?.requestAnimationFrame?.(() => drawSphereEdgesInPopout());
}

function drawSphereEdges() {
  if (sphereBoard.hidden || sphereCanvas.hidden) return;
  const canvasRect = sphereCanvas.getBoundingClientRect();
  const width = Math.max(sphereCanvas.scrollWidth, sphereCanvas.clientWidth);
  const height = Math.max(sphereCanvas.scrollHeight, sphereCanvas.clientHeight);
  sphereEdges.setAttribute("width", width);
  sphereEdges.setAttribute("height", height);
  sphereEdges.setAttribute("viewBox", `0 0 ${width} ${height}`);
  sphereEdges.innerHTML = "";

  const nodes = new Map([...sphereCanvas.querySelectorAll("[data-node-id]")].map((node) => [node.dataset.nodeId, node]));
  nodes.forEach((target, targetId) => {
    const dependencies = target.dataset.dependencies?.split(",").filter(Boolean) || [];
    dependencies.forEach((sourceId) => {
      const source = nodes.get(sourceId);
      if (!source) return;
      const sourceRect = source.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const startX = sourceRect.right - canvasRect.left;
      const startY = sourceRect.top + sourceRect.height / 2 - canvasRect.top;
      const endX = targetRect.left - canvasRect.left;
      const endY = targetRect.top + targetRect.height / 2 - canvasRect.top;
      const bend = Math.max(20, (endX - startX) * 0.45);
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M ${startX} ${startY} C ${startX + bend} ${startY}, ${endX - bend} ${endY}, ${endX} ${endY}`);
      path.dataset.source = sourceId;
      path.dataset.target = targetId;
      sphereEdges.appendChild(path);
    });
  });
  markSpherePathHintEdges(nodes, sphereCanvas, sphereEdges);
}

function markSpherePathHintEdges(nodes, canvas, edges) {
  nodes.forEach((node) => {
    node.classList.remove("path-chain-location");
    delete node.dataset.pathTargetIds;
  });
  const parents = new Map();
  const children = new Map([...nodes.keys()].map((id) => [id, []]));
  nodes.forEach((node, targetId) => {
    const dependencies = node.dataset.dependencies?.split(",").filter((id) => nodes.has(id)) || [];
    parents.set(targetId, dependencies);
    dependencies.forEach((sourceId) => children.get(sourceId).push(targetId));
  });

  const pathEdges = new Set();
  const pathNodeIds = new Set();
  const addPathTarget = (pathNodeId, targetId) => {
    const node = nodes.get(pathNodeId);
    if (!node) return;
    if (node.classList.contains("sphere-placement") && isOwnDungeonKeyForPath(node.dataset.pathItem || "")) return;
    const targetIds = new Set((node.dataset.pathTargetIds || "").split(",").filter(Boolean));
    targetIds.add(targetId);
    node.dataset.pathTargetIds = [...targetIds].join(",");
    pathNodeIds.add(pathNodeId);
  };
  canvas.querySelectorAll(".sphere-path-prediction[data-path-source-ids]").forEach((pathCard) => {
    const targetId = pathCard.dataset.nodeId;
    const pathSourceIds = pathCard.dataset.pathSourceIds.split(",").filter((id) => nodes.has(id));
    if (!pathSourceIds.length) return;
    const cardPathNodeIds = new Set([targetId]);

    const ancestors = new Set([targetId]);
    const ancestorQueue = [targetId];
    while (ancestorQueue.length) {
      const currentId = ancestorQueue.pop();
      (parents.get(currentId) || []).forEach((sourceId) => {
        if (ancestors.has(sourceId)) return;
        ancestors.add(sourceId);
        ancestorQueue.push(sourceId);
      });
    }

    pathSourceIds.forEach((sourceId) => {
      if (!ancestors.has(sourceId)) return;
      cardPathNodeIds.add(sourceId);
      const visited = new Set([sourceId]);
      const pending = [sourceId];
      while (pending.length) {
        const currentId = pending.shift();
        (children.get(currentId) || []).forEach((childId) => {
          if (!ancestors.has(childId)) return;
          pathEdges.add(`${currentId}\n${childId}`);
          cardPathNodeIds.add(currentId);
          cardPathNodeIds.add(childId);
          if (visited.has(childId)) return;
          visited.add(childId);
          pending.push(childId);
        });
      }
    });
    cardPathNodeIds.forEach((pathNodeId) => addPathTarget(pathNodeId, targetId));
  });

  const purplePaths = [];
  edges.querySelectorAll("path").forEach((path) => {
    const isPurple = pathEdges.has(`${path.dataset.source}\n${path.dataset.target}`);
    path.classList.toggle("path-hint-edge", isPurple);
    if (isPurple) {
      purplePaths.push(path);
    }
  });
  pathNodeIds.forEach((nodeId) => nodes.get(nodeId)?.classList.add("path-chain-location"));
  purplePaths.forEach((path) => edges.appendChild(path));
}

function addSphereNodeHighlightEvents(node) {
  node.addEventListener("mouseenter", () => setSphereEdgeHighlight(node.dataset.nodeId));
  node.addEventListener("mouseleave", () => setSphereEdgeHighlight(""));
}

function setSphereEdgeHighlight(nodeId) {
  applySphereChainFocus(sphereCanvas, sphereEdges, nodeId);
}

function applySphereChainFocus(canvas, edges, nodeId) {
  if (!canvas || !edges) return;
  const nodes = new Map([...canvas.querySelectorAll("[data-node-id]")].map((node) => [node.dataset.nodeId, node]));
  if (!nodeId || !nodes.has(nodeId)) {
    canvas.classList.remove("sphere-chain-focus");
    nodes.forEach((node) => node.classList.remove("sphere-chain-dimmed", "suppress-path-tint"));
    edges.querySelectorAll("path").forEach((path) => path.classList.remove("highlighted", "sphere-chain-dimmed"));
    return;
  }

  const parents = new Map();
  const children = new Map([...nodes.keys()].map((id) => [id, []]));
  nodes.forEach((node, targetId) => {
    const dependencies = node.dataset.dependencies?.split(",").filter((id) => nodes.has(id)) || [];
    parents.set(targetId, dependencies);
    dependencies.forEach((sourceId) => children.get(sourceId).push(targetId));
  });

  const chain = new Set([nodeId]);
  const highlightedEdges = new Set();
  const edgeKey = (sourceId, targetId) => `${sourceId}\n${targetId}`;
  const collectParents = (startId) => {
    const pending = [startId];
    while (pending.length) {
      const currentId = pending.pop();
      (parents.get(currentId) || []).forEach((parentId) => {
        highlightedEdges.add(edgeKey(parentId, currentId));
        if (chain.has(parentId)) return;
        chain.add(parentId);
        pending.push(parentId);
      });
    }
  };
  collectParents(nodeId);

  const descendantMemo = new Map();
  const collectMarkedDescendants = (currentId, visiting = new Set()) => {
    if (descendantMemo.has(currentId)) return descendantMemo.get(currentId);
    if (visiting.has(currentId)) return false;
    const nextVisiting = new Set(visiting).add(currentId);
    let reachesMarkedLocation = false;

    (children.get(currentId) || []).forEach((childId) => {
      const child = nodes.get(childId);
      const childIsMarkedLocation = child?.dataset.markedLocation === "true";
      const childReachesMarkedLocation = collectMarkedDescendants(childId, nextVisiting);
      if (!childIsMarkedLocation && !childReachesMarkedLocation) return;
      chain.add(childId);
      highlightedEdges.add(edgeKey(currentId, childId));
      reachesMarkedLocation = true;
    });

    descendantMemo.set(currentId, reachesMarkedLocation);
    return reachesMarkedLocation;
  };
  collectMarkedDescendants(nodeId);

  canvas.classList.add("sphere-chain-focus");
  const focusingBoss = nodes.get(nodeId)?.classList.contains("sphere-path-prediction");
  nodes.forEach((node, id) => {
    const pathTargetIds = (node.dataset.pathTargetIds || "").split(",").filter(Boolean);
    node.classList.toggle("sphere-chain-dimmed", !chain.has(id));
    node.classList.toggle(
      "suppress-path-tint",
      focusingBoss && node.classList.contains("path-chain-location") && !pathTargetIds.includes(nodeId)
    );
  });
  edges.querySelectorAll("path").forEach((path) => {
    const inChain = highlightedEdges.has(edgeKey(path.dataset.source, path.dataset.target));
    path.classList.toggle("highlighted", inChain);
    path.classList.toggle("sphere-chain-dimmed", !inChain);
  });
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
  // preferences.json is a convenience the local launcher's server provides (a
  // shareable settings file next to the app); it doesn't exist and can't be written
  // when statically hosted (e.g. GitHub Pages), where localStorage is the only and
  // authoritative store. Skip the request there instead of firing a guaranteed 404
  // on every load.
  if (!canWritePreferencesFile()) return;

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
  parsedHintsFiltersInput.checked = state.settings.parsedHintsFilters;
  automaticModeInput.checked = state.settings.automaticMode;
  automaticLastLocationInput.checked = state.settings.automaticLastLocation;
  automaticLastLocationInput.disabled = !state.settings.automaticMode;
  mapIconSizeInput.value = state.settings.mapIconSize;
  hintArrowPositionInput.value = state.settings.hintArrowPosition;
  document.body.classList.toggle("stream-mode", state.settings.streamMode);
  document.body.classList.toggle("compact-mode", state.settings.compactMode);
  document.body.classList.toggle("hide-parsed-filters", !state.settings.parsedHintsFilters);
  document.body.classList.toggle("chrome-hidden", state.settings.chromeHidden);
  if (!state.settings.automaticMode) resetAutomaticCapture({ render: false });
  renderAutomaticModePrompt();
  renderGrid();
  applyTrackerView();
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
      const nextFolderHandle = await window.showDirectoryPicker();
      stopRandoAutosavePolling();
      randoFolderHandle = nextFolderHandle;
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

async function getLinkedFile(relativePath) {
  if (randoFolderHandle) {
    const parts = relativePath.split("/").filter(Boolean);
    let directoryHandle = randoFolderHandle;

    for (let index = 0; index < parts.length - 1; index += 1) {
      directoryHandle = await directoryHandle.getDirectoryHandle(parts[index]);
    }

    const fileHandle = await directoryHandle.getFileHandle(parts[parts.length - 1]);
    return fileHandle.getFile();
  }

  if (randoFolderFiles) {
    const normalizedPath = relativePath.replace(/\\/g, "/").toLowerCase();
    const file = [...randoFolderFiles].find((candidate) => {
      const path = (candidate.webkitRelativePath || candidate.name).replace(/\\/g, "/").toLowerCase();
      return path === normalizedPath || path.endsWith(`/${normalizedPath}`);
    });
    if (!file) throw new Error(`${relativePath} not found`);
    return file;
  }

  throw new Error("No randomizer folder linked");
}

async function readLinkedTextFile(relativePath) {
  const file = await getLinkedFile(relativePath);
  return file.text();
}

async function readOptionalLinkedTextFile(relativePaths) {
  for (const relativePath of relativePaths) {
    try {
      return await readLinkedTextFile(relativePath);
    } catch {
      // Try the next supported randomizer data location.
    }
  }

  return "";
}

async function readRemoteLocationCategoryText() {
  for (const url of REMOTE_RANDOMIZER_LOCATION_DATA_URLS) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (response.ok) return response.text();
    } catch {
      // Sync still works without category filtering if remote data is unavailable.
    }
  }

  return "";
}

async function readLocationCategoryText() {
  return (await readOptionalLinkedTextFile(RANDOMIZER_LOCATION_DATA_PATHS))
    || (await readBundledText(BUNDLED_RANDOMIZER_LOGIC_PATHS.locationData))
    || (await readRemoteLocationCategoryText());
}

async function readRemoteText(url) {
  try {
    const response = await fetch(url, { cache: "no-store" });
    return response.ok ? response.text() : "";
  } catch {
    return "";
  }
}

async function readBundledText(path) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    return response.ok ? response.text() : "";
  } catch {
    return "";
  }
}

async function readSphereLogicTexts() {
  const readLogicSource = async (key) => (await readOptionalLinkedTextFile(RANDOMIZER_SPHERE_LOGIC_PATHS[key]))
    || (await readBundledText(BUNDLED_RANDOMIZER_LOGIC_PATHS[key]))
    || (await readRemoteText(REMOTE_RANDOMIZER_SPHERE_LOGIC_URLS[key]));
  const [locations, macros, locationData, entrances] = await Promise.all([
    readLogicSource("locations"),
    readLogicSource("macros"),
    readLogicSource("locationData"),
    readLogicSource("entrances")
  ]);
  return { locations, macros, locationData, entrances };
}

function mapSphereRulesToLocationPool(logicLocations) {
  const rules = {};
  const locationAreas = {};
  const sourceByKey = new Map(logicLocations.map((entry) => [normalize(entry.name), entry]));
  const sourceByArea = new Map();
  logicLocations.forEach((entry) => {
    const areaKey = getLocationAreaKey(entry.name);
    if (!sourceByArea.has(areaKey)) sourceByArea.set(areaKey, []);
    sourceByArea.get(areaKey).push(entry);
  });

  state.data.locations.forEach((location) => {
    let source = sourceByKey.get(normalize(location));
    if (!source) {
      const alias = getLocationAlias(location);
      if (alias) source = sourceByKey.get(normalize(alias));
    }
    if (!source) {
      source = (sourceByArea.get(getLocationAreaKey(location)) || [])
        .map((entry) => ({ entry, score: scoreEquivalentLocationName(location, entry.name) }))
        .filter((match) => match.score >= 0.62)
        .sort((first, second) => second.score - first.score)[0]?.entry;
    }
    if (source) {
      const key = normalize(location);
      rules[key] = source.need;
      if (source.area) locationAreas[key] = normalize(source.area);
    }
  });
  Object.entries(SPHERE_RULE_OVERRIDES).forEach(([location, need]) => {
    if (state.data.locations.some((candidate) => normalize(candidate) === normalize(location))) {
      rules[normalize(location)] = need;
    }
  });

  return { rules, locationAreas };
}

// Randomized starting island isn't a "world.yaml"-style logic fact - it's a per-seed
// outcome the randomizer only records as plain text ("Starting Island: X", written by
// SpoilerLog.cpp regardless of whether randomize_starting_island is on, in which case
// X is just vanilla "Outset Island"). It's picked up here from whatever config/autosave
// text Sync is using, the same way entrance mappings and marked locations are.
function getSyncedStartingIsland(text) {
  const match = String(text || "").match(/^Starting Island(?:\s+for\s+world\s+\d+)?\s*:\s*(.+?)\s*$/im);
  return match ? match[1].trim() : "";
}

function applySphereLogic(configText, itemLocationText, macroText, locationDataText = "", entranceTableText = "") {
  sphereLogicRevision += 1;
  invalidateSphereAnalysis();
  if (!window.WWRSphereEngine || !itemLocationText || !macroText) {
    state.data.sphereLogicLoaded = false;
    state.data.sphereRules = {};
    state.data.sphereMacros = {};
    state.data.sphereWorld = null;
    state.data.sphereOptions = {};
    state.data.sphereStartingIsland = "";
    state.data.requiredBosses = new Set();
    state.data.sphereConfiguredStartingGear = [];
    state.data.sphereStartingGear = [];
    return;
  }

  const parsed = window.WWRSphereEngine.parseLogicData(itemLocationText, macroText, locationDataText, entranceTableText);
  const mapped = mapSphereRulesToLocationPool(parsed.locations);
  state.data.sphereRules = mapped.rules;
  state.data.sphereMacros = parsed.macros;
  state.data.sphereWorld = parsed.world ? { ...parsed.world, locationAreas: mapped.locationAreas } : null;
  state.data.sphereOptions = window.WWRSphereEngine.parseConfig(configText);
  state.data.sphereStartingIsland = getSyncedStartingIsland(configText);
  state.data.requiredBosses = new Set(getYamlListSection(configText, "required_bosses").map(normalize));
  Object.entries(REQUIRED_BOSS_OPTION_KEYS).forEach(([bossName, optionKey]) => {
    state.data.sphereOptions[optionKey] = !state.data.requiredBosses.size || state.data.requiredBosses.has(normalize(bossName));
  });
  state.data.sphereConfiguredStartingGear = getYamlListSection(configText, "starting_gear");
  refreshSphereStartingGear();
  state.data.sphereLogicLoaded = Object.keys(state.data.sphereRules).length > 0 && Object.keys(state.data.sphereMacros).length > 0;
}

function parseLocationCategoryData(text) {
  const categoryMap = new Map();
  categoryMap.areaEntries = new Map();
  categoryMap.orderByKey = new Map();
  categoryMap.locationByKey = new Map();
  categoryMap.orderByLocation = new Map();
  categoryMap.nextOrder = 0;
  if (/^\s*-\s+Names\s*:/m.test(String(text || ""))) {
    let currentLocation = "";
    let collectingCategories = false;
    String(text || "").split(/\r?\n/).forEach((rawLine) => {
      const lineWithoutComment = rawLine.replace(/\s+#.*$/, "");
      const trimmed = lineWithoutComment.trim();
      const indent = lineWithoutComment.match(/^\s*/)[0].length;
      if (!trimmed) return;
      if (indent === 0 && /^-\s+Names\s*:/i.test(trimmed)) {
        currentLocation = "";
        collectingCategories = false;
        return;
      }
      if (indent === 2) {
        collectingCategories = /^Category\s*:/i.test(trimmed);
        return;
      }
      if (!currentLocation && indent === 4) {
        const englishName = trimmed.match(/^English\s*:\s*(.+)$/i);
        if (englishName) currentLocation = cleanYamlValue(englishName[1]);
        return;
      }
      if (currentLocation && collectingCategories && indent === 4) {
        const category = trimmed.match(/^-\s*(.+)$/);
        if (category) addLocationCategories(categoryMap, currentLocation, [cleanYamlValue(category[1])]);
      }
    });
    return categoryMap;
  }

  const lines = String(text || "").split(/\r?\n/);
  let currentLocation = "";
  let collectingTypes = false;
  let typeIndent = 0;

  lines.forEach((rawLine) => {
    const lineWithoutComment = rawLine.replace(/\s+#.*$/, "");
    const trimmed = lineWithoutComment.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    const indent = lineWithoutComment.match(/^\s*/)[0].length;
    const topLevelMatch = indent === 0 ? trimmed.match(/^['"]?(.+?)['"]?\s*:\s*$/) : null;
    if (topLevelMatch) {
      currentLocation = cleanYamlValue(topLevelMatch[1]);
      collectingTypes = false;
      return;
    }

    if (!currentLocation) return;

    if (collectingTypes) {
      if (indent <= typeIndent && !trimmed.startsWith("-")) {
        collectingTypes = false;
      } else {
        const itemMatch = trimmed.match(/^-\s*(.+)$/);
        if (itemMatch) addLocationCategories(categoryMap, currentLocation, parseCategoryValue(itemMatch[1]));
        return;
      }
    }

    const typeMatch = trimmed.match(/^(?:Types|Type|Categories|Category)\s*:\s*(.*?)\s*$/i);
    if (!typeMatch) return;

    typeIndent = indent;
    const inlineValue = typeMatch[1];
    if (inlineValue) {
      addLocationCategories(categoryMap, currentLocation, parseCategoryValue(inlineValue));
    } else {
      collectingTypes = true;
    }
  });

  return categoryMap;
}

function parseCategoryValue(value) {
  return String(value || "")
    .replace(/\s+#.*$/, "")
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map(cleanYamlValue)
    .filter(Boolean);
}

function addLocationCategories(categoryMap, location, categories) {
  const keys = getLocationCategoryLookupKeys(location);
  if (!keys.length || !categories.length) return;

  const locationKey = normalize(location);
  let order = categoryMap.orderByLocation.get(locationKey);
  if (order === undefined) {
    order = categoryMap.nextOrder;
    categoryMap.nextOrder += 1;
    categoryMap.orderByLocation.set(locationKey, order);
  }

  keys.forEach((key) => {
    const existingCategories = categoryMap.get(key) || [];
    categories.forEach((category) => {
      if (!existingCategories.some((existing) => normalize(existing) === normalize(category))) {
        existingCategories.push(category);
      }
    });
    categoryMap.set(key, existingCategories);
    if (!categoryMap.orderByKey.has(key)) categoryMap.orderByKey.set(key, order);
    if (!categoryMap.locationByKey.has(key)) categoryMap.locationByKey.set(key, location);
  });

  const areaKey = getLocationAreaKey(location);
  const areaEntries = categoryMap.areaEntries.get(areaKey) || [];
  areaEntries.push({ location, categories, keys, order });
  categoryMap.areaEntries.set(areaKey, areaEntries);
}

function getLocationCategoryLookupKeys(location) {
  const exactKey = normalize(location);
  const area = getAreaFromLocation(location);
  const descriptionWords = getLocationDescriptionWords(location, { dropGeneric: false }).sort();
  const compactWords = getLocationDescriptionWords(location, { dropGeneric: true }).sort();
  const reorderedKey = descriptionWords.length ? normalize(`${area} - ${descriptionWords.join(" ")}`) : "";
  const compactKey = compactWords.length ? normalize(`${area} - ${compactWords.join(" ")}`) : "";
  return unique([exactKey, reorderedKey, compactKey]);
}

function getLocationAreaKey(location) {
  return normalize(getAreaFromLocation(location)).replace(/^the\s+/, "");
}

function getLocationAlias(location) {
  const key = normalize(location);
  const aliasEntry = Object.entries(LOCATION_CATEGORY_ALIASES).find(([source]) => normalize(source) === key);
  return aliasEntry?.[1] || "";
}

function getRandoMarkedLookupKeys(location) {
  const locationKey = normalize(location);
  const names = [location];
  Object.entries(LOCATION_CATEGORY_ALIASES).forEach(([source, target]) => {
    if (normalize(source) === locationKey || normalize(target) === locationKey) names.push(source, target);
  });
  return unique(names).map(normalize);
}

function isRandoMarkedLocation(location) {
  return getRandoMarkedLookupKeys(location).some((key) => state.data.randoMarkedLocationKeys.has(key));
}

function getAutosaveEntranceSector(entranceName) {
  const key = normalize(entranceName);
  const matches = [
    { terms: ["dragon roost pond", "dragon roost island"], sector: "Dragon Roost Island" },
    { terms: ["fw entrance platform", "forest haven"], sector: "Forest Haven" },
    { terms: ["tower of the gods"], sector: "Tower of the Gods Sector" },
    { terms: ["forsaken fortress"], sector: "Forsaken Fortress" },
    { terms: ["headstone island"], sector: "Headstone Island" },
    { terms: ["gale isle"], sector: "Gale Isle" }
  ];
  return matches.find((entry) => entry.terms.some((term) => key.includes(normalize(term))))?.sector || "";
}

function getAutosaveEntranceDungeon(entranceName) {
  const key = normalize(entranceName);
  const matches = [
    { terms: ["drc first room", "dragon roost cavern"], dungeon: "Dragon Roost Cavern" },
    { terms: ["fw first room", "forbidden woods"], dungeon: "Forbidden Woods" },
    { terms: ["totg first room", "tower of the gods"], dungeon: "Tower of the Gods" },
    { terms: ["ff first room", "forsaken fortress"], dungeon: "Forsaken Fortress" },
    { terms: ["et first room", "earth temple"], dungeon: "Earth Temple" },
    { terms: ["wt first room", "wind temple"], dungeon: "Wind Temple" }
  ];
  return matches.find((entry) => entry.terms.some((term) => key.includes(normalize(term))))?.dungeon || "";
}

function applyRandoEntranceMappings(autosaveText) {
  const discoveredMappings = new Map();
  const connectedEntrances = getYamlMappingSection(autosaveText, "connected_entrances");
  connectedEntrances.forEach(({ key, value }) => {
    const sector = getAutosaveEntranceSector(key);
    const dungeon = getAutosaveEntranceDungeon(value);
    if (sector && dungeon) discoveredMappings.set(dungeon, sector);
  });

  let changed = false;
  const previousAutosaveMappings = state.sphere.autosaveEntranceMappings || {};
  Object.entries(previousAutosaveMappings).forEach(([dungeon, sector]) => {
    if (discoveredMappings.has(dungeon)) return;
    if (state.sphere.entranceMappings[dungeon] === sector) {
      delete state.sphere.entranceMappings[dungeon];
      changed = true;
    }
  });
  discoveredMappings.forEach((sector, dungeon) => {
    if (state.sphere.entranceMappings[dungeon] !== sector) {
      state.sphere.entranceMappings[dungeon] = sector;
      changed = true;
    }
  });
  const nextAutosaveMappings = Object.fromEntries(discoveredMappings);
  if (JSON.stringify(nextAutosaveMappings) !== JSON.stringify(previousAutosaveMappings)) changed = true;
  state.sphere.autosaveEntranceMappings = nextAutosaveMappings;
  const nextConnections = Object.fromEntries(connectedEntrances.map(({ key, value }) => [normalize(key), value]));
  if (JSON.stringify(nextConnections) !== JSON.stringify(state.data.sphereEntranceConnections)) {
    state.data.sphereEntranceConnections = nextConnections;
    changed = true;
  }
  return { count: discoveredMappings.size, changed };
}

function applyRandoMarkedLocations(autosaveText, options = {}) {
  const markedLocations = getYamlListSection(autosaveText, "marked_locations");
  const markedItems = getYamlListSection(autosaveText, "marked_items");
  const entranceMappings = applyRandoEntranceMappings(autosaveText);
  const nextChartMappings = Object.fromEntries(getYamlMappingSection(autosaveText, "mapped_charts").map(({ key, value }) => [key, value]));
  const chartMappingsChanged = JSON.stringify(nextChartMappings) !== JSON.stringify(state.data.sphereChartMappings);
  const markedItemsChanged = markedItems.map(normalize).join("|") !== state.data.randoMarkedItems.map(normalize).join("|");
  state.data.randoMarkedLocationKeys = new Set(markedLocations.map(normalize));
  state.data.randoMarkedItems = markedItems;
  state.data.sphereChartMappings = nextChartMappings;
  if (markedItemsChanged || entranceMappings.changed || chartMappingsChanged) invalidateSphereAnalysis();
  if (entranceMappings.changed) saveSphereState();
  if (entranceMappings.changed && options.renderGrid !== false) {
    renderGrid();
    return state.data.locations.filter(isRandoMarkedLocation).length;
  }
  refreshRandoMarkedLocationStyles();
  if (options.renderSphere !== false && shouldRenderSphereBoard()) renderSphereBoard();
  return state.data.locations.filter(isRandoMarkedLocation).length;
}

function getAddedAutosaveValues(previousValues, nextValues) {
  const remaining = new Map();
  previousValues.forEach((value) => {
    const key = normalize(value);
    remaining.set(key, (remaining.get(key) || 0) + 1);
  });

  return nextValues.filter((value) => {
    const key = normalize(value);
    const count = remaining.get(key) || 0;
    if (!count) return true;
    remaining.set(key, count - 1);
    return false;
  });
}

function resolveAutosaveLocationName(location) {
  const key = normalize(location);
  return state.data.locations.find((candidate) => getRandoMarkedLookupKeys(candidate).includes(key)) || location;
}

function getAutomaticItemImageName(item) {
  if (/\bsmall key$/i.test(item)) return "Small Key";
  if (/\b(?:big|boss) key$/i.test(item)) return "Boss Key";
  const match = canonicalizeItemMatch(findBest(item, state.data.itemSearchNames));
  return match?.score ? match.name : item;
}

function isGenericTriforceShard(item) {
  return ["triforce shard", "triforce of courage"].includes(normalize(item));
}

function getAutomaticAutosaveItemKey(item) {
  return isGenericTriforceShard(item) || getShardNumber(item)
    ? "triforce shard"
    : getSphereInventoryItemKey(item);
}

function createAutomaticPendingItem(item) {
  const needsShardSelection = isGenericTriforceShard(item) || Boolean(getShardNumber(item));
  return {
    item: needsShardSelection ? "Triforce Shard" : item,
    sourceItem: item,
    needsShardSelection
  };
}

function selectAutomaticShard(number) {
  const pending = automaticPendingItems[0];
  if (!state.settings.automaticMode || !pending?.needsShardSelection) return false;

  setShardTrackingChecked(number, true);
  pending.item = `Triforce Shard ${number}`;
  pending.needsShardSelection = false;
  if (automaticLocationChoices.length === 1) completeAutomaticPlacement(automaticLocationChoices[0]);
  else renderAutomaticModePrompt();
  return true;
}

function resetAutomaticCapture(options = {}) {
  automaticPendingItems = [];
  automaticLocationChoices = [];
  automaticLastCheckedLocation = "";
  if (options.render !== false) renderAutomaticModePrompt();
}

function renderAutomaticModePrompt() {
  const pending = automaticPendingItems[0];
  const shouldShow = Boolean(state.settings.automaticMode && pending);
  automaticModePrompt.hidden = !shouldShow;
  shardStatusList.classList.toggle("automatic-shard-choice", Boolean(shouldShow && pending.needsShardSelection));
  if (!shouldShow) return;

  automaticModeItemImage.src = itemImage(getAutomaticItemImageName(pending.item));
  automaticModeItemImage.alt = "";
  automaticModeItemName.textContent = pending.item;
  if (pending.needsShardSelection) {
    automaticModeMessage.textContent = "Choose which shard you found in the sidebar.";
    automaticModeLocationChoices.hidden = true;
    automaticModeLocationChoices.innerHTML = "";
    return;
  }
  const hasChoices = automaticLocationChoices.length > 1;
  automaticModeMessage.textContent = hasChoices
    ? "Several locations changed. Choose the correct one:"
    : state.settings.automaticLastLocation
      ? "No recently checked location. Check its location in the main tracker."
      : "Acquired. Click its location in the main tracker.";
  automaticModeLocationChoices.hidden = !hasChoices;
  automaticModeLocationChoices.innerHTML = "";

  if (hasChoices) {
    automaticLocationChoices.forEach((location) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = location;
      button.title = location;
      button.addEventListener("click", () => completeAutomaticPlacement(location));
      automaticModeLocationChoices.appendChild(button);
    });
  }
}

function completeAutomaticPlacement(location) {
  const pending = automaticPendingItems.shift();
  if (!pending || pending.needsShardSelection || !location) return;
  automaticLocationChoices = [];
  addSpherePlacement(pending.item, resolveAutosaveLocationName(location), {
    fromAutomaticTracker: true,
    autosaveItemKey: getAutomaticAutosaveItemKey(pending.sourceItem)
  });
  renderAutomaticModePrompt();
}

function removeSpherePlacementForAutosaveItem(item) {
  const itemKey = getAutomaticAutosaveItemKey(item);
  const matchesItem = (placement) => {
    if (itemKey === "triforce shard") return Boolean(getShardNumber(placement.item));
    return getSphereInventoryItemKey(placement.item, placement.location) === itemKey;
  };
  const automaticMatches = state.sphere.placements.filter((placement) => (
    (placement.fromAutomaticTracker || placement.fromAutosave)
    && (placement.autosaveItemKey || getAutomaticAutosaveItemKey(placement.item)) === itemKey
  ));
  // Placements made before provenance was stored need one compatibility pass.
  const placement = automaticMatches.at(-1) || state.sphere.placements.filter(matchesItem).at(-1);
  if (!placement) return false;

  const shardNumber = getShardNumber(placement.item);
  if (shardNumber) setShardTrackingChecked(Number(shardNumber), false);
  removeSpherePlacementLine(placement.location);
  return true;
}

function processAutomaticModeAutosave(previousText, nextText) {
  if (!previousText || !nextText) return;

  const withoutRandomStartingItems = (items) => {
    const remainingStartingItems = new Map();
    (state.sphere.randomStartingItems || []).forEach((item) => {
      const key = isGenericTriforceShard(item) || getShardNumber(item)
        ? "triforce shard"
        : getSphereInventoryItemKey(item);
      remainingStartingItems.set(key, (remainingStartingItems.get(key) || 0) + 1);
    });
    return items.filter((item) => {
      const key = isGenericTriforceShard(item) || getShardNumber(item)
        ? "triforce shard"
        : getSphereInventoryItemKey(item);
      const count = remainingStartingItems.get(key) || 0;
      if (!count) return true;
      remainingStartingItems.set(key, count - 1);
      return false;
    });
  };
  const previousItems = withoutRandomStartingItems(getYamlListSection(previousText, "marked_items"));
  const nextItems = withoutRandomStartingItems(getYamlListSection(nextText, "marked_items"));
  const removedItems = getAddedAutosaveValues(nextItems, previousItems);
  removedItems.forEach((removedItem) => {
    const pendingIndex = automaticPendingItems.findIndex((pending) => normalize(pending.sourceItem) === normalize(removedItem));
    if (pendingIndex >= 0) automaticPendingItems.splice(pendingIndex, 1);
    removeSpherePlacementForAutosaveItem(removedItem);
  });
  if (!state.settings.automaticMode) return;
  getAddedAutosaveValues(previousItems, nextItems).forEach((item) => automaticPendingItems.push(createAutomaticPendingItem(item)));

  const previousLocations = getYamlListSection(previousText, "marked_locations");
  const nextLocations = getYamlListSection(nextText, "marked_locations");
  const addedLocations = getAddedAutosaveValues(previousLocations, nextLocations).map(resolveAutosaveLocationName);
  const removedLocations = getAddedAutosaveValues(nextLocations, previousLocations).map(resolveAutosaveLocationName);

  if (addedLocations.length === 1) automaticLastCheckedLocation = addedLocations[0];
  if (!addedLocations.length && removedLocations.some((location) => normalize(location) === normalize(automaticLastCheckedLocation))) {
    automaticLastCheckedLocation = "";
  }

  if (state.settings.automaticLastLocation) {
    if (addedLocations.length > 1) {
      automaticLocationChoices = addedLocations;
      renderAutomaticModePrompt();
      return;
    }
    automaticLocationChoices = automaticLastCheckedLocation ? [automaticLastCheckedLocation] : [];
    if (automaticPendingItems[0]?.needsShardSelection) {
      renderAutomaticModePrompt();
      return;
    }
    if (automaticPendingItems.length && automaticLastCheckedLocation) {
      completeAutomaticPlacement(automaticLastCheckedLocation);
      return;
    }
    renderAutomaticModePrompt();
    return;
  }

  if (automaticPendingItems[0]?.needsShardSelection) {
    if (addedLocations.length) automaticLocationChoices = addedLocations;
    renderAutomaticModePrompt();
    return;
  }

  if (automaticPendingItems.length && addedLocations.length === 1) {
    completeAutomaticPlacement(addedLocations[0]);
    return;
  }

  automaticLocationChoices = automaticPendingItems.length && addedLocations.length > 1 ? addedLocations : [];
  renderAutomaticModePrompt();
}

function refreshRandoMarkedLocationStyles() {
  const updateRoot = (root) => {
    root.querySelectorAll(".location-drop-option[data-location]").forEach((option) => {
      const marked = isLocationMarked(option.dataset.location);
      option.classList.toggle("rando-marked", marked);
      option.title = getLocationMarkedTitle(option.dataset.location);
    });
    root.querySelectorAll(".sphere-location-list [data-location]").forEach((locationName) => {
      const location = locationName.dataset.location;
      const marked = isLocationMarked(location);
      locationName.classList.toggle("rando-marked", marked);
      locationName.title = marked ? `${location}\n${getLocationMarkedTitle(location)}` : location;
    });
  };

  updateRoot(document);
  if (spherePopoutWindow && !spherePopoutWindow.closed) updateRoot(spherePopoutWindow.document);
}

function stopRandoAutosavePolling() {
  if (randoAutosavePollTimer !== null) window.clearInterval(randoAutosavePollTimer);
  randoAutosavePollTimer = null;
  randoAutosavePollBusy = false;
  randoAutosaveLastText = null;
  randoAutosaveLastModified = null;
  resetAutomaticCapture();
}

async function pollRandoTrackerAutosave() {
  if (!randoFolderHandle || randoAutosavePollBusy) return;
  randoAutosavePollBusy = true;
  try {
    // getFile() is a cheap metadata-only stat - it does not read file contents.
    // Only read+process the full file when its mtime actually changed, instead of
    // unconditionally reading the whole file every second regardless of whether
    // anything changed. A constant stream of full-content reads against a linked
    // folder is exactly the pattern that gets real-time antivirus scanning involved
    // on every tick (Downloads folders in particular are commonly scanned on access),
    // which can make normal interaction feel stalled even though the JS side is fast.
    const file = await getLinkedFile("tracker_autosave.yaml");
    if (file.lastModified === randoAutosaveLastModified) return;
    randoAutosaveLastModified = file.lastModified;
    const autosaveText = await file.text();
    if (autosaveText === randoAutosaveLastText || !/^\s*(?:marked_locations|connected_entrances)\s*:/im.test(autosaveText)) return;
    const previousAutosaveText = randoAutosaveLastText;
    randoAutosaveLastText = autosaveText;
    const markedLocationCount = applyRandoMarkedLocations(autosaveText);
    processAutomaticModeAutosave(previousAutosaveText, autosaveText);
    randoFolderStatus.textContent = `${randoFolderHandle.name} (${markedLocationCount} checked, live)`;
  } catch (error) {
    if (error?.name === "NotAllowedError" || error?.name === "SecurityError") {
      stopRandoAutosavePolling();
      randoFolderStatus.textContent = "Folder permission required";
    }
  } finally {
    randoAutosavePollBusy = false;
  }
}

function startRandoAutosavePolling(initialAutosaveText) {
  stopRandoAutosavePolling();
  if (!randoFolderHandle || !/^\s*(?:marked_locations|connected_entrances)\s*:/im.test(initialAutosaveText)) return;
  randoAutosaveLastText = initialAutosaveText;
  randoAutosaveLastModified = null;
  randoAutosavePollTimer = window.setInterval(pollRandoTrackerAutosave, 1000);
}

function getLocationCategoryOverride(location) {
  const key = normalize(location);
  const overrideEntry = Object.entries(LOCATION_CATEGORY_OVERRIDES).find(([source]) => normalize(source) === key);
  return overrideEntry?.[1] || null;
}

function getMappedLocationEntry(categoryMap, location) {
  for (const key of getLocationCategoryLookupKeys(location)) {
    const categories = categoryMap.get(key);
    if (categories) {
      return {
        categories,
        order: categoryMap.orderByKey.get(key),
        location: categoryMap.locationByKey.get(key)
      };
    }
  }

  const areaEntries = categoryMap.areaEntries.get(getLocationAreaKey(location)) || [];
  const bestMatch = areaEntries
    .map((entry) => ({ entry, score: scoreEquivalentLocationName(location, entry.location) }))
    .filter((match) => match.score >= 0.68)
    .sort((a, b) => b.score - a.score)[0];

  return bestMatch?.entry || null;
}
function getLocationDescriptionWords(location, options = {}) {
  const area = getAreaFromLocation(location);
  const description = location.replace(`${area} - `, "");
  const stopWords = new Set(["a", "an", "at", "by", "in", "inside", "of", "on", "the", "to"]);
  const genericWords = new Set(["chest", "item", "prize"]);
  const words = normalize(description)
    .split(" ")
    .filter((word) => word && !stopWords.has(word));

  if (!options.dropGeneric) return words;
  const compactWords = words.filter((word) => !genericWords.has(word));
  return compactWords.length ? compactWords : words;
}

function getLocationNumbers(location) {
  return getLocationDescriptionWords(location).filter((word) => /^\d+$/.test(word));
}

function sameNumberHints(firstLocation, secondLocation) {
  const firstNumbers = getLocationNumbers(firstLocation);
  const secondNumbers = getLocationNumbers(secondLocation);
  if (!firstNumbers.length && !secondNumbers.length) return true;
  if (firstNumbers.length !== secondNumbers.length) return false;
  return firstNumbers.every((number) => secondNumbers.includes(number));
}

function scoreEquivalentLocationName(sourceLocation, candidateLocation) {
  if (!sameNumberHints(sourceLocation, candidateLocation)) return 0;

  const sourceWords = new Set(getLocationDescriptionWords(sourceLocation, { dropGeneric: true }));
  const candidateWords = new Set(getLocationDescriptionWords(candidateLocation, { dropGeneric: true }));
  if (!sourceWords.size || !candidateWords.size) return 0;

  let sharedCount = 0;
  sourceWords.forEach((word) => {
    if (candidateWords.has(word)) sharedCount += 1;
  });

  const unionCount = new Set([...sourceWords, ...candidateWords]).size;
  const coverage = sharedCount / Math.min(sourceWords.size, candidateWords.size);
  const overlap = sharedCount / unionCount;
  return coverage * 0.75 + overlap * 0.25;
}

function getLocationCategoryEntry(categoryMap, location) {
  const directEntry = getMappedLocationEntry(categoryMap, location);
  if (directEntry) return directEntry;

  const alias = getLocationAlias(location);
  if (alias) {
    const aliasEntry = getMappedLocationEntry(categoryMap, alias);
    if (aliasEntry) return aliasEntry;
  }

  const overrideCategories = getLocationCategoryOverride(location);
  return overrideCategories ? { categories: overrideCategories, order: null, location } : null;
}

function getLocationCategories(categoryMap, location) {
  return getLocationCategoryEntry(categoryMap, location)?.categories || null;
}

function getEnabledProgressionOptions(configText) {
  const configOptions = window.WWRSphereEngine?.parseConfig(configText) || {};
  return new Set(
    Object.values(LOCATION_CATEGORY_OPTION_KEYS)
      .flat()
      .filter((optionKey, index, optionKeys) => optionKeys.indexOf(optionKey) === index)
      .filter((optionKey) => {
        const value = configOptions[optionKey];
        if (typeof value !== "string") return Boolean(value);
        return !["false", "disabled", "off", "none", "no"].includes(normalize(value));
      })
  );
}

function locationHasEnabledCategory(categories, enabledOptions) {
  return categories.every((category) => {
    if (normalize(category) === "always progression") return true;
    const optionKeys = LOCATION_CATEGORY_OPTION_KEYS[category] || LOCATION_CATEGORY_OPTION_KEYS[findKnownCategoryName(category)] || [];
    return optionKeys.some((optionKey) => enabledOptions.has(optionKey));
  });
}

function findKnownCategoryName(category) {
  const key = normalize(category);
  return Object.keys(LOCATION_CATEGORY_OPTION_KEYS).find((name) => normalize(name) === key) || "";
}

function buildFilteredLocationData(configText, locationCategoryText) {
  const excludedLocationKeys = new Set(getYamlListSection(configText, "excluded_locations").map(normalize));
  const categoryMap = parseLocationCategoryData(locationCategoryText);
  const enabledOptions = getEnabledProgressionOptions(configText);
  const configOptions = window.WWRSphereEngine?.parseConfig(configText) || {};
  const raceModeDungeons = normalize(configOptions.progression_dungeons) === "race mode";
  const requiredBosses = new Set(getYamlListSection(configText, "required_bosses").map(normalize));
  const filteredLocationKeys = new Set();
  const areaLocationKeys = new Set();
  const locationOrder = new Map();

  state.data.locations.forEach((location, fallbackOrder) => {
    const locationKey = normalize(location);
    const categoryEntry = categoryMap.size ? getLocationCategoryEntry(categoryMap, location) : null;
    const sourceOrder = categoryEntry?.order;
    locationOrder.set(locationKey, sourceOrder ?? categoryMap.nextOrder + fallbackOrder);

    const matchedLocationKey = normalize(categoryEntry?.location);
    if (excludedLocationKeys.has(locationKey) || excludedLocationKeys.has(matchedLocationKey)) return;

    const dungeonBoss = DUNGEON_REQUIRED_BOSSES[getAreaFromLocation(location)];
    if (raceModeDungeons && requiredBosses.size && dungeonBoss && !requiredBosses.has(normalize(dungeonBoss))) return;

    const isNoProgressLocation = categoryEntry?.categories.some((category) => normalize(category) === "no progression");
    if (!categoryMap.size || (categoryEntry && !isNoProgressLocation)) {
      areaLocationKeys.add(locationKey);
    }

    if (!categoryMap.size || (categoryEntry && locationHasEnabledCategory(categoryEntry.categories, enabledOptions))) {
      filteredLocationKeys.add(locationKey);
    }
  });

  return { filteredLocationKeys, areaLocationKeys, locationOrder };
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

function getYamlMappingSection(text, sectionName) {
  const lines = String(text || "").split(/\r?\n/);
  const values = [];
  const sectionIndex = lines.findIndex((line) => new RegExp(`^\\s*${sectionName}\\s*:\\s*(?:#.*)?$`).test(line));
  if (sectionIndex < 0) return values;

  const baseIndent = lines[sectionIndex].match(/^\s*/)[0].length;
  for (let index = sectionIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim() || line.trimStart().startsWith("#")) continue;

    const indent = line.match(/^\s*/)[0].length;
    if (indent <= baseIndent) break;

    const separatorIndex = line.indexOf(":", indent);
    if (separatorIndex < 0) continue;
    const key = cleanYamlValue(line.slice(indent, separatorIndex));
    const value = cleanYamlValue(line.slice(separatorIndex + 1).replace(/\s+#.*$/, ""));
    if (key && value) values.push({ key, value });
  }
  return values;
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

function getRandomStartingItemCount(configText) {
  const options = window.WWRSphereEngine?.parseConfig(configText) || {};
  const hdRandomStartingItemCount = [
    "start_with_random_item",
    "random_item_slide_item"
  ].filter((key) => options[key] === true).length;

  const matchingOptions = Object.entries(options).filter(([key]) => {
    const words = normalize(key);
    return words.includes("starting")
      && (words.includes("item") || words.includes("items") || words.includes("gear"))
      && (words.includes("random") || words.includes("randomize") || words.includes("randomized") || words.includes("extra"));
  });

  const numericCounts = matchingOptions
    .map(([, value]) => typeof value === "number" ? value : 0)
    .filter((value) => value > 0);
  const enabledFlags = matchingOptions.filter(([, value]) => {
    if (value === true) return true;
    return typeof value === "string" && ["enabled", "on", "true"].includes(value.toLowerCase());
  }).length;

  return Math.max(0, hdRandomStartingItemCount, enabledFlags, ...numericCounts);
}

function applyRandoConfig(configText, locationCategoryText = "", sphereLogicTexts = {}) {
  const hoHoHints = getYamlBoolean(configText, "ho_ho_triforce_hints") || getYamlBoolean(configText, "ho_ho_hints");
  const progressionSpoilsTrading = getYamlBoolean(configText, "progression_spoils_trading");
  const progressionLongSidequests = getYamlBoolean(configText, "progression_long_sidequests");
  const excludedLocations = getYamlListSection(configText, "excluded_locations").map(normalize);
  const potionShopExcluded = excludedLocations.includes(normalize("Windfall Island - Potion Shop 15 Blue Chu"));
  const randomStartingItemCount = getRandomStartingItemCount(configText);

  const currentRandomItems = state.sphere.randomStartingItems || [];
  const retainedRandomItems = randomStartingItemCount ? currentRandomItems.slice(0, randomStartingItemCount) : [];
  if (retainedRandomItems.length !== currentRandomItems.length) {
    state.sphere.randomStartingItems = retainedRandomItems;
    saveSphereState();
  }

  state.settings.showHoHo = hoHoHints;
  state.settings.showBlueChu = progressionSpoilsTrading && progressionLongSidequests && !potionShopExcluded;
  state.settings.startingGearShards = getStartingGearShards(configText);
  const filteredLocationData = buildFilteredLocationData(configText, locationCategoryText);
  state.data.filteredLocationKeys = filteredLocationData.filteredLocationKeys;
  state.data.areaLocationKeys = filteredLocationData.areaLocationKeys;
  state.data.locationOrder = filteredLocationData.locationOrder;
  applySphereLogic(configText, sphereLogicTexts.locations, sphereLogicTexts.macros, sphereLogicTexts.locationData, sphereLogicTexts.entrances);
  saveSettings();
  applySettings();
  updateFromInput();
  return randomStartingItemCount;
}

const seaGridResizeObserver = new ResizeObserver(() => {
  applyMapIconSize();
  if (!sphereBoard.hidden) requestAnimationFrame(drawSphereEdges);
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
  renderGrid({ deferSphere: options.deferSphere === true });
  renderHints();
}

function resizeHintInput() {
  hintInput.style.height = "auto";
  hintInput.style.height = `${Math.max(135, hintInput.scrollHeight)}px`;
}

function setNotesTab(tabName) {
  const showingSpheres = tabName === "sphere";
  hintInput.hidden = showingSpheres;
  sphereInput.hidden = !showingSpheres;
  hintNotesTab.classList.toggle("active", !showingSpheres);
  sphereNotesTab.classList.toggle("active", showingSpheres);
  hintNotesTab.setAttribute("aria-selected", String(!showingSpheres));
  sphereNotesTab.setAttribute("aria-selected", String(showingSpheres));
  if (showingSpheres) resizeSphereInput();
  else resizeHintInput();
}

seaGrid.addEventListener("contextmenu", handleMapContextMenu);
window.addEventListener("contextmenu", handleLocationListRequest, true);
window.addEventListener("pointerdown", handleLocationListPointerRequest, true);

itemPalette.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  hideItemPalette();
});
startingItemsPalette.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

startingItemsClearButton.addEventListener("click", () => {
  pendingRandomStartingItems = [];
  updateStartingItemsPrompt();
});

startingItemsCancelButton.addEventListener("click", hideStartingItemsPrompt);
startingItemsApplyButton.addEventListener("click", applyRandomStartingItems);
startingItemsButton.addEventListener("click", () => {
  if (syncedRandomStartingItemCount > 0) showStartingItemsPrompt(syncedRandomStartingItemCount);
});



document.addEventListener("pointerdown", (event) => {
  if (!itemPalette.hidden && !itemPalette.contains(event.target) && !seaGrid.contains(event.target)) hideItemPalette();
  if (locationDropList && !state.isDraggingHintItem && !locationDropList.contains(event.target)) hideLocationDropList();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideItemPalette();
    hideLocationDropList();
    hideStartingItemsPrompt();
  }
});

window.addEventListener("resize", () => {
  hideItemPalette();
  hideLocationDropList();
});

hintInput.addEventListener("input", () => {
  saveStatus.textContent = "Saving...";
  updateFromInput({ deferSphere: true });
});

sphereInput.addEventListener("input", () => {
  saveStatus.textContent = "Saving...";
  updateSphereFromInput({ deferSphere: true });
});

hintNotesTab.addEventListener("click", () => setNotesTab("hint"));
sphereNotesTab.addEventListener("click", () => setNotesTab("sphere"));

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

parsedHintsFiltersInput.addEventListener("change", () => {
  state.settings.parsedHintsFilters = parsedHintsFiltersInput.checked;
  saveSettings();
  applySettings();
});
automaticModeInput.addEventListener("change", () => {
  state.settings.automaticMode = automaticModeInput.checked;
  if (!state.settings.automaticMode) resetAutomaticCapture();
  else renderAutomaticModePrompt();
  automaticLastLocationInput.disabled = !state.settings.automaticMode;
  saveSettings();
});
automaticLastLocationInput.addEventListener("change", () => {
  state.settings.automaticLastLocation = automaticLastLocationInput.checked;
  resetAutomaticCapture();
  saveSettings();
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

mapViewButton.addEventListener("click", () => setMapView("map"));
sphereViewButton.addEventListener("click", () => setMapView("spheres"));
spherePopoutButton.addEventListener("click", openSpherePopout);
hintAssignmentButton.addEventListener("click", () => setAssignmentMode("hint"));
sphereAssignmentButton.addEventListener("click", () => setAssignmentMode("sphere"));
automaticModeSkipButton.addEventListener("click", () => {
  automaticPendingItems.shift();
  automaticLocationChoices = [];
  renderAutomaticModePrompt();
});

browseRandoFolderButton.addEventListener("click", browseRandoFolder);

randoFolderInput.addEventListener("change", () => {
  stopRandoAutosavePolling();
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
    const [locationCategoryText, sphereLogicTexts, trackerAutosaveText] = await Promise.all([
      readLocationCategoryText(),
      readSphereLogicTexts(),
      readOptionalLinkedTextFile(["tracker_autosave.yaml"])
    ]);
    const markedLocationCount = applyRandoMarkedLocations(trackerAutosaveText, { renderSphere: false, renderGrid: false });
    const activeConfigText = trackerAutosaveText || configText;
    const randomStartingItemCount = applyRandoConfig(activeConfigText, locationCategoryText, sphereLogicTexts);
    const filteredCount = getAvailableLocations().length;
    syncedRandomStartingItemCount = randomStartingItemCount;
    startingItemsButton.disabled = randomStartingItemCount < 1;
    startingItemsButton.title = randomStartingItemCount ? "Choose random starting items" : "No random starting items enabled";
    const totalCount = state.data.locations.length;
    const logicStatus = state.data.sphereLogicLoaded ? "sphere logic ready" : "no sphere logic";
    const checkedStatus = trackerAutosaveText ? `, ${markedLocationCount} checked` : "";
    randoFolderStatus.textContent = locationCategoryText ? `Synced (${filteredCount}/${totalCount} locations, ${logicStatus}${checkedStatus})` : `Synced (${filteredCount}/${totalCount} locations, no categories${checkedStatus})`;
    startRandoAutosavePolling(trackerAutosaveText);
    if (randomStartingItemCount > 0) showStartingItemsPrompt(randomStartingItemCount);
  } catch {
    randoFolderStatus.textContent = "config.yaml not found";
  } finally {
    syncRandoConfigButton.disabled = !(randoFolderHandle || randoFolderFiles?.length);
  }
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && randoAutosavePollTimer !== null) pollRandoTrackerAutosave();
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
  const maxWidth = Math.min(640, window.innerWidth - 24);
  const isCompactResize = document.body.classList.contains("compact-mode");

  hintPanel.classList.add("resizing");
  hintPanelResizeHandle.setPointerCapture(event.pointerId);

  const handleMove = (moveEvent) => {
    if (!(moveEvent.buttons & 1)) return;
    const delta = isCompactResize ? moveEvent.clientX - startX : startX - moveEvent.clientX;
    const nextWidth = clampNumber(startWidth + delta, minWidth, maxWidth);
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
  sphereInput.value = "";
  state.checked = {};
  state.sphere = { placements: [], entranceMappings: {}, autosaveEntranceMappings: {}, randomStartingItems: [] };
  state.data.randoMarkedLocationKeys = new Set();
  refreshSphereStartingGear();
  hideStartingItemsPrompt();
  resetAutomaticCapture();
  state.settings.startingGearShards = [];
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(CHECKED_KEY);
  localStorage.removeItem(SPHERE_STORAGE_KEY);
  localStorage.removeItem(SPHERE_NOTES_STORAGE_KEY);
  saveSettings();
  state.history = [];
  state.historyIndex = -1;
  updateFromInput();
});

hintInput.value = localStorage.getItem(STORAGE_KEY) || "";
const storedSphereNotes = localStorage.getItem(SPHERE_NOTES_STORAGE_KEY);
sphereInput.value = storedSphereNotes === null ? serializeSpherePlacements() : storedSphereNotes;
if (storedSphereNotes === null && sphereInput.value) localStorage.setItem(SPHERE_NOTES_STORAGE_KEY, sphereInput.value);
resizeSphereInput();
versionLabel.textContent = `v${APP_VERSION}`;
applySettings();
preloadStaticIconImages();
loadPreferences();
pushHistory(hintInput.value);
updateHistoryButtons();
renderHints();
installSphereBoardPanning(sphereBoard);
loadData();




