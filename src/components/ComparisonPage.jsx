// import React from "react";
// import { useLocation } from "react-router-dom";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from "recharts";
// import Skeleton from "react-loading-skeleton";
// import 'react-loading-skeleton/dist/skeleton.css';

// const ComparisonPage = () => {
//   const location = useLocation();
//   const { productTitle, imageUrl, amazonData, flipkartData, history, prediction } = location.state || {};

//   // Debug logging
//   console.log("comparisonPage.jsx: Chart data", { history, prediction });

//   // Process chart data
//   const formattedHistory = (history?.data || []).map((point) => ({
//     date: point.x,
//     history: point.y,
//   }));

//   const formattedPrediction = (prediction || []).map((point) => ({
//     date: point.date,
//     prediction: point.price,
//   }));

//   // Combine into one array, matching dates for chart
//   const chartDataMap = new Map();
//   formattedHistory.forEach((item) => {
//     chartDataMap.set(item.date, { date: item.date, history: item.history });
//   });
//   formattedPrediction.forEach((item) => {
//     const existing = chartDataMap.get(item.date) || { date: item.date };
//     chartDataMap.set(item.date, { ...existing, prediction: item.prediction });
//   });
//   const mergedChartData = Array.from(chartDataMap.values()).sort((a, b) =>
//     new Date(a.date) - new Date(b.date)
//   );

//   console.log("comparisonPage.jsx: mergedChartData", mergedChartData);

//   // Calculate price metrics
//   const allPrices = mergedChartData.flatMap((d) => [d.history, d.prediction].filter(Boolean));
//   const lowestPrice = allPrices.length ? Math.min(...allPrices) : 0;
//   const highestPrice = allPrices.length ? Math.max(...allPrices) : 0;
//   const averagePrice = allPrices.length ? allPrices.reduce((sum, val) => sum + val, 0) / allPrices.length : 0;

//   // Extract latest price and date for summary
//   const latestHistory = history?.data?.length > 0 ? history.data[history.data.length - 1].y : 0;
//   const latestDate = history?.data?.length > 0 ? history.data[history.data.length - 1].x : new Date().toISOString().split('T')[0];

//   const predictedPrices = prediction?.map(item => item.price) || [];
//   const minPredictedPrice = predictedPrices.length ? Math.min(...predictedPrices) : 0;
//   const maxPredictedPrice = predictedPrices.length ? Math.max(...predictedPrices) : 0;
//   const avgPredictedPrice = predictedPrices.length ? (minPredictedPrice + maxPredictedPrice) / 2 : 0;

//   const percentageChange = latestHistory ? ((avgPredictedPrice - latestHistory) / latestHistory * 100).toFixed(2) : 0;
//   const trendColor = percentageChange < 0 ? "#22c55e" : "#ef4444";
//   const recommendation = percentageChange < 0
//     ? `Wait ${Math.ceil((new Date(prediction?.[0]?.date || latestDate) - new Date(latestDate)) / (1000 * 60 * 60 * 24))} days - Price may drop by ${Math.abs(percentageChange)}%`
//     : `Buy Now - Price may rise by ${percentageChange}%`;
//   const summaryBgColor = percentageChange < 0 ? "#d1fae5" : "#fee2e2";

//   return (
//     <div className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden max-w-6xl mx-auto p-6 mt-20 space-y-8">
//       {/* Top Section: Product Comparison */}
//       <div className="flex flex-col md:flex-row">
//         {/* Left: Product Image */}
//         <div className="md:w-1/2 flex justify-center items-center">
//           {imageUrl ? (
//             <img
//               src={imageUrl}
//               className="w-80 h-80 object-contain"
//               alt="Product"
//             />
//           ) : (
//             <Skeleton width={320} height={320} />
//           )}
//         </div>

//         {/* Right: Product Info */}
//         <div className="md:w-1/2 flex flex-col justify-between p-4 space-y-6">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             {productTitle || <Skeleton width={300} />}
//           </h2>

//           {/* Flipkart */}
//           <div className="flex items-center justify-between border border-blue-300 rounded-xl p-4 mb-4">
//             <div className="flex items-center space-x-3">
//               <img
//                 src="https://logowik.com/content/uploads/images/flipkart.jpg"
//                 alt="Flipkart"
//                 className="w-19 h-19 object-contain"
//               />
//               <span className="text-2xl font-semibold text-blue-700">
//                 {flipkartData?.price || <Skeleton width={100} />}
//               </span>
//             </div>
//             {flipkartData?.url ? (
//               <a
//                 href={flipkartData.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
//               >
//                 Buy
//               </a>
//             ) : (
//               <Skeleton width={80} height={40} />
//             )}
//           </div>

