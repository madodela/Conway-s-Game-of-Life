'use strict';

var cellsPositions = [],
	order = 0,
	canvas;

function createGrid() {

	order = document.getElementsByName('order')[0].value;
	if(!!order && order > 0) {
		cellsPositions = [];
		drawCanvas(order);
	} else {
		alert("Please type valid order");
	}
}

function drawCanvas() {
	var elem = document.getElementById('environment'),
  	distance = order * 33.75;
  	canvas = elem.getContext('2d');
	
	elem.width = Math.round(distance) + 15;
	elem.height = Math.round(distance) + 15;
	elem.addEventListener('click', changeCellStatus);
 
  	canvas.fillStyle = "#ccc";

	//(x, y, distance_x, distance_y)
	canvas.clearRect(10, 10, distance, distance);
  	canvas.strokeRect(10, 10, distance, distance);

  	drawCells(canvas);
}

function changeCellStatus(event) {
	var x = event.offsetX,
		y = event.offsetY;

	for(let index = 0, len = cellsPositions.length; index <= len ; index++) {
		let cell = cellsPositions[index],
			right = cell.x + cell.size,
			left = cell.x,
			top = cell.y,
			bottom = cell.y + cell.size,
			isSelected = right >= x && left <= x && bottom >= y && top <= y;

		if(isSelected) {
			cell.isAlive = !cell.isAlive;
			changeCellCanvas(cell);
			return;
		}
	}
}

function changeCellCanvas(cell){
	canvas.fillStyle = cell.isAlive ? '#0f0' : '#ccc';
	canvas.fillRect(cell.x, cell.y, cell.size, cell.size);
}

function drawCells(canvas) {
	var size = 30,
		y = 15,
		cellsQuantity = order;

	for(; cellsQuantity>0; cellsQuantity --) {
		let cells = order,
			x = 15;
		for(; cells>0; cells --) {
			cellsPositions.push({x: x, y: y, size: size, isAlive: false});
			canvas.fillRect(x, y, size, size);
			x += 31;
		}
		y += 31;
	}
	document.getElementById('next-button').className = '';
}

function createNewGeneration() {

	var cellStates = [],
		cells = [],
		environment = new Environment(order),
		newGeneration = [];

	cellStates = cellsPositions.map(function(cell) {
		return new Cell(cell.isAlive);
	});

	while(cellStates.length) {
	    cells.push(cellStates.splice(0, order));
	}
	environment.setCells(cells);

	newGeneration = environment.nextGeneration();
	// flatten array
	newGeneration = [].concat.apply([], newGeneration);
	
	cellsPositions.forEach(function(cell, index) {
		cell.isAlive = newGeneration[index].isAlive;
		changeCellCanvas(cell);
	});
}