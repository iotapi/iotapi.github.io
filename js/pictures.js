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
        files.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date));

        // Display sorted images
        files.forEach(file => {
            console.log(file.upload_date);
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
        lazyLoadImages('.lazy-image', { threshold: 0.2 });
    })
    .catch(error => console.error("Error loading images:", error));


});