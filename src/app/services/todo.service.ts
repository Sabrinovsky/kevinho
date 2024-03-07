import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/types/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  getAllTodos() {
    return this.httpClient.get<Todo[]>('http://localhost:3004/todos');
  }

  deleteTodo(id: string) {
    return this.httpClient.delete(`http://localhost:3004/todos/${id}`);
  }
}
