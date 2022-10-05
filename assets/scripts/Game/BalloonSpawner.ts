
import { _decorator, Component, Node, CCFloat, RigidBody2D, Vec2 } from 'cc';
import GameObjectManager from '../Plugins/GameObject/GameObjectManager';
import { GameObjectType, GameOjbectTypeEnum } from '../Plugins/GameObject/GameObjectType';
import Timer from '../Timer';
import { Bounds } from '../Utilities';
import { Balloon } from './Balloon';
import { ColorManager } from './ColorManager';
const { ccclass, property } = _decorator;

@ccclass('BalloonSpawner')
export class BalloonSpawner extends Component {
	@property({ type: GameObjectType })
	public balloonPrefab: GameOjbectTypeEnum = GameObjectType.None;

	@property(Node)
	public balloonsParent: Node | null = null;

	@property(CCFloat)
	public startSpawnInterval = 0.5;

	@property(CCFloat)
	public minSpawnInterval = 0.5;

	@property(CCFloat)
	public spawnIntervalDecrementPerMinute = 1;

	private _spawnTimer: Timer;

	protected onLoad() {
		this._spawnTimer = new Timer(this.startSpawnInterval, false);
		this._spawnTimer.OnTimerEndCallback = () => this.spawn();
	}

	protected update(dt: number) {
		this._spawnTimer.interval = Math.max(this._spawnTimer.interval - this.spawnIntervalDecrementPerMinute * dt / 60, this.minSpawnInterval);
		this._spawnTimer.update(dt);
	}

	public reset() {
		this._spawnTimer.reset(true);
	}

	public stop() {
		this._spawnTimer.stop();
	}

	public spawn() {
		const balloon = GameObjectManager.createGameOjbect(this.balloonPrefab, false);

		if (!balloon) return;

		const parent = this.balloonsParent || this.node;
		const bounds = new Bounds(parent);

		balloon.parent = parent;
		balloon.setPosition(bounds.getRandomPosition());

		balloon.getComponent(RigidBody2D).linearVelocity = new Vec2();
		balloon.angle = 0;

		balloon.getComponent(Balloon).color = ColorManager.getColor()

		balloon.active = true;
	}
}