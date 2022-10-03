
import { _decorator, Component, Node, PhysicsSystem2D, CCBoolean, EPhysics2DDrawFlags } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

	@property(CCBoolean)
	isPhysics2DEnabled = false;

	@property(CCBoolean)
	drawPhysics = false;

	protected start() {
		PhysicsSystem2D.instance.enable = this.isPhysics2DEnabled;
		PhysicsSystem2D.instance.debugDrawFlags = this.drawPhysics ? EPhysics2DDrawFlags.All : EPhysics2DDrawFlags.None;
	}
}