//           {/* Amazon */}
//           <div className="flex items-center justify-between border border-yellow-400 rounded-xl p-4">
//             <div className="flex items-center space-x-3">
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
//                 alt="Amazon"
//                 className="w-18 h-18 object-contain mt-3"
//               />
//               <span className="text-2xl font-semibold text-yellow-700">
//                 {amazonData?.price || <Skeleton width={100} />}
//               </span>
//             </div>
//             {amazonData?.url ? (
//               <a
//                 href={amazonData.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-800"
//               >
//                 Buy
//               </a>
//             ) : (
//               <Skeleton width={80} height={40} />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Graph Section */}
//       <div className="w-full">
//         <h3 className="text-xl font-bold text-gray-800 mb-4">Price Trend</h3>
//         {mergedChartData.length > 0 ? (
//           <>
//             <div className="flex flex-wrap justify-between items-center text-sm text-gray-700 mb-4">
//               <div>
//                 <strong>Lowest Price:</strong> ₹{lowestPrice.toFixed(2)}
//               </div>
//               <div>
//                 <strong>Average Price:</strong> ₹{averagePrice.toFixed(2)}
//               </div>
//               <div>
//                 <strong>Highest Price:</strong> ₹{highestPrice.toFixed(2)}
//               </div>
//             </div>
//             <ResponsiveContainer width="100%" height={400}>
//               <LineChart data={mergedChartData} style={{ backgroundColor: "#F8F8FF" }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} />
//                 <Tooltip />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="history"
//                   stroke="#1f2937"
//                   strokeWidth={2}
//                   name="Historical Price"
//                   dot={false}
//                   activeDot={{ r: 5, stroke: "#1f2937", strokeWidth: 2, fill: "white" }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="prediction"
//                   stroke="#3b82f6"
//                   strokeDasharray="5 5"
//                   strokeWidth={2}
//                   name="Predicted Price"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </>
//         ) : (
//           <div className="text-center text-gray-600">
//             <p>Price trend data unavailable</p>
//             <Skeleton height={400} />
//           </div>
//         )}
//       </div>

//       {/* Price Forecast Summary */}
//       {prediction && prediction.length > 0 ? (
//         <div className="w-full p-6 rounded-xl" style={{ backgroundColor: summaryBgColor }}>
//           <h3 className="text-xl font-bold text-gray-800 mb-4">Price Forecast Summary</h3>
//           <div className="flex flex-col items-center">
//             <div className="w-full max-w-4xl text-center space-y-2">
//               <p className="text-lg">1 Month Forecast: (₹{minPredictedPrice.toFixed(2)} - ₹{maxPredictedPrice.toFixed(2)})</p>
//               <p className="text-xl font-semibold" style={{ color: trendColor }}>
//                 {recommendation}
//               </p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center text-gray-600">
//           <p>Price forecast unavailable</p>
//           <Skeleton height={150} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ComparisonPage;





















// import React from "react";
// import { useLocation } from "react-router-dom";

// const ComparisonPage = () => {
//   const location = useLocation();
//   const { amazonData, flipkartData, history, prediction } = location.state || {};

//   // return (
//   //   <div className="comparison-page">
//   //     <h2 className="text-2xl font-bold">Price Comparison</h2>

//   //     {amazonData && (
//   //       <div>
//   //         <h3 className="text-xl font-bold pt-5">Amazon Price: {amazonData.price}</h3>
//   //         <a href={amazonData.url} target="_blank" rel="noopener noreferrer">
//   //           View on Amazon
//   //         </a>
//   //       </div>
//   //     )}

//   //     {flipkartData && (
//   //       <div>
//   //         <h3 className="text-xl font-bold">Flipkart Price: {flipkartData.price}</h3>
//   //         <a href={flipkartData.url} target="_blank" rel="noopener noreferrer">
//   //           View on Flipkart
//   //         </a>
//   //       </div>
//   //     )}
//   //     {/* {history && Array.isArray(history.data) && (
//   //       <div>
//   //         <h3>Price History:</h3>
//   //         <ul className="list-disc ml-5">
//   //           {history.data.map((point, idx) => (
//   //             <li key={idx}>
//   //               x: {point.x}, y: {point.y}
//   //             </li>
//   //           ))}
//   //         </ul>
//   //       </div>
//   //     )}

