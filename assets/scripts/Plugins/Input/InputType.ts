import { Enum } from 'cc';
import { EnumType } from '../../Utilities';

export const InputType = Enum({
	Down: 0,
	Move: 1,
	Up: 2
});

export type InputTypeEnum = EnumType<typeof InputType>;