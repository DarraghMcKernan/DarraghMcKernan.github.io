const canvas = document.getElementById("the_canvas")
const context = canvas.getContext("2d");

const speed = 4;//used to define the players speed

let image = new Image();
image.src = "assets/img/calcifer.png";

let nefario = new Image();
nefario.src = "assets/img/Nefario.png";

let collectable = new Image();
collectable.src = "assets/img/burger.gif";

let tempX;
let tempY;

let word = "Test";

var currentHP = 10;

var currentScore = 0;


let yellowButton = document.getElementsByClassName("yellow")[0];
let blueButton = document.getElementsByClassName("blue")[0];
let redButton = document.getElementsByClassName("red")[0];
let greenButton = document.getElementsByClassName("green")[0];


// GameObject holds positional information
// Can be used to hold other information based on requirements
function GameObject(spritesheet, x, y, width, height) {
    this.spritesheet = spritesheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

// Default Player
let player = new GameObject(image, 0, 0, 200, 200);

let enemy = new GameObject(nefario,0,0,100,100);
enemy.x = 450;
enemy.y = 350;

let pickUp = new GameObject(collectable,0,0,100,100);

pickUp.x = 850;

// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down, MouseClicks)
function GamerInput(input) {
    this.action = input; // Hold the current input as a string
}

// Default GamerInput is set to None
let gamerInput = new GamerInput("None"); //No Input



function input(event) {
    if (event.type === "keydown") {
        if(event.keyCode == 37)
        {
            gamerInput = new GamerInput("Left");
        }
        if(event.keyCode == 38)
        {
            gamerInput = new GamerInput("Up");
        }
        if(event.keyCode == 39)
        {
            gamerInput = new GamerInput("Right");
        }
        if(event.keyCode == 40)
        {
            gamerInput = new GamerInput("Down");
        }
        if(event.keyCode == 32)//space randomises the players position
        {
            player.x = getRandomInt(0,900);//randomises the x axis
            player.y = getRandomInt(300,0);//randomises the y axis
        }
        if(event.keyCode == 82)
        {
            canvas.style.backgroundColor = 'rgba(' + getRandomInt(0,255) + ',' + getRandomInt(0,255) + ',' + getRandomInt(0,255) + '\)';//randomises the background color
        }
        if(event.keyCode == 16)
        {
            playAudio();//calls the audio function
        }
    }
    else {
    	gamerInput = new GamerInput("None");
    }

    if (event.type === "keydown") {
        switch (event.keyCode) {
            case 37: // Left Arrow // blue
                gamerInput = new GamerInput("Left");
                blueButton.classList.add("pressed");
                break; //Left key
            case 38: // Up Arrow // yellow
                yellowButton.classList.add("pressed");
                gamerInput = new GamerInput("Up");
                break; //Up key
            case 39: // Right Arrow // red
                redButton.classList.add("pressed");    
                gamerInput = new GamerInput("Right");
                break; //Right key
            case 40: // Down Arrow // green
                greenButton.classList.add("pressed");
                gamerInput = new GamerInput("Down");
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        //gamerInput = new GamerInput("None");
        redButton.classList.remove("pressed");
        blueButton.classList.remove("pressed");
        yellowButton.classList.remove("pressed");
        greenButton.classList.remove("pressed");
    }
}

function clickableDpadReleased() {
    gamerInput = new GamerInput("None"); //No Input
}
function clickDpadYellow(){
    gamerInput = new GamerInput("Up"); //No Input

}
function clickDpadBlue(){
    gamerInput = new GamerInput("Left"); //No Input
}
function clickDpadRed(){
    gamerInput = new GamerInput("Right"); //No Input
}
function clickDpadGreen(){
    gamerInput = new GamerInput("Down"); //No Input
}

function getRandomInt(min, max) //simple randomiser that takes in minimum and maximum values
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function update() {
    // console.log("Update");
    // Check Input

    
    if (gamerInput.action === "Up") {
        console.log("Move Up");
        player.y -= speed; // Move Player Up
        if(player.y <= -20)
        {
            player.y = -20;
        }
    }
    if (gamerInput.action === "Down") {
        console.log("Move Down");
        player.y += speed; // Move Player Down
        if(player.y >= 320)
        {
            player.y = 320;
        }
    }
    if (gamerInput.action === "Left") {
        console.log("Move Left");
        player.x -= speed; // Move Player Left
        if(player.x <= -40)
        {
            player.x = -40;
        }
    }
    if (gamerInput.action === "Right") {
        console.log("Move Right");
        player.x += speed; // Move Player Right
        if(player.x >= 940)
        {
            player.x = 940;
        }
    }

    enemy.x += 5;
    if(enemy.x >= 1100)
    {
        enemy.x = -100;
    }

    if(pickUp.x + 50> player.x && pickUp.x +50< (player.x + player.width))//collision detection
    {
        if(pickUp.y +50> player.y && pickUp.y + 50 < (player.y + player.height))
        {
            pickUp.x = getRandomInt(0,900);//randomises the x axis
            pickUp.y = getRandomInt(300,0);//randomises the y axis
            currentHP += 10;
        }
    }
    
}

function playAudio()
{
    let bell = new Audio('assets/media/bell.mp3')//loads from file
    bell.play();//plays the audio
}

function draw() {
    // Clear Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    //console.log("Draw");
    //console.log(player);
    context.drawImage(player.spritesheet, 
                      player.x,
                      player.y,
                      player.width,
                      player.height);
    context.drawImage(enemy.spritesheet, 
        enemy.x,
                        enemy.y,
                        enemy.width,
                        enemy.height);
    context.drawImage(pickUp.spritesheet,pickUp.x,pickUp.y,pickUp.width,pickUp.height);

    drawHealthbar();
}

function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);//calls the request animation frame
}

// sets an interval to change the time every second
setInterval(timeDisplay, 1000);//calls the function every second

function timeDisplay() 
    {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let date = time.getDate();
    let month = time.getMonth()+1;
    let year = time.getFullYear();
    let day = time.getDay();

    let today;

    if(day == 0)
    {
        today = "Sunday";
    }
    if(day == 1)
    {
        today = "Monday";
    }
    if(day == 2)
    {
        today = "Tuesday";
    }
    if(day == 3)
    {
        today = "Wednesday";
    }
    if(day == 4)
    {
        today = "Thursday";
    }
    if(day == 5)
    {
        today = "Friday";
    }
    if(day == 6)
    {
        today = "Saturday";
    }

    hours = hours < 10 ? "0" + hours : hours;//if its 8 set it to 08 - must be below 10
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    date = date < 10 ? "0" + date : date;
    month = month < 10 ? "0" + month : month;

    let currentTime = hours + ":"+ minutes + ":" + seconds;

    let currentDate = today + " " + date + "/" + month + "/" + year;

    document.getElementById("date").innerHTML = currentDate;//changes the text to be the new time
    document.getElementById("timer").innerHTML = currentTime;
}

function drawHealthbar() {
    var width = 200;
    var height = 20;
    var max = 100;
  
    // Draw the background
    context.fillStyle = "#000000";
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, width, height);
  
    // Draw the fill
    context.fillStyle = "#00FF00";
    var fillVal = Math.min(Math.max(currentHP / max, 0), 1);
    context.fillRect(0, 0, fillVal * width, height);
}
  
drawHealthbar();

timeDisplay();


// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);//calls the game loop after a frame has passed and in doing so creates 
//our gameloop that can run update and draw once every frame

// https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

window.addEventListener('keydown', input);
// disable the second event listener if you want continuous movement
window.addEventListener('keyup', input);