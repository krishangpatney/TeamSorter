// A function for creating teams

// make an array of people 
var people = {};


// var numberOfTeams = document.getElementById("numberOfTeams").value;
var numberOfTeams = 2;


function updateTextInput(val) {
    document.getElementById("textInput").innerHTML = val;
}

function addPerson(){
    document.getElementById("players").style.display = "block";
    document.getElementById("team1card").style.display = "none";
    document.getElementById("team2card").style.display = "none";

    var person = document.getElementById('player').value;
    var skill = document.getElementById("textInput").innerHTML;

    if (person != ""){
        people[person] = skill;                
        document.querySelector(".list-group").innerHTML += "<li class=\"list-group-item\">Name : {n} || Skill :  {s}</li>".replace("{n}", (person)).replace("{s}", skill);
        document.getElementById('error').innerHTML = '';
    } else {
        nameError = "Please enter a name";
        document.getElementById("error").innerHTML = nameError; 
    }
    // resits 
    document.getElementById('player').value = '';
}

// Skill Based team selection
function skillSort(){
    var team1 = [];
    var team2 = [];

    const players = [];
    var sortedPlayers = [];

    for (var key in people){
        // key, dict[key]
        person = {"name" : key, "skill" : parseInt(people[key])};
        players.unshift(person);
    }

    // uses this to sort array 
    function compare(a, b) {
        const playerA = a.skill;
        const playerB = b.skill;

        let comparison = 0;
        if (playerA > playerB) {
            comparison = 1;
        } else if (playerA < playerB) {
            comparison = -1;
        }
            return comparison;
    }

    // sort players
    players.sort(compare);
    
    // Create an array of all the players sorted 
    players.forEach((element) => {
        sortedPlayers.push(element.name);
    });

    
    var odd = function (array) {
        for (i=1; i <= array.length-1; i+=2) {

            team1.push(array[i]);
        }
    }
    var even = function (array) {
        for (i=0; i <= array.length-1; i+=2) {

            team2.push(array[i]);
        }
    }

    odd(sortedPlayers);
    
    even(sortedPlayers);
    arr = [team1, team2];
    return arr;
}

// Shuffle Players
function shuffle(array) {
    var i;
    var playerNumbers = array.length;
    copy = [];
    while (playerNumbers){
        i = Math.floor(Math.random() * playerNumbers--);

        copy.push(array.splice(i,1)[0]);
    }
    return copy; 
}

// Splits the array into n arrays 
function splitArray(arr,n){
    var splits = Math.max(arr.length/n ,1);
    var split = [];
    for (var i = 0; i < n; i++) {
        if(splits*(i+1)<=arr.length)split.push(arr.slice(splits*i, splits*(i+1)));
    }
    return split; 
}

// Randomized teams instead of skill based
function randomizedTeam(){

    const players = [];

    // Add people to player array
    for (var key in people){
        // key, dict[key]
        person = {"name" : key, "skill" : parseInt(people[key])};
        players.unshift(person);
    }
    // Add player
    var playerList = [];

    players.forEach((element) => {
        playerList.push(element.name);
    });

    var shuffledPlayers = shuffle(playerList);

    var teams = splitArray(shuffledPlayers,2);

    createTeam(teams[0], teams[1]);

}

function makeTeam(){
    var team = skillSort();
    
    createTeam(team[0],team[1]);

}

// helper function to create two seperate team lists. 
function createTeam(arr1,arr2){
    cleanBoard();
    for (i=0; i <= arr1.length-1; i++) {
        document.getElementById("team1").innerHTML += "<li class=\"list-group-item\">Name : {n} || Skill : {s} </li>".replace("{n}", (arr1[i])).replace("{s}", people[arr1[i]]);
        }

    for (i=0; i <= arr2.length-1; i++) {
        document.getElementById("team2").innerHTML += "<li class=\"list-group-item\">Name : {n} || Skill : {s} </li>".replace("{n}", (arr2[i])).replace("{s}", people[arr2[i]]);
        }

}

function cleanBoard(){
    document.getElementById("team1").innerHTML = "";
    document.getElementById("team2").innerHTML = "";

    document.getElementById("players").style.display = "none";
    document.getElementById("team1card").style.display = "block";
    document.getElementById("team2card").style.display = "block";
}
