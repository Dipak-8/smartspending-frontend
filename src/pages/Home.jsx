
















































// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

//  const Home = () => {

//    const [productLink, setProductLink] = useState("");
//    const [amazonData, setAmazonData] = useState(null);
//     const [flipkartData, setFlipkartData] = useState(null);
//     const [error, setError] = useState(null);


//    const navigate = useNavigate();

//    const handleClick = async () => {
//     if (!productLink.trim()) return;

//     console.log("Sending to backend:", productLink);

//     try {
//       // Send link to backend
//       const res = await axios.post("http://localhost:8000/compare", {
//         url: productLink
//       });


      
//       setAmazonData(res.data.amazon);
//       setFlipkartData(res.data.flipkart);
//       setError(null); 
//       console.log(res.data.productName);
//       console.log(res.data.imageUrl);
//       console.log(res.data.amazon);
//       console.log(res.data.flipkart);
//       console.log(res.data.chart);
//       console.log(res.data.prediction);
  
//       // Navigate to a new page and pass the data as state
//       navigate(`/comparison`, {
//         state: {
//           productTitle: res.data.productName,
//           imageUrl: res.data.imageUrl,
//           amazonData: res.data.amazon,
//           flipkartData: res.data.flipkart,
//           history: res.data.chart,
//           prediction: res.data.prediction,
//         },
//       });
//     } catch (err) {
//       console.error("Failed to fetch comparison data:", err);
//       setError("Failed to fetch product comparison. Please try again.");
//     }
//    }

//    return (
//      <div>
 
//        <div
//          className="h-[480px] flex items-center justify-center bg-cover bg-center"
//         //  style={{
//         //    backgroundImage: `url('https://plus.unsplash.com/premium_photo-1683984171269-04c84ee23234?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fG9ubGluZSUyMHNob3BwaW5nfGVufDB8MHwwfHx8MA%3D%3D')`,
//         //  }}
//        >
 
//          <div className="absolute inset-0"></div>
 
 
//          <div className="relative text-center text-black max-w-4xl mx-auto px-4">
//            <h1 className="text-5xl font-extrabold mb-6">
//              Welcome To Smart Spending
//            </h1>
//            <p className="text-xl text-gray-900 font-bold mb-8">
//              Spot price patterns here, like a shopping Sherlock.
//            </p>
//            <div className="space-x-4">
//              <div className="space-y-6">
//                <a
//                  href="/items"
//                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
//                >
//                  Explore Products
//                </a>
 
//               {/*<-----------SEARCH PRODUCT BY NAME ---------->*/}

//                {/* <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
//                  <input
//                    type="text"
//                    placeholder="Search item by name..."
//                    className="px-4 py-2 w-72 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
//                  />
//                  <button className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition">
//                    Search
//                  </button>
//                </div> */}

//                {/*<-----------SEARCH PRODUCT BY LINK ---------->*/}
 
//                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
//                  <input
//                    type="text"
//                    placeholder="Paste product link..."
//                    className="px-4 py-2 w-72 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-purple-400"
//                    value={productLink}
//                    onChange={(e) => setProductLink(e.target.value)}
//                  />
//                  <button 
//                  className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition"
//                  onClick={handleClick}
//                  >
//                    Search
//                  </button>
//                </div>
//              </div>
 
//            </div>
//          </div>
//        </div>
 
 
//        <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
//          <div className="max-w-4xl mx-auto text-center">
//            <h2 className="text-3xl font-bold text-gray-900 mb-6">
//              Discover More
//            </h2>
//            <p className="text-xl text-gray-600 mb-8">
//              Explore perfect matches for your style and budget, then save smarter with price predictions!
//            </p>
//          </div>
//        </div>
//      </div>
//    );
//  };
 
//  export default Home;


// --------2------------

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [productLink, setProductLink] = useState("");
  const [amazonData, setAmazonData] = useState(null);
  const [flipkartData, setFlipkartData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  const navigate = useNavigate();

  const handleClick = async () => {
    if (!productLink.trim()) return;

    setLoading(true); // Start loading animation
    console.log("Sending to backend:", productLink);

    try {
      // Send link to backend
      const res = await axios.post("http://localhost:8000/compare", {
        url: productLink
      });

      setAmazonData(res.data.amazon);
      setFlipkartData(res.data.flipkart);
      setError(null);
      console.log(res.data.productName);
      console.log(res.data.imageUrl);
      console.log(res.data.amazon);
      console.log(res.data.flipkart);
      console.log(res.data.chart);
      console.log(res.data.prediction);
      console.log(res.data.imageUrl);
      console.log(res.data.sentiment);

      // Navigate to a new page and pass the data as state
      navigate(`/comparison`, {
        state: {
          productTitle: res.data.productName,
          imageUrl: res.data.imageUrl,
          amazonData: res.data.amazon,
          flipkartData: res.data.flipkart,
          history: res.data.chart,
          prediction: res.data.prediction,
          sentiment: res.data.sentiment,
        },
      });
    } catch (err) {
      console.error("Failed to fetch comparison data:", err);
      setError("Failed to fetch product comparison. Please try again.");
    } finally {
      setLoading(false); // Stop loading animation regardless of success or failure
    }
  };

  return (
    <div>
      <div
        className="h-[480px] flex items-center justify-center bg-cover bg-center"
        style={{
          // backgroundImage: `url('https://img.freepik.com/free-photo/paper-bags-different-colors-blue-background-top-view_169016-43755.jpg?semt=ais_hybrid&w=740')`,
        }}
      >
        <div className="absolute inset-0"></div>

        <div className="relative text-center text-black max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-6">
            Welcome To Smart Spending
          </h1>
          <p className="text-xl text-gray-900 font-bold mb-8">
            Spot price patterns here, like a shopping Sherlock.
          </p>
          <div className="space-x-4">
            <div className="space-y-6">
              <a
                href="/items"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Explore Products
              </a>

              {/* SEARCH PRODUCT BY LINK */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <input
                  type="text"
                  placeholder="Paste product link..."
                  className="px-4 py-2 w-72 rounded-md border border-black focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={productLink}
                  onChange={(e) => setProductLink(e.target.value)}
                />
                <button
                  className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition cursor-pointer"
                  onClick={handleClick}
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Discover More
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Explore perfect matches for your style and budget, then save smarter with price predictions!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
