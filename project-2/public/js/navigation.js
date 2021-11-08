function addAjaxListener() {
    const links = document.getElementsByClassName('page-button');
    for(const link of links) {
        link.addEventListener('click', function(e) {
            getPosts(link.innerText)
        }, false);
    }
}

function replacePosts(postsRaw) {
    const parser = new DOMParser();
    const posts = parser.parseFromString(postsRaw, 'text/html');
    const postsSection = document.getElementById('posts-section');

    postsSection.classList.toggle('hidden');
    postsSection.replaceChildren(...posts.body.children);
    addAjaxListener();
    postsSection.classList.toggle('hidden');
}

function addCategoryFilter(filters) {
    const splitUrl = window.location.pathname.split('/');
    if(splitUrl.includes('category')) {
        filters.category = splitUrl.at(-1);
    }
}

function addUserFilter(filters) {
    const splitUrl = window.location.pathname.split('/');
    if(splitUrl.includes('user')) {
        filters.user = splitUrl.at(-1);
    }
}

function getPosts(page) {
    let filters = {page: page};
    addCategoryFilter(filters);
    addUserFilter(filters);
    let params = new URLSearchParams(filters);
    fetch('/posts/api/?' + params, {method: 'GET'})
        .then(response => response.text())
        .then(html => replacePosts(html));
}

document.addEventListener("DOMContentLoaded", function(event) {
    addAjaxListener()
});
