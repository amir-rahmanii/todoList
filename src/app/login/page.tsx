"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import FormSchema from "@/validation/login"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { clearStatus, loginUser } from "@/redux/auth/auth"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import toast from "react-hot-toast"
import Loader from "@/components/module/Loader/Loader"
import { useRouter } from "next/navigation"


export default function Login() {

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success, message } = useSelector((state: RootState) => state.auth);


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      idenity: "",
      password: "",
    },
  })

  const loginHandler = async (user: z.infer<typeof FormSchema>) => {
    dispatch(loginUser(user))
  }


  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(clearStatus());
    }
    if (success) {
      toast.success(message);
      router.push("/");
      dispatch(clearStatus());
    }
  }, [error, success])



  return (
    <div className="container h-screen flex justify-center items-center ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(loginHandler)} className="w-full border p-3 rounded-md md:w-2/3 lg:w-1/3 space-y-6">
          <h2 className="text-center text-2xl">Login Form</h2>
          <FormField
            control={form.control}
            name="idenity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idenity</FormLabel>
                <FormControl>
                  <Input placeholder="Username | Email" {...field} required />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} required />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? <Loader /> : "Submit"}
          </Button>
          <p className="text-center">Don’t have an account <Link className="text-blue-400 underline" href='/signup'>Sign up</Link> </p>
        </form>
      </Form>
    </div>
  )
}
