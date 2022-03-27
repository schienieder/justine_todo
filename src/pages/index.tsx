import React, { useEffect } from 'react'
import TodoComponent from 'app/components/TodoComponent'
import { useAppDispatch } from 'app/redux/hooks'
import { fetchFireBaseTodos } from '../app/redux/todo/todo.slice'

export default function index() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchFireBaseTodos())
    }, [])
    
    return (
        <div id="root">
            <TodoComponent />
        </div>
    )
}
