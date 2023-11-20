function myDone(data) {
    console.log("Done");
    console.log(data);
    $("#follower-content").text(data.followerCount);
}
function onFail() {
    console.log("Fail");
    console.log(e);
}
function myCall() { 
    console.log("interval timer...");
    $.getJSON("http://localhost:3300/getFollowerCount").done(myDone).fail(onFail);
}
function myInit() {
    console.log("OK!");
    setInterval(myCall, 1000);  //chiama la funzione myCall ogni 1000ms
}
// Fetch the initial follower count from the server
fetch('http://localhost:3300/getFollowerCount')
.then(response => {
    // Check if the response status is ok (HTTP status code 200-299)
    if (!response.ok) {
        // Handle non-ok responses
        if (response.status === 404) {
            // Throw an error if the endpoint is not found
            throw new Error('Endpoint not found');
        } else {
            // Try to get the response body as text for further examination
                return response.text();
        }
    }
    // If the response is ok, parse it as JSON
    return response.json();
})
.catch(error => console.error(error));
$(document).ready(myInit);

document.addEventListener('DOMContentLoaded', function() {
    // Mostra il contenuto principale
    document.querySelector('.main-content').style.display = 'block';

    // Nascondi la pagina di caricamento
    document.querySelector('.loader-container').style.display = 'none';
});