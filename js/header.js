// NOTE TO FUTURE CODERS: put "header__" before every variable name to prevent overwriting

const header__template = document.createElement('template');

// header__template.innerHTML = `
//     <div id = "logo">
//         <a href="index.html">
//             
//         </a>
//     </div>
//     <nav>
//         <ul>

//         </ul>
//     </nav>
// `;
const menuColor = "#060760"

header__template.innerHTML = `
<nav>
    <!-- Always visible items in the nav bar -->
    <ul>
        <li>
            <a href="index.html">
                <img src="img/crest.png" style="max-width: 200px;">
            </a>
        </li>
    </ul>
    <!-- The hamburger menu -->
    <label for='menu' tabindex="0">
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 18L20 18" stroke="${menuColor}" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 12L20 12" stroke="${menuColor}" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 6L20 6" stroke="${menuColor}" stroke-width="2" stroke-linecap="round"/>
        </svg>
    </label>
    <input id='menu' type='checkbox' />
    <!-- The collapsable menu -->
    <ul id = "links">
        <li><a href="index.html">Home</a></li>
        <li><a href="familytree.html">Family Tree</a></li>
        <li><a href="creed.html">Values</a></li>
        <li><a href="members.html">Members</a></li>
        <li><a href="history.html">History</a></li>
        <li><a href="photos.html">Photos</a></li>
    </ul>
</nav>
`;


const header__element = document.getElementById('header');
header__element.appendChild(header__template.content);