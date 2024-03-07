import { TodoListComponent } from './todo-list.component';
import { render, screen } from '@testing-library/angular';
import { createMock } from '@testing-library/angular/jest-utils';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { todoFactory } from '../../jest/factories/todo';
import userEvent from '@testing-library/user-event';

describe('TodoListComponent', () => {
  const todoService = createMock(TodoService);

  async function setup() {
    await render(TodoListComponent, {
      imports: [HttpClientModule],
      providers: [{ provide: TodoService, useValue: todoService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }

  it('renders the todos', async () => {
    const todo1 = todoFactory.build({ name: 'Todo 1' });
    const todo2 = todoFactory.build({ name: 'Todo 2' });

    const todoService = createMock(TodoService);
    todoService.getAllTodos.mockImplementationOnce(() => of([todo1, todo2]));
    await render(TodoListComponent, {
      imports: [HttpClientModule],
      providers: [{ provide: TodoService, useValue: todoService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('renders a lot of todo', async () => {
    const todos = todoFactory.buildList(25);

    const todoService = createMock(TodoService);
    todoService.getAllTodos.mockImplementationOnce(() => of(todos));
    await render(TodoListComponent, {
      imports: [HttpClientModule],
      providers: [{ provide: TodoService, useValue: todoService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    expect(screen.getAllByText(/Todo/)).toHaveLength(25);
  });

  describe('delete button', () => {
    it('delete a todo', async () => {
      const todo1 = todoFactory.build({ name: 'Todo 1' });
      const todo2 = todoFactory.build({ name: 'Todo 2' });

      todoService.getAllTodos.mockImplementationOnce(() => of([todo1, todo2]));
      todoService.deleteTodo.mockImplementationOnce(() => of(null));

      await setup();

      expect(screen.getByText('Todo 1')).toBeInTheDocument();
      expect(screen.getByText('Todo 2')).toBeInTheDocument();

      // const button = screen.getByTitle('Delete Todo 1');
      // const button = screen.getAllByText(/Delete/)[0];
      const button = screen.getAllByRole('button', { name: 'Delete' })[0];

      await userEvent.click(button);

      expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
      expect(screen.getByText('Todo 2')).toBeInTheDocument();
    });
  });
});
