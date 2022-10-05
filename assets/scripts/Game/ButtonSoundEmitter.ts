
import { _decorator, Component, Node, EventTouch } from 'cc';
import { AudioType } from '../Plugins/Audio/AudioType';
import { ButtonEventEmitter } from './ButtonEventEmitter';
const { ccclass, property } = _decorator;

@ccclass('ButtonSoundEmitter')
export class ButtonSoundEmitter extends ButtonEventEmitter {
	@property({ type: AudioType })
	public soundType = AudioType.None;

	public emit(event: EventTouch) {
		super.emit(event, this.soundType);
	}
}

