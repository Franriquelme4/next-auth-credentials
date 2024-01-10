"use client"
import { useRouter } from 'next/navigation';
import {useState} from 'react'
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react'

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { errorsState , setErrors} = useState(null);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
     const response =  await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    console.log(response);
    if (!response.ok) {
      setErrors(response.error)
      console.log(errorsState);
    }else {
      router.push("/dashboard");
      router.refresh()
    }
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xs">
        {
          errorsState && (
            <spam>Error</spam>
          )
        }
        <form onSubmit={onSubmit}>
          <div className="border-b border-gray-900/10 pb-8">
            <h1 className="text-base font-semibold leading-7 text-gray-900">Login</h1>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-12">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    {...register("email", { required: true })}
                    type="text"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-12">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            </div>
          </div>
          <div className="mt-2 flex items-center justify-center gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
        </form>

      </div>

    </div>
  )
}

export default LoginPage
