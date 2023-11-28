// Import required modules
const express = require('express');  // Express framework for handling HTTP requests
const cors = require('cors');  // CORS middleware for enabling cross-origin resource sharing
const path = require('path');  // Path module for handling file paths
const https = require('https');  // HTTPS module for making secure requests
const mqttClient = require('./mqtt');  // Custom MQTT client module
const { HttpsProxyAgent } = require('https-proxy-agent');

const proxyOptions = ''; // Your Proxy URL goes here

// Create an Express application
const app = express();
const port = process.env.PORT || 5500; // Use the port defined by the environment variable, defaulting to 5500

// Enable CORS for all routes
app.use(cors());

// Serve static files (CSS, images, etc.) from a frontend directory
app.use(express.static(path.join(__dirname, 'Frontend')));

// Define the Instagram username to fetch follower count for
const username = "iismarconicivitavecchia";

// Define the request options for fetching Instagram profile information
const options = {
  hostname: 'i.instagram.com',
  path: `/api/v1/users/web_profile_info/?username=${username}`,
  method: 'GET',
  agent: new HttpsProxyAgent(proxyOptions),
  headers: {
    'User-Agent': 'Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)'
  }
};

// Initialize variables to store the follower count and the old follower count
let oldFollowerCount = 0;
let output;

// Function to fetch the follower count from Instagram
function fetchFollowerCount() {
  const req = https.get(options, (res) => {
    let data = '';

    // Accumulate data as it is received
    res.on('data', (chunk) => {
      data += chunk;
    });

    // Process the complete response
    res.on('end', () => {
      try {
        // Parse the JSON response from Instagram
        const jsonData = JSON.parse(data);

        if (jsonData.data.user) {
          // Extract the follower count from the JSON response
          const followerCount = jsonData.data.user.edge_followed_by.count;

          if (followerCount !== oldFollowerCount) {
            // Update the old follower count and store the new count as a string
            oldFollowerCount = followerCount;
            output = String(followerCount);

            // Publish the follower count via MQTT
            mqttClient.publishMessage(output);
          } else {
            console.log("Follower number hasn't changed");
          }
        } else {
          console.log("No user found.");
        }
      } catch (error) {
        console.error("JSON data parsing error: " + error);
      }
    });
  });

  // Handle errors in the HTTPS request
  req.on('error', (error) => {
    console.error(error);
  });

  // Complete the request
  req.end();
}

// Call fetchFollowerCount every 2 seconds using setInterval
setInterval(fetchFollowerCount, 2000);

// Define a route to send the follower count to the front end
app.get('/getFollowerCount', (req, res) => {
  res.json({ followerCount: output || 'Loading...' });
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
