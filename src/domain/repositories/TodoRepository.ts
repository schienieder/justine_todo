import Todo from "domain/entities/Todo"

export default interface TodoRepository {
    GetTodos(): Array<Todo>,
    AddTodo(todo: Todo): Todo,
    UpdateTodo(todo: Todo): Array<Todo>,
    DeleteTodo(todo_id: string): Array<Todo>
}