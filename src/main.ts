import {
	ADD_DIR, carteBorder, carteFindPos, carteFindPoss, carteGet, carteGetPoss, carteMap, carteSet, carteUnBorder,
	DIRECTIONS,
	errorCarte, printCarte
} from './carte';
import { arrayOf, Point2D, transposeArray, tap, addPoint, strOf, isFunction } from './utils';
import { rc, rn, r, rns, rs } from './read';

let debug: (...any) => void;


/* Array prototype */
{

	Array.prototype.sum = function <T>(initValue: T = 0 as any, sumOp: (a: T, b: T) => T = (a, b) => (a as any + b as any)): number{
		return this.reduce(sumOp, initValue);
	};
	Array.prototype.flatMap = function <T, U>(callback: (value: T, index: number, array: T[]) => U[], thisArg?: any): U[]{
		const res: U[] = [];
		this.map(callback, thisArg).map((dataArray) => dataArray.map((data) => res.push(data)));
		return res;
	};
	Array.prototype.zip = function <T, R>(param?: cb<T, [string, R] | void | undefined | null> | R): Record<string, R>{
		const res: Record<string, R> = {};
		for (const cbRes of this.map(isFunction(param) ? param : (val => [val.toString(), param])) as [string, R][]) {
			if (cbRes) {
				res[cbRes[0]] = cbRes[1];
			}
		}
		return res;
	};
	Array.prototype.do = function <T, U>(callback: (value: T, index: number, array: T[]) => void, thisArg?: any): T[]{
		this.map(callback, thisArg);
		return this;
	};
	Array.prototype.count = function <T>(value: T): number{
		return this.filter((value_) => value_ === value).length;
	};
	Array.prototype.permute = function <T>(index1: number, index2: number = index1 + 1): void{
		let value = this[index1];
		this[index1] = this[index2];
		this[index2] = value;
	};
	Array.prototype.chunk = function <T>(size: number): T[][]{
		const res: T[][] = [];
		for (let i = 0; i < this.length; i += size) res.push(this.slice(i, i + size));
		return res;
	};

	Array.prototype.links = function <T>(widthFirstLast: boolean = false): [T, T][]{
		const res: [T, T][] = arrayOf(this.length - 1).map(i => [this[i], this[i + 1]] as [T, T]);
		if (widthFirstLast) {
			res.push([this[this.length - 1], this[0]]);
		}
		return res;
	};

	Array.prototype.maps = function <T, U extends Array<any>>(...callback: ((value: T, index: number, array: T[]) => any)[]): U{
		return this.map((v, i) => callback[i](v, i, this));
	};

	Array.prototype.sortAsc = function <T>(): T[]{
		return this.sort((a, b) => a - b);
	};
	Array.prototype.sortDesc = function <T>(): T[]{
		return this.sort((a, b) => b - a);
	};
	Array.prototype.add = function <T>(...e: T[]): T[]{
		this.push(...e);
		return this;
	};

	Array.prototype.most = function <T>(fc: (value: T, index: number, array: T[]) => number): Most<T>{
		if (!this.length) return [] as any;
		let res: any = [];
		let index: number[] = [];
		let max = -Infinity;
		this.forEach((v, i, t) => {
			const r = fc(v, i, t);
			if (r < max) return;
			if (r === max) {
				res.push(v);
				index.push(i);
			} else {
				res = [v];
				index = [i];
				max = r;
			}
		});
		res.max = max;
		res.index = index;
		return res;
	};

	Array.prototype.best = function <T>(fc: (value: T, index: number, array: T[]) => number, end ?: (value: T, index: number, array: T[]) => any): T{
		const res = this.most(fc);
		if (!res.length) return;
		if (end) end(res[0], res.index[0], this);
		return res[0];
	};
	Array.prototype.last = function <T>(): T{
		return this[this.length - 1];
	};
}

export function run(){
	const [c,ci] = r().split('+').map(str=>parseFloat(str));
	const f = ([a,b]: Point2D): Point2D => [a*a-b*b+c,ci];
	const fn = (n: number):Point2D => n ? f(fn(n-1)) : [0,0];

}
