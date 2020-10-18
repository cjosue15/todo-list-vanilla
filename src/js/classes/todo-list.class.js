import { Todo } from './todo.class';

export class TodoList {
    constructor() {
        this.loadLocalStorage();
    }

    addTodo(todo) {
        this.todos.push(todo);
        this.saveLocalStorage();
    }

    removeTodo(id) {
        const index = this.todos.findIndex((todo) => todo.id === id);
        this.todos.splice(index, 1);
        this.saveLocalStorage();
    }

    changeDoneTodo(id) {
        const todo = this.todos.find((item) => item.id === id);
        todo.done = !todo.done;
        this.saveLocalStorage();
    }

    removeCompleted() {
        this.todos = this.todos.filter((item) => !item.done);
        this.saveLocalStorage();
    }

    saveLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadLocalStorage() {
        this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

        if (this.todos.length > 0) {
            this.todos = this.todos.map((item) => Todo.fromJson(item));
        }
    }
}
