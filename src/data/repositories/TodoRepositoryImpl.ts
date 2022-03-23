import Todo from "../../domain/entities/Todo"
import TodoRepository from "../../domain/repositories/TodoRepository"

export default class TodoRepositoryImpl implements TodoRepository {
    
    myTodos: Array<Todo>
    // myTodos = JSON.parse(localStorage.todos)
    
    GetTodos(): Array<Todo> {
        // IF LOCALSTORAGE TODOS IS SET
        // SET THE LOCALSTORAGE TODOS IN OUR MYTODOS VARIABLE
        // AND RETURN IT
        if (localStorage.todos) {
            this.myTodos = JSON.parse(localStorage.todos)
            return this.myTodos
        }
        // IF LOCALSTORAGE TODOS IS NOT SET
        // RETURN AN EMPTY ARRAY
        else {
            return []
        }
    }

    AddTodo(todo: Todo): Todo {
        let newTodo = todo
        // IF LOCALSTORAGE TODOS IS SET
        // SPREAD THE CURRENT TODOS, ADD THE NEW TODO
        // THEN SET THE CURRENT TODOS AS THE LOCALSTORAGE TODOS
        if (localStorage.todos) {
            let currTodos = JSON.parse(localStorage.todos)
            currTodos = [...currTodos, newTodo]
            localStorage.todos = JSON.stringify(currTodos)
        }
        // IF THE LOCALSTORAGE TODOS IS NOT SET
        // CREATE A NEW ARRAY
        // SET IT AS OUR LOCALSTORAGE TODOS
        else {
            const newTodoArr = new Array(todo)
            localStorage.todos = JSON.stringify(newTodoArr)
        }
        return newTodo
    }

    UpdateTodo(param_todo: Todo): Array<Todo> {
        // ASSIGN LOCALSTORAGE TODOS TO CURRTODOS VARIABLE
        const currTodos = JSON.parse(localStorage.todos)
        // ASSIGN PARAMETER TODO TO VARIABLE TOEDITTODO
        const toEditTodo = param_todo
        // ITERATE CURRTODOS AND DETERMINE IF THE TODO IS EQUAL TO PARAM TODO
        // IF IT IS EQUAL UPDATE ITS DESCRIPTION
        // ELSE RETURN THE OLD TODO
        // LASTLY IS TO ASSIGN IT TO VARIABLE UPDATEDTODOS
        const updatedTodos = currTodos.map((todo: Todo) => {
            if (todo.id === toEditTodo.id) {
                return {...todo, description : toEditTodo.description}
            }
            return todo
        })
        // ASSIGN THE UPDATEDTODOS TO LOCALSTORAGE TODOS
        localStorage.todos = JSON.stringify(updatedTodos)
        return updatedTodos
    }

    DeleteTodo(todo_id: string): Array<Todo> {
        // ASSIGN LOCALSTORAGE TODOS TO CURRTODOS VARIABLE
        const currTodos = JSON.parse(localStorage.todos)
        // ASSIGN PARAM TODO_ID TO VARIABLE TOFILTERTODO
        const toFilterTodo = todo_id
        // ITERATE CURRTODOS AND FILTER ITS VALUES
        // THEN ASSIGN IT TO A VARIABLE FILTEREDTODOS
        const filteredTodos = currTodos.filter((todo: Todo) => todo.id !== toFilterTodo)
        // ASSIGN THE FILTEREDTODOS TO THE LOCALSTORAGE TODOS
        localStorage.todos = JSON.stringify(filteredTodos)
        return filteredTodos
    }

}