import { math, Node, UITransform, Vec2, Vec3 } from 'cc';

export function randomEnumKey<T extends object>(anEnum: T, limitTo?: number): T[keyof T] {
	const values = Object.keys(anEnum)
		.map(n => Number.parseInt(n))
		.filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
	const index = Math.floor(Math.random() * (limitTo ?? values.length))

	return values[index];
}

export type EnumType<T> = T[keyof T];

export function shuffleArray(array: Array<unknown>): Array<unknown> {
	let currentIndex = array.length, randomIndex: number;

	while (currentIndex != 0) {

		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

export class Bounds {
	readonly topLeft: Vec2;
	readonly bottomRight: Vec2;
	readonly width: number;
	readonly height: number;

	constructor(node: Node) {
		const { x, y } = node.position;
		const transform = node.getComponent(UITransform) as UITransform;

		const width = (transform?.width ?? 0) * node.scale.x;
		const height = (transform?.height ?? 0) * node.scale.y;

		const anchorX = transform?.anchorX ?? 0.5;
		const anchorY = transform?.anchorY ?? 0.5;

		this.topLeft = new Vec2(x - width * anchorX, y + height * (1 - anchorY));
		this.bottomRight = new Vec2(x + width * (1 - anchorX), y - height * anchorY);
		this.width = width;
		this.height = height;
	}

	public getRandomPosition(): Vec3 {
		return new Vec3(
			randomFloat(this.width) - this.width / 2,
			randomFloat(this.height) - this.height / 2
		);
	}
}

export function randomFloat(max: number): number {
	return Math.random() * max;
}

export function randomRange(min: number, max: number): number {
	return min + Math.random() * (max - min);
}

export function randomInt(max: number): number {
	return Math.floor(Math.random() * max);
}

export function randomIntRange(min: number, max: number): number {
	return Math.floor(randomRange(min, max));
}

export function convertEulerToAngle(euler: math.IVec3Like): number {
	const z = euler.z;

	switch (euler.x) {
		case 0:
			return z > 0 ? z : 360 + z;
		case 180:
			return 180 - z;
		case -180:
			return 180 - z;
	}

	return 0;
}