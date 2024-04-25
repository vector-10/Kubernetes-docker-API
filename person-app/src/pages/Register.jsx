import React, {useState} from 'react';
import axios from "axios";

const Register = () => {
  const [notification, setNotification] = useState({
    message: "",
    type: ""
  })
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      // mern-auth-app.azurewebsites.net
    //register user function      
  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/user/register', formData);

      if (response.status === 201) {
        //show success message
        setNotification({ message: "User registered successfully", type: "success"})
        console.log('User registered successfully:', response.data.message);
      }
    } catch (error) {
       //show error message
      setNotification({ message: "An error occured, please try again", type: "error"})
      console.error('Error registering user:', error);
    }
  };

    // return jsx
  return (
    <div className ='flex g-6 h-full flex-wrap items-center justify-center'>
        {/* right column container with background */}
        <div>
        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-7/12 xl:w-7/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
        </div>
        {/* Left column container with background */}
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-1">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="company logo"/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Create an Account</h2>
        </div>
        {/* form section begins */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6"  onSubmit={registerUser}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Full Name</label>
                <div className="mt-2">
                <input 
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>
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
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>            
            {/* form section ends  */}
            <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
            </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-300">
            Already Have An Account?
            <a href="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Click Here to Sign In</a>
            </p>
            {/* Notifications */}
              {notification.message && (
                <div className={`mt-4 ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} px-4 py-2 rounded`}>
                  {notification.message}
                </div>
              )}
        </div>
        </div>
    </div>
  )
}

export default Register