const folderPath = "headshots/"
const imageElements = []

document.addEventListener("DOMContentLoaded", function () {
    const jsonFile = `actives.json`;

    fetch("actives.json")
    .then(response => response.json())
    .then(files => {
        const gallery = document.getElementById("gallery");
        let imagePromises = [];

        // // Sort images by upload date (newest first)
        // files.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date));

        // Display sorted images
        files.forEach(file => {
            const memberElement = document.createElement("div");
            memberElement.className = "brother"

            const imgElement = document.createElement("img");
            imgElement.className = "lazy-image headshot"
            imgElement.src = "img/placeholder.jpg"
            imgElement.dataset.src = `${folderPath}/${file.filename}`;
            imgElement.alt = file.filename;

            // Remove the ".jpg", then split between the name and class
            const memberData = file.filename.split(".")[0].split(" - ")
            const memberName = document.createElement("p");
            const memberClass = document.createElement("p");
            memberName.className = "member-name";
            memberClass.className = "member-class";
            memberName.innerHTML = `<b>${memberData[0]}</b>`;
            memberClass.innerHTML = memberData[1];

            memberElement.appendChild(imgElement);
            memberElement.appendChild(memberName);
            memberElement.appendChild(memberClass);

            gallery.appendChild(memberElement);

            let imgPromise = new Promise(resolve => {
                imgElement.onload = resolve;
                imgElement.onerror = resolve; // Resolve even if image fails to load
            });
            imagePromises.push(imgPromise);
        });

        return Promise.all(imagePromises);
    })
    .then(() => {
        lazyLoadImages('.lazy-image', { threshold: 0.2 });
    })
    .catch(error => console.error("Error loading images:", error));


});