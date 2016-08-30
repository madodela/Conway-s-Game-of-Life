'use strict';

function Environment(dimension) {
    this.dimension = dimension;
    this.cells = [];
}

Environment.prototype.setCells = function(cells) {
    this.cells = cells;
};

Environment.prototype.getCellStatus = function(x, y) {
    return this.cells[x][y].isAlive;
};

Environment.prototype.getStatusOfNeighbours = function(x, y) {
    var result = {'dead': 0, 'alive': 0},
        cells = this.cells;
    
    if(x + 1 < this.dimension) {
        result[isAliveOrDead(x + 1, y)]++;
        if(y + 1 < this.dimension) {
            result[isAliveOrDead(x + 1, y + 1)]++;
        }
        if(y - 1 >= 0) {
            result[isAliveOrDead(x + 1, y - 1)]++;
        }
    }
    if(x - 1 >= 0) {
        result[isAliveOrDead(x - 1, y)]++;
        if(y + 1 < this.dimension) {
            result[isAliveOrDead(x - 1, y + 1)]++;
        }
        if(y - 1 >= 0) {
            result[isAliveOrDead(x - 1, y - 1)]++;
        }
    }

    if(y + 1 < this.dimension) {
	   result[isAliveOrDead(x, y + 1)]++;
	}
    
	if(y - 1 >= 0) {
        result[isAliveOrDead(x, y - 1)]++;
    }
    return result;

    function isAliveOrDead(x, y) {
        return cells[x][y].isAlive ? 'alive': 'dead';
    }
};

Environment.prototype.judgeCell = function(x, y) {
    var neighboursStats = this.getStatusOfNeighbours(x, y),
        cell = new Cell(this.cells[x][y].isAlive);
    if(neighboursStats.alive < 2 || neighboursStats.alive > 3) {
        cell.die();
    }
    if(neighboursStats.alive === 3) {
        cell.revive();
    }
    return cell;
};

Environment.prototype.nextGeneration = function() {
    var nextGeneration = [],
        len = this.cells.length;
    
    for(let i = 0; i < len; i++) {
        let row = [];
        for(let o = 0; o < len; o++) {
            row.push(this.judgeCell(i, o));
        }
        nextGeneration.push(row);
    }
    
    return nextGeneration;
};