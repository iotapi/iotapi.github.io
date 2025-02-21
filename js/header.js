const template = document.createElement('template');

template.innerHTML = `
    <img src="img/crest.png" style="max-width: 200px;">
    <h1>Kappa Kappa Psi - Iota Pi</h1>
    <h2>California Polytechnic State University</h2>
    <p>The Iota Pi website is currently under maintenance. Please come back soon or join the website team! Also we are testing things out currently!</p>
`;

const header = document.getElementById('header');
header.appendChild(template.content);