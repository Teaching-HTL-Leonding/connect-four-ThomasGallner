import { Component } from '@angular/core';
import { Level3Component } from '../level3/level3.component';
import { BoardService } from './board.service';

@Component({
  templateUrl: './level4.component.html',
  styleUrls: ['./level4.component.css'],
})
export class Level4Component extends Level3Component{
  constructor(private board: BoardService) {
    super();
  }
}
