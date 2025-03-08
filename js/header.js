// NOTE TO FUTURE CODERS: put "header__" before every variable name to prevent overwriting

const header__template = document.createElement('template');

header__template.innerHTML = `
    <img src="img/crest.png" style="max-width: 200px;">
    <h1>Kappa Kappa Psi - Iota Pi</h1>
    <h2>California Polytechnic State University</h2>
    <div id = "links">
        <a href="index.html">Home</a>
        <a href="familytree.html">Family Tree</a>
        <a href="creed.html">Values</a>
        <a href="history.html">History</a>
        <a href="photos.html">Photos</a>
    </div>
    <p>The Iota Pi website is currently under maintenance. Please come back soon or join the website team! Also we are testing things out currently!</p>
`;

const header__element = document.getElementById('header');
header__element.appendChild(header__template.content);