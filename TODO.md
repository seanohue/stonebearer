### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| /Users/seanodonohue/myProjects/rlp/game/combat.js | 3 | Add potential to miss based on attacker's sight/speed and defender's speed/defense.
| /Users/seanodonohue/myProjects/rlp/game/game.js | 4 | Savegame
| /Users/seanodonohue/myProjects/rlp/game/game.js | 5 | Menu
| /Users/seanodonohue/myProjects/rlp/game/game.js | 6 | Combat works (player/mobs can die)
| /Users/seanodonohue/myProjects/rlp/game/game.js | 7 | FOV computation for player char (fog of war)
| /Users/seanodonohue/myProjects/rlp/game/game.js | 8 | FOV computation for mobs
| /Users/seanodonohue/myProjects/rlp/game/game.js | 9 | More variation in AI
| /Users/seanodonohue/myProjects/rlp/game/game.js | 10 | Lighting, affected by character's sight stat
| /Users/seanodonohue/myProjects/rlp/game/game.js | 11 | Extract everything to do with map into its own module.
| /Users/seanodonohue/myProjects/rlp/game/game.js | 350 | Extract entities to module(s)
| /Users/seanodonohue/myProjects/rlp/game/game.js | 406 | Extract into module.
| /Users/seanodonohue/myProjects/rlp/game/loot.js | 17 | Find a way to include this in the table below.
| /Users/seanodonohue/myProjects/rlp/game/loot.js | 42 | Extract into a JSON file or summat.
| /Users/seanodonohue/myProjects/rlp/game/loot.js | 207 | Add ability to have effects that stack in procedurally generated items. So, an item will be made with a prefix and postfix (i.e. "The Lightning-Quick Dagger of Bloodletting"), and the prefix effects (i.e. +2 to speed) will be added to the default effects and the postfix effects (i.e. +2 to damage). Use common.extends for this and have a function that creates rare procedurally-generated items.
| /Users/seanodonohue/myProjects/rlp/game/pathing.js | 40 | At some point, better player detection.
| /Users/seanodonohue/myProjects/rlp/game/pathing.js | 44 | A combat-resolution function (death/victory)
| /Users/seanodonohue/myProjects/rlp/spec/game.spec.js | 28 | create mockEntity to put in mochaHelper.js to help with testing entities here and in the entity spec.
| /Users/seanodonohue/myProjects/rlp/spec/game.spec.js | 60 | find a way to mock keypress events (stdin?)
| /Users/seanodonohue/myProjects/rlp/spec/game.spec.js | 61 | add sinon to stub out methonds like stdout to see if they are called as needed.

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| /Users/seanodonohue/myProjects/rlp/game/combat.js | 4 | -1 damage can be dealt. Damage should never be lower than 0.
| /Users/seanodonohue/myProjects/rlp/game/game.js | 12 | Some messages stay on the screen even when another message is displayed. Handle two messages at once or create a message section of the display, separate from the map.
| /Users/seanodonohue/myProjects/rlp/game/game.js | 456 | Get this to work. Right now it hangs after the menu. Idea: Have the menu.js be where the game is started from. Menu then calls Game.init. Or make an index.js or main.js.