import paho.mqtt.client as mqtt
import time
import random

# MQTT Broker Configuration
BROKER = "localhost"
TOPIC = "iot/sensor1"

client = mqtt.Client()
client.connect(BROKER, 1883, 60)

while True:
    temp = random.uniform(20.0, 30.0)
    payload = f"Temperature: {temp:.2f}C"
    client.publish(TOPIC, payload)
    print(f"Sent: {payload}")
    time.sleep(5)
