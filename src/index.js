// import { saludar } from './js/saludar';
import './styles.css';
import { TodoList } from './js/classes';
import { createTodoHtml } from './js/components';

export const todoList = new TodoList();

if (todoList.todos && todoList.todos.length > 0) {
    todoList.todos.forEach((todo) => createTodoHtml(todo));
}
