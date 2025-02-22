const folderPath = "pictures/"
const imageElements = []

document.addEventListener("DOMContentLoaded", function () {
    const jsonFile = `images.json`;

    fetch("images.json")
    .then(response => response.json())
    .then(files => {
        const gallery = document.getElementById("gallery");
        let imagePromises = [];

        // Sort images by upload date (newest first)
        files.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

        // Display sorted images
        files.forEach(file => {
            const imgElement = document.createElement("img");
            imgElement.className = "lazy-image"
            imgElement.src = "img/placeholder.jpg"
            imgElement.dataset.src = `pictures/${file.filename}`;
            imgElement.alt = file.filename;
            gallery.appendChild(imgElement);

            let imgPromise = new Promise(resolve => {
                imgElement.onload = resolve;
                imgElement.onerror = resolve; // Resolve even if image fails to load
            });
            imagePromises.push(imgPromise);
        });

        return Promise.all(imagePromises);
    })
    .then(() => {
        lazyLoadImages('.lazy-image', { threshold: 0.7 });
    })
    .catch(error => console.error("Error loading images:", error));


});