//   //     {prediction && Array.isArray(prediction) && (
//   //       <div>
//   //         <h3>Prediction:</h3>
//   //         <ul className="list-disc ml-5">
//   //           {prediction.map((point, idx) => (
//   //             <li key={idx}>
//   //               x: {point.date}, y: {point.price}
//   //             </li>
//   //           ))}
//   //         </ul>
//   //       </div>
//   //     )} */}
//   //   </div>
//   // );

//   return (
//     <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto p-4 mt-20">
      
//       {/* Left: Product Image */}
//       <div className="md:w-1/2 flex justify-center items-center p-4">
//         <img src="https://m.media-amazon.com/images/I/81nJiu51M+L._SX679_.jpg" className="w-70 h-70 object-contain" />
//       </div>

//       {/* Right: Product Info */}
//       <div className="md:w-1/2 flex flex-col justify-between p-4 space-y-6">
//         <div>
//           <h2 className="text-2xl font-medium text-gray-800 mb-4">
//           Samsung Galaxy M35 5G (Daybreak Blue,8GB RAM,256GB Storage)| Corning Gorilla Glass Victus+| AnTuTu Score 595K+ | Vapour Cooling Chamber | 6000mAh Battery | 120Hz Super AMOLED Display| Without Charger
//           </h2>

//           {/* Flipkart Box */}
//           <div className="flex items-center justify-between border border-blue-300 rounded-xl p-4 mb-4">
//             <div className="flex items-center space-x-3">
//               <img src="https://logowik.com/content/uploads/images/flipkart.jpg" alt="Flipkart" className="w-10 h-10 object-contain" />
//               <span className="text-lg font-semibold text-blue-700">
//                 {flipkartData?.price || "N/A"}
//               </span>
//             </div>
//             {flipkartData?.url && (
//               <a
//                 href={flipkartData.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
//               >
//                 Buy
//               </a>
//             )}
//           </div>

//           {/* Amazon Box */}
//           <div className="flex items-center justify-between border border-yellow-400 rounded-xl p-4">
//             <div className="flex items-center space-x-3">
//               <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="w-10 h-10 object-contain" />
//               <span className="text-lg font-semibold text-yellow-700">
//                 {amazonData?.price || "N/A"}
//               </span>
//             </div>
//             {amazonData?.url && (
//               <a
//                 href={amazonData.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-800"
//               >
//                 Buy
//               </a>
//             )}
//           </div>
//         </div>
//       </div>

//       <div>
//         {history && Array.isArray(history.data) && (
//           <div>
//             <h3>Price History:</h3>
//               <ul className="list-disc ml-5">
//                 {history.data.map((point, idx) => (
//                   <li key={idx}>
//                 x: {point.x}, y: {point.y}
//                   </li>
//                 ))}
//               </ul>
//           </div>
//         )}
//       </div>
//       <div>
//         {prediction && Array.isArray(history.data) && (
//             <div>
//               <h3>Price Prediction:</h3>
//                 <ul className="list-disc ml-5">
//                   {prediction.map((point, idx) => (
//                     <li key={idx}>
//                   x: {point.date}, y: {point.price}
//                     </li>
//                   ))}
//                 </ul>
//             </div>
//           )}
//       </div>
//     </div>
//   );

// };

// export default ComparisonPage;

// ------------------2----------------
// import React from "react";
// import { useLocation } from "react-router-dom";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   CartesianGrid,
// } from "recharts";

// const ComparisonPage = () => {
//   const location = useLocation();
//   const { productTitle, imageUrl, amazonData, flipkartData, history, prediction } = location.state || {};

//   // Merge and label history & prediction data
//   const formattedHistory = (history?.data || []).map((point) => ({
//     date: point.x,
//     history: point.y,
//   }));

//   const formattedPrediction = (prediction || []).map((point) => ({
//     date: point.date,
//     prediction: point.price,
//   }));

//   // Combine into one array, matching dates for chart
//   const chartDataMap = new Map();

//   formattedHistory.forEach((item) => {
//     chartDataMap.set(item.date, { date: item.date, history: item.history });
//   });

//   formattedPrediction.forEach((item) => {
//     const existing = chartDataMap.get(item.date) || { date: item.date };
//     chartDataMap.set(item.date, { ...existing, prediction: item.prediction });
//   });

//   const mergedChartData = Array.from(chartDataMap.values()).sort((a, b) =>
//     new Date(a.date) - new Date(b.date)
//   );

//   const allPrices = mergedChartData.flatMap((d) => [d.history, d.prediction].filter(Boolean));

//   const lowestPrice = Math.min(...allPrices);
//   const highestPrice = Math.max(...allPrices);
//   const averagePrice = allPrices.reduce((sum, val) => sum + val, 0) / allPrices.length;


