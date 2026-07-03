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
const loadButton = document.querySelector("#loadButton");
const statusText = document.querySelector("#statusText");
const eventList = document.querySelector("#eventList");

function showStatus(message) {
    statusText.textContent = message;
}

function formatEvent(event) {
    return `${event.title} - ${event.date} - ${event.venue} - ${event.availableSeats} seats available`;
}

function renderEvents(events) {
    eventList.innerHTML = "";

    events.forEach(event => {
        const listItem = document.createElement("li");

        listItem.textContent = `${event.title} - ${event.date} - ${event.venue} - ${event.availableSeats} seats available`;
        eventList.appendChild(listItem);
    });
}
}



// function renderSingleEvent(event) {
//     eventList.innerHTML = "";

//     const listItem = document.createElement("li");
//     listItem.textContent = formatEvent(event);

//     eventList.appendChild(listItem);
// }

// async function loadEvents() {
//     showStatus("Loading events...");

//     try {
//         const response = await fetch(`${API_BASE_URL}/events`);

//         console.log("GET /events status:", response.status);

//         if (!response.ok) {
//             throw new Error(`Request failed with status ${response.status}`);
//         }

//         const data = await response.json();

//         renderEvents(data);
//         showStatus(`Loaded ${data.length} event(s).`);
//     } catch (error) {
//         showStatus(error.message);
//     }
// }

// async function searchEventById(event) {
//     event.preventDefault();

//     const eventId = document.querySelector("#eventIdInput").value.trim();

//     if (eventId === "") {
//         showStatus("Please enter an event ID.");
//         return;
//     }

//     showStatus(`Searching for event ${eventId}...`);

//     try {
//         const response = await fetch(`${API_BASE_URL}/events/${eventId}`);

//         console.log("GET /events/{id} status:", response.status);

//         const data = await response.json();

//         if (!response.ok) {
//             showStatus(data.message);
//             eventList.innerHTML = "";
//             return;
//         }

//         renderSingleEvent(data);
//         showStatus(`Event ${data.id} loaded.`);
//     } catch (error) {
//         showStatus(error.message);
//     }
// }

// function createSearchForm() {
//     const searchForm = document.createElement("form");
//     searchForm.id = "searchForm";

//     const label = document.createElement("label");
//     label.setAttribute("for", "eventIdInput");
//     label.textContent = "Search Event by ID: ";

//     const input = document.createElement("input");
//     input.id = "eventIdInput";
//     input.name = "eventIdInput";
//     input.type = "text";
//     input.placeholder = "Example: EV001";

//     const button = document.createElement("button");
//     button.type = "submit";
//     button.textContent = "Search";

//     searchForm.appendChild(label);
//     searchForm.appendChild(input);
//     searchForm.appendChild(button);

//     eventList.before(searchForm);

//     searchForm.addEventListener("submit", searchEventById);
// }

// loadButton.addEventListener("click", loadEvents);
// createSearchForm();