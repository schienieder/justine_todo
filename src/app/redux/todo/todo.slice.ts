import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import Todo from '../../../domain/entities/Todo'
import TodoRepositoryImpl from '../../../data/repositories/TodoRepositoryImpl'
import TodoRepositoryFirebaseImpl from '../../../data/repositories/TodoRepositoryFirebaseImpl'
import TodoService from '../../../domain/usecases/TodoService'

interface TodoShape {
    todos: Array<Todo>,
    editInfo: Todo,
    loading: boolean
}

const initialState: TodoShape = {
    todos : [],
    editInfo : { id : '', description : ''},
    loading : false
}

// TODO REPOSITORY IMPLEMENTATION FROM DATA/REPO LAYER
// const todoRepImpl = new TodoRepositoryImpl()
// TODO REPOSITORY IMPLEMENTATION (FIREBASE) FROM DATA/REPO LAYER
const todoRepFirebase = new TodoRepositoryFirebaseImpl()
// TODOSERVICE FROM DOMAIN/USECASES LAYER
const todoService = new TodoService(todoRepFirebase)

export const fetchFireBaseTodos = createAsyncThunk(
    'todos/fetchFireBaseTodos', 
    async () => {
        const todos = await todoService.GetTodos()
        return todos
    }
)

export const addFireBaseTodo = createAsyncThunk(
    'todos/addFireBaseTodo', 
    async (todo_description: string) => {
        await todoService.AddTodo(todo_description)
    }
)

export const updateFireBaseTodo = createAsyncThunk(
    'todos/updateFireBaseTodo',
    async (todo: Todo) => {
        await todoService.UpdateTodo(todo)
    }
)

export const removeFireBaseTodo = createAsyncThunk(
    'todos/removeFireBaseTodo',
    async (todo_id: string) => {
        await todoService.DeleteTodo(todo_id)
    }
)

const todoSlice = createSlice({
    name : "todos",
    initialState,
    reducers : {
        // addTodo : (state, action) => {
        //     const addedTodo = todoService.AddTodo({ id : nanoid(), description : action.payload })
        //     state.todos.push(addedTodo)
        // },
        editTodo : (state, action) => ({
            ...state,
            editInfo : action.payload
        })
        // updateTodo : (state, action) => {
        //     const updatedTodos = todoService.UpdateTodo(action.payload)
        //     return {...state, todos : updatedTodos, editInfo : { id : '', description : ''}}
        // },
        // removeTodo : (state, action) => {
        //     const filteredTodos = todoService.DeleteTodo(action.payload)
        //     return {...state, todos : filteredTodos}
        // },
        // fetchTodos: (state) => {
        //     const localStorageTodos = todoService.GetTodos()
        //     return {...state, todos : localStorageTodos}
        // }
    },
    extraReducers: (builder) => {
        // FETCH TODOS CASES
        builder.addCase(fetchFireBaseTodos.pending, (state) => ({
            ...state,
            loading : true
        }))
        builder.addCase(fetchFireBaseTodos.fulfilled, (state, action) => ({
            ...state,
            todos : action.payload,
            loading : false
        }))
        builder.addCase(fetchFireBaseTodos.rejected, (state) => ({
            ...state,
            loading : false
        }))
        // ADD TODOS CASES
        builder.addCase(addFireBaseTodo.pending, (state) => ({
            ...state,
            loading : true
        }))
        builder.addCase(addFireBaseTodo.fulfilled, (state) => ({
            ...state,
            loading : false
        }))
        // UPDATE TODOS CASES
        builder.addCase(updateFireBaseTodo.pending, (state) => ({
            ...state,
            loading : true
        }))
        builder.addCase(updateFireBaseTodo.fulfilled, (state) => ({
            ...state,
            loading : false
        }))
        // REMOVE TODOS CASES
        builder.addCase(removeFireBaseTodo.pending, (state) => ({
            ...state,
            loading : true
        }))
        builder.addCase(removeFireBaseTodo.fulfilled, (state) => ({
            ...state, 
            loading : false
        }))
    },
})
export const { editTodo } = todoSlice.actions
// export const { addTodo, editTodo, updateTodo, removeTodo, fetchTodos } = todoSlice.actions
export default todoSlice.reducer