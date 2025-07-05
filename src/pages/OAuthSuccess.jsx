import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // Save the token and redirect
      localStorage.setItem("token", token);
      
      // Try to get user data from the token
      try {
        const parts = token.split(".");
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          if (payload.id) {
            // Create a minimal user object from token
            const user = {
              _id: payload.id,
              email: payload.email
            };
            localStorage.setItem("user", JSON.stringify(user));
          }
        }
      } catch (error) {
        console.error("Error parsing token:", error);
      }
      
      // Redirect to items page
      navigate("/items");
    } else {
      // No token found, redirect back to login
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Authentication Successful</h2>
        <div className="flex justify-center mb-4">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-gray-600">Please wait while we redirect you...</p>
      </div>
    </div>
  );
};

export default OAuthSuccess;