
const utils = require("./utils");

describe("Utility Module - TDD walkthrough tests", () => {
  const FIXED_DATE = new Date("2020-01-01T00:00:00Z");

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(FIXED_DATE);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  //  Exact equality: toBe, toEqual, toStrictEqual
  describe("Exact equality", () => {
    test("toBe: sum(2,2) is 4 (PASS)", () => {
      expect(utils.sum(2, 2)).toBe(4);
    });

    test("toBe: sum(2,2) is 5 (INTENTIONAL FAIL)", () => {
      expect(utils.sum(2, 2)).toBe(5); 
    });

    test("toEqual: createUser returns expected object (PASS)", () => {
      const u = utils.createUser("Alice", 30);
      expect(u).toEqual({
        name: "Alice",
        age: 30,
        createdAt: FIXED_DATE,
      });
    });

    test("toEqual: createUser - wrong expected (INTENTIONAL FAIL)", () => {
      const u = utils.createUser("Alice", 30);
      expect(u).toEqual({
        name: "Bob",
        age: 30,
        createdAt: FIXED_DATE,
      });
    });

    test("toEqual vs toStrictEqual difference (PASS for toEqual, FAIL for toStrictEqual)", () => {
      const a = { name: "Alice" };
      const b = { name: "Alice", extra: undefined };
      expect(a).toEqual(b); 
      expect(a).not.toStrictEqual(b); 
    });

    test("toStrictEqual: sparse array example (INTENTIONAL FAIL)", () => {
      const arr1 = [1, , 3];
      const arr2 = [1, undefined, 3];
      expect(arr1).toEqual(arr2);
      expect(arr1).toStrictEqual(arr2); 
    });
  });

  //  Negation (.not)
  describe("Negation", () => {
    test("sum(1,1) not toBe 3 (PASS)", () => {
      expect(utils.sum(1, 1)).not.toBe(3);
    });

    test("sum(1,1) not toBe 2 (INTENTIONAL FAIL)", () => {
      expect(utils.sum(1, 1)).not.toBe(2); 
    });

    test("string not toMatch (PASS)", () => {
      expect("hello world").not.toMatch(/bye/);
    });

    test("array not toContain (INTENTIONAL FAIL)", () => {
      expect([1, 2, 3]).not.toContain(2); 
    });
  });

  //  Truthiness matchers
  describe("Truthiness", () => {
    test("toBeNull (PASS)", () => {
      const x = null;
      expect(x).toBeNull();
    });

    test("toBeUndefined (PASS)", () => {
      let y;
      expect(y).toBeUndefined();
    });

    test("toBeDefined (PASS)", () => {
      const u = utils.createUser("A", 1);
      expect(u.name).toBeDefined();
    });

    test("toBeTruthy & toBeFalsy (PASS)", () => {
      expect(utils.findInArray([1, 2, 3], 2)).toBeTruthy();
      expect(utils.findInArray([1, 2, 3], 4)).toBeFalsy();
    });

    test("toBeTruthy intentional fail", () => {
      expect(utils.findInArray([], 1)).toBeTruthy(); 
    });
  });

  //  Number matchers
  describe("Number matchers", () => {
    test("toBeGreaterThan / toBeLessThanOrEqual (PASS)", () => {
      expect(utils.sum(2, 3)).toBeGreaterThan(4);
      expect(utils.approximateDivision(10, 2)).toBeLessThanOrEqual(5);
    });

    test("toBeLessThan intentional fail", () => {
      expect(utils.sum(2, 3)).toBeLessThan(4); 
    });

    test("toBeCloseTo for floating point (PASS)", () => {
      expect(utils.approximateDivision(0.3, 0.1)).toBeCloseTo(3);
    });

    test("toBeCloseTo intentional fail", () => {
      expect(utils.approximateDivision(0.1, 0.2)).toBeCloseTo(0.5); 
    });
  });

  //  String matchers
  describe("String matchers", () => {
    test("toMatch: name matches regex (PASS)", () => {
      const u = utils.createUser("Treasure", 20);
      expect(u.name).toMatch(/Treas/);
    });

    test("not.toMatch intentional fail", () => {
      const u = utils.createUser("Treasure", 20);
      expect(u.name).not.toMatch(/Trea/); 
    });

    test("JSON.stringify contains substring (PASS)", () => {
      const json = JSON.stringify(utils.createUser("A", 1));
      expect(json).toMatch(/"name":"A"/);
    });
  });

  //  Arrays / Iterables
  describe("Arrays / Iterables", () => {
    const list = ["Alice", "Bob", "Charlie"];
    const set = new Set(list);

    test("toContain in array & set (PASS)", () => {
      expect(list).toContain("Bob");
      expect(set).toContain("Alice");
    });

    test("not.toContain (INTENTIONAL FAIL)", () => {
      expect(list).not.toContain("Charlie"); 
    });
  });

  //  Exceptions
  describe("Exceptions", () => {
    test("parseJSON invalid should throw (PASS)", () => {
      expect(() => utils.parseJSON("invalid")).toThrow();
    });

    test("parseJSON no arg should throw specific message (PASS)", () => {
      expect(() => utils.parseJSON()).toThrow("No JSON string provided");
    });

    test("valid JSON should not throw (INTENTIONAL FAIL)", () => {
      expect(() => utils.parseJSON('{"name":"A"}')).toThrow(); 
    });
  });
});
