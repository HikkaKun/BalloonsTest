import { Enum } from 'cc';
import { EnumType } from '../../Utilities'

export const GameObjectType = Enum({
	None: 0,

})

export type GameOjbectTypeEnum = EnumType<typeof GameObjectType>;