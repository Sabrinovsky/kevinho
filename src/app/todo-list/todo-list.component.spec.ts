import { TodoListComponent } from './todo-list.component';
import { getByRole, render, screen, within } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { todoFactory } from '../../jest/factories/todo';
import userEvent from '@testing-library/user-event';
import { MatCardModule } from '@angular/material/card';
import { InputComponent } from '../components/input/input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('TodoListComponent', () => {
  const todoService = createMock(TodoService);

  async function setup() {
    await render(TodoListComponent, {
      declarations: [InputComponent],
      imports: [
        BrowserModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [{ provide: TodoService, useValue: todoService }],
    });
  }

  it('renders the todos', async () => {
    const todo1 = todoFactory.build({ name: 'First Todo' });
    todoService.getAllTodos.mockReturnValue(
      of([
        todo1,
        { id: '21312', name: 'Second Todo', done: false },
      ])
    );
    await setup();

    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
  });

  it('deletes a todo', async () => {
    todoService.getAllTodos.mockReturnValue(
      of([
        { id: '21312', name: 'First Todo', done: false },
        { id: '21312', name: 'Second Todo', done: false },
      ])
    );
    todoService.deleteTodo.mockReturnValue(of({}));
    await setup();

    await userEvent.click(screen.getByTitle('Delete First Todo'));
    expect(screen.queryByText('First Todo')).not.toBeInTheDocument();
  });

  it('adds a todo', async () => {
    todoService.getAllTodos.mockReturnValue(of([]));
    todoService.createTodo.mockReturnValue(
      of({ id: '21312', name: 'New Todo', done: false })
    );
    await setup();

    const input = screen.getByRole('textbox', { name: 'Todo name' });
    await userEvent.type(input, 'Abobora');
    await userEvent.click(screen.getByText('Add todo'));
    expect(input).toHaveValue('');
    expect(todoService.createTodo).toHaveBeenCalledWith({name: 'Abobora', done: false});
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });
});
