import { isArray } from 'util';
import { arrayOf, Point2D } from './utils';

export type DIRECTION = 0 | 1 | 2 | 3;
export const TOP: DIRECTION = 0;
export const RIGHT: DIRECTION = 1;
export const BOTTOM: DIRECTION = 2;
export const LEFT: DIRECTION = 3;

export const DIRECTIONS = [TOP,RIGHT,BOTTOM,LEFT];
export type ARROW = '<' | '>' | '^' | 'v';

export const ARROW_TO_DIRECTION: Record<ARROW, DIRECTION> = {
	'^': TOP,
	'>': RIGHT,
	'v': BOTTOM,
	'<': LEFT
};

export const DIRECTION_TO_ARROW: Record<DIRECTION, ARROW> = {
	[TOP]: '^',
	[RIGHT]: '>',
	[BOTTOM]: 'v',
	[LEFT]: '<'
};

export const ROTATR: Record<DIRECTION, DIRECTION> = {
	[TOP]: RIGHT,
	[RIGHT]: BOTTOM,
	[BOTTOM]: LEFT,
	[LEFT]: TOP
};

export const ADD_DIR: Record<DIRECTION, (p:Point2D, n?: number)=>Point2D> = {
	[TOP]: ([x,y], n=1)=>[x,y-n],
	[RIGHT]: ([x,y],n=1)=>[x+n,y],
	[BOTTOM]: ([x,y],n=1)=>[x,y+n],
	[LEFT]: ([x,y],n=1)=>[x-n,y]
};

export const ROTATL: Record<DIRECTION, DIRECTION> = {
	[TOP]: LEFT,
	[RIGHT]: TOP,
	[BOTTOM]: RIGHT,
	[LEFT]: BOTTOM
};

export function carteGenerate(lines: string[]): string[][]{
	return lines.map(a => [...a]);
}

export function carteMap<T, V>(carte: T[][], fc: (val: T, pos: Point2D)=>V): V[][]{
	return carte.map((row,y)=>row.map((val, x)=>fc(val, [x,y])));
}

export function carteBorder<T>(carte: T[][], element: T): T[][]{
	const w = carte[0].length;
	return [
		arrayOf(w + 2, element),
		...carte.map((row) => [element, ...row, element]),
		arrayOf(w + 2, element)
	];
}

export function carteUnBorder<T>(carte: T[][]){
	let h = carte.length;
	let w = carte[0].length;
	carte.unshift();
	return carte.slice(1, h-1).map(row => row.slice(1, w-1));
}

export function carteFind<T>(carte: T[][], fc: (t: T, point: Point2D) => boolean | any): T{
	for (let y = 0; y < carte.length; y++) {
		let row = carte[y];
		for (let x = 0; x < row.length; x++) {
			if (fc(row[y][x], [x, y])) return row[y][x];
		}
	}
	return null;
}

export function carteGetPos<T>(carte: T[][], val: T): Point2D{
	for (let y = 0; y < carte.length; y++) {
		let row = carte[y];
		for (let x = 0; x < row.length; x++) {
			if (row[x] == val) return [x, y];
		}
	}
	return null;
}

export function *carteGetPoss<T>(carte: T[][], val: T): Generator<Point2D>{
	for (let y = 0; y < carte.length; y++) {
		let row = carte[y];
		for (let x = 0; x < row.length; x++) {
			if (row[x] == val) yield [x, y];
		}
	}
}

export function carteFindPos<T>(carte: T[][], fc: (t: T, point: Point2D) => boolean | any): Point2D{
	for (let y = 0; y < carte.length; y++) {
		let row = carte[y];
		for (let x = 0; x < row.length; x++) {
			if (fc(row[y][x], [x, y])) return [x, y];
		}
	}
	return null;
}
export function *carteFindPoss<T>(carte: T[][], fc: (t: T, point: Point2D) => boolean | any): Generator<Point2D>{
	for (let y = 0; y < carte.length; y++) {
		let row = carte[y];
		for (let x = 0; x < row.length; x++) {
			if (fc(row[x], [x, y])) yield [x, y];
		}
	}
}


export function carteGet<T>(carte: T[][], [x, y]: Point2D): T{
	return carte[y][x];
}

export function carteSet<T>(carte: T[][], [x, y]: Point2D, val: T): void{
	carte[y][x] = val;
}
export function errorCarte(carte: string[][]|string[]){
	carte.forEach(row=>console.error(Array.isArray(row)?row.join(''):row))
}

export function printCarte(carte: string[][]|string[]){
	carte.forEach(row=>console.log(Array.isArray(row)?row.join(''):row))
}
