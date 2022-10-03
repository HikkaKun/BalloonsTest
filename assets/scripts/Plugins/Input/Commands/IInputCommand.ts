import InputCatcher from '../InputCatcher';
import { Component, Touch } from 'cc';

export default abstract class IInputCommand {
	public onDown(touch: Touch, inputCatcher: InputCatcher, target?: any) { }
	public onMove(touch: Touch, inputCatcher: InputCatcher, target?: any) { }
	public onUp(touch: Touch, inputCatcher: InputCatcher, target?: any) { }
}