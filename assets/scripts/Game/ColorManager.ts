
import { _decorator, Component, Node, Color } from 'cc';
import { randomInt } from '../Utilities';
const { ccclass, property } = _decorator;

@ccclass('ColorManager')
export class ColorManager extends Component {
	@property([Color])
	public colors: Array<Color> = [];

	public static staticColors: Array<Color> = [];

	protected onLoad() {
		ColorManager.staticColors = this.colors;
	}

	public static getColor(): Color {
		return ColorManager.staticColors[randomInt(ColorManager.staticColors.length)];
	}
}