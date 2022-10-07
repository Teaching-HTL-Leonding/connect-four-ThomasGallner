import { BoardService } from "./board.service";

describe('Board service', () =>{
  let board = new BoardService();

  beforeEach(() => {
    board.restart();
  });

  it('can set pieces correctly (above each other)', () => {
    let rowIx = board.boardContent.length-1;

    board.drop(0);
    expect(board.boardContent[rowIx][0]).toBe(1);

    board.drop(0);
    expect(board.boardContent[rowIx-1][0]).toBe(2);
  });

  it('does not switch player after invalid entry', () => {
    board.drop(0);
    board.drop(0);
    board.drop(0);
    board.drop(0);
    board.drop(0);
    board.drop(0);

    let expectedCurrPlayerIx = board.currentPlayerIndex;
    board.drop(0); // board is already filled up at col 0, entry should not be accepted
    expect(board.currentPlayerIndex).toBe(expectedCurrPlayerIx);
  });

  it('detects winner correctly (horizontal)', () =>{
    for(let colIx = 0; colIx < board.boardContent[0].length; colIx++){
      board.drop(colIx);
      board.drop(colIx);
    }

    expect(board.winnerIndex).toBe(1);
  });

  it('detects winner correctly (vertical)', () =>{
    let colIx = 0;
    while(board.winnerIndex === 0){
      board.drop(colIx);
      colIx = colIx === 0 ? 1 : 0;
    }

    expect(board.winnerIndex).toBe(1);
  });
});
