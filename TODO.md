### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| /Users/seanodonohue/myProjects/rlp/game/game.js | 4 | Savegame
| /Users/seanodonohue/myProjects/rlp/game/game.js | 45 | See if its possible to export the display, scheduler, and so on in this function.
| /Users/seanodonohue/myProjects/rlp/game/game.js | 82 | Use stuff like this for making menus cleaner
| /Users/seanodonohue/myProjects/rlp/game/game.js | 403 | Break into functions
| /Users/seanodonohue/myProjects/rlp/game/maps.js | 9 | Refactor modules to use a consistent style if possible (i.e. constructors vs. libraries)
| /Users/seanodonohue/myProjects/rlp/spec/game.spec.js | 28 | create mockEntity to put in mochaHelper.js to help with testing entities here and in the entity spec.
| /Users/seanodonohue/myProjects/rlp/spec/game.spec.js | 60 | find a way to mock keypress events (stdin?)
| /Users/seanodonohue/myProjects/rlp/spec/game.spec.js | 61 | add sinon to stub out methonds like stdout to see if they are called as needed.

### FIXMEs
| Filename | line # | FIXME
|:------|:------:|:------
| /Users/seanodonohue/myProjects/rlp/game/game.js | 292 | There is a bug where trying to pick up an item that was abandoned (from '*') results in a message saying it was picked up this time around, but the item is not in the player's inventory or on the ground anymore.