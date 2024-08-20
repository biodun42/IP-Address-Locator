const apiKey = "at_VM6eG5nrRNZwH2NKsqGCzo7j90VqJ";
const ipInput = document.getElementById("ip-input");
const searchBtn = document.getElementById("search-btn");
const ipAddressElement = document.getElementById("ipAddress");
const locationElement = document.getElementById("location");
const timezoneElement = document.getElementById("timezone");
const ispElement = document.getElementById("isp");
let map;
let marker;

function initMap(lat, lng) {
  if (map) {
    map.remove(); // Removes the map instance if it already exists
  }
  map = L.map("map").setView([lat, lng], 13); // Initializes the map centered at the specified latitude and longitude
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  marker = L.marker([lat, lng]).addTo(map); // Adds a marker at the specified latitude and longitude
}

async function getIPInfo(ip = "") {
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    updateUI(data); // Updates the UI with the retrieved data
  } catch (error) {
    console.error("Error fetching IP information:", error);
  }
}

function updateUI(data) {
  ipAddressElement.textContent = data.ip;
  locationElement.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
  timezoneElement.textContent = `UTC ${data.location.timezone}`;
  ispElement.textContent = data.isp;
  initMap(data.location.lat, data.location.lng); // Initializes the map with the location data from the API
}

// Display the user's current IP and location by default
getIPInfo();

searchBtn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevents the default form submission behavior
  const ipAddress = ipInput.value.trim();
  getIPInfo(ipAddress); // Calls the API with the input IP address
});

ipInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevents the form from submitting on pressing Enter
    searchBtn.click(); // Simulates a click on the search button
  }
});
