//Game States
var PLAY=1;
var END=0;
var gameState=1;
var score = 0;
var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4,fruit5, monsterImage, gameOverImage;
var knifeSwooshSound,gameOverSound;
function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  fruit5 = loadImage("fruit5.png");
  gameOverImage = loadImage("gameover.png")
  //load sound here
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
  gameOverSound = loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,50,80);

  // Score variables and Groups
  score = 0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Call fruits and Monster function
    fruits();
    Monster(); 
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score += 2;
    }
     else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameOverSound.play();
        gameState=END;
        //add gameover sound here
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale = 2;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  drawSprites();
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount % 200===0){
    monster=createSprite(50,600,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(50,580));
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityX = 9 + score/100 ;
    monster.setLifetime = -1;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    
     //using random variable change the position of fruit, to make it more challenging
    
    if(position == 1)
    {
    fruit.x = 0;
    //update below give line of code for increase fruitGroup speed by 4
    fruit.velocityX=  (9 + score/100)
    }
    else
    {
      if(position==2){
      fruit.x = 0;
      
     //update below give line of code for increase fruitGroup speed by 4
      fruit.velocityX= (9 + score/100 );
      }
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r = Math.round(random(1,5));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else if (r == 4){
      fruit.addImage(fruit4);
    } else {
      r == 5
      fruit.addImage(fruit5);
    }
    
    fruit.y = Math.round(random(0,580));
   
    
    fruit.setLifetime= 90;
    
    fruitGroup.add(fruit);
  }
}