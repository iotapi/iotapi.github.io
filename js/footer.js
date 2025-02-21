// NOTE TO FUTURE CODERS: put "footer__" before every variable name to prevent overwriting

const footer__template = document.createElement('template');

footer__template.innerHTML = `
    <p>Hello :)</p>
`;

const footer__element = document.getElementById('footer');
footer__element.appendChild(footer__template.content);