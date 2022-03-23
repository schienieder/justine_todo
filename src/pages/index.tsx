import React, { useEffect } from 'react'
import TodoComponent from 'app/components/TodoComponent'
import { useAppDispatch } from 'app/redux/hooks'
import { fetchTodos } from 'app/redux/todo/todo.slice'

export default function index() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])
    
    return (
        <div id="root">
            <TodoComponent />
        </div>
    )
}
