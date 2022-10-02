import { Enum } from 'cc';
import { EnumType } from '../../Utilities';

export const InputDirection = Enum({
	None: 0,
	Tile: 1,
	Bonus: 2,
	Restart: 3,
});

export type InputDirectionEnum = EnumType<typeof InputDirection>;