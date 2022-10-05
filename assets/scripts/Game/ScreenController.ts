
import { _decorator, Component, Node } from 'cc';
import { GameState } from '../Plugins/Game/GameState';
import { GameEvent } from '../Plugins/GameEvent';
import GlobalEvent from '../Plugins/GlobalEvent';
const { ccclass, property } = _decorator;

@ccclass('ScreenController')
export class ScreenController extends Component {
	@property(Node)
	public readyScreen: Node;

	@property(Node)
	public loseScreen: Node;

	@property(Node)
	public scoreboard: Node;

	protected onEnable() {
		this._handleEvents(true);
	}

	protected onDisable() {
		this._handleEvents(false);
	}

	protected _handleEvents(isOn: boolean) {
		const func = isOn ? 'on' : 'off';

		GlobalEvent[func](GameEvent.ChangeGameState, this.OnChangeGameState, this);
	}

	public OnChangeGameState(gameState: number) {
		switch (gameState) {
			case GameState.Ready:
				this.readyScreen.active = true;
				this.loseScreen.active = false;
				this.scoreboard.active = false;
				break;
			case GameState.Game:
				this.readyScreen.active = false;
				this.loseScreen.active = false;
				this.scoreboard.active = false;
				break;
			case GameState.Lose:
				this.readyScreen.active = false;
				this.loseScreen.active = true;
				this.scoreboard.active = false;
		}
	}
}