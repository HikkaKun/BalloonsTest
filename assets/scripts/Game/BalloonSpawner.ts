
import { _decorator, Component, Node } from 'cc';
import GameObjectManager from '../Plugins/GameObject/GameObjectManager';
import { GameObjectType, GameOjbectTypeEnum } from '../Plugins/GameObject/GameObjectType';
const { ccclass, property } = _decorator;

@ccclass('BalloonSpawner')
export class BalloonSpawner extends Component {
	@property({ type: GameObjectType })
	balloonPrefab: GameOjbectTypeEnum = GameObjectType.None;

	@property(Node)
	balloonsParent: Node | null = null;

	protected start() {
		this.spawn();
	}

	public spawn() {
		const balloon = GameObjectManager.createGameOjbect(this.balloonPrefab);

		balloon.parent = this.balloonsParent || this.node;
	}
}