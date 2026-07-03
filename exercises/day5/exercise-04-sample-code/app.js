const API_BASE_URL = "http://localhost:8081/api";

// Write your JavaScript here.
// 1. Send a GET request to load all events.
// 2. Display each event in the list.
// 3. Show the event title, date, venue, and available seats.
// 4. Show a status message while data is loading.
// 5. Show a success message after the events are loaded.
// 6. Show an error message if the request fails.

const loadButton = document.getElementById("loadButton");
const statusText = document.getElementById("statusText");
const eventList = document.getElementById("eventList");

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", async () => {
    const id = searchInput.value.trim();
    statusText.textContent = `Searching for ${id}...`;
    eventList.innerHTML = "";

    try {
        const response = await fetch(`${API_BASE_URL}/events/${id}`);

        if (response.status === 404) {
            statusText.textContent = `Event ${id} was not found.`;
            return;
        }

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const event = await response.json();
        displayEvents([event]);
        statusText.textContent = `Event ${id} found.`;
    } catch (error) {
        statusText.textContent = `Search failed: ${error.message}`;
    }
});

loadButton.addEventListener("click", loadEvents);

async function loadEvents() {
    statusText.textContent = "Loading events...";
    eventList.innerHTML = "";

    try {
        const response = await fetch(`${API_BASE_URL}/events`);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const events = await response.json();
        displayEvents(events);
        statusText.textContent = `${events.length} event(s) loaded.`;
    } catch (error) {
        statusText.textContent = `Failed to load events: ${error.message}`;
    }
}

function displayEvents(events) {
    eventList.innerHTML = "";

    events.forEach(event => {
        const listItem = document.createElement("li");
        listItem.textContent = `${event.title} - ${event.date} - ${event.venue} - ${event.availableSeats} seats available`;
        eventList.appendChild(listItem);
    });
}
