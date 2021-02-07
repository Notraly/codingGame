import * as fs from 'fs';
import { run } from "./main";

function useFileAsReadline(path: string){
  const data = fs.readFileSync(path, 'utf8').split('\n');
  global.readline = () => data.shift();
}

describe("run", () => {
  it("should be a function", () => {
    expect(typeof run).toBe("function");
  });
  it("test run with input file", () => {
    useFileAsReadline('./src/test.txt');
    run();
  });
});
