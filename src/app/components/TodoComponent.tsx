import React from 'react'
import Header from './Header'
import TodoAddForm from './TodoAddForm'
import TodoList from './TodoList'

const TodoComponent = () => {
    return (
        <div className="w-full min-h-screen bg-gray-200 text-gray-800 font-mono flex flex-col items-center gap-y-8">
            <Header />
            <TodoAddForm />
            <TodoList />
        </div>
    )
}

export default TodoComponent