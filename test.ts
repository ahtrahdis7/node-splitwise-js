import {checkBalance, SplitwiseInputItem} from "./test_utils";

// @ts-ignore
const Splitwise = require('./index');

let splits;

let input: SplitwiseInputItem[] = [
    {
      'paidBy': 'A',
      'paidFor': { 'B': 300, 'C': 40, 'D': 30 }
    },
    {
      'paidBy': 'B',
      'paidFor': { 'A': 50, 'B': 100, 'C': 200 }
    }
];
splits = Splitwise(input);
checkBalance(splits, input);
console.log(splits);


input = [
    {
        "paidBy": "A",
        "paidFor": {
            "B": 14.26,
            "C": 14.26,
            "D": 14.26
        }
    },
    {
        "paidBy": "B",
        "paidFor": {
            "C": 7,
            "D": 7
        }
    }
];
splits = Splitwise(input);
checkBalance(splits, input);
console.log(splits);