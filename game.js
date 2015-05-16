var cards = ["q","r",
"c","d","e","f","g"];

var board = cards.concat(cards);

for(var i = 0; i < board.length * 2; i++)
{
var temp = 0;
var rand = Math.floor(Math.random() * board.length);
var rand1 = Math.floor(Math.random() * board.length);
 temp = board[rand];
 board[rand] = board[rand1];
 board[rand1] = temp;
}
console.log(board);

var clicked = 0;
var prev = 0;
var current = 0;
var pair = 0;

var makeGrid = function(set) {
var bod = document.querySelector("body");

for (var i =0; i<set.length; i++)
{	
		var square = document.createElement("div");
		square.style.width = "15%";
		square.style.height = "120px";
		square.style.border = "2px dotted white";
		square.style.background = "green";
		square.className = set[i];
		square.style.float = "left";
		document.body.appendChild(square);	 
}
}

var makeClickable = function() {
var grid = document.querySelectorAll("div");
	for(var i = 0; i < grid.length; i++)
	{
		grid[i].addEventListener("mousedown", function(){

		if(clicked === 1 && this.id !== 'done')
		{

			this.innerHTML =  this.className;
			if(pair < 2)
			{
			this.style.background = "blue";
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
			pairs[0].style.background = "black";
			pairs[1].style.background = "black";
			pairs[0].id = "done";
			pairs[1].id = "done";
			pair = 0;
				
			}, 2000);
		}}

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
		 2000);
		}

		else if(clicked < 2 && pair < 2 && this.id !== 'done' )	
		{
		//console.log(this.className);
		this.style.background = "blue";
		clicked+=1;
        this.innerHTML =  this.className;
		this.id = "pair";
		prev = this.className;
		//console.log(prev);
		//console.log(clicked + " in elseif");
	    }
		});

	}
}

makeGrid(board);
makeClickable();