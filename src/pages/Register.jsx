// import React from "react";
// import { useForm } from "react-hook-form";
// import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data, event) => {
//     event.preventDefault();
//     console.log("Registration Data:", data);
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{
//         backgroundImage: `url('https://images.unsplash.com/photo-1495578942200-c5f5d2137def?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhbGx8ZW58MHx8MHx8fDA%3D')`,
//       }}
//     >
     
//       <div className="absolute inset-0"></div>

     
//       <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative z-10 transform transition-all hover:scale-105">
//         <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
//           Create an Account
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
//           <div className="relative">
//             <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Full Name"
//               {...register("name", { required: "Full Name is required" })}
//               className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//             )}
//           </div>

          
//           <div className="relative">
//             <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="email"
//               placeholder="Email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: "Invalid email address",
//                 },
//               })}
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
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters",
//                 },
//               })}
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
//             Register
//           </button>
//         </form>

        
//         <p className="text-center text-gray-600 mt-6">
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className="text-blue-600 hover:underline font-semibold"
//           >
//             Login here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          fullName: data.name, 
          password: data.password
        }),
        credentials: 'include' 
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        setApiError(result.message || 'Registration failed. Please try again.');
      } else {
        console.log('Registration successful:', result);
        // Navigate to login after successful registration
        navigate('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setApiError('Connection error. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1495578942200-c5f5d2137def?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdhbGx8ZW58MHx8MHx8fDA%3D')`,
      }}
    >
      <div className="absolute inset-0"></div>

      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative z-10 transform transition-all hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Create an Account
        </h2>
        
        {apiError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {apiError}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Full Name is required" })}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
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
                  message: "Password must be at least 6 characters",
                },
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
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;