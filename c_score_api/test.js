formatOver = (current, value) => {
  const whole = current.toString().split(".")[0];
  let decimal = current.toString().split(".")[1];

  if (decimal === undefined) decimal = 0;

  const totalBalls = parseInt(whole) * 6 + parseInt(decimal) + value;
  console.log(totalBalls);

  const quotient = Math.floor(totalBalls / 6);
  const remainder = totalBalls % 6;

  console.log(quotient, remainder);

  const overs = quotient + remainder / 10;

  console.log(overs);

  return overs;
};

formatOver(1, 1);
