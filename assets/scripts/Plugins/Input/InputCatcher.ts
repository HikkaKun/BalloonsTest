import { _decorator, Component, EventTouch, Node } from 'cc';
import { GameEvent } from '../GameEvent';
import GlobalEvent from '../GlobalEvent';
import { InputDirection, InputDirectionEnum } from './InputDirection';
import { InputType } from './InputType';

const { ccclass, property } = _decorator;

@ccclass
export default class InputCatcher extends Component {
	@property({ type: InputDirection })
	public direction: InputDirectionEnum = InputDirection.None;

	@property(Component)
	public target: Component | null = null;

	protected onEnable(): void {
		this.handleInput(true);
	}

	protected onDisable(): void {
		this.handleInput(false);
	}

	protected handleInput(isOn: boolean) {
		const func = isOn ? "on" : "off";

		this.node[func](Node.EventType.TOUCH_START, this.onDown, this);
		this.node[func](Node.EventType.TOUCH_MOVE, this.onMove, this);
		this.node[func](Node.EventType.TOUCH_END, this.onUp, this);
		this.node[func](Node.EventType.TOUCH_CANCEL, this.onUp, this);
	}

	protected onDown(event: EventTouch) {
		GlobalEvent.emit(GameEvent.Input, InputType.Down, event.touch, this.direction, this, this.target);
	}

	protected onMove(event: EventTouch) {
		GlobalEvent.emit(GameEvent.Input, InputType.Move, event.touch, this.direction, this, this.target);
	}

	protected onUp(event: EventTouch) {
		GlobalEvent.emit(GameEvent.Input, InputType.Up, event.touch, this.direction, this, this.target);
	}
}
