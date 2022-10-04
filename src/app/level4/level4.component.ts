import { Component } from '@angular/core';
import { BoardService } from './board.service';

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

@Component({
  templateUrl: './level4.component.html',
  styleUrls: ['./level4.component.css'],
})
export class Level4Component{
  constructor(public board: BoardService) {
    this.board.restart();
  }

  /**
     * Get a two-dimensional array representing the board's content.
     * (note: very useful for the .html component code)
     */
   public getCells(): BoardCell[][] {
    const result: BoardCell[][] = [];
    for (let row = 0; row < this.board.boardContent.length; row++) {
      result.push([]);
      for (let col = 0; col < this.board.boardContent[row].length; col++) {
        result[row][col] = {
          playerName: this.getPlayerName(col, row),
          class: this.getStyle(col, row),
        };
      }
    }

    return result;
  }

  public getPlayerName(col: number, row: number): string {
    return this.board.getPlayerNames()[this.board.boardContent[row][col]];
  }

  /**
     * Gets the CSS class representing the player who has occupied the given cell.
     * @returns CSS class of the player, or empty string if the cell is empty.
     */
   public getStyle(col: number, row: number): string {
    return this.playerIndexToClass(this.board.boardContent[row][col]);
  }

  private playerIndexToClass(playerIndex: number): string{
    if(playerIndex !== 0){
      return `occupied-${playerIndex}`;
    }

    return '';
  }
}
