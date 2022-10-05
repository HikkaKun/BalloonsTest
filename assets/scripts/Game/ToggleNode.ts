
import { _decorator, Component, Node, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ToggleNode')
export class ToggleNode extends Component {
	public toggle(event: EventTouch, isOn: string) {
		this.node.active = isOn == 'true' ? true : false;
	}
}
