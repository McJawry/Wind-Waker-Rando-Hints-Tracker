

# Wind-Waker-Rando-Hints-Tracker
> A browser interface that turns hint notes into a visual overview that is easier to glance at than pure text.

Run the launcher for your platform to open the tracker

The macOS/Linux launchers use Python 3. Most Linux systems have it already. If macOS asks to install command line tools or Python, accept that once and the launcher should work afterward.

The app reads these bundled data files at startup:

- app/data/item_names.txt
- app/data/bosses.txt
- app/data/location_pool.txt

Those data files are intended to be swapped out when the randomizer changes. The app code should not need to edit them.

# How to use correct formatting in the hint notes:

The formatting is made to allow quick note taking using abbreviations or shortened item/location/boss names.
Abbreviation list can be found further down.

It is optional to mark an item as required, possibly required or not required by inserting r/p/n after an item name.


### Format for path hints

[Name of area such as dungeon/sector etc.] [Tag for requirement (optional)] [to] [Boss name]

Examples:
- `outset to jalhalla` (also works: `out to jal`)
- `earth to helmaroc` (also works: `et to helm`)


### Format for item hints

[Item name] [Tag for requirement (optional)] [at/in/on] [Name of area such as dungeon/sector etc.]

Examples:
- `command melody r at mailbox` (also works: `cmd r in mail`)
- `picto box p at pawprint isle` (also works: `pic in paw`)


### Format for location hints

[Item name] [Tag for requirement (optional)] [at/in/on] [Specific location name]

Examples:
- `maggie's letter r in ganon maze chest` (also works: `maggie r at ganon maze`)
- `triforce shard 3 r at windfall potion blue` (also works: `shard r in blue chu`)


Triforce shards can be written with or without a following number.
A number will make its icon display the correct shape. No number will display the full triforce of courage.

## Abbreviations
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

Suggestions? @mcjawry on Discord.
