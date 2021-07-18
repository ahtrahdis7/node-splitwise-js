const Splitwise = require('./index');

var input = [    
    {   
      'paidBy': 'A',  
      'paidFor': { 'B': 300, 'C': 40, 'D': 30 } 
    },
    {   
      'paidBy': 'B',  
      'paidFor': { 'A': 50, 'B': 100, 'C': 200 } 
    }	
  ]

const splits = Splitwise(input);
console.log(splits);