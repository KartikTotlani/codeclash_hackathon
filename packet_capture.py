import requests
import threading
import tkinter as tk
from tkinter import messagebox
from scapy.all import sniff, IP, TCP

# Server where packets will be sent
SERVER_URL = "http://localhost:8000/analyze"

# Global flag to control packet capture
capturing = False

def packet_callback(packet):
    """Handles packet capture and sends data to the server."""
    if IP in packet and TCP in packet:
        packet_data = {
            "timestamp": packet.time,
            "src_ip": packet[IP].src,
            "dst_ip": packet[IP].dst,
            "protocol": packet[IP].proto,
            "tcp_flags": packet.sprintf("%TCP.flags%")
        }
        print(f"Captured Packet: {packet_data}")  # Debugging, remove later
        try:
            response = requests.post(SERVER_URL, json=packet_data)
            print(f"Sent packet data | Response: {response.json()}")
        except Exception as e:
            print(f"[ERROR] Failed to send packet data: {e}")

def start_capture():
    """Starts packet sniffing in a separate thread."""
    global capturing
    capturing = True
    threading.Thread(target=sniff_packets, daemon=True).start()
    messagebox.showinfo("Packet Monitor", "Packet capture started!")

def stop_capture():
    """Stops packet sniffing."""
    global capturing
    capturing = False
    messagebox.showinfo("Packet Monitor", "Packet capture stopped!")

def sniff_packets():
    """Captures packets while the capturing flag is True."""
    global capturing
    while capturing:
        sniff(prn=packet_callback, store=0, promisc=True, timeout=5)  # Captures for 5 seconds and repeats

# GUI Setup
root = tk.Tk()
root.title("Packet Monitor")
root.geometry("300x150")

# Buttons
start_button = tk.Button(root, text="Start Capture", command=start_capture, width=20)
start_button.pack(pady=10)

stop_button = tk.Button(root, text="Stop Capture", command=stop_capture, width=20)
stop_button.pack(pady=10)

# Run GUI
root.mainloop()
