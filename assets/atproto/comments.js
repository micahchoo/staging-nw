class BskyComments {
  constructor(uri, container) {
    this.uri = uri;
    this.container = container;
    this.visibleCount = 3;
    this.commentTemplate = document.getElementById('comment-template');
    this.commentsContainer = this.container.querySelector('.comments-container');
    this.showMoreButton = this.container.querySelector('.show-more-btn');
    
    // Parse URI components
    const [, , did, , rkey] = uri.split('/');
    this.postUrl = `https://bsky.app/profile/${did}/post/${rkey}`;
    
    // Set up post link
    const postLinks = this.container.querySelectorAll('.bsky-post-link, .bsky-link');
    postLinks.forEach(link => link.href = this.postUrl);
    
    this.init();
  }

  async init() {
    try {
      const thread = await this.fetchThreadData();
      if (thread) {
        this.updatePostStats(thread.post);
        this.renderComments(thread.replies);
      }
    } catch (error) {
      console.error('Error initializing comments:', error);
      this.commentsContainer.innerHTML = '<p class="error">Error loading comments</p>';
    }
  }

  async fetchThreadData() {
    const params = new URLSearchParams({ uri: this.uri });
    const response = await fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch post thread');
    }

    const data = await response.json();
    return data.thread;
  }

  updatePostStats(post) {
    this.container.querySelector('.likes-count').textContent = post.likeCount || 0;
    this.container.querySelector('.reposts-count').textContent = post.repostCount || 0;
    this.container.querySelector('.replies-count').textContent = post.replyCount || 0;
  }

  renderComments(replies) {
    if (!replies || replies.length === 0) return;

    // Sort replies by likes
    const sortedReplies = replies.sort((a, b) => (b.post.likeCount || 0) - (a.post.likeCount || 0));

    // Show initial set of comments
    this.renderCommentSet(sortedReplies.slice(0, this.visibleCount));

    // Set up show more button if needed
    if (sortedReplies.length > this.visibleCount) {
      this.showMoreButton.style.display = 'block';
      this.showMoreButton.onclick = () => {
        this.visibleCount += 5;
        this.renderCommentSet(sortedReplies.slice(0, this.visibleCount));
        if (this.visibleCount >= sortedReplies.length) {
          this.showMoreButton.style.display = 'none';
        }
      };
    }
  }

  renderCommentSet(comments) {
    this.commentsContainer.innerHTML = '';
    comments.forEach(comment => {
      const commentElement = this.createCommentElement(comment);
      if (commentElement) {
        this.commentsContainer.appendChild(commentElement);
      }
    });
  }

  createCommentElement(comment) {
    if (!comment?.post?.record?.text) return null;

    const template = this.commentTemplate.content.cloneNode(true);
    const element = template.querySelector('.comment');
    
    // Set up author info
    const author = comment.post.author;
    const authorLink = element.querySelector('.author-link');
    authorLink.href = `https://bsky.app/profile/${author.did}`;
    
    // Set avatar
    const avatar = element.querySelector('.avatar');
    if (author.avatar) {
      avatar.src = author.avatar;
    } else {
      avatar.style.backgroundColor = '#d1d5db';
    }
    
    // Set author name and handle
    element.querySelector('.display-name').textContent = author.displayName || author.handle;
    element.querySelector('.handle').textContent = `@${author.handle}`;
    
    // Set comment text and link
    element.querySelector('.comment-text').textContent = comment.post.record.text;
    const commentLink = element.querySelector('.comment-link');
    commentLink.href = `https://bsky.app/profile/${author.did}/post/${comment.post.uri.split('/').pop()}`;
    
    // Set action counts
    element.querySelector('.reply-count').textContent = comment.post.replyCount || 0;
    element.querySelector('.repost-count').textContent = comment.post.repostCount || 0;
    element.querySelector('.like-count').textContent = comment.post.likeCount || 0;
    
    // Handle nested replies
    if (comment.replies && comment.replies.length > 0) {
      const repliesContainer = element.querySelector('.replies');
      comment.replies
        .sort((a, b) => (b.post.likeCount || 0) - (a.post.likeCount || 0))
        .forEach(reply => {
          const replyElement = this.createCommentElement(reply);
          if (replyElement) {
            repliesContainer.appendChild(replyElement);
          }
        });
    }
    
    return element;
  }
}