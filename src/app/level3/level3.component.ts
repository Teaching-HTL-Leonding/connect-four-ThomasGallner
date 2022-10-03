import { Component } from '@angular/core';
import { Level2Component } from '../level2/level2.component';

/**
 * Represents a board cell.
 */
export interface BoardCell {
  /**
   * Player (X or O) occupying the cell, empty string if the cell is empty.
   */
  playerName: string;

  /**
   * CSS class of the player occupying the cell, empty string if the cell is empty.
   */
  class: string;
}

const NR_COLS = 7;
const NR_ROWS = 6;

@Component({
  templateUrl: './level3.component.html',
  styleUrls: ['./level3.component.css'],
})
export class Level3Component extends Level2Component {
  constructor() {
    super();
  }

  /**
     * Get a two-dimensional array representing the board's content.
     * (note: very useful for the .html component code)
     */
  public getCells(): BoardCell[][] {
    const result: BoardCell[][] = [];
    for (let row = 0; row < this.boardContent.length; row++) {
      result.push([]);
      for (let col = 0; col < this.boardContent[row].length; col++) {
        result[row][col] = {
          playerName: this.getPlayerName(col, row),
          class: this.getStyle(col, row),
        };
      }
    }

    return result;
  }

  // override getWinnerIndex() method (level 2 solution only works for a 4x4 board)
  /**
   * @returns Player (1 or 2) who has won, or 0 if there is no winner yet
   */
  public override getWinnerIndex(): number {
    let count = 0;
    let cellToCheck = -1;
    let indexToAdd = 0;

    //horizontal
    for (let row = 0; row < this.boardContent.length; row++) {
      count = 0;
      cellToCheck = this.boardContent[row][0];
      for (let col = 0; col < this.boardContent[row].length; col++) {
        if (cellToCheck !== 0 &&
          this.boardContent[row][col] === cellToCheck) {
          count++;
          if (count === 4) {
            return cellToCheck;
          }
        }
        else {
          cellToCheck = this.boardContent[row][col];
          if (cellToCheck === 0) {
            count = 0;
          }
          else {
            count = 1;
          }
        }
      }
    }

    //vertical
    for (let col = 0; col < this.boardContent[0].length; col++) {
      count = 0;
      cellToCheck = this.boardContent[0][col];
      for (let row = 0; row < this.boardContent.length; row++) {
        if (cellToCheck !== 0 &&
          this.boardContent[row][col] === cellToCheck) {
          count++;
          if (count === 4) {
            return cellToCheck;
          }
        }
        else {
          cellToCheck = this.boardContent[row][col];
          if (cellToCheck === 0) {
            count = 0;
          }
          else {
            count = 1;
          }
        }
      }
    }

    //diagonal left-top to right-bottom 1
    for (let row = 0; row < this.boardContent.length - 3; row++) {
      count = 0;
      cellToCheck = this.boardContent[row][0];
      indexToAdd = 0;
      for (let col = 0; col < this.boardContent.length - row; col++) {
        if (cellToCheck !== 0 &&
          this.boardContent[row + indexToAdd][col] === cellToCheck) {
          count++;
          if (count === 4) {
            return cellToCheck;
          }
        }
        else {
          cellToCheck = this.boardContent[row + indexToAdd][col];
          if (cellToCheck === 0) {
            count = 0;
          }
          else {
            count = 1;
          }
        }

        indexToAdd++;
      }
    }

    //diagonal left-top to right-bottom 2
    for (let col = 1; col < this.boardContent[0].length - 3; col++) {
      count = 0;
      cellToCheck = this.boardContent[0][col];
      indexToAdd = 0;
      for (let row = 0; row < this.boardContent[0].length - col; row++) {
        if (cellToCheck !== 0 &&
          this.boardContent[row][col + indexToAdd] === cellToCheck) {
          count++;
          if (count === 4) {
            return cellToCheck;
          }
        }
        else {
          cellToCheck = this.boardContent[row][col + indexToAdd];
          if (cellToCheck === 0) {
            count = 0;
          }
          else {
            count = 1;
          }
        }

        indexToAdd++;
      }
    }

    //diagonal right-top to left-bottom 1
    for (let row = 0; row < this.boardContent.length - 3; row++) {
      count = 0;
      cellToCheck = this.boardContent[row][this.boardContent[0].length - 1];
      indexToAdd = 0;
      for (let col = this.boardContent[row].length - 1; indexToAdd < this.boardContent.length - row; col--) {
        if (cellToCheck !== 0 &&
          this.boardContent[row + indexToAdd][col] === cellToCheck) {
          count++;
          if (count === 4) {
            return cellToCheck;
          }
        }
        else {
          cellToCheck = this.boardContent[row + indexToAdd][col];
          if (cellToCheck === 0) {
            count = 0;
          }
          else {
            count = 1;
          }
        }

        indexToAdd++;
      }
    }

    //diagonal right-top to left-bottom 2
    for (let col = this.boardContent[0].length - 2; col >= 3; col--) {
      count = 0;
      cellToCheck = this.boardContent[0][col];
      indexToAdd = 0;
      for (let row = 0; row <= col; row++) {
        if (cellToCheck !== 0 &&
          this.boardContent[row][col - indexToAdd] === cellToCheck) {
          count++;
          if (count === 4) {
            return cellToCheck;
          }
        }
        else {
          cellToCheck = this.boardContent[row][col - indexToAdd];
          if (cellToCheck === 0) {
            count = 0;
          }
          else {
            count = 1;
          }
        }

        indexToAdd++;
      }
    }

    return 0;
  }

  /**
    * Resets game to its original state.
    */
  public override restart(): void {
    this.boardContent = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];

    this.currentPlayerIndex = 1;
    this.currentWinnerIndex = 0;
  }
}
