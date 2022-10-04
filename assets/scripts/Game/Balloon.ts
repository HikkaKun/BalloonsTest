
import { _decorator, Component, Node, log, RigidBody2D, Vec2, Vec3, Color, Sprite } from 'cc';
import GameObject from '../Plugins/GameObject/GameObject';
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
	}

	protected update(dt: number) {
		const euler = this.node.rotation.getEulerAngles(new Vec3());
		const angle = convertEulerToAngle(euler);
		this._rigidBody.angularVelocity = angle > 0 && angle <= 180 ? -0.1 : 0.1;
	}

	public onDown() {
		this.kill();
	}
}