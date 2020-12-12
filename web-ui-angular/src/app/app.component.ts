import { Component, OnInit } from '@angular/core';
import { BoardService } from './services/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'My Kanban';
  boards;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService.getBoards().subscribe((boards) => {
      this.boards = boards;
      console.log('boards', boards);
    });
  }
}
