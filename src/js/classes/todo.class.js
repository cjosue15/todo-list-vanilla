export class Todo {
    // tarea;
    // id;
    // done;
    // created;

    static fromJson({ id, tarea, done, created }) {
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.done = done;
        tempTodo.created = created;

        return tempTodo;
    }

    constructor(tarea) {
        this.tarea = tarea;
        this.id = new Date().getTime();
        this.done = false;
        this.created = new Date();
    }
}
