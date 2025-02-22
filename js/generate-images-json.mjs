import fetch from "node-fetch";
import fs from "fs";

const repoOwner = "iotapi";
const repoName = "iotapi.github.io";
const imageFolder = "pictures"; // Your image folder
const outputJson = "images.json"; // Output JSON file
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
    
    return files
        .filter(file => file.name.match(/\.(jpe?g|png|gif)$/))
        .map(file => ({
            filename: file.name,
            path: file.path,
        }));
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
