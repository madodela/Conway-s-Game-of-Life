'use strict';

var cellsPositions = [],
	gridSize = 0,
	canvas;

function createGrid() {

	gridSize = document.getElementById('grid-size').value;
	if(!!gridSize && gridSize > 0) {
		cellsPositions = [];
		drawCanvas();
	} else {
		alert("Please type valid gridSize");
	}
}

function drawCanvas() {
	var elem = document.getElementById('environment'),
	  	gridHeightWidth = gridSize * 33.75,
	  	elemHeightWidth = Math.round(gridHeightWidth) + 15;
  	
	elem.width = elemHeightWidth;
	elem.height = elemHeightWidth;
	elem.addEventListener('click', changeCellStatus);
 
 	canvas = elem.getContext('2d');
  	canvas.fillStyle = "#ccc";
	canvas.clearRect(10, 10, gridHeightWidth, gridHeightWidth);

  	drawCells();
}

function changeCellStatus(event) {
	var x = event.offsetX,
		y = event.offsetY;

	cellsPositions.forEach(function (cell) {
		let right = cell.x + cell.cellSize,
			left = cell.x,
			top = cell.y,
			bottom = cell.y + cell.cellSize,
			isSelected = right >= x && left <= x && bottom >= y && top <= y;
		
		if(isSelected) {
			cell.isAlive = !cell.isAlive;
			changeCellCanvas(cell);
			return;
		}
	});
}

function changeCellCanvas(cell){
	canvas.fillStyle = cell.isAlive ? '#0f0' : '#ccc';
	canvas.fillRect(cell.x, cell.y, cell.cellSize, cell.cellSize);
}

function drawCells() {
	var cellSize = 30,
		y = 15,
		cellsQuantity = gridSize;

	for(; cellsQuantity>0; cellsQuantity --) {
		let cells = gridSize,
			x = 15;
		for(; cells>0; cells --) {
			cellsPositions.push({x: x, y: y, cellSize: cellSize, isAlive: false});
			canvas.fillRect(x, y, cellSize, cellSize);
			x += 31;
		}
		y += 31;
	}
	document.getElementById('next-gen-btn').className = '';
}

function createNewGeneration() {

	var environment = new Environment(gridSize),
		newGeneration = [];
	
	environment.setCells(getCellsArray());
	newGeneration = environment.nextGeneration();
	// flatten array
	newGeneration = [].concat.apply([], newGeneration);
	//changing cell color according to new status
	cellsPositions.forEach(function(cell, index) {
		cell.isAlive = newGeneration[index].isAlive;
		changeCellCanvas(cell);
	});
}

function getCellsArray() {
	var cells = [],
		cellStates = [];
	//Get cell's status of life in a plain array
	cellStates = cellsPositions.map(function(cell) {
		return new Cell(cell.isAlive);
	});
	//Making a two-dimensional array
	while(cellStates.length) {
	    cells.push(cellStates.splice(0, gridSize));
	}
	return cells;
}