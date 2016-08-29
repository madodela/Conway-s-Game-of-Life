'use strict';

function Cell(isAlive) {
    this.isAlive = isAlive;
}

Cell.prototype.die = function() {
    this.isAlive = false;
};

Cell.prototype.revive = function() {
    this.isAlive = true;
};