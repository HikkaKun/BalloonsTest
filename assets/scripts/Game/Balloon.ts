
import { _decorator, Component, Node, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Balloon')
export class Balloon extends Component {
	public onDown() {
		log('down')
	}
}
