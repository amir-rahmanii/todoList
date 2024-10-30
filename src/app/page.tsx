import AddTodo from "@/components/template/AddTodo/AddTodo"
import LogoutUser from "@/components/template/LogoutUser/LogoutUser";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import userModel from "@/model/user";
import dbConnected from "@/configs/db";
import AllTodo from "@/components/template/AllTodo/AllTodo";

export default async function Home() {
  await dbConnected();

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect("/login")
  }

  const verifyUser = verifyToken(token);

  if (!verifyUser) {
    redirect("/login")
  }

  const userDetails = await userModel.findOne({ email: verifyUser.email }, "-password");


  return (
    <>
      <LogoutUser username={userDetails?.username} />
      <div
        className="w-full md:w-7/12 lg:w-8/12 min-h-16 my-10 mx-auto rounded-lg bg-white py-5"
      >
        <AddTodo />
        {/* <div
          className="my-7 space-x-5 flex items-center border-b border-gray-300 pb-5 px-4"
        >
          <button
            className="capitalize cursor-pointer all-todos text-xs font-bold md:font-normal md:text-base"
          >
            <span className="todos-state active">all</span>
            <span className="text-gray-400 all-number">(0)</span>
          </button>

          <button
            className="capitalize incomplete-todos text-xs font-bold md:font-normal md:text-base"
          >
            <span className="todos-state text-gray-600 cursor-pointer"> pending</span>
            <span className="text-gray-400 incompleted-number">(0)</span>
          </button>

          <button
            className="capitalize text-gray-600 cursor-pointer complete-todos text-xs font-bold md:font-normal md:text-base"
          >
            <span className="todos-state text-gray-600 cursor-pointer">
              completed</span
            >
            <span className="text-gray-400 completed-number">(0)</span>
          </button>

          <button
            className="capitalize bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2 text-white font-bold rounded-md clearAll-btn text-xs md:text-base"
            style={{ marginLeft: "auto" }}
          >
            clear all
          </button>
        </div> */}

        <AllTodo />
      </div>
    </>
  );
}
