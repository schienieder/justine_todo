import Todo from "domain/entities/Todo"
import TodoRepository from "domain/repositories/TodoRepository"

export default class TodoServiceImpl {
    
    todoRepo : TodoRepository
    
    constructor (tr: TodoRepository) {
        this.todoRepo = tr
    }
    
    async GetTodos(): Promise<Todo[]> {
        return this.todoRepo.GetTodos()
    }
    

    async AddTodo(todo_description: string) {
        return this.todoRepo.AddTodo(todo_description)
    }

    UpdateTodo(todo: Todo) {
        return this.todoRepo.UpdateTodo(todo)
    }

    async DeleteTodo(todo_id: string) {
        return this.todoRepo.DeleteTodo(todo_id)
    }

}