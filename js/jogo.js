var dstar;
var enemies = [];
var lasers = [];
var gameover;
var space;
var score=0;
var font;
var boom;
var life=3;

function preload(){
    space=loadImage("sprites/space.png");
    gameover=loadImage("sprites/dead.png");
    font=loadFont("sprites/font.ttf");
    boom=loadSound("sprites/boom.mp3");
    shot=loadSound("sprites/shot.mp3");

}
function setup() {
    createCanvas(windowWidth-10, windowHeight-8);
    dstar = new Dstar();
    for (var i = 0; i < 5; i++) {
        enemies.push(new Enemy());
    }
}


function draw() {
    background(space);  
    //textFont(font); 
    //textSize(500); 
    //fill(255); 
    //text("START",100,400);
    //textSize(30); 
    //fill(255); 
    //text("Navegue em uma missão da Frota Instelar na nave Dstar"+"\n"+"Press ENTER to start",800,700); 
                    

   for (var i = 0; i < enemies.length; i++) {
        if (dstar.hits(enemies[i])) {
            
                textFont(font); 
                textSize(250); 
                fill(200, 0, 0); 
                text("YOU"+"\n"+"ARE"+"\n"+"DEAD",500,200);
                textSize(30); 
                fill(255); 
                text("Press X to play again",500,900); 
                    
            }
            
    
        enemies[i].render();
        enemies[i].update();
        enemies[i].edges();
    }


    for (var i = lasers.length - 1; i >= 0; i--) {
        shot.play();
        lasers[i].render();
        lasers[i].update();
        for (var j = enemies.length - 1; j >= 0; j--) {
            if (lasers[i].hits(enemies[j])) {
                if(enemies[j].r > 10) {
                    boom.play(); //efeito sonoro quando o asteroide é destruído 
                    var newEnemies = enemies[j].breakup();
                    enemies = enemies.concat(newEnemies);
                    score=score+100; //contagem de score ETAPA 06
                    
                }
                enemies.splice(j, 1); 
                lasers.splice(i, 1);
                break;
                
            }
        }
    }

    dstar.render();
    dstar.turn();
    dstar.update();
    dstar.edges();
    textFont(font); //etapa 05
    textSize(20); 
    fill(255); 
    text("Score: " +score , 300, 30); //add score
    //text("Life: "+life, 900, 30); //add life
}



function keyReleased() {
    dstar.setRotation(0);
    dstar.boosting(false);
}

// ETAPA 2 - MOVIMENTAÇÃO DO JOGADOR
function keyPressed() {
    if (key == ' ') {
        lasers.push(new Laser(dstar.pos, dstar.heading));
    } else if (keyCode == RIGHT_ARROW) {
        dstar.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
        dstar.setRotation(-0.1);
    } else if (keyCode == UP_ARROW) {
        dstar.boosting(true);
    } else if (keyCode == BACKSPACE){
        document.location.reload();
    }
}