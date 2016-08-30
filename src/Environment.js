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

Environment.prototype.getAliveNeighbours = function(x, y) {
    var aliveNeigbours = 0,
        cells = this.cells,
        isNotOutOfLeftEdge = x - 1 >= 0,
        isNotOutOfRightEdge = x + 1 < this.dimension,
        isNotOutOfTopEdge = y - 1 >= 0,
        isNotOutOfBottomEdge = y + 1 < this.dimension;
    
    if(isNotOutOfLeftEdge) {
        cells[x-1][y].isAlive && aliveNeigbours++;
        if(isNotOutOfBottomEdge) {
            cells[x-1][y+1].isAlive && aliveNeigbours++;
        }
        if(isNotOutOfTopEdge) {
            cells[x-1][y-1].isAlive && aliveNeigbours++;
        }
    }

    if(isNotOutOfRightEdge) {
        cells[x+1][y].isAlive && aliveNeigbours++;
        if(isNotOutOfBottomEdge) {
            cells[x+1][y+1].isAlive && aliveNeigbours++;
        }
        if(isNotOutOfTopEdge) {
            cells[x+1][y-1].isAlive && aliveNeigbours++;
        }
    }

    if(isNotOutOfBottomEdge) {
        cells[x][y+1].isAlive && aliveNeigbours++;
    }

	if(isNotOutOfTopEdge) {
        cells[x][y-1].isAlive && aliveNeigbours++;
    }
    return aliveNeigbours;
};

Environment.prototype.judgeCell = function(x, y) {
    var aliveNeigbours = this.getAliveNeighbours(x, y),
        cell = new Cell(this.cells[x][y].isAlive),
        underpopulation = aliveNeigbours < 2,
        overcrowding = aliveNeigbours > 3,
        reborn = aliveNeigbours === 3;

    (underpopulation || overcrowding) && cell.die();
    reborn && cell.revive();

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