import { _decorator, Component, Prefab, instantiate, Node, CCInteger } from 'cc';
import PoolObject from './PoolObject';

const { ccclass, property } = _decorator;

@ccclass
export default class Pool extends Component {
	@property(Prefab)
	public prefab: Prefab | null = null;

	@property(CCInteger)
	protected pregenerateCount: number = 0;

	protected _objects = new Array<Node>();

	protected onLoad(): void {
		if (this.prefab == null) return;

		for (let i = 0; i < this.pregenerateCount; i++) {
			this.push(this._createNewObject() as Node);
		}
	}

	private _createNewObject(): Node | null {
		if (this.prefab == null) return null;

		const node = instantiate(this.prefab);
		node.active = false;
		node.parent = this.node;

		const poolObject = node.getComponent(PoolObject) || node.addComponent(PoolObject);
		poolObject.pool = this;

		return node;
	}

	public pop(): Node | null {
		if (this._objects.length > 0) {
			return this._objects.pop();
		} else {
			return this._createNewObject();
		}
	}

	public push(node: Node): void {
		this._objects.push(node);
	}
}
