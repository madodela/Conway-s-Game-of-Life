'use strict';

describe('Environment', function() {
    var order,
        cells,
        environment;
    
    beforeEach(function() {
        order = 3;
        environment = new Environment(order);
        cells = [
                [new Cell(false), new Cell(false),new Cell(true)],
                [new Cell(true), new Cell(true), new Cell(false)],
                [new Cell(true), new Cell(false), new Cell(true)]
        ];
        environment.setCells(cells);
    });
    
    it('Should exists', function(){
        expect(environment).toBeDefined();
    });
    it('Should have cells in it', function() {
        cells.forEach(function(cell) {
            cell.forEach(function(c) {
                expect(c).toEqual(jasmine.any(Cell));
            });
        });
    });
    it('Should have cells with an initial state', function() {
        cells.forEach(function(cell) {
            cell.forEach(function(c) {
                expect(c.isAlive).toBeDefined();
            });
        });
    });
    it('Should know a specific cell status', function() {
        var cellPositionX = 0, cellPositionY = 0;
        expect(environment.getStatusOfCell(cellPositionX, cellPositionY)).toBe(false);
    });
    it('Should know the state of a cell\'s neighbours', function() {
        var cellPositionX = 1, cellPositionY = 0;
        expect(environment.getStatusOfNeighbours(cellPositionX, cellPositionY))
        .toEqual({'dead': 3, 'alive': 2});
    });
    
    it('Should kill the cell by underpopulation', function(){
        var cellPositionX = 0, cellPositionY = 2,
            result = environment.judgeCell(cellPositionX, cellPositionY);
        expect(result.isAlive).toBe(false);
    });
    it('Should revive the cell by reproduction', function(){
        var cellPositionX = 1, cellPositionY = 2,
            result = environment.judgeCell(cellPositionX, cellPositionY);
        
        expect(result.isAlive).toBe(true);
    });
    
    it('Should let the cell survive', function() {
        var cellPositionX = 2, cellPositionY = 0,
            result = environment.judgeCell(cellPositionX, cellPositionY);
        expect(result.isAlive).toBe(true);
    });
    it('Should kill the cell by overcrowding', function() {
         var cellPositionX = 1, cellPositionY = 1,
             result = environment.judgeCell(cellPositionX, cellPositionY);
        expect(result.isAlive).toBe(false);
    });
    it('Should create a new generation (order 3)', function() {
        var nextGeneration = environment.nextGeneration(),
            expectedGeneration = [
                [new Cell(false), new Cell(true),new Cell(false)],
                [new Cell(true), new Cell(false), new Cell(true)],
                [new Cell(true), new Cell(false), new Cell(false)]
        ];
        expect(nextGeneration).toEqual(expectedGeneration);
    });
    it('Should create a new generation (order 4)', function() {
        var environment = new Environment(4),
            cells = [
                [new Cell(false), new Cell(false),new Cell(true), new Cell(true)],
                [new Cell(true), new Cell(true), new Cell(false), new Cell(true)],
                [new Cell(true), new Cell(false), new Cell(true), new Cell(true)],
                [new Cell(true), new Cell(false), new Cell(true), new Cell(true)]
            ];
        environment.setCells(cells);
        var nextGeneration = environment.nextGeneration(),
            expectedGeneration = [
                [new Cell(false), new Cell(true),new Cell(true), new Cell(true)],
                [new Cell(true), new Cell(false), new Cell(false), new Cell(false)],
                [new Cell(true), new Cell(false), new Cell(false), new Cell(false)],
                [new Cell(false), new Cell(false), new Cell(true), new Cell(true)]
        ];
        expect(nextGeneration).toEqual(expectedGeneration);
    });
    it('Should create a new generation (order 6)', function() {
        var environment = new Environment(6),
            expectedGeneration = new Environment(6),
            nextGeneration = [],
            cells = [
                [new Cell(false), new Cell(false),new Cell(true), new Cell(true), new Cell(false), new Cell(true)],
                [new Cell(true), new Cell(true), new Cell(false), new Cell(true), new Cell(false), new Cell(false)],
                [new Cell(true), new Cell(false), new Cell(true), new Cell(true), new Cell(false), new Cell(true)],
                [new Cell(true), new Cell(false), new Cell(true), new Cell(true), new Cell(false), new Cell(true)],
                [new Cell(true), new Cell(false), new Cell(true), new Cell(true), new Cell(false), new Cell(false)],
                [new Cell(true), new Cell(false), new Cell(true), new Cell(true), new Cell(false), new Cell(true)]
            ];
        environment.setCells(cells);
        
        nextGeneration = environment.nextGeneration();
        
        expectedGeneration = [
            [new Cell(false), new Cell(true),new Cell(true), new Cell(true), new Cell(true), new Cell(false)],
            [new Cell(true), new Cell(false), new Cell(false), new Cell(false), new Cell(false), new Cell(false)],
            [new Cell(true), new Cell(false), new Cell(false), new Cell(false), new Cell(false), new Cell(false)],
            [new Cell(true), new Cell(false), new Cell(false), new Cell(false), new Cell(false), new Cell(false)],
            [new Cell(true), new Cell(false), new Cell(false), new Cell(false), new Cell(false), new Cell(false)],
            [new Cell(false), new Cell(false), new Cell(true), new Cell(true), new Cell(true), new Cell(false)]
        ];
        
        expect(nextGeneration).toEqual(expectedGeneration);
    });
});