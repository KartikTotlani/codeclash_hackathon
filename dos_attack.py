import paho.mqtt.client as mqtt
import random
import time

# MQTT Broker Configuration
BROKER = "localhost"  # Change to Mosquitto's IP if needed
PORT = 1883
TOPIC = "iot/sensor1"

client = mqtt.Client()
client.connect(BROKER, 1883, 60)

while True:
    temp = random.uniform(20.0, 30.0)
    payload = f"DoS Message: {temp:.2f}C"
    client.publish(TOPIC, payload)
    print(f"Sent: {payload}")
    time.sleep(0.01)  # Reduce delay to overload broker
