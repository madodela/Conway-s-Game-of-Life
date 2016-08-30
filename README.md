# Conway's Game of Life

## What is it?

The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

It is a zero-player game where the evolution is determined by its initial state, requiring no further input.

For more information about it, go to [Coderetreat page](http://coderetreat.org/gol).

## My implementation

### TDD

The logic was build following TDD practices and using [Jasmine](http://jasmine.github.io/2.4/introduction.html) as framework.

#### Running specs
In order to run the specs I created, open in your browser the **SpecRunner.html** file.

### UI

A basic UI was build using a canvas, where you can choose the size of the grid(Environment dimension) where the cells are going to be, and after that you can click in the grid to choose the state of the cells.

A live cell is green and a dead cell is gray.

After choosing the initial state, you can start to make new generations and see the evolution.