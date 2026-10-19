const articleForm=document.getElementById("article-form");
const articleTitle=document.getElementById("article-title");
const articleContent=document.getElementById("article-content");
const articleList=document.getElementById("article-list");
const fetchPostButton=document.getElementById("fetch-posts");
const apiPosts=document.getElementById("api-posts");

articleForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const title=articleTitle.value.trim();
    const content=articleContent.value.trim();

    if(title===""||content===""){
        alert("Заполните название и содержание статьи.");
        return;
    }
    const articleItem=document.createElement("li");
    const articleHeading=document.createElement("h3");
    const articleText=document.createElement("p");

    articleHeading.textContent=title;
    articleText.textContent=content;

    articleItem.appendChild(articleHeading);
    articleItem.appendChild(articleText);
    articleList.appendChild(articleItem);

    articleTitle.value = "";
    articleContent.value = "";
})

console.log(fetchPostButton);

fetchPostButton.addEventListener("click", function() {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(posts => {
        apiPosts.innerHTML = "";
        posts.forEach(post => {
            const postItem = document.createElement("li");
            const postTitle = document.createElement("h3");
            const postBody = document.createElement("p");

            postTitle.textContent = post.title;
            postBody.textContent = post.body;

            postItem.appendChild(postTitle);
            postItem.appendChild(postBody);
            apiPosts.appendChild(postItem);
        });
    });
});
