import { _decorator, Component } from 'cc';
import Pool from './Pool';

const { ccclass, property } = _decorator;

@ccclass
export default class PoolObject extends Component {
	public pool: Pool | null = null;

	public returnToPool(): void {
		this.node.active = false;

		if (this.pool == null) return;

		this.node.parent = this.pool.node;
		this.pool.push(this.node);
	}
}
