'use strict';

describe('Cell', function() {
    var cell;
    
    beforeEach(function() {
        cell = new Cell(true);
    });
    
    it('Should have a state of life', function() {
        expect(cell.isAlive).toBeTruthy();
    });
    it('Should be dead or alive', function() {
        var deadCell = new Cell(false),
            invalidCell = new Cell('A');
        expect(cell.isAlive).toBe(true);
        expect(deadCell.isAlive).toBe(false);
        expect(invalidCell.isAlive).not.toBe(true);
    });
    it('Should die', function() {
        expect(cell.die).toBeDefined();
        expect(cell.isAlive).toBe(true);
        cell.die();
        expect(cell.isAlive).toBe(false);
    });
    it('Should revive', function() {
        cell.die();
        expect(cell.revive).toBeDefined();
        cell.revive();
        expect(cell.isAlive).toBe(true);
    });
});