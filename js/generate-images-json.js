const fs = require("fs");
const fetch = require("node-fetch");

const repoOwner = "iotapi";
const repoName = "iotapi.github.io";
const imageFolder = "pictures"; // Change to your image folder
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

    const images = files
        .filter(file => file.name.match(/\.(jpe?g|png|gif)$/)) // Only image files
        .map(file => ({
            filename: file.name,
            path: file.path,
        }));

    return images;
}

async function fetchCommitDate(imagePath) {
    const commitUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?path=${imagePath}&per_page=1`;
    
    const response = await fetch(commitUrl, {
        headers: { Authorization: `token ${githubToken}` }
    });

    if (!response.ok) {
        console.warn(`Warning: Could not get commit date for ${imagePath}`);
        return new Date().toISOString(); // Default to current date if commit date is unavailable
    }

    const commitData = await response.json();
    return commitData[0]?.commit?.committer?.date || new Date().toISOString();
}

async function generateJson() {
    try {
        const images = await fetchImages();

        // Fetch upload dates for each image
        for (const img of images) {
            img.uploadDate = await fetchCommitDate(img.path);
        }

        // Write JSON file
        fs.writeFileSync(outputJson, JSON.stringify(images, null, 2));
        console.log(`✅ Successfully updated ${outputJson}`);
    } catch (error) {
        console.error("Error generating JSON:", error);
    }
}

generateJson();
