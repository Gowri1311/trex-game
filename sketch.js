var trex, trexAnimation, ground, groundImg,cloud,cloudImg,CloudsGroup,obstacle1,obstale2,obstacle3,obstacle4,obstacle5,obstacle6,count=0, ObstaclesGroup,gameOver,gameOverImg,restart,restartImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex_collided;
function preload(){
  trexAnimation=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImg=loadImage("ground2.png");
  cloudImg=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  trex_collided= loadAnimation("trex_collided.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  trex=createSprite(30,180,20,20);
  trex.addAnimation("trex",trexAnimation);
  trex.addAnimation("collide",trex_collided);
  trex.scale=0.5;
  ground=createSprite(300,190,600,10);
  ground.addImage("ground",groundImg);
  invisible_ground=createSprite(300,195,600,8);
invisible_ground.visible = false;
  CloudsGroup=new Group();
 ObstaclesGroup=new Group();
 gameOver = createSprite(300,100);
   restart = createSprite(300,130);
    
    gameOver.addImage("gameOver", gameOverImg);
    gameOver.scale = 0.5;
    restart.addImage("restart", restartImg);
    restart.scale = 0.5;
restart.visible=false;
gameOver.visible=false; 
  
}

function draw() {
  background(120);
fill(255);
  text("Score: "+ count, 250, 50);
 // console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -6;
    //scoring
    count =count+ Math.round(World.frameRate/60);
    if (count%100===0 && count>0) {
    //playSound("checkPoint.mp3");
     ground.velocityX=ground.velocityX-3;   
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 167){
      trex.velocityY = -13 ;
     // playSound("jump.mp3");
      
    }
  //console.log(trex.y);
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
      //trex.velocityY=-13;
      //playSound("die.mp3");
      
    }
  }
  
  else if(gameState === END) {
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
  restart.visible=true;
  gameOver.visible=true;
    //change the trex animation
    trex.changeAnimation("collide");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    //place gameOver and restart icon on the screen
    
  }
 
  if (mousePressedOver(restart)) {
  reset();  
  }  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisible_ground);
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
 
  
  
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,150,40,10);
    cloud.y = random(50,150);
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,180,10,40);
    obstacle.velocityX = -( 6+3*count/100);
    
    //generate random obstacles
    var rand = Math.round (random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
      case 6: obstacle.addImage(obstacle6);
        break;  
        default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState=PLAY;
 ObstaclesGroup.destroyEach();
 CloudsGroup.destroyEach();
 gameOver.visible= false;
 restart.visible=false;
 trex.changeAnimation("trex");
 count=0;
}


