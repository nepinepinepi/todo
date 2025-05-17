import { pathToFileURL, fileURLToPath } from "url";

const tests = [];
const befores = [];
export function test(name, fn) { tests.push({ name, fn }); }
export function beforeEach(fn) { befores.push(fn); }
export function expect(received) {
  return {
    toBe(expected) {
      if (received !== expected) throw new Error(`Expected ${expected} but got ${received}`);
    },
    toContain(expected) {
      if (!received.includes(expected)) throw new Error(`Expected ${received} to contain ${expected}`);
    }
  };
}
export async function run() {
  for (const { name, fn } of tests) {
    for (const b of befores) await b();
    await fn();
    console.log(`✓ ${name}`);
  }
}
if (process.argv[1] === fileURLToPath(pathToFileURL(import.meta.url))) {
  run().catch(err => { console.error(err); process.exit(1); });
}
