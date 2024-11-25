// SVGs
const heart = '<svg xmlns="http://www.w3.org/2000/svg" fill="#71153b" viewBox="0 0 24 24" stroke-width="1.5" stroke="#71153b class="size-5" color="pink"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path></svg>'
const repost = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"></path></svg>`
const reply = `<svg xmlns="http://www.w3.org/2000/svg" fill="#7FBADC" viewBox="0 0 24 24" stroke-width="1.5" stroke="#7FBADC" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"></path></svg>`

// finds the user DID and loads the comments automatically from a simple URL
async function loadCommentsURL(url) {
  const API_URL = "https://bsky.social/xrpc/com.atproto.identity.resolveHandle";
  const trimmed = url.split("/profile/").slice(1).join("");
  const user = trimmed.split("/post/")[0];
  const post = trimmed.split("/post/")[1];

  console.log(user + " " + post);

  async function getDID(user) {
    const did = `${API_URL}?handle=${encodeURIComponent(user)}`;
    try {
      const response = await fetch(did);
      if (!response.ok) throw new Error("Failed to fetch User DID");
      const data = await response.json();
      console.log("Fetched comment data:", data); // Debugging
      return data.did;
    } catch (error) {
      console.error("Error fetching User DID:", error);
      return null;
    }
  }

  const did = await getDID(user);
  console.log(did);
  loadComments("at://" + did + "/app.bsky.feed.post/" + post);
}

