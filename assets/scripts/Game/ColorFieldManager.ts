
import { _decorator, Component, Node, SpriteFrame, Vec2, Sprite, UITransform, Vec3, game, UIOpacity } from 'cc';
import GameObjectManager from '../Plugins/GameObject/GameObjectManager';
import { GameObjectType } from '../Plugins/GameObject/GameObjectType';
import { ColorManager } from './ColorManager';
const { ccclass, property } = _decorator;

@ccclass('ColorFieldManager')
export class ColorFieldManager extends Component {
	@property({ type: GameObjectType })
	public fieldPrefab = GameObjectType.None;

	@property(Vec2)
	public gameSize = new Vec2();

	private _fields: Array<Node> = [];

	protected start() {
		this.resetFields();
	}

	public resetFields() {
		const numberOfColors = ColorManager.staticColors.length;
		const height = this.gameSize.y / (numberOfColors + 1);

		for (let i = 0; i < numberOfColors; i++) {
			const field = GameObjectManager.createGameOjbect(this.fieldPrefab, false);

			field.getComponent(Sprite).color = ColorManager.staticColors[i];
			field.getComponent(UIOpacity).opacity = 64;

			const transform = field.getComponent(UITransform);
			transform.width = this.gameSize.x;
			transform.height = height;

			field.parent = this.node;
			field.setPosition(new Vec3(0, -height * (i + 1)));

			this._fields.push(field);

			field.active = true;
		}
	}
}