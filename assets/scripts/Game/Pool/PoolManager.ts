import { _decorator, Component, Prefab } from 'cc';
import Pool from './Pool';

const { ccclass, property } = _decorator;

@ccclass
export default class PoolManager extends Component {
	public pools = new Map<Prefab, Pool>();

	protected onLoad() {
		const pools = this.node.getComponentsInChildren(Pool);

		for (const pool of pools) {
			if (pool.prefab == null) continue;

			this.pools.set(pool.prefab, pool);
		}
	}
}
