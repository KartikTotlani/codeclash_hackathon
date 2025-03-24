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

  const fakePacketData = [
    { timestamp: 1742757312.328733, src_ip: "192.168.1.100", dst_ip: "192.168.1.101", protocol: 6, tcp_flags: "PA" },
    { timestamp: 1742757313.543823, src_ip: "192.168.1.102", dst_ip: "192.168.1.103", protocol: 17, tcp_flags: "S" },
    { timestamp: 1742757314.768932, src_ip: "192.168.1.104", dst_ip: "192.168.1.105", protocol: 6, tcp_flags: "FA" },
    { timestamp: 1742757315.983741, src_ip: "192.168.1.106", dst_ip: "192.168.1.107", protocol: 1, tcp_flags: "P" },
    { timestamp: 1742757317.193752, src_ip: "192.168.1.108", dst_ip: "192.168.1.109", protocol: 6, tcp_flags: "A" },
    { timestamp: 1742757318.328912, src_ip: "192.168.1.110", dst_ip: "192.168.1.111", protocol: 17, tcp_flags: "R" },
    { timestamp: 1742757319.473829, src_ip: "192.168.1.112", dst_ip: "192.168.1.113", protocol: 6, tcp_flags: "SA" },
    { timestamp: 1742757320.587392, src_ip: "192.168.1.114", dst_ip: "192.168.1.115", protocol: 1, tcp_flags: "S" },
    { timestamp: 1742757321.693749, src_ip: "192.168.1.116", dst_ip: "192.168.1.117", protocol: 6, tcp_flags: "P" },
    { timestamp: 1742757322.798374, src_ip: "192.168.1.118", dst_ip: "192.168.1.119", protocol: 17, tcp_flags: "A" },
  ];

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

      <div className="mb-8 border-0 shadow-sm bg-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${d?.prediction === 1 ? "bg-red-50" : "bg-green-50"}`}
            >
              {d?.prediction === 1 ? (
                <span className="material-icons text-red-500 text-4xl">err</span>
              ) : (
                <span className="material-icons text-green-500 text-4xl">ok</span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{d?.prediction === 1 ? "Anomaly Detected" : "System Normal"}</h2>
              <p className="text-gray-500">Prediction score: {d?.prediction}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="material-icons"></span>
              Investigate
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <span className="material-icons"></span>
              Mitigate Threat
            </button>
          </div>
        </div>
      </div>

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

       <div className="mb-8 border-0 shadow-sm bg-white rounded-lg p-6 my-10">
        <h2 className="text-2xl font-bold text-gray-900">Captured Packets Logs</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fakePacketData.map((packet, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-md">
              <p className="text-gray-700 font-semibold">Packet {index + 1}</p>
              <p className="text-sm text-gray-500">Timestamp: {packet.timestamp}</p>
              <p className="text-sm text-gray-500">Source IP: {packet.src_ip}</p>
              <p className="text-sm text-gray-500">Destination IP: {packet.dst_ip}</p>
              <p className="text-sm text-gray-500">Protocol: {packet.protocol}</p>
              <p className="text-sm text-gray-500">TCP Flags: {packet.tcp_flags}</p>
            </div>
          ))}
        </div>
        </div>
    </div>
    
  );
}
