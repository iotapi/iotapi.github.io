var folder = "images/";

fetch(folder)
    .then(response => response.text())  // Get response as text (HTML directory listing)
    .then(data => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, "text/html"); // Parse as HTML

        doc.querySelectorAll("a").forEach(link => {
            let href = link.getAttribute("href");

            if (href && href.match(/\.(jpe?g|png|gif)$/i)) { // Check for image file extensions
                let img = document.createElement("img");
                img.src = folder + href;
                document.body.appendChild(img);
            }
        });
    })
    .catch(error => console.error("Error fetching folder:", error));