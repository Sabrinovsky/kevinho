import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from 'src/types/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  todoNameControl = new FormControl('');
  todos: Todo[] = [
    { id: '1', name: 'Todo1', done: false },
    { id: '2', name: 'Todo2', done: true },
  ];
}
