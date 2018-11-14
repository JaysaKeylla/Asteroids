// ETAPA 4 - DISPAROS DO JOGADOR
var shot;
function Preload(){
	shot=loadSound("sprites/shot.mp3")
}
function Laser(dspos, angle) {
	this.pos = createVector(dspos.x, dspos.y);
	this.vel = p5.Vector.fromAngle(angle);
	this.vel.mult(10);

	this.update = function() {
		this.pos.add(this.vel);
	}
	this.render = function() {
		push();
		stroke(255);
		strokeWeight(4);
		point(this.pos.x, this.pos.y);
		pop();
	}

	this.hits = function(enemy) {
		var d = dist(this.pos.x, this.pos.y, enemy.pos.x, enemy.pos.y);
		if (d < enemy.r) {
			return true;
			shot.play();
		} else {
			return false;
		}
	}

}