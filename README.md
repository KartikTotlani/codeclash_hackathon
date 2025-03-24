# 🚀 AI-Driven Dynamic Cybersecurity Shield for IoT Networks

## 📌 Overview
This project focuses on developing an **AI-powered cybersecurity shield** for IoT networks that **detects, mitigates, and adapts** to real-time cyber threats like malware injections, botnet attacks, and side-channel exploits.

## 🔥 Features
- **IoT Network Simulation:** Emulated IoT devices with constraints capturing and tracing data packets.  
                             ✅ Install Npcap (Recommended)  
  Download Npcap from the official website: 👉 https://npcap.com/#download (Install it with the "WinPcap API-compatible mode" enabled)
- **Cyberattack Simulation:** Emulated DoS, DDoS
- **AI-Based Intrusion Detection:** Detects anomalies using Random Forest classifier
- **Self-Healing Security Suggestions:** Auto-recovery, quarantine and attack-adaptive firewall policies
- **Secure Communication Protocol:** Low-latency encrypted IoT data transmission
- **Live Monitoring Dashboard:** Real-time alerts, logs and analytics for threat detection

## 🛠️ Tech Stack
- **IoT Simulation:** IoTIFY, Node-RED
- **Cyberattack Emulation:** Kali Linux, Scapy, Wireshark
- **AI/ML Models:** Random Forest, ScikitLearn, ONNX
- **Backend:** Python (FastAPI), ScyllaDB/DynamoDB
- **Frontend:** React.js (for monitoring dashboard)
- **Deployment:** Docker, Kubernetes, OCI/AWS

## 📊 Feature Selection & Model Evaluation

### Feature Selection Methods
We experimented with multiple feature selection techniques to optimize our model performance:

1. **Variance Threshold:** Removed features with low variance
2. **Correlation-based Feature Selection:** Eliminated highly correlated features
3. **Feature Importance using Random Forest:** Selected features based on importance scores
4. **SelectKBest with F-test (ANOVA):** Statistical approach for feature selection
5. **SelectKBest with Mutual Information:** Information theory-based selection
6. **Recursive Feature Elimination (RFE):** Iterative feature elimination
7. **Common Features:** Features that appeared in multiple selection methods

### Feature Selection Results
Our feature selection comparison shows that:
- Original dataset contained 193 features
- Variance Threshold and Correlation-based methods maintained high feature counts (193 and 172)
- RFE, Mutual Information, and Random Forest methods reduced feature count to 30 while maintaining similar accuracy
- F-test based selection achieved 0.943 accuracy with 30 features
- Common Features method identified 14 critical features with 0.943 accuracy

#### Feature Selection Performance Comparison
![Feature Selection Methods Comparison](./Model%20Training/model%20evaluation%20matrix.png)

### Model Evaluation
After feature selection, we evaluated multiple machine learning models:
- **RandomForestClassifier & ExtraTreesClassifier:** Best overall performance with 0.96 for Precision, Recall, and F1 scores
- **GradientBoostingClassifier & AdaBoostClassifier:** Strong performance with ~0.94-0.95 across metrics
- **DecisionTreeClassifier:** Consistent 0.95 across metrics
- **LogisticRegression & SVC:** Good but slightly lower performance than tree-based models
- **KNeighborsClassifier:** Solid performance across all metrics
- **DummyClassifier:** Poor performance as expected (baseline)
- **GaussianNB:** Perfect precision but very poor recall, showing model imbalance

#### Model Performance Comparison
![Models Performance Matrix](./Model%20Training/Models%20Performance%20Matrix%20Comparison.png)

### Model Selection
We selected **Random Forest** as our primary classification model due to:
- Excellent performance across all metrics (0.96 precision, recall, F1)
- Better generalization compared to single decision trees
- Faster training and inference times compared to deep learning approaches like LSTMs and Transformers
- Real-time inference capability, which is critical for cybersecurity applications

We deliberately avoided Transformers and LSTMs despite their potential effectiveness because their training and inference times would not meet our requirements for real-time threat detection in resource-constrained IoT environments.

## 📂 Project Structure
```
📦 AI-Cybersecurity-Shield
 ┣ 📂 backend
 ┃ ┣ 📜 api.py (FastAPI endpoints)
 ┃ ┣ 📜 ai_model.py (Random Forest-based threat detection)
 ┃ ┣ 📜 log_parser.py (Intrusion analysis)
 ┃ ┣ 📜 secure_comm.py (Encrypted communication)
 ┣ 📂 frontend
 ┃ ┣ 📜 Dashboard (React.js UI for live monitoring)
 ┣ 📂 iot_simulation
 ┃ ┣ 📜 node_setup.py (Emulated IoT devices)
 ┃ ┣ 📜 attack_scripts/ (DoS, MITM, ARP Spoofing)
 ┣ 📂 models
 ┃ ┣ 📜 random_forest_model.pkl (AI Model for NIDS)
 ┣ 📂 images
 ┃ ┣ 📜 model_evaluation_matrix.png
 ┃ ┣ 📜 models_performance_matrix.png
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