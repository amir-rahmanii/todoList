"use client";

import { Input } from '@/components/ui/input';
import colors from '@/utils/colors';
import React, { useState } from 'react'

function AddTodo() {
    const [title, setTitle] = useState("");
    const [activeColor, setActiveColor] = useState("#FFFFFF");

 

    const addTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch("/api/todo/create", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ title, color: activeColor })
        })

        if (res.status === 201) {
            setTitle("")
        }

        const data = await res.json();

        console.log(data);

    }

    return (
        <div className='p-4 grid gap-2'>
            <form onSubmit={addTodoHandler} className="input-form  flex gap-2">
                <Input
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    style={{backgroundColor : activeColor}}
                    placeholder="Add a New Task + Enter"
                    className="text-black/80 w-full border border-gray-300 rounded-md p-2 focus:outline-none text-lg placeholder:text-center"
                />
                <button
                    type='submit'
                    className="capitalize bg-gradient-to-r from-green-400 to-lime-500 px-3 py-2 text-white font-bold rounded-md clearAll-btn text-xs md:text-base"
                    style={{ marginLeft: "auto" }}
                >
                    Add
                </button>
            </form>
            <div className='flex gap-1'>
                {colors.map((color , index) => (
                    <button key={index} onClick={() => setActiveColor(color)} style={{backgroundColor : color}} className={`w-7 h-7 border ${activeColor === color ? "border-2 border-black" : "border-slate-700"}  rounded-full`}></button>
                ))}
            </div>
        </div>
    )
}

export default AddTodo