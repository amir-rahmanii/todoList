"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import FormSchema from "@/validation/signup"
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
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { clearStatus, signUpUser } from "@/redux/auth/auth"
import Loader from "@/components/module/Loader/Loader"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"



export default function SignUp() {

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error , success , message } = useSelector((state: RootState) => state.auth);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  const signUpHandler = async (user: z.infer<typeof FormSchema>) => {
    dispatch(signUpUser(user))
  }

  useEffect(() => {
    if(error){
      toast.error(message);
      dispatch(clearStatus());
    }
    if(success){
      toast.success(message);
      router.push("/");
      dispatch(clearStatus());
    }
  } , [error , success])


  return (
    <div className="container h-screen flex justify-center items-center ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signUpHandler)} className="w-full border p-3 rounded-md md:w-2/3 lg:w-1/3 space-y-6">
          <h2 className="text-center text-2xl">SignUp Form</h2>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} required />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} required />
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
            {loading ? <Loader /> : "Sign Up"}
          </Button>
          <p className="text-center">Already signed up?  <Link className="text-blue-400 underline" href='/login'>Go to Login</Link> </p>
        </form>
      </Form>
    </div>
  )
}
