import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  getBoardTasks = (id) => this.http.get(`/api/board/${id}/tasks`);

  addTask = (id, task) =>
    this.http.post('/api/tasks', { task, boardId: id }, httpOptions);

  filterTasks = (id, text) =>
    this.http.post(
      `/api/boards/${id}/tasks/search`,
      {
        text,
      },
      httpOptions
    );

  getBoards = () => this.http.get('/api/boards');
}
