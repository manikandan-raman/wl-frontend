import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Spinner } from './Spinner';

export const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        formState
      } = useForm();

      const { isSubmitting } = formState;

      const navigate = useNavigate();

      const onSubmit = async (values) => {
        try {
          const data = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}/auth/signup`,
            data: values
          });
          console.log(data.data);
          navigate('/user', { state: data.data });
          reset();
          alert('Registered Successfully, Please login to check the profile');
        } catch (error) {
          if(error.response.status === 400) {
            alert(error.response.data.error[Object.keys(error.response.data.error)[0]]);
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
        <h1>WL Task SignUp</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input
            id="name" 
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
            type="text" 
            placeholder="Name"
            {...register("name")}
            />
            <input
                id="email"
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                type="text" 
                placeholder="Email Address" 
            {...register("email", {
                required: "Enter email",
                pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Enter valid email"
                }
            })}
            />
            <span className="mt-10 text-red-600">{errors.email && errors.email.message}</span>
            <input 
            id="phone"
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" 
            type="number" 
            placeholder="Phone Number"
            {...register("phone", { 
                pattern: {
                    value: /^[0-9\b]+$/,
                    message: "Enter valid phone"
                }
            })}
            />
            <span className="mt-10 text-red-600">{errors.phone && errors.phone.message}</span>
            <input
            id="password" 
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" 
            type="password" 
            placeholder="Password"
            {...register("password", {
                required: "Enter password",
                pattern: {
                value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                message: "Password should contain alteast 8characters, 1 number, 1 letter, 1 symbol."
                }
            })} />
            <span className="mt-10 text-red-600">{errors.password && errors.password.message}</span>
            <div className="text-center md:text-left">
            <button disabled={isSubmitting} className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Register {isSubmitting && (<Spinner />)}</button>
            </div>
            <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Already have an account? <Link className="text-red-600 hover:underline hover:underline-offset-4" to="/login">Login</Link>
            </div>
        </form>
      </div>
    </section>
    );
}