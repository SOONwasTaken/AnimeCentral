import 'https://tomashubelbauer.github.io/github-pages-local-storage/index.js';

const fs = require('fs');
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
    const linkTags = document.getElementsByTagName('link');
    for (const tag of linkTags) {
        tag.setAttribute('href', baseURL + tag.href);
    }

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