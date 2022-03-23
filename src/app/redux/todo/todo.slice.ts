import { createSlice, nanoid } from '@reduxjs/toolkit'
import Todo from '../../../domain/entities/Todo'
import TodoRepositoryImpl from '../../../data/repositories/TodoRepositoryImpl'
import TodoService from '../../../domain/usecases/TodoService'

interface TodoShape {
    todos: Array<Todo>,
    editInfo: Todo
}

const initialState: TodoShape = {
    todos : [],
    editInfo : { id : '', description : ''}
}

// TODO REPOSITORY IMPLEMENTATION FROM DATA/REPO LAYER
const todoRepImpl = new TodoRepositoryImpl()
// TODOSERVICE FROM DOMAIN/USECASES LAYER
const todoService = new TodoService(todoRepImpl)

const todoSlice = createSlice({
    name : "allTodos",
    initialState,
    reducers : {
        addTodo : (state, action) => {
            const addedTodo = todoService.AddTodo({ id : nanoid(), description : action.payload })
            state.todos.push(addedTodo)
        },
        editTodo : (state, action) => ({
            ...state,
            editInfo : action.payload
        }),
        updateTodo : (state, action) => {
            const updatedTodos = todoService.UpdateTodo(action.payload)
            return {...state, todos : updatedTodos, editInfo : { id : '', description : ''}}
        },
        removeTodo : (state, action) => {
            const filteredTodos = todoService.DeleteTodo(action.payload)
            return {...state, todos : filteredTodos}
        },
        fetchTodos: (state) => {
            const localStorageTodos = todoService.GetTodos()
            return {...state, todos : localStorageTodos}
        }
    }
})

export const { addTodo, editTodo, updateTodo, removeTodo, fetchTodos } = todoSlice.actions
export default todoSlice.reducer