import { Enum } from 'cc';
import { EnumType } from '../../Utilities'

export const GameObjectType = Enum({
	None: 0,

	Balloon: 1,

	ColorField: 2,
})

export type GameOjbectTypeEnum = EnumType<typeof GameObjectType>;