const folderPath = "pictures/"
const imageElements = []

var glide = new Glide('.glide')
glide.mount()

document.addEventListener("DOMContentLoaded", function () {
    const jsonFile = `images.json`;

    fetch("images.json")
    .then(response => response.json())
    .then(files => {
        const gallery = document.getElementsByClassName("glide__slides")[0];
        let imagePromises = [];

        // Sort images by upload date (newest first)
        files.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date));

        // Get only the 10 most recent images
        files = files.slice(0, (files.length > 10 ? 10 : files.length))

        // Display sorted images
        files.forEach(file => {
            console.log(file.upload_date);
            const liElement = document.createElement("li");
            liElement.className = "glide__slide"
            const imgElement = document.createElement("img");
            imgElement.className = "carousel-img"
            imgElement.src = `pictures/${file.filename}`;
            imgElement.alt = file.filename;
            liElement.appendChild(imgElement)
            gallery.appendChild(liElement);

            let imgPromise = new Promise(resolve => {
                imgElement.onload = resolve;
                imgElement.onerror = resolve; // Resolve even if image fails to load
            });
            imagePromises.push(imgPromise);
        });

        return Promise.all(imagePromises);
    }).then(() => {
        var glide = new Glide('.glide')
        glide.mount()
    })
    .catch(error => console.error("Error loading images:", error));


});