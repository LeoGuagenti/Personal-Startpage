//vlad the impaler discovers arrow functions
var $ = (id) => document.getElementById(id);

//gets any notes saved in local storage
getNotes();
getTodoList();

var card = document.getElementsByClassName("card");
card.onclick = function(e){this.parentNode.removeChild(this)};

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayEndings = ['','st','nd','rd','th','th','th','th','th','th','th','th','th','th','th','th','th','th','th','th','th','st','nd','rd','th','th','th','th','th','th','th','st'];

//number based clock --------------------------------------------------------------------
var hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

//word based clock ----------------------------------------------------------------------
var hoursWord = ['Twelve','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven'];
var numbersWords = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Ninteen','Twenty','Twenty-One','Twenty-Two','Twenty-Three','Twenty-Four','Twenty-Five','Twenty-Six','Twenty-Seven','Twenty-Eight','Twenty-Nine','Thirty','Thirty-One','Thirty-Two','Thirty-Three','Thirty-Four','Thirty-Five','Thirty-Six','Thirty-Seven','Thirty-Eight','Thirty-Nine','Forty','Forty-One','Forty-Two','Forty-Three','Forty-Four','Forty-Five','Forty-Six','Forty-Seven','Forty-Eight','Forty-Nine','Fifty','Fifty-One','Fifty-Two','Fifty-Three','Fifty-Four','Fifty-Five','Fifty-Six','Fifty-Seven','Fifty-Eight','Fifty-Nine',];

//sets default theme to dark
var isDarkTheme = true;
setTheme();

//choses appropriate theme based on 'isDarkTheme' value
function setTheme(){
	if(isDarkTheme == true){
		$('pageStyle').setAttribute("href", "style-dark.css");
		isDarkTheme = false;
	}else{
		$('pageStyle').setAttribute("href", "style-light.css");
		isDarkTheme = true;
	}
}

// all keyboard functionality
document.onkeyup = function(e){
	if(e.key == 'Enter' && $('search') === document.activeElement){
		handleEntry();
	}else if(e.key == 'Enter' && $('todo-bar') === document.activeElement){
		addItem();
	}else if(e.key == 'ArrowUp'){
		alert($('item-holder').innerHTML);
	}
}

//list of web search options
var searchTypes = [
//format: command suffix, search link, search placeholder (command suffixes need to be 3 characters or less)
	['g', 	'https://www.google.com/#q=', 														'Google Search'],
	['yt', 	'https://www.youtube.com/results?search_query=',									'YouTube Search'],
	['img', 'https://www.google.com/search?tbm=isch&q=',										'Google Image Search'],
	['a', 	'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=',	'Amazon Search'],
	['wik', 'https://en.wikipedia.org/wiki/',													'Wikipedia Search'],
	['4', 	'http://4chan.org/',																'4chan Board Search'],
	['ddg', 'https://duckduckgo.com/?q=', 														'DuckDuckGo Search'],
	['b',	'https://www.bing.com/search?q=',													'Bing Search'],
	['y',	'https://search.yahoo.com/search?p=',												'Yahoo Search'],
	['cpp',	'http://www.cplusplus.com/search.do?q=',											'C++ Reference Search'],
	['so',	'https://stackoverflow.com/search?q=',												'Stack Overflow Search'],
	['git',	'https://github.com/',																'Github User Search'],
	['pb',	'https://thepiratebay3.org/index.php?q=',											'Pirate Bay Search']
];

//list of not web commands
var otherCommands = [
//format: command suffix, js function, breif description
	['help', 	openHelp, 		'Opens help menu'],
	['todo', 	openTodo, 		'Opens to-do List'],
	['notes', 	openNotes, 		'Opens notes'],
	['home',	openLinks, 		'Opens shortcuts'],
	['links',	openLinks, 		'Opens shortcuts'],
	['time', 	openTime,		'Shows current time'],
	['code',	openCodeRef,	'Opens code reference'],
	['note s',	saveNotes,		'Saves notes'],
	['todo s',	saveTodoList,	'Save todo list'],
	['note c',	clearNotes,		'Clears notes'],
	['todo c',	clearTodo,		'Clears todo list'],
];

//sets command prefix (thing that signals for start of command)
var commandPrefix = '-';

//sets defualt search engine to (((google)))
var currentSearchType = searchTypes[0][1];

//determines if input is command or not, and acts accordingly
function handleEntry(){
	var userInput = $('search').value;
	if(userInput.charAt(0) == commandPrefix){
		getFunction();
	}else{
		var query = $('search').value;
		window.location = currentSearchType + query;
	}
}

//searchs through command lists to determine if command suffix is valid
function getFunction(){
	var commandSuffix = $('search').value.substring(1).trim();
	if(commandSuffix.length < 4){
		//loop through search engines
		for(var i = 0; i <= searchTypes.length; i++){
			if(commandSuffix == searchTypes[i][0]){
				currentSearchType = searchTypes[i][1];
				$('search').placeholder = searchTypes[i][2];
				$('search').value = "";
				break;
			}
		}
	}else{
		//loop through internal functions
		for(var j = 0; j <= otherCommands.length; j++){
			if(commandSuffix == otherCommands[j][0]){
				$('search').value = "";
				otherCommands[j][1]();
				break;
			}
		}
	}
}
	
