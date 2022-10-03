export default class Timer {
	private _time = 0;
	private _isStarted = false;
	private readonly _endTime;

	public OnTimerEndCallback: () => {};

	constructor(endTime, isStart = false) {
		this._endTime = endTime;

		isStart && this.start();
	}

	public start() {
		this._isStarted = true;
	}

	public update(dt) {
		if (!this._isStarted) return;

		this._time += dt;
		if (this._time >= this._endTime) {
			this._time = 0;
			this.OnTimerEndCallback instanceof Function && this.OnTimerEndCallback();
		}
	}

	public stop() {
		this._isStarted = false;
	}
}