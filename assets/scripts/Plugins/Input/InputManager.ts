import { _decorator, Component, Touch } from 'cc';
import { GameEvent } from '../GameEvent';
import GlobalEvent from '../GlobalEvent';
import IInputCommand from './Commands/IInputCommand';
import InputCatcher from './InputCatcher';
import { InputDirectionEnum } from './InputDirection';
import { InputType, InputTypeEnum } from './InputType';

const { ccclass, property } = _decorator;

@ccclass
export default class InputManager extends Component {
	protected _inputCommands = new Map<InputDirectionEnum, IInputCommand>();

	protected onLoad(): void {
		this._handleEvents(true);

	}

	protected _handleEvents(isOn: boolean) {
		const func = isOn ? 'on' : 'off';

		GlobalEvent[func](GameEvent.Input, this.OnInput, this);
	}

	protected OnInput(type: InputTypeEnum, touch: Touch, direction: InputDirectionEnum, inputCatcher: InputCatcher) {
		switch (type) {
			case InputType.Down:
				this._inputCommands.get(direction)?.onDown(touch, inputCatcher);
				break;
			case InputType.Move:
				this._inputCommands.get(direction)?.onMove(touch, inputCatcher);
				break;
			case InputType.Up:
				this._inputCommands.get(direction)?.onUp(touch, inputCatcher);
				break;
		}
	}
}
