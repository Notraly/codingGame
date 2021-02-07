/**
 * Reads a line from an input
 * @return {string} the read line
 */
declare let readline: ()=>string;

declare module NodeJS {
	interface Global {
		readline: ()=>string;
	}
}

/**
 * Prints given object to the output.
 * @param {*} object the object to print.
 */
declare function print(object: any): void;

/**
 * Prints debugging messages, without affecting game's logic.
 * @param {*} object the object to print.
 */
declare function printErr(object: any): void;

type cb<T, R> = (value: T, index: number, array: T[]) => R;

interface Array<T> {
	links: (widthFirstLast?: boolean) => [T, T][];
	sum: (initValue?:T, sumOp?: (a:T,b:T)=>T) => T;
	permute: (index1: number, index2?: number) => void;
	do: <U>(callback: (value: T, index: number, array: T[]) => void, thisArg?: any) => T[];
	flatMap: <U>(callback: cb<T, U[]>, thisArg?: any) => U[];
	count: (value: T) => number;
	chunk: (size: number) => T[][];
	maps: (<U extends Array<any>>(...callback: ((value: T, index: number, array: T[]) => any)[]) => U);
	zip: <R>(c?: cb<T, [string,R] | void | undefined | null> | R) => Record<string, R>;
	sortAsc: () => T[];
	sortDesc: () => T[];
	most: (fc: (value: T, index: number, array: T[]) => number) => Most<T>;
	best: (fc: (value: T, index: number, array: T[]) => number, end?: (value: T, index: number, array: T[]) => any) => T;
	add: (...T) => T[];
	last: () => T;
}

interface Most<T> extends Array<T> {
	max: number;
	index: number[];
}
