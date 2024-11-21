const postsFeed = document.getElementById("posts-feed");
const user = document.getElementById("user");
const post = document.getElementById("post");
const submitBtn = document.getElementById("post-btn");
const username = document.getElementById("username");
const postText = document.getElementById("postText");
const removeBtn = document.getElementsByClassName("removePost");
const singlePost = document.getElementsByClassName("posts");
const addComment = document.getElementsByClassName("addComment");

let posts = [
  {
    id: 1,
    user: "My name",
    post: "This is a post",
    comments: [
      {
        id: 1,
        comment: "This is a comment",
      },
    ],
  },
  {
    id: 2,
    user: "User 2",
    post: "Post 2",
    comments: [
      {
        id: 1,
        comment: "This is a comment 2",
      },
    ],
  },
];

const stringToHTML = function (str) {
  let div = document.createElement("div");
  div.innerHTML = str;
  div.className = "conatiner-fluid posts";
  return div;
};

const preloadPosts = function () {
  for (let i = 0; i < posts.length; i++) {
    let postStr = `
    <h3>${posts[i].user}</h3>
    <p>${posts[i].post}</p>
    <div class="conatiner-fluid postUtilities">
    <span class="removePost">delete</span
    ><span class="addComment">comment</span>
    <div class="conatiner-fluid commentForm">
    <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label"
    >Name</label
    >
    <input
    type="user"
    class="form-control commentName"
                    placeholder="@username"
                    />
                    </div>
                <div class="mb-3">
                <label for="post" class="form-label">Post</label>
                <textarea
                    class="form-control commentText"
                    rows="3"
                    placeholder="This post is cool because..."
                  ></textarea>
                </div>
                <button type="button" class="btn btn-primary" id="post-btn">
                  Add Comment
                  </button>
                  </div>
            </div>
          </div>`;
    let postHTML = stringToHTML(postStr);
    postsFeed.prepend(postHTML);
  }
};

const uniqueID = function () {
  let randomNumber = Math.floor(Math.random() * 100);
  return randomNumber;
};

const getPostInputs = function () {
  submitBtn.addEventListener("click", function () {
    posts.push({ id: uniqueID(), user: user.value, post: post.value });
    let latestPost = posts.length - 1;
    let postStr = `
    <h3>${posts[latestPost].user}</h3>
    <p>${posts[latestPost].post}</p>
    <div class="conatiner-fluid postUtilities">
    <span class="removePost">delete</span
    ><span class="addComment">comment</span>
    <div class="conatiner-fluid commentForm">
    <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label"
    >Name</label
    >
    <input
    type="user"
    class="form-control commentName"
    placeholder="@username"
    />
    </div>
    <div class="mb-3">
    <label for="post" class="form-label">Post</label>
    <textarea
    class="form-control commentText"
    rows="3"
    placeholder="This post is cool because..."
    ></textarea>
    </div>
    <button type="button" class="btn btn-primary" id="post-btn">
                Add Comment
                </button>
                </div>
                </div>
                </div>`;
    let postHTML = stringToHTML(postStr);
    postsFeed.prepend(postHTML);
    // console.log(posts);
  });
};

const deletePost = function () {
  postsFeed.addEventListener("click", function (event) {
    if (event.target.classList.contains("removePost")) {
      const postToDelete = event.target.closest(".posts");
      if (postToDelete) {
        postToDelete.remove();
      }
    }
  });
};

const handleComments = function () {
  postsFeed.addEventListener("click", function (event) {
    if (event.target.classList.contains("addComment")) {
      const commentForm = event.target.nextElementSibling;
      if (commentForm.style.display === "block") {
        commentForm.style.display = "none";
      } else {
        commentForm.style.display = "block";
      }
    }
  });
};

preloadPosts();

getPostInputs();

deletePost();

handleComments();
