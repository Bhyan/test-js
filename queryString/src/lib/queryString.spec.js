import { queryString, parse } from "./queryString.js";

describe("Object to query string", () => {
  it("should create a valid query string when an object is provided", () => {
    const obj = {
      name: "Bryan",
      profession: "developer",
    };

    expect(queryString(obj)).toBe("name=Bryan&profession=developer");
  });

  it("should create a valid query string even when an array is passed as value", () => {
    const obj = {
      name: "Bryan",
      abilitites: ["JS", "TDD"],
    };

    expect(queryString(obj)).toBe("name=Bryan&abilitites=JS,TDD");
  });

  it("should throw an error when an object is passed as value", () => {
    const obj = {
      name: "Bryan",
      abilitites: {
        first: "JS",
        second: "TDD",
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe("Query string to object", () => {
  it("should convert a query string to object", () => {
    const obj = {
      name: "Bryan",
      profession: "developer",
    };

    const qs = "name=Bryan&profession=developer";

    expect(parse(qs)).toEqual(obj);
  });

  it("should convert a query string of a single key-value pair to object", () => {
    const obj = {
      name: "Bryan",
    };

    const qs = "name=Bryan";

    expect(parse(qs)).toEqual(obj);
  });

  it("should convert a query string to an object taking care of comma separated values", () => {
    const qs = "name=Bryan&abilitites=JS,TDD";

    expect(parse(qs)).toEqual({
      name: "Bryan",
      abilitites: ["JS", "TDD"],
    });
  });
});
