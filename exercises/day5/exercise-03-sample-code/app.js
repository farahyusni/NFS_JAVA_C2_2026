const events = [
    {
        id: "EV001",
        title: "Tech Career Fair",
        date: "2026-08-10",
        venue: "Kuala Lumpur Convention Centre",
        availableSeats: 120
    },
    {
        id: "EV002",
        title: "Web Development Bootcamp",
        date: "2026-08-15",
        venue: "Digital Learning Hub",
        availableSeats: 35
    },
    {
        id: "EV003",
        title: "AI for Business Workshop",
        date: "2026-08-20",
        venue: "Innovation Centre",
        availableSeats: 50
    }
];

// Write your code below

// 1. Select the event list element from the HTML.
const eventList = document.getElementById("eventList");
const statusText = document.getElementById("statusText");

// 2. Select the status text element from the HTML: Loop through the events array
// 3. Display every event inside the unordered list.
// 4. Each event must show: title,date,venue,available seats
events.forEach(event => {
    const listItem = document.createElement("li");
    let text = `${event.title} - ${event.date} - ${event.venue} - ${event.availableSeats} seats available`;
    
    // (Challenge task): flag limited seats
    if (event.availableSeats < 50) {
        text += " - Limited seats";
    }

    listItem.textContent = text;
    eventList.appendChild(listItem);
});

// 5. Update the status text after the events are displayed.
statusText.textContent = `${events.length} event(s) displayed.`;
