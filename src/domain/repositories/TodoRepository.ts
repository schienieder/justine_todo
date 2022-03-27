import Todo from "domain/entities/Todo"

export default interface TodoRepository {
    GetTodos(): Promise<Todo []>,
    AddTodo(todo_description: string): void,
    UpdateTodo(todo: Todo): void,
    DeleteTodo(todo_id: string): void
}