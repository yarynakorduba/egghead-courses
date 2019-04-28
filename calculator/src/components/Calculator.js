import React from "react";
import { compose, withHandlers, withStateHandlers } from "recompose";
import {checkWhetherInputIsSimpleEquation, solveWithExternalTool, whitespaceStripper, solveWithJS} from "../helpers";

const Calculator = ({
  setInputValue,
  inputValue,
  setEquation,
  equation,
  result
}) => (
  <form onSubmit={setEquation}>
    MyCalculator
    <input
      type={"text"}
      name={"equation"}
      value={inputValue}
      onChange={setInputValue}
    />
    <div>{result}</div>
  </form>
);

const enhancer = compose(
  withStateHandlers(
    {
      inputValue: "1",
      result: undefined
    },
    {
      setInputValue: () => ev => {
        ev.preventDefault();
        return { inputValue: whitespaceStripper(ev.target.value) };
      },
      setResult: () => result => ({ result })
    }
  ),
  withHandlers({
    setEquation: ({ inputValue, setResult }) => ev => {
      ev.preventDefault();
      if (!checkWhetherInputIsSimpleEquation(inputValue)) {
        console.log("wolfram");
        return solveWithExternalTool(inputValue).then(
          res => console.log(res) || setResult(res)
        );
      } else {
        console.log("simple", inputValue);
        return setResult(solveWithJS(inputValue));
      }
    }
  })
);

export default enhancer(Calculator);
