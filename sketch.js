var ghost, ghostImage, ghostJumping;
var tower, towerImage;
var windowImage, windowGroup;
var climberImage, climberGroup;
var invisibleBlockGroup;
var gameState = "PLAY"

function preload(){
    ghostImage =  loadAnimation("ghost-standing.png");
    windowImage = loadImage("door.png");
    towerImage = loadImage("tower.png");
    climberImage = loadImage("climber.png");
    ghostJumping = loadImage("ghost-jumping.png")

}
function setup(){
    createCanvas(600,600);
    tower =  createSprite(300,300,600,600);
    tower.addImage("tower", towerImage);
    tower.velocityY=2;

    ghost = createSprite(200,200,20,20);
    ghost.addAnimation("ghost", ghostImage);
    ghost.scale = 0.3;

    climberGroup = new Group();
    windowGroup = new Group();
    invisibleBlockGroup = new Group();

}
function draw(){
    background(0);
    if(gameState === "PLAY"){
        if(keyDown("space")){
            ghost.velocityY=-10
        }
        ghost.velocityY=ghost.velocityY+0.7;
        if(keyDown("left")){
            ghost.x=ghost.x-3
        }
        if(keyDown("right")){
            ghost.x=ghost.x+2
        }
        if(tower.y>=400){
            tower.y=300;
        }
        spawnObstacles();
        ghost.collide(climberGroup);

        if(ghost.isTouching(invisibleBlockGroup)){
            gameState = "END"
            tower.destroy();
            ghost.destroy();
            climberGroup.destroyEach();
            windowGroup.destroyEach();
            invisibleBlockGroup.destroyEach();
        }
    }

        else if(gameState === "END"){
            fill("red");
            stroke("blue");
            strokeWeight(4);
            textSize(30);
            text("Game Over", 250,300)
            ghost.velocityY=0
            
        }
    drawSprites();
}
function spawnObstacles(){
    if(frameCount%240===0){
        var window = createSprite(200,200,20,20);
        window.addImage("window", windowImage);
        window.velocityY=2;
        ghost.depth = window.depth + 1;
        windowGroup.add(window);
        window.lifetime = 300

        var climber = createSprite(200,200,20,20);
        climber.addImage("climber", climberImage);
        
        climber.velocityY=2
        climber.y=window.y+60;
        climberGroup.add(climber);
        climber.debug = true;

        var invisibleBlock = createSprite(200,200,climber.width,5);
        invisibleBlock.y=climber.y+20;
        invisibleBlock.velocityY=2;
        invisibleBlockGroup.add(invisibleBlock);
        invisibleBlock.debug = true;

        

        window.x=Math.round(random(100,500));
        climber.x = window.x;
        invisibleBlock.x=climber.x;

        climber.lifetime = 300;
        invisibleBlock.lifetime = 300;
        
    }
}

