
var cards = ["1.jpeg","2.jpeg",
"3.jpeg","4.jpeg","5.png","6.jpeg","7.jpeg","8.jpeg","9.jpeg"];
var timer = 0;
var board = [];
var score = 0;
var time = 50;

 function startTimer(timeLeft) {
      if (timeLeft > 0) {

        console.log(timeLeft);
        document.querySelector(".timebox").innerHTML = "<b>TIME:</b> " + timeLeft;

      timer =  setTimeout (function() {startTimer(timeLeft-1); }, 1000);
       }
       else
       {
       	document.querySelector(".timebox").innerHTML = "GAME OVER !!!"
       	console.log("game-over");
       	setTimeout (function() {
       	reset1();
       },5000)
       }
  
       }
     


function reset1()
{
	document.body.innerHTML= "";	
	board = cards.concat(cards);
	score = 0;
for(var i = 0; i < board.length * 2; i++)
{
var temp = 0;
var rand = Math.floor(Math.random() * board.length);
var rand1 = Math.floor(Math.random() * board.length);
 temp = board[rand];
 board[rand] = board[rand1];
 board[rand1] = temp;
}
window.clearTimeout(timer);
makeGrid(board);
makeClickable();



//console.log(board);
};

function reset2()
{
	board = [];
	for(var j = 0; j<cards.length/2; j++)
	{
		board.push(cards[j]);
	}
	board = board.concat(board);
	//console.log(cards);
	score = 0;
for(var i = 0; i < board.length * 2; i++)
{
var temp = 0;
var rand = Math.floor(Math.random() * board.length);
var rand1 = Math.floor(Math.random() * board.length);
 temp = board[rand];
 board[rand] = board[rand1];
 board[rand1] = temp;
}
window.clearTimeout(timer);
//console.log(board);
};



var clicked = 0;
var prev = 0;
var current = 0;
var pair = 0;

var makeGrid = function(set) {

var bod = document.querySelector("inner");

for (var i =0; i<set.length; i++)
{	
		var square = document.createElement("div");
		square.style.width = "15%";
		square.style.height = "120px";
		square.style.border = "2px dotted darkblue";
		square.style.background = "green";
		square.className = set[i];
		square.style.float = "left";
		document.body.appendChild(square);	 
}
var scorebox = document.createElement("box");
scorebox.style.width = "10%";
		scorebox.style.height = "60px";
		scorebox.style.border = "2px dotted black";
		scorebox.style.float = "left";
		scorebox.className = "scorebox";
document.body.appendChild(scorebox);


var timebox = document.createElement("box");
timebox.style.width = "10%";
		timebox.style.height = "60px";
		timebox.style.border = "2px dotted black";
		timebox.style.float = "left";
		timebox.className = "timebox";
document.body.appendChild(timebox);

var reset = document.createElement("button");
reset.style.width = "10%";
		reset.style.height = "30px";
		reset.style.border = "2px dotted black";
		reset.style.float = "left";
		reset.className = "reset";
		reset.innerHTML = "reset";
document.body.appendChild(reset);

var difficulty = document.createElement("button");
difficulty.style.width = "10%";
		difficulty.style.height = "30px";
		difficulty.style.border = "2px dotted black";
		difficulty.style.float = "left";
		difficulty.className = "easier";
		difficulty.innerHTML = "easier";
document.body.appendChild(difficulty);

reset.addEventListener("mousedown", function(){
			 location.reload();	
	// 		document.body.innerHTML= "";	
	// reset1();


	})

difficulty.addEventListener("mousedown", function(){
			// location.reload();	
			document.body.innerHTML= "";	
	reset2();
makeGrid(board);
makeClickable();

	})
}



var makeClickable = function() {
	startTimer(time);
var grid = document.querySelectorAll("div");
	for(var i = 0; i < grid.length; i++)
	{
		grid[i].addEventListener("mousedown", function(){

		if(clicked === 1 && this.id !== 'done' && this.id !== 'pair')
		{

			this.style.background = "";
			this.style.backgroundImage =  'url(images/' + this.className + ')';
			this.style.backgroundSize = 'contain';
			this.style.backgroundPosition = 'center';
			this.style.backgroundRepeat = 'no-repeat';

			if(pair < 2)
			{
			//this.style.background = "blue";

			this.id = "pair";
			current = this.className;
			clicked = 0;
			pair = 2;
			console.log("previous: " + prev + " \n current: " + current);
			if(prev === current)
			{
				setTimeout(function() 
		{
				console.log('match');
				var pairs = document.querySelectorAll("#pair");
			// pairs[0].style.background = "black";
			// pairs[1].style.background = "black";
			pairs[0].id = "done";
			pairs[1].id = "done";
			pair = 0;
			score += 1;

			document.querySelector(".scorebox").innerHTML = "SCORE: " + score;
			if(score === board.length/2)
			{
			document.querySelector(".scorebox").innerHTML = "Congrats you won!";
				window.clearTimeout(timer);
			}
			console.log(score);
			}, 500);
		}}

		if(prev !== current)
		{

		setTimeout(function() 
		{ var pairs = document.querySelectorAll("#pair");
			pairs[0].style.background = "green";
			pairs[1].style.background = "green";
			pairs[0].id = "";
			pairs[1].id = "";
			pairs[0].innerHTML = "";
			pairs[1].innerHTML = "";
			pair = 0;
		},
		 500);

		}}


		else if(clicked < 1 && pair < 1 && this.id !== 'done' )	
		{
		
		this.style.background = "";
		this.style.backgroundSize = 'contain';

		this.style.backgroundRepeat = 'no-repeat';

		this.style.backgroundImage =  'url(images/' + this.className + ')';
		this.style.backgroundPosition = 'center';
		clicked+=1;

		this.id = "pair";
		prev = this.className;

	    }
		});

	}
}
reset1();

// startTimer(time);