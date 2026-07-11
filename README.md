

# Wind-Waker-Rando-Hints-Tracker
> A browser interface that turns hint notes into a visual overview that is easier to glance at than pure text.
# Online version *(no download required)*
https://mcjawry.github.io/Wind-Waker-Rando-Hints-Tracker/

This will always be the latest version.

Hints and preferences are saved in your browser cookies.
# Offline local version
If you need offline access or an older version, run it locally by downloading it from the releases page to the right. Extract the zip file and run the launcher file for your platform. It still uses your web browser to display the interface.
The macOS/Linux launchers use Python 3. Most Linux systems have it already. If macOS asks to install command line tools or Python, accept that once and the launcher should work afterward.

The app reads these bundled data files at startup:
- app/data/item_names.txt
- app/data/bosses.txt
- app/data/location_pool.txt
Those data files are intended to be swapped out when the randomizer changes. The app code should not need to edit them.

# How the tracker works:

The tracker is made of these sections:
* Hint notes
* Parsed hints
* Map
* Settings

These sectons are anchored to the sides of the web page which makes a lot of dead space in between.
Resizing the browser to be full height but narrow is recommended.

How the sections work:
## Hint notes
Here you can manually type in hints that will show up in the parsed hints section (more on that later).

The formatting is made to allow quick note taking by using abbreviations or shortened item/location/boss names.

Abbreviation list can be found further down.

This document refers to "area" as either a map sector, dungeon, or the other "off map" areas such as Mailbox, Great Sea, Hyrule and Ganon's Tower.

### Format for path hints
The preposition "to" is how the tracker recognizes a path hint.

[Area] to [Boss name]

Examples:
- `outset to jalhalla` (also works: `out to jal`)
- `earth to helmaroc` (also works: `et to helm`)


### Format for item hints

The prepositions "at", "in" or "on" is how the tracker recognizes an item hint.

It is optional to insert "r", "p" or "n" between the item and the preposition to display the item as either "Required", "Possibly required" or "Not Required" in the parsed hints section (more on that later).

[Item name] [Tag for requirement (optional)] [at/in/on] [Area]

Examples:
- `command melody r at mailbox` (also works: `cmd r in mail`)
- `picto box p at pawprint isle` (also works: `pic in paw`)


### Format for location hints
This document refers to "location" as the specific location you get an item from, such as a certain chest or character. "Check" is also a commonly used word for it.

Location hints are basically the same as item hints but for a specific location instead of a general area.

[Item name] [Tag for requirement (optional)] [at/in/on] [Location]

Examples:
- `maggie's letter r in ganon maze chest` (also works: `maggie r at ganon maze`)
- `triforce shard 3 r at windfall potion blue` (also works: `shard r in blue`)

### Abbreviations
They are prioritized over fuzzy parsing
Common abbreviations are supported such as
DRC = Dragon Roost Cavern
DRI = Dragon Roost Island
FW = Forbidden Woods
TOTG = Tower of the Gods
WT = Wind Temple
ET = Earth Temple
GT = Ganon's Tower
cmd = Command Melody
cheese = Triforce Shard

and all sector/area names with the initials of each word (ETI, NTI, FCP, etc).

## Parsed hints

This section dynamically updates with a visualized list of the hint notes
* Path hints
	* Area -> icon of boss
* Item hints
	* Icon of item -> Area
* Location hints
	* Icon of item -> Location

Each hint has a tag for what type of hint it is if "requiredness" is not specified.
Left click on a item icon to cycle through requiredness.
Right click on a hint to remove it.

## Map

Hinted items will be displayed on an area. If an item is hinted by a location hint, it will only display on the area, so you can't tell from the map alone which location its hinted at.
Non-sector areas are displayed right below the map. Those areas are only displayed if they have items hinted on them.

### Input hints without typing

The map also serves as a "click and drag" alternative to the hint notes section. This only works for path hints and item hints at the moment.
* Right click to open the item overview (right click again to close it). Hold left click and drag an item onto an area. All non-sector areas will temporarily be unhidden while you are dragging an item.
* Releasing an item onto an area will add the respective hint in the hint notes section.

### Triforce Shards

Numbered Triforce Shards are displayed in a column next to the map.
You can look at the shape of the shard you obtain in-game to determine which number it is.
* Hovering the cursor on a shard will display its shape and position on the Triforce of Courage so you can compare it with the in-game pause menu. 
* Drag a shard onto an area to make a hint for it, just like the items popup.
* Uninted shards are gray, hinted ones are gold.
* Left clicking a shard will mark it green to represent being obtained.
* Right clicking a shard will put a gray cross on it which represents it as a starting item.
* If a crossed shard is hinted, the cross turns red. That means the shard is hinted but also a starting item. Both can't be true at once, so you've done something wrong in that case.

## Settings

* Page background/stream key color
	* Change the color of the background
* Stream mode
	* Toggles a new solid color option for the background, and compresses the parsed hints section to fit better on a stream layout. Use a chroma/color key filter in your streaming software to make the parsed hints background transparent on your stream.
* Compact mode
	* Removes the map section so you can make the browser window even narrower.
* Show Old Man Ho Ho
	* Toggles icons of Old Man Ho Ho on the map.
* Show Blue Chu Jelly
	* Toggles icons of Blue Chu Jelly on the map.
* Item Icon Size
	* Change size of the item icons on the map.
* Hint arrow position
	* Move the arrow position in the parsed hints section.
* Link Rando Folder
	* This option lets you sync the hints tracker to the config file in the randomizer app.
	1. Click "browse" and select the folder that the `wwhd_rando.exe` file is located in.
	2. Click "sync" to make the hints tracker toggle the relevant map icons and cross the Triforce Shards you start with.


Suggestions? @mcjawry on Discord.
