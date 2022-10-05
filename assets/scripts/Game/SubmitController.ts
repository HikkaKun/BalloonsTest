
import { _decorator, Component, Node, Button, RichText } from 'cc';
import { GameState } from '../Plugins/Game/GameState';
import { GameEvent } from '../Plugins/GameEvent';
import GlobalEvent from '../Plugins/GlobalEvent';
import { Scoreboard } from './Scoreboard';
import { ScoreManager } from './ScoreManager';
const { ccclass, property } = _decorator;

@ccclass('SubmitController')
export class SubmitController extends Component {
	@property(Button)
	public submitButton: Button;

	@property(RichText)
	public scoreText: RichText;

	@property(Scoreboard)
	public scoreboard: Scoreboard;

	@property(Node)
	public loseScreen: Node;

	private _lastName = '';

	protected onEnable() {
		if (this.scoreText) this.scoreText.string = ScoreManager.getScore().toString();
	}

	public submit() {
		const score = ScoreManager.getScore();
		const name = this._lastName;

		this.scoreboard.addScore(name, score);

		GlobalEvent.emit(GameEvent.ChangeGameState, GameState.Scoreboard);
	}

	public OnNameChanged(name: string) {
		this._lastName = String(name);

		this.submitButton.interactable = this._lastName.length > 0;
	}
}