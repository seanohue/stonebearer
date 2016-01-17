### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| /Users/seanodonohue/myProjects/rlp/game/combat.js | 3 | Add potential to miss based on attacker's sight/speed and defender's speed/defense.
| /Users/seanodonohue/myProjects/rlp/game/game.js | 4 | Savegame
| /Users/seanodonohue/myProjects/rlp/game/game.js | 5 | Menu
| /Users/seanodonohue/myProjects/rlp/game/game.js | 6 | FOV computation for player char
| /Users/seanodonohue/myProjects/rlp/game/game.js | 7 | FOV computation for MOBs
| /Users/seanodonohue/myProjects/rlp/game/game.js | 8 | More variation in AI
| /Users/seanodonohue/myProjects/rlp/game/game.js | 9 | Lighting, affected by character's sight stat
| /Users/seanodonohue/myProjects/rlp/game/game.js | 52 | See if its possible to export the display, scheduler, and so on in this function.
| /Users/seanodonohue/myProjects/rlp/game/game.js | 89 | Use stuff like this for making menus cleaner
| /Users/seanodonohue/myProjects/rlp/game/game.js | 414 | Extract into module.
| /Users/seanodonohue/myProjects/rlp/game/game.js | 419 | Break into functions
| /Users/seanodonohue/myProjects/rlp/game/loot.js | 17 | Find a way to include this in the table below.
| /Users/seanodonohue/myProjects/rlp/game/loot.js | 42 | Extract into a JSON file or summat.
| /Users/seanodonohue/myProjects/rlp/game/loot.js | 207 | Add ability to have effects that stack in procedurally generated items. So, an item will be made with a prefix and postfix (i.e. "The Lightning-Quick Dagger of Bloodletting"), and the prefix effects (i.e. +2 to speed) will be added to the default effects and the postfix effects (i.e. +2 to damage). Use common.extends for this and have a function that creates rare procedurally-generated items.
| /Users/seanodonohue/myProjects/rlp/spec/game.spec.js | 28 | create mockEntity to put in mochaHelper.js to help with testing entities here and in the entity spec.
| /Users/seanodonohue/myProjects/rlp/spec/game.spec.js | 60 | find a way to mock keypress events (stdin?)
| /Users/seanodonohue/myProjects/rlp/spec/game.spec.js | 61 | add sinon to stub out methonds like stdout to see if they are called as needed.

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| /Users/seanodonohue/myProjects/rlp/game/game.js | 10 | Some messages stay on the screen even when another message is displayed. Handle two messages at once or create a message section of the display, separate from the map.