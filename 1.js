
var fs = require('fs');
var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
	
var guess = function guessNumber(answer, item, call_me){
      console.log("You guess --> :", answer);
        if(answer == item){
            console.log('Congratsss! you guess correctly!!');
        }else{
          if((item - 50) < 0){
              if(answer -50 < 0)
                {
                    console.log('warm!');

                 }else
                 {
                      console.log('cold');
                 }
          }else{
               if(answer - 50 > 0){
                    console.log('warm!');
                }else{
                     console.log('cold!');
                }
         }
        }//end of else  
        rl.close();
		call_me();
}

fs.readFile('file.txt', 'utf8', function read(err, data){
	if(err){
		return console.log(err);
	}
	var call_me = function () {
		rl.question("Guess the first number:  ", function (answer) {
			guess(answer, items[0], call_me);
		});
	};
	var content = data.trim();
	var items = content.split(",");
	for(var i=0; i < items.length; i ++){
	}
	call_me();
});
