import { Component, _decorator } from 'cc';
import PoolObject from '../Pool/PoolObject';
import { GameObjectType, GameOjbectTypeEnum } from './GameObjectType';

const { ccclass, property } = _decorator;

@ccclass
export default class GameObject extends Component {
	@property({ type: GameObjectType })
	public type: GameOjbectTypeEnum = GameObjectType.None;

	public kill(): void {
		const poolObject = this.getComponent(PoolObject);

		if (poolObject) {
			poolObject.returnToPool();
		} else {
			this.node.active = false;
		}
	}
}
