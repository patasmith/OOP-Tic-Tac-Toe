import { View } from "./view.js";
import { Game } from "./game.js";

const size = 3;

const game = new Game(size);
game.initializeGame()

const view = new View(size);
view.initializeView(game.handleMove);
