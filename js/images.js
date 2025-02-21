const folderPath = "pictures/"
const imageElements = []

document.addEventListener("DOMContentLoaded", function () {
    const jsonFile = `${folderPath}images.json`;

    fetch(jsonFile)
        .then(response => response.json())
        .then(files => {
            const container = document.getElementById("image-container"); // Make sure this exists in your HTML
            const gallery = document.getElementById("gallery");
            files.forEach((fileName) => 
            {
                const img = new Image();
                img.src = folderPath + fileName; // Add the folder path to the file name
        
                img.onload = function() {
        
                  // Get EXIF date and process accordingly
                  getExifDate(img, (date) => {

                    console.log(fileName + ": " + date);
                    imageElements.push([fileName, date]);

                    imageElements.sort((a, b) => b[1] - a[1]);

                    gallery.innerHTML = '';  // Clear existing images in the gallery
                    imageElements.forEach(imgData => {
                        console.log(imgData);
                        const imgElement = document.createElement("img");
                        imgElement.src = folderPath + imgData[0];
                        imgElement.alt = imgData[0]; // Alt text as file name
                        gallery.appendChild(imgElement);
                    });
                  });
                };
                img.onerror = function() {
                    console.error(`Error loading image: ${fileName}`);
                };
            });
        })
        .catch(error => console.error("Error loading images:", error));


    // Function to extract EXIF date from an image
    function getExifDate(image, callback) {
        EXIF.getData(image, function() {
        const dateRaw = EXIF.getTag(this, "DateTimeOriginal");
        let dateObj;

        if (dateRaw)
        {
            const parts = dateRaw.split(' ');  // Split into date and time
            const dateParts = parts[0].split(':');  // Split the date into year, month, day
            const timeParts = parts[1].split(':');  // Split the time into hours, minutes, seconds
            // Create a new Date object with the parsed values
            dateObj = new Date(
                dateParts[0],  // Year
                dateParts[1] - 1,  // Month (zero-based, so subtract 1)
                dateParts[2],  // Day
                timeParts[0],  // Hours
                timeParts[1],  // Minutes
                timeParts[2]   // Seconds
            );
        }
        else
        {
            dateObj = new Date(0)
        }
        callback(dateObj)
        });
    }
   

});