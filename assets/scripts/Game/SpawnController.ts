
import { _decorator, Component, Node } from 'cc';
import { GameState } from '../Plugins/Game/GameState';
import { GameEvent } from '../Plugins/GameEvent';
import GlobalEvent from '../Plugins/GlobalEvent';
import { BalloonSpawner } from './BalloonSpawner';
const { ccclass, property } = _decorator;

@ccclass('SpawnController')
export class SpawnController extends Component {
	@property(BalloonSpawner)
	spawner: BalloonSpawner;

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
		if (!this.spawner) return;

		switch (Number(gameState)) {
			case GameState.Game:
				this.spawner.reset();
				break;
			case GameState.Lose:
				this.spawner.stop();
		}
	}
}
