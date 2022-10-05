import { Enum } from 'cc';
import { EnumType } from '../Utilities';

export const GameEvent = Enum({
	None: 0,

	Input: 5,

	ChangeGameState: 6,
	PlayAudio: 7,

	BalloonDestoyed: 10,
});

export type GameEventEnum = EnumType<typeof GameEvent>;