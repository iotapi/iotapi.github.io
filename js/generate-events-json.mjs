import fetch from "node-fetch";
import fs from "fs";

const repoOwner = "iotapi";
const repoName = "iotapi.github.io";
const imageFolder = "events"; // Your image folder
const outputJson = "events.json"; // Output JSON file
const githubToken = process.env.GITHUB_TOKEN; // Set this in your environment or GitHub Actions

async function fetchImages() {
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${imageFolder}`;

    const response = await fetch(apiUrl, {
        headers: { Authorization: `token ${githubToken}` }
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const files = await response.json();

    // Filter only image files
    const imageFiles = files.filter(file => file.name.match(/\.(jpe?g|png|gif|txt)$/i));

    // Fetch last modified date for each file
    const imageData = await Promise.all(imageFiles.map(async file => {
        const commitApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?path=${imageFolder}/${file.name}&per_page=1`;

        const commitResponse = await fetch(commitApiUrl, {
            headers: { Authorization: `token ${githubToken}` }
        });

        if (!commitResponse.ok) {
            console.error(`Error fetching commit info for ${file.name}: ${commitResponse.statusText}`);
            return null;
        }

        const commitData = await commitResponse.json();
        const uploadDate = commitData.length > 0 ? commitData[0].commit.committer.date : null;

        return {
            filename: file.name,
            path: file.path,
            upload_date: uploadDate
        };
    }));

    return imageData.filter(img => img !== null);
}

async function generateJson() {
    try {
        const images = await fetchImages();
        fs.writeFileSync(outputJson, JSON.stringify(images, null, 2));
        console.log(`✅ Successfully updated ${outputJson}`);
    } catch (error) {
        console.error("Error generating JSON:", error);
    }
}

generateJson();