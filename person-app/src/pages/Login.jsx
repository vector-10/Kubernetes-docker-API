import React, { useState } from 'react';
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })  
    }
      
    //login form with usestate
    const loginUser = async (event) => {
        event.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:4000/api/v1/user/login', formData);
    
          if (response.status === 201) {
            console.log('User logged in successfully:', response.data.message);
            // Redirect or show success message
          } else {
            console.error('Login failed:', response.data.message);
            // Show error message to the user
          }
    
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-1">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="company logo"/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
        </div>

        {/* form section begins */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={loginUser}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email address</label>
                <div className="mt-2">
                <input 
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Password</label>
                <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
                </div>
                <div className="mt-2">
                <input 
                id="password" 
                name="password" 
                type="password" 
                value={formData.password}
                    onChange={handleChange}
                autoComplete="current-password" 
                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            
            {/* form section ends  */}
            <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-300">
            Don't Have An Account?
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Click Here to Register</a>
            </p>
        </div>
        </div>  
  )
}

export default Login