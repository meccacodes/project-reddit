const postsFeed = document.getElementById("posts-feed");
const user = document.getElementById("user");
const post = document.getElementById("post");
const submitBtn = document.getElementById("post-btn");
const username = document.getElementById("username");
const postText = document.getElementById("postText");
const removeBtn = document.getElementsByClassName("removePost");
const singlePost = document.getElementsByClassName("posts");
const addComment = document.getElementsByClassName("addComment");

const postStr = `<div class="conatiner-fluid postUtilities">
      <span class="removePost">delete</span>
      <span class="addComment">comment</span>
      <div class="conatiner-fluid commentForm">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Name</label>
          <input type="user" class="form-control commentName" placeholder="@username"/>
        </div>
        <div class="mb-3">
          <label for="post" class="form-label">Post</label>
          <textarea class="form-control commentText" rows="3" placeholder="This post is cool because..."></textarea>
        </div>
        <button type="button" class="btn btn-primary" id="post-btn">Add Comment</button>
      </div>
    </div>`;

let posts = [
  {
    id: 1,
    user: "My name",
    post: "This is a post",
    comments: [
      {
        id: 1,
        comment: "This is a comment",
        user: "User",
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
        user: "Name",
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

const uniqueID = function () {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  const newId = `${timestamp}-${random}`;

  const existingIds = [];
  posts.forEach((post) => {
    existingIds.push(post.id);
    if (post.comments) {
      post.comments.forEach((comment) => existingIds.push(comment.id));
    }
  });

  if (existingIds.includes(newId)) {
    return uniqueID();
  }

  return newId;
};

const preloadPosts = function () {
  for (let i = 0; i < posts.length; i++) {
    let commentsHTML = "";
    if (posts[i].comments && posts[i].comments.length > 0) {
      commentsHTML = `
        <div class="comments-section" style="display: none;">
        ${posts[i].comments
          .map(
            (comment) => `
            <div class="comment" data-comment-id="${comment.id}">
              <strong>${comment.user || "Anonymous"}:</strong>
              <p>${comment.comment}</p>
              <span class="deleteComment">delete</span>
            </div>
          `
          )
          .join("")}
        </div>
        `;
    }

    let postString = `
      <h3>Posted by: ${posts[i].user}</h3>
      <p>${posts[i].post}</p>
      ${postStr}
      ${commentsHTML}
    `;
    let postHTML = stringToHTML(postString);
    postsFeed.prepend(postHTML);
  }
};

const getPostInputs = function () {
  submitBtn.addEventListener("click", function () {
    posts.push({ id: uniqueID(), user: user.value, post: post.value });
    let latestPost = posts.length - 1;
    let postString = `
    <h3>Posted by: ${posts[latestPost].user}</h3>
    <p>${posts[latestPost].post}</p>
    ${postStr}`;
    let postHTML = stringToHTML(postString);
    postsFeed.prepend(postHTML);
  });
};

const handleComments = function () {
  postsFeed.addEventListener("click", function (event) {
    if (event.target.classList.contains("addComment")) {
      const post = event.target.closest(".posts");
      const commentForm = event.target.nextElementSibling;
      const commentsSection = post.querySelector(".comments-section");

      if (commentForm.style.display === "block") {
        commentForm.style.display = "none";
        if (commentsSection) {
          commentsSection.style.display = "none";
        }
      } else {
        commentForm.style.display = "block";
        if (commentsSection) {
          commentsSection.style.display = "block";
        }
      }
    }

    if (
      event.target.id === "post-btn" &&
      event.target.closest(".commentForm")
    ) {
      const post = event.target.closest(".posts");
      const commentName = post.querySelector(".commentName").value;
      const commentText = post.querySelector(".commentText").value;

      const postIndex = Array.from(postsFeed.children).indexOf(post);
      const currentPost = posts[posts.length - 1 - postIndex];

      if (!currentPost.comments) {
        currentPost.comments = [];
      }

      currentPost.comments.push({
        id: uniqueID(),
        user: commentName,
        comment: commentText,
      });

      let commentsSection = post.querySelector(".comments-section");
      if (!commentsSection) {
        commentsSection = document.createElement("div");
        commentsSection.className = "comments-section";
        post.appendChild(commentsSection);
      }

      const commentHTML = `
      <div class="comment" data-comment-id="${
        currentPost.comments[currentPost.comments.length - 1].id
      }">
        <strong>${commentName || "Anonymous"}:</strong>
        <p>${commentText}</p>
        <span class="deleteComment">delete</span>
      </div>
    `;

      commentsSection.insertAdjacentHTML("afterbegin", commentHTML);

      post.querySelector(".commentName").value = "";
      post.querySelector(".commentText").value = "";
    }

    if (event.target.classList.contains("deleteComment")) {
      const commentElement = event.target.closest(".comment");
      const post = event.target.closest(".posts");
      const commentId = commentElement.dataset.commentId;

      const postIndex = Array.from(postsFeed.children).indexOf(post);
      const currentPost = posts[posts.length - 1 - postIndex];

      currentPost.comments = currentPost.comments.filter(
        (comment) => comment.id !== commentId
      );

      commentElement.remove();
    }
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

preloadPosts();

getPostInputs();

deletePost();

handleComments();
