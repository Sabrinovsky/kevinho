import { createAction, createActionGroup, props } from '@ngrx/store';
import { Todo } from 'src/types/todo';

// export const addTodo = createAction('[TodoList Component] Add Todo', props<{ todo: Todo }>());
// export const removeTodo = createAction('[TodoList Component] Delete Todo', props<{ todo: Todo }>());

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    'Add Todo': props<{ todo: Todo }>(),
    'Remove Todo': props<{ todo: Todo }>(),
  },
});

export const TodosApiActions = createActionGroup({
  source: 'Todos API',
  events: {
    'Retrieved Todo List': props<{ todos: Todo[] }>(),
  },
});
