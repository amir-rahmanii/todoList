"use client"

import Loader from '@/components/module/Loader/Loader';
import { Button } from '@/components/ui/button'
import { clearStatus, getMeInfo, logOutUser } from '@/redux/auth/auth';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

function LogoutUser({username} : {username : string}) {

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const {loading, error, success, message } = useSelector((state: RootState) => state.auth);


    const logOutHandler = () => {
        dispatch(logOutUser());
    }



    useEffect(() => {
        if (error) {
            toast.error(message)
            dispatch(clearStatus());
        }
        if (success) {
            toast.success(message);
            router.push("/login")
            dispatch(clearStatus());
        }
    }, [error, success])




    return (
        <div className="w-full md:w-7/12 lg:w-8/12 min-h-16 my-10 mx-auto rounded-lg bg-white py-5">
            <div className="p-4 flex justify-between items-center">
            <p className=" text-black/80 text-xl">{username}, you are welcome!!</p>
                <Button disabled={loading} onClick={logOutHandler}>
                    {loading ? <Loader /> : "Log out"}
                </Button>
            </div>
        </div>
    )
}

export default LogoutUser