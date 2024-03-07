import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from 'src/types/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  todoNameControl = new FormControl('');
  todos: Todo[] = [];

  constructor(public todoService: TodoService){}

  ngOnInit() {
    this.todoService.getAllTodos().subscribe(todos => this.todos = todos);
  }

  deleteTodo(deletedTodo: Todo){
    this.todoService.deleteTodo(deletedTodo.id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== deletedTodo.id);
    });
  }
}
