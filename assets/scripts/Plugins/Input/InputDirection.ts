import { Enum } from 'cc';
import { EnumType } from '../../Utilities';

export const InputDirection = Enum({
	None: 0,

	Target: 1,
});

export type InputDirectionEnum = EnumType<typeof InputDirection>;