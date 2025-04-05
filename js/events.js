document.addEventListener("DOMContentLoaded", function () {
    const jsonFile = `events.json`;

    fetch("events.json")
    .then(response => response.json())
    .then(activities => {
        const gallery = document.getElementById("events-container")
        let imagePromises = [];

        // Sort images by upload date (newest first)
        activities.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date));

        // Display sorted images
        activities.forEach(activity => {
            const eventContainer = document.createElement("div");
            eventContainer.className = "event"

            const eventTitle = document.createElement("h1");
            eventTitle.innerHTML = activity.title

            const imgElement = document.createElement("img");
            imgElement.src = `events/${activity.image}`;
            imgElement.alt = activity.title;

            const descriptonElement = document.createElement("p")
            descriptonElement.innerHTML = activity.description

            eventContainer.appendChild(eventTitle)
            if (activity.image != "none")
                eventContainer.appendChild(imgElement)
            else
                eventContainer.appendChild(descriptonElement)
            gallery.appendChild(eventContainer);

            // let imgPromise = new Promise(resolve => {
            //     imgElement.onload = resolve;
            //     imgElement.onerror = resolve; // Resolve even if image fails to load
            // });
            // imagePromises.push(imgPromise);
        });

        return Promise.all(imagePromises);
    })
    .catch(error => console.error("Error loading images:", error));


});