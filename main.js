const postsFeed = document.getElementById("posts-feed");
const user = document.getElementById("user");
const post = document.getElementById("post");
const submitBtn = document.getElementById("post-btn");
const username = document.getElementById("username");
const postText = document.getElementById("postText");

let posts = [];

const stringToHTML = function (str) {
  let dom = document.createElement("div");
  dom.innerHTML = str;
  return dom;
};

const getInputs = function () {
  submitBtn.addEventListener("click", function () {
    posts.push({ user: user.value, post: post.value });
    console.log(posts);
    let latestPost = posts.length - 1;
    console.log(posts[latestPost].user);
    let postStr = `<div class="conatiner-fluid posts"><h3>${posts[latestPost].user}</h3><p>${posts[latestPost].post}</p></div>`;
    let postHTML = stringToHTML(postStr);
    postsFeed.prepend(postHTML);
  });
};

getInputs();
