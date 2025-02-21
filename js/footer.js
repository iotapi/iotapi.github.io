const template = document.createElement('template');

template.innerHTML = `
    <p>Hello :)</p>
`;

const header = document.getElementById('footer');
header.appendChild(template.content);