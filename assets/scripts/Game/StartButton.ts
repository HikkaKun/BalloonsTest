
import { _decorator, Component, Node } from 'cc';
import { GameState } from '../Plugins/Game/GameState';
import { GameEvent } from '../Plugins/GameEvent';
import GlobalEvent from '../Plugins/GlobalEvent';
const { ccclass, property } = _decorator;

@ccclass('StartButton')
export class StartButton extends Component {
	public startGame() {
		GlobalEvent.emit(GameEvent.ChangeGameState, GameState.Game);
	}
}
