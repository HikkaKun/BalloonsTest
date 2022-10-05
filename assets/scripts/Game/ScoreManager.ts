
import { _decorator, Component, Node, CCInteger, CCFloat, RichText, Vec3, Label, tween } from 'cc';
import { GameState } from '../Plugins/Game/GameState';
import { GameEvent } from '../Plugins/GameEvent';
import GameObjectManager from '../Plugins/GameObject/GameObjectManager';
import { GameObjectType } from '../Plugins/GameObject/GameObjectType';
import GlobalEvent from '../Plugins/GlobalEvent';
import PoolObject from '../Plugins/Pool/PoolObject';
const { ccclass, property } = _decorator;

@ccclass('ScoreManager')
export class ScoreManager extends Component {
	@property(CCInteger)
	public scoreForBalloon = 1;

	@property(CCFloat)
	public multiplierIfTapInsideField = 2;

	@property(CCFloat)
	public maxMultiplier = 10;

	@property(RichText)
	public scoreText: RichText;

	@property(RichText)
	public multiplierText: RichText;

	@property({ type: GameObjectType })
	public pointsPrefab = GameObjectType.None;

	@property(Node)
	public pointsParent: Node;

	public multiplier = 1;

	public get score() {
		return ScoreManager._score;
	}

	public set score(value: number) {
		ScoreManager._score = value;
	}

	private static _score = 0;

	public static getScore(): number {
		return ScoreManager._score;
	}

	protected start() {
		this._updateText();
	}

	protected onEnable() {
		this._handleEvents(true);
	}

	protected onDisable() {
		this._handleEvents(false);
	}

	protected _handleEvents(isOn: boolean) {
		const func = isOn ? 'on' : 'off';

		GlobalEvent[func](GameEvent.BalloonDestoyed, this.OnBalloonDestroyed, this);
		GlobalEvent[func](GameEvent.ChangeGameState, this.OnChangeGameState, this);
	}

	protected _updateText() {
		if (this.scoreText) {
			this.scoreText.string = "Score: " + this.score;
		}

		if (this.multiplierText) {
			this.multiplierText.string = "Bonus: x" + this.multiplier;
		}
	}

	protected _spawnPoints(worldPosition: Vec3) {
		const node = GameObjectManager.createGameOjbect(this.pointsPrefab, true);
		node.parent = this.pointsParent || this.node;
		node.setWorldPosition(worldPosition);

		const text = node.getComponent(Label);
		text.string = '+' + this.multiplier;

		const position = node.getPosition();
		position.y += 25;

		tween(node)
			.to(1, { position: position }, {
				onComplete: () => {
					node.getComponent(PoolObject).returnToPool();
				}
			})
			.start();
	}

	public OnBalloonDestroyed(byUser: boolean, inField: boolean, worldPosition: Vec3) {
		if (byUser) {
			if (inField) {
				this.multiplier = Math.min(this.multiplier * this.multiplierIfTapInsideField, this.maxMultiplier);
			} else {
				this.multiplier = 1;
			}

			this.score += this.scoreForBalloon * this.multiplier;

			this._spawnPoints(worldPosition);
		} else {
			this.multiplier = 1;
		}

		this._updateText();
	}

	public OnChangeGameState(gameState: number) {
		if (gameState == GameState.Ready) {
			this.score = 0;
			this._updateText();
		}
	}
}
