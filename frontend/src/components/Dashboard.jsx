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


  const [fakePacketData, setPacketData] = useState([]);

  useEffect(() => {
    generatePacketData();
  }, []);

  // Function to generate random packet data
  function generatePacketData() {
    const protocols = [6, 17, 1]; // 6: TCP, 17: UDP, 1: ICMP
    const flags = ["S", "A", "P", "F", "PA", "FA", "R"];
    
    const newData = Array.from({ length: 5 }, () => ({
      timestamp: Date.now() / 1000,
      src_ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      dst_ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      protocol: protocols[Math.floor(Math.random() * protocols.length)],
      tcp_flags: flags[Math.floor(Math.random() * flags.length)],
    }));

    setPacketData(newData);
  }



  const formattedDate = new Date().toLocaleDateString();
  const formattedTime = new Date().toLocaleTimeString();

  // Map for full forms of abbreviations
  const fieldDescriptions = {
    ct_dst_ltm: "Count of Destination Connections in Last 2 Minutes",
    ct_state_ttl: "Count of State Transitions for Same IP and TTL",
    dload: "Download Traffic Rate (Bytes per Second)",
    sload: "Upload Traffic Rate (Bytes per Second)",
    ct_dst_src_ltm: "Count of Unique IP Pairs in Last 2 Minutes",
    sttl: "Source to Destination Time to Live (TTL)",
    dpkts: "Number of Packets Sent by Destination",
    rate: "Packet Rate per Second",
    sinpkt: "Average Time Interval Between Packets Sent by Source",
    ct_dst_sport_ltm: "Count of Destination Ports in Last 2 Minutes",
    ct_srv_dst: "Count of Services Accessed by Destination",
    dmean: "Mean of Bytes per Packet Sent by Destination",
    ct_srv_src: "Count of Services Accessed by Source",
    state_INT: "Internal State of the Connection (e.g., INT)"
  };

  return (
    <div className="min-h-screen bg-[#141928] text-white p-4">

      <Navbar/>

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
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                d?.prediction === 1 ? "bg-red-800" : "bg-green-800"
              }`}
            >
              {d?.prediction === 1 ? (
                <span className="material-icons text-red-400 text-xl">
                  error
                </span>
              ) : (
                <span className="material-icons text-green-400 text-xl">
                  check
                </span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {d?.prediction === 1 ? "Anomaly Detected" : "System Normal"}
              </h2>
              <p className="text-gray-400">
                Prediction score: {d?.prediction}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Raw Data Section */}
      <div className="bg-[#1e2533] border border-gray-700 shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold">Detailed Network Metrics</h2>
        <p className="text-sm text-gray-400">
          Complete dataset with full descriptions
        </p>

        {loading ? (
          <p className="text-gray-400">Loading data...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {Object.entries(d?.row || {}).map(([key, value]) => (
              <div
                key={key}
                className="p-4 bg-[#2b3342] border border-gray-700 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold text-blue-400">
                  {key.toUpperCase()}
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  {fieldDescriptions[key] || "No description available"}
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {typeof value === "number" ? value.toFixed(4) : value}
                </p>
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


      <SecureApp />
      <Footer/>
    </div>
  );
}

// SecureApp Component
function SecureApp() {
  const [fileGenerated, setFileGenerated] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center text-white p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-blue-400">
        🔒 Secure Your Application
      </h1>
      <p className="text-gray-400 text-lg mb-8 text-center max-w-xl">
        Ensure your system's security by downloading this tool.  
        It helps monitor **open ports**, **network packets**, and **firewall settings**.
      </p>

      <a
        href="/PacketMonitor.exe" // Path to your .exe file in the public folder
        download="PacketMonitor.exe" // This sets the download filename
        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg font-semibold text-xl transition-all"
      >
        ⬇️ Download Security Application
      </a>

      {fileGenerated && (
        <p className="mt-4 text-green-400 font-medium">
          ✅ File "security_check.exe" has been downloaded.
        </p>
      )}
    </div>
  );
}

// Navbar Component
function Navbar() {
  return (
    <nav className="bg-[#1e2533] border-b border-gray-700 p-4 shadow-md">
      <div className=" mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-blue-400">
          🌐 NetWatch
        </h1>

      </div>
    </nav>
  );
}
function Footer() {
  return (
    <footer className="bg-[#1e2533] border-t border-gray-700 p-4 mt-4 text-center">
      <p className="text-gray-400 text-sm">
        © {new Date().getFullYear()} NetWatch - All Rights Reserved
      </p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" className="text-blue-400 hover:text-blue-500">Privacy Policy</a>
        <a href="#" className="text-blue-400 hover:text-blue-500">Terms of Service</a>
        <a href="#" className="text-blue-400 hover:text-blue-500">Contact Us</a>
      </div>
    </footer>
  );
}