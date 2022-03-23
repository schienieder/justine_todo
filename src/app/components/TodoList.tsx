import React from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { editTodo, removeTodo } from '../redux/todo/todo.slice'
import Todo from '../../domain/entities/Todo'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const TodoList = () => {

    const todos = useAppSelector(state => state.todoState.todos)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const onClickEdit = (todo : { id: string, description: string }) => {
        const { id, description } = todo
        dispatch(editTodo(todo))
        router.push({
            pathname : '/edit',
            query : { id : id, description : description }
        })
    }
    const onDeleteTodo = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeTodo(id))
                Swal.fire({
                    title : 'Deleted!',
                    text: 'Todo has been deleted.',
                    icon : 'success',
                    confirmButtonColor: '#4f46e5'
                })
            }
        })
    }
    const renderTodos = todos.map((todo: Todo) => {
        const { id, description } = todo
        return (
            <div 
                className="w-card bg-white shadow border-b border-gray-300 p-5 rounded-lg flex justify-between items-center"
                key={ id }
            >
                <p className="text-sm">{ description }</p>
                <div className="flex gap-x-3">
                    <button 
                        className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg p-2"
                        onClick={ () => onClickEdit(todo) }
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 text-current" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button 
                        className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg p-2"
                        onClick={ () => onDeleteTodo(id) }
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 text-current" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    })

    return (
        <div className="flex flex-col gap-y-5">
            { renderTodos }
        </div>
    )
}

export default TodoList