
import { _decorator, Component, Node, PhysicsSystem2D, CCBoolean, EPhysics2DDrawFlags } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PhysicsManager')
export class PhysicsManager extends Component {

	@property(CCBoolean)
	isPhysics2DEnabled = false;

	@property({ visible: function () { return this.isPhysics2DEnabled } })
	drawPhysics = false;

	protected start() {
		PhysicsSystem2D.instance.enable = this.isPhysics2DEnabled;
		PhysicsSystem2D.instance.debugDrawFlags = this.drawPhysics ? EPhysics2DDrawFlags.All : EPhysics2DDrawFlags.None;
	}
}