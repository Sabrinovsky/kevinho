import { createReducer, on } from '@ngrx/store';
import { TodosActions, TodosApiActions } from './todo.actions';
import { Todo } from 'src/types/todo';

export const initialState: Todo[] = [];

export const todosReducer = createReducer(
  initialState,
  on(TodosActions.addTodo, (state, { todo }) => [...state, todo]),
  on(TodosActions.removeTodo, (state, { todo }) => state.filter((t) => t.id !== todo.id)),
  on(TodosApiActions.retrievedTodoList, (_state, { todos }) => todos)
);
