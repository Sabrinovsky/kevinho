import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from 'src/types/todo';
import { TodoService } from '../services/todo.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodosActions } from './todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  todoNameControl = new FormControl('');
  todos$: Observable<Todo[]>;

  constructor(
    public todoService: TodoService,
    private store: Store<{ todos: Todo[] }>
  ) {
    this.todos$ = store.select('todos');
  }

  deleteTodo(deletedTodo: Todo) {
    this.store.dispatch(TodosActions.removeTodo({ todo: deletedTodo }));
  }

  onSubmit() {
    if (!this.todoNameControl.value) return;
    this.store.dispatch(
      TodosActions.addTodo({
        todo: {
          id: new Date().toISOString(),
          done: false,
          name: this.todoNameControl.value,
        },
      })
    );
  }
}
