document.addEventListener("DOMContentLoaded", function () {
    const folder = "pictures/";  // Update with the correct folder
    const jsonFile = `${folder}images.json`;

    fetch(jsonFile)
        .then(response => response.json())
        .then(images => {
            const container = document.getElementById("image-container"); // Make sure this exists in your HTML

            images.forEach(image => {
                let img = document.createElement("img");
                img.src = folder + image;
                img.alt = image;
                img.style.width = "200px";  // Adjust as needed
                img.style.margin = "10px";
                img.onload = function () {
                    EXIF.getData(img, function () {
                        let dateTaken = EXIF.getTag(this, "DateTimeOriginal");
                        let cameraModel = EXIF.getTag(this, "Model");
            
                        console.log("Date Taken:", dateTaken || "Unknown");
                        console.log("Camera Model:", cameraModel || "Unknown");
                    })
                };
                container.appendChild(img);
            });
        })
        .catch(error => console.error("Error loading images:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    const imgElement = document.getElementById("banner");

    imgElement.onload = function () {
        EXIF.getData(imgElement, function () {
            let dateTaken = EXIF.getTag(this, "DateTimeOriginal");
            let cameraModel = EXIF.getTag(this, "Model");

            console.log("Date Taken:", dateTaken || "Unknown");
            console.log("Camera Model:", cameraModel || "Unknown");
        });
    };
});
