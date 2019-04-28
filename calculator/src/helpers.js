import { getEquationValue } from "./api";

export const whitespaceStripper = data => data.replace(/ /g, "");
export const checkWhetherInputIsSimpleEquation = data =>
  data.match(/^(-?[0-9.]+[/*%+-]?)/) &&
  data === data.match(/^(-?[0-9.]+[/*%+-]?)+/)[0];

export const solveWithJS = equation => eval(equation);
export const solveWithExternalTool = async equation =>
  await getEquationValue(equation);
