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

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    console.log('TodoListComponent initialized');
    this.todoService.getAllTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id!).subscribe(() => {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    });
  }

  toggleDone(updatedTodo: Todo) {
    this.todos = this.todos.map((t) => (t.id === updatedTodo.id ? {...updatedTodo, done: true} : t));
  }

  addTodo() {
    if (!this.todoNameControl.value) return;

    this.todos = [...this.todos, { name: this.todoNameControl.value, done: false }];
    // this.todoService
    //   .createTodo({ name: this.todoNameControl.value, done: false })
    //   .subscribe((todo) => {
    //     this.todos = [...this.todos, todo];
    //   });
    this.todoNameControl.setValue('');
  }
}
