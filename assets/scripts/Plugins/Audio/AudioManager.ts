
import { _decorator, Component, Node, AudioSource, AudioClip } from 'cc';
import { GameEvent } from '../GameEvent';
import GlobalEvent from '../GlobalEvent';
import { AudioType } from './AudioType';
const { ccclass, property } = _decorator;

@ccclass('AudioSettings')
class AudioSettings {
	@property(AudioClip)
	public clip: AudioClip;

	@property({ type: AudioType })
	public type = AudioType.None;
}

@ccclass('AudioManager')
export class AudioManager extends Component {

	@property([AudioSettings])
	public clips = new Array<AudioSettings>();

	private _audio: AudioSource;

	private _clips = new Map<number, AudioClip>();

	protected onLoad() {
		this._audio = this.addComponent(AudioSource);

		for (const clip of this.clips) {
			this._clips.set(clip.type, clip.clip);
		}

		this._handleEvents(true);
	}

	protected _handleEvents(isOn: boolean) {
		const func = isOn ? 'on' : 'off';

		GlobalEvent[func](GameEvent.PlayAudio, this.OnPlayerAudio, this);
	}

	public OnPlayerAudio(type: number) {
		const clip = this._clips.get(type);

		if (!clip) return;

		this._audio.playOneShot(clip);
	}
}
