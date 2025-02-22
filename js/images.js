const folderPath = "pictures/"
const imageElements = []

document.addEventListener("DOMContentLoaded", function () {
    const jsonFile = `images.json`;

    fetch("images.json")
    .then(response => response.json())
    .then(files => {
        const gallery = document.getElementById("gallery");

        // Sort images by upload date (newest first)
        files.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

        // Display sorted images
        files.forEach(file => {
            const imgElement = document.createElement("img");
            imgElement.src = `pictures/${file.filename}`;
            imgElement.alt = file.filename;
            gallery.appendChild(imgElement);
        });
    })
    .catch(error => console.error("Error loading images:", error));

});