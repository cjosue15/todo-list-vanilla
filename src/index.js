// import { saludar } from './js/saludar';
import './styles.css';
import { TodoList } from './js/classes';
import { createTodoHtml, taskCounter } from './js/components';

export const todoList = new TodoList();

taskCounter();

if (todoList.todos && todoList.todos.length > 0) {
    todoList.todos.forEach((todo) => createTodoHtml(todo));
}
