
import { _decorator, Component, Node, CCFloat } from 'cc';
import GameObjectManager from '../Plugins/GameObject/GameObjectManager';
import { GameObjectType, GameOjbectTypeEnum } from '../Plugins/GameObject/GameObjectType';
import Timer from '../Timer';
import { Bounds } from '../Utilities';
const { ccclass, property } = _decorator;

@ccclass('BalloonSpawner')
export class BalloonSpawner extends Component {
	@property({ type: GameObjectType })
	balloonPrefab: GameOjbectTypeEnum = GameObjectType.None;

	@property(Node)
	balloonsParent: Node | null = null;

	@property(CCFloat)
	spawnInterval = 0.5;

	private _spawnTimer: Timer;

	protected start() {
		this._spawnTimer = new Timer(this.spawnInterval, true);
		this._spawnTimer.OnTimerEndCallback = () => this.spawn();
	}

	protected update(dt: number) {
		this._spawnTimer.update(dt);
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