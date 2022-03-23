import React, { useState, useRef } from 'react'
import Header from './Header'
import { useRouter } from 'next/router'
import { useAppDispatch } from '../redux/hooks'
import { updateTodo } from '../redux/todo/todo.slice'

const EditTodo = () => {

    const router = useRouter()
    const { id, description } = router.query
    const [editDescription, setEditDescription] = useState('')
    const [hasEditError, setHasEditError] = useState(false)
    const dispatch = useAppDispatch()
    const myEl: any = useRef()
    const onClickSubmit = () => {
        if (myEl.current.value.length > 0) {
            setHasEditError(false)
            dispatch(updateTodo({ id, description : editDescription || description }))
            router.back()
        }
        else {
            setHasEditError(true)
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-200 text-gray-800 font-mono flex flex-col items-center gap-y-8">
            <Header />
            <div className="w-card card flex flex-col gap-y-5">
                <h4 className="font-bold text-lg">Edit Todo</h4>
                <textarea 
                    name="edit_todo_description" 
                    id="edit_todo_description"
                    className="formInput"
                    ref={ myEl } 
                    defaultValue={ description }
                    onChange={ e => setEditDescription(e.target.value) }
                ></textarea>
                {
                    hasEditError ?
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
                    onClick={ onClickSubmit }
                >Submit</button>
            </div>
        </div>
    )
}

export default EditTodo