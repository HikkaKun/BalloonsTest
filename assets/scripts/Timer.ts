export default class Timer {
	private _time = 0;
	private _isStarted = false;

	public interval = 1;

	public OnTimerEndCallback: () => void;

	constructor(interval: number, isStart = false) {
		this.interval = interval;

		isStart && this.start();
	}

	public start() {
		this._isStarted = true;
	}

	public update(dt: number) {
		if (!this._isStarted) return;

		this._time += dt;
		if (this._time >= this.interval) {
			this._time = 0;
			this.OnTimerEndCallback instanceof Function && this.OnTimerEndCallback();
		}
	}

	public stop() {
		this._isStarted = false;
	}

	public reset(isStart = true) {
		this._time = 0;
		this._isStarted = isStart;
	}
}