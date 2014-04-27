
var fs = require('fs');
var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var high = 100;
var low = 1;
var guess = function guessNumber(answer, item, call_me, tries){
      process.stdout.write("You guess --> " + answer + "\n");
	  var middle = Math.floor((low + high)/2);

	   if(answer == item){
            process.stdout.write("\nCongratsss! you guess correctly!!\n");
			process.exit();
			return;
        }
	  if(middle != item && low < high){
		if(item < middle){
			 high = middle - 1;
		}else if(item > middle){
			low = middle + 1;
		}	
		middle = Math.floor((low + high) / 2);
		if(answer < low || answer > high)
			process.stdout.write('cold!');
		else	
			process.stdout.write('warm!');
	  }
      if(((high - low == 2) && (answer== low || answer ==  high)) || tries == 10)
	  {
            process.stdout.write("You lost! :( "+ tries + " tries\n");
            process.stdout.write("The number was " +(high - 1) + "\n");
			return;
            process.exit();
      }
	  
	  process.stdout.write('(The number is between ' +low + "-" + high + "-try #" + tries + ")" + "\nEnter again: ");
	  call_me(tries + 1);
}

fs.readFile('file.txt', 'utf8', function read(err, data){
	if(err){
		return;
	}
	var call_me = function (c) {
		rl.question("Guess the first number:  ", function (answer) {
				guess(answer, items[0], call_me, c);
		});
	};
	var content = data.trim();
	var items = content.split(",");
    call_me(1);
});
