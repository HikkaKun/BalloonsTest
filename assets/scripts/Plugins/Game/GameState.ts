import { Enum } from 'cc';

export const GameState = Enum({
	None: 0,

	Ready: 1,
	Game: 2,
	Lose: 3,
});