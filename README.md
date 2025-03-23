
# 🚀 AI-Driven Dynamic Cybersecurity Shield for IoT Networks  

## 📌 Overview  
This project focuses on developing an **AI-powered cybersecurity shield** for IoT networks that **detects, mitigates, and adapts** to real-time cyber threats like malware injections, botnet attacks, and side-channel exploits.  

## 🔥 Features  
- **IoT Network Simulation:** Emulated IoT devices with constraints capturing and tracing data packets. 
                             ✅ Install Npcap (Recommended)
  Download Npcap from the official website: 👉 https://npcap.com/#download (Install it with the "WinPcap API-compatible mode" enabled)
- **Cyberattack Simulation:** Emulated DoS, DDos
- **AI-Based Intrusion Detection:** Detects anomalies using LSTMs, Transformers.  
- **Self-Healing Security Suggestions:** Auto-recovery, quarantine and attack-adaptive firewall policies.  
- **Secure Communication Protocol:** Low-latency encrypted IoT data transmission.  
- **Live Monitoring Dashboard:** Real-time alerts, logs and analytics for threat detection.  

## 🛠️ Tech Stack  
- **IoT Simulation:** IoTIFY, Node-RED  
- **Cyberattack Emulation:** Kali Linux, Scapy, Wireshark  
- **AI/ML Models:** LSTMs, Transformers, TinyML, ONNX  
- **Backend:** Python (FastAPI), ScyllaDB/DynamoDB  
- **Frontend:** React.js (for monitoring dashboard)  
- **Deployment:** Docker, Kubernetes, OCI/AWS  

## 📂 Project Structure  
```
📦 AI-Cybersecurity-Shield  
 ┣ 📂 backend  
 ┃ ┣ 📜 api.py (FastAPI endpoints)  
 ┃ ┣ 📜 ai_model.py (AI-based threat detection)  
 ┃ ┣ 📜 log_parser.py (Intrusion analysis)  
 ┃ ┣ 📜 secure_comm.py (Encrypted communication)  
 ┣ 📂 frontend  
 ┃ ┣ 📜 Dashboard (React.js UI for live monitoring)  
 ┣ 📂 iot_simulation  
 ┃ ┣ 📜 node_setup.py (Emulated IoT devices)  
 ┃ ┣ 📜 attack_scripts/ (DoS, MITM, ARP Spoofing)  
 ┣ 📂 models  
 ┃ ┣ 📜 lstm_model.pth (AI Model for NIDS)  
 ┣ 📜 README.md  
 ┣ 📜 requirements.txt  
 ┣ 📜 Dockerfile  
```

## 🚀 Installation & Setup  
1. **Clone the repository:**  
   ```sh  
   git clone https://github.com/your-username/AI-Cybersecurity-Shield.git  
   cd AI-Cybersecurity-Shield  
   ```  
2. **Install dependencies:**  
   ```sh  
   pip install -r requirements.txt  
   ```  
3. **Run IoT simulation:**  
   ```sh  
   python iot_simulation/node_setup.py  
   ```  
4. **Start backend (FastAPI):**  
   ```sh  
   uvicorn backend.api:app --reload  
   ```  
5. **Launch frontend (React.js):**  
   ```sh  
   cd frontend  
   npm install && npm start  
   ```  

## 📊 Expected Outcome  
✅ **Real-time threat detection & alerts**  
✅ **AI-powered attack mitigation & auto-recovery**  
✅ **Live monitoring & forensic logging**  
✅ **Secure & low-latency IoT communication**  

## 📜 License  
This project is licensed under the **MIT License**.  

## 🤝 Contributing  
Contributions are welcome! Please **open an issue** or create a **pull request**.  
