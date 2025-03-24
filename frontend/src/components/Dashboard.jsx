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
  ];

  return (
    <div className="min-h-screen bg-[#141928] text-white p-4">
      <header className="mb-8 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Network Analysis Dashboard
            </h1>
            <p className="text-gray-400">
              {formattedDate} • {formattedTime}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="border border-gray-600 text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <img src={db} alt="" className="h-5 w-5" />
              Export Data
            </button>
          </div>
        </div>
      </header>

      <div className="mb-8 bg-[#1e2533] border border-gray-700 shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${d?.prediction === 1 ? "bg-red-800" : "bg-green-800"}`}>
              {d?.prediction === 1 ? (
                <span className="material-icons text-red-400 text-1xl">error</span>
              ) : (
                <span className="material-icons text-green-400 text-1xl">check</span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{d?.prediction === 1 ? "Anomaly Detected" : "System Normal"}</h2>
              <p className="text-gray-400">Prediction score: {d?.prediction}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="border border-gray-600 px-4 py-2 rounded-lg text-gray-300">
              Investigate
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg">
              Mitigate Threat
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#1e2533] border border-gray-700 shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold">Raw Data Values</h2>
        <p className="text-sm text-gray-400">Complete dataset with original values</p>

        {loading ? (
          <p className="text-gray-400">Loading data...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {Object.entries(d?.row || {}).map(([key, value]) => (
              <div key={key} className="p-3 bg-gray-700 rounded-lg">
                <div className="text-xs text-gray-300">{key}</div>
                <div className="text-sm font-medium text-white">
                  {typeof value === "number" ? value.toFixed(4) : value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8 bg-[#1e2533] border border-gray-700 shadow-lg rounded-lg p-6 my-10">
        <h2 className="text-2xl font-bold">Captured Packets Logs</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fakePacketData.map((packet, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-lg shadow-md">
              <p className="text-white font-semibold">Packet {index + 1}</p>
              <p className="text-sm text-gray-300">Timestamp: {packet.timestamp}</p>
              <p className="text-sm text-gray-300">Source IP: {packet.src_ip}</p>
              <p className="text-sm text-gray-300">Destination IP: {packet.dst_ip}</p>
              <p className="text-sm text-gray-300">Protocol: {packet.protocol}</p>
              <p className="text-sm text-gray-300">TCP Flags: {packet.tcp_flags}</p>
            </div>
          ))}
        </div>
      </div>

    <SecureApp/>

    </div>
  );
}



function SecureApp() {
  const [fileGenerated, setFileGenerated] = useState(false);


  // Function to create and download the file
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([securityScript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "security_check.sh";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setFileGenerated(true);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center text-white p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-400">
        🔒 Secure Your Application
      </h1>
      <p className="text-gray-400 text-lg mb-8 text-center max-w-xl">
        In today's world, security is not a luxury — it's a necessity.  
        Download this script to check **open ports**, **packet statistics**, and **firewall status** to protect your system from vulnerabilities.
      </p>


        
        <a
        href="/PacketMonitor.exe" // Path to your .exe file in the public folder
        download="PacketMonitor.exe" // This sets the download filename
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg font-semibold text-xl transition-all"
      >⬇️ Download Security Application</a>
      

      {fileGenerated && (
        <p className="mt-4 text-green-400 font-medium">
          ✅ File "security_check.sh" has been downloaded.
        </p>
      )}
    </div>
  );
}

