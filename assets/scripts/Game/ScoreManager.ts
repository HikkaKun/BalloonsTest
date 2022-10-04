
import { _decorator, Component, Node, CCInteger, CCFloat, RichText } from 'cc';
import { GameEvent } from '../Plugins/GameEvent';
import GlobalEvent from '../Plugins/GlobalEvent';
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

	public multiplier = 1;
	public score = 0;

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
	}

	protected _updateText() {
		if (this.scoreText) {
			this.scoreText.string = "Score: " + this.score;
		}

		if (this.multiplierText) {
			this.multiplierText.string = "Bonus: x" + this.multiplier;
		}
	}

	public OnBalloonDestroyed(byUser: boolean, inField: boolean) {
		if (byUser) {
			if (inField) {
				this.multiplier = Math.min(this.multiplier * this.multiplierIfTapInsideField, this.maxMultiplier);
			} else {
				this.multiplier = 1;
			}

			this.score += this.scoreForBalloon * this.multiplier;
		} else {
			this.multiplier = 1;
		}

		this._updateText();
	}
}
