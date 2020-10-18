import { Todo } from './classes';
import { todoList } from '../index';

const $todoList = document.querySelector('.todo-list');
const $newInput = document.querySelector('.new-todo');
const $clearCompleted = document.querySelector('.clear-completed');
const $filters = document.querySelector('.filters');
const $filtersAnchore = document.querySelectorAll('.filters a');

export const createTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${todo.done ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.done ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    $todoList.appendChild(div.firstElementChild);
};

// eventos

$newInput.addEventListener('keyup', (event) => {
    const {
        keyCode,
        target: { value },
    } = event;

    if (keyCode === 13 && value.length > 0) {
        const todo = new Todo(value);
        todoList.addTodo(todo);
        createTodoHtml(todo);
        $newInput.value = '';
    }
});

$todoList.addEventListener('click', (e) => {
    const nombreElemento = e.target.localName;
    const todoElement = e.target.parentElement.parentElement;
    const todoId = Number(todoElement.getAttribute('data-id'));

    if (nombreElemento === 'input') {
        todoList.changeDoneTodo(todoId);
        todoElement.classList.toggle('completed');
    } else if (nombreElemento === 'button') {
        todoList.removeTodo(todoId);
        todoElement.remove();
    }
});

$clearCompleted.addEventListener('click', () => {
    todoList.removeCompleted();

    for (let i = $todoList.children.length - 1; i >= 0; i--) {
        const element = $todoList.children[i];

        if (element.classList.contains('completed')) {
            element.remove();
        }
    }
});

$filters.addEventListener('click', (e) => {
    const action = e.target.text;

    if (!action) return;

    // for (const itemAnchore of $filtersAnchore) {
    //     itemAnchore.classList.remove('selected');
    //     if (action === itemAnchore.text) {
    //         itemAnchore.classList.add('selected');
    //     }
    // }

    $filtersAnchore.forEach((item) => item.classList.remove('selected'));
    const itemAnchore = e.target;
    itemAnchore.classList.add('selected');

    for (const todoItem of $todoList.children) {
        todoItem.classList.remove('hidden');
        const completed = todoItem.classList.contains('completed');

        switch (action) {
            case 'Pendientes':
                if (completed) {
                    todoItem.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completed) {
                    todoItem.classList.add('hidden');
                }
                break;
            default:
                break;
        }
    }
});
