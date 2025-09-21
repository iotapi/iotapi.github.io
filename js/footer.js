// NOTE TO FUTURE CODERS: put "footer__" before every variable name to prevent overwriting

const footer__template = document.createElement('template');

footer__template.innerHTML = `
    <div>
    <p>Box 444, University Union Epicenter<br />
    California Polytechnic State University<br />
    San Luis Obispo, CA 93407-0675 <br />
    </p>
    </div>
    <div>©${new Date().getFullYear()} Kappa Kappa Psi - Iota Pi. All Rights Reserved</div>
`;

const footer__element = document.getElementById('footer');
footer__element.appendChild(footer__template.content);