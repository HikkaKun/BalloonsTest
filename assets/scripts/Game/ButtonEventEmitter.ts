
import { _decorator, Component, Node, EventTouch } from 'cc';
import { GameEvent } from '../Plugins/GameEvent';
import GlobalEvent from '../Plugins/GlobalEvent';
const { ccclass, property } = _decorator;

@ccclass('ButtonEventEmitter')
export class ButtonEventEmitter extends Component {
	@property({ type: GameEvent })
	public event = GameEvent.None;

	emit(event: EventTouch, data: unknown) {
		GlobalEvent.emit(this.event, data);
	}
}
