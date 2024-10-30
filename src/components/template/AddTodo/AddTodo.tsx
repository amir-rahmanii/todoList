"use client";

import Loader from '@/components/module/Loader/Loader';
import { Input } from '@/components/ui/input';
import { AppDispatch, RootState } from '@/redux/store';
import { clearStatus, createTodo } from '@/redux/todo/todo';
import colors from '@/utils/colors';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

function AddTodo() {
    const [title, setTitle] = useState("");
    const [activeColor, setActiveColor] = useState("#FFFFFF");
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, success, message } = useSelector((state: RootState) => state.todo);



    const addTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.trim().length > 2 && title.trim().length < 50) {
            dispatch(createTodo({ title, color: activeColor }))
        }else{
            toast.error("The title should be at least 3 characters and at most 50 characters");
            return false
        }
    }


    useEffect(() => {
        if (error) {
            toast.error(message);
            dispatch(clearStatus());
        }
        if (success) {
            toast.success(message);
            dispatch(clearStatus());
        }
    }, [error, success])

    return (
        <div className='p-4 grid gap-2'>
            <form onSubmit={addTodoHandler} className="input-form  flex gap-2 items-center">
                <Input
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    style={{ backgroundColor: activeColor }}
                    placeholder="Add a New Task + Enter"
                    className="text-black/80 w-full border border-gray-300 rounded-md p-2 focus:outline-none text-lg placeholder:text-center"
                />
                <button
                    disabled={loading}
                    type='submit'
                    className="capitalize bg-gradient-to-r from-green-400 to-lime-500 px-3 py-2 text-white font-bold rounded-md clearAll-btn text-xs md:text-base"
                    style={{ marginLeft: "auto" }}
                >
                    {loading ? <Loader /> : "Add"}
                </button>
            </form>
            <div className='flex gap-1'>
                {colors.map((color, index) => (
                    <button key={index} onClick={() => setActiveColor(color)} style={{ backgroundColor: color }} className={`w-7 h-7 border ${activeColor === color ? "border-2 border-black" : "border-slate-700"}  rounded-full`}></button>
                ))}
            </div>
        </div>
    )
}

export default AddTodo