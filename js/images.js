
var repo = "iotapi/iotapi.github.io";
var folder = "img/";

fetch(`https://api.github.com/repos/${repo}/contents/${folder}`)
    .then(response => response.json())
    .then(files => {
        files.forEach(file => {
            if (file.name.match(/\.(jpe?g|png|gif)$/i)) {
                let img = document.createElement("img");
                img.src = file.download_url;
                document.body.appendChild(img);
            }
        });
    })
    .catch(error => console.error("Error fetching images:", error));