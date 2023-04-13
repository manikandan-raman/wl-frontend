import React, { useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
export const User = () => {
    
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('wl_user_token');
        navigate('/login');
    };
    useEffect(()=>{
        if(!localStorage.getItem("wl_user_token")){
            logout();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    const {state} = useLocation();
    if(!state || !localStorage.getItem('wl_user_token')) {
        navigate('/login');
    }

    console.log({state});
    const {name, email, phone} = state?.user;
    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="text-xl mb-2">Name: {name}</div>
                <div className="text-xl mb-2">Email: {email}</div>
                <div className="text-xl mb-2">Phone: {phone}</div>
            </div>
            <div className="flex justify-center px-6 pt-4 pb-2">
                <button className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="button" onClick={logout}>Logout</button>
            </div>
        </div>
    </section>
    );
}