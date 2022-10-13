import { Component } from '@angular/core';

@Component({
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.css'],
})
export class Level2Component {
  public currentPlayerIndex = 1;
  protected currentWinnerIndex: number = 0;
  protected playerNames!: string[];
  public boardContent!: number[][];

  constructor() {
    this.playerNames = ['', 'Red', 'Blue'];
    this.restart();
  }

  /**
   * Drops a coin in the given row if there isn't a winner yet and
   * if the col isn't filled up already
   */
  public drop(colIx: number) {
    console.log(`Coin dropped in column ${colIx}`);

    let emptyRowIx = this.getEmptyRowIx(colIx);
    if (this.currentWinnerIndex === 0 && emptyRowIx !== -1) { //able to drop coin in specified col -> change player
      this.boardContent[emptyRowIx][colIx] = this.currentPlayerIndex;
      this.currentPlayerIndex = this.currentPlayerIndex === 1 ? 2 : 1;
    }

    this.currentWinnerIndex = this.getWinnerIndex();
  }

  /**
   * Gets the winner (1 or 2) or 0 if there is no winner yet.
   */
  public get winnerIndex(): number {
    return this.currentWinnerIndex;
  }

private playerIndexToClass(playerIndex: number): string{
  if(playerIndex !== 0){
    return `occupied-${playerIndex}`;
  }

  return '';
}

public getPlayerName(col: number, row: number): string {
  return this.playerNames[this.boardContent[row][col]];
}

/**
   * Gets the CSS class representing the player who has occupied the given cell.
   * @returns CSS class of the player, or empty string if the cell is empty.
   */
 public getStyle(col: number, row: number): string {
  return this.playerIndexToClass(this.boardContent[row][col]);
}

  /**
  * Resets game to its original state.
  */
  public restart(): void {
    this.boardContent = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.currentPlayerIndex = 1;
    this.currentWinnerIndex = 0;
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

  public getWinnerName(): string{
    return this.playerNames[this.currentWinnerIndex];
  }

  /**
   * @returns Player (1 or 2) who has won, or 0 if there is no winner yet
   */
  public getWinnerIndex(): number {
    //horizontal
    for (let i = 0; i < 4; i++) {
      if (
        this.boardContent[i][0] !== 0 &&
        this.boardContent[i][0] === this.boardContent[i][1] &&
        this.boardContent[i][1] === this.boardContent[i][2] &&
        this.boardContent[i][2] === this.boardContent[i][3]
      ) {
        return this.boardContent[i][0];
      }
    }

    //vertical
    for (let i = 0; i < 4; i++) {
      if (
        this.boardContent[0][i] !== 0 &&
        this.boardContent[0][i] === this.boardContent[1][i] &&
        this.boardContent[1][i] === this.boardContent[2][i] &&
        this.boardContent[2][i] === this.boardContent[3][i]
      ) {
        return this.boardContent[0][i];
      }
    }

    //diagonal 1
    if (
      this.boardContent[0][0] !== 0 &&
      this.boardContent[0][0] === this.boardContent[1][1] &&
      this.boardContent[1][1] === this.boardContent[2][2] &&
      this.boardContent[2][2] === this.boardContent[3][3]
    ) {
      return this.boardContent[0][0];
    }

    //diagonal 2
    if (this.boardContent[3][0] !== 0 &&
      this.boardContent[3][0] === this.boardContent[2][1] &&
      this.boardContent[2][1] === this.boardContent[1][2] &&
      this.boardContent[1][2] === this.boardContent[0][3]
    ) {
      return this.boardContent[3][0];
    }

    return 0;
  }
}
