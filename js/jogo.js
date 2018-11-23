var dstar;
var enemies = [];
var lasers = [];
var gameover;
var space;
var score=0;
var font;
var boom;
var life=3;
var bonus  = [];
var bonuss;
var firing;
var boost;
var fase=150;
var level=1;



function preload(){
    space=loadImage("sprites/space.png");
    gameover=loadImage("sprites/dead.png");
    font=loadFont("sprites/font.ttf");
    boom=loadSound("sprites/boom.mp3");
    shot=loadSound("sprites/shot.mp3");
    bonuss=loadSound("sprites/bonus.mp3");
    firing=loadSound("sprites/imfiringmylaser.mp3");
    boost=loadSound("sprites/boost.mp3");

}
function setup() {
    createCanvas(windowWidth-10, windowHeight-8);
    dstar = new Dstar();
    for (var i = 0; i < 5; i++) {
        enemies.push(new Enemy());
        bonus.push(new Bonus());
    }
}


function draw() {
    background(space);  
   // textFont(font); 
   //  textSize(500); 
   // // // // // //  fill(255); 
   // // // // //  text("START",100,400);
   // // // //  textSize(30); 
   // // //  fill(255); 
   // //  text("A Frota Instelar tem uma missão para você e sua equipe, destrua os asteroids que ameassam a terra com a sua nave Dstar",20,700); 
   //  text("Press ENTER to start",800,800);
                    

   for (var i = 0; i < enemies.length; i++) {
        if (dstar.hits(enemies[i])) {
            
               // // // // // // //  textFont(font); 
              // // // // // //   textSize(250); 
              // // // // //   fill(200, 0, 0); 
             // // // //    text("YOU"+"\n"+"ARE"+"\n"+"DEAD",500,200);
             // // // //    textSize(30); 
             //    fill(255); 
              // //   text("Press X to play again",500,900); 
            life--; 

            }
            
        
        enemies[i].render();
        enemies[i].update();
        enemies[i].edges();
    }

for (var k = 0; k < bonus.length; k++) {
        if (dstar.hits(bonus[k])) {
            score=score+5000; // se a nave bate no asteroide ganha 5000 pontos 
           

                  
            }
            
        
        bonus[k].render();
        bonus[k].update();
        bonus[k].edges();

    }
    for (var i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        for (var j = enemies.length - 1; j >= 0; j--){
            if (lasers[i].hits(enemies[j])){
                if(enemies[j].r > 10) {
                    boom.play(); //efeito sonoro quando o asteroide é destruído 
                    var newEnemies = enemies[j].breakup();
                    enemies = enemies.concat(newEnemies);
                    score=score+100; //contagem de score ETAPA 06 o asteroide comum vale 100 pontos
                    enemies.push(new Enemy());
                    
                }

                enemies.splice(j, 1); 
                lasers.splice(i, 1);
                break;
                
            }
        }
   }
  

//if(score%fase=0){ //ETAPA 8, a cada 5000 pontos ganhos aparecem asteroides bonus
 //     bonus.push(new Bonus());
 //  firing.play(); 
 //  level++;


    for (var t = lasers.length - 1; t >= 0; t--) {
        lasers[t].render();
        lasers[t].update();
        for (var k = bonus.length - 1; k >= 0; k--){
            if (lasers[t].hits(bonus[k])) {
                if(bonus[k].r > 10) {
                    bonuss.play(); //efeito sonoro quando o asteroide bonus é destruído 
                    score=score+1000; //o asteroide bonus vale 1000 pontos
                    bonus.push(new Bonus());
                    
                }

                bonus.splice(k, 1); 
                lasers.splice(t, 1);
                break;
                
                }
            }
        }
  //}

    dstar.render();
    dstar.turn();
    dstar.update();
    dstar.edges();
    textFont(font); //etapa 05
    textSize(20); 
    fill(255); 
    text("Score: " +score , 300, 30); //add score
    text("Life: "+life, 600, 30); //add life
    text("Level: "+level, 900,30); // add phase

}



function keyReleased() {
    dstar.setRotation(0);
    dstar.boosting(false);
    if (!shot.isPlaying()){
        shot.stop();
    }
}

// ETAPA 2 - MOVIMENTAÇÃO DO JOGADOR
function keyPressed() {
    if (key == ' ') {
        lasers.push(new Laser(dstar.pos, dstar.heading));
        shot.play();
    } else if (keyCode == RIGHT_ARROW) {
        dstar.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
        dstar.setRotation(-0.1);
    } else if (keyCode == UP_ARROW) {
        dstar.boosting(true);
        boost.play(0.001);
    } else if (!keyCode == UP_ARROW){
       boost.stop();
    }
}

