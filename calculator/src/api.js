export const WOLFRAM_APP_ID = "4G6574-RRAP3GYE99";

export const getEquationValue = equation =>
  fetch(`result?appid=${WOLFRAM_APP_ID}&i=${equation}`)
    .then(response => response.status === 200 && response.text())
    .then(data => data);
