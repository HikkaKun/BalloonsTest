
import { _decorator, Component, Node } from 'cc';
import { GameEvent } from '../GameEvent';
import GlobalEvent from '../GlobalEvent';
import { GameState } from './GameState';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
	@property({ type: GameState })
	public startState = GameState.Ready;

	protected _gameState: number;

	public set gameState(value: number) {
		if (value != this._gameState) {
			GlobalEvent.emit(GameEvent.ChangeGameState, value);
		}

		this._gameState = value;
	}

	public get gameState(): number {
		return this._gameState;
	}

	protected onLoad() {
		this._handleEvents(true);
	}

	protected start() {
		this.gameState = this.startState;
	}

	protected _handleEvents(isOn: boolean) {
		const func = isOn ? 'on' : 'off';

		GlobalEvent[func](GameEvent.BalloonDestoyed, this.OnBalloonDestroyed, this);
		GlobalEvent[func](GameEvent.ChangeGameState, this.OnChangeGameState, this);
	}

	public OnBalloonDestroyed(byUser: boolean) {
		if (!byUser) {
			this.gameState = GameState.Lose;
		}
	}

	public OnChangeGameState(gameState: number) {
		this._gameState = gameState;
	}
}
