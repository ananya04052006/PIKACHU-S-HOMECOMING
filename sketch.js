var bgImg, plrImg, obs1, obs2, obs3, obs4;
var ob1, ob2, ob3, ob4;
var plr, bg, plrJump;
var ground;
var reset, over;
var player, o1, o2, o3, o4;
var score;
var obstaclesGroup, pointIncGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, gameOver;


function preload() {

  bgImg = loadImage("images/bg1.jpg");
  plrImg = loadAnimation("images/p1.png", "images/p2.png");
  obs1 = loadImage("images/obstacle_1.png");
  obs2 = loadImage("images/obstacle_2.png");
  obs3 = loadImage("images/obstacle_3.png");
  obs4 = loadImage("images/obstacle_4.png");
  plrJump = loadImage("images/p2.png");
  ptIncreaser = loadImage("images/coins.png");
  over = loadImage("images/game over.png");
  reset = loadImage("images/reset.png");

}

function setup() {
  createCanvas(displayWidth - 20, displayHeight - 90);

    gameOver = createSprite(displayWidth/2 - 50, displayHeight/2 - 100, 10, 10);
    gameOver.addImage(over);
    gameOver.scale = 0.5;
    restart = createSprite(displayWidth/2 - 50, displayHeight/2, 10, 10);
    restart.addImage(reset);
    restart.scale = 0.2;

    gameOver.visible = false;
    restart.visible = false;

  plr = createSprite(200, 475, 50, 50);
  plr.addAnimation("pikachu", plrImg);
  plr.addAnimation("pikachuu", plrJump);
  plr.scale = 0.5;
  /*ob1 = createSprite(displayWidth + 40, 350, 50, 50);
  ob1.addImage(obs1);
  ob2 = createSprite(displayWidth + 60, 350, 50, 50);
  ob2.addImage(obs2);
  ob3 = createSprite(displayWidth + 200, 350, 50, 50);
  ob3.addImage(obs3);
  ob4 = createSprite(displayWidth + 200, 350, 50, 50);
  ob4.addImage(obs4);*/

  ground = createSprite(displayWidth/2, 523, displayWidth, 5);
  ground.visible = false;

  obstaclesGroup = new Group();
  pointIncGroup = new Group();

  score = 0;
}

function draw() {
  background(bgImg);
  textSize(15);
  fill("black");
  if(gameState === PLAY) {
  
    text("PIKACHU IS LOST AND IS AWAY FROM HIS MASTER, ASH. HE HAS TO PASS A LOT OF OBSTACLES TO REACH HIS MASTER. HELP HIM TO SURVIVE AND MEET ASH.", 30, 50);
    if((touches.length>0||keyDown("up")) && plr.y > 422) {
      plr.velocityY = -15; 
      touches=[];
    }

    textSize(30);
    fill("blue");
    text ("Score: " + score, 100, 100);

    plr.velocityY = plr.velocityY + 0.4;

    plr.collide(ground);
    plr.setCollider("circle", 0, 0, 100);

    if (frameCount % 190 === 0) {
      var pointInc = createSprite(displayWidth + 10, 250,10,40);
      pointInc.velocityX = -(9 + 3*score/3);
      pointInc.addImage(ptIncreaser);
      pointInc.scale = 0.2;
      pointInc.debug = false;
      pointInc.setCollider("circle", 0, 0, 1);
      pointIncGroup.add(pointInc);
      pointInc.lifetime = 500;
      plr.collide(pointInc);
    }


    if(pointIncGroup.isTouching(plr)) {
      pointIncGroup.destroyEach();
      score = score + 1;
    }

    spawnObstacles();

    if(obstaclesGroup.isTouching(plr)) {
    gameState = END;
    }
    
  }

  if(gameState === END) {
    text("CLICK ON THE RESET BUTTON TO RESTART!!", 100, 200);
    //fontSize(30);
    gameOver.visible = true;
    restart.visible = true;
    
    plr.velocityY = 0;
    //plr.addImage(plrJump);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    pointIncGroup.destroyEach(0);
    //pointIncGroup.setLifetimeEach(-1);
    
  }
  if((touches.length>0 || mousePressedOver(restart))&&gameState===END) {
    reset1();
    touches=[];
  }

  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 150 === 0) {
    var obstacle = createSprite(displayWidth + 40, 410,10,40);
    obstacle.velocityX = -(9 + 3*score/3);
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obs1);
              break;
      case 2: obstacle.addImage(obs2);
              break;
      case 3: obstacle.addImage(obs3);
              break;
      case 4: obstacle.addImage(obs4);
              break;
      default: break;
    }
               
    obstacle.scale = 0.7;
    obstacle.lifetime = 500;

    //obstacle.debug = true;
    obstacle.setCollider('rectangle', 0, 0, 30, 50);

    obstaclesGroup.add(obstacle);

    plr.collide(obstacle);
  }
}

function reset1(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  pointIncGroup.destroyEach();
  
  //trex.changeAnimation("running", trex_running);
  
  score = 0;  
}