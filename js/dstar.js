function Dstar() {
    this.pos = createVector(width/2, height/2);
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(1, 0);
    this.isBoosting = false;

    this.boosting = function(b) {
        this.isBoosting = b;
    }

    this.update = function() {
        if (this.isBoosting) {
           this.boost(); 
        }
        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }

    this.boost = function() {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }

    this.hits = function(enemy) {
        var d = dist(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y);
        if (d < this.r + enemy.r) {
            return true;
        } else {
            return false;
        }
    }
    // ETAPA 1 - DESENHAR JOGADOR
    this.render = function() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        fill(75);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        pop();
    }

    // ETAPA 3 - LIMITES DO CENÁRIO
    this.edges = function() {
        if (this.pos.x > width + this.r){
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r){
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }

    this.setRotation = function(a) {
        this.rotation = a;
    }

    this.turn = function(angle) {
        this.heading += this.rotation;
    }

}