// Basic, faster way to load comments. It gets called either way.
async function loadComments(rootPostId) {
  const API_URL = "https://api.bsky.app/xrpc/app.bsky.feed.getPostThread";
  let hostAuthor = ""

  async function fetchComments(postId) {
    const url = `${API_URL}?uri=${encodeURIComponent(postId)}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      console.log("Fetched comment data:", data); // Debugging
      return data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return null;
    }
  }

  // Converts one of those at:// uris into an actual link usable by humans
  function convertURI(uri) {
    const url = uri.replace("at://", "https://bsky.app/profile/").replace("/app.bsky.feed.post/", "/post/");
    return (url);
  }

  // TO-DO make this optional??? Sort type?
  function sortCommentsByTime(comments) {
    return comments.sort((a, b) => {
      const timeA = new Date(a.post.record?.createdAt).getTime();
      const timeB = new Date(b.post.record?.createdAt).getTime();
      return timeA - timeB; // Ascending order
    });
  }

  // Can things be multiple kinds of embeds at once????
  function renderEmbeds(embed) {
    const embedBox = document.createElement("div")

    // I heard you like posts in your posts
    if (embed && embed.$type === "app.bsky.embed.record#view") {
      const embedded = convertURI(embed.record.uri);
      embedBox.classList.add("comment-repost");
      embedBox.appendChild(renderPost(embed));
    }

    // Better Mason view/Cover CSS?
    if (embed && embed.$type === "app.bsky.embed.images#view") {
      const images = embed.images;
      if (images && images.length > 0) {
        embedBox.classList.add("comment-imagebox")
        images.forEach(image => {
          const img = document.createElement("img");
          const link = document.createElement("a");
          link.href = image.fullsize;
          img.src = image.thumb;
          img.alt = image.alt || "Image attachment";
          img.classList.add("comment-image");
          link.appendChild(img);
          embedBox.appendChild(link);
        });
      }
    }

    // Links and stuff, using Bluesky's preview images. I need to find a good link without an image card to test the Else.
    if (embed && embed.$type === "app.bsky.embed.external#view") {
      const link = embed.external;
      const linkThumb = embed.external.thumb;
      const linkTitle = embed.external.title;
      if (embed.external.thumb) {
        embedBox.innerHTML = `
          <div class="comment-embedbox-thumb">
            <a href="${link.uri}">
              <img src="${linkThumb}">
              <p><strong>${linkTitle}</strong></p>
              <p>${link.description}</p>
            </a>
          </div>`;
      } else {
        embedBox.innerHTML = `<a href="${link}"><div class="comment-embedbox">[Link to <em>${linkTitle}<em>]</div></a>`;
      }
    }

    return embedBox
  }

  // Renders 1(one) post. Might be worth making this easier to call for single post embeds.
  function renderPost(comment) {
    const post = document.createElement("div");
    post.classList.add("comment-box");

    // Embeds and Posts have data in slightly different places. This feels flimsy? 
    const author = comment.post?.author ?? comment.record?.author ?? "";
    const record = comment.post?.record ?? comment.record?.value ?? "";
    const embeds = comment.post?.embed ?? comment.record?.embeds[0] ?? "";
    const uri = comment.post?.uri ?? comment.record?.uri ?? "";

    // So the host can get fancy CSS and look extra important
    if (author.displayName == hostAuthor) {
      post.classList.add("comment-host");
    }

    post.innerHTML = `<div class="comment-innerbox">
    <img class="comment-avatar" src="${author.avatar}"><div>
    <span class="comment-meta">By <a href="https://bsky.app/profile/${author.handle}">
        ${author.displayName || author.handle || "Unknown"}
    </a> on <a href="${convertURI(uri)}">${new Date(record?.createdAt || Date.now()).toLocaleString()}</a></span>
    <p class="comment-text">${record?.text}<p></div></div>`;

    post.appendChild(renderEmbeds(embeds));

    return post;
  }

  // TO-DO... options? Newest first? No prioritization? Author Override?
  function sortComments(comments) {
    const prioritizedReplies = comments.filter(
      comment => comment.post?.author?.displayName === hostAuthor
    );
    const otherReplies = comments.filter(
      comment => comment.post?.author?.displayName !== hostAuthor
    );

    const orderedComments = [...prioritizedReplies, ...sortCommentsByTime(otherReplies)];
    return orderedComments;
  }

  // Iterates through the whole thread.
  function renderComments(comments, container, hiddenReplies) {
    const orderedComments = sortComments(comments);

    orderedComments.forEach(comment => {
      if (!comment.post) {
        console.warn("Skipping comment without post:", comment);
        return;
      }

      // Removing posts that have been hidden from the thread.
      if (hiddenReplies.includes(comment.post.uri)) {
        console.warn("Skipping hidden post");
        return;
      }

      container.appendChild(renderPost(comment));

      // Recursively pull out replies to replies
      if (comment.replies && comment.replies.length > 0) {
        const repliesContainer = document.createElement("div");
        repliesContainer.classList.add("comment-replies");
        renderComments(sortCommentsByTime(comment.replies), repliesContainer, hiddenReplies);
        container.appendChild(repliesContainer);
      }
    });
  }

  // Actual Logic begins here!!

  const commentData = await fetchComments(rootPostId);

  if (commentData && commentData.thread) {
    const postURL = convertURI(rootPostId);
    const commentHidden = [];
    
    if (commentData.threadgate?.record?.hiddenReplies) {
      commentHidden.push(...commentData.threadgate.record.hiddenReplies);
    }

    // Should all this header/metrics stuff be somewhere else?
    const container = document.getElementById("comments-container");
    container.innerHTML = `<p class="comment-metricsbox"><a class="comment-metricslink" href="${postURL}">
    <span class="comment-metrics">${heart} ${commentData.thread.post.likeCount} Likes</span> 
    <span class="comment-metrics">${repost} ${commentData.thread.post.repostCount + commentData.thread.post.quoteCount} Reposts</span>
    <span class="comment-metrics">${reply} ${commentData.thread.post.replyCount} Replies</span></a>
    <a style="color: inherit;text-decoration: inherit" href="#comments-container"><div><h3>Comments</h3></div></a>
    Reply on Bluesky <a href="${postURL}">to this post</a> to add a Comment   
    </p>`;

    // Render only replies, omitting the root post
    if (commentData.thread.replies && commentData.thread.replies.length > 0) {
      hostAuthor = commentData.thread.post.author.displayName
      renderComments(sortCommentsByTime(commentData.thread.replies), container, commentHidden);
    }
  }
}