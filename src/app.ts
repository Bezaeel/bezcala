import BigNumber from "bignumber.js";
import fs from "fs";
import os from "os";


function Calculate() {
  // read from .env
  let value = getEnvValue();
  if(value === undefined) {
    process.exit(-1);
  }
  
  // calc value
  let peccalaValue = new BigNumber(value!);
  let newValue = (peccalaValue.times(2).plus(1.5)).dividedBy(7.5).toPrecision(18);
  Log(value, newValue);
  setEnvValue(newValue);
}

// write to log file
function Log(oldValue: string, newValue: string) {
  let message = `${oldValue}, ${newValue}, ${new Date().toISOString()} \r\n`;
  fs.appendFileSync("./logs/logs.csv", message);
}

// write value to env
function setEnvValue(value: string) {
  const envVariables = fs.readFileSync("./.env", "utf8").split(os.EOL);
  const ind = envVariables.findIndex((x) => {
    return x.match(new RegExp("peccalaValue"));
  });
  envVariables.splice(ind, 1, `${"peccalaValue"}=${value}`);
  fs.writeFileSync("./.env", envVariables.join(os.EOL));
}

// get value from env
function getEnvValue() {
  const envVariables = fs.readFileSync("./.env", "utf8").split(os.EOL);
  let x = envVariables.find((x) => x.match(new RegExp("peccalaValue")));
  let valueFromENV = x?.split('=')[1];
  return valueFromENV;
}


// code to run every 2 mins
setInterval(() => {
  Calculate();
}, (2000 * 60));