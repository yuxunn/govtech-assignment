import { useState } from "react";
import API_BASE_URL from "./config";


const App = () => {
  const [staffPassId, setStaffPassId] = useState("");
  const [message, setMessage] = useState("");

  const redeemGift = async () => {
    if (!staffPassId) {
      setMessage("❌ Please enter a valid Staff ID.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/redeem/${staffPassId}`);
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("❌ Server error. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">GovWallet Redemption</h2>
        <input
          type="text"
          placeholder="Enter Staff ID"
          value={staffPassId}
          onChange={(e) => setStaffPassId(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full mb-4"
        />
        <button
          onClick={redeemGift}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Check & Redeem
        </button>
        {message && <p className="mt-4 text-gray-800">{message}</p>}
      </div>
    </div>
  );
};

export default App;