//   return (
//     <div className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden max-w-6xl mx-auto p-6 mt-20 space-y-8">
//       {/* Top Section: Product Comparison */}
//       <div className="flex flex-col md:flex-row">
//         {/* Left: Product Image */}
//         <div className="md:w-1/2 flex justify-center items-center p-4">
//           <img
//             src={imageUrl}
//             className="w-72 h-72 object-contain"
//             alt="Product"
//           />
//         </div>

//         {/* Right: Product Info */}
//         <div className="md:w-1/2 flex flex-col justify-between p-4 space-y-6">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             {productTitle}
//           </h2>

//           {/* Flipkart */}
//           <div className="flex items-center justify-between border border-blue-300 rounded-xl p-4 mb-4">
//             <div className="flex items-center space-x-3">
//               <img
//                 src="https://logowik.com/content/uploads/images/flipkart.jpg"
//                 alt="Flipkart"
//                 className="w-19 h-19 object-contain"
//               />
//               <span className="text-2xl font-semibold text-blue-700">
//                 {flipkartData?.price || "N/A"}
//               </span>
//             </div>
//             {flipkartData?.url && (
//               <a
//                 href={flipkartData.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
//               >
//                 Buy
//               </a>
//             )}
//           </div>

//           {/* Amazon */}
//           <div className="flex items-center justify-between border border-yellow-400 rounded-xl p-4">
//             <div className="flex items-center space-x-3">
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
//                 alt="Amazon"
//                 className="w-18 h-18 object-contain mt-3"
//               />
//               <span className="text-2xl font-semibold text-yellow-700">
//                 {amazonData?.price || "N/A"}
//               </span>
//             </div>
//             {amazonData?.url && (
//               <a
//                 href={amazonData.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-800"
//               >
//                 Buy
//               </a>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Graph Section */}
//       <div className="w-full">
//         <h3 className="text-xl font-bold text-gray-800 mb-4">Price Trend</h3>
//         <div className="flex flex-wrap justify-between items-center text-sm text-gray-700 mb-4">
//           <div>
//             <strong>Lowest Price:</strong> ₹{lowestPrice.toFixed(2)}
//           </div>
//           <div>
//             <strong>Average Price:</strong> ₹{averagePrice.toFixed(2)}
//           </div>
//           <div>
//             <strong>Highest Price:</strong> ₹{highestPrice.toFixed(2)}
//           </div>
//         </div>

//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={mergedChartData} style={{ backgroundColor: "#F8F8FF" }}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//             <YAxis tick={{ fontSize: 12 }} />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="history" stroke="#1f2937" strokeWidth={2} name="Historical Price" />
//             <Line type="monotone" dataKey="prediction" stroke="#3b82f6" strokeDasharray="5 5" strokeWidth={2} name="Predicted Price" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default ComparisonPage;



// ---------3------------------

// 



