import Todo from "domain/entities/Todo"
import TodoRepository from "domain/repositories/TodoRepository"

export default class TodoServiceImpl {
    
    todoRepo : TodoRepository
    
    constructor (tr: TodoRepository) {
        this.todoRepo = tr
    }
    
    GetTodos(): Array<Todo> {
        return this.todoRepo.GetTodos()
    }

    AddTodo(todo: Todo): Todo {
        return this.todoRepo.AddTodo(todo)
    }

    UpdateTodo(todo: Todo): Array<Todo> {
        return this.todoRepo.UpdateTodo(todo)
    }

    DeleteTodo(todo_id: string): Array<Todo> {
        return this.todoRepo.DeleteTodo(todo_id)
    }

}