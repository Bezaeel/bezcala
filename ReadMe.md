# Task Description
- create a NodeJS project that will do the following:
- read a value float/double value (with 18 decimal places) from the env file. i.e peccalaValue= 2.123456789012345678
- apply the following equation: peccalaValue = (peccalaValue * 2 + 1.5)/ 7.5 (result should be 18 decimal places without any rounding.
- update the env file and call this every 2 minutes.
- save the history of peccalaValue in a csv file along with date/time
- Make sure it is exactly running every 2 minutes

# Approach
Understanding that working with large precision point numbers in the JS runtime is tricky, I had to use `bignumber.js` package to work around the trick. 

This package helped me with reading and performing the arithmetic operations on the value.

```
  let peccalaValue = new BigNumber(x!);
  let y = (peccalaValue.times(2).plus(1.5)).dividedBy(7.5).toPrecision(18);
```

I broke down this task into different functions such as
- getEnvValue : read peccalaValue from the .env file
- setEnvValue: update peccalaValue in the .env file
- Log: record before and after peccalaValues alongside date time in csv 

# How to run
Please ensure you have Node runtime installed.

Duplicate `.env_example` file and rename to `.env` also replace `<value>` in file to appropriate figure.

Run `npm run i` then
Run `npm run start`

# Futher Improvement
- since the log file would continue to grow in size, there should be a mechanism to check that the size does not become an issue later on
- automated tests, one requirement is to ensure 18d.p without rounding, we need to check with that.
