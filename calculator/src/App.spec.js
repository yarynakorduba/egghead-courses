import { expect } from "chai";
import { describe } from "mocha";
import { fn, mock } from "jest";
import {
  checkWhetherInputIsSimpleEquation,
  solveWithJS,
  stripWhitespacesFromString
} from "./helpers";

describe("Whitespaces stripper", function() {
  it("strips whitespaces properly", function() {
    expect(stripWhitespacesFromString("   12 + 3  ")).to.equal("12+3");
  });
  it("leaves string unchanged", function() {
    expect(stripWhitespacesFromString("12+3")).to.equal("12+3");
  });
});

describe("Equation simplicity checker", function() {
  it("returns true for one number", function() {
    expect(checkWhetherInputIsSimpleEquation("12")).to.equal(true);
  });
  it("returns true for addition", function() {
    expect(checkWhetherInputIsSimpleEquation("1+2")).to.equal(true);
  });
  it("returns true for substraction", function() {
    expect(checkWhetherInputIsSimpleEquation("1-2")).to.equal(true);
  });
  it("returns true for division", function() {
    expect(checkWhetherInputIsSimpleEquation("1/2")).to.equal(true);
  });
  it("returns true for multiplication", function() {
    expect(checkWhetherInputIsSimpleEquation("1*2")).to.equal(true);
  });
  it("returns true for multiple simple operations", function() {
    expect(checkWhetherInputIsSimpleEquation("1-2/2+2")).to.equal(true);
  });
  it("returns false for number in degree", function() {
    expect(checkWhetherInputIsSimpleEquation("1^2")).to.equal(false);
  });
  it("returns false for string with a character", function() {
    expect(checkWhetherInputIsSimpleEquation("1 + a + 2")).to.equal(false);
  });
  it("returns false for number factorial", function() {
    expect(checkWhetherInputIsSimpleEquation("12!")).to.equal(false);
  });
});

describe("Solve simple equation", function() {
  it("adds numbers properly", function() {
    expect(solveWithJS("1+2")).to.equal(3);
  });
  it("substracts properly", function() {
    expect(solveWithJS("12-3")).to.equal(9);
  });
  it("divides properly", function() {
    expect(solveWithJS("12/3")).to.equal(4);
  });
  it("multiplies properly", function() {
    expect(solveWithJS("12*3")).to.equal(36);
  });
  it("computes multiple simple operations properly", function() {
    expect(solveWithJS("12+3/3")).to.equal(13);
  });
  it("does nothing", function() {
    expect(solveWithJS("12")).to.equal(12);
  });
  it("returns infinity for zero division", function() {
    expect(solveWithJS("12/0")).to.equal(Infinity);
  });
});



