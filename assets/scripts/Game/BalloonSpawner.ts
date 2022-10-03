
import { _decorator, Component, Node } from 'cc';
import GameObjectManager from '../Plugins/GameObject/GameObjectManager';
import { GameObjectType, GameOjbectTypeEnum } from '../Plugins/GameObject/GameObjectType';
import { Bounds } from '../Utilities';
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
		const balloon = GameObjectManager.createGameOjbect(this.balloonPrefab, false);

		if (!balloon) return;

		const parent = this.balloonsParent || this.node;
		const bounds = new Bounds(parent);

		balloon.parent = parent;
		balloon.setPosition(bounds.getRandomPosition());
		balloon.active = true;
	}
}