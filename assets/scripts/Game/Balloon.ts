
import { _decorator, Component, Node, log, RigidBody2D, Vec2, Vec3, Color, Sprite, Collider2D, Contact2DType, IPhysics2DContact, PhysicsSystem2D, ERaycast2DType, Rect } from 'cc';
import { GameEvent } from '../Plugins/GameEvent';
import GameObject from '../Plugins/GameObject/GameObject';
import GlobalEvent from '../Plugins/GlobalEvent';
import { PhysicGroup } from '../Plugins/Physics/PhysicGroup';
import { convertEulerToAngle } from '../Utilities';
const { ccclass, property } = _decorator;

@ccclass('Balloon')
export class Balloon extends GameObject {

	private _rigidBody: RigidBody2D;

	private _color: Color;

	public get color(): Color {
		return this._color;
	}

	public set color(value: Color) {
		this._color = value;

		for (const sprite of this.getComponentsInChildren(Sprite)) {
			sprite.color = value;
		}
	}

	protected onLoad() {
		this._rigidBody = this.getComponent(RigidBody2D);

		this.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
	}

	protected update(dt: number) {
		const euler = this.node.rotation.getEulerAngles(new Vec3());
		const angle = convertEulerToAngle(euler);
		this._rigidBody.angularVelocity = angle > 0 && angle <= 180 ? -0.1 : 0.1;
	}

	public destroyBalloon(byUser = false) {
		let inField = false;

		if (byUser) {
			const { x, y } = this.node.getWorldPosition();
			const results = PhysicsSystem2D.instance.testAABB(new Rect(x, y, 1, 1));

			for (const collider of results) {
				if (collider.group == PhysicGroup.COLOR_FIELD) {
					inField = this.color.equals(collider.node.getComponent(Sprite).color);
				}
			}
		}

		GlobalEvent.emit(GameEvent.BalloonDestoyed, byUser, inField);

		this.kill();
	}

	public onDown() {
		this.destroyBalloon(true);
	}

	public onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
		const group = otherCollider.group;

		if (group == PhysicGroup.SPIKES) {
			setTimeout(() => {
				this.destroyBalloon();
			});
		}
	}
}