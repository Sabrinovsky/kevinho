import { Factory } from 'fishery';
import { Todo } from 'src/types/todo';

const todoFactory = Factory.define<Todo>(({ sequence }) => ({
  id: sequence.toString(),
  done: false,
  name: 'Todo' + sequence,
}));

export { todoFactory };
