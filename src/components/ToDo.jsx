import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import ToDoItems from './ToDoItems'

const ToDo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef()

    // this is the function of add the todolist
    const add = () => {
        const inputText = inputRef.current.value.trim();   // trim() for remove the extra space to starting
        
        if (inputText === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }
        setTodoList((prev) => [...prev, newTodo])
        inputRef.current.value = "";
    }

    // this is the function of delete the todolist
    const deleteTodo = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== id)
        })
    }

    // this is the function of isComplete or not the todolist
    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if(todo.id == id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect (() => {
        localStorage.setItem("todos", JSON.stringify(todoList))
    }, [todoList])

    return (
        <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">

            {/* Title */}
            <div className="flex items-center mt-7 gap-2">
                <img src={todo_icon} alt="to-do icon" className="w-8 h-8" />
                <h1 className="text-3xl font-semibold">To-Do List</h1>
            </div>

            {/* Input box */}
            <div className="flex items-center my-7 bg-gray-200 rounded-full">
                <input ref={inputRef} type="text" placeholder="Add your task" className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600" />
                <button onClick={add} className="border-none rounded-full bg-orange-500 w-32 h-14 text-white text-lg font-medium cursor-pointer">ADD +</button>
            </div>

            {/* todo list */}
            <div className="">
                {todoList.map((item, index) => {
                    return <ToDoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
                })}
 
            </div>

        </div>
    )
}

export default ToDo
