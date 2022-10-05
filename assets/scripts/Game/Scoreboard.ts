
import { _decorator, Component, Node, HorizontalTextAlignment, Vec3, Label, Color, UITransform } from 'cc';
import GameObjectManager from '../Plugins/GameObject/GameObjectManager';
import { GameObjectType } from '../Plugins/GameObject/GameObjectType';
const { ccclass, property } = _decorator;

@ccclass('Scoreboard')
export class Scoreboard extends Component {
	@property(Node)
	public textStartPoint: Node;

	@property(Node)
	public textParent: Node;

	@property({ type: GameObjectType })
	public textPrefab = GameObjectType.None;

	@property(Node)
	public content: Node;

	private _scores = new Map<string, { score: number, text: Label }>();
	private _scoresArray = new Array<{ score: number, text: Label }>();

	public addScore(name: string, score: number) {
		let needToSort = false;

		if (this._scores.has(name)) {
			const data = this._scores.get(name);

			if (data.score != score) {
				data.score = score;
				data.text.string = name + ' - ' + score;

				needToSort = true;
			}
		} else {
			const node = GameObjectManager.createGameOjbect(this.textPrefab);
			node.parent = this.textParent;

			const text = node.getComponent(Label);
			text.string = name + ' - ' + score;

			const data = { score, text };

			this._scores.set(name, data);
			this._scoresArray.push(data)

			needToSort = true;
		}

		if (needToSort) this.sort();
	}

	public sort() {
		this._scoresArray.sort((a, b) => b.score - a.score);

		for (let i = 0; i < this._scoresArray.length; i++) {
			const node = this._scoresArray[i].text.node;

			node.setPosition(this.textStartPoint.getPosition().add(new Vec3(0, -50 * i)));
		}

		this.content.getComponent(UITransform).height = this._scoresArray.length * 50 + 100;
	}
}
