import BigNumber from "bignumber.js";
import fs from "fs";
import os from "os";



console.log("ask Talabi..");
let count = 0;


function Calculate() {
  // read from .env
  let x = getEnvValue();

  if(x === undefined) {
    process.exit(-1);
  }
  
  // calc value
  let peccalaValue = new BigNumber(x!);
  let y = (peccalaValue.times(2).plus(1.5)).dividedBy(7.5).toPrecision(18);
  Log(x, y);
  setEnvValue(y);
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
  let y = x?.split('=')[1];
  console.log("y::::", y);
  return y;
}


// code to run every 2 mins
setInterval(() => {
  console.log(count++);
  Calculate();
}, (2000 * 60));