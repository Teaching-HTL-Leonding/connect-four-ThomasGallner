import { Injectable } from '@angular/core';

/**
 * Logic for a connect-four-board.
 */
@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public currentPlayerIndex = 1;
  protected currentWinnerIndex: number = 0;
  public boardContent!: number[][];

  constructor() {
    this.restart();
  }

  // override getWinnerIndex() method (level 2 solution only works for a 4x4 board)
  /**
   * @returns Player (1 or 2) who has won, or 0 if there is no winner yet
   */
  public getWinnerIndex(): number {
    let count = 0;
    let cellToCheck = -1;
    let indexToAdd = 0;

    //horizontal
    for (let row = 0; row < this.boardContent.length; row++) {
      count = 0;
      cellToCheck = this.boardContent[row][0];
      for (let col = 0; col < this.boardContent[row].length; col++) {
        if (cellToCheck !== 0 && this.boardContent[row][col] === cellToCheck) {
          count++;
          if (count === 4) {
            return cellToCheck;
          }
        } else {
          cellToCheck = this.boardContent[row][col];
          if (cellToCheck === 0) {
            count = 0;
          } else {
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
        if (cellToCheck !== 0 && this.boardContent[row][col] === cellToCheck) {
          count++;
          if (count === 4) {
            return cellToCheck;
          }
        } else {
          cellToCheck = this.boardContent[row][col];
          if (cellToCheck === 0) {
            count = 0;
          } else {
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
        if (
          cellToCheck !== 0 &&
          this.boardContent[row + indexToAdd][col] === cellToCheck
        ) {
          count++;
          if (count === 4) {
            return cellToCheck;
          }
        } else {
          cellToCheck = this.boardContent[row + indexToAdd][col];
          if (cellToCheck === 0) {
            count = 0;
          } else {
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
        if (
          cellToCheck !== 0 &&
          this.boardContent[row][col + indexToAdd] === cellToCheck
        ) {
          count++;
          if (count === 4) {
            return cellToCheck;
          }
        } else {
          cellToCheck = this.boardContent[row][col + indexToAdd];
          if (cellToCheck === 0) {
            count = 0;
          } else {
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
      for (
        let col = this.boardContent[row].length - 1;
        indexToAdd < this.boardContent.length - row;
        col--
      ) {
        if (
          cellToCheck !== 0 &&
          this.boardContent[row + indexToAdd][col] === cellToCheck
        ) {
          count++;
          if (count === 4) {
            return cellToCheck;
          }
        } else {
          cellToCheck = this.boardContent[row + indexToAdd][col];
          if (cellToCheck === 0) {
            count = 0;
          } else {
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
        if (
          cellToCheck !== 0 &&
          this.boardContent[row][col - indexToAdd] === cellToCheck
        ) {
          count++;
          if (count === 4) {
            return cellToCheck;
          }
        } else {
          cellToCheck = this.boardContent[row][col - indexToAdd];
          if (cellToCheck === 0) {
            count = 0;
          } else {
            count = 1;
          }
        }

        indexToAdd++;
      }
    }

    return 0;
  }

  /**
   * Drops a coin in the given row if there isn't a winner yet and
   * if the col isn't filled up already
   */
  public drop(colIx: number) {
    console.log(`Coin dropped in column ${colIx}`);

    let emptyRowIx = this.getEmptyRowIx(colIx);
    if (this.currentWinnerIndex === 0 && emptyRowIx !== -1) {
      //able to drop coin in specified col -> change player
      this.boardContent[emptyRowIx][colIx] = this.currentPlayerIndex;
      this.currentPlayerIndex = this.currentPlayerIndex === 1 ? 2 : 1;
    }

    this.currentWinnerIndex = this.getWinnerIndex();
  }

  /**
   * @returns row, that is empty in specified col or -1, if there is no empty row
   */
  private getEmptyRowIx(colIx: number): number {
    for (let i = this.boardContent.length - 1; i >= 0; i--) {
      if (this.boardContent[i][colIx] === 0) {
        return i;
      }
    }

    return -1;
  }

  /**
   * Gets the winner (1 or 2) or 0 if there is no winner yet.
   */
  public get winnerIndex(): number {
    return this.currentWinnerIndex;
  }

  /**
   * Resets game to its original state.
   */
  public restart(): void {
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
