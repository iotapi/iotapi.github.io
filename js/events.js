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
            const activityData = activity.filename.split(" - ");
            const eventContainer = document.createElement("div");
            eventContainer.className = "event"
            const eventTitle = document.createElement("h1");
            eventTitle.innerHTML = activityData[0]
            eventContainer.appendChild(eventTitle)
            if (activity.filename.match(/\.(jpe?g|png|gif)$/i))
            {
                const imgElement = document.createElement("img");
                imgElement.src = activity.path;
                imgElement.alt = activityData[0];
                eventContainer.appendChild(imgElement)
            } else if (activity.filename.match(/\.(txt)$/i))
            {
                fetch(activity.path)
                .then((res) => res.text())
                .then((text) => {
                    const descriptonElement = document.createElement("p")
                    descriptonElement.innerHTML = text
                    eventContainer.appendChild(descriptonElement)
                })
                .catch((e) => console.error(e));
            }
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