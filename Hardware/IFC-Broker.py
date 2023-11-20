import time
from umqtt.simple import MQTTClient
import network
import json
from machine import Pin, I2C
import ssd1306

# MQTT Credentials setup
mqtt_broker = "broker.emqx.io"
mqtt_port = 1883
mqtt_user = "testblablabla1"
mqtt_password = "12345"
mqtt_topic = b"IFC-Backend/1"

# WiFi credentials setup
wifi_ssid = "Wokwi-GUEST"
wifi_password = ""

# OLED setup
i2c = I2C(-1, Pin(22), Pin(21))
oled = ssd1306.SSD1306_I2C(128, 64, i2c)

# Callback function to handle received messages
def callback(topic, msg):
    global follower_count
    print("Message received on {}: {}".format(topic, msg))
    
    try:
        # Decode JSON string
        decoded_json = json.loads(msg.decode('utf-8'))
        print("Decoded Json:", decoded_json)
        
        # follower_count_value = int(decoded_json["msg"])
        follower_count = decoded_json
        print("Extracted number:", follower_count)
        
        # View display number
        display_number_on_oled(follower_count)
        
    except (ValueError, KeyError) as e:
        print("Error during number extraction:", e)

# Function to display the number on the OLED
def display_number_on_oled(number):
    oled.fill(0)
    oled.text("Follower Number:", 0, 0)
    oled.text(str(number), 0, 20)
    oled.show()

# WiFi connection configuration
wifi = network.WLAN(network.STA_IF)
wifi.active(True)
wifi.connect(wifi_ssid, wifi_password)

# Wait for WiFi connection
while not wifi.isconnected():
    pass

print("Connected to", wifi_ssid)
print("IP Address:", wifi.ifconfig()[0])

# Setting up MQTTClient
client_id = "esp32"
mqtt_client = MQTTClient(client_id, mqtt_broker, port=mqtt_port, user=mqtt_user, password=mqtt_password)
mqtt_client.set_callback(callback)

# Connecting to the broker
mqtt_client.connect()

# Subscribe to topic
mqtt_client.subscribe(mqtt_topic)

# Main loop
while True:
    mqtt_client.check_msg()

    # Additional operations can be added here if needed

    time.sleep(1)  # Sleeps for 1 second
##https://wokwi.com/projects/381267625304987649
