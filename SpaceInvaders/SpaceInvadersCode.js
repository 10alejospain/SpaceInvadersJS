//Player
let player;

//Bullets and enemies variables
let bullets = [];
let enemies = [];

//Spawn variables
let sec = Date.now();
let respTime = 3;
let counter = sec + respTime * 1000;

//Score variables
let score = 0;
let scoreText;

//Lives variables
let heart;
let lives = 3;

function setup() {
	let shootspeed = 2;
	let aux;

	createCanvas(800,500);
	player = new Player();
	scoreText = new Score(score);

	heart = loadImage('images/heart.png');
		 
}
function draw(){
	background(51);
	player.show();

	//Debug (Ray between the bullets and the enemies)
	/*for (let j = 0; j < bullets.length; j++) {
		for (let u = 0; u < enemies.length; u++) {
			clear();
			strokeWeight(0.5);
			fill(color(120,0,0));
			line(bullets[j].x,bullets[j].y,enemies[u].x,enemies[u].y);
		}
	}	*/	
	//Text
	scoreText.show(score);

	//Lives
	life(lives);

	//Spawner		
	sec = Date.now();

	if (sec > counter) {
		enemies.push(new Enemy());
		counter = sec + respTime * 1000;
	}


	//Show bullets
	for (var b = 0; b < bullets.length; b++) {
		bullets[b].show();
		bullets[b].move();

		if (bullets[b].y < 0) {
			bullets.splice(0,1);
		}
	}
	// Enemy show
	for (var t = 0 ;t < enemies.length; t++) {
		enemies[t].show();
		enemies[t].move();

		//console.log("Distance: " + enemies[t].y);

		if (enemies[t].y + enemies[t].r - 5 > 500) {
			lives--;
			enemies.splice(0,1);
		}
	}
	
	//Hit detection
	for (let j = 0; j < bullets.length; j++) {
		for (let u = 0; u < enemies.length; u++) {
			//console.log("j: " + j);
			//console.log("number of bullets" + bullets.length);
			//console.log("Current bullet (j)" + bullets[j]);
			if (bullets[j].hit(enemies[u]) == true) {
				
				enemies.splice(u,1);
				//bullets.splice(j);
				score++;
			}
		}
	}

	//Right left movement
	if (keyIsDown(68)) {
		player.move(1);
	}if (keyIsDown(65)){
		player.move(-1);
	}	
	
}
function mouseClicked() {
	//Shot
	if (mouseButton == LEFT) {
		bullets.push(new Bullet(player.x,player.y));
	}

}

function life(v) {

	if (v >= 3) {
		//Lifes 3
		image(heart, width - 50, 7, 50, 50);
		image(heart, width - 104, 7, 50, 50);
		image(heart, width - 154, 7, 50, 50);
	}
	else if (v == 2) {
		//Lifes 2
		image(heart, width - 50, 7, 50, 50);
		image(heart, width - 104, 7, 50, 50);
	}
	else if(v == 1){
		//Lifes 1
		image(heart, width - 50, 7, 50, 50);
	}
	else{
		console.log("U DED mothAfuCka!!");
	}
}
function Player() {
	this.c = color(250,50,0);
	this.x = width/2;
	this.y = height-65;
	this.speed = 3;


	this.show = function() {
		
		fill(51);
		strokeWeight(2);
		stroke(color(0,250,50));
		triangle(this.x-10, height-12, this.x, height-50, this.x+10, height-12);
	}
	this.move = function(dir) {
		if (this.x >= 0 && this.x <= 800) {
			this.x += dir * this.speed;
		}
		else if (this.x <= 0){
			this.x = 799;
		}
		else if(this.x >= 800){
			this.x = 1;
		}		
	}
}
function Bullet(x,y) {
	this.col = color(255,random(200,250),random(70,130));
	this.x = x;
	this.y = y;
	this.w = 5;
	this.h = 10;



	this.show = function() {
		fill(this.col);
		strokeWeight(0);
		rect(this.x,this.y, this.w, this.h, 20);
		
	}
	this.move = function() {
		let speed = 3.5;
		this.y -= speed;	
	}
	this.hit = function (enemy) {
		let dis = dist(this.x,this.y,enemy.x,enemy.y);

		if (dis < enemy.r) {
				return true;
			}else{
				return false;
			}
	}
}
function Enemy() {
	this.x = random(1,799);
	this.y = 0;
	this.r = 20;
	
	this.show = function() {
		
		noFill();
		strokeWeight(2);
		stroke(color(40, 112, 226));
		circle(this.x,this.y,this.r);
	}
	this.move = function() {
		let speed = 0.3;
		this.y += speed;
	}	
}
function Score() {

	this.col = color(255,255,255); 

	this.show = function (s) {
		textSize(32);
		noStroke();
		fill(this.col);
		text(String(s), 400, 30);
	}
}