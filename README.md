# Splitwise: Minimize Cash Flow Algorithm
<q>Minimize Cash Flow among a given set of friends who have borrowed money from each other.</q> <br>
Given a number of friends who have to give or take some amount of money from one another. Design an algorithm by which the total cash flow among all the friends is minimized. 

### Approach :
Greedy.
Settle the debts of the people with Max and Min. Credits.

### Data Structure Used :

1. Array : To storr the final outputs.
2. Map : To store and get remaining individual transaction amounts in O(1) time complexity.

### Implementation :
<pre>
npm install splitwise-js-map
</pre>
<pre>
const Splitwise = require('splitwise-js-map');

var input = [    
    {   
      'paidBy': 'Srikant',  
      'paidFor': { 'Sakshi': 300, 'Tiwari': 40, 'Rashmika': 30 } 
    },
    {   
      'paidBy': 'Sakshi',  
      'paidFor': { 'Rashmika': 50 } 
    }	
  ]

const splits = Splitwise(input);
console.log(splits);
</pre>
Output:
<pre>
[
  'Sakshi owes Srikant 250',
  'Rashmika owes Srikant 80',
  'Tiwari owes Srikant 40'
]
</pre>

### Updates :
Feel free to submit PRs for any improvements that you find.

## !! HAPPY CODING !!