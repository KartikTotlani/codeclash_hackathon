import { useEffect, useState } from "react";
import axios from "axios";
import db from "../assets/db.png";

export default function Dashboard() {
  const [d, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/predict");
      setInfo(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const formattedDate = new Date().toLocaleDateString();
  const formattedTime = new Date().toLocaleTimeString();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-4">
      <header className="mb-8 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Network Analysis Dashboard
            </h1>
            <p className="text-gray-500">
              {formattedDate} • {formattedTime}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="material-icons">
                <img src={db} alt="" className="h-5 w-5" />
              </span>
              Export Data
            </button>
          </div>
        </div>
      </header>

      <div className="border-0 shadow-sm bg-white rounded-lg p-4">
        <div className="mb-2">
          <h2 className="text-lg font-semibold">Raw Data Values</h2>
          <p className="text-sm text-gray-500">
            Complete dataset with original values
          </p>
        </div>

        {/* Show loading while data is being fetched */}
        {loading ? (
          <p className="text-gray-500">Loading data...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(d?.row || {}).map(([key, value]) => (
              <div key={key} className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500">{key}</div>
                <div className="text-sm font-medium">
                  {typeof value === "number" ? value.toFixed(4) : value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
