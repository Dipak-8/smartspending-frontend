// import React from "react";
// import { useForm } from "react-hook-form";
// import { FaEnvelope, FaLock } from "react-icons/fa"; 

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data, event) => {
//     event.preventDefault();
//     console.log("Login Data:", data);
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{
//         backgroundImage: `url('https://images.pexels.com/photos/327533/pexels-photo-327533.jpeg?auto=compress&cs=tinysrgb&w=600')`, 
//       }}
//     >
      
//       <div className="absolute inset-0"></div>

      
//       <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative z-10 transform transition-all hover:scale-105">
//         <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
//           Welcome Back!
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
//           <div className="relative">
//             <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="email"
//               placeholder="Email"
//               {...register("email", { required: "Email is required" })}
//               className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

         
//           <div className="relative">
//             <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="password"
//               placeholder="Password"
//               {...register("password", { required: "Password is required" })}
//               className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

          
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Login
//           </button>
//         </form>

        
//         <p className="text-center text-gray-600 mt-6">
//           Don't have an account?{" "}
//           <a
//             href="/register"
//             className="text-blue-600 hover:underline font-semibold"
//           >
//             Register here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const [isLoading, setIsLoading] = useState(false);
//   const [apiError, setApiError] = useState(null);
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     setIsLoading(true);
//     setApiError(null);
    
//     try {
//       const response = await fetch('http://localhost:8000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: data.email,
//           password: data.password
//         }),
//         credentials: 'include'
//       });
      
//       const result = await response.json();
      
//       if (!response.ok) {
//         setApiError(result.message || 'Login failed. Please check your credentials.');
//       } else {
//         console.log('Login successful:', result);
        
//         // Store the token in localStorage for authentication
//         localStorage.setItem('token', result.token);
//         localStorage.setItem('user', JSON.stringify(result.user));
        
//         // Navigate to home page or dashboard
//         navigate('/items');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setApiError('Connection error. Please check your internet connection and try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{
//         backgroundImage: `url('https://images.pexels.com/photos/327533/pexels-photo-327533.jpeg?auto=compress&cs=tinysrgb&w=600')`, 
//       }}
//     >
//       <div className="absolute inset-0"></div>

//       <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative z-10 transform transition-all hover:scale-105">
//         <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
//           Welcome Back!
//         </h2>
        
//         {apiError && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {apiError}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="relative">
//             <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="email"
//               placeholder="Email"
//               {...register("email", { required: "Email is required" })}
//               className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//             )}
//           </div>

//           <div className="relative">
//             <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="password"
//               placeholder="Password"
//               {...register("password", { required: "Password is required" })}
//               className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full ${
//               isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
//             } text-white py-3 rounded-lg transition duration-300 flex items-center justify-center`}
//           >
//             {isLoading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Logging in...
//               </>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>

//         <p className="text-center text-gray-600 mt-6">
//           Don't have an account?{" "}
//           <a
//             href="/register"
//             className="text-blue-600 hover:underline font-semibold"
//           >
//             Register here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
        credentials: 'include'
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        setApiError(result.message || 'Login failed. Please check your credentials.');
      } else {
        console.log('Login successful:', result);
        
        // Store the token in localStorage for authentication
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        // Navigate to home page or dashboard
        navigate('/items');
      }
    } catch (error) {
      console.error('Login error:', error);
      setApiError('Connection error. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OAuth login redirects
  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:8000/api/auth/${provider}`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/327533/pexels-photo-327533.jpeg?auto=compress&cs=tinysrgb&w=600')`, 
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative z-10 transform transition-all hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Welcome Back!
        </h2>
        
        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {apiError}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${
              isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-3 rounded-lg transition duration-300 flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="my-6 flex items-center justify-between">
          <hr className="w-full border-gray-300" />
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <hr className="w-full border-gray-300" />
        </div>
        
        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button
            type="button" 
            onClick={() => handleOAuthLogin('google')}
            className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg transition duration-300 hover:bg-gray-50 flex items-center justify-center shadow-sm"
          >
            <FaGoogle className="text-red-500 mr-2" />
            Continue with Google
          </button>
          
          <button
            type="button"
            onClick={() => handleOAuthLogin('facebook')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg transition duration-300 hover:bg-blue-700 flex items-center justify-center shadow-sm"
          >
            <FaFacebook className="mr-2" />
            Continue with Facebook
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;