import { Component, log, Touch } from 'cc';
import InputCatcher from '../InputCatcher';
import IInputCommand from './IInputCommand';

export default class TargetInputCommand extends IInputCommand {
	public onDown(touch: Touch, inputCatcher: InputCatcher, target?: any) {
		target?.onDown && target.onDown(touch, inputCatcher);
	}
	public onMove(touch: Touch, inputCatcher: InputCatcher, target?: any) {
		target?.onMove && target.onMove(touch, inputCatcher);
	}
	public onUp(touch: Touch, inputCatcher: InputCatcher, target?: any) {
		target?.onUp && target.onUp(touch, inputCatcher);
	}
}