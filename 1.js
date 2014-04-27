
var fs = require('fs');
var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var guess = function guessNumber(answer, call_me, state){
      process.stdout.write("You guess --> " + answer + "\n");
	  var middle = Math.floor((state.low + state.high)/2);
	  var item = state.solution[state.answered];
		if(answer == item) {
            process.stdout.write("\nCongratsss! you guess correctly!!\n");
			state.answered++;
            state.high = 100;
            state.low= 0;
			if(state.answered == state.solution.length){
				process.exit();
			}
			return;
        }
		if(middle != item && state.low < state.high){
			if(item < middle){
				 state.high = middle - 1;
			}else if(item > middle){
				state.low = middle + 1;
			}	
			middle = Math.floor((state.low + state.high) / 2);
			item = state.solution[state.answered];

			if(answer < state.low || answer > state.high)
				process.stdout.write('cold!');
			else	
				process.stdout.write('warm!');
	  	}//end of if
      if(((state.high - state.low == 2) && (answer== state.low || answer ==  state.high)) || state.tries[state.answered] == 10)
	  {
            process.stdout.write("You lost! :( "+ state.tries[state.answered] + " tries\n");
            process.stdout.write("The number was " +(item) + "\n");
			state.answered++;
			state.high = 100;
			state.low= 0;
			 if(state.answered == state.solutions.length){
                process.exit();
            }
			return;
      }
	 //Increment tries   
     if(state.tries.length == 0){
              state.tries.push(0);
        }
        state.tries[state.answered]++;
 
	  process.stdout.write('(The number is between ' +state.low + "-" + state.high + "-try #" + state.tries.length + ")" + "\nEnter again: ");
	  call_me.apply(state, null); 
}

fs.readFile('file.txt', 'utf8', function read(err, data){
	var state = {
		'high' : 100,
		'low' : 0, 
		'tries' : [], 
		'answered' : 0,
		'questions': [],
		'solution': []
		
	}
	if(err){
		return;
	}
	var call_me = function () {
		var info = this;
		rl.question("Guess the first number:  ", function (answer) {
				guess(answer, call_me, info);
		});
	};
	var content = data.trim();
	state.solution = content.split(",");
	call_me.apply(state, null); 
});
