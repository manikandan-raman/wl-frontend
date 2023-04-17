import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Spinner } from './Spinner';

export const LoginForm = () => {
  
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    formState
  } = useForm()
  const { isSubmitting } = formState;

  const onSubmit = async (values) => {
    try {
      const data = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/auth/login`,
        data: values
      });
      localStorage.setItem('wl_user_token', data.data.token);
      navigate('/user', { state: data.data });
      reset();
    } catch (error) {
      if(error.response.status === 400) {
        alert(error.response.data.error.message);
      }
    }
  };

  
    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample" />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <h1>WL Task Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
          id="email"
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
          type="text" 
          placeholder="Email Address"
          // value={form.email}
          // onChange={handleChange}
          {...register("email", {
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Enter valid email"
            }
          })} 
          />
          <span className="mt-10 text-red-600">{errors.email && errors.email.message}</span>
          <input 
          id="password"
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" 
          type="password" 
          placeholder="Password"
          {...register("password", {
            required: "Required",
            message: "Enter Password"
          })} />
          <span className="mt-10 text-red-600">{errors.password && errors.password.message}</span>
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <Link className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" to="/">Forgot Password?</Link>
          </div>
          <div className="text-center md:text-left">
            <button disabled={isSubmitting} className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Login {isSubmitting && (<Spinner />)}</button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don't have an account? <Link className="text-red-600 hover:underline hover:underline-offset-4" to="/signup">Register</Link>
          </div>
        </form>
      </div>
    </section>
    );
}