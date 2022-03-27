import React, { useState } from 'react'
import { useAppDispatch } from '../redux/hooks'
import { addFireBaseTodo, fetchFireBaseTodos } from '../redux/todo/todo.slice'

const TodoAddForm = () => {
    
    const [description, setDescription] = useState('')
    const [hasError, setHasError] = useState(false)
    const dispatch = useAppDispatch()
    const submitTodo = () => {
        if (description.length > 0) {
            setHasError(false)
            dispatch(addFireBaseTodo(description))
            dispatch(fetchFireBaseTodos())
            setDescription('')
        }
        else {
            setHasError(true)
        }
    }

    return (
        <div className="w-card card">
            <h4 className="font-bold text-lg">Add Todo</h4>
            <textarea 
                name="todo_description" 
                id="todo_description"
                className="formInput" 
                placeholder="Your Todo . . ."
                value={ description }
                onChange={ e => setDescription(e.target.value) }
            ></textarea>
            {
                hasError ?
                <div className="flex items-center gap-x-2 -mt-2 -mb-2">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-red-500" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-red-500 font-medium">Description cannot be empty!</p>
                </div>
                : null
            }
            <button 
                className="btnPrimary"
                type="button"
                onClick={ submitTodo }
            >Submit</button>
        </div>
    )
}

export default TodoAddForm