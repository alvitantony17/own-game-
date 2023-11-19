const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ground, ball;

var bg;
var bgImage;
var play;
var playImage;
var logo;
var logoImage;
var player;
var playerImage;
var zombie;
var zombieImage;
var zombie2;
var zombie2Image;
var zombie3;
var zombie3Image;
var playerleft;
var plImage;
var bullet;
var bulletImage;

var zombieGroup;

function preload(){
bgImage=loadImage("assets/photo.png")
playerImage=loadAnimation("assets/playerright.png","assets/playerright.png","assets/playerright.png","assets/playerright2.png","assets/playerright2.png")
zombieImage=loadAnimation("assets/zombie1.png","assets/zombie2.png","assets/zombie3.png")
zombie2Image=loadAnimation("assets/zb1.png","assets/zb2.png","assets/zb3.png","assets/zb4.png","assets/zb5.png","assets/zb6.png","assets/zb7.png")
zombie3Image=loadAnimation("assets/zom.png","assets/zom1.png","assets/zom2.png","assets/zom3.png","assets/zom4.png")
bulletImage=loadImage("assets/bullet.png")
}

function setup(){
createCanvas(windowWidth,windowHeight);
engine = Engine.create();
world = engine.world;
    
bg=createSprite(800,300)
bg.addImage("bg",bgImage)
bg.scale=8

player=createSprite(width/2,height/2+240)
player.addAnimation("player",playerImage)
player.scale=0.8
player.frameDelay=10


zombieGroup=createGroup()


}

function draw(){
    background(200,200);
    Engine.update(engine);
    
    

    if(keyDown("RIGHT_ARROW") || keyDown("D")){
        player.x=player.x+10
        //bullet.x=bullet.x+10
       
    }

    if(keyDown("LEFT_ARROW") || keyDown("A")){
        player.x=player.x-10
        //bullet.x=bullet.x-10
    }

    if(player.x>width){
        player.x=width
    }

    if(player.x<0){
        player.x=0
    }

    if(zombieGroup.isTouching(bullet)){
        bullet.visible=false
        zombieGroup.destroyEach()
    }


    zombieGroup.lifeTime=100

    spawnZombies()
    drawSprites()
    

}

function spawnZombies(){
  if(frameCount%150===0){
    var zombie=createSprite(width/2,height/2-100)
    zombie.velocityX=-1

    var rand = Math.round(random(1,3))
    switch(rand){
        case 1 : zombie.addAnimation("zombie1",zombieImage)
                break;
        case 2 : zombie.addAnimation("zombie2",zombie2Image)
                break;
        case 3 : zombie.addAnimation("zombie3",zombie3Image)

        default:break;
    }
    zombie.x=Math.round(random(500,1300))
    zombie.y=150
    zombie.scale=0.4
    zombie.setVelocity(-0.9,0.8)
    zombie.frameDelay=10
    zombieGroup.add(zombie)  

  }
}

/*function shoot(){
    bullet=createSprite(player.x+90,player.y-150)
    bullet.addImage("bullet",bulletImage)
    bullet.scale=0.07
    bullet.setVelocity(5,-3)
  }*/


function keyPressed(){

    if(keyCode===32){
        bullet=createSprite(player.x+40,player.y-120)
        bullet.addImage("bullet",bulletImage)
        bullet.scale=0.07
    }
 
}

function keyReleased(){
   if(keyCode===32){
    bullet.setVelocity(20,-10)
   }
}