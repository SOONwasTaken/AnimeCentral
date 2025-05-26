import 'https://tomashubelbauer.github.io/github-pages-local-storage/index.js';

export const fs = require('fs');

const repoName = '/AnimeCentral/';
export const isGithubPages = fs.existsSync(repoName);
export const baseURL = isGithubPages ? './' : repoName;
localStorage.setItem('baseURL', baseURL);

function makeHttpObject() {
    try { return new XMLHttpRequest(); }
    catch (e) { }
    try { return new ActiveXObject("Msxml2.XMLHTTP"); }
    catch (e) { }
    try { return new ActiveXObject("Microsoft.XMLHTTP"); }
    catch (e) { }

    throw new Error("Could not create HTTP request object.");
}

export function createLayout(containerId) {

    const styleSheet = document.createElement('link');
    styleSheet.rel = 'stylesheet';
    styleSheet.href = (isGithubPages ? repoName : '') + 'style.css';
    document.getElementsByTagName('head')[0].appendChild(styleSheet);

    const containerElement = document.getElementById('#' + containerId);
    const anchorTags = document.getElementsByClassName('directory-link');

    for (const tag of anchorTags) {
        tag.setAttribute('href', baseURL + tag.href);

        tag.addEventListener('click', function (e) {
            e.preventDefault();
            const request = makeHttpObject();
            request.open("GET", tag.href, true);
            request.send(null);
            request.onreadystatechange = function () {
                if (request.readyState === 4)
                    containerElement.innerHTML = request.responseText;
            };
        });
    }
};