import React from 'react'

function AllTodo() {
    return (
        <ul className="p-5 space-y-6 todo-container"> <li className="border-b border-b-gray-300 pb-2">
            <div className="flex items-center">
                <span className="false">rewrew</span>

                <button className="ml-auto border  px-2 py-1 text-xs  rounded-md transition  border-red-600 text-red-600 hover:bg-red-600 hover:text-white">incompleted</button>
                <button className="ml-2">
                    <img src="/delete.png" alt="delete-todo" className="delete-btn w-5" />
                </button>

            </div>
            <p className="text-sm text-gray-400 mt-3">10/30/2024, 10:57:06 PM</p>
        </li></ul>
    )
}

export default AllTodo