//random assortment of variables (being lazy)
var time = $('date-time');
var links = $('links');
var todo = $('todo-list');
var notes = $('notes');
var help = $('help');
var code = $('code-references');

buildHelp(); 

//loops through all of the commands and formats them to a readable format
function buildHelp(){
	var rightHelp = $('help-right');
	
	rightHelp.innerHTML = "Command Prefix: ' " + commandPrefix + " '<br><br><u>Search Engines</u><br>";
	var previousContent = rightHelp.innerHTML;	
	for(var y = 0; y < searchTypes.length; y++){
		previousContent = rightHelp.innerHTML;
		rightHelp.innerHTML = previousContent + searchTypes[y][0] + ": " + searchTypes[y][2] + "<br>";
	}
	
	var leftHelp = $('help-left');
	leftHelp.innerHTML = "<br><br><u>Internal Commands</u><br>"
	for(var k = 0; k < otherCommands.length; k++){
		previousContent = leftHelp.innerHTML;
		leftHelp.innerHTML = previousContent + otherCommands[k][0] + ": " + otherCommands[k][2] + "<br>";
	}
}

getDateAndTime();

//updates the date and time every second
setInterval(getDateAndTime, 1000);

//gets and displays current time in either words or numbers
function getDateAndTime(){
	var d = new Date();
	$('time-area').innerHTML = hoursWord[d.getHours()] + " " + 
													 addZeroWord(d.getMinutes());
													 
	//$('time-area').innerHTML = hours[d.getHours()] + ":" + 
	//												 addZero(d.getMinutes()) + getTimeOfDay();
													
	$('date-area').innerHTML = days[d.getDay()] + ", " + 
													 months[d.getMonth()] + " " + 
													 d.getDate() + dayEndings[d.getDate()];
} 

//fixes minute display to be something more readable
function addZero(number){
	if(number < 10){
		number = "0" + number;
	}
	return number;
}
function addZeroWord(number){
	if(number == 0){
		return "o'clock";
	}else if(number < 10){
		return "o'" + numbersWords[number];
	}else{
		return numbersWords[number];
	}
}
function getTimeOfDay(){
	var d = new Date();
	if(d.getHours() >= 12){
		return "pm";
	}else{
		return "am";
	}
}

// Local Storage ------------------------------------------------------------------------
//notes save / retrieve
function saveNotes(){
	var noteInfo = $('note-container').value;
				
	localStorage.setItem('note' , noteInfo);
}	
function getNotes(){
	var note = localStorage.getItem('note');
	$('note-container').value = note;
}
function clearNotes(){
	$('note-container').value = "";
	var noteInfo = $('note-container').value;
				
	localStorage.setItem('note' , noteInfo);
}

//todo list save / retrieve ------------
function saveTodoList(){
	var todoList = $('item-holder').innerHTML;
	localStorage.setItem('todoList', todoList);
}
function getTodoList(){
	var todoList = localStorage.getItem('todoList');
	$('item-holder').innerHTML = todoList;
}
function clearTodo(){
	$('item-holder').innerHTML = "";
	var todoList = $('item-holder').innerHTML;
	
	localStorage.setItem('todoList', todoList);
}

// Tedious functions to display panels
function openHelp(){
	time.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	links.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	todo.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	notes.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	code.setAttribute('style', 'height: 0%; visibility: visible; opacity: 0;');
	help.setAttribute('style', 'height: 100%; visibility: visible; opacity: 1;');
}
function openTodo(){
	time.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	links.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	help.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	notes.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	code.setAttribute('style', 'height: 0%; visibility: visible; opacity: 0;');
	todo.setAttribute('style', 'height: 100%; visibility: visible; opacity: 1;');
}
function openNotes(){
	time.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	links.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	todo.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	help.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	code.setAttribute('style', 'height: 0%; visibility: visible; opacity: 0;');
	notes.setAttribute('style', 'height: 100%; visibility: visible; opacity: 1;');
}
function openLinks(){
	time.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	help.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	todo.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	notes.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	code.setAttribute('style', 'height: 0%; visibility: visible; opacity: 0;');
	links.setAttribute('style', 'height: 100%; visibility: visible; opacity: 1;');
}
function openTime(){
	help.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	links.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	todo.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	notes.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	code.setAttribute('style', 'height: 0%; visibility: visible; opacity: 0;');
	time.setAttribute('style', 'height: 100%; visibility: visible; opacity: 1;');
}


function openCodeRef(){
	help.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	links.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	todo.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	notes.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	time.setAttribute('style', 'height: 0; visibility: hidden; opacity: 0;');
	code.setAttribute('style', 'height: 100%; visibility: visible; opacity: 1;');
}
// todo functionality -------------------------------------------------------------------
function addItem(){
	var itemValue = $('todo-bar').value;
	if(itemValue != ""){
		var d = new Date();		
		
		var card = document.createElement("div");
		card.className = "card";
		var node = document.createTextNode(itemValue + "\u00A0\u00A0\u00A0 | \u00A0\u00A0\u00A0" + months[d.getMonth()] + " " + d.getDate() + dayEndings[d.getDate()] + ", " + hours[d.getHours()] + ":" + addZero(d.getMinutes()) + getTimeOfDay());
		card.appendChild(node);
		card.onclick = function(e){this.parentNode.removeChild(this)};
						
		$('item-holder').prepend(card);
		$('todo-bar').value = "";
	}
}