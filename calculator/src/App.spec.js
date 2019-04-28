import { expect } from "chai";
import { describe } from "mocha";
import { whitespaceStripper } from "./helpers";

describe("Whitespaces", function() {
  it("strips whitespaces properly", function() {
    expect(whitespaceStripper("   12 + 3  ")).to.equal("12+3");
  });
});