import React from "react";
import { useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const ComparisonPage = () => {
  const location = useLocation();
  const {
    productTitle,
    imageUrl,
    amazonData,
    flipkartData,
    history,
    prediction,
    sentiment, // ✅ Extract sentiment data
  } = location.state || {};

  // Helper function to calculate overall sentiment
const getOverallSentiment = (sentimentData) => {
  if (!sentimentData) return null;
  const { Positive = 0, Neutral = 0, Negative = 0 } = sentimentData;
  if (Positive >= Neutral && Positive >= Negative) return "Positive";
  if (Neutral >= Positive && Neutral >= Negative) return "Neutral";
  return "Negative";
};

const overallSentiment = getOverallSentiment(sentiment);


  // Format price history & prediction for chart
  const formattedHistory = (history?.data || []).map((point) => ({
    date: point.x,
    history: point.y,
  }));

  const formattedPrediction = (prediction || []).map((point) => ({
    date: point.date,
    prediction: point.price,
  }));

  const chartDataMap = new Map();
  formattedHistory.forEach((item) =>
    chartDataMap.set(item.date, { date: item.date, history: item.history })
  );
  formattedPrediction.forEach((item) => {
    const existing = chartDataMap.get(item.date) || { date: item.date };
    chartDataMap.set(item.date, { ...existing, prediction: item.prediction });
  });

  const mergedChartData = Array.from(chartDataMap.values()).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const allPrices = mergedChartData.flatMap((d) =>
    [d.history, d.prediction].filter(Boolean)
  );
  const lowestPrice = Math.min(...allPrices);
  const highestPrice = Math.max(...allPrices);
  const averagePrice =
    allPrices.reduce((sum, val) => sum + val, 0) / allPrices.length;

  const latestHistory =
    history?.data?.length > 0
      ? history.data[history.data.length - 1].y
      : 29990;
  const latestDate =
    history?.data?.length > 0
      ? history.data[history.data.length - 1].x
      : "2025-04-18";

  const predictedPrices = prediction?.map((item) => item.price) || [];
  const minPredictedPrice = Math.min(...predictedPrices);
  const maxPredictedPrice = Math.max(...predictedPrices);
  const avgPredictedPrice = (minPredictedPrice + maxPredictedPrice) / 2;

  const percentageChange = (
    ((avgPredictedPrice - latestHistory) / latestHistory) *
    100
  ).toFixed(2);
  const trendColor = percentageChange < 0 ? "#22c55e" : "#ef4444";
  const recommendation =
    percentageChange < 0
      ? `Wait ${Math.ceil(
          (new Date(prediction[0].date) - new Date(latestDate)) /
            (1000 * 60 * 60 * 24)
        )} days - Price may drop by ${Math.abs(percentageChange)}%`
      : `Buy Now - Price may rise by ${percentageChange}%`;
  const summaryBgColor = percentageChange < 0 ? "#d1fae5" : "#fee2e2";

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden max-w-6xl mx-auto p-6 mt-20 space-y-8">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={imageUrl}
            className="w-80 h-80 object-contain"
            alt="Product"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-between p-4 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {productTitle}
          </h2>

          {/* Flipkart */}
          <div className="flex items-center justify-between border border-blue-300 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://logowik.com/content/uploads/images/flipkart.jpg"
                alt="Flipkart"
                className="w-19 h-19 object-contain"
              />
              <span className="text-2xl font-semibold text-blue-700">
                {flipkartData?.price || "N/A"}
              </span>
            </div>
            {flipkartData?.url && (
              <a
                href={flipkartData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
              >
                Buy
              </a>
            )}
          </div>

          {/* Amazon */}
          <div className="flex items-center justify-between border border-yellow-400 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
                className="w-18 h-18 object-contain mt-3"
              />
              <span className="text-2xl font-semibold text-yellow-700">
                {amazonData?.price || "N/A"}
              </span>
            </div>
            {amazonData?.url && (
              <a
                href={amazonData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-800"
              >
                Buy
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Price Trend Graph */}
      <div className="w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Price Trend</h3>
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-700 mb-4">
          <div>
            <strong>Lowest Price:</strong> ₹{lowestPrice.toFixed(2)}
          </div>
          <div>
            <strong>Average Price:</strong> ₹{averagePrice.toFixed(2)}
          </div>
          <div>
            <strong>Highest Price:</strong> ₹{highestPrice.toFixed(2)}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={mergedChartData} style={{ backgroundColor: "#F8F8FF" }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="history" stroke="#1f2937" strokeWidth={2} name="Historical Price" dot={false} activeDot={{ r: 5, stroke: "#1f2937", strokeWidth: 2, fill: "white" }} />
            <Line type="monotone" dataKey="prediction" stroke="#3b82f6" strokeDasharray="5 5" strokeWidth={2} name="Predicted Price" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Forecast Summary */}
      <div className="w-full p-6 rounded-xl" style={{ backgroundColor: summaryBgColor }}>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Price Forecast Summary</h3>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl text-center space-y-2">
            <p className="text-lg">1 Month Forecast: (₹{minPredictedPrice.toFixed(2)} - ₹{maxPredictedPrice.toFixed(2)})</p>
            <p className="text-xl font-semibold" style={{ color: trendColor }}>
              {recommendation}
            </p>
          </div>
        </div>
      </div>

      {/* Sentiment Analysis Section */}
              {sentiment && (
  <div className="w-full bg-gray-50 p-6 rounded-xl shadow-inner">
    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">User Sentiment Analysis</h3>

    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl text-center space-y-4">
        <p className="text-lg">
          <strong>Overall Sentiment:</strong>{" "}
          <span
            className={`font-semibold ${
              overallSentiment === "Positive"
                ? "text-green-600"
                : sentiment.overall === "Neutral"
                ? "text-yellow-500"
                : "text-red-600"
            }`}
          >
            {overallSentiment}
          </span>
        </p>

        <ul className="text-lg space-y-2 text-gray-900">
          <li>👍 Positive: {(sentiment?.Positive).toFixed(1)}%</li>
          <li>😐 Neutral: {(sentiment?.Neutral).toFixed(1)}%</li>
          <li>👎 Negative: {(sentiment?.Negative).toFixed(1)}%</li>
        </ul>

        
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ComparisonPage;
