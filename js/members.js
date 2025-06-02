const folderPath = "headshots/";
const imageElements = [];

document.addEventListener("DOMContentLoaded", function () {
  const jsonFile = `actives.json`;

  fetch("actives.json")
    .then((response) => response.json())
    .then((files) => {
      const execCouncil = document.getElementById("exec-council");
      const actives = document.getElementById("actives");
      let imagePromises = [];

      // // Sort images by upload date (newest first)
      // files.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date));
      function findInName(filesList, title) {
        // this filter is hellish and probably can be done with a regex but it's week 10 and I'm tired
        resultIndex = filesList.findIndex(
          (image) => image.filename.split(".")[0].split(" - ")[2] == title
        );
        return filesList.splice(resultIndex, 1)[0];
      }

      function generateImage(file, parent, title = "") {
        const memberElement = document.createElement("div");
        memberElement.className = "brother";

        const imgElement = document.createElement("img");
        imgElement.className = "lazy-image headshot";
        imgElement.src = "img/placeholder.jpg";
        imgElement.dataset.src = `${folderPath}/${file.filename}`;
        imgElement.alt = file.filename;

        // Remove the ".jpg", then split between the name and class
        const memberData = file.filename.split(".")[0].split(" - ");
        const memberName = document.createElement("p");
        const memberClass = document.createElement("p");
        memberName.className = "member-name";
        memberClass.className = "member-class";
        memberName.innerHTML = `<b>${memberData[0]}</b>`;
        memberClass.innerHTML = memberData[1];

        if (memberData[2]) {
          const memberTitle = document.createElement("p");
          memberTitle.className = "member-title";
          memberTitle.innerHTML = `<b>${memberData[2]}</b>`;
          memberElement.appendChild(memberTitle);
        }

        memberElement.appendChild(imgElement);
        memberElement.appendChild(memberName);
        memberElement.appendChild(memberClass);

        parent.appendChild(memberElement);

        let imgPromise = new Promise((resolve) => {
          imgElement.onload = resolve;
          imgElement.onerror = resolve; // Resolve even if image fails to load
        });
        imagePromises.push(imgPromise);
      }

      // // Exec Council
      execTitles = [
        "President",
        "VP of Membership",
        "VP of Service",
        "Recording Secretary",
        "Treasurer",
        "Alumni Secretary",
        "Correspondence Secretary",
      ];
      execTitles.forEach((title) => {
        generateImage(findInName(files, title), execCouncil, title);
      });
      // Display sorted images
      files.forEach((file) => {
        generateImage(file, actives);
      });

      return Promise.all(imagePromises);
    })
    .then(() => {
      lazyLoadImages(".lazy-image", { threshold: 0.2 });
    })
    .catch((error) => console.error("Error loading images:", error));
});
