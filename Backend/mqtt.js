// Import the MQTT module
const mqtt = require('mqtt');

// Define MQTT connection parameters
const protocol = 'mqtt';
const host = 'broker.emqx.io';
const port = '1883';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `${protocol}://${host}:${port}`;

// Create an MQTT client instance and connect to the broker
const client = mqtt.connect(connectUrl, {
  clientId,  // Unique client ID for the MQTT connection
  clean: true,  // Clean session flag, ensuring no previous session data is used
  connectTimeout: 4000,  // Timeout for the connection attempt
  username: 'emqx',  // MQTT broker username
  password: 'public',  // MQTT broker password
  reconnectPeriod: 1000,  // Period to attempt reconnection if the connection is lost
});

// Define the topic to subscribe to
const topic = '';

// Event handler when the client is successfully connected to the broker
client.on('connect', () => {
  console.log('Connected');
  
  // Subscribe to the specified topic
  client.subscribe([topic], () => {
    console.log(`Subscribed to topic '${topic}'`);
  });
});

// Event handler for incoming MQTT messages
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString());
});

// Function to publish an MQTT message
function publishMessage(output) {
  const message = output;

  // Publish the message to the specified topic with specified quality of service (QoS) and retain settings
  client.publish(topic, message, { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error("MQTT message publishing error: " + error);
    } else {
      console.log("Message published successfully:", message);
    }
  });
}

// Export the publishMessage function for external use
module.exports = {
  publishMessage,
};
