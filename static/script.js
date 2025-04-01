document.addEventListener("DOMContentLoaded", function () {
    // ===== Chat Box =====
    const chatBox = document.getElementById("chat-box");
    const inputField = document.getElementById("message-input");
    const sendButton = document.getElementById("send-btn");
    const clearChatBtn = document.getElementById("clear-chat-btn");

    let chatMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];

    function displayChatMessages() {
        chatBox.innerHTML = "";
        chatMessages.forEach(msg => {
            let newMessage = document.createElement("div");
            newMessage.classList.add("message");

            if (msg.user === sessionStorage.getItem("currentUser")) {
                newMessage.classList.add("right");
            } else {
                newMessage.classList.add("left");
            }

            newMessage.textContent = `${msg.user}: ${msg.text}`;
            chatBox.appendChild(newMessage);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
        let message = inputField.value.trim();
        if (message !== "") {
            let username = sessionStorage.getItem("currentUser") || "Guest";
            let messageObj = { user: username, text: message };

            chatMessages.push(messageObj);
            localStorage.setItem("chatMessages", JSON.stringify(chatMessages));

            let newMessage = document.createElement("div");
            newMessage.classList.add("message");

            if (username === sessionStorage.getItem("currentUser")) {
                newMessage.classList.add("right");
            } else {
                newMessage.classList.add("left");
            }

            newMessage.textContent = `${username}: ${message}`;
            chatBox.appendChild(newMessage);
            inputField.value = "";
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    if (sendButton) {
        sendButton.addEventListener("click", sendMessage);
    }

    if (inputField) {
        inputField.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }

    if (clearChatBtn) {
        clearChatBtn.addEventListener("click", function () {
            localStorage.removeItem("chatMessages");
            chatMessages = [];
            displayChatMessages();
        });
    }

    if (chatBox) {
        displayChatMessages();
    }


// ===== Event Management =====
const eventForm = document.getElementById("eventForm");
const eventList = document.getElementById("events");
const clearEventsBtn = document.getElementById("clearEventsBtn"); 

let events = JSON.parse(localStorage.getItem("events")) || [];

// Function to display events
function displayEvents() {
    eventList.innerHTML = "";
    events.forEach((event, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${event.name}</strong> - ${event.date} at ${event.time}<br>
                              <em>${event.location}</em><br>${event.description} 
                              <button class="deleteEventBtn" data-index="${index}">❌</button>`;
        eventList.appendChild(listItem);
    });

    // Attach event listeners to delete buttons
    document.querySelectorAll(".deleteEventBtn").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            events.splice(index, 1); // Remove event
            localStorage.setItem("events", JSON.stringify(events));
            displayEvents(); // Refresh event list
        });
    });
}

// Add event listener for form submission
if (eventForm) {
    eventForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let eventName = document.getElementById("eventName").value;
        let eventDate = document.getElementById("eventDate").value;
        let eventTime = document.getElementById("eventTime").value;
        let eventLocation = document.getElementById("eventLocation").value;
        let eventDescription = document.getElementById("eventDescription").value;

        let newEvent = {
            name: eventName,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            description: eventDescription
        };

        events.push(newEvent);
        localStorage.setItem("events", JSON.stringify(events));

        displayEvents();
        eventForm.reset();
    });
}

// Clear all events
if (clearEventsBtn) {
    clearEventsBtn.addEventListener("click", function () {
        events = []; // Empty the array
        localStorage.removeItem("events"); // Remove from storage
        displayEvents(); // Refresh the list
    });
}

// Display stored events when the page loads
if (eventList) {
    displayEvents();
}


    // ===== Announcements =====
    const announcementBox = document.getElementById("announcementBox");
    const announcementInput = document.getElementById("announcementInput");
    const addAnnouncementBtn = document.getElementById("addAnnouncementBtn");
    const clearAnnouncementsBtn = document.getElementById("clearAnnouncementsBtn");

    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];

    function displayAnnouncements() {
        announcementBox.innerHTML = "";
        announcements.forEach(announcement => {
            const announcementElement = document.createElement("div");
            announcementElement.classList.add("announcement");
            announcementElement.textContent = announcement;
            announcementBox.appendChild(announcementElement);
        });
        announcementBox.scrollTop = announcementBox.scrollHeight;
    }

    if (addAnnouncementBtn) {
        addAnnouncementBtn.addEventListener("click", function () {
            const announcementText = announcementInput.value.trim();
            if (announcementText !== "") {
                announcements.push(announcementText);
                localStorage.setItem("announcements", JSON.stringify(announcements));

                displayAnnouncements();
                announcementInput.value = "";
            } else {
                alert("Please enter an announcement before adding.");
            }
        });
    }

    if (clearAnnouncementsBtn) {
        clearAnnouncementsBtn.addEventListener("click", function () {
            announcements = [];
            localStorage.removeItem("announcements");
            displayAnnouncements();
        });
    }

    if (announcementBox) {
        displayAnnouncements();
    }
});
